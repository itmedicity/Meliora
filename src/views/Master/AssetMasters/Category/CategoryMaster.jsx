import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CategoryTable from './CategoryTable';

const CategoryMaster = () => {
    const history = useHistory();

    const [category, setCategory] = useState({
        cat: '',
        status: false
    })
    const { cat, status } = category
    const updateCategory = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCategory({ ...category, [e.target.name]: value })
    }, [category])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Asset Category Master"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Asset Category Name"
                                    type="text"
                                    size="sm"
                                    name="cat"
                                    value={cat}
                                    onchange={updateCategory}
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
                                    onCheked={updateCategory}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <CategoryTable />
                    </Grid>
                </Grid>
            </Box>

        </CardMaster>
    )
}

export default CategoryMaster