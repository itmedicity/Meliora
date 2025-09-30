import { Badge, Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AccordionGroup from '@mui/joy/AccordionGroup';
import accordionDetailsClasses from '@mui/joy/AccordionDetails';
import accordionSummaryClasses from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { axioslogin } from 'src/views/Axios/Axios';
import EmployeeProgressBar from './EmployeeProgressBar';
import AllTaskListUnderProject from './AllTaskListUnderProject';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { infoNotify } from 'src/views/Common/CommonCode';
import { useQuery } from 'react-query';

const TmEmployeeTaskData = () => {


    const empDept = useSelector((state) => state.LoginUserData.empdept)
    const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }]);
    const [allEmpTask, setallEmpTask] = useState([])
    const [EmpDetalArry, setEmpDetalArry] = useState([])
    const [modalFlag, setModalFlag] = useState(0)
    const [modalOpen, setModalOpen] = useState(false)
    const [employeeData, setEmployeeData] = useState([])

    const { data: getAllEmpUnderdept = [] } = useQuery(
        ['getAllEmployeesUnderDepartment', empDept],
        async () => {
            const result = await axioslogin.get(
                `/taskManagement/getAllEmpUnderdept/${empDept}`
            );
            return result.data?.data || [];
        },
        { enabled: !!empDept }
    );

    useEffect(() => {
        if (getAllEmpUnderdept.length > 0) {
            setemployees(getAllEmpUnderdept);
        }
    }, [getAllEmpUnderdept]);

    useEffect(() => {
        const getAllEmployeeTask = async () => {
            const result = await axioslogin.get(`/TmTableView/viewAllEmployeeTask/${empDept}`);
            const { success, data } = result.data;
            if (success === 2) {
                setallEmpTask(data)
            }
        }
        getAllEmployeeTask(empDept)
    }, [empDept])

    useEffect(() => {
        if ((allEmpTask.length !== 0) && (employees.length !== 0)) {
            const empList = employees?.map((value) => {
                const empTaskLIst = allEmpTask.find((val) => value.em_id === val.emslno)
                return {
                    emslno: value.em_id,
                    empname: value.em_name,
                    TT: empTaskLIst ? empTaskLIst.TT : 0,
                    TC: empTaskLIst ? empTaskLIst.TC : 0,
                }
            })
            setEmpDetalArry(empList);
        }
    }, [employees, allEmpTask])

    const openModal = useCallback((value) => {
        if (value.TT !== 0) {
            setEmployeeData(value)
            setModalFlag(1)
            setModalOpen(true)
        }
        else {
            infoNotify("No Task Assigned Under this Employee")
        }
    }, [])

    return (
        <Box sx={{ maxHeight: '69vh', overflow: 'auto' }}>
            {modalFlag === 1 ?
                <AllTaskListUnderProject
                    open={modalOpen} setModalOpen={setModalOpen} allEmpTask={allEmpTask}
                    setModalFlag={setModalFlag} employeeData={employeeData} /> : null}
            <AccordionGroup
                variant="plain"
                transition="0.2s"
                sx={{
                    [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
                    {
                        // paddingBlock: '1rem',
                    },
                    [`& .${accordionSummaryClasses.button}`]: {
                        // paddingBlock: '.5rem',
                    },
                }}
            >
                {
                    EmpDetalArry && EmpDetalArry.map((val) => {
                        let capEmpName = val.empname.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                        return <Box key={val.emslno}
                            sx={{
                                flex: 1,
                                Pb: .3,
                                '&:hover': {
                                    bgcolor: '#ECF1F2',
                                    borderBottom: '#C3CEDA'
                                },
                                cursor: 'grab'
                            }}>

                            <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, Pb: .5, borderColor: '#D9E4EC', boxShadow: ' 1px', }}>

                                <Box sx={{ wisth: 65, py: .5, }}>
                                    <Avatar color='primary' size='sm'>
                                        <PersonIcon />
                                    </Avatar>
                                </Box>
                                <Box sx={{ width: 230, pt: 1, pl: .3, fontWeight: 600 }}>
                                    <Typography sx={{ fontSize: 13, }}>{capEmpName}</Typography>
                                </Box>
                                <Box sx={{ flex: 1, pt: 2, }}>
                                    <EmployeeProgressBar val={val} />
                                </Box>
                                <Box sx={{ wisth: 55, px: 2, cursor: 'pointer' }}>
                                    <Badge badgeContent={val.TT} variant="solid" color='neutral' onClick={() => openModal(val)} >
                                        <Box sx={{ mr: .2, fontSize: 15, borderRadius: 3, pl: 1, flex: .1, display: 'flex' }}  >
                                            <AssignmentOutlinedIcon sx={{ color: '#0B1C47' }} />
                                        </Box>
                                    </Badge>
                                </Box>

                            </Box>
                        </Box>

                    })
                }
            </AccordionGroup >
        </Box >
    )
}

export default memo(TmEmployeeTaskData)