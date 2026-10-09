import React, { memo } from 'react'
import { useAllUnitMaster } from '../Diet/CommonData/UseQuery'

const ChooseDietMeasurementSelect = ({ value, setValue }) => {

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const {
        data: allUnits = [],
        isLoading,
        isError
    } = useAllUnitMaster()

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            disabled={isLoading}
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
            <option value="">
                {isLoading ? "Loading Units..." : "Select Unit"}
            </option>

            {isError && (
                <option disabled>
                    Error loading units
                </option>
            )}

            {!isLoading && !isError && allUnits.length === 0 && (
                <option disabled>
                    No Units Found
                </option>
            )}

            {!isLoading && !isError &&
                allUnits.map((val) => (
                    <option key={val.unit_id} value={val.unit_id}>
                        {val.unit_name}
                    </option>
                ))
            }
        </select>
    )
}

export default memo(ChooseDietMeasurementSelect)