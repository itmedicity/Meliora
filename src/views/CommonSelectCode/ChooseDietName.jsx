import React, { memo} from 'react'

import { useAllPatientDietMaster } from '../Diet/CommonData/UseQuery'

const ChooseDietName = ({ value, setValue, width, disabled = false }) => {

    const {
        data: allDietMaster = []
    } = useAllPatientDietMaster()


    return (
        <select
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{
                minWidth: width ? width : 150,
                height: 30,
                // padding: '6px',
                fontSize: '11px',
                borderRadius: 4,
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
            disabled={disabled}
        >
            <option value={0}>
                Select Diet
            </option>

            {allDietMaster.map((val) => (
                <option key={val.diet_id} value={val.diet_id}>
                    {val.diet_name}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseDietName)
