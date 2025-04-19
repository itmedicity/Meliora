import { Autocomplete, Box, CssVarsProvider, } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import CardMaster from 'src/views/Components/CardMaster'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import DeptSecUnderDept from 'src/views/CommonSelectCode/DeptSecUnderDept'
import EmpNameDeptSecSelect from 'src/views/CommonSelectCode/EmpNameDeptSecSelect'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import DashBoardTable from './DashBoardTable';


const DashboardMaster = () => {

    const [dept, setDept] = useState(0)
    const [deptsec, setDeptsec] = useState(0)
    const [empname, setEmpname] = useState(0)
    const [selectedValues, setSelectedValues] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [count, setCount] = useState(0)

    const history = useHistory()

    const rowSelect = useCallback((params) => {
        // setValue(1)
        const data = params.api.getSelectedRows();
        const { dash_view, emid,
            department, dp_section } = data[0]
        setDept(department)
        setDeptsec(dp_section)
        setEmpname(emid)
        setSelectedValues(dash_view)
        setUpdateFlag(1)

    }, [])

    const submitDashBoard = useCallback(async (val) => {
        if (dept === 0) {
            warningNotify("Select Department")
        } else {
            const postData = {
                selectedValues: selectedValues,
                dept: dept,
                empId: empname,
                deptsec: deptsec,

            }
            if (UpdateFlag === 1) {
                const result = await axioslogin.post('/newCRFRegister/DashBoardMaster/update', postData);
                const { success } = result.data
                if (success === 1) {
                    succesNotify("Data Updated Sucessfully")
                    setCount(1)
                }
                else {
                    warningNotify("Something Went Wrong")

                }
            } else {
                const result = await axioslogin.post('/newCRFRegister/DashBoardMaster', postData);
                const { success } = result.data
                if (success === 1) {
                    succesNotify("Data Inserted Sucessfully")
                    setCount(1)
                }
                else {
                    warningNotify("Something Went Wrong")

                }
            }
        }
    }, [dept, empname, deptsec, selectedValues, UpdateFlag])

    const refreshWindow = useCallback(() => {
        // setCategory([])
    }, [])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const dashboards = [
        { id: 1, name: 'CRF Status' },
        { id: 2, name: 'CRF Purchase Status' },
        { id: 3, name: 'CRF Store Status' },
    ];

    return (
        <CssVarsProvider>
            <CardMaster
                title="DashBoard  Master"
                submit={submitDashBoard}
                close={backtoSetting}
                refresh={refreshWindow}
            >
                <Box sx={{ height: '100%', width: '100%', display: 'flex', }}>
                    <Box sx={{ width: '50%', p: 1 }}>
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
                                    fontSize: 14,
                                }}
                                value={dashboards?.filter(d => selectedValues.includes(d.id))}
                                onChange={(_, newValue) => {
                                    const ids = newValue.map(item => item.id);
                                    setSelectedValues(ids);
                                }}
                                inputValue={inputValue}
                                onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
                                options={dashboards}
                                getOptionLabel={(option) => option?.name || ''}
                                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                            />
                        </Box>



                    </Box>

                </Box>
                <Box sx={{ width: '100%', p: 1 }}>
                    <DashBoardTable count={count} setCount={setCount} rowSelect={rowSelect}
                        setDept={setDept} setDeptsec={setDeptsec} setEmpname={setEmpname} />
                </Box>
            </CardMaster>
        </CssVarsProvider>
    )
}

export default memo(DashboardMaster)