import { Box } from '@mui/joy'
import React, { memo } from 'react'
import TextComponent from 'src/views/Components/TextComponent'

const LeaseAdd = () => {

    return (
        <Box>
            <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: 1 }}>
                <TextComponent
                    text={"LEASE DETAILS"}
                    sx={{
                        flex: 1,
                        fontWeight: 500,
                        color: 'black',
                        fontSize: 15,
                    }}
                />


            </Box>
            <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: .5, }}>
                <TextComponent
                    text={"LEASE DETAIL LIST"}
                    sx={{
                        flex: 1,
                        fontWeight: 500,
                        color: 'black',
                        fontSize: 15,
                    }}
                />
                <Box sx={{ flex: 1, pr: 1, pt: 1 }}>
                    <Box sx={{ flex: 1, display: 'flex', borderTop: 1, borderBottom: 1, borderColor: 'lightgrey', pl: 1, py: .5, gap: .5 }}>
                        <Box sx={{ flex: .1, }}>
                            #
                        </Box>
                        <Box sx={{ flex: .2, }}>
                            Action
                        </Box>
                        <Box sx={{ flex: .3, }}>
                            Attachments
                        </Box>
                        <Box sx={{ flex: 1, }}>
                            Supplier
                        </Box>
                        <Box sx={{ flex: .4, }}>
                            From Date
                        </Box>
                        <Box sx={{ flex: .4, }}>
                            To Date
                        </Box>
                        <Box sx={{ flex: .4, }}>
                            Amount
                        </Box>
                        <Box sx={{ flex: .3, }}>
                            Status
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(LeaseAdd)