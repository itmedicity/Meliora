import { Box } from '@mui/joy'
import moment from 'moment'
import React from 'react'
import CustomInputDateCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'

const RenderField = ({ heading, name = '', handleChange, datetype, type }) => {
    return (
        <Box sx={{ pt: 0.03 }}>
            <CustomPaperTitle heading={heading} />
            <CustomInputDateCmp
                className={{
                    width: '100%',
                    height: 35,
                    bgcolor: 'white',
                    mt: 0.5
                }}
                size="sm"
                autoComplete="off"
                type={type}
                name={name}
                placeholder="Enter Here"
                slotProps={datetype ? {
                    input: { min: moment(new Date()).format('YYYY-MM-DD') }
                } : {}}
                handleChange={handleChange}
            />
        </Box>
    )
}

export default RenderField