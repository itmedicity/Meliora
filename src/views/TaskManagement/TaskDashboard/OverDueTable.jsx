import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { warningNotify } from 'src/views/Common/CommonCode';
import ViewTaskImage from '../TaskFileView/ViewTaskImage';
import moment from 'moment';
import ModalEditTask from '../CreateTask/ModalEditTask';
const OverDueTable = () => {
    const [tableData, setTableData] = useState([])
    const [masterData, setMasterData] = useState([])
    const [viewOverDue, setViewOverDue] = useState(0)
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editModalFlag, setEditModalFlag] = useState(0)
    const [tableCount, setTableCount] = useState(0)

    // const dispatch = useDispatch();
    // const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    // redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    const rowSelectModal = useCallback((value) => {
        setEditModalFlag(1)
        setEditModalOpen(true)
        setimageViewModalOpen(false)
        setimage(0)
        setMasterData(value)
    }, [])

    useEffect(() => {
        const getOverDueTable = async () => {
            const result = await axioslogin.get(`/TmTableView/departmentOverDue/${empsecid}`);
            const { success, data } = result.data;
            if (data.length !== 0) {
                if (success === 2) {
                    const arr = data?.map((val) => {
                        const obj = {
                            tm_task_slno: val.tm_task_slno,
                            tm_task_name: val.tm_task_name,
                            dept_name: val.dept_name,
                            sec_name: val.sec_name,
                            tm_assigne_emp: val.tm_assigne_emp,
                            // em_name: (val.em_name).toLowerCase(),
                            em_name: val.em_name,
                            create_date: val.create_date,
                            tm_task_dept: val.tm_task_dept,
                            tm_task_dept_sec: val.tm_task_dept_sec,
                            main_task_slno: val.main_task_slno,
                            tm_task_due_date: val.tm_task_due_date,
                            tm_task_description: val.tm_task_description
                        }
                        return obj
                    })
                    setTableData(arr)
                    setViewOverDue(1)
                } else {
                }
            } else {
                setViewOverDue(0)
            }
        }
        getOverDueTable(empsecid)
    }, [empsecid, tableCount])
    const handleClose = useCallback(() => {
        setimage(0)
        setimageViewModalOpen(false)
        setImageUrls([])
    }, [setImageUrls, setimage])

    const fileView = async (val) => {
        const { tm_task_slno } = val;
        setgetarry(val);
        setimage(0); // Initialize imageViewModalFlag to 0 initially
        setimageViewModalOpen(false); // Close the modal if it was open

        try {
            const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`);
            const { success } = result.data;
            if (success === 1) {
                const data = result.data;
                const fileNames = data.data;
                const fileUrls = fileNames.map((fileName) => {
                    return `http://192.168.22.9/NAS/TaskManagement/${tm_task_slno}/${fileName}`;
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
                warningNotify("No Image attached");
            }
        } catch (error) {
            warningNotify('Error in fetching files:', error);
        }
    }
    return (
        <Box>
            {viewOverDue === 1 ?
                <Box variant="outlined" sx={{ height: 660, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
                    <Paper variant="outlined" sx={{ maxHeight: 650, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
                        {editModalFlag === 1 ?
                            <ModalEditTask open={editModalOpen} masterData={masterData} setEditModalOpen={setEditModalOpen}
                                setEditModalFlag={setEditModalFlag}
                                tableCount={tableCount} setTableCount={setTableCount}
                            />
                            :
                            image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                                selectedImages={selectedImages} getarry={getarry} /> : null}

                        <CssVarsProvider>

                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead >
                                    <tr >
                                        <th style={{ width: 50, alignItems: 'center' }}>#</th>
                                        <th style={{ width: 75 }}>Action</th>
                                        <th style={{ width: 55 }}>View</th>
                                        <th style={{ width: 200 }}>Task name</th>
                                        <th style={{ width: 100 }}>Assignee</th>
                                        <th style={{ width: 100 }}>Created Date</th>
                                        <th style={{ width: 100 }}>Due date</th>
                                        <th style={{ width: 250 }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData?.map((val, index) => {
                                        return (
                                            <tr key={index}
                                                style={{ height: 8, background: val.main_task_slno !== null ? '#D8CEE6' : val.main_task_slno === 0 ? '#D8CEE6' : 'transparent', minHeight: 5 }}>
                                                <td> {index + 1}</td>
                                                <td>
                                                    <EditIcon
                                                        sx={{ cursor: 'pointer' }} size={6} onClick={() => rowSelectModal(val)}
                                                    />
                                                </td>
                                                <td style={{ cursor: 'pointer', }}>
                                                    <ImageOutlinedIcon style={{ color: '#41729F' }}
                                                        onClick={() => fileView(val)} />
                                                </td>

                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_name || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {val.em_name || 'not given'}</td>
                                                <td> {moment(val.create_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {moment(val.tm_task_due_date).format('DD-MM-YYYY hh:mm') || 'not given'}</td>
                                                <td style={{ textTransform: 'capitalize' }}> {val.tm_task_description || 'not given'}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </CssVarsProvider>
                    </Paper>
                </Box>
                : <Box>
                    <Box sx={{
                        textAlign: 'center', pt: 20, fontWeight: 700, fontSize: 30, color: '#C7C8CB', height: 480, maxWidth: '100%',
                    }}>
                        No dues!
                    </Box>

                </Box>}
        </Box >
    )
}

export default memo(OverDueTable)