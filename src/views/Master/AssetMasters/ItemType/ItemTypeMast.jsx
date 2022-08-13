import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import ItemTypeTable from './ItemTypeTable';
const ItemTypeMast = () => {
    const history = useHistory();
    //intializing
    const [item, setItem] = useState({
        itemtype: '',
        status: false
    })
    //destructuring
    const { itemtype, status } = item
    const updateItemtype = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItem({ ...item, [e.target.name]: value })
    }, [item])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Item Type Master"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Item Type Name"
                                    type="text"
                                    size="sm"
                                    name="itemtype"
                                    value={itemtype}
                                    onchange={updateItemtype}
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
                                    onCheked={updateItemtype}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <ItemTypeTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default ItemTypeMast