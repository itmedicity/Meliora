import React, { Fragment, memo, useCallback, useState, useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

const AssetTypeAddModel = ({ open, handleClose }) => {
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [assetType, setAssetType] = useState({
        asset_type_name: '',
        asset_type_status: false,
    })
    const { asset_type_name, asset_type_status } = assetType

    const updateAssetType = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setAssetType({ ...assetType, [e.target.name]: value })
        },
        [assetType],
    )

    const reset = () => {
        const formdata = {
            asset_type_name: '',
            asset_type_status: false,
        }
        setAssetType(formdata)
    }

    const postdata = useMemo(() => {
        return {
            asset_type_name: asset_type_name,
            asset_type_status: asset_type_status === true ? 1 : 0,
            create_user: id
        }
    }, [asset_type_name, asset_type_status, id])

    const submitAssetType = useCallback(
        (e) => {
            e.preventDefault()
            const InsertAssetType = async (postdata) => {
                const result = await axioslogin.post('/assettypee/insert', postdata)
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

            if (asset_type_name !== '') {
                InsertAssetType(postdata)
            } else {
                infoNotify("Please Enter Asset Type")
            }
        },
        [postdata, handleClose, asset_type_name],
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
                >
                    <DialogContentText id="alert-dialog-slide-descriptiona">
                        Add AssetType
                    </DialogContentText>
                </DialogContent>
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
                                <Typography sx={{ fontSize: 15 }}>Asset Type name</Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box
                            sx={{ height: 50, width: "50%", }}>
                            <TextFieldCustom
                                placeholder="Asset Type"
                                type="text"
                                size="sm"
                                name="asset_type_name"
                                value={asset_type_name}
                                onchange={updateAssetType}
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
                                <Typography sx={{ fontSize: 15 }}>Asset Type Status</Typography>
                            </CssVarsProvider>
                        </Box>
                        <CusCheckBox
                            color="primary"
                            size="md"
                            name="asset_type_status"
                            value={asset_type_status}
                            checked={asset_type_status}
                            onCheked={updateAssetType}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <DialogActions>
                    <Button color="secondary" onClick={submitAssetType} >Save</Button>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(AssetTypeAddModel)