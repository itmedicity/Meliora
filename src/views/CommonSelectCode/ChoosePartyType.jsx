import React, { memo } from 'react'
import { useAllOrderPartyType } from '../Diet/CommonData/UseQuery';


const ChoosePartyType = ({ value, setValue, width }) => {

    const { data: allPartyType = [] } = useAllOrderPartyType();

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
        >
            <option value={0} disabled>
                Select Party Type
            </option>

            {
                allPartyType?.map((party) => (
                    <option
                        key={party?.party_type_id}
                        value={party?.party_type_id}
                    >
                        {party?.party_name}
                    </option>
                ))
            }
        </select>
    )
}

export default memo(ChoosePartyType)