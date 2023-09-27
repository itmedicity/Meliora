import React, { Fragment, memo, useCallback, useState, useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios';
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector, useDispatch } from 'react-redux'
import { getAmModel } from 'src/redux/actions/AmModelList.action';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const ModelModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [modelModal, setModelModal] = useState({
        model_name: '',
        model_status: false,
    })
    const { model_name, model_status } = modelModal

    const ModelUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setModelModal({ ...modelModal, [e.target.name]: value })
        },
        [modelModal],
    )

    const reset = () => {
        const formdata = {
            model_name: '',
            model_status: false,
        }
        setModelModal(formdata)
    }

    const postdata = useMemo(() => {
        return {
            model_name: model_name,
            model_status: model_status === true ? 1 : 0,
            create_user: id
        }
    }, [model_name, model_status, id])

    const submitModel = useCallback(
        (e) => {
            e.preventDefault()
            const InsertModel = async (postdata) => {
                const result = await axioslogin.post('/model/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    reset()
                    handleClose()
                    dispatch(getAmModel())
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }

            if (model_name !== '') {
                InsertModel(postdata)
            } else {
                infoNotify("Please Enter Model")
            }
        },
        [postdata, handleClose, dispatch, model_name],
    )


    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                //    sx={{ border: '5px solid #0E4C92' ,borderRadius:1}}     
                >
                    <Box sx={{ width: '100%', height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}>
                        <Box id="alert-dialog-slide-descriptiona" sx={{ fontWeight: 'bold', textAlign: 'center', height: '50px', pt: 1 }}>
                            Add Model
                        </Box>
                        <Box sx={{
                            width: 500,
                            height: 100, pl: 3,
                            flexDirection: 'column',
                        }}>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: 'row'
                            }}>
                                <Box
                                    sx={{ height: 50, width: "40%", }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Model</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box
                                    sx={{ height: 50, width: "55%", }}>
                                    <TextFieldCustom
                                        placeholder="Model"
                                        type="text"
                                        size="sm"
                                        name="model_name"
                                        value={model_name}
                                        onchange={ModelUpdate}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: 'row'
                            }}>
                                <Box
                                    sx={{ height: 50, width: "40%", }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Model Status</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <CusCheckBox
                                    color="primary"
                                    size="md"
                                    name="model_status"
                                    value={model_status}
                                    checked={model_status}
                                    onCheked={ModelUpdate}
                                ></CusCheckBox>
                            </Box>
                        </Box>
                    </Box>
                    <DialogActions>
                        <Button color="secondary" onClick={submitModel} >Save</Button>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default memo(ModelModal)