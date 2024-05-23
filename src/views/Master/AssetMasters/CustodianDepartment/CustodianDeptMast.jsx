import { Box } from '@mui/material'
import { React, useCallback, useState, memo, useMemo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import CustodianDeptTable from './CustodianDeptTable'

const CustodianDeptMast = () => {

    const history = useHistory()
    const [cusDeptName, setCusDeptName] = useState('')
    const [dept, setdept] = useState(0)
    const [deptsec, setDeptSec] = useState(0)
    const [empName, setEmpName] = useState(0)
    const [assetNameFirst, setAssetNameFirst] = useState('')
    const [assetNameSecond, setAssetNameSecond] = useState('')
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState(false)
    const [slno, setSlno] = useState(0)
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const UpdateCuDepartment = useCallback((e) => {
        setCusDeptName(e.target.value)
    }, [])
    const UpdateassetNameFirst = useCallback((e) => {
        setAssetNameFirst(e.target.value)
    }, [])

    const UpdateassetNameSecond = useCallback((e) => {
        setAssetNameSecond(e.target.value)
    }, [])
    const Updatestatus = useCallback((e) => {
        if (e.target.checked === true) {
            setStatus(true)
        }
        else {
            setStatus(false)
        }
    }, [])

    const postdata = useMemo(() => {
        return {
            am_custodian_name: cusDeptName,
            am_custodian_dept_slno: dept,
            am_custodian_deptsec_slno: deptsec,
            am_custodian_emp: empName,
            am_custdn_asset_no_first: assetNameFirst,
            am_custdn_asset_no_second: assetNameSecond,
            status: status === true ? 1 : 0,
            create_user: id
        }
    }, [cusDeptName, dept, deptsec, empName, assetNameFirst, assetNameSecond, id, status])


    const patch = useMemo(() => {
        return {
            am_custodian_name: cusDeptName,
            am_custodian_dept_slno: dept,
            am_custodian_deptsec_slno: deptsec,
            am_custodian_emp: empName,
            am_custdn_asset_no_first: assetNameFirst,
            am_custdn_asset_no_second: assetNameSecond,
            status: status === true ? 1 : 0,
            edit_user: id,
            am_custodian_slno: slno
        }
    }, [cusDeptName, dept, deptsec, empName, assetNameFirst, assetNameSecond, id, status, slno])

    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { am_custodian_slno, am_custodian_name, am_custodian_dept_slno, am_custodian_deptsec_slno, am_custodian_emp,
            am_custdn_asset_no_first, am_custdn_asset_no_second, status } = data[0]

        setSlno(am_custodian_slno)
        setCusDeptName(am_custodian_name)
        setdept(am_custodian_dept_slno)
        setDeptSec(am_custodian_deptsec_slno)
        setEmpName(am_custodian_emp)
        setAssetNameFirst(am_custdn_asset_no_first)
        setAssetNameSecond(am_custdn_asset_no_second)
        setStatus(status === 1 ? true : false)

    }, [])

    const reset = useCallback(() => {
        setCusDeptName('')
        setdept(0)
        setDeptSec(0)
        setEmpName(0)
        setAssetNameFirst('')
        setAssetNameSecond('')
        setValue(0)
        setCount(0)
        setStatus(false)
    }, [])
    const submitCustodianDept = useCallback((e) => {
        e.preventDefault()
        const InsertCustodiandept = async (postdata) => {
            const result = await axioslogin.post('/CustodianDeptMast/insert', postdata)
            const { message, success } = result.data
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        const UpdateCustodiandept = async (patch) => {
            const result = await axioslogin.patch('/CustodianDeptMast/update', patch)
            const { message, success } = result.data
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                reset()
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (value === 0) {
            InsertCustodiandept(postdata)
        }
        else {
            UpdateCustodiandept(patch)
        }

    }, [postdata, patch, reset, count, setCount, value])

    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const refreshWindow = useCallback(() => {
        reset()
    }, [reset])
    return (
        <CardMaster
            title="Custodian Department"
            submit={submitCustodianDept}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                <Box sx={{ width: '30%', p: 1 }}>
                    <Box>
                        <TextFieldCustom
                            placeholder="Custodian Department Name"
                            type="text"
                            size="sm"
                            name="cusDeptName"
                            value={cusDeptName}
                            onchange={UpdateCuDepartment}
                        ></TextFieldCustom>
                    </Box>

                    <Box sx={{ pt: 1.5 }}>
                        <DepartmentSelect value={dept} setValue={setdept} />
                    </Box>
                    <Box sx={{ pt: 1.5 }}>
                        <DeptSecUnderDept dept={dept}
                            value={deptsec}
                            setValue={setDeptSec}
                        />
                    </Box>
                    <Box sx={{ pt: 1.5 }}>
                        <EmpNameDeptSecSelect
                            deptsec={deptsec}
                            value={empName}
                            setValue={setEmpName}
                        />

                    </Box>

                    <Box sx={{ pt: 1 }}>
                        <TextFieldCustom
                            placeholder="Asset No Start"
                            type="text"
                            size="sm"
                            name="assetNameFirst"
                            value={assetNameFirst}
                            onchange={UpdateassetNameFirst}
                        ></TextFieldCustom>
                    </Box>

                    <Box sx={{ pt: 1 }}>
                        <TextFieldCustom
                            placeholder="Asset No Middle"
                            type="text"
                            size="sm"
                            name="assetNameSecond"
                            value={assetNameSecond}
                            onchange={UpdateassetNameSecond}
                        ></TextFieldCustom>
                    </Box>
                    <Box sx={{ pt: 1 }}>
                        <CusCheckBox
                            label="status"
                            color="primary"
                            size="md"
                            name="status"
                            value={status}
                            checked={status}
                            onCheked={Updatestatus}
                        ></CusCheckBox>
                    </Box>
                </Box>
                <Box sx={{ width: '70%' }}>
                    <CustodianDeptTable count={count} rowSelect={rowSelect} />
                </Box>
            </Box>


        </CardMaster>
    )
}

export default memo(CustodianDeptMast)