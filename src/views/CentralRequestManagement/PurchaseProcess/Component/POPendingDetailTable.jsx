import React, { Fragment, memo, useCallback, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Paper, Tooltip, Typography } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import { axioslogin } from 'src/views/Axios/Axios';
import { CssVarsProvider, IconButton } from '@mui/joy';
import _ from 'underscore'
import { useSelector } from 'react-redux';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import TelegramIcon from '@mui/icons-material/Telegram';


const POPendingDetailTable = ({ pendingPOList, count, setCount }) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const viewPOItemDetails = useCallback((indexvalue) => {
        setExpandedRow(expandedRow === indexvalue ? null : indexvalue);
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
    }, [setCount, count, id])

    return (
        <Fragment>
            <Box>
                <Box sx={{ pt: 0.4, flexWrap: 'wrap', maxHeight: window.innerHeight - 220 }}>
                    <Box variant="outlined" sx={{ overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
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

                                                <Box sx={{ mx: 2, pt: 0.5, boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.16)' }}>
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
                                                                bgcolor: itemIndex % 2 === 0 ? '#ffffff' : '#f9f9f9'
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