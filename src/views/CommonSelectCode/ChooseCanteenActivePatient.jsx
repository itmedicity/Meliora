import React, { memo, useMemo } from 'react'

const ChooseCanteenActivePatient = ({ value, setValue, disabled, PtDetail }) => {

    const handleChange = (e) => {
        setValue(e.target.value)   //  send only value
    }

    const FilterdPatient = useMemo(() => {
        return [...new Map(PtDetail?.map(item => [item.pt_no, item])).values()];
    }, [PtDetail]);

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            style={{
                minWidth: 180,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
            disabled={disabled}
        >
            <option value="">
                Select Patient
            </option>

            {FilterdPatient?.map((item) => (
                <option
                    key={item.pt_no}   //  better key
                    value={item.pt_no}
                >
                    {item.ptc_ptname}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseCanteenActivePatient)