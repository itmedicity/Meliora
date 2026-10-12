import React, { memo } from 'react'
import { UseIemFullDetail } from '../Diet/CommonData/UseQuery'

const ChooseDietItemName = ({ value, setValue, setName, setItemType }) => {

    const { data: FoodDetail = [] } = UseIemFullDetail();

    const handleChange = (e) => {
        const selectedValue = Number(e.target.value)
        const selectedItem = FoodDetail.find(
            item => item.item_id === selectedValue
        )

        setValue(selectedValue)
        setName(selectedItem?.item_name || '')
        setItemType(selectedItem?.group_name || '')
    }

    return (
        <select
            value={value ? String(value) : ''}
            onChange={handleChange}
            style={{
                minWidth: 150,
                height: 30,
                fontSize: '11px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                backgroundColor: 'transparent',
                outline: 'none'
            }}
        >
            <option value="" disabled>
                Select Item
            </option>

            {FoodDetail.map((item, index) => (
                <option
                    key={`${item?.item_id}-${index}`} // unique key
                    value={item?.item_id}
                >
                    {item?.item_name}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseDietItemName)
