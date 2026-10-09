

import React, { memo } from 'react'

import { useAllOrderPartyType } from '../Diet/CommonData/UseQuery'

const ChooseOrderType = ({ value, setValue, width, disabled = false }) => {

    const {
        data: allPartyType = [],
    } = useAllOrderPartyType();


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
                Select Order Type
            </option>

            {allPartyType?.map((val) => (
                <option key={val.party_type_id} value={val.party_type_id}>
                    {val.party_name}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseOrderType)
