import React, { useCallback, useEffect, useState } from 'react'
import { Box, CssVarsProvider, Table } from '@mui/joy'
import { Paper } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
// import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { warningNotify } from 'src/views/Common/CommonCode';
import { memo } from 'react';
import moment from 'moment';
import ViewTaskImage from '../TaskCreationOuter/ViewTaskImage';

const CompletedTask = ({ tableCount }) => {
    const [tableData, setTableData] = useState([])
    const [viewCompleted, setViewCompleted] = useState(0)
    const [getarry, setgetarry] = useState([])
    const [selectedImages, setSelectedImages] = useState([]);
    const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
    const [image, setimage] = useState(0)
    const [imageUrls, setImageUrls] = useState([]);

    // const id = useSelector((state) => state.LoginUserData.empid, _.isEqual)
    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })


    useEffect(() => {
        const getCompletedTable = async () => {
            const result = await axioslogin.get(`/TmTableView/departmentCompleted/${empsecid}`);
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
                            em_name: val.em_name,
                            tm_task_dept: val.tm_task_dept,
                            tm_task_dept_sec: val.tm_task_dept_sec,
                            tm_task_due_date: val.tm_task_due_date,
                            main_task_slno: val.main_task_slno,
                            tm_task_description: val.tm_task_description,
                            tm_task_status: val.tm_task_status,
                        }
                        return obj
                    })
                    setTableData(arr)
                    setViewCompleted(1)
                } else {
                    warningNotify('error occured')
                }

            } else {
                setViewCompleted(0)
            }
        }
        getCompletedTable(empsecid)
    }, [empsecid, tableCount])

    const handleClose = useCallback(() => {
        setimage(0)
        setimageViewModalOpen(false)
        setImageUrls([])
    }, [setimageViewModalOpen, setImageUrls, setimage])
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
            {image === 1 ? <ViewTaskImage imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
                selectedImages={selectedImages} getarry={getarry} /> : null}
            {viewCompleted === 1 ?
                <Box variant="outlined" sx={{ height: 490, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
                    <Paper variant="outlined" sx={{ maxHeight: 450, maxWidth: '100%', overflow: 'auto', mt: .5, }}>
                        <CssVarsProvider>
                            <Table padding={"none"} stickyHeader
                                hoverRow>
                                <thead>
                                    <tr >
                                        <th style={{ width: 50 }}>#</th>
                                        <th style={{ width: 50 }}>view</th>
                                        <th style={{ width: 200 }}>Task name</th>
                                        <th style={{ minWidth: 100 }}>Assignee</th>
                                        <th style={{ width: 110 }}>Created Date</th>
                                        <th style={{ minWidth: 100 }}>Due date</th>
                                        <th style={{ minWidth: 250 }}>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData?.map((val, index) => {
                                        return (
                                            <tr key={index}
                                                style={{
                                                    height: 8, background: val.main_task_slno !== null ? '#D8CEE6' : val.main_task_slno === 0 ? '#D8CEE6' : 'transparent',
                                                    minHeight: 5
                                                }}
                                            >
                                                <td> {index + 1}</td>
                                                <td style={{ cursor: 'pointer', }}>
                                                    <ImageOutlinedIcon sx={{ color: '#41729F' }}
                                                        onClick={() => fileView(val)}
                                                    />
                                                </td>
                                                <td> {val.tm_task_name || 'not given'}</td>
                                                <td> {val.em_name || 'not given'}</td>
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
                </Box>
                : <Box sx={{ textAlign: 'center', pt: 20, fontWeight: 700, fontSize: 30, color: '#C7C8CB', height: 480, maxWidth: '100%', }}>
                    No Task Completed Yet!

                </Box>
            }
        </Box>
    )
}

export default memo(CompletedTask)