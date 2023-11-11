import React, { memo, useCallback, useEffect, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Box, Typography, } from '@mui/material'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName';
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

const DeptTransfer = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [assetNo, setAssetNo] = useState('')
    const [transDept, setTransDept] = useState(0)
    const [transDeptSec, setTransDeptSec] = useState(0)

    const [transferData, setTransferData] = useState({
        am_item_map_slno: 0,
        item_name: '',
        department: '',
        dept_sec: '',
        custodian_dept: ''
    })

    const { am_item_map_slno, item_name, department, dept_sec, custodian_dept } = transferData

    const updateAssetNo = useCallback((e) => {
        setAssetNo(e.target.value.toLocaleUpperCase())
    }, [])

    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])

    const search = useCallback(() => {
        const getdata = async (postdata) => {
            const result = await axioslogin.post('/assetDeptTransfer/getAssetBasedOnLocation', postdata)
            const { data, success } = result.data
            if (success === 1) {
                const { am_item_map_slno, item_name, dept_name, sec_name, am_custodian_name, } = data[0]
                const setfrmdta = {
                    am_item_map_slno: am_item_map_slno,
                    item_name: item_name,
                    department: dept_name,
                    dept_sec: sec_name,
                    custodian_dept: am_custodian_name
                }
                setTransferData(setfrmdta)
            }
            else {
                warningNotify("No Item Exist Given Asset Number")
            }
        }
        if (assetNo !== '') {
            const parts = assetNo.split('/');
            if (parts.length === 3) {
                const assetno = parts[parts.length - 1];
                const Custodian = parts[parts.length - 2];
                const firstname = parts[parts.length - 3];
                const starts = firstname + '/' + Custodian
                const asset_number = parseInt(assetno)
                const postdata = {
                    item_asset_no: starts,
                    item_asset_no_only: asset_number
                }
                getdata(postdata)
            }
            else {
                warningNotify("Please Enter Valid Asset Number")
            }
        } else {
            warningNotify("Please enter Asset Number")
        }
    }, [assetNo])

    const patchData = useMemo(() => {
        return {
            item_dept_slno: transDept,
            item_deptsec_slno: transDeptSec,
            am_item_map_slno: am_item_map_slno
        }
    }, [transDept, transDeptSec, am_item_map_slno])

    const reset = useCallback(() => {

        const restdata = {
            am_item_map_slno: 0,
            item_name: '',
            department: '',
            dept_sec: '',
            custodian_dept: ''
        }
        setTransferData(restdata)
        setTransDept(0)
        setTransDeptSec(0)
    }, [])

    const updateDeptTransfer = useCallback(() => {
        const patchDeptTrans = async (patchData) => {
            const result = await axioslogin.patch('/assetDeptTransfer/transferDepartment', patchData)
            const { success, message } = result.data
            if (success === 1) {
                succesNotify(message)
                reset()

            } else {
                warningNotify(message)
            }
        }
        if (transDept !== 0 && transDeptSec !== 0) {
            patchDeptTrans(patchData)
        } else {
            warningNotify("Select Department and department Section")
        }
    }, [patchData, transDept, transDeptSec, reset])

    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    return (
        <CardMasterClose
            title="Department Transfer"
            close={backtoSetting}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                m: 0
            }} >
                <Box sx={{ width: '60%', display: 'flex', pt: 2.5, margin: 'auto ', pl: 13 }}>
                    <Box sx={{ pl: 0.8, width: "15%", cursor: "pointer" }}>
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Asset No</Typography>
                    </Box>
                    <Box sx={{ pl: 0.8, width: "60%", cursor: "pointer" }}>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="assetNo"
                            value={assetNo}
                            onchange={updateAssetNo}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ width: '3%', pl: 1 }}>
                        <CusIconButton size="sm" variant="outlined" clickable="true" color="primary" onClick={search} >
                            <SearchOutlinedIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    m: 0
                }} >
                    <Box sx={{ display: 'flex', width: '34%', p: 0.5, flexDirection: 'column', cursor: "pointer" }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department</Typography>
                        <Box>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="department"
                                value={department}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '34%', p: 0.5, flexDirection: 'column', cursor: "pointer" }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Department Section</Typography>
                        <Box>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="dept_sec"
                                value={dept_sec}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '34%', p: 0.5, flexDirection: 'column', cursor: "pointer" }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Custodian Department</Typography>
                        <Box>
                            <TextFieldCustom
                                type="text"
                                size="sm"
                                name="custodian_dept"
                                value={custodian_dept}
                                disabled={true}
                            ></TextFieldCustom>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    m: 0
                }} >
                    <Box sx={{ pl: 0.8, width: "10%", cursor: "pointer" }}>
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Item Name</Typography>
                    </Box>
                    <Box sx={{ pl: 0.8, width: "100%", cursor: "pointer" }}>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="item_name"
                            value={item_name}
                            disabled={true}
                        ></TextFieldCustom>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    pt: 1.5
                }} >
                    <Box sx={{ pl: 0.8, width: "10%", cursor: "pointer" }}>
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Transfer Department</Typography>
                    </Box>
                    <Box sx={{ pl: 0.8, width: "25%" }} >
                        <AmDepartmentSelWOName
                            department={transDept}
                            setDepartment={setTransDept}
                        />
                    </Box>
                    <Box sx={{ pl: 0.8, width: "15%", cursor: "pointer" }}>
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Transfer Department Section</Typography>
                    </Box>
                    <Box sx={{ pl: 0.8, width: "25%", cursor: "pointer" }} >
                        <AmDeptSecSelectWOName
                            deptsec={transDeptSec}
                            setDeptSec={setTransDeptSec}
                        />
                    </Box>

                    <Box sx={{ width: '3%', pl: 1 }}>
                        <CusIconButton size="sm" variant="outlined" clickable="true" color="primary" onClick={updateDeptTransfer} >
                            <LibraryAddIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                </Box>

            </Box>
        </CardMasterClose>
    )
}

export default memo(DeptTransfer)