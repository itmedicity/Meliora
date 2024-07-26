import React, { useEffect, useCallback, memo, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CusIconButton from '../../Components/CusIconButton';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import CusAgGridForReport from 'src/views/Components/CusAgGridForReport';
import { warningNotify } from '../../Common/CommonCode';
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from '../../Components/CustomeToolTip'
import { ActionTyps } from 'src/redux/constants/action.type'
import { axioslogin } from 'src/views/Axios/Axios';
import { useDispatch } from 'react-redux';
import { Box, Typography, Paper, Button } from '@mui/material'
import AmDepartmentSelWOName from 'src/views/CommonSelectCode/AmDepartmentSelWOName'
import AmDeptSecSelectWOName from 'src/views/CommonSelectCode/AmDeptSecSelectWOName'
import { getDepartment } from 'src/redux/actions/Department.action';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useSelector } from 'react-redux'
import _ from 'underscore';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import CloseIcon from '@mui/icons-material/Close';

const PmOverdueList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [TableData, setTableData] = useState([]);
    const [exports, setexport] = useState(0)
    const [department, setDepartment] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const deptsecid = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)
    const [open, setOpen] = useState(false)


    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])


    useEffect(() => {
        setOpen(true)
        const getCondemnatnList = async (deptsecid) => {
            const result = await axioslogin.get(`/SpareCondemService/pmDueOverList/${deptsecid}`)
            const { success, data } = result.data
            if (success === 1) {
                const dataaa = data?.map((val) => {
                    const obj = {
                        ...val,
                        assetNo: val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0'),
                        roomname: val.rm_room_name !== null ? val.rm_room_name : "Not Updated",
                        subroom: val.subroom_name !== null ? val.subroom_name : "Not Updated"

                    }
                    return obj
                })
                setTableData(dataaa);
                setOpen(false)
            }
            else {
                setTableData([])
                setOpen(false)
                warningNotify("No Asset PM date Due!!!!")
            }
        }
        getCondemnatnList(deptsecid)
    }, [deptsecid, department, deptsec])


    const [columnDefs] = useState([
        { headerName: "SlNo", field: "slno", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Department Section", field: "sec_name", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Item Name", field: "item_name", autoHeight: true, wrapText: true, minWidth: 350 },
        { headerName: "Asset No", field: "assetNo", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Room no", field: "roomname", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Sub Room No", field: "subroom", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Serial No", field: "am_manufacture_no", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },

    ])

    const onExportClick = () => {
        if (TableData.length === 0) {
            warningNotify("No Data For Download, Please select dates")
            setexport(0)
        }
        else {
            setexport(1)
        }
    }

    useEffect(() => {
        if (exports === 1) {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
            setexport(0)
        }
        else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        }
    }, [exports, dispatch])


    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])


    const search = useCallback(() => {
        const getdeptDeptsecArry = (TableData) => {
            const deptDeptsecArry = TableData.filter((val) => {
                return val.item_dept_slno === department && val.item_deptsec_slno === deptsec
            })
            setTableData(deptDeptsecArry)
        }
        const getdeptArry = (TableData) => {
            const deptArry = TableData.filter((val) => {
                return val.item_dept_slno === department
            })
            setTableData(deptArry)
        }
        const getDeptsecArry = (TableData) => {
            const DeptsecArry = TableData.filter((val) => {
                return val.item_deptsec_slno === deptsec
            })
            setTableData(DeptsecArry)
        }
        if (department !== 0 && deptsec !== 0) {
            getdeptDeptsecArry(TableData)
        } else if (department !== 0 && deptsec === 0) {
            getdeptArry(TableData)
        } else if (department === 0 && deptsec !== 0) {
            getDeptsecArry(TableData)
        }
        else {
            warningNotify("Please select any condition before search")
        }

    }, [department, deptsec, TableData])

    const Closefunctn = useCallback(() => {
        setDepartment(0)
        setDeptSec(0)
    }, [])
    return (
        <CardCloseOnly
            title='PM Date Due List'
            close={backToSetting}
        >  <CustomBackDrop open={open} text="Please Wait" />
            <Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    m: 0
                }} >
                    <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 1 }} >Department</Typography>
                        <Box>
                            <AmDepartmentSelWOName
                                department={department}
                                setDepartment={setDepartment}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: '25%', p: 0.5, flexDirection: 'column' }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: 1 }} >Department Section</Typography>
                        <Box>
                            <AmDeptSecSelectWOName
                                deptsec={deptsec}
                                setDeptSec={setDeptSec}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search} >
                            <SearchOutlinedIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                    <Box sx={{ width: '3%', pl: 1, pt: 3, }}>
                        <CusIconButton size="sm" variant="outlined" clickable="true" onClick={Closefunctn} >
                            <CloseIcon fontSize='small' />
                        </CusIconButton>
                    </Box>
                    <Box sx={{ width: '20%', pl: 1, pt: 3, }}>
                    </Box>
                    <Box sx={{ width: '10%', pl: 1, pt: 3, }}>
                        <Paper
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                p: 1,
                                width: '100%',
                                height: "100%"
                            }}>
                            <Box sx={{ pt: 2, pr: 5, fontSize: 20, }}>
                                <Button variant="outlined"
                                    size="large" color="primary" fontSize="20%"> {TableData.length}</Button>
                            </Box>
                            <Box sx={{ pt: 3, pr: 5 }}>
                                <Typography sx={{ fontSize: 20, color: '#055C9D' }}>
                                    PM Pending</Typography>
                            </Box>
                        </Paper>

                    </Box>
                </Box>

                <Paper square sx={{ width: { md: '100%', lg: '100%', xl: '100%' }, p: 1 }}>
                    <Paper
                        square
                        sx={{
                            backgroundColor: '#f0f3f5',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row-reverse',
                            gap: 0.1,
                            p: 0.3,
                            borderLeft: 2,
                            borderColor: '#d3d3d3',
                        }}
                    >
                        <CustomeToolTip title="Download" placement="bottom">
                            <Box>
                                <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                    <DownloadIcon />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>
                    </Paper>
                    <CusAgGridForReport
                        columnDefs={columnDefs}
                        tableData={TableData}
                    />
                </Paper>
            </Box>

        </CardCloseOnly>
    )
}

export default memo(PmOverdueList)