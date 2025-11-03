
import { Box, Chip, CircularProgress, CssVarsProvider, Table } from '@mui/joy';
import React, { memo, useCallback, useState } from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useQueryClient } from '@tanstack/react-query';
import ViewSubmittedModal from 'src/views/AssetManagment/CondemnationList/ViewSubmittedModal';
import { taskColor } from 'src/color/Color';
import { getStatusInfo } from 'src/views/AssetManagment/CondemnationList/CondemStatus';
import EditCondemnAtLevel from './EditCondemnAtLevel';
import FormattedDate from 'src/views/Components/FormattedDate';



const LevelApprovedCondemn = ({ empdept, empid, filteredCurrentLevelApproved, pendingApprovalsLoading, level_no, EmployeeCondemnApprovalLevelData, checkActiveLevel }) => {

    const queryClient = useQueryClient()
    const [formDetails, setformDetails] = useState([])
    const [modalApproveFlag, setmodalApproveFlag] = useState(0);
    const [modalApproveOpen, setmodalApproveOpen] = useState(false);
    const [modalViewFlag, setmodalViewFlag] = useState(0);
    const [modalViewOpen, setmodalViewOpen] = useState(false);

    const EditForm = useCallback((val) => {
        setformDetails(val)
        setmodalApproveFlag(1)
        setmodalApproveOpen(true)
    }, [])

    const viewForm = useCallback((val) => {
        setformDetails(val)
        setmodalViewFlag(1)
        setmodalViewOpen(true)
    }, [])



    return (
        <Box sx={{ py: 1, px: .5 }}>
            {modalApproveFlag === 1 ?
                <EditCondemnAtLevel
                    modalApproveOpen={modalApproveOpen}
                    setmodalApproveOpen={setmodalApproveOpen}
                    setmodalApproveFlag={setmodalApproveFlag}
                    empId={empid}
                    formDetails={formDetails}
                    empdept={empdept}
                    queryClient={queryClient}
                    setformDetails={setformDetails}
                    level_no={level_no}
                    checkActiveLevel={checkActiveLevel}
                />
                : null}
            {modalViewFlag === 1 ?
                <ViewSubmittedModal
                    modalViewOpen={modalViewOpen}
                    setmodalViewOpen={setmodalViewOpen}
                    setmodalViewFlag={setmodalViewFlag}
                    empId={empid}
                    formDetails={formDetails}
                />
                : null}
            <CssVarsProvider>
                {pendingApprovalsLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
                        <CircularProgress />
                    </Box>
                ) : filteredCurrentLevelApproved.length > 0 ? (
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
                            {
                                filteredCurrentLevelApproved?.map((val, index) => {
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
                                        <tr key={index} >
                                            <td style={{ textAlign: 'center', }}> {index + 1}</td>
                                            <td style={{ textAlign: 'center', }}>
                                                {canVerify ? (
                                                    <Chip
                                                        startDecorator={<DriveFileRenameOutlineIcon sx={{ color: taskColor.darkPurple, mt: 0.1 }} />}
                                                        sx={{
                                                            border: 1,
                                                            color: taskColor.darkPurple,
                                                            textAlign: 'center',
                                                            fontWeight: 700,
                                                            cursor: 'pointer',
                                                            fontSize: 13,
                                                            px: 2
                                                        }}
                                                        onClick={() => EditForm(val)}
                                                    >
                                                        Edit
                                                    </Chip>
                                                ) : noLevelsDefined === true && val.condem_level > 1 ? (
                                                    <Chip
                                                        sx={{
                                                            border: 1,
                                                            color: 'grey',
                                                            textAlign: 'center',
                                                            fontWeight: 700,
                                                            fontSize: 13,
                                                            px: 2
                                                        }}
                                                        onClick={() => viewForm(val)}

                                                    >
                                                        View
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
                                                        onClick={() => viewForm(val)}

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
                                            <td style={{ textAlign: 'center', }}><FormattedDate date={val.reg_date} /></td>
                                            <td style={{ textAlign: 'center', }}>{val.count_of_asset || '-'}</td>
                                            <td style={{ textAlign: 'center', }}>{val.count_of_spare || '-'}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                ) : (
                    <Box sx={{
                        fontSize: 26,
                        height: '70vh',
                        textAlignLast: 'center',
                        fontWeight: 600,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        textAlign: "center",
                        color: 'lightgrey'
                    }}>
                        Empty List
                    </Box>
                )}
            </CssVarsProvider>
        </Box >
    )
}

export default memo(LevelApprovedCondemn)