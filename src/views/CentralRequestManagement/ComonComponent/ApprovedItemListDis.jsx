import { Box, Table, Tooltip, Typography } from '@mui/joy'
import React, { memo, Fragment } from 'react'
const ApprovedItemListDis = ({ approveTableData }) => {
    // const [apprvdItem, setapprvdItem] = useState([])
    // useEffect(() => {
    //     if (approveTableData) {
    //         const newData = approveTableData?.filter((val) => val.item_status_approved === 1)
    //         setapprvdItem(newData)
    //     }
    // }, [approveTableData])
    return (
        <Fragment>
            {approveTableData.length !== 0 ?
                <Box sx={{ overflow: 'auto', flexWrap: 'wrap', px: 0.5 }}>
                    <Typography sx={{ fontWeight: 'bold', mx: 1, pb: 0.5, color: '#145DA0', fontSize: 14 }}>
                        Approved Items
                    </Typography>
                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' >
                        <thead style={{ height: 4 }} size='small'>
                            <tr style={{ height: 4 }} size='small'>
                                <th size='sm' style={{ borderRadius: 0, width: 50, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Sl.No</th>
                                <th size='sm' style={{ width: 300, backgroundColor: '#e3f2fd' }}>&nbsp;&nbsp;Description</th>
                                <th size='sm' style={{ width: 100, backgroundColor: '#e3f2fd' }}>&nbsp;&nbsp;Brand</th>
                                <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Qty</th>
                                <th size='sm' style={{ width: 80, textAlign: 'center', backgroundColor: '#e3f2fd' }}>UOM</th>
                                <th size='sm' style={{ width: 350, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Specification</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Price</th>
                                <th size='sm' style={{ width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Approx.cost</th>
                                <th size='sm' style={{ borderRadius: 0, width: 100, textAlign: 'center', backgroundColor: '#e3f2fd' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approveTableData?.map((item, ind) => {
                                const rowColor = item.po_item_status === 1 ? '#1565c0' : item.item_status_approved === 1 ? '#59981A' :
                                    item.item_status_approved === 2 ? '#D13120' :
                                        item.item_status_approved === 3 ? '#DBA40E' : null;

                                const NewTooltip = ({ title, children }) => {
                                    return (
                                        <Tooltip
                                            key="unique-key"
                                            title={
                                                <Box sx={{ bgcolor: 'white', color: '#003060', p: 1, textAlign: 'center', textTransform: 'capitalize' }}
                                                >{title}
                                                </Box>
                                            }
                                            placement="top"
                                            arrow
                                            sx={{
                                                bgcolor: '#BFD7ED',
                                                [`& .MuiTooltip-arrow`]: {
                                                    color: 'blue',
                                                },
                                            }}
                                        >
                                            {children}
                                        </Tooltip>
                                    );
                                };

                                return (
                                    <NewTooltip key={item.req_detl_slno} placement="top" title={item.po_item_status === 1 ? "PO Generated" : (item.item_status_approved === 1
                                        ? "Approved"
                                        : item.item_status_approved === 2
                                            ? `Rejected by ${item.reject_remarks}`
                                            : item.item_status_approved === 3
                                                ? `On-Hold by ${item.hold_remarks}`
                                                : "")} >
                                        <tr style={{ cursor: 'pointer' }}>
                                            <td style={{ textAlign: 'center' }}>{ind + 1}</td>
                                            <td style={{ fontSize: 13 }}>&nbsp;{item.approve_item_desc}</td>
                                            <td>&nbsp;{item.approve_item_brand === '' ? 'Not Given' : item.approve_item_brand}</td>
                                            <td style={{ textAlign: 'center', }}>{item.item_qnty_approved}</td>
                                            <td style={{ textAlign: 'center', }}>{item.approve_item_unit === 0 ? 'Not Given' : item.apprv_uom}</td>
                                            <td>&nbsp;{item.approve_item_specification === '' ? 'Not Given' : item.approve_item_specification}</td>
                                            <td style={{ textAlign: 'center', }}>{item.approve_item_unit_price === 0 ? 'Not Given' : item.approve_item_unit_price}</td>
                                            <td style={{ textAlign: 'center', }}>{item.approve_aprox_cost === 0 ? 'Not Given' : item.approve_aprox_cost}</td>
                                            <td style={{ textAlign: 'center', color: rowColor }}>{item.po_item_status === 1 ? "PO Generated" : (item.item_status_approved === 1
                                                ? "Approved" : item.item_status_approved === 2
                                                    ? "Rejected " : item.item_status_approved === 3
                                                        ? "On-Hold " : null)}</td>
                                        </tr>
                                    </NewTooltip>
                                );
                            })}
                        </tbody>
                    </Table>
                </Box>
                : <Box sx={{
                    display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                    pt: 10, color: 'grey'
                }}>
                    No items Approved
                </Box>
            }
        </Fragment>
    )
}

export default memo(ApprovedItemListDis)