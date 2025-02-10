import { Avatar, Box, CssVarsProvider, IconButton, Input, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CloseIcon from '@mui/icons-material/Close';
import { axioslogin } from 'src/views/Axios/Axios';
import { Paper } from '@mui/material';
import SupplierSelect from './Component/SupplierSelect';
import { format } from 'date-fns';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import { Virtuoso } from 'react-virtuoso';
import ArrowDropDownCircleTwoToneIcon from '@mui/icons-material/ArrowDropDownCircleTwoTone';
import PODetailsModalView from './Component/PODetailsModalView';

const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
};
const ViewDeliveryDetails = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([])
    const [supCode, setSupCode] = useState(0)
    const [supList, setsupList] = useState([])
    const [startDate, setStartDate] = useState(formatDateForInput(new Date()));
    const [endDate, setEndDate] = useState(formatDateForInput(new Date()));
    const [poDetails, setPoDetails] = useState([])
    const [poItems, setPoItems] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const backtoSetting = useCallback(() => {
        history.push('/Home/CrfNewDashBoard');
    }, [history]);

    // useEffect(() => {
    //     const getSupplierList = async () => {
    //         try {
    //             const result = await axioslogin.get('/deliveryMarking/supplier')
    //             const { success, data } = result.data
    //             if (success === 1) {
    //                 setsupList(data)
    //             } else {
    //                 setsupList([])
    //             }
    //         } catch (error) {
    //             warningNotify("Error to fetch Supplier Details:", error);
    //             setsupList([])
    //         }
    //     }
    //     getSupplierList()
    // }, [])

    const startDateChange = useCallback((e) => {
        setStartDate(e.target.value)
    }, [])
    const endDateChange = useCallback((e) => {
        setEndDate(e.target.value)
    }, [])
    const searchdata = useMemo(() => {
        return {
            supCode: supCode,
            from: format(new Date(startDate), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(endDate), 'yyyy-MM-dd 23:59:59'),
        }
    }, [supCode, startDate, endDate])

    const viewDetails = useCallback(() => {
        const getData = async (searchdata) => {
            try {
                const result = await axioslogin.post('/deliveryMarking/viewAll', searchdata)
                const { success, data } = result.data
                if (success === 1) {
                    const newData = data
                        .filter((po, index, self) =>
                            index === self.findIndex((val) => val.delivery_mark_slno === po.delivery_mark_slno))
                        .map((po, ind) => (
                            {
                                slno: ind + 1,
                                delivery_mark_slno: po.delivery_mark_slno,
                                dc_mark_date: po.dc_mark_date,
                                dc_receive_date: po.dc_receive_date,
                                mt_direct: po.mt_direct === 1 ? 'Direct' : '',
                                mt_courier: po.mt_courier === 1 ? 'Courier' : '',
                                package_count: po.package_count,
                                delivered_bill_no: po.delivered_bill_no,
                                delivered_bill_date: po.delivered_bill_date,
                                remarks: po.remarks,
                                received_user: po.received_user,
                                marking_po_slno: po.marking_po_slno
                            }
                        ))
                    setTableData(newData)
                } else if (success === 2) {
                    setTableData([])
                    infoNotify("No Report Found")
                }
                else {
                    warningNotify("Error Occured")
                }
            } catch (error) {
                warningNotify("Error to fetch delivery marking details:", error);
                setTableData([])
            }
        }
        getData(searchdata)
    }, [searchdata])

    const viewPOItemDetails = useCallback((val) => {
        const { delivery_mark_slno } = val
        const getPoData = async (delivery_mark_slno) => {
            try {
                const result = await axioslogin.get(`/deliveryMarking/getpo/${delivery_mark_slno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const newData = data
                        .filter((po, index, self) =>
                            index === self.findIndex((val) => val.marking_po_slno === po.marking_po_slno))
                        .map((po, ind) => (
                            {
                                marking_po_slno: po.marking_po_slno,
                                po_number: po.po_number,
                                po_date: po.po_date,
                                main_store: po.main_store,
                                expected_delivery: po.expected_delivery === null ? 'Nil' : format(new Date(po.expected_delivery), 'dd-MM-yyyy')
                            }
                        ))
                    setPoDetails(newData)
                    const poItem = data?.map((val) => {
                        return {
                            marking_po_slno: val.marking_po_slno,
                            item_slno: val.item_slno,
                            item_code: val.item_code,
                            item_name: val.item_name,
                            item_qty: val.item_qty,
                            received_qty: val.received_qty,
                        }
                    })
                    setPoItems(poItem)
                    setModalOpen(true)
                    setModFlag(1)
                } else {
                    setPoDetails([])
                    setModalOpen(false)
                    setModFlag(0)
                }
            } catch (error) {
                warningNotify("Error to fetch PO item details:", error);
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
            {modFlag === 1 ? <PODetailsModalView handleClose={handleClose} open={modalopen} poItems={poItems} poDetails={poDetails} /> : null}
            <Box sx={{ height: window.innerHeight - 150, bgcolor: 'white', }}>
                <CssVarsProvider>
                    <Paper sx={{ p: 1, display: 'flex', borderBottom: '1px solid lightgrey' }}>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1.3, fontSize: 12, color: '#0d47a1' }} >SUPPLIER</Box>
                            <Box sx={{ pl: 0.5, pt: 0.5 }}>
                                <SupplierSelect supCode={supCode} setSupCode={setSupCode} />
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ pl: 1.3, fontSize: 12, color: '#0d47a1' }} >DC RECEIVED DATE </Box>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ my: 0.5, mx: 0.5 }} >
                                    <CssVarsProvider>
                                        <Input
                                            startDecorator={<Typography sx={{ fontSize: 14, color: '#1565c0', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
                                            sx={{ height: 25, borderRadius: 6, border: '1px solid #64b5f6', width: 210, color: '#0d47a1', fontSize: 14 }}
                                            size="md"
                                            type="date"
                                            name="startDate"
                                            value={startDate}
                                            onChange={startDateChange}
                                        />
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ my: 0.5 }} >
                                    <CssVarsProvider>
                                        <Input
                                            startDecorator={<Typography sx={{ fontSize: 14, color: '#1565c0', fontWeight: 550, pr: 0.5 }}>End Date </Typography>}
                                            sx={{ height: '25px', borderRadius: 6, border: '1px solid #64b5f6', width: 210, color: '#0d47a1', fontSize: 14 }}
                                            size="md"
                                            type="date"
                                            name="endDate"
                                            value={endDate}
                                            onChange={endDateChange}
                                        />
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 0.5, justifyContent: 'flex-start', pt: 2.6, }}>
                            <Box sx={{ pl: 1 }}>
                                <IconButton
                                    sx={{
                                        width: '160px', border: '1px solid #bbdefb',
                                        fontSize: 13, height: '30px', lineHeight: '1.2',
                                        color: '#0d47a1', bgcolor: 'secondary.light', borderRadius: 6,
                                        '&:hover': {
                                            bgcolor: 'secondary.main',
                                        },
                                        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                    }}
                                    onClick={viewDetails}
                                >
                                    View
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}></Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pr: 0.2, flex: 0.5 }}>
                            <Tooltip title="Close" placement="bottom" >
                                <Avatar size="sm" variant="plain" sx={{
                                    bgcolor: '#f5f5f5', border: '1px solid #ffccbc',
                                    height: 25, width: 25
                                }}>
                                    <CloseIcon sx={{
                                        cursor: 'pointer', size: 'lg', fontSize: 20, color: '#E55B13',
                                        '&:hover': { color: 'red' }
                                    }} onClick={backtoSetting} />
                                </Avatar>
                            </Tooltip>
                        </Box>
                    </Paper>
                    <Box sx={{ bgcolor: 'white', pt: 1, overflow: 'auto', }}>
                        {tableData.length !== 0 ?
                            <Box sx={{ width: '100%' }}>
                                <Box display="flex" justifyContent="space-between" sx={{
                                    bgcolor: '#41729F', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                                    top: 0, zIndex: 1,
                                }}>
                                    <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12, color: 'white' }}>Sl.No</Typography>
                                    <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>DC Marking Date</Typography>
                                    <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>DC Received Date</Typography>
                                    <Typography sx={{ width: 170, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Mode Of Transport</Typography>
                                    <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Bill No.</Typography>
                                    <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Bill Date</Typography>
                                    <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Remarks</Typography>
                                    <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Receiver</Typography>
                                    <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 550, fontSize: 12, }}></Typography>
                                </Box>
                                <Virtuoso
                                    style={{ height: window.innerHeight - 282, width: '100%', }}
                                    data={tableData}
                                    itemContent={(index, val) => (
                                        <React.Fragment key={val.slno}>
                                            <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                                <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{val.slno}</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_mark_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.dc_receive_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                                {/* <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>{val.mt_direct + ', ' + val.mt_courier}</Typography> */}
                                                <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>
                                                    {[val.mt_direct, val.mt_courier].filter(Boolean).join(', ')}
                                                </Typography>

                                                <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.delivered_bill_no}</Typography>
                                                <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.delivered_bill_date), 'dd-MM-yyyy')}</Typography>
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
                                />
                            </Box>
                            : null}
                    </Box>
                </CssVarsProvider >
            </Box >
        </Fragment>
    )
}
export default memo(ViewDeliveryDetails)