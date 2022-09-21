import React, { useCallback } from 'react'
import { Box, Paper } from '@mui/material'
import { CssVarsProvider, Typography } from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import { useState } from 'react';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import DietprocessTable from '../Diet/DietprocessTable';
const DietProcessDashCmp = () => {
    const [process, setProcess] = useState(0)
    const [newOrder, setNewOrder] = useState(0)
    const [proTable, setProTable] = useState(0)
    const [newordrTable, setNewOrdrTable] = useState(0)
    const [depand, setDepand] = useState(0)
    const [count, setCount] = useState(0);
    useEffect(() => {
        //Get dashboard process list count
        const getprocesscount = async () => {
            const result = await axioslogin.get('/common/getproceedcount')
            const { succes, dataa } = result.data
            if (succes === 1) {
                const { processcount } = dataa[0]
                setProcess(processcount)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
            //Get dashboard new order list count
            const result1 = await axioslogin.get('/common/getNewOrderCount')
            const { success, data } = result1.data
            if (success === 1) {
                const { neworder } = data[0]
                setNewOrder(neworder)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
        }
        getprocesscount()
    }, [count])

    const getProcessList = useCallback(() => {
        setProTable(1)
        setNewOrdrTable(0)
        setDepand(0)
    }, [])
    const getNewOrder = useCallback(() => {
        setNewOrdrTable(1)
        setProTable(0)
        setDepand(1)
    }, [])


    return (
        <Box sx={{
            gap: 2,
            flexWrap: 'wrap',
            width: "100%",
        }}>
            <Paper elevation={3} sx={{
                width: "100%",
                p: 0.5, pb: 2,
                display: "flex",
                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                justifyContent: 'space-evenly',
            }} >
                <Box sx={{
                    gap: 2,
                    flexWrap: 'wrap',
                    width: 300
                }}>
                    <Paper elevation={3} sx={{
                        width: "100%",
                        p: 0.5,
                        display: "flex",
                        direction: "row",
                    }} >
                        <Box sx={{
                            display: "flex",
                        }} >
                            <CssVarsProvider>
                                <IconButton
                                    size='lg'
                                    onClick={getProcessList}
                                >
                                    {process}
                                </IconButton>
                            </CssVarsProvider>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                px: 0.8
                            }}>
                                <CssVarsProvider>
                                    <Typography
                                        level="body1"
                                        sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                        color="success"
                                    >
                                        Proccess List
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Box sx={{
                    gap: 2,
                    flexWrap: 'wrap',
                    width: 300
                }}>
                    <Paper elevation={3} sx={{
                        width: "100%",
                        p: 0.5,
                        display: "flex",
                        direction: "row",
                    }} >
                        <Box sx={{
                            display: "flex",
                        }} >
                            <CssVarsProvider>
                                <IconButton
                                    size='lg'
                                    onClick={getNewOrder}
                                >
                                    {newOrder}
                                </IconButton>
                            </CssVarsProvider>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-around",
                                px: 0.8
                            }}>
                                <CssVarsProvider>
                                    <Typography
                                        level="body1"
                                        sx={{ alignItems: 'flex-start', wordBreak: "break-all" }}
                                        color="success"
                                    >
                                        New Order
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Paper>
            <Paper elevation={3} sx={{
                width: "100%",
                p: 0.5, pt: 2,
                display: "flex",
                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                justifyContent: 'space-evenly',
            }} >
                {proTable === 1 ? <DietprocessTable depand={depand} setDepand={setDepand} setCount={setCount} count={count} /> : null}
                {newordrTable === 1 ? <DietprocessTable depand={depand} setDepand={setDepand} setCount={setCount} count={count} /> : null}
            </Paper>
        </Box>
    )
}

export default DietProcessDashCmp