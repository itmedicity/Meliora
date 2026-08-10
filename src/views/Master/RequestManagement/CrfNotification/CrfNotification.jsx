import { Box, CssVarsProvider } from '@mui/joy'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import MobileNumberInput from 'src/views/CommonSelectCode/MobileNumberInput'
import CardMaster from 'src/views/Components/CardMaster'
import CrfNotificationTable from './CrfNotificationTable'

const CrfNotification = () => {

    const [dept, setDept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const [empname, setEmpname] = useState(0)
    const [mobile, setMobile] = useState('')
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [count, setCount] = useState(0)
    const [notification_id, setNotification_id] = useState(0)

    const history = useNavigate()

    const refreshWindow = useCallback(() => {
        setDept(0)
        setDeptsec(0)
        setEmpname(0)
        setMobile('')
        setUpdateFlag(0)
        setNotification_id(0)
    }, [])
    const rowSelect = useCallback(params => {
        const data = params.api.getSelectedRows()
        const { emp_id, dep_id, depsec_id, mobile_no, notification_id } = data[0]

        setDept(dep_id)
        setDeptsec(depsec_id)
        setEmpname(emp_id)
        setMobile(mobile_no)
        setUpdateFlag(1)
        setNotification_id(notification_id)
    }, [])

    const submitDashBoard = useCallback(
        async () => {
            if (dept === 0) {
                warningNotify('Select Department')
            } else if (deptsec === 0) {
                warningNotify('Select Department Section')
            } else if (empname === 0) {
                warningNotify('Select Employee')
            } else if (mobile === '') {
                warningNotify('Enter Mobile Number')
            } else {
                const postData = {
                    dept: dept,
                    deptsec: deptsec,
                    empId: empname,
                    mobile: mobile
                }
                const patchdata = {
                    dept: dept,
                    deptsec: deptsec,
                    empId: empname,
                    mobile: mobile,
                    notification_id: notification_id
                }
                if (UpdateFlag === 1) {
                    const result = await axioslogin.patch('/companyMast/crfNotificationUpdate', patchdata)
                    const { success, message } = result.data
                    if (success === 1) {
                        succesNotify(message || 'Data Updated Successfully')
                        setCount(count + 1)
                        refreshWindow()
                    } else {
                        warningNotify(message || 'Something Went Wrong')
                    }
                } else {
                    const result = await axioslogin.post('/companyMast/crfNotificationInsert', postData)
                    const { success, message } = result.data
                    if (success === 1) {
                        succesNotify(message || 'Data Inserted Successfully')
                        setCount(count + 1)
                        refreshWindow()
                    } else {
                        warningNotify(message || 'Something Went Wrong')
                    }
                }
            }
        },
        [dept, deptsec, empname, mobile, count, UpdateFlag, notification_id, refreshWindow]
    )

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    return (
        <CssVarsProvider>
            <CardMaster title="DashBoard  Master" submit={submitDashBoard} close={backtoSetting} refresh={refreshWindow}>
                <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                    <Box sx={{ width: '50%', p: 1 }}>
                        <Box sx={{}}>
                            <DepartmentSelect value={dept} setValue={setDept} />
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
                            <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
                            <EmpNameDeptSecSelect value={empname} setValue={setEmpname} deptsec={deptsec} />
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
                            <MobileNumberInput value={mobile} setValue={setMobile} />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ width: '100%', p: 1 }}>
                    <CrfNotificationTable
                        count={count}
                        setCount={setCount}
                        rowSelect={rowSelect}
                        setDept={setDept}
                        setDeptsec={setDeptsec}
                        setEmpname={setEmpname}
                    />
                </Box>
            </CardMaster>
        </CssVarsProvider>
    )
}

export default CrfNotification