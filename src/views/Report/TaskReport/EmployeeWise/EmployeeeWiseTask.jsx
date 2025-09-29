import { Box, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import TmDepartmentSelect from 'src/views/CommonSelectCode/TmDepartmentSelect'
import TmDeptSectionSelect from 'src/views/CommonSelectCode/TmDeptSectionSelect'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import CusIconButton from 'src/views/Components/CusIconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DownloadIcon from '@mui/icons-material/Download'
import CusAgGridForReport from 'src/views/Components/CusAgGridForReport'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from 'src/redux/constants/action.type'
import { warningNotify } from 'src/views/Common/CommonCode'
import TMemployeeSelect from 'src/views/CommonSelectCode/TMemployeeSelect'

const EmployeeeWiseTask = () => {
    const [departments, setDepartments] = useState(0)
    const [deptsecs, setDeptSecs] = useState(0)
    const [TableData, setTableData] = useState([]);
    const [employee, setEmployee] = useState(0)
    const [exports, setexport] = useState(0)
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch,])

    const searchData = useMemo(() => {
        return {
            tm_assigne_emp: employee,

        }
    }, [employee])



    const EmpTaskSearch = useCallback(() => {
        const getDeptTable = async () => {
            const result = await axioslogin.post(`/tmReport/searchEmployeTask`, searchData)
            const { success, data } = result.data

            if (success === 2) {
                const arry = data?.map((val, index) => {
                    const obj = {
                        slno: index + 1,
                        tm_task_slno: val.tm_task_slno,
                        tm_task_name: val.tm_task_name,
                        dept_name: val.dept_name,
                        sec_name: val.sec_name,
                        tm_assigne_emp: val.tm_assigne_emp,
                        em_name: val.em_name,
                        tm_task_dept: val.tm_task_dept,
                        tm_task_dept_sec: val.tm_task_dept_sec,
                        tm_task_due_date: val.tm_task_due_date,
                        main_task_slno: val.main_task_slno,
                        tm_task_description: val.tm_task_description,
                        tm_detail_status: val.tm_detail_status,
                        tm_task_status: val.tm_task_status,
                        tm_project_name: val.tm_project_name,
                        tm_project_slno: val.tm_project_slno,
                        TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                            val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 2 ? 'On Progress' :
                                    val.tm_task_status === 3 ? 'On Hold' :
                                        val.tm_task_status === 4 ? 'Pending' :
                                            val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
                    }
                    return obj
                })
                setTableData(arry)
            } else {

                setTableData([])
            }
        }
        getDeptTable(searchData)
    }, [searchData,])


    const onExportClick = () => {
        if (TableData.length === 0) {
            warningNotify("No Data For Download, Please select employee")
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

    const [columnDefs] = useState([
        { headerName: "SlNo", field: "slno", autoHeight: true, wrapText: true, minWidth: 90 },
        { headerName: "Department", field: "dept_name", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Section", field: "sec_name", autoHeight: true, wrapText: true, minWidth: 300 },
        { headerName: "Task", field: "tm_task_name", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Assignee", field: "em_name", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Due Date", field: "tm_task_due_date", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Description", field: "tm_task_description", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },

    ])
    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])
    return (
        <CardMasterClose
            title='EMPLOYEE&apos;S TASK REPORT'
            close={backToSetting}
        >
            <Box sx={{ display: 'flex', mt: 1 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ pl: 1, fontWeight: 300 }}>Department</Typography>
                    <TmDepartmentSelect
                        department={departments}
                        setDepartment={setDepartments} />
                </Box>
                <Box sx={{ flex: 1, ml: 1 }}>
                    <Typography sx={{ pl: 1, fontWeight: 300, }}>Section</Typography>
                    <TmDeptSectionSelect
                        deptsec={deptsecs}
                        setDeptSec={setDeptSecs} />
                </Box>
                <Box sx={{ flex: 1, ml: 1 }}>
                    <Typography sx={{ pl: 1, fontWeight: 300, }}>Employee</Typography>
                    <TMemployeeSelect
                        employee={employee}
                        setEmployee={setEmployee} />
                </Box>
                <Box sx={{ flex: 1, ml: 1, pt: 2.8, }}>

                    <CusIconButton size="sm" variant="outlined" clickable="true" onClick={EmpTaskSearch} >
                        <SearchOutlinedIcon fontSize='small' />
                    </CusIconButton>




                </Box>
            </Box>
            <Box sx={{ mt: 1.5, flex: 1, bgcolor: '#f0f3f5', height: 35, display: 'flex', justifyContent: 'flex-end', }}>
                <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick} >
                    <DownloadIcon />
                </CusIconButton>
            </Box>
            <Box sx={{ mx: .1 }}>
                <CusAgGridForReport
                    columnDefs={columnDefs}
                    tableData={TableData}
                />
            </Box>
        </CardMasterClose >
    )
}


export default memo(EmployeeeWiseTask)