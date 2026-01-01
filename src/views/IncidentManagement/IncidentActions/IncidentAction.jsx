import React, { memo, useState } from 'react';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import { Box } from '@mui/joy';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { useQueryClient } from '@tanstack/react-query';
import ApprovalButton from '../ButtonComponent/ApprovalButton';
import { GrSend } from 'react-icons/gr';
import SectionHeader from '../Components/SectionHeader';
import { textAreaStyle } from '../CommonComponent/CommonCode';
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { employeeNumber } from 'src/views/Constant/Constant';
import { useSelector } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useCommonDataCollectionDepartments } from '../CommonComponent/useQuery';

const IncidentAction = ({ item, DeparmentAction, levelNo }) => {
    const { empdept } = useSelector(state => state.LoginUserData);

    const queryClient = useQueryClient();
    const [submitting, setSubmitting] = useState(false)

    const [selectedGroups, setSelectedGroups] = useState([]);
    const [remarks, setRemarks] = useState({});

    //  departments that already have collected data
    const collectedDeptIds = DeparmentAction?.map(
        (item) => item?.inc_action_collect_dep
    ) || [];


    // fetch grouped data
    const { data: datacollectioncommondepartments } = useCommonDataCollectionDepartments();

    // group by category
    const groupedDataCollectionDeparments =
        datacollectioncommondepartments &&
        Object.values(
            datacollectioncommondepartments.reduce((acc, item) => {
                return {
                    ...acc,
                    [item.inc_cs_slno]: {
                        inc_cs_slno: item.inc_cs_slno,
                        setting_name: item.inc_setting_key,
                        setting_label: item.inc_setting_label,
                        dep_details: [
                            ...(acc[item.inc_cs_slno]?.dep_details || []),
                            item,
                        ],
                    },
                };
            }, {})
        );

    // handle checkbox check/uncheck
    const handleCheck = (group, checked) => {
        if (checked) {
            setSelectedGroups((prev) => [...prev, group]);
        } else {
            setSelectedGroups((prev) =>
                prev.filter((g) => g.inc_cs_slno !== group.inc_cs_slno)
            );
            setRemarks((prev) => {
                const updated = { ...prev };
                delete updated[group.inc_cs_slno];
                return updated;
            });
        }
    };

    // handle remarks typing per checkbox
    const handleRemarkChange = (slno, value) => {
        setRemarks((prev) => ({
            ...prev,
            [slno]: value,
        }));
    };

    // submit data
    const handleDataCollection = async () => {
        if (selectedGroups.length === 0) {
            warningNotify('Please select at least one category before submitting.');
            return;
        }

        // prepare data for backend
        const payload = selectedGroups?.map((group) => ({
            inc_register_slno: item?.inc_register_slno,
            inc_action_req_dep: empdept,
            inc_cs_slno: group?.inc_cs_slno,
            inc_action_req_user: employeeNumber(),
            inc_dep_action_remark: remarks[group?.inc_cs_slno] || '',
            inc_dep_action_detail_status: 1,
            inc_action_collect_dep: group?.dep_details?.map((dep) => dep.inc_dep_id) || [],
            level_no: levelNo
        }));

        try {
            setSubmitting(true)
            const { data } = await axioslogin.post("/incidentMaster/insertdepaction", payload);
            const { success, message } = data ?? {};
            if (success === 2) {
                succesNotify(message);
                queryClient.invalidateQueries('getalldepactions');
                setSelectedGroups([]);
                setRemarks({});
            } else {
                warningNotify(message);
            }
        } catch (error) {
            warningNotify(error?.message ?? "Something went wrong");
        } finally {
            setSubmitting(false)
        }
    };


    const allDisabled =
        groupedDataCollectionDeparments?.every(group =>
            group.dep_details?.every(dep =>
                collectedDeptIds?.includes(dep?.inc_dep_id)
            )
        );

    return (
        <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'var(--royal-purple-400)',
                    py: 1,
                    px: 2,
                }}
            >
                <IncidentTextComponent
                    text="INCIDENT ACTION REQUIRED"
                    size={15}
                    weight={600}
                    color="White"
                />
            </Box>

            <Box
                sx={{
                    bgcolor: 'white',
                    px: 2,
                    py: 2,
                    border: '1px solid #e0e0e0',
                    borderTop: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                {/* Render Checkboxes */}
                {groupedDataCollectionDeparments?.map((group, inx) => {
                    const isChecked = selectedGroups?.some(
                        (g) => g?.inc_cs_slno === group?.inc_cs_slno
                    );

                    // Disable only if *all* departments in this cause are already collected
                    const allDepsCollected = group.dep_details?.every(dep =>
                        collectedDeptIds?.includes(dep.inc_dep_id)
                    );

                    return (
                        <Box
                            key={inx}
                            sx={{
                                p: 1,
                                borderRadius: 1,
                                border: '1px solid #e0e0e0',
                                mb: 1,
                                // opacity: allDepsCollected ? 0.6 : 1,
                            }}
                        >
                            {
                                !allDisabled &&
                                <CusCheckBox
                                    className={{
                                        color: '#145DA0',
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                    }}
                                    variant="outlined"
                                    color="primary"
                                    size="md"
                                    name={group?.setting_name}
                                    label={group?.setting_label}
                                    checked={isChecked}
                                    disabled={allDepsCollected} //  disable only when all deps collected
                                    onCheked={(e) =>
                                        handleCheck(group, e.target.checked)
                                    }
                                />
                            }

                            {allDepsCollected && (
                                <Box sx={{ ml: 2, mt: 0.5, color: 'black', fontSize: 12, display: 'flex', justifyContent: 'space-between' }}>
                                    {`${group?.setting_label} request has been sent to departments `}
                                    <DoneAllIcon color='success' sx={{
                                        fontSize: 18
                                    }} />
                                </Box>
                            )}

                            {/* When checked → show details */}
                            {isChecked && !allDepsCollected && (
                                <Box sx={{ mt: 1, ml: 3 }}>
                                    <SectionHeader
                                        text="Departments Involved:"
                                        color={'#333'}
                                        fontSize={13}
                                        iconSize={15}
                                    />
                                    <ul style={{ marginTop: 4, marginBottom: 8 }}>
                                        {group.dep_details.map((dep, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    fontSize: 13,
                                                    color: '#555',
                                                    marginLeft: 8,
                                                }}
                                            >
                                                {dep.dept_name}
                                            </li>
                                        ))}
                                    </ul>

                                    <SectionHeader
                                        text="Remarks:"
                                        color={'#111'}
                                        fontSize={13}
                                        iconSize={15}
                                    />
                                    <textarea
                                        placeholder="Enter remarks for this category"
                                        value={remarks[group.inc_cs_slno] || ''}
                                        onChange={(e) =>
                                            handleRemarkChange(
                                                group.inc_cs_slno,
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        style={textAreaStyle}
                                        onFocus={(e) => {
                                            e.target.style.outline = 'none';
                                            e.target.style.boxShadow = 'none';
                                            e.target.style.border =
                                                '1.5px solid #d8dde2ff';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.border =
                                                '1.5px solid #d8dde2ff';
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    );
                })}

                {!allDisabled && (
                    <Box sx={{ width: 100, mt: 2 }}>
                        <ApprovalButton
                            disabled={submitting}
                            size={12}
                            iconSize={17}
                            text={'Add'}
                            icon={GrSend}
                            onClick={handleDataCollection}
                        />
                    </Box>
                )}

            </Box>
        </Box>
    );
};

export default memo(IncidentAction);

