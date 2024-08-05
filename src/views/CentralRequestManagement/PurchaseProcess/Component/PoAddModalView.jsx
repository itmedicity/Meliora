import { Box, Button, CssVarsProvider, Table, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogContent, Paper } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { format } from 'date-fns';
import { infoNotify } from 'src/views/Common/CommonCode';

const PoAddModalView = ({ poAddModalData, pomodalopen, poModalhandleClose, podetailData, setpodetailData,
    modalItems, setModalItems, resetPOno }) => {
    const { req_slno, po_number, po_date, supplier_name, supply_store, storeName, expected_delivery,
        po_delivery, po_amount } = poAddModalData
    console.log(poAddModalData);


    const buttonStyle = {
        fontSize: 17,
        color: '#003B73',
        cursor: 'pointer',
        boxShadow: 5,
        border: 'none',
        transition: 'transform 0.2s, bgcolor 0.2s',
        '&:hover': {
            bgcolor: 'white',
            color: '#003B73',
            transform: 'scale(1.1)',
        },
        '&:active': {
            transform: 'scale(0.95)',
        },
    }

    const DeleteItems = useCallback((val) => {
        if (modalItems.length !== 0) {
            const array = modalItems?.filter((value) => value.item_code !== val.item_code)
            setModalItems(array)
        }
    }, [modalItems, setModalItems])

    const AddDetails = useCallback(() => {

        const array = podetailData?.filter((value) => value.po_number === po_number && value.supply_store === supply_store)
        if (array.length === 0) {
            const podDatas = {
                req_slno: req_slno,
                po_number: po_number,
                po_date: format(new Date(po_date), 'yyyy-MM-dd HH:mm:ss'),
                supplier_name: supplier_name,
                po_status: 1,
                supply_store: supply_store,
                storeName: storeName,
                expected_delivery: format(new Date(expected_delivery), 'yyyy-MM-dd'),
                po_delivery: po_delivery,
                po_amount: po_amount,
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

    }, [podetailData, modalItems, setpodetailData, req_slno, po_number, po_date, supplier_name, supply_store,
        storeName, expected_delivery, po_delivery, po_amount, resetPOno, poModalhandleClose])

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
                                    <Typography sx={{ fontSize: 14 }}>Store </Typography>
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
                        <Box sx={{ pt: 0.4 }}>
                            <CssVarsProvider>
                                <Button

                                    variant="plain"
                                    sx={buttonStyle}
                                    onClick={AddDetails}
                                >
                                    Add
                                </Button>
                            </CssVarsProvider>

                        </Box>
                        <Box sx={{ pr: 2, pt: 0.4 }}>
                            <CssVarsProvider>
                                <Button
                                    variant="plain"
                                    sx={buttonStyle}
                                    onClick={CancelData}
                                >
                                    Cancel
                                </Button>
                            </CssVarsProvider>

                        </Box>
                    </Box>


                </DialogContent>
            </Dialog>





            {/* <CssVarsProvider>
                <Modal
                    // aria-labelledby="modal-title"
                    // aria-describedby="modal-desc"
                    open={pomodalopen}
                    onClose={poModalhandleClose}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', }}
                >
                    <ModalDialog
                        variant="outlined"
                        sx={{
                            width: '50vw',
                            maxHeight: '80vh',

                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                                color: '#bf360c',
                                height: 35, width: 35
                            }}
                        />
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#41729F', justifyContent: 'center', m: 1, p: 1 }}>
                            <Typography sx={{ fontSize: 17, color: 'white' }}>Purchase Order</Typography>
                        </Box>
                        <Box sx={{ overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ pl: 1, flex: 0.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>Order # </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73' }}>{": " + po_number}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ pl: 1, flex: 0.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>PO Date  </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73' }}>{": " + po_date}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ pl: 1, flex: 0.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>Supplier  </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73' }}>{": " + supplier_name}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ pl: 1, flex: 0.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>Store </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73' }}>{": " + storeName}</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ pl: 1, flex: 0.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>Delivery  </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73' }}>{": " + po_delivery}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ pl: 1, flex: 0.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>Amount  </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73' }}>{": " + "Rs " + po_amount}</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                    <Box sx={{ pl: 1, flex: 0.7 }}>
                                        <Typography sx={{ fontSize: 15 }}>Expected Delivery  </Typography>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography sx={{ color: '#003B73' }}>{": " + expected_delivery}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', flex: 1 }}>
                                </Box>
                            </Box>
                            <Box>
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
                            <Box sx={{ pt: 0.4 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="plain"
                                        sx={buttonStyle}
                                        onClick={AddDetails}
                                    >
                                        Add
                                    </Button>
                                </CssVarsProvider>

                            </Box>
                            <Box sx={{ pr: 2, pt: 0.4 }}>
                                <CssVarsProvider>
                                    <Button
                                        variant="plain"
                                        sx={buttonStyle}
                                        onClick={CancelData}
                                    >
                                        Cancel
                                    </Button>
                                </CssVarsProvider>

                            </Box>
                        </Box>
                    </ModalDialog>
                </Modal>

            </CssVarsProvider> */}
        </Fragment >
    )
}

export default memo(PoAddModalView)