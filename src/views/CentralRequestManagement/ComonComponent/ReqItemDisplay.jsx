import { Box, Table, Typography } from '@mui/joy'
import React, { memo, Fragment } from 'react'

const ReqItemDisplay = ({ reqItems }) => {
    return (
        <Fragment>
            <Box sx={{ flexWrap: 'wrap' }}>
                {reqItems.length !== 0 ?
                    <Box sx={{ overflow: 'auto', flexWrap: 'wrap' }}>
                        <Typography sx={{ fontWeight: 'bold', px: 1, py: 0.7, color: '#145DA0', fontSize: 14 }}>
                            Requested Items
                        </Typography>
                        <Box sx={{ pb: 0.5, px: 0.5, }}>
                            <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' >
                                <thead>
                                    <tr>
                                        <th size='sm' style={{ borderRadius: 0, width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Sl.No</th>
                                        <th size='sm' style={{ width: 300, backgroundColor: '#e3f2fd' }}>&nbsp;&nbsp;Description</th>
                                        <th size='sm' style={{ width: 200, backgroundColor: '#e3f2fd' }}>&nbsp;&nbsp;Brand</th>
                                        <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Qty</th>
                                        <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}>UOM</th>
                                        <th size='sm' style={{ width: 350, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Specification</th>
                                        <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Price</th>
                                        <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Approx.Cost</th>
                                        {/* <th size='sm' style={{ borderRadius: 0, width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Status</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {reqItems?.map((item, ind) => {
                                        // const rowColor = (item.po_item_status === 1 ? '#1565c0' : item.item_status_approved === 1 ? '#59981A' :
                                        //     item.item_status_approved === 2 ? '#D13120' :
                                        //         item.item_status_approved === 3 ? '#DBA40E' : null);

                                        // const NewTooltip = ({ title, children }) => {
                                        //     return (
                                        //         <Tooltip
                                        //             key="unique-key"
                                        //             title={
                                        //                 <Box sx={{ bgcolor: 'white', color: '#003060', p: 1, textAlign: 'center', textTransform: 'capitalize' }}
                                        //                 >{title}
                                        //                 </Box>
                                        //             }
                                        //             placement="top"
                                        //             arrow
                                        //             sx={{
                                        //                 bgcolor: '#BFD7ED',
                                        //                 [`& .MuiTooltip-arrow`]: {
                                        //                     color: 'blue',
                                        //                 },
                                        //             }}
                                        //         >
                                        //             {children}
                                        //         </Tooltip>
                                        //     );
                                        // };

                                        return (
                                            // <NewTooltip key={item.req_detl_slno} placement="top" title={item.po_item_status === 1 ? "PO Generated" : (item.item_status_approved === 1
                                            //     ? "Approved"
                                            //     : item.item_status_approved === 2
                                            //         ? `Rejected by ${item.reject_remarks}`
                                            //         : item.item_status_approved === 3
                                            //             ? `On-Hold by ${item.hold_remarks}`
                                            //             : "")} >
                                            <tr key={item.req_detl_slno} style={{ cursor: 'pointer' }}>
                                                <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                                <td style={{ fontSize: 13 }}>&nbsp;{item.item_desc}</td>
                                                <td style={{ fontSize: 13 }}>&nbsp;{item.item_brand === '' ? 'Not Given' : item.item_brand}</td>
                                                <td style={{ textAlign: 'center', fontSize: 13 }}>{item.item_qnty}</td>
                                                <td style={{ textAlign: 'center', fontSize: 13 }}>{item.item_unit === 0 ? 'Not Given' : item.uom_name}</td>
                                                <td style={{ fontSize: 13 }}>&nbsp;{item.item_specification === '' ? 'Not Given' : item.item_specification}</td>
                                                <td style={{ textAlign: 'center', fontSize: 13 }}>{item.item_unit_price === 0 ? 'Not Given' : item.item_unit_price}</td>
                                                <td style={{ textAlign: 'center', fontSize: 13 }}>{item.aprox_cost === 0 ? 'Not Given' : item.aprox_cost}</td>
                                                {/* <td style={{ textAlign: 'center', color: rowColor }}>{item.po_item_status === 1 ? "PO Generated" : (item.item_status_approved === 1
                                                        ? "Approved" : item.item_status_approved === 2
                                                            ? "Rejected " : item.item_status_approved === 3
                                                                ? "On-Hold " : null)}</td> */}
                                            </tr>
                                            // </NewTooltip>
                                        );
                                    })}

                                    {/* {reqItems.map((item, ind) => (
                                        <tr key={ind}>
                                            <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                            <td style={{ fontSize: 13 }}>&nbsp;{item.item_desc}</td>
                                            <td style={{ fontSize: 13 }}>&nbsp;{item.item_brand === '' ? 'Not Given' : item.item_brand}</td>
                                            <td style={{ textAlign: 'center', fontSize: 13 }}>{item.item_qnty}</td>
                                            <td style={{ textAlign: 'center', fontSize: 13 }}>{item.item_unit === 0 ? 'Not Given' : item.uom_name}</td>
                                            <td style={{ fontSize: 13 }}>&nbsp;{item.item_specification === '' ? 'Not Given' : item.item_specification}</td>
                                            <td style={{ textAlign: 'center', fontSize: 13 }}>{item.item_unit_price === 0 ? 'Not Given' : item.item_unit_price}</td>
                                            <td style={{ textAlign: 'center', fontSize: 13 }}>{item.aprox_cost === 0 ? 'Not Given' : item.aprox_cost}</td>
                                            <td style={{
                                                textAlign: 'center', color: (item.item_status_approved === 1 ? '#59981A' :
                                                    item.item_status_approved === 2 ? '#D13120' :
                                                        item.item_status_approved === 3 ? '#DBA40E' : null)
                                            }}>{item.item_status_approved === 1
                                                ? "Approved" : item.item_status_approved === 2
                                                    ? "Rejected " : item.item_status_approved === 3
                                                        ? "On-Hold " : null}</td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </Table>
                        </Box>

                    </Box>
                    : <Box sx={{
                        display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                        pt: 10, color: 'grey'
                    }}>
                        No Item Requested
                    </Box>
                }
            </Box>
        </Fragment >
    )
}

export default memo(ReqItemDisplay)