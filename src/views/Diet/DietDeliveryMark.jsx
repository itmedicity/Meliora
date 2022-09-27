import React, { useCallback, useState, useMemo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { Box, Paper } from '@mui/material'
import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { useEffect } from 'react';
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useHistory } from 'react-router-dom'
import CustomAGSelect from '../Components/CustomAGSelect';
import { warningNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns'
import RmmasterMeliSelect from '../CommonSelectCode/RmmasterMeliSelect';
const DietDeliveryMark = () => {
    const [room, setRoom] = useState(0)
    const [detail, setDetail] = useState(0)
    const [count, setCount] = useState(0)
    const history = useHistory();
    const [tabledata, setTabledata] = useState([])
    const [dispaly, setDispaly] = useState({
        name: '',
        diet_name: '',
        process_no: '',
        pt_no: ''
    })
    const [final, setFinal] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "Diet Type Slno", field: "type_slno" },
        { headerName: "Diet Type", field: "type_desc" },
        {
            headerName: 'Select ', checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true, resizable: true,
        }
    ])

    useEffect(() => {
        if (room !== 0) {
            setDetail(1)
            const getDietType = async () => {
                const result = await axioslogin.get(`/delivery/getType/${room}`,)
                const { data, success, message } = result.data;
                if (success === 1) {
                    const { pt_no, ptc_ptname, diet_name, proc_slno } = data[0]
                    setTabledata(data);
                    const frmdata = {
                        name: ptc_ptname,
                        diet_name: diet_name,
                        pt_no: pt_no,
                        process_no: proc_slno
                    }
                    setDispaly(frmdata)
                }
                else {
                    warningNotify(message)
                    setTabledata();
                }
            }
            getDietType()
        }
    }, [room, count])

    const onSelectionChanged = (event) => {
        setFinal(event.api.getSelectedRows())
    }
    const patchdata = useMemo(() => {
        const procd = final && final.map((val) => {
            return (val.prod_slno);
        })
        return {
            supply_stat: 1,
            supply_time: format(new Date(), "yyyy-MM-dd hh:mm:ss"),
            prod_slno: procd
        }
    }, [final])
    const submitDelivery = useCallback((e) => {
        e.preventDefault();
        const deliveryUpdate = async (patchdata) => {
            const result = await axioslogin.patch('/delivery/status', patchdata);
            const { success, message } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
            } else {
                infoNotify(message)
            }
        }
        deliveryUpdate(patchdata)
    }, [patchdata, count])

    //Refresh function
    const refreshWindow = useCallback(() => {
        setRoom(0);
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        <CardMaster
            title='Diet Delivery Mark'
            submit={submitDelivery}
            refresh={refreshWindow}
            close={backtoSetting}
        >
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper square elevation={3} sx={{ p: 1 }} >
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                        justifyContent: "center",
                        flex: 1,

                    }}> <Box sx={{ pt: 0.3, pr: 1 }}>
                            <CssVarsProvider>
                                <Typography>
                                    Room No
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box >
                            <RmmasterMeliSelect value={room} setValue={setRoom} />
                        </Box>
                    </Box>
                </Paper>
                {
                    detail !== 0 ?
                        <Paper square elevation={3} sx={{ p: 1, mt: 0.5, }} >
                            <Paper square elevation={1} sx={{ p: 1, mb: 2 }} >
                                <Box sx={{
                                    width: "100%",
                                    pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                                    display: "flex",
                                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                    justifyContent: "center",
                                    flex: 1
                                }}>
                                    <Box
                                        sx={{ width: { sm: "20%", md: "40%", xl: "8%" }, pt: 0.5 }}>
                                        <CssVarsProvider>
                                            <Typography >
                                                Patient Name:
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box
                                        sx={{ width: { sm: "20%", md: "40%", xl: "8%" }, pt: 0.5 }}>
                                        <CssVarsProvider>
                                            <Typography>
                                                {dispaly.name}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>

                                    <Box
                                        sx={{ width: { sm: "20%", md: "40%", xl: "4%" }, pt: 0.5 }}>
                                        <CssVarsProvider>
                                            <Typography>
                                                Diet:
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box
                                        sx={{ width: { sm: "20%", md: "40%", xl: "8%" }, pt: 0.5 }}>
                                        <CssVarsProvider>
                                            <Typography>
                                                {dispaly.diet_name}
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                </Box>
                            </Paper>
                            <CustomAGSelect
                                columnDefs={column}
                                tableData={tabledata}
                                onSelectionChanged={onSelectionChanged}
                            />
                        </Paper>
                        : null
                }
            </Box>
        </CardMaster >
    )
}

export default DietDeliveryMark