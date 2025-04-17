import { Box, CssVarsProvider } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
// import CRFCategoryTypeSelect from '../Components/CRFCategoryTypeSelect';
import CRFCategoryTypeSelect from '../../../../views/CentralRequestManagement/CRFRequestMaster/Components/CRFCategoryTypeSelect';
// import CardMasterJoy from 'src/views/Components/CardMasterJoy'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import ViewCategoryTable from './ViewCategoryTable';

const ViewCategoryMaster = () => {
    const history = useHistory()
    const [catFlag, setcatFlag] = useState(0)
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [category, setCategory] = useState([])
    const [editRowData, setEditRowData] = useState({})
    const [dept, setDept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const [empname, setEmpname] = useState(0)
    const [count, setCount] = useState(0)


    const rowSelect = useCallback((params) => {
        // setValue(1)
        const data = params.api.getSelectedRows();
        const { emid, department, dp_section } = data[0]
        setDept(department)
        setDeptsec(dp_section)
        setEmpname(emid)
        setEditRowData(data[0])
        setUpdateFlag(1)

    }, [])


    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const submitComapnyName = useCallback(async (val) => {
        const postData = {
            category: category,
            id: editRowData?.common_master_slno,
            empname: empname,
            deptsec: deptsec,
            dept: dept
        }
        if (UpdateFlag === 1) {
            const result = await axioslogin.post('/newCRFRegister/CommonMasterUpdate/update', postData);
            const { success } = result.data
            if (success === 1) {
                succesNotify("Data Updated Sucessfully")
                setUpdateFlag(0)
                setCount(1)
                setDept(0)
                setDeptsec(0)
                setEmpname(0)
            }
            else {
                warningNotify("Something Went Wrong")

            }
        } else {
            const result = await axioslogin.post('/newCRFRegister/CommonMaster', postData);
            const { success } = result.data
            if (success === 1) {
                succesNotify("Data Inserted Sucessfully")
                setUpdateFlag(0)
                setCount(1)
                setDept(0)
                setDeptsec(0)
                setEmpname(0)
            }
            else {
                warningNotify("Something Went Wrong")

            }
        }
    }, [category, UpdateFlag, editRowData, dept, deptsec, empname])

    return (
        <CssVarsProvider>
            <CardMaster
                title="Category Master"
                submit={submitComapnyName}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                    <Box sx={{ width: '50%', }}>
                        <Box sx={{}} >
                            <DepartmentSelect value={dept} setValue={setDept} />
                        </Box>
                        <Box sx={{ mt: 1.5, }} >
                            <DeptSecUnderDept value={deptsec} setValue={setDeptsec} dept={dept} />
                        </Box>
                        <Box sx={{ mt: 1.5, }} >
                            <EmpNameDeptSecSelect value={empname} setValue={setEmpname} deptsec={deptsec} />
                        </Box>
                        <Box sx={{ mt: 1, overflow: 'auto', border: '1px solid lightgrey', }} >
                            <CRFCategoryTypeSelect category={category} setCategory={setCategory} editRowData={editRowData}
                                catFlag={catFlag} setcatFlag={setcatFlag} />
                        </Box>
                    </Box>

                </Box>

                <Box sx={{ width: '100%', p: 1 }}>
                    <ViewCategoryTable count={count} setCount={setCount} rowSelect={rowSelect}
                        setDept={setDept} setDeptsec={setDeptsec} setEmpname={setEmpname} />
                </Box>
            </CardMaster>
        </CssVarsProvider>
    )
}

export default memo(ViewCategoryMaster)