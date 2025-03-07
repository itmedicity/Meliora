import React, { memo, useCallback, useState, useMemo, useEffect } from 'react'
import { Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusIconButton from '../../Components/CusIconButton';
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { Box, Checkbox, CssVarsProvider, Table, Textarea } from '@mui/joy';
import { useQuery } from 'react-query';
import EditIcon from '@mui/icons-material/Edit';

const WarrentyGrauntyComp = ({ detailArry, assetSpare }) => {

    const { am_item_map_slno, am_spare_item_map_slno } = detailArry

    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    const [warrantyStatus, setwarrantyStatus] = useState(false)
    const [garantyStatus, setgarantyStatus] = useState(false)
    const [editFlag, seteditFlag] = useState(0)
    const [warGarSlno, setwarGarSlno] = useState('')
    const [count, setcount] = useState(0)

    const [userdata, setUserdata] = useState({
        fromdate: '',
        toDate: '',
        trollFree: '',
        phone1: '',
        phone2: '',
        adress: '',
        remark: ''
    })
    const { fromdate, toDate, trollFree, phone1, phone2, adress, remark } = userdata

    const updatewarrenGuranDetails = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUserdata({ ...userdata, [e.target.name]: value })
    }, [userdata])

    const updatewarrantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setwarrantyStatus(true)
            setgarantyStatus(false)
        } else {
            setwarrantyStatus(false)
            setgarantyStatus(false)
        }
    }, [])

    const updategarantyStatus = useCallback((e) => {
        if (e.target.checked === true) {
            setgarantyStatus(true)
            setwarrantyStatus(false)
        } else {
            setgarantyStatus(false)
            setwarrantyStatus(false)
        }
    }, [])

    const WarGarReferesh = useCallback(() => {
        const frmdata = {
            fromdate: '',
            toDate: '',
            trollFree: '',
            phone1: '',
            phone2: '',
            adress: '',
            remark: ''
        }
        setUserdata(frmdata)
        setwarrantyStatus(false)
        setgarantyStatus(false)
        seteditFlag(0)
    }, [])

    const postData = useMemo(() => {
        return {
            am_item_map_slno: am_item_map_slno,
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            remarks: remark,
            file_upload_status: 1,
            create_user: id
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, remark, id])

    const postDataSpare = useMemo(() => {
        return {
            am_spare_item_map_slno: am_spare_item_map_slno,
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            remarks: remark,
            file_upload_status: 1,
            create_user: id
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, remark, id])

    const patchdata = useMemo(() => {
        return {
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            remarks: remark,
            file_upload_status: 1,
            edit_user: id,
            am_item_map_slno: am_item_map_slno,
            am_item_wargar_slno: warGarSlno,
        }
    }, [am_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, remark, warGarSlno, id])

    const patchdataSpare = useMemo(() => {
        return {
            warrenty_status: warrantyStatus === true ? 1 : 0,
            guarenty_status: garantyStatus === true ? 1 : 0,
            from_date: fromdate,
            to_date: toDate,
            troll_free: trollFree,
            ph_one: phone1,
            ph_two: phone2,
            address: adress,
            remarks: remark,
            file_upload_status: 1,
            edit_user: id,
            am_spare_item_map_slno: am_spare_item_map_slno,
            am_item_wargar_slno: warGarSlno
        }
    }, [am_spare_item_map_slno, warrantyStatus, garantyStatus, fromdate, toDate, trollFree, phone1,
        phone2, adress, remark, warGarSlno, id])

    const SaveWarGarDetails = useCallback((e) => {
        e.preventDefault()
        if (editFlag === 1) {
            const updateWarGardetails = async (patchdata) => {
                const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdate', patchdata);
                const { message, success } = result.data;
                if (success === 2) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()

                }
                else {
                    warningNotify(message)
                }
            }
            const updateWarGardetailsSpare = async (patchdataSpare) => {
                const result = await axioslogin.patch('/ItemMapDetails/WarentGraruntyUpdateSpare', patchdataSpare);
                const { message, success } = result.data;
                if (success === 2) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()
                }
                else {
                    warningNotify(message)
                }
            }
            if (assetSpare === 1) {
                updateWarGardetails(patchdata)
            } else {
                updateWarGardetailsSpare(patchdataSpare)
            }
        } else {
            const InsertItemDetail = async (postData) => {
                const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsert', postData)
                const { success, message } = result.data
                if (success === 1) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()
                } else {
                    infoNotify(message)
                }
            }
            const InsertItemDetailSpare = async (postDataSpare) => {
                const result = await axioslogin.post('/ItemMapDetails/WarentGraruntyInsertSpare', postDataSpare)
                const { success, message } = result.data
                if (success === 1) {
                    setcount(count + 1)
                    succesNotify(message)
                    seteditFlag(0)
                    WarGarReferesh()
                } else {
                    infoNotify(message)
                }
            }
            if (assetSpare === 1) {
                InsertItemDetail(postData);
            } else {
                InsertItemDetailSpare(postDataSpare)
            }
        }

    }, [postData, assetSpare, postDataSpare, patchdata, patchdataSpare, count, setcount, WarGarReferesh, editFlag])

    const [tableData, setTableData] = useState([]);

    const { data: AssetWarGar = [] } = useQuery(
        ['getAllWarGarInAsset', count],
        async () => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNot/${am_item_map_slno}`);
            return result.data?.data || [];
        },
        { enabled: !!am_item_map_slno }
    );

    const { data: SpareWarGar = [] } = useQuery(
        ['getAllWarGarInSpare', count],
        async () => {
            const result = await axioslogin.get(`/ItemMapDetails/WarentGarantInsertOrNotSpare/${am_spare_item_map_slno}`);
            return result.data?.data || [];
        },
        { enabled: !!am_spare_item_map_slno }

    );
    useEffect(() => {
        setTableData((prevData) => {
            const newData =
                AssetWarGar.length > 0 ? AssetWarGar :
                    SpareWarGar.length > 0 ? SpareWarGar : [];

            return JSON.stringify(prevData) !== JSON.stringify(newData) ? newData : prevData;
        });
    }, [AssetWarGar, SpareWarGar]);

    const RowSelect = useCallback((val) => {
        seteditFlag(1)
        const {
            address, am_item_wargar_slno, from_date, guarenty_status, ph_one, ph_two, remarks,
            to_date, troll_free, warrenty_status
        } = val
        const frmdata = {
            fromdate: from_date || '',
            toDate: to_date || '',
            trollFree: troll_free || '',
            phone1: ph_one || '',
            phone2: ph_two || '',
            adress: address || '',
            remark: remarks
        }
        setUserdata(frmdata)
        setwarrantyStatus(warrenty_status === 1 ? true : false)
        setgarantyStatus(guarenty_status === 1 ? true : false)
        setwarGarSlno(am_item_wargar_slno)
    }, [])


    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', flexWrap: 'wrap',
            }} >
                <Box sx={{
                    display: 'flex', flexDirection: 'row', flexWrap: 'wrap', mx: 1, mt: 1
                }} >
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >

                        <CssVarsProvider>
                            <Checkbox
                                variant="outlined"
                                color="danger"
                                size="md"
                                name="warrantyStatus"
                                checked={warrantyStatus}
                                onChange={updatewarrantyStatus}
                                label="Warranty"
                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                        <CssVarsProvider>
                            <Checkbox
                                variant="outlined"
                                color="danger"
                                size="md"
                                name="garantyStatus"
                                checked={garantyStatus}
                                label="Guarantee"
                                onChange={updategarantyStatus}
                            />
                        </CssVarsProvider>
                    </Box>
                </Box>

                {
                    warrantyStatus === true || garantyStatus === true ?
                        <Box sx={{ m: 1 }}>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                            }} >

                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >From Date</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="fromdate"
                                            value={fromdate}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >To Date</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="toDate"
                                            value={toDate}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Trool Free No</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="trollFree"
                                            value={trollFree}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Phone No 1</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="phone1"
                                            value={phone1}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Phone No 2</Typography>
                                    <Box>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="phone2"
                                            value={phone2}
                                            onchange={updatewarrenGuranDetails}
                                        ></TextFieldCustom>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex', flexDirection: 'row', flexWrap: 'wrap'
                            }} >

                                <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Address</Typography>
                                    <Box>
                                        <CssVarsProvider>
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                name="adress"
                                                value={adress}
                                                onChange={updatewarrenGuranDetails}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', width: '40%', p: 0.5, flexDirection: 'column' }} >
                                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Remarks</Typography>
                                    <Box>
                                        <CssVarsProvider>
                                            <Textarea
                                                type="text"
                                                size="sm"
                                                name="remark"
                                                value={remark}
                                                onChange={updatewarrenGuranDetails}
                                            />
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                                <CustomeToolTip title="Save" placement="top" >
                                    <Box sx={{ pt: 3, pl: 1 }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={SaveWarGarDetails} >
                                            <LibraryAddIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                                <CustomeToolTip title="Refresh" placement="top" >
                                    <Box sx={{ pt: 3, pl: 1 }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={WarGarReferesh} >
                                            <RefreshIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                            </Box>

                        </Box> : null
                }
            </Box>

            <Box
                sx={{
                    m: 1,
                    // flex: 1,
                    display: 'flex',
                    overflow: "auto",
                    border: 1,
                    borderColor: 'lightgray'
                }}
            >

                <CssVarsProvider>
                    <Table stickyHeader size="sm"
                        sx={{
                            flex: 1,
                            width: '100%'

                        }}>
                        <thead>
                            <tr>
                                <th style={{ width: 40, textAlign: 'center' }}>#</th>
                                <th style={{ width: 37 }}>Edit</th>
                                <th style={{ width: 85 }}>Wrnty/Gnty </th>
                                <th style={{ width: 90 }}>From Date</th>
                                <th style={{ width: 90 }}>To Date</th>
                                <th style={{ width: 130 }}>Toll-Free No.</th>
                                <th style={{ width: 100 }}>Ph No. 1</th>
                                <th style={{ width: 100 }}>Ph No. 2</th>
                                <th style={{ flexGrow: 1 }}>Address</th>
                                <th style={{ flexGrow: 1 }}>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData?.length > 0 ? (
                                tableData.map((val, index) => (
                                    <tr key={index} >
                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                        <td><EditIcon sx={{ color: 'black', cursor: 'pointer' }} onClick={() => RowSelect(val)} /></td>
                                        <td>{val.warrenty_status === 1 ? 'Warranty' : 'Guarantee'}</td>
                                        <td>{val.from_date}</td>
                                        <td>{val.to_date}</td>
                                        <td>{val.troll_free || '-'}</td>
                                        <td>{val.ph_one || '-'}</td>
                                        <td>{val.ph_two || '-'}</td>
                                        <td>{val.address || '-'}</td>
                                        <td style={{ minHeight: 20, maxHeight: 100 }}>{val.remarks || '-'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" style={{ textAlign: 'center', padding: '10px' }}>
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </CssVarsProvider>

            </Box>
        </Paper >
    )
}

export default memo(WarrentyGrauntyComp)