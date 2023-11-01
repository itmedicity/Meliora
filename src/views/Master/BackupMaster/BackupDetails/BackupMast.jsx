import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { useEffect } from 'react';
import { useMemo } from 'react';
import { memo } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getBackupDetails } from 'src/redux/actions/BackupDetails.action';
import { getScheduleTime } from 'src/redux/actions/BackupScheduleTime.action';
import { getScheduleType } from 'src/redux/actions/BackupScheduleType.action';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import BackupScheduleSelect from 'src/views/CommonSelectCode/BackupScheduleSelect';
import BackupTimeSelect from 'src/views/CommonSelectCode/BackupTimeSelect';
import BackupTypeSelect from 'src/views/CommonSelectCode/BackupTypeSelect';
import CardMaster from 'src/views/Components/CardMaster';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import BackupMastTable from './BackupMastTable';
import { CssVarsProvider } from '@mui/joy';
import moment from 'moment';
import { addDays } from 'date-fns';
const BackupMast = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [count, setCount] = useState(0);
    const [edit, setEdit] = useState(0)
    const [backupType, setBackupType] = useState(0)
    const [scheduleType, setScheduleType] = useState(0)
    const [scheduleTime, setScheduleTime] = useState([])
    const [days, setdays] = useState(0)
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    useEffect(() => {
        dispatch(getScheduleType())
        dispatch(getScheduleTime())
        dispatch(getBackupDetails())
    }, [dispatch])
    const [backupstore, setBackupstore] = useState({
        backup_slno: '0',
        backupname: '',
        location: '',
        ipadd1: '',
        ipadd2: '',
        compname1: '',
        compname2: '',
        physicalLoc1: '',
        physicalLoc2: '',
        backup_selected_date: ''
    })
    const {
        backup_slno,
        backupname,
        location,
        ipadd1,
        ipadd2,
        compname1,
        compname2,
        physicalLoc1,
        physicalLoc2,
        backup_selected_date
    } = backupstore
    const reset = useCallback(() => {
        const frmdata = {
            backup_slno: '0',
            backupname: '',
            location: '',
            ipadd1: '',
            ipadd2: '',
            compname1: '',
            compname2: '',
            physicalLoc1: '',
            physicalLoc2: '',
            backup_selected_date: ''
        }
        setBackupstore(frmdata)
        setBackupType(0)
        setScheduleType(0)
        setScheduleTime([])
        setEdit(0)
        setCount(0)
        setdays(0)
    }, [setBackupstore, setBackupType, setScheduleType, setScheduleTime, setEdit, setCount, setdays])
    const UpdateBackupChecksDetails = useCallback(
        (e) => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setBackupstore({ ...backupstore, [e.target.name]: value })
        }, [backupstore])
    const Selecteddayschange = useCallback((e) => {
        setdays(e.target.value)
    }, [])
    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])
    const postdata = useMemo(() => {
        return {
            backup_type: backupType,
            backup_name: backupname,
            backup_location: location,
            backup_device_ip: ipadd1,
            backup_device_name: compname1,
            backup_device_location: physicalLoc1,
            transferred_device_ip: ipadd2,
            transferred_device_name: compname2,
            transferred_device_location: physicalLoc2,
            backup_schedule_type: scheduleType,
            backup_schedule_time: scheduleTime,
            selected_days: days,
            create_user: id
        }
    }, [backupType, backupname, location, ipadd1, compname1, physicalLoc1,
        ipadd2, compname2, physicalLoc2, scheduleType, scheduleTime, days, id])
    const patchdata = useMemo(() => {
        return {
            backup_slno: backup_slno,
            backup_type: backupType,
            backup_name: backupname,
            backup_location: location,
            backup_device_ip: ipadd1,
            backup_device_name: compname1,
            backup_device_location: physicalLoc1,
            transferred_device_ip: ipadd2,
            transferred_device_name: compname2,
            transferred_device_location: physicalLoc2,
            backup_schedule_type: scheduleType,
            backup_schedule_time: scheduleTime,
            selected_days: days,
            edit_user: id
        }
    }, [backup_slno, backupType, backupname, location, ipadd1, compname1, physicalLoc1,
        ipadd2, compname2, physicalLoc2, scheduleType, scheduleTime, days, id])
    const inactivedatas = useMemo(() => {
        return {
            backup_slno: backup_slno,
            status: 0,
            edit_user: id
        }
    }, [backup_slno, id])
    const rowSelect = useCallback((data) => {
        setEdit(1)
        const {
            backup_slno,
            backup_type,
            backup_name,
            backup_location,
            backup_device_ip,
            backup_device_name,
            backup_device_location,
            transferred_device_ip,
            transferred_device_name,
            transferred_device_location,
            backup_schedule_type,
            selected_days,
            backup_selected_date
        } = data
        const frmdata = {
            backup_slno: backup_slno,
            backupname: backup_name,
            location: backup_location,
            ipadd1: backup_device_ip,
            compname1: backup_device_name,
            ipadd2: transferred_device_ip,
            compname2: transferred_device_name,
            physicalLoc1: backup_device_location,
            physicalLoc2: transferred_device_location,
            backup_selected_date: backup_selected_date
        }
        setBackupstore(frmdata)
        setBackupType(backup_type)
        setScheduleType(backup_schedule_type)
        setdays(selected_days)
        // const selectedScheduleTime = Array.isArray(backup_schedule_time)
        //     ? backup_schedule_time
        //     : [backup_schedule_time];

        // setScheduleTime(selectedScheduleTime);
    }, [])
    const BackupChecksDetails = useCallback((e) => {
        if (scheduleType !== 5 && scheduleTime.length === 0) {
            infoNotify("Select Any Schedule Time")
        }
        else if (scheduleType === 5 && days === 0) {
            infoNotify("Enter Number Of Days")
        }
        else {
            e.preventDefault();
            const InsertDetailsMast = async (postdata) => {
                const result = await axioslogin.post('/backupdetails/insertMast', postdata);
                return result.data
            }
            const UpdateDetailsMast = async (patchdata) => {
                const result = await axioslogin.patch('/backupdetails/updateMast', patchdata);
                return result.data
            }
            if (edit === 0) {
                InsertDetailsMast(postdata).then((value) => {
                    const { message, success, insert_id } = value
                    if (success === 1) {
                        const postdatas = scheduleTime?.map((val) => {
                            return {
                                backup_slno: insert_id,
                                backup_name: backupname,
                                backup_schedule_type: scheduleType,
                                backup_schedule_time: val,
                                status: 1,
                                create_user: id
                            }
                        })
                        if (scheduleType !== 5) {
                            const InsertScheduleTime = async (postdatas) => {
                                const result = await axioslogin.post('/backupdetails/detailInsert', postdatas);
                                const { message, success } = result.data;
                                if (success === 1) {
                                    succesNotify(message)
                                    setCount(count + 1);
                                    reset()
                                }
                            }
                            InsertScheduleTime(postdatas)
                        }
                        else {
                            const startdate = moment(new Date()).format('YYYY-MM-DD')
                            const insertdata = {
                                backup_slno: insert_id,
                                selected_days: days,
                                backup_selected_date: startdate,
                                due_date: moment(addDays(new Date(startdate), days)).format('YYYY-MM-DD'),
                                verify_status: 0,
                                create_user: id
                            }
                            const InsertSelectedDays = async (insertdata) => {
                                const result = await axioslogin.post('/backupdetails/add', insertdata);
                                const { message, success } = result.data;
                                if (success === 1) {
                                    succesNotify(message)
                                    setCount(count + 1);
                                    reset()
                                }
                            }
                            InsertSelectedDays(insertdata)
                        }
                    }
                    else if (success === 0) {
                        infoNotify(message);
                    }
                    else {
                        infoNotify(message)
                    }
                })
            }
            else {
                if (scheduleType !== 5) {
                    const inactiveScheduleTime = async (inactivedatas) => {
                        const result = await axioslogin.patch('/backupdetails/inactive', inactivedatas);
                        return result.data
                    }
                    inactiveScheduleTime(inactivedatas).then((val) => {
                        const { message, success } = val
                        if (success === 2) {
                            UpdateDetailsMast(patchdata).then((value) => {
                                const { success } = value
                                if (success === 2) {
                                    const patchdatas = scheduleTime?.map((val) => {
                                        return {
                                            backup_slno: backup_slno,
                                            backup_name: backupname,
                                            backup_schedule_type: scheduleType,
                                            backup_schedule_time: val,
                                            status: 1,
                                            create_user: id
                                        }
                                    })
                                    const InsertScheduleTime = async (patchdatas) => {
                                        const result = await axioslogin.post('/backupdetails/detailInsert', patchdatas);
                                        const { message, success } = result.data;
                                        if (success === 1) {
                                            succesNotify(message)
                                            setCount(count + 1);
                                            reset()
                                        }
                                    }
                                    InsertScheduleTime(patchdatas)
                                }
                            })
                        }
                        else if (success === 0) {
                            infoNotify(message);
                        }
                        else {
                            infoNotify(message)
                        }
                    })
                }
                else {
                    UpdateDetailsMast(patchdata).then((value) => {
                        const { success, message } = value
                        if (success === 2) {
                            const updatedata = {
                                backup_slno: backup_slno,
                                selected_days: days,
                                due_date: moment(addDays(new Date(backup_selected_date), days)).format('YYYY-MM-DD'),
                                edit_user: id
                            }
                            const updateSelectedDays = async (updatedata) => {
                                const result = await axioslogin.patch('/backupdetails/updatedays', updatedata);
                                const { message, success } = result.data;
                                if (success === 2) {
                                    succesNotify(message)
                                    setCount(count + 1);
                                    reset()
                                }
                            }
                            updateSelectedDays(updatedata)
                        }
                        else if (success === 0) {
                            infoNotify(message);
                        }
                        else {
                            infoNotify(message)
                        }
                    })
                }
            }
        }
    }, [postdata, count, patchdata, edit, inactivedatas, scheduleType, scheduleTime,
        backup_selected_date, days, backup_slno, id, backupname, reset])
    return (
        //  sx={{ height: window.innerHeight }}
        <Box >
            <Paper >
                <CardMaster
                    title="Backup Details"
                    submit={BackupChecksDetails}
                    close={backtoSetting}
                    refresh={refreshWindow}
                >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", pt: 2 }}>

                        <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 2 }}>   </Box>
                        <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 3 }}>
                            <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 0.5 }}>
                                <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-start" }}>
                                    <Typography> Backup Type </Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 2 }}>
                                    <BackupTypeSelect
                                        backupType={backupType}
                                        setBackupType={setBackupType}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 0.5 }}>
                                <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-start" }}>
                                    <Typography>  Backup Name</Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 2 }}>
                                    <TextFieldCustom style={{ width: 755 }}
                                        type="text"
                                        size="sm"
                                        name="backupname"
                                        value={backupname}
                                        onchange={UpdateBackupChecksDetails}
                                    >
                                    </TextFieldCustom>
                                </Box>
                            </Box>
                            <Box
                                sx={{ display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 0.5 }}>
                                <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-start", }}>
                                    <Typography>Backup Location</Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 2 }}>
                                    <TextFieldCustom
                                        style={{ width: 755 }}
                                        type="text"
                                        size="sm"
                                        name="location"
                                        value={location}
                                        onchange={UpdateBackupChecksDetails}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 0.5 }}>
                                <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-start", pt: 2 }}>
                                    <Typography>Backup Device Details</Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 2 }}>
                                    <Box sx={{ display: "flex", flexDirection: 'row' }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: 'column' }}>
                                            <Typography align='left' sx={{ pl: 1, fontSize: '12px', }}>
                                                IP Address
                                            </Typography>
                                            <TextFieldCustom
                                                style={{ width: 200 }}
                                                type="text"
                                                size="sm"
                                                name="ipadd1"
                                                value={ipadd1}
                                                onchange={UpdateBackupChecksDetails}
                                            />
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: 'column', pl: 1 }}>
                                            <Typography align='left' sx={{ pl: 1, fontSize: '12px', }}>
                                                Computer Name
                                            </Typography>
                                            <TextFieldCustom
                                                style={{ width: 200 }}
                                                type="text"
                                                size="sm"
                                                name="compname1"
                                                value={compname1}
                                                onchange={UpdateBackupChecksDetails}
                                            />
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: 'column', pl: 1 }}>
                                            <Typography align='left' sx={{ pl: 1, fontSize: '12px', }}>
                                                Physical Location
                                            </Typography>
                                            <TextFieldCustom
                                                style={{ width: 339 }}
                                                type="text"
                                                size="sm"
                                                name="physicalLoc1"
                                                value={physicalLoc1}
                                                onchange={UpdateBackupChecksDetails}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 0.5 }}>
                                <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-start", pt: 2 }}>
                                    <Typography>Backup Transferred Device</Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 2 }}>
                                    <Box sx={{ display: "flex", flexDirection: 'row' }}
                                    >
                                        <Box sx={{ display: "flex", flexDirection: 'column', }}>
                                            <Typography align='left' sx={{ pl: 1, fontSize: '12px', }}>
                                                IP Address
                                            </Typography>
                                            <TextFieldCustom
                                                style={{ width: 200 }}
                                                type="text"
                                                size="sm"
                                                name="ipadd2"
                                                value={ipadd2}
                                                onchange={UpdateBackupChecksDetails}
                                            />
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: 'column', pl: 1 }}>
                                            <Typography
                                                align='left' sx={{ pl: 1, fontSize: '12px', }}>
                                                Computer Name
                                            </Typography>
                                            <TextFieldCustom
                                                style={{ width: 200 }}
                                                type="text"
                                                size="sm"
                                                name="compname2"
                                                value={compname2}
                                                onchange={UpdateBackupChecksDetails}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex", flexDirection: 'column', pl: 1
                                            }}>
                                            <Typography
                                                align='left'
                                                sx={{ pl: 1, fontSize: '12px', }} >
                                                Physical Location
                                            </Typography>
                                            <TextFieldCustom
                                                style={{ width: 339 }}
                                                type="text"
                                                size="sm"
                                                name="physicalLoc2"
                                                value={physicalLoc2}
                                                onchange={UpdateBackupChecksDetails}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 0.5 }}>
                                <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-start" }}>
                                    <Typography> Backup Schedule</Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 2 }}>
                                    <Box sx={{ display: "flex", flexDirection: 'row' }}>
                                        <Box sx={{ display: "flex", flexDirection: 'column' }}>
                                            <BackupScheduleSelect
                                                scheduleType={scheduleType}
                                                setScheduleType={setScheduleType}
                                            />
                                        </Box>
                                        {scheduleType === 5 ?
                                            <Box sx={{ display: "flex", flexDirection: 'column', pl: 1 }}>
                                                <TextFieldCustom
                                                    style={{ width: 339 }}
                                                    type="text"
                                                    size="sm"
                                                    name="days"
                                                    value={days}
                                                    onchange={Selecteddayschange}
                                                />
                                            </Box> :
                                            <Box sx={{ display: "flex", flexDirection: 'column', pl: 1, pt: 0.5 }}>
                                                <BackupTimeSelect
                                                    scheduleTime={scheduleTime}
                                                    setScheduleTime={setScheduleTime}
                                                />
                                            </Box>
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 2 }}>   </Box>
                    </Box>
                </CardMaster >
                <Box sx={{ width: '100%', color: 'white' }}>
                    <CssVarsProvider  >
                        <BackupMastTable EditBackup={rowSelect} count={count} />
                    </CssVarsProvider>
                </Box>
            </Paper>
        </Box >
    )
}
export default memo(BackupMast)