import React, { useState, useCallback, useEffect, memo, Fragment, useMemo } from 'react'
import { Box } from '@mui/material'
import CusAgGridMast from '../Components/CusAgGridMast'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import DietProcessModel from './DietProcessModel';
import Button from '@mui/material/Button';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import NursingStationSelect from '../CommonSelectCode/NursingStationSelect';
import CusIconButton from '../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
const DietprocessTable = ({ depand, setDepand }) => {
    const [tabledata, setTabledata] = useState([])
    const [nurse, setNurse] = useState(0)
    const [startdate, newStartDate] = useState(new Date())
    const [open, setOpen] = useState(false);
    const [sercha, setSearch] = useState(0)
    const [detail, setdeatial] = useState([])
    const [mdopen, setmdopen] = useState(0)
    const [count, setCount] = useState(0);
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
                <TaskAltRoundedIcon />
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


    const [dayselect, setdayselect] = useState(0)
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
    }, [depand, count])

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

    const [allpros, setAllpros] = useState(0)
    const [menus, setmenus] = useState([])

    const allProcess = () => {
        setAllpros(allpros + 1)

    }
    useEffect(() => {
        if (allpros !== 0) {
            const d = new Date(startdate);
            let day = d.getDay();
            const planNo = tabledata && tabledata.map((val) => {
                return val.plan_slno
            })
            const dmenuslno = tabledata && tabledata.map((val) => {
                return val.diet_slno
            })
            const getmenu = {
                diet_slno: dmenuslno,
                plan_slno: planNo,
                days: day
            }
            const getdmenu = async () => {
                const result = await axioslogin.post('/dietprocess/dmenubyday/allprocess', getmenu);
                const { success, data } = result.data
                if (success === 1) {
                    setmenus(data)
                }
            }
            getdmenu()
        }
    }, [allpros, tabledata, startdate])


    const handleClose = () => {
        setOpen(false);
    };

    return (
        < Fragment >
            {mdopen !== 0 ? <DietProcessModel open={open} handleClose={handleClose} detail={detail}
                setCount={setCount} count={count} setOpen={setOpen} startdate={startdate} dayselect={dayselect} /> : null}
            <Box sx={{ width: "100%" }}>
                {depand === 1 || sercha === 1 ?
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{
                            width: "100%",
                            pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                            display: "flex",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'row', xs: "column" },
                            alignItems: "center"
                        }}>
                            <Box sx={{
                                width: "10%", pr: 1
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
                                width: "20%",
                            }}>
                                <NursingStationSelect value={nurse} setValue={setNurse} />
                            </Box>
                            <Box sx={{
                                width: "20%",
                            }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={search} >
                                    <SearchOutlinedIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                            <Box sx={{
                                width: "30%", pl: 1, pr: 1, pb: 1,
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
            </Box>
        </Fragment >
    )
}

export default memo(DietprocessTable)