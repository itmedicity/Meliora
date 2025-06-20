import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Option, Select } from '@mui/joy';
import { getComplainttypeOpera } from 'src/redux/actions/ComplaintType.action';

const CrfOperItm = ({ value, setValue, codept }) => {
    const dispatch = useDispatch();
    useEffect(() => {

        if (codept !== 0) {
            dispatch(getComplainttypeOpera(codept));
        }
    }, [codept,])

    const complainttype = useSelector(
        (state) => state.getComplainttypeOpera?.complainttypeListmainOper || []
    );
    return (
        < >
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
        </ >)
}

export default memo(CrfOperItm)