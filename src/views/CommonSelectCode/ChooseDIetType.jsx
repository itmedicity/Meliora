import React, { memo } from 'react'
import { useDietTimes } from '../Diet/CommonData/UseQuery'


const ChooseDietType = ({ value, setValue }) => {

    const { data: DietTime = [] } = useDietTimes()

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            style={{
                minWidth: 140,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
        >
            <option value="" >
                Select Diet Type
            </option>

            {DietTime?.map((item, index) => (
                <option key={index} value={item.type_slno}>
                    {item.type_desc}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseDietType)
