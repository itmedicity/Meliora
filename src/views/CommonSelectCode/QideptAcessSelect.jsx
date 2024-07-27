import { } from '@mui/joy';
import { Box, Chip, FormControl, MenuItem, Select } from '@mui/material';
import React, { Fragment, memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';

const QideptAcessSelect = ({ qidept, setQidept }) => {
    const [departmentList, setdepartmentList] = useState([])
    useEffect(() => {
        const getDepartment = async () => {
            const result = await axioslogin.get('/qidepartment/allActive')
            const { success, data } = result.data
            if (success === 1) {
                setdepartmentList(data)
            }
        }
        getDepartment();
    }, [])
    const handleChange = (e) => {
        const {
            target: { value }
        } = e;
        setQidept(
            typeof value === "string" ? value.split(",") : value
        );
    };
    return (
        <Fragment>
            <FormControl fullWidth>
                <Select
                    sx={{
                        height: 'auto', // Allow height to be auto-adjustable
                        lineHeight: 1.2,
                        borderRadius: 1.5,
                    }}
                    placeholder="Select Department Section"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    size="small"
                    multiple
                    value={qidept}
                    onChange={handleChange}
                    variant='outlined'
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={departmentList.find(item => item.qi_dept_no === value)?.qi_dept_desc} />
                            ))}
                        </Box>
                    )}
                >
                    <MenuItem value={0} disabled>Select Department Section</MenuItem>
                    {departmentList?.map((val) => (
                        <MenuItem key={val.qi_dept_no} value={val.qi_dept_no}>
                            {val.qi_dept_desc}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

        </Fragment>

    )
}

export default memo(QideptAcessSelect)