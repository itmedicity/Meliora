import React, { Fragment, memo, useCallback, useState } from 'react'
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import { Box, Tooltip, Typography } from '@mui/joy';
import { Virtuoso } from 'react-virtuoso';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { Paper } from '@mui/material';
import DeliveredPoDetails from './DeliveredPoDetails';
import { warningNotify } from 'src/views/Common/CommonCode';
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp';


const DeliveryMarkingTable = ({ setFlag, disData, setDisData }) => {
    const [poDetails, setPoDetails] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)

    const backtoHome = useCallback(() => {
        setFlag(0)
        setDisData([])
    }, [setFlag, setDisData])

    const viewPOItemDetails = useCallback((val) => {
        const { delivery_mark_slno } = val
        const getPoData = async (delivery_mark_slno) => {
            try {
                const result = await axioslogin.get(`/newCRFRegister/getpo/${delivery_mark_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const newData = data?.map((po) => {
                        return {
                            marking_po_slno: po.marking_po_slno,
                            po_number: po.po_number,
                            po_date: po.po_date,
                            main_store: po.main_store,
                            expected_delivery: po.expected_delivery === null ? 'Nil' : format(new Date(po.expected_delivery), 'dd-MM-yyyy')
                        }
                    })
                    setPoDetails(newData)
                    setModalOpen(true)
                    setModFlag(1)
                } else {
                    setPoDetails([])
                    setModalOpen(false)
                    setModFlag(0)
                }
            } catch (error) {
                warningNotify("Error fetching PO details:", error)
                setPoDetails([])
                setModalOpen(false)
                setModFlag(0)
            }
        }
        getPoData(delivery_mark_slno)
    }, [])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
        setPoDetails([])
    }, [setModalOpen])

    return (
        <Fragment>
            {modFlag === 1 ? <DeliveredPoDetails handleClose={handleClose} open={modalopen} poDetails={poDetails} /> : null}
            <Box sx={{ height: window.innerHeight - 160, flexWrap: 'wrap', bgcolor: 'white' }}>
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
                                bgcolor: '#41729F', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                                top: 0, zIndex: 1,
                            }}>
                                <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12, color: 'white' }}>Sl.No</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>DC Marking Date</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Supplier</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>DC Received Date</Typography>
                                <Typography sx={{ width: 170, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Mode Of Transport</Typography>
                                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Bill Details</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Remarks</Typography>
                                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Receiver</Typography>
                                <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 550, fontSize: 12, }}></Typography>
                            </Box>
                            {/* <Virtuoso
                                style={{ height: window.innerHeight - 282, width: '100%', }}
                                data={disData}
                                itemContent={(index, val) => (
                                    <React.Fragment key={val.slno}>
                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                            <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_mark_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.supplier_name}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_receive_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>
                                                {[val.mt_direct, val.mt_courier].filter(Boolean).join(', ')}
                                            </Typography>

                                            <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.delivery_bill_details}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.remarks}</Typography>
                                            <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.received_user}</Typography>
                                            < Box sx={{ width: 30, textAlign: 'center', pt: 0.5, cursor: 'pointer', mr: 2 }}>
                                                <Tooltip title="PO Details" placement="left">
                                                    <ArrowDropDownCircleTwoToneIcon
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
                                                        onClick={() => viewPOItemDetails(val)}
                                                    />
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                )}
                            /> */}
                            <Virtuoso
                                style={{ height: window.innerHeight - 282, width: '100%' }}
                                data={disData}
                                itemContent={(index, val) => {
                                    const billDetails = JSON.parse(val.delivery_bill_details || '[]');
                                    const formattedBillDetails = billDetails
                                        .map(bill => `${bill.delivered_bill_no} (${format(new Date(bill.delivered_bill_date), 'dd-MM-yyyy')})`)
                                        .join(', ');

                                    return (
                                        <React.Fragment key={val.slno}>
                                            <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                                <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_mark_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.supplier_name}</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_receive_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>
                                                    {val.mt_direct === 1 && val.mt_courier === 1 ? "Direct, Courier"
                                                        : val.mt_direct === 1 ? "Direct" : val.mt_courier === 1 ? "Courier" : "None"}
                                                </Typography>
                                                <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{formattedBillDetails}</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.remarks}</Typography>
                                                <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.received_user}</Typography>
                                                <Box sx={{ width: 30, textAlign: 'center', pt: 0.5, cursor: 'pointer', mr: 2 }}>
                                                    <Tooltip title="PO Details" placement="left">
                                                        <ArrowDropDownCircleTwoToneIcon
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
                                                            onClick={() => viewPOItemDetails(val)}
                                                        />
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        </React.Fragment>
                                    );
                                }}
                            />

                        </Box>
                        : null}
                </Box>
            </Box>
        </Fragment >
    )
}

export default memo(DeliveryMarkingTable)