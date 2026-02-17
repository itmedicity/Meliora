import React, { memo } from 'react'
import { foodUnits } from '../Diet/CommonData/Common'

const ChooseDietMeasurementSelect = ({ value, setValue }) => {

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            style={{
                minWidth: 120,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
        >
            <option value="" disabled>
                Select Unit
            </option>

            {foodUnits?.map((val, index) => (
                <option key={index} value={val.value}>
                    {val.label}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseDietMeasurementSelect)
