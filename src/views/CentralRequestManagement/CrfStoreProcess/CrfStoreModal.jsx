import React, { Fragment, useCallback, useState, memo, useEffect } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { axioslogin } from 'src/views/Axios/Axios'
import { CssVarsProvider, Typography } from '@mui/joy'
import { format } from 'date-fns';
import CrfStoreConfmModal from './CrfStoreConfmModal';
import StoreItemReceiveModal from './StoreItemReceiveModal';
import ApprovedItemListDis from '../ComonComponent/ApprovedItemListDis';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfStoreModal = ({ open, storeData, setStoreFlag, setStoreModal, setStoreData,
    count, setCount }) => {
    const { req_slno, req_date, actual_requirement, needed, expected_date,
    } = storeData

    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const [podetailFlag, setPOdetalFalg] = useState(0)
    const [getpoDetaildata, setgetPodetailData] = useState([])
    const [ApproveTableDis, setApproveTableDis] = useState(0)
    const [ApproveTableData, setApproveTableData] = useState([])
    useEffect(() => {
        const getPODetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFPurchase/getPOList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const datas = data && data.map((val) => {
                    return {
                        po_detail_slno: val.po_detail_slno,
                        req_slno: val.req_slno,
                        po_number: val.po_number,
                        po_date: format(new Date(val.po_date), 'dd-MM-yyyy'),
                        po_status: 1,
                        expected_delivery: format(new Date(val.expected_delivery), 'dd-MM-yyyy'),
                        supply_store: val.supply_store,
                        sub_storename: val.sub_store_name,
                        store_name: val.main_store,
                        store_recieve: val.store_recieve,
                        store_recieve_fully: val.store_recieve_fully
                    }
                })

                setgetPodetailData(datas)
                setPOdetalFalg(1)
            }
            else {
                setgetPodetailData([])
            }
        }


        const getApproItemDetails = async (req_slno) => {
            const result = await axioslogin.get(`/CRFRegisterApproval/getFinalItemListApproval/${req_slno}`)
            const { succes, dataa } = result.data
            if (succes === 1) {
                const datas = dataa.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        req_detl_slno: val.req_detl_slno,
                        req_slno: val.req_slno,
                        aprox_cost: val.aprox_cost,
                        item_status: val.item_status,
                        approved_itemunit: val.approved_itemunit !== null ? val.approved_itemunit : "Not Given",
                        approve_item_desc: val.approve_item_desc !== null ? val.approve_item_desc : "Not Given",
                        approve_item_brand: val.approve_item_brand !== '' ? val.approve_item_brand : "Not Given",
                        approve_item_unit: val.approve_item_unit,
                        item_qnty_approved: val.item_qnty_approved !== null ? val.item_qnty_approved : "Not Given",
                        approve_item_unit_price: val.approve_item_unit_price !== null ? val.approve_item_unit_price : "Not Given",
                        approve_aprox_cost: val.approve_aprox_cost !== null ? val.approve_aprox_cost : "Not Given",
                        item_status_approved: val.item_status_approved,
                        approve_item_status: val.approve_item_status,
                        approve_item_delete_who: val.approve_item_delete_who,
                        uom_name: val.uom_name,
                        approve_item_specification: val.approve_item_specification !== '' ? val.approve_item_specification : "Not Given",
                        old_item_slno: val.old_item_slno !== null ? val.old_item_slno : "",
                        item_slno: val.item_slno
                    }
                    return obj
                })
                setApproveTableDis(1)
                setApproveTableData(datas);
            } else {
                setApproveTableDis(0)
                setApproveTableData([])
            }
        }
        getApproItemDetails(req_slno)
        getPODetails(req_slno)

    }, [req_slno, count])


    const reset = useCallback(() => {
        setStoreFlag(0)
        setStoreModal(false)
        setStoreData([])
        setPOdetalFalg(0)
        setgetPodetailData([])
    }, [setStoreFlag, setStoreModal, setStoreData])


    const ModalClose = useCallback(() => {
        reset()
    }, [reset])

    const [edit, setEdit] = useState(0)
    const [podetlno, setPodetlno] = useState(0)
    const [okModal, setOkModal] = useState(false)
    const [strFulyReciv, setStrFulyRecev] = useState(0)
    const [partialFlag, setPartialFlag] = useState(0)
    const [fullyFlag, setFullyFlag] = useState(0)

    const handleClose = useCallback(() => {
        setEdit(0)
        setPodetlno(0)
        setOkModal(false)
        setPartialFlag(0)
        setFullyFlag(0)
        setCount(count + 1)
    }, [setCount, count])


    return (

        <Fragment>
            <ToastContainer />
            {edit === 1 ?
                <CrfStoreConfmModal open={okModal} podetlno={podetlno} handleClose={handleClose}
                    count={count} setCount={setCount} partialFlag={partialFlag}
                    fullyFlag={fullyFlag} strFulyReciv={strFulyReciv} req_slno={req_slno} /> : null
            }
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth='lg'
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: "100%",
                        height: 400
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        CRF Store Process
                    </DialogContentText>

                    <Box sx={{ width: "100%", mt: 0, display: "flex", flexDirection: "column" }}>
                        <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                            <Box sx={{
                                width: "100%", display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'column', xl: 'column', },
                            }}>
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box sx={{ pr: 1.5 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Request No: CRF/TMC/{req_slno}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 4 }}                                    >
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Req.Date: {req_date}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                {
                                    actual_requirement !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Actual Requirement:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: "75%", minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {actual_requirement}
                                        </Paper>
                                    </Box> : null
                                }
                                {
                                    needed !== null ? <Box sx={{
                                        width: "100%", display: "flex", p: 0.5,
                                        flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                    }}>
                                        <Box
                                            sx={{ width: "25%", }}>
                                            <CssVarsProvider>
                                                <Typography sx={{ fontSize: 15 }}>Justification for need:</Typography>
                                            </CssVarsProvider>
                                        </Box>
                                        <Paper sx={{
                                            width: '75%', minHeight: 10, maxHeight: 70, pl: 0.5, fontSize: 15, textTransform: "capitalize",
                                            overflow: 'auto', '::-webkit-scrollbar': { display: "none" }
                                        }} variant='none'>
                                            {needed}
                                        </Paper>
                                    </Box> : null
                                }
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0,
                                    flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                                }}>
                                    <Box
                                        sx={{ pr: 9 }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 15 }}>Expected Date: {expdate}</Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                        {ApproveTableDis === 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Approved Items</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <ApprovedItemListDis ApproveData={ApproveTableData}
                                />
                            </Paper> : null
                        }
                        <Box sx={{ width: "100%", mt: 0 }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >
                                {
                                    podetailFlag === 1 ?
                                        <Box sx={{ width: "100%", pl: 1, pb: 1, pr: 1, height: 200 }}> PO Details
                                            <StoreItemReceiveModal
                                                getpoDetaildata={getpoDetaildata}
                                                // columnDefs={column}
                                                // tableData={getpoDetaildata}
                                                setEdit={setEdit}
                                                setPartialFlag={setPartialFlag}
                                                setPodetlno={setPodetlno}
                                                setOkModal={setOkModal}
                                                setFullyFlag={setFullyFlag}
                                                setStrFulyRecev={setStrFulyRecev}
                                            />
                                        </Box> : null
                                }
                            </Paper>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ModalClose} color="secondary" >Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(CrfStoreModal)