import { Box, CssVarsProvider, IconButton, Table, Tooltip } from '@mui/joy';
import { keyframes, Paper, useMediaQuery, } from '@mui/material';
import { format } from 'date-fns';
import React, { Fragment, memo, useCallback, useState } from 'react'
import CRFApprovalView from './CRFApprovalView';
import GppGoodTwoToneIcon from '@mui/icons-material/GppGoodTwoTone';
import UserAckModal from './UserAckModal';
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import { axioslogin } from 'src/views/Axios/Axios';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import { GetItemDetailsOfCRFCmp } from '../../ComonComponent/GetItemDetailsOfCRFCmp';

const ItemReceivedInStoreTable = ({ storeData }) => {

    const [modalData, setModalData] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const [ackModal, setAckModal] = useState(false)
    const [ackFlag, setackFlag] = useState(0)
    const [req_slno, setReq_slno] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [poDetails, setPoDetails] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])

    const blinkAnimation = keyframes`0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }`;
    const viewDetails = useCallback((val) => {
        setModalData(val)
        setModalOpen(true)
        setModFlag(1)
        const { req_slno } = val
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                const savedFiles = fileUrls.map((val) => {
                    const parts = val.split('/');
                    const fileNamePart = parts[parts.length - 1];
                    const obj = {
                        imageName: fileNamePart,
                        url: val
                    }
                    return obj
                })
                setImageArry(savedFiles)
            }
        }
        getImage(req_slno)
        GetItemDetailsOfCRFCmp(req_slno, setReqItems, setApproveTableData, setPoDetails)
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

    const isXs = useMediaQuery('(max-width:600px)');
    const isSm = useMediaQuery('(min-width:600px) and (max-width:960px)');
    const isMd = useMediaQuery('(min-width:960px) and (max-width:1280px)');
    const isLg = useMediaQuery('(min-width:1280px) and (max-width:1920px)');
    const isXl = useMediaQuery('(min-width:1920px)');

    const newFontSize = isXs ? '10px'
        : isSm ? '12px'
            : isMd ? '13px'
                : isLg ? '14px'
                    : isXl ? '16px' : '18px'
    return (
        <Fragment>
            {modFlag === 1 ? <CRFApprovalView modalData={modalData} handleClose={handleClose} open={modalopen}
                imagearray={imagearray} poDetails={poDetails} approveTableData={approveTableData} reqItems={reqItems} /> : null}
            {ackFlag === 1 ? <UserAckModal handleClose={handleClose} open={ackModal} req_slno={req_slno} /> : null}
            {storeData.length !== 0 ?
                <Paper variant="outlined" sx={{
                    overflow: 'auto', height: window.innerHeight - 210, flexWrap: 'wrap',
                    '&::-webkit-scrollbar': { height: 8 }
                }}>
                    <CssVarsProvider>
                        <Table padding={"none"} stickyHeader >
                            <thead style={{ height: 4 }} size='small'>
                                <tr style={{ height: 4 }} size='small'>
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
                                {storeData?.map((val, index) => (
                                    <tr key={index} style={{ height: 4, background: (val.sub_store_recieve === 1) ? '#c8e6c9' : (val.store_recieve === 0 || val.store_recieve === 1) ? '#e0f2f1' : 'transparent' }} size='small' >
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
                                        <td style={{ fontSize: 13 }}>CRF/TMC/{val.req_slno}</td>
                                        <td style={{ fontSize: 13 }}>{format(new Date(val.req_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                                        <td style={{
                                            newFontSize, maxWidth: 300, wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                        }}>{val.actual_requirement}</td>
                                        <td style={{
                                            newFontSize, maxWidth: 300, wordWrap: 'break-word',
                                            whiteSpace: 'normal',
                                        }}>{val.needed}</td>
                                        <td style={{ fontSize: 13 }}>{(val.location)}</td>
                                        <td style={{ fontSize: 13 }}>{format(new Date(val.expected_date), 'dd-MM-yyyy')}</td>
                                        <td style={{ fontSize: 13 }}>
                                            <CssVarsProvider>
                                                <IconButton
                                                    sx={{
                                                        fontSize: 12, minHeight: '40px', lineHeight: '1.2', maxHeight: '50px', fontWeight: 'bold',
                                                        width: '170px', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
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
                :
                <Box sx={{
                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                    pt: 10, color: 'grey'
                }}>
                    No Report Found
                </Box>
            }
        </Fragment>
    )
}

export default memo(ItemReceivedInStoreTable)