import { Box } from '@mui/joy';
import { ImExit } from "react-icons/im";
import { FcCancel } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import React, { memo, useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { employeeNumber } from 'src/views/Constant/Constant'
import { textAreaStyle } from '../CommonComponent/CommonCode';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { TiArrowForwardOutline } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { handleRateLimitError } from '../CommonComponent/CommonFun';

import ApprovalButton from '../ButtonComponent/ApprovalButton';
import IncidentTextComponent from '../Components/IncidentTextComponent';

// const ApprovalButton = lazy(() => import('../ButtonComponent/ApprovalButton'));
// const IncidentTextComponent = lazy(() => import('../Components/IncidentTextComponent'));


const InchargeApprovalDetail = ({
    setReview,
    review,
    item,
    fetchAgain,
    setOpenModal,
    setEdit,
    isEdit,
    level,
    formValues,
    setApprovalLoading,
    incidentlevels,
    actionReviews,
    isFishBoneForthisLevel,
    currentLevelActions,
    IsSacMatrixExist,
    incidentcategory,
    incidentsubcat,
    sasdetial,
    levelNo,
    reviewEdit,
    processing
}) => {



    const { empsecid } = useSelector(state => {
        return state.LoginUserData
    });

    const { MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT } = formValues;

    const completedActionSlnoList = Object.entries(actionReviews ?? {})
        .filter(([, value]) => typeof value === "string" && value.trim() !== "")
        .map(([slno]) => Number(slno)); // or String(slno)

    const missingActions = currentLevelActions?.filter(
        (item) => !completedActionSlnoList.includes(item.inc_action_slno)
    );

    const activeLevels =
        Array.isArray(incidentlevels)
            ? incidentlevels
                .filter(lvl => lvl?.level_status === 1)
                .sort((a, b) => a?.level_no - b?.level_no)
            : [];

    // Finiding the Heigh level
    const highestLevel = activeLevels?.length
        ? activeLevels.reduce(
            (max, item) => item.level_no > max.level_no ? item : max,
            activeLevels[0]
        )
        : null;

    // Checking is this the last levepl
    const IsLastLevel =
        highestLevel &&
        highestLevel.level_no === levelNo &&
        highestLevel.level_name === level;


    // Handle Approvals 
    const handleApprovalandcancel = useCallback(
        async (slno, val) => {

            if (
                ![MATERIAL, MACHINE, MAN, MILIEU, METHOD, MEASUREMENT].some(Boolean) && isFishBoneForthisLevel && val === 'A') {
                warningNotify("Please Enter Any of the Above Before Submitting!");
                return
            }

            if (Array.isArray(missingActions) && missingActions?.length > 0 && val === 'A') {
                const names = missingActions.map(a => a?.inc_action_name).join(", ");
                warningNotify(`Please complete all required actions: ${names}`);
                return;
            }

            if (typeof review === "string" && review.trim() === "") return warningNotify("Please Enter the Review");

            if (IsSacMatrixExist && incidentcategory === null) return warningNotify("Please Select Incident Category!");

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
                        inc_current_level: levelNo,
                        inc_current_level_review_state: val,
                        inc_register_slno: slno,
                        inc_all_approved: IsLastLevel ? 1 : 0,
                        level_slno: lvl?.detail_slno,
                        level_review_state: val,
                        level_review: review,
                        level_employee: employeeNumber(),
                        level_review_status: 1,
                        actionReviews: actionReviews,
                        ...(IsSacMatrixExist && {
                            inc_category: incidentcategory,
                            inc_subcategory: incidentsubcat,
                            inc_sacmatrix_detail: JSON.stringify(sasdetial)
                        })
                    },
                };
                return acc;
            }, {});

            //define an object with INCHARGE and HOD, then immediately use [level] to select the matching one.
            const config = {
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
                if (isFishBoneForthisLevel && success === 2) {
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
                if (handleRateLimitError(error)) return [];
                warningNotify(error?.message ?? "Something went wrong");
            } finally {
                setApprovalLoading(false);
            }
        },
        [
            sasdetial,
            incidentcategory,
            incidentsubcat,
            MATERIAL,
            MACHINE,
            MAN,
            MILIEU,
            METHOD,
            MEASUREMENT,
            empsecid,
            missingActions,
            IsSacMatrixExist,
            levelNo,
            IsLastLevel,
            actionReviews
        ]
    );


    // Handle Review Update
    const handleUpdate = async () => {
        setApprovalLoading(true);
        if (!reviewEdit?.review || reviewEdit?.review?.trim() === '') {
            warningNotify(`Please Enter Review Before Submitting...!`);
            return
        };

        if (!reviewEdit?.level_slno) {
            return warningNotify("Level ID is missing");
        };
        const payload = {
            level_review_slno: reviewEdit?.level_slno,
            level_review: reviewEdit?.review
        }

        try {
            const { data } = await axioslogin.post("/incidentMaster/updatelevelreview", payload);
            const { success, message } = data ?? {};
            if (success === 2) {
                succesNotify(message);
            } else {
                warningNotify(message);
            }
        } catch (error) {
            if (handleRateLimitError(error)) return [];
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setApprovalLoading(false);
            setOpenModal(false)
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
                    <IncidentTextComponent text={isEdit ? "Edit Review Detail" : "Enter Review Detail"} size={14} weight={600} color="black" />
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
                                disabled={processing}
                                size={12}
                                text={`UPDATE`}
                                icon={FcApproval}
                                iconSize={20}
                                onClick={() => handleUpdate()}
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
                                disabled={processing}
                                size={12}
                                text={`APPROVE`}
                                icon={FcApproval}
                                iconSize={20}
                                onClick={() => handleApprovalandcancel(item?.inc_register_slno, 'A')}
                            />
                            <ApprovalButton
                                disabled={processing}
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