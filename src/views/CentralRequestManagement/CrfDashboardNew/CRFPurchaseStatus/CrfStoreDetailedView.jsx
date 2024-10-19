import { Box, CssVarsProvider, IconButton, Option, Select, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format, parse } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Virtuoso } from 'react-virtuoso'
import { infoNotify } from 'src/views/Common/CommonCode'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomCloseIconCmp from '../../ComonComponent/CustomCloseIconCmp';
import CustomIconButtonCmp from '../../ComonComponent/CustomIconButtonCmp';
import CustomInputDateCmp from '../../ComonComponent/CustomInputDateCmp';

const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
};
const CrfStoreDetailedView = ({ setPoFlag, disData, setDisData, tableData, heading, storeFlag, setStoreFlag }) => {

    const [startDate, setStartDate] = useState(formatDateForInput(new Date()));
    const [endDate, setEndDate] = useState(formatDateForInput(new Date()));
    const [searchFlag, setSearchFlag] = useState('0')
    const [searchCrf, setsearchCrf] = useState('')
    // const [storeModFlag, setStoreModFlag] = useState(0)
    // const [storeOpen, setStoreOpen] = useState(false)
    const [expandedRow, setExpandedRow] = useState(null);
    // const [grnDetailsView, setgrnDetailsView] = useState([])
    // const [poNumber, setPoNumber] = useState()

    const backtoHome = useCallback(() => {
        setPoFlag(0)
        setStoreFlag(0)
    }, [setPoFlag, setStoreFlag])

    const startDateChange = useCallback((e) => {
        setStartDate(e.target.value)
    }, [])
    const endDateChange = useCallback((e) => {
        setEndDate(e.target.value)
    }, [])
    const ClearSearch = useCallback(() => {
        setSearchFlag(0)
        setStartDate(formatDateForInput(new Date()))
        setEndDate(formatDateForInput(new Date()))
        setsearchCrf('')
        setDisData(tableData)
    }, [tableData, setDisData])
    const changeSearchSelect = useCallback((e, newValue) => {
        setSearchFlag(newValue);
    }, [])

    const changeCrfNo = useCallback((e) => {
        setsearchCrf(e.target.value)
    }, [])

    const viewPOItemDetails = useCallback((indexvalue) => {
        setExpandedRow(expandedRow === indexvalue ? null : indexvalue);
    }, [expandedRow])
    const SearchData = useCallback(() => {
        if (searchFlag === '1') {
            const newData = tableData?.filter((val) => {
                const reqDate = new Date(val.po_date).setHours(0, 0, 0, 0);
                const start = parse(startDate, 'yyyy-MM-dd', new Date()).setHours(0, 0, 0, 0);
                const end = parse(endDate, 'yyyy-MM-dd', new Date()).setHours(0, 0, 0, 0);
                return reqDate >= start && reqDate <= end;
            });
            setDisData(newData)
        }
        else if (searchFlag === '2') {
            if (searchCrf === '') {
                infoNotify("Enter CRF No.")
            } else {
                const newData = tableData?.filter((val) => val.req_slno === parseInt(searchCrf))
                setDisData(newData)
            }
        }
    }, [tableData, startDate, endDate, searchFlag, searchCrf, setDisData])

    return (
        <Fragment>
            <Box sx={{ height: window.innerHeight - 160, flexWrap: 'wrap', bgcolor: 'white' }}>
                <Paper variant='outlined' sx={{ bgcolor: 'white', pt: 0.5, height: 92 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: 18, fontWeight: 550, color: '#41729F', ml: 1 }}>{heading}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, pt: 0.8, pr: 1 }}>
                            <CustomCloseIconCmp
                                handleChange={backtoHome}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ m: 0.5, }}>
                                <Select defaultValue="0" sx={{ width: 280, border: '1px solid #64b5f6', height: 20, color: '#1565c0', fontSize: 14 }}
                                    slotProps={{
                                        listbox: { placement: 'bottom-start' },
                                    }}
                                    placeholder="Search By"
                                    value={searchFlag}
                                    onChange={changeSearchSelect}
                                >
                                    <Option value="1">PO Date</Option>
                                    <Option value="2">CRF No.</Option>
                                </Select>
                            </Box>
                            <Box sx={{ my: 0.5, pr: 1 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        variant="plain"
                                        sx={{
                                            color: '#0277bd',
                                            width: '100%',
                                            fontSize: 12,
                                            borderRadius: 5,
                                            height: '19px',
                                            lineHeight: '1',
                                        }}
                                        onClick={ClearSearch}
                                    >
                                        <FilterAltTwoToneIcon sx={{ fontWeight: 550, color: '#0277bd', pr: 0.5, width: 30, height: 20 }} />
                                        Clear Filter
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                            {searchFlag === '1' ?
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ my: 0.5, mx: 0.5 }} >
                                        <CssVarsProvider>
                                            <CustomInputDateCmp
                                                StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
                                                className={{
                                                    height: 25, borderRadius: 5, border: '1px solid #bbdefb',
                                                    color: '#0d47a1', fontSize: 14, width: 200,
                                                }}
                                                size={'md'}
                                                type='date'
                                                name={'startDate'}
                                                value={startDate}
                                                handleChange={startDateChange}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ my: 0.5 }} >
                                        <CssVarsProvider>
                                            <CustomInputDateCmp
                                                StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
                                                className={{
                                                    height: 35, borderRadius: 5, border: '1px solid #bbdefb',
                                                    color: '#0d47a1', fontSize: 14, width: 200,
                                                }}
                                                size={'md'}
                                                type='date'
                                                name={'endDate'}
                                                value={endDate}
                                                handleChange={endDateChange}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                : searchFlag === '2' ?
                                    <Box sx={{ display: 'flex', my: 0.5, ml: 0.5 }}>
                                        <CssVarsProvider>
                                            <CustomInputDateCmp
                                                StartIcon={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
                                                    <Typography sx={{ ml: 1, fontSize: '13px', color: '#0063C5' }}>CRF/TMC/</Typography>
                                                </Box>}
                                                className={{
                                                    borderRadius: 6, border: '1px solid #bbdefb', width: 250, height: 35, color: '#1565c0'
                                                }}
                                                size={'md'}
                                                type='text'
                                                name={'searchCrf'}
                                                value={searchCrf}
                                                handleChange={changeCrfNo}
                                            />
                                        </CssVarsProvider>

                                    </Box>
                                    : null}
                            {(searchFlag === '1' || searchFlag === '2') ?
                                <Box sx={{ pt: 0.4, pl: 1 }}>
                                    <   CustomIconButtonCmp
                                        handleChange={SearchData}
                                    >
                                        Search
                                        <SearchTwoToneIcon sx={{
                                            height: 22, width: 22, color: '#1565c0', ml: 1, pt: 0.2,
                                            '&:hover': {
                                                color: '#43B0F1'
                                            },
                                        }} />
                                    </CustomIconButtonCmp>
                                </Box>
                                : null
                            }
                        </Box>
                    </Box>
                </Paper>
                <Box sx={{ bgcolor: 'white', pt: 0.5, overflow: 'auto' }}>
                    {disData.length !== 0 ?
                        <Box sx={{ width: '100%' }}>
                            <Box display="flex" justifyContent="space-between" sx={{
                                bgcolor: '#41729F', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                                top: 0, zIndex: 1,
                            }}>
                                <Typography sx={{ width: 50, textAlign: 'center', fontWeight: 550, fontSize: 12, color: 'white' }}>Sl.No</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Req.No</Typography>
                                <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Order#</Typography>
                                <Typography sx={{ width: 170, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>PO Date</Typography>
                                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Supplier</Typography>
                                <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Delivery</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Types</Typography>
                                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Delivery Date</Typography>
                                <Typography sx={{ width: 120, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Amount</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>PO Expiry</Typography>
                                {storeFlag === 0 ? <Typography sx={{ width: 180, textAlign: 'center', fontWeight: 550, fontSize: 12, color: 'white' }}>Approval Status</Typography> : null}
                                <Typography sx={{ width: 150, textAlign: 'center', fontWeight: 550, fontSize: 12, color: 'white', mx: 0.5 }}>Current Status</Typography>
                                <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 550, fontSize: 12, mr: 2 }}></Typography>
                            </Box>
                            <Virtuoso
                                style={{ height: window.innerHeight - 282, width: '100%', }}
                                data={disData}
                                itemContent={(index, val) => (
                                    <React.Fragment key={val.slno}>
                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                            <Typography sx={{ width: 50, textAlign: 'center', fontSize: 12, my: 1 }}>{val.slno}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{"CRF/TMC/" + val.req_slno}</Typography>
                                            <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_no}</Typography>
                                            <Typography sx={{ width: 170, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.po_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.supplier_name}</Typography>
                                            <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_delivery}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_types}</Typography>
                                            <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{val.expected_delvery}</Typography>
                                            <Typography sx={{ width: 120, textAlign: 'left', fontSize: 12, my: 1 }}>{'Rs. ' + val.po_amount}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{val.po_expiry}</Typography>
                                            {storeFlag === 0 ? <Box sx={{
                                                pt: 0.5, width: 180, cursor: 'pointer', m: 0.5, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', pr: 0.5
                                            }}>
                                                <CssVarsProvider>
                                                    <IconButton
                                                        sx={{
                                                            backgroundColor: (val.po_complete === 1) ? ((val.aprv_status === 1) ? '#5CACEE' : (val.aprv_status === 2) ? '#0277bd' :
                                                                (val.aprv_status === 3) ? '#32CD32' : '#ADD8E6') : 'lightgrey',
                                                            color: (val.po_complete === 1) ? ((val.aprv_status === null) ? 'black' : 'white') : 'black',
                                                            width: '100%', fontSize: 12,
                                                            '&:hover': {
                                                                backgroundColor: (val.po_complete === 1) ? ((val.aprv_status === 1) ? '#5CACEE' : (val.aprv_status === 2) ? '#0277bd' :
                                                                    (val.aprv_status === 3) ? '#32CD32' : '#ADD8E6') : 'lightgrey',
                                                                color: (val.po_complete === 1) ? ((val.aprv_status === null) ? 'black' : 'white') : 'black',
                                                            },
                                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
                                                            borderRadius: 5, height: '25px', minHeight: '25px', lineHeight: '1.2',
                                                        }}
                                                    >
                                                        {val.approval}
                                                    </IconButton>
                                                </CssVarsProvider>
                                            </Box> : null}
                                            <Box sx={{
                                                width: 150, cursor: 'pointer', m: 0.5, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', pr: 0.5
                                            }} >
                                                < CssVarsProvider >
                                                    <IconButton
                                                        sx={{
                                                            fontSize: 12, minHeight: '25px', lineHeight: '1.2', maxHeight: '40px',
                                                            bgcolor: (val.po_complete === 1) ? '#5c6bc0' : '#0074B7', color: 'white', width: '150px', my: 0.5, py: 0.3,
                                                            '&:hover': {
                                                                bgcolor: (val.po_complete === 1) ? '#7986cb' : '#2E8BC0', color: 'white', fontWeight: 650
                                                            },
                                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                        }}
                                                    >
                                                        {val.now_who}
                                                    </IconButton>

                                                </CssVarsProvider>
                                            </Box>
                                            < Box sx={{ width: 30, textAlign: 'center', pt: 0.5, cursor: 'pointer', mr: 2 }}>
                                                <Tooltip title="View PO Items" placement="left">
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
                                                </Tooltip>
                                            </Box>
                                        </Box>
                                        {expandedRow === index && (
                                            <>
                                                {storeFlag === 0 ?
                                                    <Box sx={{ mx: 2, pt: 0.5, boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.16)' }}>
                                                        <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#BFD7ED' }}>
                                                            <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 13 }}>Sl.No</Typography>
                                                            <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>Item Code</Typography>
                                                            <Typography sx={{ width: 350, fontWeight: 550, fontSize: 13 }}>Item</Typography>
                                                            <Typography sx={{ width: 50, fontWeight: 550, fontSize: 13 }}>Qty</Typography>
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
                                                                <Typography sx={{ width: 60, fontSize: 12 }}>{(item.item_rate).toFixed(2)}</Typography>
                                                                <Typography sx={{ width: 70, fontSize: 12 }}>{(item.item_mrp).toFixed(2)}</Typography>
                                                                <Typography sx={{ width: 80, fontSize: 12 }}>{item.tax}</Typography>
                                                                <Typography sx={{ width: 100, fontSize: 12 }}>{(item.tax_amount).toFixed(2)}</Typography>
                                                                <Typography sx={{ width: 100, fontSize: 12 }}>{(item.net_amount).toFixed(2)}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                    :
                                                    <Box sx={{ mx: 2, pt: 0.5, boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.16)' }}>
                                                        <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ bgcolor: '#BFD7ED' }}>
                                                            <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 13 }}>Sl.No</Typography>
                                                            <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>Item Code</Typography>
                                                            <Typography sx={{ width: 350, fontWeight: 550, fontSize: 13 }}>Item</Typography>
                                                            <Typography sx={{ width: 50, fontWeight: 550, fontSize: 13 }}>Qty</Typography>
                                                            <Typography sx={{ width: 60, fontWeight: 550, fontSize: 13 }}>Rate</Typography>
                                                            <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>MRP</Typography>
                                                            <Typography sx={{ width: 80, fontWeight: 550, fontSize: 13 }}>Tax</Typography>
                                                            <Typography sx={{ width: 100, fontWeight: 550, fontSize: 13 }}>Tax Amount</Typography>
                                                            <Typography sx={{ width: 100, fontWeight: 550, fontSize: 13 }}>Net Amount</Typography>
                                                            <Typography sx={{ width: 70, fontWeight: 550, fontSize: 13 }}>GRN Qty</Typography>
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
                                                                <Typography sx={{ width: 60, fontSize: 12 }}>{(item.item_rate).toFixed(2)}</Typography>
                                                                <Typography sx={{ width: 70, fontSize: 12 }}>{(item.item_mrp).toFixed(2)}</Typography>
                                                                <Typography sx={{ width: 80, fontSize: 12 }}>{item.tax}</Typography>
                                                                <Typography sx={{ width: 100, fontSize: 12 }}>{(item.tax_amount).toFixed(2)}</Typography>
                                                                <Typography sx={{ width: 100, fontSize: 12 }}>{(item.net_amount).toFixed(2)}</Typography>
                                                                <Typography sx={{ width: 70, fontSize: 12, color: (item.grn_qnty === item.item_qty) ? '#59981A' : '#e65100', fontWeight: 650 }}>{item.grn_qnty}</Typography>
                                                            </Box>
                                                        ))}
                                                    </Box>
                                                }
                                            </>
                                        )}
                                    </React.Fragment>
                                )}
                            />
                        </Box>
                        :
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', fontSize: 30, opacity: 0.5,
                            pt: 10, color: 'grey'
                        }}>
                            No Report Found
                        </Box>
                    }
                </Box>


            </Box>
        </Fragment >
    )
}

export default memo(CrfStoreDetailedView)