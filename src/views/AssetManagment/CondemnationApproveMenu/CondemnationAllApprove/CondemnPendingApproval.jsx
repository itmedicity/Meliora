import { Box, Chip, CircularProgress, CssVarsProvider, Table } from '@mui/joy';
import React, { useCallback, useState } from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import { useQueryClient } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';
import { getStatusInfo } from '../../CondemnationList/CondemStatus';
import CondemnApproveModal from './CondemnApproveModal';
import FormattedDate from 'src/views/Components/FormattedDate';


const CondemnPendingApproval = ({ empid, filteredPending, pendingApprovalsLoading, EmployeeCondemnApprovalLevelData, checkActiveLevel }) => {

    const queryClient = useQueryClient()
    const [formDetails, setformDetails] = useState([])
    const [modalApproveFlag, setmodalApproveFlag] = useState(0);
    const [modalApproveOpen, setmodalApproveOpen] = useState(false);

    const ApproveForm = useCallback((val) => {
        setformDetails(val)
        setmodalApproveFlag(1)
        setmodalApproveOpen(true)
    }, [])


    return (
        <Box sx={{ py: 1, px: .5 }}>
            {modalApproveFlag === 1 ?
                <CondemnApproveModal
                    modalApproveOpen={modalApproveOpen}
                    setmodalApproveOpen={setmodalApproveOpen}
                    setmodalApproveFlag={setmodalApproveFlag}
                    empId={empid}
                    formDetails={formDetails}
                    queryClient={queryClient}
                    EmployeeCondemnApprovalLevelData={EmployeeCondemnApprovalLevelData}
                    checkActiveLevel={checkActiveLevel}
                />
                : null}
            <CssVarsProvider>
                {pendingApprovalsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
                        <CircularProgress />
                    </Box>
                ) : filteredPending.length > 0 ? (
                    <Table stickyHeader size='sm'
                        sx={{ borderRadius: 2 }} borderAxis='both' >
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', width: 12 }}>
                                    Serial No.
                                </th>
                                <th style={{ textAlign: 'center', width: 12 }}>
                                    Action
                                </th>
                                <th style={{ textAlign: 'center', width: 12 }}>
                                    Status
                                </th>
                                <th style={{ textAlign: 'center', width: 22 }}>
                                    Form Number
                                </th>
                                <th style={{ textAlign: 'center', width: 15 }}>
                                    Registered Date
                                </th>
                                <th style={{ textAlign: 'center', width: 10 }}>
                                    Asset Count
                                </th>
                                <th style={{ textAlign: 'center', width: 10 }}>
                                    Spare Count
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {filteredPending?.map((val, index) => {
                                const { text, bgcolor } = getStatusInfo(val);

                                // Get levels the employee can approve
                                const approveLevels =
                                    EmployeeCondemnApprovalLevelData[0]?.approved_for_approve_names
                                        ?.split(",")
                                        .map(level => level.trim()) || [];

                                const noLevelsDefined =
                                    val.levels_approved_for_view === "" || val.levels_approved_for_view === undefined &&
                                    val.levels_approved_for_approve === "" || val.levels_approved_for_approve === undefined;

                                // Check if all levels required for approval are approved (=== 1)
                                const canVerify = noLevelsDefined || approveLevels.length > 0 &&
                                    approveLevels.every(level => val[level] === 1);

                                return (
                                    <tr key={index}>
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            {canVerify ? (
                                                <Chip
                                                    startDecorator={<VerifiedIcon sx={{ color: taskColor.darkPurple, mt: 0.1 }} />}
                                                    sx={{
                                                        border: 1,
                                                        color: taskColor.darkPurple,
                                                        textAlign: 'center',
                                                        fontWeight: 700,
                                                        cursor: 'pointer',
                                                        fontSize: 13,
                                                        px: 2
                                                    }}
                                                    onClick={() => ApproveForm(val)}
                                                >
                                                    Verify
                                                </Chip>
                                            ) : (
                                                <Chip
                                                    sx={{
                                                        border: 1,
                                                        color: 'grey',
                                                        textAlign: 'center',
                                                        fontWeight: 700,
                                                        fontSize: 13,
                                                        px: 2
                                                    }}
                                                >
                                                    View
                                                </Chip>
                                            )}
                                        </td>
                                        <td>
                                            <Box
                                                sx={{
                                                    bgcolor,
                                                    color: 'black',
                                                    fontWeight: 600,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    py: 0.3
                                                }}
                                            >
                                                {text}
                                            </Box>
                                        </td>
                                        <td style={{ textAlign: 'center', }}>{val.condem_form_prefix}/{val.condem_form_no}</td>
                                        <td style={{ textAlign: 'center', }}>
                                            <FormattedDate date={val.reg_date} />
                                        </td>
                                        <td style={{ textAlign: 'center', }}>{val.count_of_asset || '-'}</td>
                                        <td style={{ textAlign: 'center', }}>{val.count_of_spare || '-'}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <Box sx={{
                        fontSize: 26,
                        pt: 10,
                        fontWeight: 600,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: '50vh',
                        textAlign: "center",
                        color: 'lightgrey',
                    }}>
                        Empty List
                    </Box>
                )}
            </CssVarsProvider>
        </Box>
    )
}

export default CondemnPendingApproval