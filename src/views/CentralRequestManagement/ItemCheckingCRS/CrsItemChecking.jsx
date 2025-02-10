import { Box, Checkbox, CssVarsProvider, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Virtuoso } from 'react-virtuoso';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { axiosellider, axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import { useSelector } from 'react-redux';
import _ from 'underscore'
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp';
import CustomIconButtonCmp from '../ComonComponent/Components/CustomIconButtonCmp';
import SupplierSelect from './Component/SupplierSelect';
import { ToastContainer } from 'react-toastify';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
const CrsItemChecking = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([])
    const [supCode, setSupCode] = useState(0)
    const [open, setOpen] = useState(false)

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const backtoHome = useCallback(() => {
        history.push('/Home/CrfNewDashBoard');
    }, [history]);

    const changeReceivedQty = useCallback((item_slno, value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
            infoNotify("Please enter a valid number");
            return;
        }
        if (parsedValue < 0) {
            infoNotify("Delivered quantity cannot be negative");
            return;
        }
        const newValue = parsedValue || 0;
        const updatedTableData = tableData?.map(item => {
            if (item.item_slno === item_slno) {
                return { ...item, delivered_qty: newValue };
            }
            return item;
        });
        setTableData(updatedTableData);

    }, [tableData]);

    const changeDamageQty = useCallback((item_slno, value) => {
        const parsedValue = parseInt(value);
        if (isNaN(parsedValue)) {
            infoNotify("Please enter a valid number");
            return;
        }
        if (parsedValue < 0) {
            infoNotify("Damage quantity cannot be negative");
            return;
        }
        const newValue = parsedValue || 0;

        const updatedTableData = tableData?.map(item => {
            if (item.item_slno === item_slno) {
                return { ...item, damage_qty: newValue };
            }
            return item;
        });
        setTableData(updatedTableData);

    }, [tableData]);
    const changeRemarks = useCallback((itemSlno, value) => {
        setTableData((prevData) =>
            prevData.map((item) =>
                item.item_slno === itemSlno ? { ...item, remarks: value } : item
            )
        );
    }, []);
    const handleDamageChange = useCallback((index) => {
        setTableData(prevData =>
            prevData.map((item, idx) =>
                idx === index ? { ...item, damage: !item.damage, checked: !item.checked } : item
            )
        );
    }, []);

    const reset = useCallback(() => {
        setTableData([])
        setSupCode(0)
    }, [])

    const SearchData = useCallback(() => {
        if (supCode === 0) {
            infoNotify("Select Supplier")
        } else {
            setOpen(true)
            const getPendingPODetails = async (supCode) => {
                const result = await axioslogin.get(`/deliveryMarking/pendingPo/${supCode}`)
                return result.data
            }
            const getItemDetailsEllider = async (posearch) => {
                const result = await axiosellider.post('/crfpurchase/items', posearch);
                return result.data
            }
            const updateItemqty = async (patchQnty) => {
                const result = await axioslogin.post('/deliveryMarking/updateqty', patchQnty);
                return result.data
            }
            const updatepoStatusDetails = async (poStatusResult) => {
                const result = await axioslogin.post('/deliveryMarking/updatePoStatus', poStatusResult);
                return result.data
            }
            getPendingPODetails(supCode).then((val) => {
                const { success, data } = val
                if (success === 1) {
                    const posearch = data?.reduce((acc, val) => {
                        if (!acc.some(item => item.pono === val.po_number && item.stcode === val.crs_store_code)) {
                            acc.push({
                                pono: val.po_number,
                                stcode: val.crs_store_code
                            });
                        }
                        return acc;
                    }, []);
                    const poNumber = data?.map((val) => {
                        return {
                            pono: val.po_number,
                            stcode: val.crs_store_code,
                            marking_po_slno: val.marking_po_slno,
                            item_code: val.item_code,
                            item_slno: val.item_slno
                        }
                    })
                    getItemDetailsEllider(posearch).then((val) => {
                        const { success, ellData } = val
                        if (success === 1) {
                            const seen = new Set();
                            const patchQnty = ellData.map(item => {
                                const poItems = poNumber?.filter(po => po.pono === item.PO_NO && po.stcode === item.ST_CODE && po.item_code === item.IT_CODE);
                                return poItems.map(poItem => {
                                    const uniqueKey = `${poItem.marking_po_slno}-${item.IT_CODE}-${item.PDN_SUPQTY}`;
                                    if (!seen.has(uniqueKey)) {
                                        seen.add(uniqueKey);
                                        let item_status;
                                        if (item.PDN_SUPQTY === 0) {
                                            item_status = null;
                                        } else if (item.PDN_SUPQTY < item.PDN_QTY) {
                                            item_status = 0;
                                        } else if (item.PDN_SUPQTY >= item.PDN_QTY) {
                                            item_status = 1;
                                        }
                                        return {
                                            marking_po_slno: poItem.marking_po_slno,
                                            item_code: item.IT_CODE,
                                            item_slno: poItem.item_slno,
                                            received_qty: item.PDN_SUPQTY,
                                            item_status: item_status,
                                            edit_user: id
                                        }
                                    }
                                    return null;
                                }).filter(item => item !== null);
                            }).flat();
                            const poStatusArray = patchQnty.reduce((acc, curr) => {
                                if (!acc[curr.marking_po_slno]) {
                                    acc[curr.marking_po_slno] = { marking_po_slno: curr.marking_po_slno, item_statuses: [] };
                                }
                                acc[curr.marking_po_slno].item_statuses.push(curr.item_status);
                                return acc;
                            }, {});
                            const poStatusResult = Object.values(poStatusArray).map(val => {
                                const allNull = val.item_statuses.every(status => status === null);
                                const allOne = val.item_statuses.every(status => status === 1);
                                let po_status;
                                if (allNull) {
                                    po_status = 1;
                                } else if (allOne) {
                                    po_status = 0;
                                } else {
                                    po_status = 1;
                                }
                                return {
                                    po_status: po_status,
                                    edit_user: id,
                                    marking_po_slno: val.marking_po_slno,
                                };
                            });
                            updateItemqty(patchQnty).then((val) => {
                                const { success } = val
                                if (success === 1) {
                                    updatepoStatusDetails(poStatusResult).then((val) => {
                                        const { success, message } = val
                                        if (success === 1) {
                                            const getItemDetails = async (supCode) => {
                                                try {
                                                    const result = await axioslogin.get(`/deliveryMarking/getitem/${supCode}`)
                                                    const { success, data } = result.data
                                                    if (success === 1) {

                                                        const poItems = data?.map((val) => {
                                                            return {
                                                                marking_po_slno: val.marking_po_slno,
                                                                item_slno: val.item_slno,
                                                                item_code: val.item_code,
                                                                item_name: val.item_name,
                                                                item_qty: val.item_qty,
                                                                received_qty: val.received_qty,
                                                                pending_qty: val.item_qty - val.received_qty,
                                                                item_status: val.item_status,
                                                                delivered_qty: 0,
                                                                damage: false,
                                                                damage_qty: 0,
                                                                remarks: ''
                                                            }
                                                        })
                                                        setTableData(poItems)
                                                        setOpen(false)
                                                    } else {
                                                        setTableData([])
                                                        setOpen(false)
                                                        infoNotify("No PO Found")
                                                    }
                                                } catch (error) {
                                                    warningNotify("Error to fetch Item Details:", error);
                                                    setTableData([])
                                                    setOpen(false)
                                                }
                                            }
                                            getItemDetails(supCode)
                                        } else {
                                            setOpen(false)
                                            warningNotify(message)
                                        }
                                    }).catch((error) => {
                                        warningNotify("Error in save Po Status:", error);
                                    });
                                } else {
                                    warningNotify("Error Occured while update item qty")
                                }
                            }).catch((error) => {
                                warningNotify("Error Occured while update item qty:", error);
                            });
                        }
                    })
                }
            }).catch((error) => {
                warningNotify("Error in getting Po List:", error);
            });


        }
    }, [supCode, id])

    const SaveData = useCallback(() => {
        const allZero = tableData.every((item) => item.delivered_qty === 0);
        if (allZero) {
            infoNotify("You have not entered any delivered quantities.");
        } else {
            const newData = tableData?.filter((val) => val.damage === true && val.damage_qty === 0)
            if (newData.length !== 0) {
                infoNotify("Enter Damage Qty");
                return;
            }
            const insertItemChecking = async (inserItems) => {
                const result = await axioslogin.post('/deliveryMarking/insertCheckItems', inserItems);
                return result.data
            }
            const inserItems = tableData?.map((val, ind) => {
                let pending_status;
                if (val.delivered_qty === 0) {
                    pending_status = null;
                } else if (val.delivered_qty < val.pending_qty) {
                    pending_status = 1;
                } else if (val.delivered_qty >= val.pending_qty) {
                    pending_status = 0;
                }
                return {
                    supplier_code: supCode,
                    item_code: val.item_code,
                    item_name: val.item_name,
                    pending_qty: val.pending_qty,
                    create_user: id,
                    delivered_qty: val.delivered_qty,
                    excess_qty: val.delivered_qty > val.pending_qty ? (val.delivered_qty - val.pending_qty) : 0,
                    pending_status: pending_status,
                    damage_qty: val.damage === true ? val.damage_qty : 0,
                    remarks: val.damage === true ? val.remarks : '',
                    balance_qty: (val.delivered_qty <= val.pending_qty) ? (val.pending_qty - val.delivered_qty) : 0,
                };
            });

            insertItemChecking(inserItems).then((val) => {
                const { success, message } = val
                if (success === 1) {
                    succesNotify(message)
                    reset()
                } else {
                    warningNotify(message)
                }
            }).catch((error) => {
                warningNotify("Error in Saving Item Checking Details", error);
            });
        }
    }, [tableData, id, reset, supCode]);

    return (
        <Fragment>
            <ToastContainer />
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ height: window.innerHeight - 80 }}>
                <CssVarsProvider>
                    <Box sx={{ display: 'flex', backgroundColor: "#f0f3f5", border: '1px solid #B4F5F0' }}>
                        <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>Item Checking</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
                            <CssVarsProvider>
                                <CustomCloseIconCmp
                                    handleChange={backtoHome}
                                />
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    <Box sx={{
                        pt: 0.5, bgcolor: 'white', height: window.innerHeight - 135, overflow: 'auto', flexWrap: 'wrap',
                    }}>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Box sx={{ pt: 1, width: { xs: '100%', md: '60vw', lg: '50vw', xl: '50vw' } }}>
                                <Box sx={{ display: 'flex', px: 1 }}>
                                    <Box sx={{ pt: 1, flex: 1.5 }}>
                                        <Box sx={{ pl: 1, fontSize: 12, color: '#0d47a1' }} >SUPPLIER <KeyboardArrowDownIcon fontSize='small' /></Box>
                                        <Box sx={{ pt: 0.5 }}>
                                            <SupplierSelect supCode={supCode} setSupCode={setSupCode} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ flex: 0.3, pt: 3.7, pl: 0.5 }}>
                                        <   CustomIconButtonCmp
                                            handleChange={SearchData}
                                        >
                                            Search
                                            <SearchTwoToneIcon sx={{ height: 22, width: 22, color: '#1565c0', ml: 1, pt: 0.2 }} />
                                        </CustomIconButtonCmp>
                                    </Box>
                                    {tableData.length !== 0 ?
                                        <Box sx={{ flex: 0.3, pt: 3.7, pl: 0.5 }}>
                                            <   CustomIconButtonCmp
                                                handleChange={SaveData}
                                            >
                                                Save
                                                <InventoryTwoToneIcon sx={{ height: 22, width: 22, color: '#1565c0', ml: 1, pt: 0.2 }} />
                                            </CustomIconButtonCmp>
                                        </Box>
                                        : null}

                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            bgcolor: 'white', pt: 0.5, overflow: 'auto', mx: 1, flexWrap: 'wrap', height: window.innerHeight - 220,
                        }}>
                            {tableData.length !== 0 ? (
                                <Box sx={{ width: '100%' }}>
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        sx={{
                                            bgcolor: '#607d8b',
                                            flexWrap: 'nowrap',
                                            py: 0.5,
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                        }}
                                    >
                                        <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 13, color: 'white', m: 0.5 }}>Sl.No</Typography>
                                        <Typography sx={{ width: 100, fontWeight: 550, fontSize: 13, color: 'white', m: 0.5, textAlign: 'center', }}>Item Code</Typography>
                                        <Typography sx={{ width: 250, fontWeight: 550, fontSize: 13, color: 'white', m: 0.5 }}>Item</Typography>
                                        <Typography sx={{ width: 110, fontWeight: 550, fontSize: 13, color: 'white', m: 0.5, textAlign: 'left' }}>Pending Qty</Typography>
                                        <Typography sx={{ width: 120, fontWeight: 550, fontSize: 13, color: 'white', m: 0.5, textAlign: 'center' }}>Delivered Qty</Typography>
                                        <Typography sx={{ width: 350, fontWeight: 550, fontSize: 13, color: 'white', m: 0.5, textAlign: 'center' }}>Damage</Typography>
                                    </Box>
                                    <Virtuoso
                                        style={{ height: window.innerHeight - 270, width: '100%' }}
                                        data={tableData}
                                        itemContent={(index, val) => (
                                            <React.Fragment key={val.item_slno}>
                                                <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap', cursor: 'pointer' }}>
                                                    <Typography sx={{ width: 40, textAlign: 'center', fontSize: 12, pt: 1.2 }}>{index + 1}</Typography>
                                                    <Typography sx={{ width: 100, fontSize: 12, pt: 1.2, textAlign: 'center', }}>{val.item_code}</Typography>
                                                    <Typography sx={{ width: 250, fontSize: 12, pt: 1.2 }}>{val.item_name}</Typography>
                                                    <Typography sx={{ width: 110, fontSize: 12, pt: 1.2, textAlign: 'center' }}>{val.pending_qty} </Typography>
                                                    <Box sx={{ width: 120, fontSize: 12, m: 0.5, textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            autoComplete='off'
                                                            value={val.delivered_qty}
                                                            onChange={(e) => changeReceivedQty(val.item_slno, e.target.value)}
                                                            style={{
                                                                textAlign: 'center',
                                                                height: 25,
                                                                border: '1px solid #bbdefb',
                                                                color: '#01579b',
                                                                fontSize: 14,
                                                                borderRadius: 6, width: 90,
                                                            }}
                                                        >
                                                        </input>
                                                    </Box>
                                                    <Box sx={{ width: 350, fontSize: 12, m: 0.5, display: 'flex' }}>
                                                        <Box sx={{ mt: 0.3 }}>
                                                            <Checkbox color="primary" variant="outlined" size="md"
                                                                checked={val.damage}
                                                                onChange={(e) => handleDamageChange(index)}
                                                                sx={{ color: 'blue' }} />
                                                        </Box>
                                                        <Box sx={{ pl: 1 }}>
                                                            <input
                                                                type="text"
                                                                autoComplete='off'
                                                                value={val.damage ? val.damage_qty : ''}
                                                                onChange={(e) => changeDamageQty(val.item_slno, e.target.value)}
                                                                disabled={!val.damage}
                                                                style={{
                                                                    textAlign: 'center',
                                                                    height: 25,
                                                                    border: '1px solid #bbdefb',
                                                                    color: '#01579b',
                                                                    fontSize: 14,
                                                                    borderRadius: 6, width: 80,
                                                                }}
                                                            >
                                                            </input>
                                                        </Box>
                                                        <Box sx={{ pl: 1 }}>
                                                            <input
                                                                type="text"
                                                                autoComplete='off'
                                                                value={val.damage ? val.remarks : ''}
                                                                onChange={(e) => { changeRemarks(val.item_slno, e.target.value); }}
                                                                disabled={!val.damage}
                                                                style={{
                                                                    height: 25,
                                                                    border: '1px solid #bbdefb',
                                                                    color: '#01579b',
                                                                    fontSize: 14,
                                                                    borderRadius: 6, width: 150,
                                                                }}
                                                            />
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            </React.Fragment>
                                        )}
                                    />
                                </Box>

                            ) : null}
                        </Box>
                    </Box>
                    {/* <Typography sx={{ width: 100, fontSize: 12, pt: 1.2, textAlign: 'center', fontWeight: 550, color: (val.received_qty === 0 ? 'black' : (val.item_qty === val.received_qty) ? 'green' : 'orange') }}>{val.received_qty} </Typography> */}
                </CssVarsProvider>
            </Box >
        </Fragment >
    )
}

export default memo(CrsItemChecking)