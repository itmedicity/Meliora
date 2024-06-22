import { FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useCallback } from 'react'
const QIEmployeeSelect = ({ employeeList, empName, setempName }) => {

    const EmployeeChange = useCallback((e) => {
        setempName(e.target.value);
    }, [setempName]);

    return (
        <Fragment>
            <FormControl fullWidth
                style={{ backgroundColor: 'white' }}
            >
                <Select
                    size="small" fullWidth
                    style={{ height: 32, fontSize: 14, backgroundColor: 'white' }}
                    defaultValue={0}
                    value={empName}
                    onChange={(e) => EmployeeChange(e)}
                >
                    <MenuItem disabled value={0}>-Select Employee-</MenuItem>
                    {
                        employeeList?.map((val, index) => (
                            <MenuItem key={index} value={val.em_id}>
                                {val.em_name} ({val.em_no})
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Fragment >
    )
}
export default memo(QIEmployeeSelect)