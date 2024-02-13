import { Box, Tooltip } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import accordionDetailsClasses from '@mui/joy/AccordionDetails';
import AccordionSummary, { accordionSummaryClasses, } from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import { axioslogin } from 'src/views/Axios/Axios';
import EmpProjectTaskDetails from './EmpProjectTaskDetails';
import EmployeeProgressBar from './EmployeeProgressBar';

const TmEmployeeTaskData = () => {
    const dispatch = useDispatch();
    const empsecid = useSelector((state) => { return state.LoginUserData.empsecid })
    const empnameselect = useSelector((state) => { return state.getDepartSecemployee.departsecempList || 0 })
    const [employees, setemployees] = useState([{ em_id: 0, em_name: '' }]);
    const [allEmpTask, setallEmpTask] = useState([])
    const [EmpDetalArry, setEmpDetalArry] = useState([])
    useEffect(() => {
        dispatch(getDepartSecemployee(empsecid))
    }, [dispatch, empsecid])

    useEffect(() => {
        if (empnameselect.length > 0) {
            setemployees(empnameselect);
        }
    }, [empnameselect]);
    useEffect(() => {
        const getAllEmployeeTask = async () => {
            const result = await axioslogin.get(`/TmTableView/viewAllEmployeeTask/${empsecid}`);
            const { success, data } = result.data;
            if (success === 2) {
                setallEmpTask(data)
            }
        }
        getAllEmployeeTask(empsecid)
    }, [empsecid])

    useEffect(() => {
        if ((allEmpTask.length !== 0) && (employees.length !== 0)) {
            const xx = employees?.map((value) => {
                const yy = allEmpTask.find((val) => value.em_id === val.emslno)
                return {
                    emslno: value.em_id,
                    empname: value.em_name,
                    TT: yy ? yy.TT : 0,
                    TC: yy ? yy.TC : 0
                }
            })
            setEmpDetalArry(xx);
        }
    }, [employees, allEmpTask])

    return (
        <Box sx={{ height: 450 }}>
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
                        return <Accordion key={val.emslno} >
                            <AccordionSummary >
                                <Avatar color='primary'  >
                                    <PersonIcon />
                                </Avatar>
                                <Tooltip title="Employee" >
                                    <Box sx={{ flex: 1.1, textTransform: 'uppercase' }}>
                                        <Typography>{val.empname}</Typography>
                                    </Box>
                                </Tooltip>

                                <Tooltip title="Project Progress" >
                                    <Box sx={{ flex: 6, }}>
                                        <EmployeeProgressBar val={val} />
                                    </Box>
                                </Tooltip>
                                <Tooltip title="Total Task" >
                                    <Box sx={{ mr: 2, fontSize: 22, borderRadius: 8, pl: 1 }}>{val.TT}</Box>
                                </Tooltip>
                            </AccordionSummary >

                            <EmpProjectTaskDetails val={val} />

                        </Accordion>
                    })
                }
            </AccordionGroup>
        </Box >
    )
}

export default memo(TmEmployeeTaskData)