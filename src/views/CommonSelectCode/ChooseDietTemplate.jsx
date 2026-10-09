import React, { memo } from 'react'
import { useAllDietTemplate } from '../Diet/CommonData/UseQuery'

const ChooseDietTemplate = ({ value, setValue, width, disabled = false }) => {

    const {
        data: allTemplate = [],
        isLoading,
        isError
    } = useAllDietTemplate()

    return (
        <select
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            style={{
                minWidth: width ? width : 150,
                height: 30,
                fontSize: '11px',
                borderRadius: 4,
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
            disabled={disabled || isLoading}
        >
            <option value={0}>
                {isLoading ? "Loading..." : "Select Diet"}
            </option>

            {isError && (
                <option disabled>
                    Error loading templates
                </option>
            )}

            {!isLoading && !isError && allTemplate.length === 0 && (
                <option disabled>
                    No Templates Found
                </option>
            )}

            {!isLoading && !isError &&
                allTemplate.map((val) => (
                    <option key={val.template_id} value={val.template_id}>
                        {val.template_name?.toUpperCase()}
                    </option>
                ))
            }
        </select>
    )
}

export default memo(ChooseDietTemplate)