import React, { memo } from 'react'
import { UseFoodDetail } from '../Diet/CommonData/UseQuery'

const ChooseDietItemName = ({ value, setValue, setName, setItemType }) => {
    const { data: FoodDetail = [] } = UseFoodDetail()

    const handleChange = (e) => {
        const selectedValue = Number(e.target.value)
        const selectedItem = FoodDetail.find(
            item => item.item_slno === selectedValue
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

            {FoodDetail.map(item => (
                <option
                    key={item?.item_slno}
                    value={item?.item_slno}
                >
                    {item?.item_name}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseDietItemName)
