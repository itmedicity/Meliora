
import React, { Fragment, memo, useCallback, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { format } from 'date-fns';
import { infoNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { Box, Button, CssVarsProvider, IconButton, Table, Tooltip, Typography } from '@mui/joy'
import { Dialog, DialogContent, Divider, Paper, Snackbar } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';


const PoAddModalView = ({ poAddModalData, pomodalopen, poModalhandleClose, podetailData, setpodetailData,
    modalItems, setModalItems, resetPOno }) => {
    const { req_slno, po_number, po_date, supplier_code, supplier_name, supply_store, storeName, expected_delivery,
        po_delivery, po_amount, approval_level, po_type, po_expiry, sub_store_slno, substoreName } = poAddModalData

    const [existArray, setExistArray] = useState([])
    const [existFlag, setExistFlag] = useState(0)
    const [open, setOpen] = useState(false);
    const buttonStyle = {
        fontSize: 15,
        color: '#003B73',
        height: '30px', minHeight: '30px', width: '80px',
        cursor: 'pointer',
        boxShadow: 5,
        // border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#003B73',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.91)',
        },
    }
    const DeleteItems = useCallback((val) => {
        if (modalItems.length !== 1) {
            const array = modalItems?.filter((value) => value.item_code !== val.item_code)
            setModalItems(array)
        } else {
            infoNotify("Can't Delete only one item left")
        }
    }, [modalItems, setModalItems])
    const AddToTable = useCallback(() => {
        const array = podetailData?.filter((value) => value.po_number === po_number && value.supply_store === supply_store)
        if (array.length === 0) {
            const podDatas = {
                req_slno: req_slno,
                po_number: po_number,
                po_date: format(new Date(po_date), 'yyyy-MM-dd HH:mm:ss'),
                supplier_code: supplier_code,
                supplier_name: supplier_name,
                po_status: 1,
                supply_store: supply_store,
                storeName: storeName,
                expected_delivery: format(new Date(expected_delivery), 'yyyy-MM-dd'),
                po_delivery: po_delivery,
                po_amount: po_amount,
                approval_level: approval_level,
                po_type: po_type,
                po_expiry: format(new Date(po_expiry), 'yyyy-MM-dd'),
                sub_store_slno: sub_store_slno,
                substoreName: substoreName,
                items: modalItems
            }
            const newArray = [...podetailData, podDatas]
            if (newArray.length !== 0) {
                setpodetailData(newArray)
                resetPOno()
                poModalhandleClose()
            }
        } else {
            infoNotify("PO Already Listed")
        }
    }, [podetailData, modalItems, setpodetailData, req_slno, po_number, po_date, supplier_code, supplier_name, supply_store,
        storeName, expected_delivery, po_delivery, po_amount, approval_level, po_type, po_expiry, resetPOno, sub_store_slno,
        poModalhandleClose, substoreName])

    const AddDetails = useCallback(() => {
        const postExist = {
            po_number: po_number,
            supply_store: supply_store
        }
        const checkPoExist = async (postExist) => {
            const result = await axioslogin.post('/newCRFPurchase/poExist', postExist);
            return result.data
        }
        checkPoExist(postExist).then((value) => {
            const { success, data } = value
            if (success === 1) {
                const poLIst = data
                    .filter((po, index, self) =>
                        index === self.findIndex((val) => val.req_slno === po.req_slno))
                    .map((po) => (
                        {
                            req_slno: po.req_slno,
                            po_number: po.po_number,
                            create_date: po.create_date
                        })
                    )
                setExistArray(poLIst)
                setOpen(true)
                setExistFlag(1)
            }
            else {
                AddToTable()
                setExistArray([])
                setExistFlag(0)
                setOpen(false)
            }
        })


    }, [po_number, supply_store, AddToTable])

    const CancelData = useCallback(() => {
        poModalhandleClose()
    }, [poModalhandleClose])

    return (
        <Fragment>
            <Dialog
                open={pomodalopen}
                keepMounted
                aria-labelledby="responsive-dialog-title"
                maxWidth='lg'
                aria-hidden='true'
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                <DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        // minWidth: '50vw',
                        borderRadius: 'md',
                        overflow: 'auto'
                    }}
                >
                    <Paper variant='outlined' square sx={{ display: 'flex', height: 40, bgcolor: '#41729F', flexWrap: 'wrap', m: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1, flex: 1 }}>
                            <Typography sx={{ fontSize: 17, color: 'white' }}>Purchase Order</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 0.1, justifyContent: 'flex-end', fontSize: 20, p: 1 }}>
                            <HighlightOffIcon sx={{
                                cursor: 'pointer', height: 25, width: 25, color: 'white',
                                ":hover": {
                                    color: 'white'
                                },
                                opacity: 0.8
                            }} onClick={poModalhandleClose} />
                        </Box>
                    </Paper>
                    <Box sx={{ overflow: 'auto', px: 1 }}>
                        <Box sx={{ display: 'flex', flex: 1 }}>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>Order # </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": " + po_number}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>PO Date  </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": " + po_date}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flex: 1, pt: 0.2 }}>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>Supplier  </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": " + supplier_name}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>CRS Store </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": " + storeName}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flex: 1, pt: 0.2 }}>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>Delivery  </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": " + po_delivery}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>Amount  </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": Rs " + po_amount}</Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flex: 1, pt: 0.2 }}>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>Expected Delivery  </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": " + expected_delivery}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ pl: 1, flex: 0.7 }}>
                                    <Typography sx={{ fontSize: 14 }}>Store  </Typography>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ color: '#003B73', fontSize: 14 }}>{": " + substoreName}</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ pt: 0.5 }}>
                            {modalItems.length !== 0 ?
                                <Box variant="outlined" sx={{ maxHeight: '50vh', overflow: 'auto', '&::-webkit-scrollbar': { height: 8 } }}>
                                    <CssVarsProvider>
                                        <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow>
                                            <thead style={{ alignItems: 'center' }}>
                                                <tr style={{ height: 0.5 }}>
                                                    <th size='sm' style={{ width: 60, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Item Code</th>
                                                    <th size='sm' style={{ width: 170, fontSize: 14 }}>&nbsp;Item</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Qnty</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Rate </th>
                                                    <th size='sm' style={{ width: 100, fontSize: 14 }}>&nbsp;MRP</th>
                                                    <th size='sm' style={{ width: 120, fontSize: 14 }}>&nbsp;Tax</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Tax Amount</th>
                                                    <th size='sm' style={{ width: 80, fontSize: 14 }}>&nbsp;Net Amount</th>
                                                    <th size='sm' style={{ width: 33, fontWeight: 650, fontSize: 14 }}></th>
                                                </tr>
                                            </thead>
                                            <tbody size='small'>
                                                {modalItems?.map((val) => (
                                                    <tr key={val.slno} size='small' style={{ maxHeight: 2, cursor: 'pointer' }}>
                                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{val.slno}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_code}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_name}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_qty}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_rate}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.item_mrp}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.tax}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.tax_amount}</td>
                                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.net_amount}</td>
                                                        <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                                            <CssVarsProvider>
                                                                <Tooltip title="Delete" placement='right'>
                                                                    <DeleteIcon
                                                                        sx={{
                                                                            color: '#B95C50',
                                                                            ":hover": {
                                                                                color: '#DC4731'
                                                                            }
                                                                        }}
                                                                        onClick={(e) => DeleteItems(val)}
                                                                    />
                                                                </Tooltip>
                                                            </CssVarsProvider>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </CssVarsProvider>
                                </Box>
                                : null}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 1 }}>
                        <Box sx={{ pt: 1, px: 0.5 }}>
                            <CssVarsProvider>
                                {existFlag === 0 ?
                                    <Button
                                        variant="outlined"
                                        sx={buttonStyle}
                                        onClick={AddDetails}
                                    >
                                        Add
                                    </Button>
                                    :
                                    <Button
                                        variant="outlined"
                                        sx={buttonStyle}
                                        onClick={AddToTable}
                                    >
                                        Add
                                    </Button>
                                }
                            </CssVarsProvider>

                        </Box>

                        <Box sx={{ pt: 1, pr: 1 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    sx={buttonStyle}
                                    onClick={CancelData}
                                >
                                    Cancel
                                </Button>
                            </CssVarsProvider>

                        </Box>
                    </Box>
                    <Snackbar
                        autoHideDuration={5000}
                        open={open}
                        onClose={() => setOpen(false)}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        sx={{
                            width: 500,
                            minHeight: '30vh',
                            maxHeight: '50vh',
                            mt: 30,
                            pt: 0,
                            border: '2px solid #41729F',
                            bgcolor: 'white',
                            '.MuiSnackbarContent-root': {
                                width: '100%',
                                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                padding: '16px',
                            },
                        }}
                    >
                        <Box >
                            <Typography level="h6" component="div" sx={{
                                mt: 2, textAlign: 'center', fontSize: 15,
                                fontWeight: 'bold', pb: 0.5
                            }}>
                                List of CRF used For Selected PO
                            </Typography>
                            <Divider flexItem={true} />
                            <Box display="flex" flexDirection="column" sx={{
                                pt: 1
                            }}>
                                <Box display="flex" justifyContent="space-between" padding={0.5} sx={{ borderBottom: '1px solid lightgrey' }} >
                                    <Typography level="body2" sx={{ width: 100, textAlign: 'center', fontWeight: 550, fontSize: 12, }}>Sl.No</Typography>
                                    <Typography level="body2" sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Request No.</Typography>
                                    <Typography level="body2" sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Order#</Typography>
                                    <Typography level="body2" sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, }}>Create Date</Typography>
                                </Box>
                                <Virtuoso
                                    style={{ minHeight: '15vh', maxHeight: '48vh' }}
                                    data={existArray}
                                    itemContent={(index, val) => (
                                        <Box key={index} display="flex" justifyContent="space-between" >
                                            <Typography sx={{ width: 100, textAlign: 'center', fontSize: 12, my: 1, }}>{index + 1}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1, }}>{"CRF/TMC/" + val.req_slno}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1, }}>{val.po_number}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1, }}>{format(new Date(val.create_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                        </Box>
                                    )}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2, pb: 1 }}>
                                    <CssVarsProvider>
                                        <IconButton sx={{
                                            fontSize: 12, height: '23px', minHeight: '23px', width: '30px',
                                            bgcolor: '#0288d1', color: 'white',
                                            ":hover": {
                                                bgcolor: '#0288d1', color: 'white',
                                            }
                                        }} onClick={() => {
                                            setOpen(false);
                                            setExistFlag(1);
                                        }}>OK</IconButton>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                    </Snackbar>

                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default memo(PoAddModalView)