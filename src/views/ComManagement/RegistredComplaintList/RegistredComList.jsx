import React, { useEffect, useState, memo, useCallback, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Box, Paper, Typography } from '@mui/material'
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { getCompliantRegTable } from 'src/redux/actions/ComplaintRegTable.action';
import { useHistory } from 'react-router-dom';
import CardCloseOnly from 'src/views/Components/CardCloseOnly';
import VerifyModal from '../ComplaintRegister/VerifyModal';
import ModelMessageRead from './ModelMessageRead';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import OnHoldMsgRead from './OnHoldMsgRead';
const RegistredComList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    //state for modal open
    const [open, setOpen] = useState(false);
    //state for modal render
    const [mdopen, setMdopen] = useState(0);
    //state for passing data to modal
    const [mddata, setMddata] = useState({})
    //state for table rendering
    const [count, setCount] = useState(0)
    const sec_id = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    useEffect(() => {
        dispatch(getCompliantRegTable(sec_id))
    }, [dispatch, sec_id])

    //checkboxes for table data selection
    const [pending, setPending] = useState(false)
    const [onhold, setOnhold] = useState(false)
    const [verify, setVerify] = useState(false)
    const [msgRead, setMsgRead] = useState(true)
    const [flag, setFlag] = useState(4)
    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(1)
            setPending(true)
            setVerify(false)
            setOnhold(false)
            setMsgRead(false)
        }
        else {
            setFlag(0)
            setPending(false)
            setVerify(false)
            setOnhold(false)
            setMsgRead(false)
        }
    }, [])

    const updateOnhold = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(2)
            setOnhold(true)
            setPending(false)
            setVerify(false)
            setMsgRead(false)
        }
        else {
            setFlag(0)
            setPending(false)
            setVerify(false)
            setOnhold(false)
            setMsgRead(false)
        }
    }, [])

    const updateVerify = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(3)
            setVerify(true)
            setPending(false)
            setOnhold(false)
            setMsgRead(false)
        }
        else {
            setFlag(0)
            setPending(false)
            setVerify(false)
            setOnhold(false)
            setMsgRead(false)
        }
    }, [])

    const updateMsgRead = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(4)
            setMsgRead(true)
            setPending(false)
            setOnhold(false)
            setVerify(false)
        }
        else {
            setFlag(0)
            setPending(false)
            setVerify(false)
            setOnhold(false)
            setMsgRead(false)
        }
    }, [])

    const compallTable = useSelector((state) => {
        return state.setComplaintRegTable.complaintRegTableList
    })
    const forVerify = compallTable.filter((val) => {
        return val.compalint_status === 2 && val.verify_spervsr === 1
    })

    const pendingList = compallTable.filter((val) => {
        return val.cm_rectify_status === 'P'
    })

    const onholdList = compallTable.filter((val) => {
        return val.cm_rectify_status === 'O'
    })

    const MessageList = compallTable.filter((val) => {
        return val.compdept_message_flag !== 0
    })


    //column title setting for pending
    const [columnpending] = useState([
        {
            headerName: 'Message', minWidth: 100, cellRenderer: params => {
                return <IconButton onClick={() => PendingMessageRead(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="On-Hold Message">
                        <MarkunreadIcon />
                    </CustomeToolTip>
                </IconButton>
            }
        },

        { headerName: "Slno", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 80 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 100 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 300 },
        { headerName: "Request Type", field: "req_type_name", width: 250, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 100 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", minWidth: 180, autoHeight: true, wrapText: true },
    ])

    const [columnonhold] = useState([
        {
            headerName: 'Message', minWidth: 100, cellRenderer: params => {
                return <IconButton onClick={() => OnHoldMessageRead(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="On-Hold Message">
                        <MarkunreadIcon />
                    </CustomeToolTip>
                </IconButton>
            }
        },
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 80 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 100 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 300 },
        { headerName: "Request Type", field: "req_type_name", width: 250, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 100 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", minWidth: 180, autoHeight: true, wrapText: true },
    ])

    const [columnVerify] = useState([
        {
            headerName: 'Verify', minWidth: 10, cellRenderer: params => {
                if ((params.data.compalint_status === 2) && (params.data.cm_rectify_status === 'R')) {
                    return <IconButton onClick={() => Verify(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Verify">
                            <VerifiedUserOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <VerifiedUserOutlinedIcon />
                    </IconButton>
                }
            }
        },
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 100 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Location", field: "location", width: 250, autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 150 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", minWidth: 180, autoHeight: true, wrapText: true },
    ])

    const [columnMessage] = useState([

        {
            headerName: 'Action', minWidth: 240, cellRenderer: params => {
                if (params.data.compdept_message_flag === 1) {
                    return <Fragment>
                        <IconButton sx={{ color: "green", paddingY: 0.5 }}
                            onClick={() => MessageRead(params)}>
                            <CustomeToolTip title="Send Message" >
                                <MarkunreadIcon />
                            </CustomeToolTip>
                        </IconButton>
                    </Fragment>
                }
                else {
                    return <IconButton onClick={() => MessageRead(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Message">
                            <MarkunreadIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },

        // {
        //     headerName: 'Message', minWidth: 100, cellRenderer: params => {
        //         return <IconButton onClick={() => MessageRead(params)}
        //             sx={{ color: editicon, paddingY: 0.5 }} >
        //             <CustomeToolTip title="Message">
        //                 <MarkunreadIcon />
        //             </CustomeToolTip>
        //         </IconButton>
        //     }
        // },
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 130 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Location", field: "location", width: 250, autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 150 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", minWidth: 180, autoHeight: true, wrapText: true },
    ])

    const [column] = useState([
        {
            headerName: 'Message', minWidth: 100,
            cellRenderer: params => {
                if (params.data.compdept_message_flag === 1 || params.data.compdept_message_flag === 2) {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => MessageRead(params)}>
                        <CustomeToolTip title="Message" >
                            <MarkunreadIcon />
                        </CustomeToolTip>
                    </IconButton>

                } else {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <CustomeToolTip title="Message" >
                            <MarkunreadIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        { headerName: "Slno", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 180 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 230 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 100 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 150 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", autoHeight: true, wrapText: true, minWidth: 180 },
    ])

    //when user clicks on verify icon this function will work
    const Verify = useCallback((params) => {
        const data = params.data
        setMddata(data)
        setOpen(true)
        setMdopen(1)
    }, [])

    const [msgModelOpen, setMsgMdlOpen] = useState(0)
    const MessageRead = useCallback((params) => {
        const data = params.data
        setOpen(true)
        setMsgMdlOpen(1)
        setMddata(data)
    }, [])

    const [onHoldMsg, setOnholdMsg] = useState(0)
    const OnHoldMessageRead = useCallback((params) => {
        const data = params.data
        setOpen(true)
        setOnholdMsg(1)
        setMddata(data)
    }, [])
    const PendingMessageRead = useCallback((params) => {
        const data = params.data
        setOpen(true)
        setOnholdMsg(1)
        setMddata(data)
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    const getRowStyle = params => {
        if (params.data.compdept_message_flag !== 0) {
            return { background: '#81d4fa' };
        }
        else if (params.data.cm_rectify_status === "O") {
            return { background: '#a1887f' };
        }
        else if (params.data.cm_rectify_status === "P") {
            return { background: '#fff59d' };
        }
    };

    return (
        <Fragment>
            <CardCloseOnly
                title="Complaint Registred List"
                close={backtoSetting}
            >
                <Box sx={{ width: "100%", p: 1 }}>
                    <Paper variant='outlined' sx={{ p: 2 }} >
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                            justifyContent: "center"
                        }}>
                            <Box sx={{ width: "13%", pr: 1, mt: 1 }}>
                                <CusCheckBox
                                    label="Pending"
                                    color="danger"
                                    size="md"
                                    name="pending"
                                    value={pending}
                                    checked={pending}
                                    onCheked={updatePending}
                                />
                            </Box>
                            <Box sx={{ width: "13%", mt: 1 }}>
                                <CusCheckBox
                                    label="On-Hold"
                                    color="danger"
                                    size="md"
                                    name="onhold"
                                    value={onhold}
                                    checked={onhold}
                                    onCheked={updateOnhold}
                                />
                            </Box>
                            <Box sx={{ width: "13%", mt: 1 }}>
                                <CusCheckBox
                                    label="For Verify"
                                    color="danger"
                                    size="md"
                                    name="verify"
                                    value={verify}
                                    checked={verify}
                                    onCheked={updateVerify}
                                />
                            </Box>
                            <Box sx={{ width: "13%", mt: 1 }}>
                                <CusCheckBox
                                    label="Messages"
                                    color="danger"
                                    size="md"
                                    name="msgRead"
                                    value={msgRead}
                                    checked={msgRead}
                                    onCheked={updateMsgRead}
                                />
                            </Box>
                        </Box>
                    </Paper>
                    <Box sx={{
                        width: "100%",
                        pt: 2
                    }}>
                        {
                            flag === 1 ?
                                <CusAgGridForMain
                                    columnDefs={columnpending}
                                    tableData={pendingList}
                                    //     onClick={rowSelect}
                                    getRowStyle={getRowStyle}
                                /> :
                                flag === 2 ?
                                    <CusAgGridForMain
                                        columnDefs={columnonhold}
                                        tableData={onholdList}
                                        //  onClick={rowSelect}
                                        getRowStyle={getRowStyle}
                                    /> :
                                    flag === 3 ?
                                        <CusAgGridForMain
                                            columnDefs={columnVerify}
                                            tableData={forVerify}
                                            //   onClick={rowSelect}
                                            getRowStyle={getRowStyle}
                                        /> :
                                        flag === 4 ?
                                            <CusAgGridForMain
                                                columnDefs={columnMessage}
                                                tableData={MessageList}
                                                //  onClick={rowSelect}
                                                getRowStyle={getRowStyle}
                                            /> :
                                            < CusAgGridForMain
                                                columnDefs={column}
                                                tableData={compallTable}
                                                //   onClick={rowSelect}
                                                getRowStyle={getRowStyle}
                                            />
                        }

                    </Box>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                        //   /  justifyContent: "flex-start"
                    }}>
                        <Box sx={{ display: "flex" }}>
                            <IconButton >
                                <CropSquareIcon sx={{ background: '#81d4fa', pr: 5 }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", fontWeight: 400, pl: 1, pt: 1.2 }}>
                            <Typography >
                                Message
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <IconButton >
                                <CropSquareIcon sx={{ background: '#fff59d', pr: 5 }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", fontWeight: 400, pl: 1, pt: 1.2 }}>
                            <Typography >
                                Pending
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex" }}>
                            <IconButton >
                                <CropSquareIcon sx={{ background: '#a1887f', pr: 5 }} />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", fontWeight: 400, pl: 1, pt: 1.2 }}>
                            <Typography >
                                On-Hold
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", pl: 2 }}>
                            <IconButton sx={{ color: "green", paddingY: 0.5 }}
                            >
                                <CustomeToolTip title="Send Message" >
                                    <MarkunreadIcon />
                                </CustomeToolTip>
                            </IconButton>
                        </Box>
                        <Box sx={{ display: "flex", fontWeight: 400, pl: 1, pt: 1.2 }}>
                            <Typography >
                                New Message
                            </Typography>
                        </Box>

                    </Box>
                </Box>
                {
                    mdopen === 1 ? <VerifyModal open={open} setOpen={setOpen} mddata={mddata}
                        count={count} setCount={setCount} /> : null
                }
                {
                    msgModelOpen === 1 ? <ModelMessageRead open={open} setOpen={setOpen}
                        complaint={mddata} count={count} setCount={setCount} id={id} /> : null
                }
                {
                    onHoldMsg === 1 ? <OnHoldMsgRead open={open} setOpen={setOpen}
                        complaint={mddata} count={count} setCount={setCount} id={id} /> : null
                }

            </CardCloseOnly>
        </Fragment>
    )
}

export default memo(RegistredComList)