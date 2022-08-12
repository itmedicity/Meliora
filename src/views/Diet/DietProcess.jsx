import React, { useCallback, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import { useHistory } from 'react-router-dom'
import { Box, Paper } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import CusAgGridMast from '../Components/CusAgGridMast'

const DietProcess = () => {
    //*** Initializing */
    const history = useHistory();
    const [processList, setProcessList] = useState(false)
    const [newOrder, setNewOrder] = useState(false)
    const [datadepend, setDataDepend] = useState(0)
    //column title setting
    const [column] = useState([
        { headerName: "Diet Slno", field: "" },
        { headerName: "Patient Id", field: "" },
        { headerName: "Patient Name", field: "" },
        { headerName: "Doctor", field: "" },
        { headerName: "Age/Gender", field: "" },
        { headerName: "Room/Ward", field: "" },
    ])

    //*** checkbox state changing function */
    const getProcesList = useCallback((e) => {
        if (e.target.checked === true) {
            setDataDepend(1)
            setProcessList(true)
            setNewOrder(false)
        } else {
            setDataDepend(0)
            setProcessList(false)
            setNewOrder(false)
        }
    }, [])
    const getNewOrder = useCallback((e) => {
        if (e.target.checked === true) {
            setDataDepend(2)
            setNewOrder(true)
            setProcessList(false)
        } else {
            setDataDepend(0)
            setProcessList(false)
            setNewOrder(false)
        }
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])


    return (
        <CardCloseOnly
            title="Diet Proccess"
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
                            px: 2, py: 1,
                            display: "flex",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                            justifyContent: "space-around",

                        }}  >
                            < CusCheckBox
                                variant="outlined"
                                color="primary"
                                size="md"
                                name="processList"
                                label="Proccessed List"
                                value={processList}
                                checked={processList}
                                onCheked={getProcesList}
                            />
                            <CusCheckBox
                                variant="outlined"
                                color="primary"
                                size="md"
                                name="newOrder"
                                label="New Order"
                                value={newOrder}
                                checked={newOrder}
                                onCheked={getNewOrder}
                            />
                        </Paper>
                    </Box>
                    {datadepend !== 0 ? <CusAgGridMast
                        columnDefs={column}
                    // tableData={tabledata}
                    /> : null}
                </Paper>
            </Box>
        </CardCloseOnly>
    )
}

export default DietProcess