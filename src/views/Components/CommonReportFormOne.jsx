import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CommonReportFormOne = () => {
    return (
        <Box>
            <Paper square
                sx={{
                    height: {
                        xs: 550,
                        sm: 550,
                        md: 550,
                        lg: 550,
                        xl: 850
                    },
                    p: 0.5
                }} >
                <Paper square sx={{ backgroundColor: "lightgreen" }}  >sdfsdfsdf</Paper>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row"
                }} >
                    <Paper square sx={{
                        backgroundColor: "lightBlue",
                        width: '20%',
                        height: {
                            xs: 500,
                            sm: 500,
                            md: 500,
                            lg: 500,
                            xl: 792
                        },
                    }}  >
                        <Paper square sx={{ backgroundColor: "lightgreen" }}  >sdfsdfsdf</Paper>
                    </Paper>
                    <Paper square sx={{
                        backgroundColor: "lightGrey",
                        width: '80%',
                        height: {
                            xs: 500,
                            sm: 500,
                            md: 500,
                            lg: 500,
                            xl: 792
                        },
                    }}  >
                        <Paper square sx={{ backgroundColor: "lightgreen" }}  >sdfsdfsdf</Paper>
                    </Paper>
                </Box>
                <Paper square sx={{ backgroundColor: "lightpink" }}  >sdfsdfsdf</Paper>
            </Paper>
        </Box>
    )
}

export default CommonReportFormOne