import React, { useCallback, useState, memo, useEffect, useMemo } from 'react'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useHistory } from 'react-router-dom';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import { Paper, Box } from '@mui/material';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CusIconButton from '../../Components/CusIconButton';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { Typography } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { format } from 'date-fns';
import { getCRMPurchDataCollPending } from 'src/redux/actions/CrmPurchaseDatacollPend.action';
import { getpurchDataCollPending, getpurchaseAckPending } from 'src/redux/ReduxhelperFun/reduxhelperfun';
import { taskColor } from 'src/color/Color';
import { getCRMPurchaseAckPending } from 'src/redux/actions/CrmPurchaseACKList.action';


const PurchaseReport = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [TableDataDis, setTableDataDis] = useState(0);
    const [dateset, SetDate] = useState({
        start_date: '',
        end_date: ''
    })
    const { start_date, end_date } = dateset;
    const getDate = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        SetDate({ ...dateset, [e.target.name]: value })

    }, [dateset])

    const [acked, setAcked] = useState([])
    const [processing, setProcessing] = useState([])
    const [QutatnNego, setQutatnNego] = useState([])
    const [QutatnFinal, setQutatnFinal] = useState([])
    const [PoProcesing, setPOProcessing] = useState([])
    const [PoToSuppPending, setPoToSuppPending] = useState([])

    useEffect(() => {
        dispatch(getCRMPurchaseAckPending())
        dispatch(getCRMPurchDataCollPending())
    }, [dispatch])


    //data list after ed,md Approval
    const purchaseAckPending = useSelector((state) => getpurchaseAckPending(state))
    const CRMPurchaseAckPendingListAry = useMemo(() => purchaseAckPending, [purchaseAckPending])

    //Data Collection pending array
    const purchdataCollPendng = useSelector((state) => getpurchDataCollPending(state))
    const datacollPendng = useMemo(() => purchdataCollPendng, [purchdataCollPendng])

    const clicksearch = useCallback((e) => {
        e.preventDefault();
        setOpen(true)
        const postdata = {
            start_date: start_date,
            end_date: end_date,
        }

        const getdataUserAcknldged = async (postdata) => {
            const result = await axioslogin.post('/CrfReports/getPurchaseCRFData', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                const Acknowlged = data.filter((val) => {
                    return val.ack_status === 1
                })
                setAcked(Acknowlged)

                const Proccessing = data.filter((val) => {
                    return val.ack_status === 1 && val.quatation_calling_status === 0 &&
                        val.po_prepartion === 0 && val.po_complete === 0
                })
                setProcessing(Proccessing)

                const QuatnNegotion = data.filter((val) => {
                    return val.quatation_calling_status === 1 && val.quatation_negotiation === 0
                })
                setQutatnNego(QuatnNegotion)

                const QutationFinaling = data.filter((val) => {
                    return val.quatation_calling_status === 1 && val.quatation_negotiation === 1 && val.quatation_fixing === 0
                })
                setQutatnFinal(QutationFinaling)

                const POProcessing = data.filter((val) => {
                    return val.ack_status === 1 &&
                        ((val.quatation_calling_status === 1 && val.quatation_fixing === 1 && val.po_prepartion === 0) ||
                            (val.po_prepartion === 1 && val.po_complete === 0))
                })
                setPOProcessing(POProcessing)

                const PoToSupplierPending = data.filter((val) => {
                    return val.po_complete === 1 && val.po_to_supplier === 0
                })
                setPoToSuppPending(PoToSupplierPending)
                setOpen(false)
                setTableDataDis(1)
            } else {
                warningNotify("No data under selected condition")
                setOpen(false)
            }
        }

        if (start_date !== '' && end_date !== '') {
            getdataUserAcknldged(postdata)
            dispatch(getCRMPurchaseAckPending())
            dispatch(getCRMPurchDataCollPending())

        } else {
            warningNotify("Please Select start date and end date before search")
            setOpen(false)
        }
    }, [start_date, end_date, dispatch])

    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])

    return (
        <CardCloseOnly
            title='CRF Report - Purchase'
            close={backToSetting}
        >
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper
                    square
                    sx={{
                        height: { xs: 750, sm: 750, md: 750, lg: 750, xl: 750 },
                        p: 0.5,

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Paper square elevation={2} sx={{ p: 2 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <Box sx={{
                                    width: '10%',
                                    ml: 0.5, mt: 0.5
                                }}>
                                    <Typography>Start Date</Typography>
                                </Box>
                                <Box sx={{
                                    width: '20%',
                                    // height: 15,
                                    mb: 1, pr: 3
                                }}>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="start_date"
                                        value={start_date}
                                        onchange={getDate}
                                        slotProps={{
                                            input: {
                                                min: format(new Date("2023-12-27"), "yyyy-MM-dd")
                                            },
                                        }}
                                    />
                                </Box>
                                <Box sx={{
                                    width: '10%',
                                    ml: 0.5, mt: 0.5
                                }}>
                                    <Typography>End Date</Typography>
                                </Box>
                                <Box sx={{
                                    width: '20%',
                                    // height: 15,
                                    mb: 1, pr: 3
                                }}>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="end_date"
                                        value={end_date}
                                        onchange={getDate}
                                    />
                                </Box>


                                <Box sx={{
                                    width: '20%',

                                }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch} >
                                        <SearchOutlinedIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Paper>

                        {TableDataDis === 1 ?
                            <Paper variant='none' sx={{
                                mt: 1, width: "80%", ml: 30
                            }} >
                                <Box sx={{
                                    display: 'flex', flex: 1, flexDirection: 'row',
                                    flexWrap: 'wrap', padding: 1, overflow: 'hidden',
                                }} >
                                    <Paper sx={{ width: '2.2%', }}
                                        variant='none'></Paper>
                                    <Paper
                                        sx={{
                                            width: '20%', pl: 0.5, height: 160,
                                            backgroundColor: taskColor.bgIndigo,
                                            border: 1, padding: 2,
                                            borderColor: taskColor.indigoDark,
                                            cursor: 'grab',
                                            ":hover": {
                                                borderColor: '#7D18EA'
                                            }
                                        }}
                                        variant='outlined'
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '30%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: "center",
                                                fontWeight: 600,
                                                fontSize: 16,
                                                fontSmooth: 'auto',
                                                color: taskColor.FontindigoDark
                                            }}
                                        > CRF Received In Purchase</Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '50%',
                                                fontSize: 48,
                                                fontWeight: 500,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: taskColor.FontindigoDark,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    cursor: 'pointer',
                                                    ":hover": {
                                                        transition: 300,
                                                        textShadow: '#939498 1px 0 5px'
                                                    }
                                                }}

                                            >{acked.length}</Typography>
                                        </Box>

                                    </Paper>
                                    <Paper sx={{ width: '2.2%', }}
                                        variant='none'></Paper>
                                    <Paper
                                        sx={{
                                            width: '20%', pl: 0.5, height: 160,
                                            backgroundColor: taskColor.bgIndigo,
                                            border: 1, padding: 2,
                                            borderColor: taskColor.indigoDark,
                                            cursor: 'grab',
                                            ":hover": {
                                                borderColor: '#7D18EA'
                                            }
                                        }}
                                        variant='outlined'
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '30%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: "center",
                                                fontWeight: 600,
                                                fontSize: 16,
                                                fontSmooth: 'auto',
                                                color: taskColor.FontindigoDark
                                            }}
                                        >Acknowledgement Pending</Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '50%',
                                                fontSize: 48,
                                                fontWeight: 500,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: taskColor.FontindigoDark,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    cursor: 'pointer',
                                                    ":hover": {
                                                        transition: 300,
                                                        textShadow: '#939498 1px 0 5px'
                                                    }
                                                }}

                                            >{CRMPurchaseAckPendingListAry.length}</Typography>
                                        </Box>

                                    </Paper>
                                    <Paper sx={{ width: '2.2%', }}
                                        variant='none'></Paper>
                                    <Paper
                                        sx={{
                                            width: '20%', pl: 0.5, height: 160,
                                            backgroundColor: taskColor.bgIndigo,
                                            border: 1, padding: 2,
                                            borderColor: taskColor.indigoDark,
                                            cursor: 'grab',
                                            ":hover": {
                                                borderColor: '#7D18EA'
                                            }
                                        }}
                                        variant='outlined'
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '30%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: "center",
                                                fontWeight: 600,
                                                fontSize: 16,
                                                fontSmooth: 'auto',
                                                color: taskColor.FontindigoDark
                                            }}
                                        >Processing CRF</Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '50%',
                                                fontSize: 48,
                                                fontWeight: 500,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: taskColor.FontindigoDark,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    cursor: 'pointer',
                                                    ":hover": {
                                                        transition: 300,
                                                        textShadow: '#939498 1px 0 5px'
                                                    }
                                                }}

                                            >{processing.length}</Typography>
                                        </Box>

                                    </Paper>
                                    <Paper sx={{ width: '2.2%', }}
                                        variant='none'></Paper>
                                    <Paper
                                        sx={{
                                            width: '20%', pl: 0.5, height: 160,
                                            backgroundColor: taskColor.bgIndigo,
                                            border: 1, padding: 2,
                                            borderColor: taskColor.indigoDark,
                                            cursor: 'grab',
                                            ":hover": {
                                                borderColor: '#7D18EA'
                                            }
                                        }}
                                        variant='outlined'
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '30%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: "center",
                                                fontWeight: 600,
                                                fontSize: 16,
                                                fontSmooth: 'auto',
                                                color: taskColor.FontindigoDark
                                            }}
                                        >Quotation Negotiation Pending</Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                height: '50%',
                                                fontSize: 48,
                                                fontWeight: 500,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                color: taskColor.FontindigoDark,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    cursor: 'pointer',
                                                    ":hover": {
                                                        transition: 300,
                                                        textShadow: '#939498 1px 0 5px'
                                                    }
                                                }}

                                            >{QutatnNego.length}</Typography>
                                        </Box>

                                    </Paper>


                                    <Box sx={{ pt: 2, display: 'flex', flexDirection: "row", width: "100%" }}>


                                        <Paper sx={{ width: '2.2%', }}
                                            variant='none'></Paper>
                                        <Paper
                                            sx={{
                                                width: '20%', pl: 0.5, height: 160, pt: 5,
                                                backgroundColor: taskColor.bgIndigo,
                                                border: 1, padding: 2,
                                                borderColor: taskColor.indigoDark,
                                                cursor: 'grab',
                                                ":hover": {
                                                    borderColor: '#7D18EA'
                                                }
                                            }}
                                            variant='outlined'
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '30%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textAlign: "center",
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    fontSmooth: 'auto',
                                                    color: taskColor.FontindigoDark
                                                }}
                                            >Quotation Finalizing Pending</Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '50%',
                                                    fontSize: 48,
                                                    fontWeight: 500,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: taskColor.FontindigoDark,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ":hover": {
                                                            transition: 300,
                                                            textShadow: '#939498 1px 0 5px'
                                                        }
                                                    }}

                                                >{QutatnFinal.length}</Typography>
                                            </Box>

                                        </Paper>
                                        <Paper sx={{ width: '2.2%', }}
                                            variant='none'></Paper>
                                        <Paper
                                            sx={{
                                                width: '20%', pl: 0.5, height: 160,
                                                backgroundColor: taskColor.bgIndigo,
                                                border: 1, padding: 2,
                                                borderColor: taskColor.indigoDark,
                                                cursor: 'grab',
                                                ":hover": {
                                                    borderColor: '#7D18EA'
                                                }
                                            }}
                                            variant='outlined'
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '30%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textAlign: "center",
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    fontSmooth: 'auto',
                                                    color: taskColor.FontindigoDark
                                                }}
                                            >PO Processing </Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '50%',
                                                    fontSize: 48,
                                                    fontWeight: 500,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: taskColor.FontindigoDark,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ":hover": {
                                                            transition: 300,
                                                            textShadow: '#939498 1px 0 5px'
                                                        }
                                                    }}

                                                >{PoProcesing.length}</Typography>
                                            </Box>

                                        </Paper>
                                        <Paper sx={{ width: '2.2%', }}
                                            variant='none'></Paper>
                                        <Paper
                                            sx={{
                                                width: '20%', pl: 0.5, height: 160,
                                                backgroundColor: taskColor.bgIndigo,
                                                border: 1, padding: 2,
                                                borderColor: taskColor.indigoDark,
                                                cursor: 'grab',
                                                ":hover": {
                                                    borderColor: '#7D18EA'
                                                }
                                            }}
                                            variant='outlined'
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '30%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textAlign: "center",
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    fontSmooth: 'auto',
                                                    color: taskColor.FontindigoDark
                                                }}
                                            >Po To Supplier Pending</Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '50%',
                                                    fontSize: 48,
                                                    fontWeight: 500,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: taskColor.FontindigoDark,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ":hover": {
                                                            transition: 300,
                                                            textShadow: '#939498 1px 0 5px'
                                                        }
                                                    }}

                                                >{PoToSuppPending.length}</Typography>
                                            </Box>

                                        </Paper>
                                        <Paper sx={{ width: '2.2%', }}
                                            variant='none'></Paper>
                                        <Paper
                                            sx={{
                                                width: '20%', pl: 0.5, height: 160,
                                                backgroundColor: taskColor.bgIndigo,
                                                border: 1, padding: 2,
                                                borderColor: taskColor.indigoDark,
                                                cursor: 'grab',
                                                ":hover": {
                                                    borderColor: '#7D18EA'
                                                }
                                            }}
                                            variant='outlined'
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '30%',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    textAlign: "center",
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    fontSmooth: 'auto',
                                                    color: taskColor.FontindigoDark
                                                }}
                                            >Data Collection Pending</Box>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    height: '50%',
                                                    fontSize: 48,
                                                    fontWeight: 500,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    color: taskColor.FontindigoDark,
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ":hover": {
                                                            transition: 300,
                                                            textShadow: '#939498 1px 0 5px'
                                                        }
                                                    }}

                                                >{datacollPendng.length}</Typography>
                                            </Box>
                                        </Paper>

                                    </Box>

                                </Box>
                            </Paper> : null
                        }

                    </Box>
                </Paper>
            </Box>
        </CardCloseOnly>
    )
}

export default memo(PurchaseReport)