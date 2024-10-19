import { CssVarsProvider, Table, Tooltip } from '@mui/joy';
import { Paper } from '@mui/material';
import { format } from 'date-fns';
import React, { memo, useCallback, useState } from 'react'
import { Fragment } from "react"
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import CRFApprovalView from './CRFApprovalView';

const ReceivedTable = ({ receivedData }) => {

    const [modalData, setModalData] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)

    const viewDetails = useCallback((val) => {
        setModalData(val)
        setModalOpen(true)
        setModFlag(1)
    }, [])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
        setModalData([])
    }, [setModalOpen])
    return (
        <Fragment>
            {modFlag === 1 ? <CRFApprovalView modalData={modalData} handleClose={handleClose} open={modalopen} /> : null}
            <Paper variant="outlined" sx={{
                overflow: 'auto', minHeight: '35vh', maxHeight: '35vh', flexWrap: 'wrap',
                '&::-webkit-scrollbar': { height: 8 }
            }}>
                <CssVarsProvider>
                    <Table padding={"none"} stickyHeader >
                        <thead style={{ height: 4 }} size='small'>
                            <tr style={{ height: 4 }} size='small'>
                                <th size='sm' style={{ width: 50, textAlign: 'center' }}></th>
                                <th size='sm' style={{ width: 110, textAlign: 'left', pl: 1 }}>CRF No</th>
                                <th size='sm' style={{ width: 150, textAlign: 'left' }}>Req.Date</th>
                                <th size='sm' style={{ width: 200, textAlign: 'left' }}>Purpose</th>
                                <th size='sm' style={{ width: 200, textAlign: 'left' }}>Justification</th>
                                <th size='sm' style={{ width: 100, textAlign: 'left' }}>Location</th>
                                <th size='sm' style={{ width: 150, textAlign: 'left' }}>Expected Date</th>
                                <th size='sm' style={{ width: 100, textAlign: 'left' }}>Received User</th>
                                <th size='sm' style={{ width: 150, textAlign: 'left' }}>Received Date</th>
                                <th size='sm' style={{ width: 200, textAlign: 'left' }}>Received Remarks</th>

                            </tr>
                        </thead>
                        <tbody size='small' style={{ height: 4 }}>
                            {receivedData?.map((val, index) => (
                                <tr key={index} style={{ height: 4 }} size='small' >
                                    <td style={{ fontSize: 12, pl: 1 }}>
                                        <Tooltip title="View Details" placement="right">
                                            <BeenhereTwoToneIcon
                                                sx={{
                                                    fontSize: 'lg',
                                                    color: '#01579b',
                                                    height: 23,
                                                    width: 25,
                                                    borderRadius: 2,
                                                    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.2s',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}
                                                onClick={() => viewDetails(val)}
                                            />
                                        </Tooltip>
                                    </td>
                                    <td style={{ fontSize: 12, pl: 1 }}>CRF/TMC/{val.req_slno}</td>
                                    <td style={{ fontSize: 12 }}>{format(new Date(val.req_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                                    <td style={{ fontSize: 12 }}>{val.actual_requirement}</td>
                                    <td style={{ fontSize: 12 }}>{val.needed}</td>
                                    <td style={{ fontSize: 12 }}>{(val.location)}</td>
                                    <td style={{ fontSize: 12 }}>{format(new Date(val.expected_date), 'dd-MM-yyyy')}</td>
                                    <td style={{ fontSize: 12 }}>{val.acknowUser}</td>
                                    <td style={{ fontSize: 12 }}>{format(new Date(val.user_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                                    <td style={{ fontSize: 12 }}>{(val.user_acknldge_remarks)}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CssVarsProvider>
            </Paper>
        </Fragment >
    )
}

export default memo(ReceivedTable)
