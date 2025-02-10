import React, { Fragment, memo, useCallback, useState } from 'react'
import { Box, Typography } from '@mui/joy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Virtuoso } from 'react-virtuoso';
import { Paper } from '@mui/material';
import CustomToolTipForCRF from '../../ComonComponent/Components/CustomToolTipForCRF';


const CrfReqDetailCmpnt = ({ poDetails }) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const viewPOItemDetails = useCallback((indexvalue) => {
        setExpandedRow(expandedRow === indexvalue ? null : indexvalue);
    }, [expandedRow])
    return (
        <Fragment>
            {poDetails.length !== 0 ?
                <Paper variant='outlined' sx={{ p: 1, mt: 0.5 }}>
                    <Box display="flex" justifyContent="space-between" sx={{
                        bgcolor: '#e3f2fd', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                        top: 0, zIndex: 1, px: 1, borderBottom: '1px solid lightgrey',
                    }}>
                        <Typography sx={{ width: 60, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Order#</Typography>
                        <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>PO Date</Typography>
                        <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Supplier</Typography>
                        <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Delivery</Typography>
                        <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>CRS Store</Typography>
                        <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Delivery Date</Typography>
                        <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Store</Typography>
                        <Typography sx={{ width: 90, textAlign: 'left', fontWeight: 550, fontSize: 12 }}>Amount</Typography>
                        <Typography sx={{ width: 30, textAlign: 'left', fontWeight: 550, fontSize: 12, mr: 2 }}></Typography>
                    </Box>
                    <Virtuoso
                        style={{ height: 150, }}
                        data={poDetails}
                        itemContent={(index, val) => (
                            <React.Fragment key={val.po_detail_slno}>
                                <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap', px: 1 }}>
                                    <Typography sx={{ width: 60, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_number}</Typography>
                                    <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_date}</Typography>
                                    <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.supplier_name}</Typography>
                                    <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_delivery}</Typography>
                                    <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.storeName}</Typography>
                                    <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.expected_delivery}</Typography>
                                    <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.substoreName}</Typography>
                                    <Typography sx={{ width: 90, textAlign: 'left', fontSize: 12, my: 1 }}>{'Rs. ' + val.po_amount}</Typography>
                                    < Box sx={{ width: 30, textAlign: 'center', pt: 0.5, cursor: 'pointer', mr: 2 }}>
                                        <CustomToolTipForCRF
                                            title={"View PO Items"}
                                            placement={"left"}
                                        >
                                            <ExpandMoreIcon
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
                                                onClick={() => viewPOItemDetails(index)} />
                                        </CustomToolTipForCRF>
                                    </Box>
                                </Box>
                                {expandedRow === index && (
                                    <Box sx={{ mx: 1, pt: 0.5, boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.16)' }}>
                                        <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#A9D1E4' }}>
                                            <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 13 }}>Sl.No</Typography>
                                            <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>Item Code</Typography>
                                            <Typography sx={{ width: 350, fontWeight: 550, fontSize: 13 }}>Item</Typography>
                                            <Typography sx={{ width: 50, fontWeight: 550, fontSize: 13 }}>Qnty</Typography>
                                            <Typography sx={{ width: 60, fontWeight: 550, fontSize: 13 }}>Rate</Typography>
                                            <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>MRP</Typography>
                                            <Typography sx={{ width: 80, fontWeight: 550, fontSize: 13 }}>Tax</Typography>
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
                                                <Typography sx={{ width: 70, fontSize: 12 }}>{item.item_code}</Typography>
                                                <Typography sx={{ width: 350, fontSize: 12 }}>{item.item_name}</Typography>
                                                <Typography sx={{ width: 50, fontSize: 12 }}>{item.item_qty}</Typography>
                                                <Typography sx={{ width: 60, fontSize: 12 }}>{item.item_rate}</Typography>
                                                <Typography sx={{ width: 70, fontSize: 12 }}>{item.item_mrp}</Typography>
                                                <Typography sx={{ width: 80, fontSize: 12 }}>{item.tax}</Typography>
                                                <Typography sx={{ width: 100, fontSize: 12 }}>{item.tax_amount}</Typography>
                                                <Typography sx={{ width: 100, fontSize: 12 }}>{item.net_amount}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </React.Fragment>
                        )}
                    />
                </Paper>
                : null}
        </Fragment>

    )
}

export default memo(CrfReqDetailCmpnt)