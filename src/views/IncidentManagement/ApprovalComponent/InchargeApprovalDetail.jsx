import { Box } from '@mui/joy';
import { ImExit } from "react-icons/im";
import { FcCancel } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import React, { memo, useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { employeeNumber } from 'src/views/Constant/Constant'
import { textAreaStyle } from '../CommonComponent/CommonCode';
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { TiArrowForwardOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';
// import { useQuery } from '@tanstack/react-query';
// import { incidentLevelApprovalFetch } from 'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';

const InchargeApprovalDetail = ({
    setReview,
    review,
    item,
    fetchAgain,
    setOpenModal,
    setEdit,
    isEdit,
    level,
    setApprovalLoading,
    action,
    title,
    rca,
    sasdetial,
    incidentcategory,
    levelNo,
    formValues,
    hodcorrectiveaction,
    incidentlevels,
    incidentsubcat
}) => {

    const { empsecid } = useSelector(state => {
        return state.LoginUserData
    });
    const { MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT } = formValues;

    const isInchargeApproved = item && item?.inc_incharge_ack === 1;
    const isInchargeRejected = item && item?.inc_incharge_ack === 0 && item?.inc_incharge_reivew_state === 'R';

    // const { data: incidentlevels } = useQuery({
    //     queryKey: ["getalllevels"],
    //     queryFn: () => incidentLevelApprovalFetch(),
    //     staleTime: Infinity,
    //     refetchOnWindowFocus: false,
    // });

    const activeLevels =
        Array.isArray(incidentlevels)
            ? incidentlevels
                .filter(lvl => lvl?.level_status === 1)
                .sort((a, b) => a?.level_no - b?.level_no)
            : [];

    // Hanlde Approvals 
    const handleApprovalandcancel = useCallback(
        async (slno, val) => {

            if (val === 'A' && (level === "INCHARGE" || level === 'HOD') && (!action || action.trim() === '')) {
                warningNotify(`Please enter ${title}`);
                return
            }
            if (level === "QUALITY" && Object.keys(sasdetial || {})?.length === 0) return warningNotify("Please select the SAC details");
            if (level === "QUALITY" && !incidentcategory) return warningNotify("Please Select Incident Catergory Before Submitting");
            if (level === "QUALITY" && incidentcategory && !incidentsubcat) return warningNotify("Please Select Incident Subcategory Catergory Before Submitting");
            if (!review) return warningNotify("Please Enter the Review");

            if (
                ![MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT].some(Boolean) && (level === "INCHARGE" || level === 'HOD') && val === 'A') {
                warningNotify("Please Enter Any of the Above Before Submitting!");
                return
            }
            if (val === 'A' && level === "INCHARGE" && !rca) return warningNotify("Please Enter the RCA Before Submitting");

            if (!isInchargeApproved && rca.trim() === '' && level === 'HOD') {
                warningNotify("Hod Should Fill the RCA before submittingss!");
                return
            }
            if (!isInchargeApproved && hodcorrectiveaction.trim() === '' && level === 'HOD') {
                warningNotify("Hod Should Fill the Corrective Action before submitting!");
                return
            }


            const fishbonedetail = {
                inc_register_slno: item?.inc_register_slno,
                inc_data_collection_slno: item?.inc_data_collection_slno,
                dep_slno: empsecid,
                inc_material: MATERIAL,
                inc_machine: MACHINE,
                inc_man: MAN,
                inc_milieu: MILIEU,
                inc_method: METHOD,
                inc_measurement: MEASUREMENT,
                inc_fba_status: 1,
                create_user: employeeNumber(),
            };

            const dynamicLevelConfig = activeLevels?.reduce((acc, lvl) => {
                acc[lvl?.level_name] = {
                    url: "/incidentMaster/levelapproval",
                    payload: {
                        inc_current_level: item?.inc_current_level + 1,
                        inc_current_level_review_state: val,
                        inc_register_slno: slno,
                        level_no: lvl.level_no,
                        level_review_state: val,
                        level_review: review,
                        level_employee: employeeNumber(),
                        level_review_status: 1,
                    },
                };
                return acc;
            }, {});



            //define an object with INCHARGE and HOD, then immediately use [level] to select the matching one.
            const config = {
                INCHARGE: {
                    url: "/incidentMaster/inchargeapproval",
                    payload: {
                        inc_incharge_ack: val === 'A' ? 1 : 0,
                        inc_incharge_emp: employeeNumber(),
                        inc_incharge_reivew_state: val,
                        inc_register_slno: slno,
                        inc_incharge_review: review,
                        inc_corrective_action: action,
                        inc_rca: rca
                    },
                },
                HOD: {
                    url: "/incidentMaster/hodapproval",
                    payload:
                        val === "R"
                            ? {
                                inc_hod_ack: val === "A" ? 1 : 0,
                                inc_hod_emp: employeeNumber(),
                                inc_hod_reivew_state: val,
                                inc_register_slno: slno,
                                inc_hod_review: review,
                            }
                            : {
                                inc_hod_ack: val === "A" ? 1 : 0,
                                inc_hod_emp: employeeNumber(),
                                inc_hod_reivew_state: val,
                                inc_register_slno: slno,
                                inc_hod_review: review,
                                inc_preventive_action: action,

                                // Include corrective + RCA always if HOD condition true
                                ...(!isInchargeApproved && {
                                    inc_corrective_action: hodcorrectiveaction,
                                    inc_rca: rca,
                                    inc_rca_hod_approve: 'A',
                                    inc_corrective_hod_approval: 'A',
                                }),

                                // Include incharge fields ONLY if not rejected
                                ...(!isInchargeRejected && {
                                    inc_incharge_ack: val === "A" ? 1 : 0,
                                    inc_incharge_emp: employeeNumber(),
                                    inc_incharge_reivew_state: val,
                                    inc_incharge_review:
                                        "Incharge not Enterd any Review . Acknowledged By HOD directly",
                                }),
                            },
                },
                QUALITY: {
                    url: "/incidentMaster/qadapproval",
                    payload: {
                        inc_qad_ack: val === 'A' ? 1 : 0,
                        inc_qad_emp: employeeNumber(),
                        inc_qad_review_state: val,
                        inc_register_slno: slno,
                        inc_qad_review: review,
                        inc_evaluation_status: action,
                        inc_category: incidentcategory,
                        inc_subcategory:incidentsubcat,
                        inc_sacmatrix_detail: JSON.stringify(sasdetial ?? {})
                    },
                },
                // DMS: levelApprovalPayload,
                // "MEDICAL SUPERINTENDENT": levelApprovalPayload,
                ...dynamicLevelConfig,
            }[level];

            setApprovalLoading(true);

            if (!config) {
                warningNotify("Invalid approval level");
                setApprovalLoading(false);
                return;
            }

            try {
                const { data } = await axioslogin.post(config.url, config.payload);
                const { success, message } = data ?? {};
                if ((level === "INCHARGE" || level === 'HOD') && success === 2) {
                    const { data: fishRes } = await axioslogin.post("/incidentMaster/insertfishbone", fishbonedetail);
                    if (fishRes?.success === 2) {
                        succesNotify(fishRes.message);
                        setOpenModal(false)
                    } else {
                        warningNotify(fishRes?.message);
                    }
                }
                if (success === 2) {
                    succesNotify(message);
                    setOpenModal(false);

                    fetchAgain();
                } else {
                    warningNotify(message);
                }
            } catch (error) {
                warningNotify(error?.message ?? "Something went wrong");
            } finally {
                setApprovalLoading(false);
            }
        },
        [
            review, level, fetchAgain, setOpenModal, action, sasdetial,
            incidentcategory, MATERIAL, MACHINE, MAN, MILIEU, METHOD,
            MEASUREMENT, empsecid, rca, item, levelNo, title,
            hodcorrectiveaction, isInchargeApproved, incidentsubcat
        ]
    );



    const handleUpdate = async (slno) => {

        if ((!review || review.trim() === '')) {
            warningNotify(`Please enter Review Before Submitting`);
            return
        }
        const config = {
            INCHARGE: {
                payload: {
                    inc_register_slno: slno,
                    inc_incharge_review: review
                },
            },
            HOD: {
                payload: {
                    inc_register_slno: slno,
                    inc_hod_review: review,
                }
            },
            QUALITY: {
                payload: {
                    inc_register_slno: slno,
                    inc_qad_review: review,
                },
            },
        }[level];

        if (!config) {
            warningNotify("Invalid approval level");
            setApprovalLoading(false);
            return;
        }

        try {
            const { data } = await axioslogin.post("/incidentMaster/updateIncident", config.payload);
            const { success, message } = data ?? {};
            if (success === 2) {
                succesNotify(message);
                fetchAgain();
            } else {
                warningNotify(message);
            }
        } catch (error) {
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setApprovalLoading(false);
            setEdit(false)
        }
    }

    return (
        <Box sx={{
            width: '100%',
            position: 'relative',
            bgcolor: '#fff',
            borderRadius: '12px',
            overflowY: 'auto',
        }}>
            <Box sx={{ mt: 1 }}>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.4 }}>
                    <TiArrowForwardOutline style={{ color: 'var(--rose-pink-400)', fontSize: 18 }} />
                    <IncidentTextComponent text={"Enter Review Detail"} size={14} weight={600} color="black" />
                </Box>

                <textarea
                    placeholder="Enter here"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows={4}
                    style={textAreaStyle}
                    onFocus={(e) => {
                        e.target.style.outline = 'none';
                        e.target.style.boxShadow = 'none';
                        e.target.style.border = '1.5px solid #d8dde2ff';
                    }}
                    onBlur={(e) => {
                        e.target.style.border = '1.5px solid #d8dde2ff';
                    }}
                />

            </Box>

            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                {
                    isEdit ?
                        <>
                            <ApprovalButton
                                size={12}
                                text={`UPDATE`}
                                icon={FcApproval}
                                iconSize={20}
                                onClick={() => handleUpdate(item?.inc_register_slno)}
                            />
                            <ApprovalButton
                                size={12}
                                iconSize={17}
                                text={"GO BACK"}
                                icon={ImExit}
                                onClick={() => setEdit(false)}
                            />
                        </> :
                        <>


                            <ApprovalButton
                                size={12}
                                text={`APPROVE`}
                                icon={FcApproval}
                                iconSize={20}
                                onClick={() => handleApprovalandcancel(item?.inc_register_slno, 'A')}
                            />
                            <ApprovalButton
                                size={12}
                                iconSize={20}
                                text={"REJECT"}
                                icon={FcCancel}
                                onClick={() => handleApprovalandcancel(item?.inc_register_slno, 'R')}
                            />
                        </>


                }
            </Box>
        </Box>
    )
}

export default memo(InchargeApprovalDetail)