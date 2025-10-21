

import { Box, Chip, CircularProgress, CssVarsProvider, Table } from '@mui/joy';
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import { taskColor } from 'src/color/Color';
import ViewSubmittedModal from 'src/views/AssetManagment/CondemnationList/ViewSubmittedModal';
import { getStatusInfo } from 'src/views/AssetManagment/CondemnationList/CondemStatus';
import { getcondemnAllApproved } from 'src/api/AssetApis';
import FormattedDate from 'src/views/Components/FormattedDate';

const AllSubmittedIncharge = ({ empdept }) => {


    const [formDetails, setformDetails] = useState([])
    const [modalViewFlag, setmodalViewFlag] = useState(0);
    const [modalViewOpen, setmodalViewOpen] = useState(false);
    const [condemnAllApproved, setCondemnAllApproved] = useState([]);


    const viewForm = useCallback((val) => {
        setformDetails(val)
        setmodalViewFlag(1)
        setmodalViewOpen(true)
    }, [])



    const postDataa = useMemo(() => {
        return {
            req_dept: empdept,
            condemn_all_approved: 1
        }
    }, [empdept]);



    const { isLoading } = useQuery({
        queryKey: ['condemnAllApprovedInchview', postDataa],
        queryFn: () => getcondemnAllApproved(postDataa),
        enabled: empdept !== undefined,
        onSuccess: (data) => {
            setCondemnAllApproved(data);
        },
    });




    return (
        <Box sx={{ py: 1, px: .5 }}>

            {modalViewFlag === 1 ?
                <ViewSubmittedModal
                    modalViewOpen={modalViewOpen}
                    setmodalViewOpen={setmodalViewOpen}
                    setmodalViewFlag={setmodalViewFlag}
                    formDetails={formDetails}
                />
                : null}
            <CssVarsProvider>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
                        <CircularProgress />
                    </Box>
                ) : condemnAllApproved.length > 0 ? (
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
                            {condemnAllApproved?.map((val, index) => {
                                const { text, bgcolor } = getStatusInfo(val);
                                return (
                                    <tr key={index} >
                                        <td style={{ textAlign: 'center', }}>{index + 1}</td>
                                        <td style={{ textAlign: 'center', }}>


                                            <Chip
                                                sx={{
                                                    border: 1,
                                                    color: taskColor.darkPurple,
                                                    textAlign: 'center',
                                                    fontWeight: 700,
                                                    cursor: 'pointer',
                                                    fontSize: 13,
                                                    px: 2
                                                }}
                                                onClick={() => viewForm(val)}
                                            >
                                                View
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
                                        <td style={{ textAlign: 'center', }}> <FormattedDate date={val.reg_date} /></td>
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
                        minHeight: "65vh",
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


export default AllSubmittedIncharge