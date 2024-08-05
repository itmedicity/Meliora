// import { Box, CssVarsProvider, Table, Tooltip, Typography, } from '@mui/joy'
import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PendingItemDetailsTable from './PendingItemDetailsTable';
// import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import { axiosellider } from 'src/views/Axios/Axios';
import { format } from 'date-fns';

const POPendingDetailTable = ({ setOpen, poList }) => {

    const [modalData, setModalData] = useState([])
    const [modalflag, setModalflag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [store, setStore] = useState('')
    const [pendingPOList, setPendingPOList] = useState([])

    const capitalizeWords = (str) => str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    useEffect(() => {
        const pono = poList?.map((val) => val.po_number)
        const postdata = {
            ponumber: pono
        }
        const getPendingPODetails = async (postdata) => {
            const result = await axiosellider.post('/crfpurchase/getpendingpo', postdata);
            const { success, data } = result.data
            if (success === 2) {
                setOpen(false)
                const poLIst = data
                    .filter((po, index, self) =>
                        index === self.findIndex((val) => val.PO_NO === po.PO_NO))
                    .map((po, ind) => (
                        {
                            slno: ind + 1,
                            po_no: po.PO_NO,
                            po_date: format(new Date(po.POD_DATE), 'dd-MM-yyyy hh:mm:ss a'),
                            supplier_name: capitalizeWords(po.SUC_NAME),
                            storeName: capitalizeWords(po.STC_DESC),
                            po_delivery: capitalizeWords(po.POC_DELIVERY),
                            po_types: po.POC_TYPE === 'S' ? 'Stock Order' : 'Specific',
                            po_amount: po.PON_AMOUNT,
                            po_expiry: po.PO_EXPIRY ? format(new Date(po.PO_EXPIRY), 'dd-MM-yyyy') : 'Not Updated',
                            expected_delvery: po.EXPECTED_DATE ? format(new Date(po.EXPECTED_DATE), 'dd-MM-yyyy') : 'Not Updated',
                            approval: po.APPROVAL === 1 ? 'Level 1 ' :
                                po.APPROVAL === 2 ? 'Level 2' :
                                    po.APPROVAL === 3 ? 'Level 3' : 'Not Approved',
                            aprv_pending: po.APPROVAL === null ? 'Purchase Dept Approval Pending' :
                                po.APPROVAL === 1 ? 'Purchase Manager Approval Pending' :
                                    po.APPROVAL === 2 ? "Director's Approval Pending" : 'PO Approved'

                        }));

                const poItems = data?.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        po_no: val.PO_NO,
                        item_code: val.IT_CODE,
                        item_name: val.ITC_DESC,
                        item_qty: val.PDN_QTY1 !== null ? val.PDN_QTY : 0,
                        item_rate: val.PDN_RATE !== null ? (val.PDN_RATE).toFixed(2) : 0,
                        item_mrp: val.PDN_ORIGINALMRP !== null ? (val.PDN_ORIGINALMRP).toFixed(2) : 0,
                        tax: val.TXC_DESC !== null ? val.TXC_DESC : 'Nil',
                        tax_amount: val.PDN_TAXAMT !== null ? (val.PDN_TAXAMT).toFixed(2) : 0
                    }
                    return obj
                })

                const combinedData = poLIst?.map(po => {
                    const details = poItems?.filter(item => item.po_no === po.po_no);
                    return {
                        ...po,
                        items: details
                    };
                });
                setPendingPOList(combinedData)

            }
            else if (success === 1) {
            }
        }
        getPendingPODetails(postdata);
    }, [setOpen, poList])

    const viewPOItemDetails = useCallback((items, storeName) => {
        setModalflag(1)
        setModalOpen(true)
        setModalData(items)
        setStore(storeName)
    }, [])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModalflag(0)
    }, [setModalOpen])

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
            {modalflag === 1 ? <PendingItemDetailsTable modalData={modalData} modalopen={modalopen} handleClose={handleClose}
                store={store} /> : null}

            <Box sx={{ pt: 0.5, flexWrap: 'wrap', maxHeight: window.innerHeight - 220 }}>
                <>
                    {pendingPOList.length !== 0 ?
                        <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
                            {/* <CssVarsProvider>
                                <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                                    <thead style={{ alignItems: 'center' }}>
                                        <tr style={{ height: 0.5 }}>
                                            <th size='sm' style={{ width: 60, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                            <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Order#</th>
                                            <th size='sm' style={{ width: 170, fontSize: 14 }}>&nbsp;PO Date</th>
                                            <th size='sm' style={{ width: 200, fontSize: 14 }}>&nbsp;Supplier</th>
                                            <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Delivery </th>
                                            <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;Types</th>
                                            <th size='sm' style={{ width: 120, fontSize: 14 }}>&nbsp;Delivery Date </th>
                                            <th size='sm' style={{ width: 150, fontSize: 14 }}>&nbsp;Amount</th>
                                            <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;PO Expiry</th>
                                            <th size='sm' style={{ width: 50, fontSize: 14 }}>&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody size='small'>
                                        {pendingPOList?.map((val) => {
                                            return (< tr key={val.slno} size='small'
                                                style={{
                                                    maxHeight: 2, cursor: 'pointer'
                                                }}  >
                                                <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{val.slno}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_no}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_date}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.supplier_name}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_delivery}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_types}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.expected_delvery}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{'Rs. ' + val.po_amount}</td>
                                                <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.po_expiry}</td>
                                                <td size='sm' style={{ textAlign: 'center', height: 5 }}>
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
                                                <DriveFileRenameOutlineIcon style={{ color: '#607d8b', height: 25, width: 25 }}
                                                    onClick={() => viewPOItemDetails(val.items, val.storeName)} />
                                            </Tooltip>

                                        </TableCell>
                                    </>
                                )}
                            /> */}

                            <Paper elevation={3} style={{ padding: 4 }}>
                                <Box display="flex" flexDirection="column">
                                    <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ backgroundColor: '#E9EAEC' }}>
                                        <Typography style={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12 }}>Sl.No</Typography>
                                        <Typography style={{ width: 80, fontWeight: 550, fontSize: 12 }}>Order#</Typography>
                                        <Typography style={{ width: 170, fontWeight: 550, fontSize: 12 }}>PO Date</Typography>
                                        <Typography style={{ width: 200, fontWeight: 550, fontSize: 12 }}>Supplier</Typography>
                                        <Typography style={{ width: 80, fontWeight: 550, fontSize: 12 }}>Delivery</Typography>
                                        <Typography style={{ width: 100, fontWeight: 550, fontSize: 12 }}>Types</Typography>
                                        <Typography style={{ width: 120, fontWeight: 550, fontSize: 12 }}>Delivery Date</Typography>
                                        <Typography style={{ width: 120, fontWeight: 550, fontSize: 12 }}>Amount</Typography>
                                        <Typography style={{ width: 100, fontWeight: 550, fontSize: 12 }}>PO Expiry</Typography>
                                        <Typography style={{ width: 100, fontWeight: 550, fontSize: 12 }}>Approval</Typography>
                                        <Typography style={{ width: 200, fontWeight: 550, fontSize: 12 }}>Status</Typography>
                                        <Typography style={{ width: 50, fontWeight: 550, fontSize: 12 }}></Typography>
                                    </Box>
                                    <Virtuoso
                                        style={{ height: window.innerHeight - 220 }}
                                        data={pendingPOList}
                                        itemContent={(index, val) => (
                                            <Box key={val.slno} display="flex" justifyContent="space-between" padding={0.5} style={{ cursor: 'pointer', borderBottom: '1px solid lightgrey' }}>
                                                <Typography style={{ width: 50, textAlign: 'center', fontSize: 12 }}>{val.slno}</Typography>
                                                <Typography style={{ width: 80, fontSize: 12 }}>{val.po_no}</Typography>
                                                <Typography style={{ width: 170, fontSize: 12 }}>{val.po_date}</Typography>
                                                <Typography style={{ width: 200, fontSize: 12 }}>{val.supplier_name}</Typography>
                                                <Typography style={{ width: 80, fontSize: 12 }}>{val.po_delivery}</Typography>
                                                <Typography style={{ width: 100, fontSize: 12 }}>{val.po_types}</Typography>
                                                <Typography style={{ width: 120, fontSize: 12 }}>{val.expected_delvery}</Typography>
                                                <Typography style={{ width: 120, fontSize: 12 }}>{'Rs. ' + val.po_amount}</Typography>
                                                <Typography style={{ width: 100, fontSize: 12 }}>{val.po_expiry}</Typography>
                                                <Typography style={{ width: 100, fontSize: 12 }}>{val.approval}</Typography>
                                                <Typography style={{ width: 200, fontSize: 12 }}>{val.aprv_pending}</Typography>
                                                <Box style={{ width: 50, textAlign: 'center' }}>
                                                    <Tooltip title="View PO Items" placement="left">
                                                        {/* <IconButton onClick={() => viewPOItemDetails(val.items, val.storeName)}> */}
                                                        <DriveFileRenameOutlineIcon style={{ color: '#607d8b', height: 25, width: 25 }}
                                                            onClick={() => viewPOItemDetails(val.items, val.storeName)} />
                                                        {/* </IconButton> */}
                                                    </Tooltip>
                                                </Box>
                                            </Box>
                                        )}
                                    />
                                </Box>
                            </Paper>
                        </Box >
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: 20, opacity: 0.8 }}>
                            {/* No purchase orders are pending */}
                        </Box>
                    }
                </>
            </Box >
        </Fragment>
    )
}

export default memo(POPendingDetailTable)