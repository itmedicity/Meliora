import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';

const DEviceDetailsComp = ({ detailArry, exist, setExist, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno, assetno } = detailArry

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [userdata, setUserdata] = useState({
        manufacturslno: '',
        asset_no: assetno,
        asset_noold: '',
    })


    //Destructuring
    const { manufacturslno, asset_no, asset_noold } = userdata
    const updateDeviceDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])

    useEffect(() => {

        const checkinsertOrNotDetail = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_manufacture_no, am_asset_old_no } = data[0]
                const frmdata = {
                    manufacturslno: am_manufacture_no !== null ? am_manufacture_no : '',
                    asset_no: assetno,
                    asset_noold: am_asset_old_no !== null ? am_asset_old_no : '',
                }
                setUserdata(frmdata);
            }
        }
        const checkinsertOrNotDetailSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_manufacture_no, am_asset_no, am_asset_old_no } = data[0]
                const frmdata = {
                    manufacturslno: am_manufacture_no !== undefined ? am_manufacture_no : '',
                    asset_no: am_asset_no !== null ? am_asset_no : '',
                    asset_noold: am_asset_old_no !== null ? am_asset_old_no : '',
                }
                setUserdata(frmdata);
            }
        }
        if (assetSpare === 1) {
            checkinsertOrNotDetail(am_item_map_slno)
        } else {
            checkinsertOrNotDetailSpare(am_spare_item_map_slno)
        }

    }, [am_item_map_slno, am_spare_item_map_slno, assetSpare, assetno, setUserdata])

    const patchadata = useMemo(() => {
        return {
            am_manufacture_no: manufacturslno,
            am_asset_no: asset_no,
            am_asset_old_no: asset_noold,
            edit_user: id,
            am_item_map_slno: am_item_map_slno,
        }
    }, [am_item_map_slno, manufacturslno, asset_no, asset_noold, id])

    const patchadataSpare = useMemo(() => {
        return {
            am_manufacture_no: manufacturslno,
            am_asset_no: asset_no,
            am_asset_old_no: asset_noold,
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno,
        }
    }, [am_spare_item_map_slno, manufacturslno, asset_no, asset_noold, id])
    const reset = useCallback(() => {
        const frmdata = {
            manufacturslno: '',
            asset_no: '',
            asset_noold: '',
        }
        setUserdata(frmdata)
    }, [setUserdata])

    const EditDetails = useCallback((e) => {
        e.preventDefault()
        const checkinsertOrNot = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_manufacture_no, am_asset_no, am_asset_old_no } = data[0]
                const frmdata = {
                    manufacturslno: am_manufacture_no !== null ? am_manufacture_no : '',
                    asset_no: am_asset_no !== null ? am_asset_no : '',
                    asset_noold: am_asset_old_no !== null ? am_asset_old_no : '',
                }
                setUserdata(frmdata);
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const checkinsertOrNotSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { am_manufacture_no, am_asset_no, am_asset_old_no } = data[0]
                const frmdata = {
                    manufacturslno: am_manufacture_no !== null ? am_manufacture_no : '',
                    asset_no: am_asset_no !== null ? am_asset_no : '',
                    asset_noold: am_asset_old_no !== null ? am_asset_old_no : '',
                }
                setUserdata(frmdata);
            }
            else {
                warningNotify("Data Not Saved Yet")
            }
        }

        const updateGRNDetails = async (patchData) => {
            const result = await axioslogin.patch('/ItemMapDetails/DeviceDetailsUpdate', patchData);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }

        const updateGRNDetailsSpare = async (patchadataSpare) => {
            const result = await axioslogin.patch('/ItemMapDetails/DeviceDetailsUpdateSpare', patchadataSpare);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
            }
            else {
                warningNotify(message)
            }
        }

        if (manufacturslno === '' && asset_no === '' && asset_noold === '') {
            if (assetSpare === 1) {
                checkinsertOrNot(am_item_map_slno)
            } else { }
            checkinsertOrNotSpare(am_spare_item_map_slno)

        }
        else {
            if (assetSpare === 1) {
                updateGRNDetails(patchadata)
            } else {
                updateGRNDetailsSpare(patchadataSpare)
            }
        }

    }, [manufacturslno, asset_no, asset_noold, am_item_map_slno, patchadata, assetSpare,
        am_spare_item_map_slno, patchadataSpare])

    const DeviceRefresh = useCallback(() => {
        reset()
    }, [reset])

    const disableflag = true
    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Manufacture SlNo</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="manufacturslno"
                            value={manufacturslno}
                            onchange={updateDeviceDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    {
                        assetSpare === 1 ? <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Asset No</Typography> :
                            <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Spare No</Typography>
                    }

                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="asset_no"
                            value={asset_no}
                            disabled={disableflag}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '10%', p: 0.5, flexDirection: 'column', ml: 0.5 }} >
                    {assetSpare === 1 ? <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Asset No Old</Typography> :
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Spare No Old</Typography>}

                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="asset_noold"
                            value={asset_noold}
                            onchange={updateDeviceDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <CustomeToolTip title="Save" placement="top" >
                    <Box sx={{ width: '3%', pl: 3, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails} >
                            <LibraryAddIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
                <CustomeToolTip title="Refresh" placement="top" >
                    <Box sx={{ width: '3%', pl: 2, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={DeviceRefresh} >
                            <RefreshIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
            </Box>
        </Paper>

    )
}

export default memo(DEviceDetailsComp)