// import React from 'react'

// const ModalCommunicationDevice = () => {
//   return (
//     <div>ModalCommunicationDevice</div>
//   )
// }

// export default ModalCommunicationDevice


import React, { Fragment, memo, } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';

import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

import CusCheckBox from 'src/views/Components/CusCheckBox'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const ModalCommunicationDevice=({ open, handleClose })=>{
  // Get login user emp_id
//   const id = useSelector((state) => {
//     return state.LoginUserData.empid
// })
// const [ModalCommunicationDevice, setModalCommunicationDevice] = useState({
//     category_name: '',
//     category_status: false,
// })
// const { category_name, category_status } = ModalCommunicationDevice

// const CategoryUpdate = useCallback(
//     (e) => {
//         const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
//         setModalCommunicationDevice({ ...ModalCommunicationDevice, [e.target.name]: value })
//     },
//     [ModalCommunicationDevice],
// )

// const reset = () => {
//     const formdata = {
//         category_name: '',
//         category_status: false,
//     }
//     setModalCommunicationDevice(formdata)
// }

// const postdata = useMemo(() => {
//     return {
//         category_name: category_name,
//         category_status: category_status === true ? 1 : 0,
//         create_user: id
//     }
// }, [category_name, category_status, id])

// const submitCategory = useCallback(
//     (e) => {
//         e.preventDefault()
//         const InsertCategory = async (postdata) => {
//             const result = await axioslogin.post('/amcategory/insert', postdata)
//             const { message, success } = result.data
//             if (success === 1) {
//                 succesNotify(message)
//                 reset()
//                 handleClose()
//             } else if (success === 0) {
//                 infoNotify(message)
//             } else {
//                 infoNotify(message)
//             }
//         }

//         if (category_name !== '') {
//             InsertCategory(postdata)
//         } else {
//             infoNotify("Please Enter Category")
//         }
//     },
//     [postdata, handleClose, category_name],
// )


return (
    <Fragment>
        <ToastContainer />

{/* 
        <Modal open={!!size} onClose={() => setSize(undefined)}>
        <ModalDialog size={size}>
          <ModalClose />
          <DialogTitle>Modal Dialog</DialogTitle>
          <DialogContent>This is a `{size}` modal dialog.</DialogContent>
        </ModalDialog>
        </Modal> */}
        
        <Dialog
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="alert-dialog-slide-descriptiona"
        >
             < DialogContent 
              
 >
              <Box sx={{width:'100%',height:'90%',borderRadius:1, border: '0.1px solid #454545'}}>
                    <Box id="alert-dialog-slide-descriptiona" sx={{fontWeight:'bold',textAlign:'center',height:'50px',pt:1}}>
                       Add Communication Device Details
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
                            <Typography sx={{ fontSize: 15 }}>Category</Typography>
                        </CssVarsProvider>
                    </Box>
                    <Box
                        sx={{ height: 50, width: "55%",  }}>
                        <TextFieldCustom
                            placeholder="Category"
                            type="text"
                            size="sm"
                            // name="category_name"
                            // value={category_name}
                            // onchange={CategoryUpdate}
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
                            <Typography sx={{ fontSize: 15 }}>Category Status</Typography>
                        </CssVarsProvider>
                    </Box>
                    <CusCheckBox
                        color="primary"
                        size="md"
                        // name="category_status"
                        // value={category_status}
                        // checked={category_status}
                        // onCheked={CategoryUpdate}
                    ></CusCheckBox>
                    
                </Box>
            </Box>
            </Box>
            <DialogActions>
                    <Button color="secondary"
                        // onClick={submitCategory}
                    >Save</Button>
                    <Button color="secondary"
                        onClick={handleClose}
                    >Cancel</Button>
                </DialogActions>
                </DialogContent>
        </Dialog>
    </Fragment >
)
}

export default memo(ModalCommunicationDevice)