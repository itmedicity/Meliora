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
import CustomTextarea from 'src/views/Components/CustomTextarea';
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageDisplayModal from '../../ComonComponent/ImageUploadCmp/ImageDisplayModal';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CrfUserAckModal = ({ open, ackflagData, ModalClose }) => {


    const { req_slno, req_date, actual_requirement, needed, expected_date, image_status } = ackflagData[0]
    const expdate = expected_date !== null ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    const [Acknowledgement, setAcknowledmnt] = useState(false)

    const updateAcknowldge = useCallback((e) => {
        if (e.target.checked === true) {
            setAcknowledmnt(true)
        }
        else {
            setAcknowledmnt(false)
        }
    }, [])

    const [Ackremark, setAckRemark] = useState('')
    const updateAckRemark = useCallback((e) => {
        setAckRemark(e.target.value)
    }, [])


    const [imageshowFlag, setImageShowFlag] = useState(0)
    const [imageshow, setImageShow] = useState(false)
    const [imagearray, setImageArry] = useState([])

    const ViewImage = useCallback(() => {
        setImageShowFlag(1)
        setImageShow(true)
    }, [])
    useEffect(() => {
        const getImage = async (req_slno) => {
            const result = await axioslogin.get(`/newCRFRegisterImages/crfRegimageGet/${req_slno}`)
            const { success, data } = result.data
            if (success === 1) {
                const fileNames = data;
                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/CRF/crf_registration/${req_slno}/${fileName}`;
                });
                setImageArry(fileUrls);
            }
        }
        if (imageshowFlag === 1) {
            getImage(req_slno)
        }
    }, [imageshowFlag, req_slno])
    const handleClose = useCallback(() => {
        setImageShowFlag(0)
        setImageShow(false)
        setImageArry([])
    }, [])


    const userAckPatch = useMemo(() => {
        return {
            user_acknldge: Acknowledgement === true ? 1 : null,
            user_acknldge_remarks: Ackremark,
            user_ack_user: id,
            user_ack_date: format(new Date(), 'yyyy-MM-dd hh:mm:ss'),
            req_slno: req_slno

        }
    }, [Acknowledgement, Ackremark, id, req_slno])

    const submit = useCallback(() => {
        const updateuserAckPatch = async (userAckPatch) => {
            const result = await axioslogin.patch('/CRFRegisterApproval/userAck', userAckPatch);
            const { success, message } = result.data;
            if (success === 1) {
                succesNotify(message)
                setAcknowledmnt(false)
                setAckRemark('')
                ModalClose()

            }
            else {
                warningNotify(message)
            }
        }

        if (Acknowledgement === true) {
            updateuserAckPatch(userAckPatch)

        }
    }, [userAckPatch, Acknowledgement, ModalClose])


    return (
        <Fragment>
            <ToastContainer />
            {imageshowFlag === 1 ? <ImageDisplayModal open={imageshow} handleClose={handleClose}
                images={imagearray} /> : null}
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
                        height: 250
                    }}
                >
                    < DialogContentText id="alert-dialog-slide-descriptiona">
                        User Acknowledgement
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
                                {image_status === 1 ? <Box sx={{ display: 'flex', width: "20%", height: 35, pl: 3, pt: 0.5, pb: 0.5 }}>
                                    <Button onClick={ViewImage} variant="contained"
                                        color="primary">View Image</Button>
                                </Box> : null}
                            </Box>
                        </Paper>

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
                                {Acknowledgement === true ?
                                    <Box sx={{ width: "50%", pr: 1, mt: 1, pl: 1 }}>
                                        <CustomTextarea
                                            required
                                            type="text"
                                            size="md"
                                            style={{
                                                width: "100%",
                                                height: 50,
                                            }}
                                            maxRows={1}
                                            value={Ackremark}
                                            onchange={updateAckRemark}
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

export default memo(CrfUserAckModal)