import React, { memo, useCallback, useState, useMemo } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit';

const GRNDeailtsComp = ({ detailArry, exist }) => {

    const { am_item_map_slno } = detailArry

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [userdata, setUserdata] = useState({
        searchgrnFromDate: '',
        searchgrnToDate: '',
        searchgrnAlready: '',
        grnNo: '',
        grndate: ''
    })

    //Destructuring
    const { searchgrnFromDate, searchgrnToDate, searchgrnAlready, grnNo, grndate } = userdata
    const updateGrnDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])

    const search = useCallback(() => {

    }, [])


    const searchGrn = useCallback(() => {

    }, [])


    const grnPostData = useMemo(() => {
        return {
            am_Item_map_slno: am_item_map_slno,
            am_grn_no: grnNo,
            am_grn_date: grndate,
            create_user: id
        }

    }, [grnNo, grndate, am_item_map_slno, id])

    const SaveGrnDetails = useCallback((e) => {
        e.preventDefault()
        const InsertItemDetail = async (grnPostData) => {
            const result = await axioslogin.post('/ItemMapDetails/ItemDetailsInsert', grnPostData)
        }

        InsertItemDetail(grnPostData);

    }, [grnPostData])

    const EditDetails = useCallback((e) => {
        e.preventDefault()



    }, [])
    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>

            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
                    <Box>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="searchgrnFromDate"
                            value={searchgrnFromDate}
                            onchange={updateGrnDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
                    <Box>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="searchgrnToDate"
                            value={searchgrnToDate}
                            onchange={updateGrnDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search} >
                        <SearchOutlinedIcon fontSize='small' />
                    </CusIconButton>
                </Box>

                <Box sx={{ width: '3%', pl: 5, pt: 4, }}>
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >OR</Typography>
                </Box>
                <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column', ml: 3 }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >GRN No</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="searchgrnAlready"
                            value={searchgrnAlready}
                            onchange={updateGrnDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
                        <SearchOutlinedIcon fontSize='small' />
                    </CusIconButton>
                </Box>
            </Box>

            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',

            }} >
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >GRN/Temp GRN No</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="grnNo"
                            value={grnNo}
                            onchange={updateGrnDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >GRN Date</Typography>
                    <Box>
                        <TextFieldCustom
                            type="date"
                            size="sm"
                            name="grndate"
                            value={grndate}
                            onchange={updateGrnDetails}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                {
                    exist === 0 ? <CustomeToolTip title="Save" placement="top" >
                        <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveGrnDetails} >
                                <LibraryAddIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                    </CustomeToolTip> :
                        <CustomeToolTip title="Save" placement="top" >
                            <Box sx={{ width: '3%', pl: 7, pt: 3, }}>
                                <CusIconButton size="sm" variant="outlined"  >
                                    <LibraryAddIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>

                }
                {
                    exist === 0 ?
                        <CustomeToolTip title="Edit" placement="top" >
                            <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails} >
                                    <EditIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip> :
                        <CustomeToolTip title="Edit" placement="top" >
                            <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={EditDetails} >
                                    <EditIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>


                }
                <CustomeToolTip title="Save" placement="top" >
                    <Box sx={{ width: '3%', pl: 5, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={searchGrn} >
                            <RefreshIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
            </Box>
        </Paper>
    )
}

export default memo(GRNDeailtsComp)