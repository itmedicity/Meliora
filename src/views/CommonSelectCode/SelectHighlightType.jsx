import React, { memo } from 'react'
import { Box, FormControl, Select, Option } from '@mui/joy'
import { useAllHighlightMaster } from '../Diet/CommonData/UseQuery'



const SelectHighlightType = ({ value, setValue }) => {

    const {
        data: allHighlights = []
    } = useAllHighlightMaster()

    return (

        <Box>

            <FormControl size="sm" fullWidth>

                <Select
                    value={value}
                    onChange={(e, newValue) => {

                        setValue(newValue)

                    }}
                    sx={{
                        p: 0.5,
                        m: 0,
                        lineHeight: 1.2,
                        boxShadow: "none",
                    }}
                >

                    <Option value={0}>
                        Select Highlight
                    </Option>

                    {allHighlights?.map((val, index) => (

                        <Option
                            key={`${val.highlight_type_id}-${index}`}
                            value={val.highlight_type_id}
                        >
                            {val.highlight_name?.toUpperCase()}
                        </Option>

                    ))}

                </Select>

            </FormControl>

        </Box>
    )
}

export default memo(SelectHighlightType)