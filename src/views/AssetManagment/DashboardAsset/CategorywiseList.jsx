import { Box } from '@mui/material'
import React, { memo } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import PhotoIcon from '@mui/icons-material/Photo';

const CategorywiseList = ({ AllCategory, allcount }) => {

    return (
        <Box sx={{ flex: 1, pt: 1 }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(auto-fit, minmax(260px, 1fr))',
                    sm: 'repeat(auto-fit, minmax(260px, 1fr))',
                    md: 'repeat(auto-fit, minmax(260px, 1fr))',
                    lg: 'repeat(auto-fit, minmax(260px, 1fr))',
                },
                gap: 1,
            }}>
                {AllCategory?.map((val, index) => {
                    return (
                        <Box key={index} sx={{
                            width: {
                                xs: 80,
                                sm: 130,
                                md: 180,
                                lg: 230
                            },
                            border: 1, borderRadius: 5, p: 1, borderColor: '#4F85B5', gap: 1,
                        }}>
                            <Box sx={{
                                border: 1, borderColor: 'lightgray',
                                height: {
                                    xs: 50,
                                    sm: 80,
                                    md: 100,
                                    lg: 150
                                },
                                borderRadius: 4, display: 'flex', justifyContent: 'center',
                            }}>
                                <PhotoIcon sx={{ color: 'lightgrey', height: '80%', width: '100%' }} />
                            </Box>
                            <Box>
                                <Box sx={{ display: 'flex', pt: .5 }}>
                                    <TextComponent
                                        text={val.category_name}
                                        sx={{ color: '#4F85B5', fontWeight: 600, fontSize: 14, flex: 1, }}
                                    />
                                    {allcount[val.category_slno]?.map((count, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex', minWidth: 40, height: 35, textAlign: 'center', justifyContent: 'center',
                                                border: 1, borderColor: '#4F85B5', borderRadius: 4, pt: .5
                                            }}>
                                            {count.asset_item_service_0_count !== undefined ? count.asset_item_service_0_count : count.spare_service_0_count}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box >
    )
}

export default memo(CategorywiseList)