import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import { Paper, useMediaQuery } from '@mui/material'
import { format } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { GetItemDetailsOfCRFCmp } from '../../ComonComponent/GetItemDetailsOfCRFCmp'
import BeenhereTwoToneIcon from '@mui/icons-material/BeenhereTwoTone';
import CRFApprovalView from './CRFApprovalView'

const ReceivedTable = ({ receivedData }) => {
    const [modalData, setModalData] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const [imagearray, setImageArry] = useState([])
    const [poDetails, setPoDetails] = useState([])
    const [reqItems, setReqItems] = useState([])
    const [approveTableData, setApproveTableData] = useState([])

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
    }, [setModalOpen])

    const isXs = useMediaQuery('(max-width:600px)');
    const isSm = useMediaQuery('(min-width:600px) and (max-width:960px)');
    const isMd = useMediaQuery('(min-width:960px) and (max-width:1280px)');
    const isLg = useMediaQuery('(min-width:1280px) and (max-width:1920px)');
    const isXl = useMediaQuery('(min-width:1920px)');

    // Determine font size based on the screen size
    const newFontSize = isXs ? '10px'
        : isSm ? '12px'
            : isMd ? '13px'
                : isLg ? '14px'
                    : isXl ? '16px' : '18px'
    return (
        <Fragment>
            {modFlag === 1 ? <CRFApprovalView modalData={modalData} handleClose={handleClose} open={modalopen}
                imagearray={imagearray} poDetails={poDetails} approveTableData={approveTableData} reqItems={reqItems} /> : null}
            {receivedData.length !== 0 ?
                <Paper variant="outlined" sx={{
                    overflowX: 'auto', height: window.innerHeight - 210, flexWrap: 'wrap',
                    '&::-webkit-scrollbar': { height: 8 },
                }}>
                    <Box sx={{ pb: 0.5, px: 0.5, }}>
                        <CssVarsProvider>
                            <Table aria-label="table with sticky header" padding={"none"} stickyHeader
                                sx={{ width: '100%', tableLayout: 'fixed', minWidth: 800, }}>
                                <thead style={{ height: 4 }} size='small'>
                                    <tr style={{ height: 4 }} size='small'>
                                        <th size='sm' style={{ width: 50, textAlign: 'center' }}></th>
                                        <th size='sm' style={{ width: 120, textAlign: 'left', pl: 1 }}>CRF No</th>
                                        <th size='sm' style={{ width: 180, textAlign: 'left' }}>Req.Date</th>
                                        <th size='sm' style={{ width: 300, textAlign: 'left' }}>Purpose</th>
                                        <th size='sm' style={{ width: 300, textAlign: 'left' }}>Justification</th>
                                        <th size='sm' style={{ width: 170, textAlign: 'left' }}>Location</th>
                                        <th size='sm' style={{ width: 170, textAlign: 'left' }}>Expected Date</th>
                                        <th size='sm' style={{ width: 150, textAlign: 'left' }}>Received User</th>
                                        <th size='sm' style={{ width: 170, textAlign: 'left' }}>Received Date</th>
                                        <th size='sm' style={{ width: 150, textAlign: 'left' }}>Received Remarks</th>
                                    </tr >
                                </thead >
                                <tbody size='small' style={{ height: 4 }}>
                                    {receivedData?.map((val, index) => (
                                        <tr key={index} style={{ height: 4 }} size='small' >
                                            <td>
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
                                            <td style={{ fontSize: 13, pl: 1 }}>CRF/TMC/{val.req_slno}</td>
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
                                            <td style={{ fontSize: 13 }}>{val.acknowUser}</td>
                                            <td style={{ fontSize: 13 }}>{format(new Date(val.user_ack_date), 'dd-MM-yyyy hh:mm:ss a')}</td>
                                            <td style={{ fontSize: 13 }}>{(val.user_acknldge_remarks)}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </Table >
                        </CssVarsProvider >
                    </Box >
                </Paper >
                : <Box sx={{
                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                    pt: 10, color: 'grey'
                }}>
                    No Report Found
                </Box>
            }
        </Fragment >
    )
}

export default memo(ReceivedTable)