import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import AssetTypeTable from './AssetTypeTable'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useHistory } from 'react-router-dom'
const AssetTypeMaster = () => {

    const history = useHistory();

    const [asset, setAsset] = useState({
        assetname: '',
        status: false
    })
    const { assetname, status } = asset
    const updateAssettype = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setAsset({ ...asset, [e.target.name]: value })
    }, [asset])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Asset Type Master"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Asset Type Name"
                                    type="text"
                                    size="sm"
                                    name="assetname"
                                    value={assetname}
                                    onchange={updateAssettype}
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
                                    onCheked={updateAssettype}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <AssetTypeTable />
                    </Grid>
                </Grid>
            </Box>

        </CardMaster>
    )
}

export default AssetTypeMaster