import React, { useCallback, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { useHistory } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import CusAgGridMast from '../Components/CusAgGridMast'
import Test from '../CommonSelectCode/Test'

const DietProcessList = () => {
    //*** Initializing */
    const history = useHistory();
    // const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "Diet Slno", field: "" },
        { headerName: "Patient Id", field: "" },
        { headerName: "Patient Name", field: "" },
        { headerName: "Doctor", field: "" },
        { headerName: "Age/Gender", field: "" },
        { headerName: "Room/Ward", field: "" },

    ])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        <CardCloseOnly
            title="Diet Proccess List"
            close={backtoSetting}
        >
            <Box sx={{ width: "100%", pl: 2, pt: 1, pr: 2, pb: 2 }}>
                <Paper square elevation={3} sx={{
                    pl: 2, pt: 1, pr: 2, pb: 2,

                }}>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 1, pr: 1, pb: 1,
                        // background: "blue",
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Paper variant="outlined" square sx={{
                            width: "100%",
                            px: 1, py: 1,
                            // display: "flex",
                            // flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                            // justifyContent: "space-around",

                        }}  >
                            <Box sx={{
                                width: "20%",

                            }}  >
                                <Test />
                            </Box>
                        </Paper>
                    </Box>
                    <CusAgGridMast
                        columnDefs={column}
                    // tableData={tabledata}
                    />
                </Paper>
            </Box>
        </CardCloseOnly>
    )
}

export default DietProcessList