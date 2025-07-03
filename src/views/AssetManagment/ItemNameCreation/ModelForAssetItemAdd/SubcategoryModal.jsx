import React, { Fragment, memo, useCallback, useState, useMemo } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
// import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios';
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector, useDispatch } from 'react-redux'
import AssetCategorySelWithoutName from 'src/views/CommonSelectCode/AssetCategorySelWithoutName';
import { getAmSubcategory } from 'src/redux/actions/AmSubcategoryList.action';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const SubcategoryModal = ({ open, handleClose, }) => {

    const dispatch = useDispatch();
    const [category, setCategory] = useState(0)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [subCategoryModel, setsubCategoryModel] = useState({
        subcategory_name: '',
        subcategory_status: false,
    })
    const { subcategory_name, subcategory_status } = subCategoryModel

    const SubCategoryUpdate = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setsubCategoryModel({ ...subCategoryModel, [e.target.name]: value })
        },
        [subCategoryModel],
    )

    const reset = () => {
        const formdata = {
            subcategory_name: '',
            subcategory_status: false,
        }
        setsubCategoryModel(formdata)
    }

    const postdata = useMemo(() => {
        return {
            subcategory_name: subcategory_name,
            category_slno: category,
            subcategory_status: subcategory_status === true ? 1 : 0,
            create_user: id
        }
    }, [subcategory_name, subcategory_status, category, id])

    const submitSubCategory = useCallback(
        (e) => {
            e.preventDefault()
            const InsertSubCategory = async (postdata) => {
                const result = await axioslogin.post('/subcategory/insert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    dispatch(getAmSubcategory(category))
                    succesNotify(message)
                    reset()
                    handleClose()
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }

            if (subcategory_name !== '') {
                InsertSubCategory(postdata)
            } else {
                infoNotify("Please Enter Subcategory")
            }
        },
        [postdata, handleClose, dispatch, category, subcategory_name],
    )


    return (
        <Fragment>
            {/* <ToastContainer /> */}
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"

                >
                    <Box sx={{ width: '100%', height: '90%', borderRadius: 1, border: '0.1px solid #454545' }}>
                        <Box id="alert-dialog-slide-descriptiona" sx={{ fontWeight: 'bold', textAlign: 'center', height: '50px', pt: 1 }}>
                            Add Subcategory
                        </Box>
                        <Box sx={{
                            width: 500,
                            height: 130, pl: 3,
                            flexDirection: 'column',

                        }}>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: 'row',
                                height: '32%',

                            }}>
                                <Box
                                    sx={{ height: 50, width: "40%", }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Subcategory</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box
                                    sx={{ height: 50, width: "55%", }}>
                                    <TextFieldCustom
                                        placeholder="Subcategory"
                                        type="text"
                                        size="sm"
                                        name="subcategory_name"
                                        value={subcategory_name}
                                        onchange={SubCategoryUpdate}
                                    ></TextFieldCustom>
                                </Box>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                height: '25%',
                                display: "flex",
                                flexDirection: 'row',

                            }}>
                                <Box
                                    sx={{ height: 50, width: "40%", }}>
                                    <CssVarsProvider>
                                        <Typography sx={{ fontSize: 15 }}>Category</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ height: 50, width: "55%", }}>
                                    <AssetCategorySelWithoutName value={category} setValue={setCategory} />
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
                                        <Typography sx={{ fontSize: 15 }}>Subcategory Status</Typography>
                                    </CssVarsProvider>

                                </Box>
                                <CusCheckBox
                                    color="primary"
                                    size="md"
                                    name="subcategory_status"
                                    value={subcategory_status}
                                    checked={subcategory_status}
                                    onCheked={SubCategoryUpdate}
                                ></CusCheckBox>
                            </Box>
                        </Box>
                    </Box>

                    <DialogActions>
                        <Button color="secondary" onClick={submitSubCategory} >Save</Button>
                        <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </Fragment >
    )
}



export default memo(SubcategoryModal)