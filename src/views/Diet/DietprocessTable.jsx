import React, { useState, useCallback, useEffect, memo, Fragment, useMemo } from 'react'
import { Box } from '@mui/material'
import CusAgGridMast from '../Components/CusAgGridMast'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import DietProcessModel from './DietProcessModel';
import Button from '@mui/material/Button';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import NursingStationSelect from '../CommonSelectCode/NursingStationSelect';
import CusIconButton from '../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { format } from 'date-fns'
import { useSelector } from 'react-redux'
import { succesNotify } from 'src/views/Common/CommonCode'

const DietprocessTable = ({ depand, setDepand, count, setCount, newStartDate, startdate, dayselect, setdayselect }) => {
    const [tabledata, setTabledata] = useState([])
    const [nurse, setNurse] = useState(0)
    const [open, setOpen] = useState(false);
    const [sercha, setSearch] = useState(0)
    const [detail, setdeatial] = useState([])
    const [mdopen, setmdopen] = useState(0)
    const [allpros, setAllpros] = useState(0)
    //column title setting
    const [column] = useState([
        { headerName: "Plan Slno", field: "plan_slno" },
        { headerName: "Patient Id", field: "pt_no" },
        { headerName: "Patient Name", field: "ptc_ptname" },
        { headerName: "Room/Ward", field: "bdc_no" },
        { headerName: "Plan Date", field: "plan_date" },
        { headerName: "Remarks", field: "plan_remark" },
        {
            headerName: 'Diet Process', cellRenderer: params => <IconButton
                sx={{ color: editicon, paddingY: 0.5 }}
                onClick={() => dietProcess(params)}>
                <PublishedWithChangesOutlinedIcon />
            </IconButton>
        }
    ])
    const [columnprocess] = useState([
        { headerName: "Process Slno", field: "proc_slno" },
        { headerName: "Plan Slno", field: "plan_slno" },
        { headerName: "Patient Id", field: "pt_no" },
        { headerName: "Patient Name", field: "ptc_ptname" },
        { headerName: "Room/Ward", field: "bd_code" },
        { headerName: "Plan Date", field: "pdate" },
        { headerName: "Diet", field: "diet_name" },
        { headerName: "Remarks", field: "plan_remark" },
    ])

    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    //month format
    const updatedate = (e) => {
        setdayselect(1)
        newStartDate(e.target.value)
    }
    const postdata = useMemo(() => {
        return {
            process_date: startdate,
            ns_code: nurse
        }
    }, [startdate, nurse])

    //get all data
    useEffect(() => {
        const getUserTable = async () => {
            if (depand === 1) {
                const result = await axioslogin.get('/dietplan/getdietplan/NewOrder')
                const { success, data } = result.data
                if (success === 1) {
                    setTabledata(data)
                } else {
                    setTabledata()
                    warningNotify("Error occured contact EDP")
                }
            }
            else {
                const result = await axioslogin.get('/dietplan/dirtplan/proceeslist')
                const { success, data } = result.data
                if (success === 1) {
                    setTabledata(data)
                } else {
                    setTabledata()
                    warningNotify("Error occured contact EDP")
                }
            }
        }
        getUserTable();
    }, [depand, count, sercha])

    useEffect(() => {
        const serchdatass = async () => {
            if (sercha === 1 && nurse !== 0 && dayselect === 1) {
                const result = await axioslogin.post('/dietplan/newbydateNS', postdata)
                const { success, data, message } = result.data
                if (success === 1) {
                    setTabledata(data)
                } else {
                    setTabledata()
                    warningNotify(message)
                }
            } else if (nurse === 0 && sercha === 1) {
                const result = await axioslogin.post('/dietplan/newbydate', postdata)
                const { success, data } = result.data
                if (success === 1) {
                    setTabledata(data)
                } else {
                    setTabledata()
                    warningNotify("Error occured contact EDP")
                }
            }
        }
        serchdatass()
    }, [sercha, postdata, nurse, count, dayselect])

    const dietProcess = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setdeatial(data)
        setmdopen(1)
        setOpen(true)
    }, [])

    const search = () => {
        setSearch(1)
        setDepand(2)
    }
    const [msgshow, setMsg] = useState(0)
    const allProcess = () => {
        setAllpros(allpros + 1)
    }

    useEffect(() => {
        if (msgshow === 1) {
            succesNotify("Process Completed")
        }
    }, [msgshow])

    useEffect(() => {
        if (allpros !== 0 && msgshow === 0) {
            tabledata && tabledata.map((val) => {
                const getdmenu = async () => {
                    const result = await axioslogin.get(`/common/dMenu/${val.diet_slno}`,)
                    const { data, success, message } = result.data;
                    if (success === 1) {
                        const { dmenu_slno } = data[0]
                        const d = new Date(startdate);
                        let day = d.getDay();
                        const getmenu = {
                            bd_code: val.bd_code,
                            dmenu_slno: dmenu_slno,
                            days: day
                        }
                        const result1 = await axioslogin.post('/dietprocess/dmenubyday', getmenu);
                        const { succes, dataa, messagee } = result1.data
                        if (succes === 1) {
                            const postdata = {
                                plan_slno: val.plan_slno,
                                dmenu_slno: dmenu_slno,
                                ip_no: val.ip_no,
                                pt_no: val.pt_no,
                                diet_slno: val.diet_slno,
                                bd_code: val.bd_code,
                                process_date: dayselect === 0 ? format(new Date(), "yyyy-MM-dd hh-mm-ss") : format(new Date(startdate), "yyyy-MM-dd hh-mm-ss"),
                                process_status: 1,
                                discharge_status: val.discharge === 'N' ? 1 : 0,
                                em_id: id
                            }
                            const result = await axioslogin.post('/dietprocess', postdata);
                            const { success, message, insetid } = result.data;
                            if (success === 1) {
                                const postdetaildata = dataa && dataa.map((val) => {
                                    return {
                                        proc_slno: insetid,
                                        type_slno: val.type_slno,
                                        rate_hos: val.hosp_rate,
                                        rate_cant: val.cant_rate
                                    }
                                })
                                const result1 = await axioslogin.post('/dietprocess/processDetailInsert', postdetaildata);
                                const { suces, messag } = result1.data;
                                if (suces === 1) {
                                    setMsg(1)
                                    setCount(count + 1);
                                    setAllpros(0)

                                }
                                else {
                                    setMsg(0)
                                    warningNotify(messag)
                                }
                            }
                            else {
                                warningNotify(message)
                            }
                        }
                        else {
                            warningNotify(messagee)
                        }
                    }
                    else {
                        warningNotify(message)
                    }
                }
                getdmenu(val.plan_slno)

                return 0

            })
        }
    }, [allpros, tabledata, startdate, dayselect, msgshow, id, setCount, count])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        < Fragment >
            {mdopen !== 0 ? <DietProcessModel open={open} handleClose={handleClose} detail={detail}
                setCount={setCount} count={count} setOpen={setOpen} startdate={startdate} dayselect={dayselect}
                setSearch={setSearch}

            /> : null}
            <Box sx={{ width: "100%" }}>
                {depand === 1 ?
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{
                            // width: "100%",
                            pl: 1, pt: 0.5, pb: 0.5,
                            display: "flex",
                            // width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                            alignItems: "center",
                        }}>
                            <Box sx={{
                                flex: 0, pt: 0.5, pr: 1
                            }}>
                                <TextFieldCustom
                                    placeholder="Select Date"
                                    type="date"
                                    size="sm"
                                    min={new Date()}
                                    name="startdate"
                                    value={startdate}
                                    onchange={updatedate}
                                />
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-evenly ",
                                pt: 1, flex: 0, pr: 1
                            }}>
                                <NursingStationSelect value={nurse} setValue={setNurse} />
                            </Box>
                            <Box sx={{
                                flex: 0, pt: 0.5, pr: 2
                            }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search} >
                                    <SearchOutlinedIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                            <Box sx={{
                                flex: 1, pr: 1, pt: 0.5
                            }}>
                                <Button onClick={allProcess} variant="contained" size="small" color="primary">All Process</Button>
                            </Box>
                        </Box>
                        <CusAgGridMast
                            columnDefs={column}
                            tableData={tabledata}
                        />
                    </Box>
                    : null
                }
                {depand === 0 ?
                    <CusAgGridMast
                        columnDefs={columnprocess}
                        tableData={tabledata}
                    /> : null
                }
                {depand === 2 ?
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{
                            // width: "100%",
                            pl: 1, pt: 0.5, pb: 0.5,
                            display: "flex",
                            // width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                            alignItems: "center",
                        }}>
                            <Box sx={{
                                flex: 0, pt: 0.5, pr: 1
                            }}>
                                <TextFieldCustom
                                    placeholder="Select Date"
                                    type="date"
                                    size="sm"
                                    min={new Date()}
                                    name="startdate"
                                    value={startdate}
                                    onchange={updatedate}
                                />
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-evenly ",
                                pt: 1, flex: 0, pr: 1
                            }}>
                                <NursingStationSelect value={nurse} setValue={setNurse} />
                            </Box>
                            <Box sx={{
                                flex: 0, pt: 0.5, pr: 2
                            }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search} >
                                    <SearchOutlinedIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                            <Box sx={{
                                flex: 1, pr: 1, pt: 0.5
                            }}>
                                <Button onClick={allProcess} variant="contained" size="small" color="primary">All Process</Button>
                            </Box>
                        </Box>
                        <CusAgGridMast
                            columnDefs={column}
                            tableData={tabledata}
                        />
                    </Box>
                    : null
                }
            </Box>
        </Fragment >
    )
}

export default memo(DietprocessTable)