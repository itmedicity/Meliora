// import { Box, CssVarsProvider, Table, Tooltip, Typography, } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PendingItemDetailsTable from './PendingItemDetailsTable';
// import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios';
import { format } from 'date-fns';
import { CssVarsProvider, IconButton } from '@mui/joy';
import _ from 'underscore'
import { useSelector } from 'react-redux';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import TelegramIcon from '@mui/icons-material/Telegram';


const POPendingDetailTable = ({ pendingPOList, count, setCount }) => {

    // const [itemData, setItemData] = useState([])
    // const [itemFlag, setItemFlag] = useState(0)
    // const [modalopen, setModalOpen] = useState(false)
    // const [store, setStore] = useState('')
    // const [count, setCount] = useState(0)

    // const [pendingPOList, setPendingPOList] = useState([])
    const [expandedRow, setExpandedRow] = useState(null);
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)



    // useEffect(() => {
    //     const getPendingItems = async () => {
    //         const result = await axioslogin.get('/newCRFPurchase/POPending');
    //         const { success, data } = result.data;
    //         if (success === 1) {
    //             setOpen(false)
    //             const poLIst = data
    //                 .filter((po, index, self) =>
    //                     index === self.findIndex((val) => val.po_number === po.po_number))
    //                 .map((po, ind) => (
    //                     {
    //                         slno: ind + 1,
    //                         po_detail_slno: po.po_detail_slno,
    //                         req_slno: po.req_slno,
    //                         po_no: po.po_number,
    //                         po_date: format(new Date(po.po_date), 'dd-MM-yyyy hh:mm:ss a'),
    //                         supplier_name: capitalizeWords(po.supplier_name),
    //                         storeName: capitalizeWords(po.main_store),
    //                         po_delivery: capitalizeWords(po.po_delivery),
    //                         po_types: po.po_type === 'S' ? 'Stock Order' : 'Specific',
    //                         po_amount: po.po_amount,
    //                         po_expiry: po.po_expiry ? format(new Date(po.po_expiry), 'dd-MM-yyyy') : 'Not Updated',
    //                         expected_delvery: po.expected_delivery ? format(new Date(po.expected_delivery), 'dd-MM-yyyy') : 'Not Updated',
    //                         // approval: po.approval_level === 1 ? 'Level 1 ' :
    //                         //     po.APPROVAL === 2 ? 'Level 2' :
    //                         //         po.APPROVAL === 3 ? 'Level 3' : 'Not Approved',
    //                         approval: po.approval_level === 1 ? 'Purchase Dept Approved' :
    //                             po.approval_level === 2 ? 'Purchase Manager Approved' :
    //                                 po.approval_level === 3 ? "Director's Approved" : 'Not Approved',
    //                         aprv_status: po.approval_level
    //                     }));


    //             const poItems = data?.map((val) => {
    //                 const obj = {
    //                     po_no: val.po_number,
    //                     item_code: val.item_code,
    //                     item_name: val.item_name,
    //                     item_qty: val.item_qty !== null ? val.item_qty : 0,
    //                     item_rate: val.item_rate !== null ? (val.item_rate).toFixed(2) : 0,
    //                     item_mrp: val.item_mrp !== null ? (val.item_mrp).toFixed(2) : 0,
    //                     tax: val.tax !== null ? val.tax : 'Nil',
    //                     tax_amount: val.tax_amount !== null ? (val.tax_amount).toFixed(2) : 0,
    //                     net_amount: val.net_amount !== 0 ? (val.net_amount).toFixed(2) : 0
    //                 }
    //                 return obj
    //             })
    //             const combinedData = poLIst?.map(po => {
    //                 const details = poItems?.filter(item => item.po_no === po.po_no);
    //                 return {
    //                     ...po,
    //                     items: details
    //                 };
    //             });


    //             setPendingPOList(combinedData)
    //         }
    //         else {
    //             setOpen(false)
    //         }
    //     }
    //     getPendingItems()

    // }, [setOpen, apprvCount, count])
    // console.log(pendingPOList);

    const viewPOItemDetails = useCallback((indexvalue) => {
        // setItemFlag(1)
        setExpandedRow(expandedRow === indexvalue ? null : indexvalue);
        // setExpandedRow(prev => (prev === index ? null : index));
        // setModalOpen(true)
        // setItemData(items)
        // setStore(storeName)
    }, [expandedRow])

    const POtoSupplierUpdate = useCallback((req_slno, aprrvdStatus, po_no) => {
        if (aprrvdStatus === 3) {
            const PoApprovalPatch = {
                edit_user: id,
                req_slno: req_slno,
                po_number: po_no
            }
            const updatePoApprovals = async (PoApprovalPatch) => {
                const result = await axioslogin.patch('/newCRFPurchase/PoFinals', PoApprovalPatch);
                const { success, message } = result.data;
                if (success === 1) {
                    setCount(count + 1)
                    succesNotify(message)
                }
                else {
                    warningNotify(message)
                }
            }
            updatePoApprovals(PoApprovalPatch)
        } else {
            infoNotify("PO Not Yet Approved")
        }
    }, [count, id])

    // const handleClose = useCallback(() => {
    //     setModalOpen(false)
    //     setItemFlag(0)
    // }, [setModalOpen])

    // const TableComponents = {
    //     Scroller: React.forwardRef((props, ref) => (
    //         <TableContainer component={Paper} {...props} ref={ref} />
    //     )),
    //     Table: (props) => (
    //         <Table {...props} stickyHeader />
    //     ),
    //     TableHead: TableHead,
    //     TableRow: TableRow,
    //     TableBody: React.forwardRef((props, ref) => (
    //         <TableBody {...props} ref={ref} />
    //     )),
    //     TableCell: TableCell,
    // };

    return (
        <Fragment>
            {/* <CustomBackDrop open={open} text="Please Wait" /> */}
            {/* {itemFlag === 1 ? <PendingItemDetailsTable itemData={itemData} modalopen={modalopen} handleClose={handleClose}
                store={store} /> : null} */}
            <Box>
                <Box sx={{ pt: 0.4, flexWrap: 'wrap', maxHeight: window.innerHeight - 220 }}>
                    <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
                        {/* <CssVarsProvider>
                                <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                                    <thead sx={{ alignItems: 'center' }}>
                                        <tr sx={{ height: 0.5 }}>
                                            <th size='sm' sx={{ width: 60, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                            <th size='sm' sx={{ width: 80, fontSize: 14 }}>&nbsp;Order#</th>
                                            <th size='sm' sx={{ width: 170, fontSize: 14 }}>&nbsp;PO Date</th>
                                            <th size='sm' sx={{ width: 200, fontSize: 14 }}>&nbsp;Supplier</th>
                                            <th size='sm' sx={{ width: 80, fontSize: 14 }}>&nbsp;Delivery </th>
                                            <th size='sm' sx={{ width: 100, fontSize: 14 }}>&nbsp;Types</th>
                                            <th size='sm' sx={{ width: 120, fontSize: 14 }}>&nbsp;Delivery Date </th>
                                            <th size='sm' sx={{ width: 150, fontSize: 14 }}>&nbsp;Amount</th>
                                            <th size='sm' sx={{ width: 100, fontSize: 14 }}>&nbsp;PO Expiry</th>
                                            <th size='sm' sx={{ width: 50, fontSize: 14 }}>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody size='small'>
                                        {pendingPOList?.map((val) => {
                                            return (< tr key={val.slno} size='small'
                                                sx={{
                                                    maxHeight: 2, cursor: 'pointer'
                                                }}  >
                                                <td size='sm' sx={{ fontSize: 12, height: 5, textAlign: 'center' }}>{val.slno}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_no}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_date}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{val.supplier_name}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_delivery}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_types}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{val.expected_delvery}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{'Rs. ' + val.po_amount}</td>
                                                <td size='sm' sx={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_expiry}</td>
                                                <td size='sm' sx={{ textAlign: 'center', height: 5 }}>
                                                    <CssVarsProvider>
                                                        <Tooltip title="View PO Items" placement='left'>
                                                            < DriveFileRenameOutlineIcon sx={{
                                                                padding: 'none',
                                                                color: '#607d8b',
                                                                ":hover": {
                                                                    color: '#37474f'
                                                                }
                                                            }}
                                                                onClick={() => viewPOItemDetails(val.items, val.storeName)}
                                                            />
                                                        </Tooltip>
                                                    </CssVarsProvider>
                                                </td>
                                            </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </CssVarsProvider> */}
                        {/* <TableVirtuoso
                                data={pendingPOList}
                                components={TableComponents}
                                fixedHeaderContent={() => (
                                    <TableRow sx={{ bgcolor: '#E9EAEC' }} >
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 60 }}>Sl.No</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 80 }}>Order#</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 170 }}>PO Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 200 }}>Supplier</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 120 }}>Delivery</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 100 }}>Types</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 120 }}>Delivery Date</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 150 }}>Amount</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 100 }}>PO Expiry</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, minWidth: 50 }}></TableCell>
                                    </TableRow>
                                )}
                                itemContent={(index, val) => (
                                    <>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.slno}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.po_no}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.po_date}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.supplier_name}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.po_delivery}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.po_types}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.expected_delvery}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{'Rs. ' + val.po_amount}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>{val.po_expiry}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderBottom: '1px solid lightgrey', pl: 1 }}>
                                            <Tooltip title="View PO Items" placement="left">
                                                <DriveFileRenameOutlineIcon sx={{ color: '#607d8b', height: 25, width: 25 }}
                                                    onClick={() => viewPOItemDetails(val.items, val.storeName)} />
                                            </Tooltip>

                                        </TableCell>
                                    </>
                                )}
                            /> */}
                        <Paper elevation={3}>

                            <Box display="flex" flexDirection="column">
                                <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#E9EAEC' }}>
                                    <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Sl.No</Typography>
                                    <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Order#</Typography>
                                    <Typography sx={{ width: 170, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>PO Date</Typography>
                                    <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Supplier</Typography>
                                    <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Delivery</Typography>
                                    <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Types</Typography>
                                    <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Delivery Date</Typography>
                                    <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Amount</Typography>
                                    <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>PO Expiry</Typography>
                                    <Typography sx={{ width: 180, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Approval Status</Typography>
                                    <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, pl: 1 }}></Typography>
                                    <Typography sx={{ width: 30, textAlign: 'left', fontWeight: 550, fontSize: 12 }}></Typography>
                                </Box>
                                <Virtuoso
                                    style={{ height: window.innerHeight - 220 }}
                                    data={pendingPOList}
                                    itemContent={(index, val) => (
                                        <React.Fragment key={val.slno}>
                                            <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey' }}>
                                                <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{val.slno}</Typography>
                                                <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_no}</Typography>
                                                <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_date}</Typography>
                                                <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.supplier_name}</Typography>
                                                <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_delivery}</Typography>
                                                <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_types}</Typography>
                                                <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.expected_delvery}</Typography>
                                                <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{'Rs. ' + val.po_amount}</Typography>
                                                <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_expiry}</Typography>
                                                <Box sx={{ pt: 0.5, width: 180 }}>
                                                    <CssVarsProvider>
                                                        <IconButton
                                                            sx={{
                                                                backgroundColor: (val.aprv_status === 1) ? '#5CACEE' : (val.aprv_status === 2) ? '#0277bd' :
                                                                    (val.aprv_status === 3) ? '#32CD32' : '#ADD8E6',
                                                                color: (val.aprv_status === null) ? 'black' : 'white',
                                                                width: 180, fontSize: 12,
                                                                '&:hover': {
                                                                    backgroundColor: (val.aprv_status === 1) ? '#5CACEE' : (val.aprv_status === 2) ? '#0277bd' :
                                                                        (val.aprv_status === 3) ? '#32CD32' : '#ADD8E6',
                                                                    color: (val.aprv_status === null) ? 'black' : 'white',
                                                                },
                                                                boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                                                borderRadius: 5, height: '25px', minHeight: '25px', lineHeight: '1.2',
                                                            }}
                                                        >
                                                            {val.approval}
                                                        </IconButton>
                                                    </CssVarsProvider>
                                                </Box>
                                                {/* <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12 }}>{val.approval}</Typography> */}
                                                <Box sx={{ pt: 0.5, width: 150, pl: 1, cursor: 'pointer' }}>
                                                    <CssVarsProvider>
                                                        {val.aprv_status === 3 ?
                                                            <IconButton
                                                                sx={{
                                                                    px: 2,
                                                                    fontSize: 12, height: '25px', minHeight: '25px', lineHeight: '1.2',
                                                                    color: 'primary.main', bgcolor: 'secondary.light',
                                                                    '&:hover': {
                                                                        bgcolor: 'secondary.main',
                                                                    },
                                                                    // padding: 1,
                                                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                                }}
                                                                onClick={() => POtoSupplierUpdate(val.req_slno, val.aprv_status, val.po_no)}
                                                            >
                                                                PO to Supplier
                                                                <TelegramIcon sx={{ height: 20, width: 20, color: '#1565c0', ml: 1 }} />
                                                            </IconButton>
                                                            :
                                                            <IconButton
                                                                disabled
                                                                sx={{
                                                                    px: 2,
                                                                    fontSize: 12, color: 'primary.main', minHeight: '25px', lineHeight: '1.2',
                                                                    bgcolor: 'secondary.light', '&:hover': {
                                                                        bgcolor: 'secondary.main',
                                                                    },
                                                                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5, height: '25px',
                                                                }}>
                                                                PO to Supplier
                                                                <TelegramIcon disabled sx={{ height: 20, width: 20, color: '#1565c0', ml: 1 }} />
                                                            </IconButton>}
                                                    </CssVarsProvider>
                                                </Box>
                                                <Box sx={{ width: 30, textAlign: 'center', pt: 0.5, pr: 3, cursor: 'pointer' }}>
                                                    <Tooltip title="View PO Items" placement="left">
                                                        <ExpandMoreIcon
                                                            sx={{
                                                                fontSize: 'lg',
                                                                // bgcolor: '#eeeeee',
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
                                                            onClick={() => viewPOItemDetails(index)} />
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                            {expandedRow === index ?

                                                <Box sx={{ mx: 2, pt: 0.5, boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.16)', }}>
                                                    {/* <Typography sx={{ fontWeight: 550, fontSize: 13 }}>Item Details:</Typography> */}
                                                    <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#bdbdbd' }}>
                                                        <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 13 }}>Sl.No</Typography>
                                                        <Typography sx={{ width: 80, fontWeight: 550, fontSize: 13 }}>Item Code</Typography>
                                                        <Typography sx={{ width: 250, fontWeight: 550, fontSize: 13 }}>Item</Typography>
                                                        <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>Qnty</Typography>
                                                        <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>Rate</Typography>
                                                        <Typography sx={{ width: 80, fontWeight: 550, fontSize: 13 }}>MRP</Typography>
                                                        <Typography sx={{ width: 100, fontWeight: 550, fontSize: 13 }}>Tax</Typography>
                                                        <Typography sx={{ width: 100, fontWeight: 550, fontSize: 13 }}>Tax Amount</Typography>
                                                        <Typography sx={{ width: 100, fontWeight: 550, fontSize: 13 }}>Net Amount</Typography>

                                                    </Box>
                                                    {val.items.map((item, itemIndex) => (
                                                        <Box key={itemIndex} display="flex" justifyContent="space-between" padding={0.5}
                                                            sx={{
                                                                cursor: 'pointer', borderBottom: '1px solid lightgrey',
                                                                borderRadius: 1,
                                                                bgcolor: itemIndex % 2 === 0 ? '#ffffff' : '#f9f9f9', cursor: 'pointer',
                                                            }}>

                                                            <Typography sx={{ width: 40, textAlign: 'center', fontSize: 12 }}>{itemIndex + 1}</Typography>
                                                            <Typography sx={{ width: 80, fontSize: 12 }}>{item.item_code}</Typography>
                                                            <Typography sx={{ width: 250, fontSize: 12 }}>{item.item_name}</Typography>
                                                            <Typography sx={{ width: 70, fontSize: 12 }}>{item.item_qty}</Typography>
                                                            <Typography sx={{ width: 70, fontSize: 12 }}>{item.item_rate}</Typography>
                                                            <Typography sx={{ width: 80, fontSize: 12 }}>{item.item_mrp}</Typography>
                                                            <Typography sx={{ width: 100, fontSize: 12 }}>{item.tax}</Typography>
                                                            <Typography sx={{ width: 100, fontSize: 12 }}>{item.tax_amount}</Typography>
                                                            <Typography sx={{ width: 100, fontSize: 12 }}>{item.net_amount}</Typography>
                                                        </Box>
                                                    ))}
                                                </Box>
                                                : null}

                                        </React.Fragment>
                                    )}
                                />
                            </Box>
                        </Paper>
                    </Box >
                </Box >
            </Box>
        </Fragment >
    )
}

export default memo(POPendingDetailTable)