import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Box, FormControl } from '@mui/joy'
import { getempname } from 'src/redux/actions/EmpName.action'

const AllEmpSelect = ({ value, setValue }) => {
    const dispatch = useDispatch()

    const empName = useSelector(state => {
        return state.getEmployeeName.employeeNameSelect || 0
    })
    //getDepartment function is used to update data in department redux
    useEffect(() => {
        dispatch(getempname())
    }, [dispatch])

    return (
        <Box>
            <FormControl size="small">

                <Autocomplete
                    size="sm"
                    placeholder="Select Employee"
                    options={empName || []}
                    getOptionLabel={(option) => `${option.em_name} (${option.em_id})`}
                    isOptionEqualToValue={(option, value) => option.em_id === value.em_id}
                    value={empName.find(e => e.em_id === value) || null}
                    onChange={(e, newVal) => setValue(newVal ? newVal.em_id : 0)}
                    loading={!empName.length}
                />

            </FormControl>
        </Box>
    )
}

export default memo(AllEmpSelect)