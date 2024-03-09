import { Box, CssVarsProvider, Table } from '@mui/joy'
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
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ViewTaskImage from '../TaskFileView/ViewTaskImage'

const EmpOverDueTaskList = ({ tableCount, setTableCount, taskcount, settaskcount, projectcount, setprojectcount }) => {
    const [tabledata, setTabledata] = useState([])
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [masterData, setMasterData] = useState([])
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)

    useEffect(() => {
        const getMasterTable = async () => {
            const result = await axioslogin.get(`/TmTableView/employeeOverDue/${id}`);
            const { success, data } = result.data;

            if (data.length !== 0) {
                if (success === 2) {
                    const arry = data?.map((val) => {
                        const obj = {
                            tm_task_slno: val.tm_task_slno,
                            tm_task_name: val.tm_task_name,
                            dept_name: (val.dept_name).toLowerCase(),
                            sec_name: (val.sec_name).toLowerCase(),
                            // em_name: (val.em_name).toLowerCase(),                            
                            em_name: val.em_name,
                            tm_assigne_emp: val.tm_assigne_emp,
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
                            tm_completed_remarks: val.tm_completed_remarks,
                            TaskStatus: val.tm_task_status === 1 ? 'Completed' :
                                val.tm_task_status === 1 ? 'Completed' :
                                    val.tm_task_status === 2 ? 'On Progress' :
                                        val.tm_task_status === 3 ? 'On Hold' :
                                            val.tm_task_status === 4 ? 'Pending' :
                                                val.tm_task_status === 0 ? 'Incompleted' : 'Incompleted',
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
        setimageViewModalOpen(false)
        setimage(0)
        setMasterData(value)
    }, [])

    const handleClose = useCallback(() => {
        setimage(0)
        setEditModalOpen(false)
        setEditModalFlag(0)
        setimageViewModalOpen(false)
        setImageUrls([])
    }, [setimageViewModalOpen, setEditModalOpen, setImageUrls, setimage])
    const fileView = async (val) => {
        const { tm_task_slno } = val;
        setgetarry(val);
        setEditModalOpen(false)
        setEditModalFlag(0)
        setimage(0); // Initialize imageViewModalFlag to 0 initially
        setimageViewModalOpen(false); // Close the modal if it was open
        try {
            const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;

                const fileNames = data.data;

                const fileUrls = fileNames.map((fileName) => {
                    return `${PUBLIC_NAS_FOLDER}/Meliora/TaskManagement/${tm_task_slno}/${fileName}`;
                });
                setImageUrls(fileUrls);
                // Open the modal only if there are files
                if (fileUrls.length > 0) {
                    setimage(1);
                    setimageViewModalOpen(true);
                    setSelectedImages(val);
                } else {
                    warningNotify("No Image attached");
                }
            } else {
                warningNotify("No Image Attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }
    return (
        <Box>
            {tabledata.length !== 0 ?
                <Box sx={{ height: 520, }}>
                    <Paper variant="outlined" sx={{ maxHeight: 520, maxWidth: '100%', overflow: 'auto', mt: .3 }}>
                        {editModalFlag === 1 ?
                            <EmpTaskStatus open={editModalOpen} setEditModalOpen={setEditModalOpen} masterData={masterData}
                                setEditModalFlag={setEditModalFlag} taskcount={taskcount} settaskcount={settaskcount}
                                projectcount={projectcount} setprojectcount={setprojectcount}
                                tableCount={tableCount} setTableCount={setTableCount}
                            /> : image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                                selectedImages={selectedImages} getarry={getarry} /> : null}
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead>
                                    <tr>
                                        <th style={{ width: 50 }}>#</th>
                                        <th style={{ width: 60 }} >Action</th>
                                        <th style={{ width: 60 }}>View</th>
                                        <th style={{ width: 150 }}>Status</th>
                                        <th style={{ width: 300 }}>Task Name</th>
                                        <th style={{ width: 300 }}>Project</th>
                                        <th style={{ width: 150 }}>Created Date</th>
                                        <th style={{ width: 150 }}> Due Date</th>
                                        <th style={{ width: 300 }}>Task Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata?.map((val, index) => {
                                        return (
                                            <tr key={index}
                                                style={{ height: 8, background: val.main_task_slno !== null ? '#ede7f6' : val.main_task_slno === 0 ? '#ede7f6' : 'transparent', minHeight: 5 }}>
                                                <td> {index + 1}</td>
                                                <td>
                                                    <EditIcon
                                                        sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectModal(val)}
                                                    />
                                                </td>
                                                <td style={{ cursor: 'pointer', }}>
                                                    <ImageOutlinedIcon sx={{ color: '#41729F' }}
                                                        onClick={() => fileView(val)}
                                                    />
                                                </td>
                                                <td
                                                    style={{
                                                        color: val.tm_task_status === null ? '#311E26'
                                                            : val.tm_task_status === 0 ? '#311E26'
                                                                : val.tm_task_status === 1 ? '#94C973'
                                                                    : val.tm_task_status === 2 ? '#D37506'
                                                                        : val.tm_task_status === 3 ? '#67595E'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5,
                                                        fontWeight: 700
                                                    }}><RadioButtonCheckedIcon sx={{
                                                        color: val.tm_task_status === null ? '#311E26'
                                                            : val.tm_task_status === 0 ? '#311E26'
                                                                : val.tm_task_status === 1 ? '#59981A'
                                                                    : val.tm_task_status === 2 ? '#D37506'
                                                                        : val.tm_task_status === 3 ? '#747474'
                                                                            : val.tm_task_status === 4 ? '#5885AF'
                                                                                : 'transparent', minHeight: 5
                                                    }} />&nbsp;{val.TaskStatus}</td>

                                                <td style={{ textTransform: 'capitalize', color: '#970C10', }}> {val.tm_task_name || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize', color: '#970C10', }}> {val.tm_project_name || 'not given'}</td>
                                                <td style={{ color: '#970C10', }}> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                <td style={{ color: '#970C10', fontWeight: 500 }}> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize', color: '#970C10', }}> {val.tm_task_description || 'not given'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </Box>
                : <Box sx={{ textAlign: 'center', pt: 25, height: 500, fontWeight: 700, fontSize: 30, color: '#C7C8CB' }}>
                    No Dues
                </Box>}
        </Box>
    )
}

export default memo(EmpOverDueTaskList)