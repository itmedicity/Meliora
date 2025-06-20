import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Option, Select } from '@mui/joy';
import { getComplainttypeHouse } from 'src/redux/actions/ComplaintType.action';

const CrfHouseitm = ({ value, setValue, codept }) => {
    const dispatch = useDispatch();
    useEffect(() => {

        if (codept !== 0) {
            dispatch(getComplainttypeHouse(codept));
        }
    }, [codept,])

    const complainttype = useSelector(
        (state) => state.getComplainttypeHouse?.complainttypeListmainHouse || []
    );

    return (
        <Box >
            <FormControl fullWidth size="small"  >
                <Select
                    id="demo-simple-select"
                    value={complainttype.some(item => item?.complaint_type_slno === value) ? value : 0}
                    onChange={(e, newValue) => setValue(newValue)}
                    size="sm"
                    variant='outlined'
                >
                    <Option value={0} disabled  >Select item type</Option>
                    {
                        complainttype && complainttype.map((val, index) => {
                            return <Option key={index} value={val.complaint_type_slno}>{val.complaint_type_name}</Option>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(CrfHouseitm)