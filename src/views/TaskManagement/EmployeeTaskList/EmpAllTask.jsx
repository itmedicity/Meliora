import { CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import _ from 'underscore';
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import moment from 'moment';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import EmpTaskStatus from './EmpTaskStatus'
const EmpAllTask = ({ tableCount, setTableCount }) => {
    const [tabledata, setTabledata] = useState([])

    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])

    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)



    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/TmTableView/employeeAllTask/${id}`);
            const { success, data } = result.data;


            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
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
                            tm_task_status: val.tm_task_status,
                            tm_project_slno: val.tm_project_slno,
                            tm_project_name: val.tm_project_name,
                            tm_pending_remark: val.tm_pending_remark,
                            tm_onhold_remarks: val.tm_onhold_remarks,
                            create_date: val.create_date,
                            tm_completed_remarks: val.tm_completed_remarks

                        }
                        return obj
                    })
                    setTabledata(arry)
                    // setUpComingView(1)
                } else {
                    warningNotify('error occured')
                }
            }
            else {
                // setUpComingView(0)
            }
        }
        getMasterTable(id)
    }, [id, tableCount])

    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        // setimageViewModalOpen(false)
        // setimage(0)
        setMasterData(value)
    }, [])



    return (
        <Paper sx={{ m: 1, height: 500, overflow: 'auto' }}>
            {editModalFlag === 1 ?
                <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                    setEditModalFlag={setEditModalFlag}
                    tableCount={tableCount} setTableCount={setTableCount}
                />

                : null}
            <CssVarsProvider>
                <Table padding={"none"} stickyHeader
                    hoverRow>
                    <thead>
                        <tr>
                            <th style={{ width: 30 }}>#</th>
                            <th style={{ width: 40 }} >Action</th>
                            <th style={{ width: 45 }}>Status</th>
                            {/* <th style={{ width: 100 }}>Remarks</th> */}
                            <th style={{ width: 150 }}>Task Name</th>
                            <th style={{ width: 100 }}>Created Date</th>
                            <th style={{ width: 100 }}>Due Date</th>
                            <th style={{ width: 300 }}>Task Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tabledata?.map((val, index) => {
                            return (
                                <tr key={index}
                                    style={{ height: 8, background: val.main_task_slno !== null ? '#D8CEE6' : val.main_task_slno === 0 ? '#D8CEE6' : 'transparent', minHeight: 5 }}>
                                    <td> {index + 1}</td>
                                    <td>

                                        <EditIcon
                                            sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectModal(val)}
                                        />
                                    </td>
                                    <td style={{



                                    }}>

                                        <RadioButtonCheckedIcon sx={{
                                            color: val.tm_task_status === null ? '#311E26'
                                                : val.tm_task_status === 0 ? '#311E26'
                                                    : val.tm_task_status === 1 ? '#94C973'
                                                        : val.tm_task_status === 2 ? '#EFD593'
                                                            : val.tm_task_status === 3 ? '#747474'
                                                                : val.tm_task_status === 4 ? '#5885AF'
                                                                    : 'transparent', minHeight: 5
                                        }}
                                        // onClick={() => fileView(val)}
                                        />
                                    </td>

                                    {/* <td> {val.tm_task_status === 1 ? val.tm_completed_remarks : val.tm_task_status === 3 ? val.tm_onhold_remarks :
                                        val.tm_task_status === 4 ? val.tm_pending_remark : val.tm_task_status === 2 ? "Task on progress" : 'InCompleted'}</td> */}

                                    <td> {val.tm_task_name || 'not given'}</td>
                                    {/* <td> {val.tm_project_name || 'not given'}</td> */}
                                    {/* <td> {val.em_name || 'not given'}</td> */}
                                    <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                    <td> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                    <td> {val.tm_task_description || 'not given'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </CssVarsProvider>
        </Paper>
    )
}

export default memo(EmpAllTask)