import { Input } from '@mui/joy'
import React, { memo } from 'react'

const CountSelectCom = ({ value, setValue }) => {


    return (
        <Input
            type="number"
            size="sm"
            value={value === 0 ? '' : value}
            placeholder="Select Number Of Level"
            onChange={(e) => setValue(Number(e.target.value))}
            slotProps={{
                input: {
                    min: 1,
                    max: 10,
                },
            }}
        />

    )
}

export default memo(CountSelectCom)
