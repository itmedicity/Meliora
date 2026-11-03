import React, { memo } from 'react';
import { useNursingStationMaster } from '../../CommonData/UseQuery'

const ChooseNursingStation = ({ value, setValue, width, disabled = false }) => {

    const {
        data: NURSING_STATIONS = []
    } = useNursingStationMaster();

    return (
        <select
            value={value}
            onChange={(e) => setValue(String(e.target.value))}
            style={{
                minWidth: width ? width : 150,
                height: 30,
                fontSize: '11px',
                borderRadius: 4,
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
            disabled={disabled}
        >
            <option value={0}>
                Select Nursing Station
            </option>

            {NURSING_STATIONS
                .filter((station) => station.fb_ns_status === 1)
                .map((station) => (
                    <option
                        key={station.fb_nurse_stn_slno}
                        value={station.fb_ns_code}
                    >
                        {station.fb_ns_name}
                    </option>
                ))}
        </select>
    );
};

export default memo(ChooseNursingStation);