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
import { getAmItemType } from 'src/redux/actions/AmItemTypeList.actions';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const ItemTypeAddModel = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [itemType, setItemType] = useState({
        item_type_name: '',
        item_type_status: false,
    })
    const { item_type_name, item_type_status } = itemType

    const ItemTypeUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setItemType({ ...itemType, [e.target.name]: value })
        },
        [itemType],
    )

    const reset = () => {
        const formdata = {
            item_type_name: '',
            item_type_status: false,
        }
        setItemType(formdata)
    }

    const postdata = useMemo(() => {
        return {
            item_type_name: item_type_name,
            item_type_status: item_type_status === true ? 1 : 0,
            create_user: id
        }
    }, [item_type_name, item_type_status, id])

    const sumbitItemType = useCallback(
        (e) => {
            e.preventDefault()
            const InsertItemType = async (postdata) => {
                const result = await axioslogin.post('/itemType/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    reset()
                    handleClose()
                    dispatch(getAmItemType())
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }

            if (item_type_name !== '') {
                InsertItemType(postdata)
            } else {
                infoNotify("Please Enter Item type")
            }
        },
        [postdata, handleClose, dispatch, item_type_name],
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
                            Add Item
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
                                        <Typography sx={{ fontSize: 15 }}>Item Type </Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box
                                    sx={{ height: 50, width: "55%", }}>
                                    <TextFieldCustom
                                        placeholder="Item Type"
                                        type="text"
                                        size="sm"
                                        name="item_type_name"
                                        value={item_type_name}
                                        onchange={ItemTypeUpdate}
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
                                        <Typography sx={{ fontSize: 15 }}>Item Type Status</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <CusCheckBox
                                    color="primary"
                                    size="md"
                                    name="item_type_status"
                                    value={item_type_status}
                                    checked={item_type_status}
                                    onCheked={ItemTypeUpdate}
                                ></CusCheckBox>
                            </Box>
                        </Box>
                    </Box>
                    <DialogActions>
                        <Button color="secondary" onClick={sumbitItemType} >Save</Button>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default memo(ItemTypeAddModel)