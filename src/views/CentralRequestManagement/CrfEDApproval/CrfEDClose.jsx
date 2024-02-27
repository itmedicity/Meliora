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
import ReqItemDisplay from '../ComonComponent/ReqItemDisplay';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import CustomTextarea from 'src/views/Components/CustomTextarea';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CrfEDClose = ({ open, setCancelData, setCancelModal, setCancelFlag, count, setCount, cancelData }) => {


    const { req_slno, req_date, actual_requirement, needed, expdate, crf_close, crf_close_remark,
    } = cancelData

    const [reqTableDis, setReqTableDis] = useState(0)

    const [detailData, setDetailData] = useState([])
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    const [Closeremark, setCloseRemark] = useState('')
    const updateCloseRemark = useCallback((e) => {
        setCloseRemark(e.target.value)
    }, [])

    const [closeCrf, setCloseCrf] = useState(false)
    const updateCrf = useCallback((e) => {
        if (e.target.checked === true) {
            setCloseCrf(true)
        }
        else {
            setCloseCrf(false)
        }
    }, [])


    useEffect(() => {
        setCloseCrf(crf_close === 1 ? true : false)
        setCloseRemark(crf_close_remark !== null ? crf_close_remark : '')
    }, [crf_close, crf_close_remark,])

    useEffect(() => {
        const getItemDetails = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegister/getDetailItemList/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                setReqTableDis(1)
                setDetailData(data);
            } else {
                setReqTableDis(0)
            }
        }
        getItemDetails(req_slno)
    }, [req_slno])

    const HODCloseData = useMemo(() => {
        return {
            crf_close: 1,
            crf_close_remark: Closeremark,
            crf_close_user: id,
            crf_closed_one: "ED",
            close_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            req_slno: req_slno

        }
    }, [Closeremark, id, req_slno])

    const reset = useCallback(() => {
        setReqTableDis(0)
        setDetailData([])
        setCloseRemark('')
        setCloseCrf(false)
        setCancelModal(false)
        setCancelFlag(0)
        setCancelData([])
        setCount(0)
    }, [setCancelFlag, setCount, setCancelModal, setCancelData])


    const submit = useCallback(() => {
        const updateClosedCrf = async (HODCloseData) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/crfClose', HODCloseData);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            }
            else {
                warningNotify(message)
            }
        }
        updateClosedCrf(HODCloseData)

    }, [HODCloseData, setCount, count, reset])

    const ModalClose = useCallback(() => {
        setReqTableDis(0)
        setDetailData([])
        setCloseRemark('')
        setCloseCrf(false)
        setCancelModal(false)
        setCancelFlag(0)
        setCancelData([])
        setCount(0)
    }, [setCancelFlag, setCancelModal, setCount, setCancelData])

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
                        ED Cancel
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
                        {reqTableDis === 1 ?
                            <Paper variant='outlined' sx={{ p: 0, mt: 1 }} >
                                <Box sx={{
                                    width: "100%", display: "flex", p: 0.5, pb: 0, flexDirection: 'column',
                                }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Requested Items</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <ReqItemDisplay detailData={detailData}
                                />
                            </Paper> : <Box sx={{
                                width: "100%", display: "flex", p: 0.5, pb: 0,
                                flexDirection: { xs: 'row', sm: 'row', md: 'row', lg: 'row', xl: 'row', },
                            }}>
                                <Box sx={{ pr: 9 }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Requested Items: Nill</Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        }

                        <Paper variant='outlined' sx={{ mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                pl: 2, pt: 0, fontSize: 15
                            }}>
                                <Box sx={{ width: "20%", mt: 1 }}>
                                    <CusCheckBox
                                        label="Close CRF"
                                        color="primary"
                                        size="md"
                                        name="closeCrf"
                                        value={closeCrf}
                                        checked={closeCrf}
                                        onCheked={updateCrf}
                                    />
                                </Box>
                                {closeCrf === true ?
                                    <Box sx={{ width: "60%", mt: 1 }}>
                                        <CustomTextarea
                                            required
                                            type="text"
                                            size="sm"
                                            style={{
                                                width: "100%",
                                                height: 70,
                                                boardColor: "#E0E0E0"
                                            }}
                                            placeholder=" Remarks"
                                            value={Closeremark}
                                            onchange={updateCloseRemark}
                                        />
                                    </Box> : null
                                }

                            </Box>
                        </Paper>

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

export default memo(CrfEDClose)