import React, { memo } from 'react'
import {
    Box,
    Typography
} from '@mui/joy'

import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'

import { useAllPatientDietMaster } from '../../CommonData/UseQuery'

const SelectPatientDiet = ({ value, setValue }) => {

    const {
        data: allDietMaster = []
    } = useAllPatientDietMaster()

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1
            }}
        >

            {allDietMaster?.map((val) => {

                const selected = value === val?.diet_id

                return (
                    <Box
                        key={val?.diet_id}
                        onClick={() => setValue(val?.diet_id)}
                        sx={{
                            px: 1.2,
                            py: 0.8,
                            borderRadius: 12,

                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,

                            cursor: 'pointer',
                            transition: '0.2s',

                            minWidth: 'fit-content',
                            maxWidth: 180,

                            border: selected
                                ? '1.5px solid #7b4dff'
                                : '1px solid #e4e4e4',

                            bgcolor: selected
                                ? '#f4efff'
                                : '#fff',

                            boxShadow: selected
                                ? '0 2px 8px rgba(123,77,255,0.15)'
                                : 'xs',

                            '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: 'sm'
                            }
                        }}
                    >

                        {/* ICON */}
                        <Box
                            sx={{
                                minWidth: 28,
                                width: 28,
                                height: 28,
                                borderRadius: '50%',

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                bgcolor: selected
                                    ? '#7b4dff'
                                    : '#f3f3f3',

                                color: selected
                                    ? '#fff'
                                    : '#666'
                            }}
                        >
                            {
                                selected
                                    ? <CheckRoundedIcon sx={{ fontSize: 16 }} />
                                    : <RestaurantMenuRoundedIcon sx={{ fontSize: 15 }} />
                            }
                        </Box>

                        {/* TEXT */}
                        <Typography
                            sx={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: selected
                                    ? '#5b35cc'
                                    : '#333',

                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            {val?.diet_name}
                        </Typography>

                    </Box>
                )
            })}
        </Box>
    )
}

export default memo(SelectPatientDiet)