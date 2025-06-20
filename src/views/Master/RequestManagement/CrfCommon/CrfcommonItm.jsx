import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Option, Select } from '@mui/joy';
import { getComplainttype } from 'src/redux/actions/ComplaintType.action';

const CrfcommonItm = ({ value, setValue, codept }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (codept !== 0) {
            dispatch(getComplainttype(codept));
        }
    }, [codept,])

    const complainttype = useSelector(
        (state) => state.getComplainttype?.complainttypeList || []
    );

    return (
        <>
            <Select
                // value={value}
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
        </ >
    )
}

export default memo(CrfcommonItm) 