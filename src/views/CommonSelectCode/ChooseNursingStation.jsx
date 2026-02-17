import React, { memo } from 'react'
import { useNursingStationMaster } from '../Diet/CommonData/UseQuery'

const ChooseNursingStation = ({ value, handleChange }) => {

    const { data: nursingStations = [] } = useNursingStationMaster()

 

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
        >
            <option value="">
                Select Nursing Station
            </option>

            {nursingStations?.map((item) => (
                <option
                    key={item.slno}
                    value={item.fb_ns_code}
                >
                    {item.fb_ns_name}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseNursingStation)
