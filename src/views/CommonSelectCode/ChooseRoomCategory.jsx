import React, { memo } from 'react'
import { UseRoomCategoryDetail } from '../Diet/CommonData/UseQuery';

const ChooseRoomCategory = ({ value, setValue, width }) => {
    const { data: RoomCategoryDetil = [] } = UseRoomCategoryDetail();

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
        >
            <option value={0} disabled>
                Select Room Category
            </option>

            {RoomCategoryDetil?.map((val, index) => (
                <option
                    key={index} value={val?.diet_rm_category_slno}>
                    {val?.diet_rm_name}
                </option>
            ))}
        </select>
    )
}

export default memo(ChooseRoomCategory)
