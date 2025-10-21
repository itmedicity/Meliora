import { Box, Chip, CircularProgress, CssVarsProvider, Table } from '@mui/joy';
import React, { useCallback, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import HodCondemApprovalModal from './HodCondemApprovalModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';
import { getStatusInfo } from 'src/views/AssetManagment/CondemnationList/CondemStatus'
import FormattedDate from 'src/views/Components/FormattedDate';


const PendingApprovalHod = ({ empdept, empid }) => {

    const queryClient = useQueryClient()
    const [formDetails, setformDetails] = useState([])
    const [modalApproveFlag, setmodalApproveFlag] = useState(0);
    const [modalApproveOpen, setmodalApproveOpen] = useState(false);

    const ApproveForm = useCallback((val) => {
        setformDetails(val)
        setmodalApproveFlag(1)
        setmodalApproveOpen(true)
    }, [])

    const postDept = useMemo(() => {
        return {
            req_dept: empdept,
            hod_apprv: 0
        }
    }, [empdept])

    const { data: CondemnHodPendingApproval = [], isLoading } = useQuery(['CondemnHodPendingApproval'], async () => {
        const result = await axioslogin.post('AssetCondemnation/getCondemnHodPendingApproval', postDept);
        return result.data?.data || [];
    },
        { enabled: !!empdept }
    );


    return (
        <Box sx={{ py: 1, px: .5 }}>
            {modalApproveFlag === 1 ?
                <HodCondemApprovalModal
                    modalApproveOpen={modalApproveOpen}
                    setmodalApproveOpen={setmodalApproveOpen}
                    setmodalApproveFlag={setmodalApproveFlag}
                    empId={empid}
                    formDetails={formDetails}
                    empdept={empdept}
                    queryClient={queryClient}
                    setformDetails={setformDetails}
                />
                : null}
            <CssVarsProvider>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
                        <CircularProgress />
                    </Box>
                ) : CondemnHodPendingApproval.length > 0 ? (
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
                            {CondemnHodPendingApproval?.map((val, index) => {
                                const { text, bgcolor } = getStatusInfo(val);
                                return (
                                    <tr key={index} >
                                        <td style={{ textAlign: 'center', }}> {index + 1}</td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
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
                                            <FormattedDate date={val.reg_date} />                                        </td>

                                        <td style={{ textAlign: 'center', }}>{val.count_of_asset || '-'}</td>
                                        <td style={{ textAlign: 'center', }}>{val.count_of_spare || '-'}</td>
                                    </tr>
                                )
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
                        minHeight: "40vh",
                        width: "100%",
                        textAlign: "center",
                        color: 'lightgrey'
                    }}>
                        Empty List
                    </Box>
                )}
            </CssVarsProvider>
        </Box>
    )
}

export default PendingApprovalHod