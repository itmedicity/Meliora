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
import { useSelector } from 'react-redux'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const UomAddmodal=({ open, handleClose })=> {
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
})
const [uomModal, setUomModal] = useState({
    uom_name: '',
    uom_status: false,
})
const { uom_name, uom_status } = uomModal

const UomUpdate = useCallback(
    (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setUomModal({ ...uomModal, [e.target.name]: value })
    },
    [uomModal],
)

const reset = () => {
    const formdata = {
        uom_name: '',
        uom_status: false,
    }
    setUomModal(formdata)
}

const postdata = useMemo(() => {
    return {
        uom_name: uom_name,
        uom_status: uom_status === true ? 1 : 0,
        create_user: id
    }
}, [uom_name, uom_status, id])

const submitUom = useCallback(
    (e) => {
        e.preventDefault()
        const InsertUom = async (postdata) => {
            const result = await axioslogin.post('/uom/insert', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                reset()
                handleClose()
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }

        if (uom_name !== '') {
            InsertUom(postdata)
        } else {
            infoNotify("Please Enter Unit of Measurement")
        }
    },
    [postdata, handleClose, uom_name],
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
                     <Box sx={{width:'100%',height:'90%',borderRadius:1, border: '0.1px solid #454545'}}>
                    <Box id="alert-dialog-slide-descriptiona" sx={{fontWeight:'bold',textAlign:'center',height:'50px',pt:1}}>
                        Add Unit of Measurement
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
                            <Typography sx={{ fontSize: 15 }}>U.O.M</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box
                        sx={{ height: 50, width: "55%", }}>
                        <TextFieldCustom
                            placeholder="Unit of Measurement"
                            type="text"
                            size="sm"
                            name="uom_name"
                            value={uom_name}
                            onchange={UomUpdate}
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
                            <Typography sx={{ fontSize: 15 }}>U.O.M Status</Typography>
                        </CssVarsProvider>
                    </Box>
                    <CusCheckBox
                        color="primary"
                        size="md"
                        name="uom_status"
                        value={uom_status}
                        checked={uom_status}
                        onCheked={UomUpdate}
                    ></CusCheckBox>
                </Box>
                </Box>
                </Box>
            <DialogActions>
                <Button color="secondary" onClick={submitUom} >Save</Button>
                <Button color="secondary" onClick={handleClose}>Cancel</Button>
                </DialogActions>
                </DialogContent>
        </Dialog>
    </Fragment >
)
}


export default memo( UomAddmodal)