import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import SubCategoryTable from './SubCategoryTable';
const SubCategoryMast = () => {
    const history = useHistory();
    //intializing
    const [subcategory, setsubCategory] = useState({
        subcat: '',
        status: false
    })
    //destructuring
    const { subcat, status } = subcategory
    const updatesubCategory = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setsubCategory({ ...subcategory, [e.target.name]: value })
    }, [subcategory])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Sub Category Master"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Sub Category Name"
                                    type="text"
                                    size="sm"
                                    name="subcat"
                                    value={subcat}
                                    onchange={updatesubCategory}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updatesubCategory}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <SubCategoryTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default SubCategoryMast