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
import { getGroup } from 'src/redux/actions/AmGroupList.action';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const GroupModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [groupModal, setGroupModal] = useState({
        group_name: '',
        group_status: false,
    })
    const { group_name, group_status } = groupModal

    const GroupUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setGroupModal({ ...groupModal, [e.target.name]: value })
        },
        [groupModal],
    )

    const reset = () => {
        const formdata = {
            group_name: '',
            group_status: false,
        }
        setGroupModal(formdata)
    }

    const postdata = useMemo(() => {
        return {
            group_name: group_name,
            group_status: group_status === true ? 1 : 0,
            create_user: id
        }
    }, [group_name, group_status, id])

    const submitGroup = useCallback(
        (e) => {
            e.preventDefault()
            const InsertGroup = async (postdata) => {
                const result = await axioslogin.post('/amgroup/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    reset()
                    handleClose()
                    dispatch(getGroup())
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }

            if (group_name !== '') {
                InsertGroup(postdata)
            } else {
                infoNotify("Please Enter Group")
            }
        },
        [postdata, handleClose, dispatch, group_name],
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
                            Add Group
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
                                        <Typography sx={{ fontSize: 15 }}>Group</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box
                                    sx={{ height: 50, width: "55%", }}>
                                    <TextFieldCustom
                                        placeholder="Group"
                                        type="text"
                                        size="sm"
                                        name="group_name"
                                        value={group_name}
                                        onchange={GroupUpdate}
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
                                        <Typography sx={{ fontSize: 15 }}>Group Status</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <CusCheckBox
                                    color="primary"
                                    size="md"
                                    name="group_status"
                                    value={group_status}
                                    checked={group_status}
                                    onCheked={GroupUpdate}
                                ></CusCheckBox>
                            </Box>
                        </Box>
                    </Box>
                    <DialogActions>
                        <Button color="secondary" onClick={submitGroup} >Save</Button>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}

export default memo(GroupModal)