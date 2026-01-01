import { Autocomplete, Box } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CardMaster from 'src/views/Components/CardMaster'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import StoreReportsRightsTable from './StoreReportsRightsTable'

const StoreReport = () => {
    const [dept, setDept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const [empname, setEmpname] = useState(0)
    const history = useNavigate()
    const [selectedValues, setSelectedValues] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [status, setStatus] = useState(false)
    const [count, setCount] = useState(0)
    const [slno, setSlno] = useState(0)

    const loginId = useSelector(state => state.LoginUserData.empid)

    const dashboards = [
        { id: 1, name: 'Purchase Report' },
        { id: 2, name: 'GRN Report' },
        { id: 3, name: 'Rate Variation Report' },
        { id: 4, name: 'Rate Variation Updation' },
        { id: 5, name: 'Pending Approval Quatation' },
        { id: 6, name: 'Resolved List' },
        { id: 7, name: 'Hold Paymnet' },
        { id: 8, name: 'New Quotation(Rec)' },
        { id: 9, name: 'Payment Proceed' },
        { id: 10, name: 'Hold Purchase' },
        { id: 11, name: 'Resolved Status' },
        { id: 12, name: 'ED and MD Rights' },
    ]

    const updateUserCreation = useCallback(
        e => {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
            setStatus(value)
        },
        [setStatus]
    )

    const rowSelect = useCallback(params => {
        const data = params.api.getSelectedRows()
        const { store_report_view, emid, department, dp_section, status, slno } = data[0]
        setDept(department)
        setDeptsec(dp_section)
        setEmpname(emid)
        setSelectedValues(store_report_view)
        setUpdateFlag(1)
        setStatus(status)
        setSlno(slno)
    }, [])

    const submitDashBoard = useCallback(
        async () => {
            if (dept === 0) {
                warningNotify('Select Department')
            } else {
                const postData = {
                    selectedValues: selectedValues,
                    dept: dept,
                    empId: empname,
                    deptsec: deptsec,
                    status: status === false ? 0 : 1,
                    create_user: loginId,
                    slno: slno
                }

                //edit section
                if (UpdateFlag === 1) {
                    const result = await axioslogin.post('/store_master/updateReportRightsView', postData)
                    const { success } = result.data
                    if (success === 1) {
                        succesNotify('Data Updated Sucessfully')
                        setCount(1)
                    } else {
                        warningNotify('Something Went Wrong')
                    }
                } else {


                    //insert section
                    const result = await axioslogin.post('/store_master/InsertStoremasterRights', postData)
                    const { success } = result.data
                    if (success === 1) {
                        succesNotify('Data Inserted Sucessfully')
                        setCount(1)
                    } else {
                        warningNotify('Something Went Wrong')
                    }
                }
            }
        },
        [dept, empname, deptsec, selectedValues, UpdateFlag, status, loginId, slno]
    )

    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])

    return (
        <CardMaster title="Store Report View Rights" submit={submitDashBoard} close={backtoSetting} refresh={refreshWindow}>

            <Box sx={{ width: "100%" }}>
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
                        <Box sx={{ mt: 1, overflow: 'auto', border: '1px solid lightgrey' }}>
                            <Autocomplete
                                multiple
                                placeholder="Select Dashboard"
                                variant="plain"
                                style={{
                                    height: 'auto',
                                    padding: 0,
                                    margin: 0,
                                    lineHeight: 1.2,
                                    width: '100%',
                                    backgroundColor: 'white',
                                    fontSize: 14
                                }}
                                value={dashboards?.filter(d => selectedValues.includes(d.id))}
                                onChange={(_, newValue) => {
                                    const ids = newValue.map(item => item.id)
                                    setSelectedValues(ids)
                                }}
                                inputValue={inputValue}
                                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                                options={dashboards}
                                getOptionLabel={option => option?.name || ''}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                            />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <CusCheckBox
                                label="Status"
                                color="primary"
                                size="md"
                                name="status"
                                checked={status}
                                onCheked={updateUserCreation}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', p: 1 }}>
                        <StoreReportsRightsTable
                            count={count}
                            setCount={setCount}
                            rowSelect={rowSelect}
                            setDept={setDept}
                            setDeptsec={setDeptsec}
                            setEmpname={setEmpname}
                            setStatus={setStatus}
                        />
                    </Box>
                </Box>

            </Box>
        </CardMaster>
    )
}

export default memo(StoreReport)