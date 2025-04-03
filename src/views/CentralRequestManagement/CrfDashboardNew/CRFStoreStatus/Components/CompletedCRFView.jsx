import { Box, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CRFReqItemDetails from '../CRFReqItemDetails';
import { axioslogin } from 'src/views/Axios/Axios';
import { Virtuoso } from 'react-virtuoso';
import { format } from 'date-fns';
import { warningNotify } from 'src/views/Common/CommonCode';
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp';

const CompletedCRFView = ({ setFlag, disData, companyData }) => {
    const [reqItems, setReqItems] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const { company_name } = companyData

    const backtoHome = useCallback(() => {
        setFlag(0)
    }, [setFlag])

    const viewItemDetails = useCallback((req_slno) => {
        const getPOItems = async () => {
            try {
                const result = await axioslogin.get(`/newCRFStore/storeReceivedItem/${req_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    setReqItems(data);
                    setModalOpen(true)
                    setModFlag(1)
                } else {
                    setReqItems([]);
                    setModalOpen(false)
                    setModFlag(0)
                }
            } catch (error) {
                warningNotify("Error fetching item details:", error)
                setReqItems([]);
                setModalOpen(false)
                setModFlag(0)
            }
        }
        getPOItems()
    }, [])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
    }, [setModalOpen])

    return (
        <Fragment>
            {modFlag === 1 ? <CRFReqItemDetails handleClose={handleClose} open={modalopen} reqItems={reqItems} /> : null}
            <Box sx={{ height: window.innerHeight - 160, flexWrap: 'wrap', }}>
                <Paper variant='outlined' sx={{ display: 'flex', bgcolor: 'white', height: 40 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, pt: 1, pr: 1 }}>
                        <CustomCloseIconCmp
                            handleChange={backtoHome}
                        />
                    </Box>
                </Paper>
                <Box sx={{ bgcolor: 'white', overflow: 'auto', }}>
                    {disData.length !== 0 ?
                        <Box sx={{ width: '100%' }}>
                            <Box display="flex" justifyContent="space-between" sx={{
                                bgcolor: '#e3f2fd', flexWrap: 'nowrap', py: 1, position: 'sticky',
                                top: 0, zIndex: 1, border: '1px solid #AFD8F2', borderLeft: 'none', borderRight: 'none'
                            }}>
                                <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 14, color: 'white' }}>Sl.No</Typography>
                                <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Req.No</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Req.Date</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Req. Dpt</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Required. Dpt</Typography>
                                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Purpose</Typography>
                                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Justification</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Location</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 14, color: 'white' }}>Expected Date</Typography>
                                <Typography sx={{ minWidth: 50, textAlign: 'center', fontWeight: 550, fontSize: 12, mx: 0.5 }}></Typography>
                            </Box>
                            <Virtuoso
                                style={{ height: window.innerHeight - 282, width: '100%', }}
                                data={disData}
                                itemContent={(index, val) => (
                                    <React.Fragment key={index}>
                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                            <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                            <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>CRF / {company_name} + {val.req_slno}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.create_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1, textTransform: 'capitalize' }}>{val.user_deptsection.toLowerCase()}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1, textTransform: 'capitalize' }}>{val.req_deptsec.toLowerCase()}</Typography>
                                            <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.actual_requirement}</Typography>
                                            <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.needed}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.location}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.expected_date), 'dd-MM-yyyy')}</Typography>
                                            <Box sx={{
                                                width: 50, cursor: 'pointer', m: 0.5, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', pr: 0.5,
                                            }} >
                                                <Tooltip title="Item Details" placement="left">
                                                    <CheckCircleTwoToneIcon
                                                        sx={{
                                                            fontSize: 'lg',
                                                            color: '#145DA0',
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
                                                        onClick={() => viewItemDetails(val.req_slno)}
                                                    />
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                )}
                            />
                        </Box>
                        : null}
                </Box>
            </Box>
        </Fragment>
    )
}
export default memo(CompletedCRFView)