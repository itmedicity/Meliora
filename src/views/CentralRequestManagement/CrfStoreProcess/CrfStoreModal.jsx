import React, { Fragment, useCallback, useState, memo, useEffect, useMemo } from 'react'
import Slide from '@mui/material/Slide';
import { ToastContainer } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Box, Paper } from '@mui/material'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { CssVarsProvider, Typography } from '@mui/joy'
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CrfReqDetailCmpnt from '../CRFRequestMaster/CrfReqDetailCmpnt';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const CrfStoreModal = ({ open, storeData, setStoreFlag, setStoreModal, setStoreData,
    count, setCount }) => {

    const { req_slno, req_date, actual_requirement, needed, expected_date,
        crm_purchase_slno, store_receive, storeack_user, store_receive_date
    } = storeData

    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [podetailFlag, setPOdetalFalg] = useState(0)
    const [getpoDetaildata, setgetPodetailData] = useState([])
    const [Acknowledgement, setAcknowledmnt] = useState(false)

    const updateAcknowldge = useCallback((e) => {
        if (e.target.checked === true) {
            setAcknowledmnt(true)
        }
        else {
            setAcknowledmnt(false)
        }
    }, [])

    useEffect(() => {
        const getPODetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFPurchase/getPOList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setgetPodetailData(data)
                setPOdetalFalg(1)
            }
            else {
                setgetPodetailData([])
            }
        }
        getPODetails(req_slno)
    }, [req_slno])

    const StoreAcknoldgePatch = useMemo(() => {
        return {
            store_receive: Acknowledgement === true ? 1 : 0,
            store_receive_user: id,
            store_receive_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            crm_purchase_slno: crm_purchase_slno,
        }
    }, [crm_purchase_slno, id, Acknowledgement])

    const reset = useCallback(() => {

        setStoreFlag(0)
        setStoreModal(false)
        setStoreData([])
        setPOdetalFalg(0)
        setgetPodetailData([])
        setAcknowledmnt(false)
    }, [setStoreFlag, setStoreModal, setStoreData])



    const submit = useCallback(() => {


        const updatePoApprovals = async (PoApprovalPatch) => {
            const result = await axioslogin.patch('/newCRFPurchase/storedataUpdate', PoApprovalPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }

        if (Acknowledgement === true) {
            updatePoApprovals(StoreAcknoldgePatch)
        } else {
            warningNotify("Please Acknow;edged")
        }
    }, [StoreAcknoldgePatch, Acknowledgement, setCount, count, reset])

    const ModalClose = useCallback(() => {
        reset()
    }, [reset])


    //column title setting
    const [column] = useState([
        { headerName: "PO Number", field: "po_number" },
        { headerName: "PO Date", field: "po_date", autoHeight: true, wrapText: true, width: 250, filter: "true" },

    ])

    return (

        <Fragment>
            <ToastContainer />
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
                        height: 540
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

                        <Box sx={{ width: "100%", mt: 0 }}>
                            <Paper variant='outlined' sx={{ mt: 1 }} >

                                {
                                    podetailFlag === 1 ?
                                        <Box sx={{ width: "50%", pl: 5, pb: 2 }}> PO Details
                                            <CrfReqDetailCmpnt
                                                columnDefs={column}
                                                tableData={getpoDetaildata}
                                            />
                                        </Box> : null
                                }


                            </Paper>
                        </Box>

                        {store_receive !== 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                }} >
                                    <Box sx={{ width: "20%", pr: 1, mt: 1, pl: 1 }}>
                                        <CusCheckBox
                                            label="Acknowledgement"
                                            color="primary"
                                            size="md"
                                            name="Acknowledgement"
                                            value={Acknowledgement}
                                            checked={Acknowledgement}
                                            onCheked={updateAcknowldge}
                                        />
                                    </Box>


                                </Box>
                            </Paper> :
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                                }} >

                                    <Box
                                        sx={{
                                            pl: 1, pr: 1,
                                            display: "flex",
                                            flexDirection: 'row',
                                            justifyContent: "space-between"
                                        }}>
                                        <CssVarsProvider>
                                            <Typography sx={{ fontSize: 16, fontWeight: 600 }} >Store:
                                                {
                                                    store_receive === 1 ?
                                                        <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> Yes
                                                        </Typography> : <Typography ml={2} sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, }} color="success" variant="outlined"> No
                                                        </Typography>
                                                }
                                            </Typography>
                                        </CssVarsProvider>
                                        {store_receive === 1 ?
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: 'row',
                                                    justifyContent: "space-evenly",
                                                    pr: 2
                                                }}>
                                                <CssVarsProvider>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5 }}>
                                                        {store_receive_date}</Typography>
                                                    <Typography ml={2} sx={{ fontSize: 15 }} >/ </Typography>
                                                    <Typography ml={2} variant="outlined" color="primary" sx={{ fontSize: 13, px: 1, pb: 0.4, borderRadius: 5, textTransform: "capitalize" }}>
                                                        {storeack_user} </Typography>
                                                </CssVarsProvider>
                                            </Box> : null
                                        }
                                    </Box>
                                </Box>
                            </Paper>


                        }




                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button color="secondary" onClick={submit} >Save</Button>
                    <Button onClick={ModalClose} color="secondary" >Cancel</Button>
                </DialogActions>


            </Dialog>
        </Fragment>


    )
}

export default memo(CrfStoreModal)