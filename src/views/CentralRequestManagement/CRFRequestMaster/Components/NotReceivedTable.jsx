
import { Box, CssVarsProvider, IconButton, Table, Tooltip } from '@mui/joy';
import { keyframes, Paper, } from '@mui/material';
import { format } from 'date-fns';
import React, { Fragment, memo, useCallback, useState } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CRFApprovalView from './CRFApprovalView';
import GppGoodTwoToneIcon from '@mui/icons-material/GppGoodTwoTone';
import UserAckModal from './UserAckModal';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';

const NotReceivedTable = ({ disData, rowSelect, count, setCount }) => {

    const [modalData, setModalData] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const [ackModal, setAckModal] = useState(false)
    const [ackFlag, setackFlag] = useState(0)
    const [req_slno, setReq_slno] = useState(0)

    const blinkAnimation = keyframes`0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }`;
    const viewDetails = useCallback((val) => {
        setModalData(val)
        setModalOpen(true)
        setModFlag(1)
    }, [])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
        setModalData([])
        setAckModal(false)
        setackFlag(0)
    }, [setModalOpen, setAckModal])
    const userAcknowledge = useCallback((val) => {
        const { req_slno } = val
        setReq_slno(req_slno)
        setAckModal(true)
        setackFlag(1)
    }, [setAckModal])

    return (
        <Fragment>
            {modFlag === 1 ? <CRFApprovalView modalData={modalData} handleClose={handleClose} open={modalopen} /> : null}
            {ackFlag === 1 ? <UserAckModal handleClose={handleClose} open={ackModal} count={count} setCount={setCount}
                req_slno={req_slno} /> : null}
            {disData.length !== 0 ?
                <>
                    <Paper variant="outlined" sx={{
                        overflow: 'auto', minHeight: '35vh', maxHeight: '35vh',
                        flexWrap: 'wrap', '&::-webkit-scrollbar': { height: 8 }
                    }}>
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader >
                                <thead style={{ height: 4 }} size='small'>
                                    <tr style={{ height: 4 }} size='small'>
                                        <th size='sm' style={{ width: 50, textAlign: 'center' }}></th>
                                        <th size='sm' style={{ width: 50, textAlign: 'center' }}></th>
                                        <th size='sm' style={{ width: 50, textAlign: 'center' }}></th>
                                        <th size='sm' style={{ width: 100, textAlign: 'left' }}>CRF No</th>
                                        <th size='sm' style={{ width: 150, textAlign: 'left' }}>Req.Date</th>
                                        <th size='sm' style={{ width: 300, textAlign: 'left' }}>Purpose</th>
                                        <th size='sm' style={{ width: 300, textAlign: 'left' }}>Justification</th>
                                        <th size='sm' style={{ width: 150, textAlign: 'left' }}>Location</th>
                                        <th size='sm' style={{ width: 150, textAlign: 'left' }}>Expected Date</th>
                                        <th size='sm' style={{ width: 180, textAlign: 'left' }}>Approval Status</th>
                                    </tr>
                                </thead>
                                <tbody size='small' style={{ height: 4 }}>
                                    {disData?.map((val, index) => (
                                        <tr key={index} style={{ height: 4, background: (val.sub_store_recieve === 1) ? '#c8e6c9' : (val.store_recieve === 0 || val.store_recieve === 1) ? '#e0f2f1' : 'transparent' }} size='small' >
                                            <td>
                                                {(val.hod_approve !== null || val.incharge_approve !== null) || val.req_status === 'C' ?
                                                    <EditOutlinedIcon
                                                        sx={{
                                                            fontSize: 'lg',
                                                            color: 'grey',
                                                            height: 25,
                                                            width: 30,
                                                            borderRadius: 2,
                                                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                        }}
                                                    />
                                                    :
                                                    <Tooltip title="Edit" placement="right">
                                                        <EditOutlinedIcon
                                                            sx={{
                                                                fontSize: 'lg',
                                                                color: '#3e2723',
                                                                height: 25,
                                                                width: 30,
                                                                borderRadius: 2,
                                                                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                                cursor: 'pointer',
                                                                transition: 'transform 0.2s',
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)',
                                                                },
                                                            }}
                                                            onClick={() => rowSelect(val)}
                                                        />
                                                    </Tooltip>
                                                }

                                            </td>
                                            <td>
                                                {val.sub_store_recieve === 1 ?
                                                    <Tooltip title="User Acknowledgement" placement="right">
                                                        <GppGoodTwoToneIcon
                                                            sx={{
                                                                animation: `${blinkAnimation} 1s infinite`,
                                                                fontSize: 'lg',
                                                                color: '#1b5e20',
                                                                height: 25,
                                                                width: 30,
                                                                borderRadius: 2,
                                                                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                                cursor: 'pointer',
                                                                transition: 'transform 0.2s',
                                                                '&:hover': {
                                                                    transform: 'scale(1.1)',
                                                                },
                                                            }}
                                                            onClick={() => userAcknowledge(val)}
                                                        />
                                                    </Tooltip>
                                                    :
                                                    <GppGoodTwoToneIcon
                                                        sx={{
                                                            fontSize: 'lg',
                                                            color: '#B1B1B1',
                                                            height: 25,
                                                            width: 30,
                                                            borderRadius: 2,
                                                            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                                                        }}
                                                    />
                                                }
                                            </td>
                                            <td style={{ fontSize: 12 }}>
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
                                            <td style={{ fontSize: 12 }}>CRF/TMC/{val.req_slno}</td>
                                            <td style={{ fontSize: 12 }}>{format(new Date(val.req_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                                            <td style={{ fontSize: 12 }}>{val.actual_requirement}</td>
                                            <td style={{ fontSize: 12 }}>{val.needed}</td>
                                            <td style={{ fontSize: 12 }}>{(val.location)}</td>
                                            <td style={{ fontSize: 12 }}>{format(new Date(val.expected_date), 'dd-MM-yyyy')}</td>
                                            <td style={{ fontSize: 12 }}>
                                                <CssVarsProvider>
                                                    <IconButton
                                                        sx={{
                                                            fontSize: 12, height: '30px', minHeight: '30px', lineHeight: '1.2', fontWeight: 'bold',
                                                            width: '150px',
                                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                            bgcolor: '#D4F1F4', border: '1px solid #a5d6a7'
                                                        }}>
                                                        {val.now_who}&nbsp;&nbsp;{val.now_who_status === 1 ? "Approved" : val.now_who_status === 2 ? "Rejected" :
                                                            val.now_who_status === 3 ? "On-Hold" : ""}

                                                    </IconButton>
                                                </CssVarsProvider>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </>
                :
                <Box sx={{
                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                    pt: 10, color: 'grey'
                }}>
                    No Report Found
                </Box>
            }
        </Fragment >
    )
}

export default memo(NotReceivedTable)