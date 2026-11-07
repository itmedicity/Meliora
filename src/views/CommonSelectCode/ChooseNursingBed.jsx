import React, { memo } from 'react'
import { useNursingStationBedDetail } from '../Diet/CommonData/UseQuery'


const ChooseNursingBed = ({ value, setValue, code }) => {

    const { data: nursingStations = [] } = useNursingStationBedDetail(code)

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            disabled={!code}
            style={{
                minWidth: 180,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
        >
            <option value="">
                Select Room
            </option>

            {nursingStations?.map((item) => (
                <option
                    key={item.fb_bd_code}
                    value={item.fb_bd_code}
                >
                    {item.fb_bdc_no}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseNursingBed)
