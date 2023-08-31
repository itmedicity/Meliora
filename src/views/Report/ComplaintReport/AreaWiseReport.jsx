import React, { useCallback, useMemo, useState, memo, useEffect } from 'react'
import { Paper, Typography, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux';
import CusAgGridForReport from 'src/views/Components/CusAgGridForReport';
import { warningNotify } from '../../Common/CommonCode';
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from '../../Components/CustomeToolTip'
import { ActionTyps } from 'src/redux/constants/action.type'
import { getAreaWiseList } from 'src/redux/actions/ReqAreaWiseReport.action';
import LocationSelectWithoutName from 'src/views/CommonSelectCode/LocationSelectWithoutName';


const AreaWiseReport = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [exports, setexport] = useState(0)
    const [dateset, SetDate] = useState({
        start_date: new Date(),
        end_date: new Date()
    })
    const [location, setLocation] = useState(0)
    const { start_date, end_date } = dateset;
    const getDate = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        SetDate({ ...dateset, [e.target.name]: value })
    }, [dateset])


    const postdata = useMemo(() => {
        return {
            start_date: start_date,
            end_date: end_date,
            cm_location: location
        }
    }, [start_date, end_date, location])


    const getDataList = useSelector((state) => {
        return state.getAreaWiseList.AreaWiseList
    })

    const clicksearch = useCallback((e) => {
        e.preventDefault();
        dispatch(getAreaWiseList(postdata))
    }, [postdata, dispatch])


    const [tabledata, setTableData] = useState([])

    useEffect(() => {
        const dispalyData = getDataList && getDataList.map((val) => {
            const obj = {
                slno: val.complaint_slno,
                date: format(new Date(val.compalint_date), 'dd-MM-yyyy'),
                location: val.location !== null ? val.location : "Not Given",
                desc: val.complaint_desc,
                category: val.complaint_type_name !== null ? val.complaint_type_name : "Not Given",
                priority: val.cm_priority_desc !== null ? val.cm_priority_desc : "Not Given",
                requestdate: val.compalint_date !== null ? format(new Date(val.compalint_date), 'dd-MM-yyyy H:mm:ss') : "Not Given",
                assigndate: val.assigned_date !== null ? format(new Date(val.assigned_date), 'dd-MM-yyyy H:mm:ss') : "Not Given",
                rectifydate: val.cm_rectify_time !== null ? format(new Date(val.cm_rectify_time), 'dd-MM-yyyy H:mm:ss') : "Not Given",
                verifydate: val.cm_verfy_time !== null ? format(new Date(val.cm_verfy_time), 'dd-MM-yyyy H:mm:ss') : "Not Assigned",
                tat: (val.tat === 0 || val.tat === null) ? "Not asssigned" : val.tat + "Minutes"
            }
            return obj
        })
        setTableData(dispalyData)

    }, [getDataList])

    const [columnDefs] = useState([
        { headerName: "SlNo", field: "slno", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Date", field: "date", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Complaint Description", field: "desc", autoHeight: true, wrapText: true, minWidth: 300 },
        { headerName: "Category", field: "category", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Priority", field: "priority", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Request Time ", field: "requestdate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Assigning Time ", field: "assigndate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Rectify Time ", field: "rectifydate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Veryfyication Time", field: "verifydate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "TAT Time(G_H)", field: "tat", autoHeight: true, wrapText: true, minWidth: 100, filter: "true" },
    ])

    const onExportClick = () => {
        if (tabledata.length === 0) {
            warningNotify("No Data For Download, Please select dates")
            setexport(0)
        }
        else {
            setexport(1)
        }
    }

    useEffect(() => {
        if (exports === 1) {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
            setexport(0)
        }
        else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        }
    }, [exports, dispatch])


    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])


    return (
        <CardCloseOnly
            title='Area Wise Complaint Report'
            close={backToSetting}
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
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            mt: 1
                        }} >
                            <Box sx={{
                                width: '100%',
                                ml: 0.5, mt: 0.5
                            }}>
                                <Typography>Start Date</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: 15,
                                mb: 1
                            }}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="start_date"
                                    value={start_date}
                                    onchange={getDate}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            mt: 1
                        }} >
                            <Box sx={{
                                width: '100%',
                                ml: 0.5, mt: 0.5, pl: 1
                            }}>
                                <Typography>End Date</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: 15,
                                mb: 1
                            }}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="end_date"
                                    value={end_date}
                                    onchange={getDate}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            mt: 1
                        }} >
                            <Box sx={{
                                width: '100%',
                                ml: 0.5, mt: 0.5, pl: 1
                            }}>
                                <Typography>Select Area</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: 15,
                                pt: 1
                            }}>
                                <LocationSelectWithoutName
                                    value={location}
                                    setValue={setLocation}

                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            ml: 1, mt: 0.5,
                        }} >
                            <Box sx={{
                                width: '20%',
                                mt: 0.8
                            }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch} >
                                    <SearchOutlinedIcon fontSize='small' />
                                </CusIconButton>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
                <Paper
                    square
                    sx={{
                        width: { md: '100%', lg: '100%', xl: '100%' },
                        p: 1
                    }}
                >
                    {/* Rigth Side Menu  */}
                    <Paper
                        square
                        sx={{
                            backgroundColor: '#f0f3f5',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row-reverse',
                            gap: 0.1,
                            p: 0.3,
                            borderLeft: 2,
                            borderColor: '#d3d3d3',
                        }}
                    >
                        <CustomeToolTip title="Download" placement="bottom">
                            <Box>
                                <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                    <DownloadIcon />
                                </CusIconButton>
                            </Box>
                        </CustomeToolTip>
                    </Paper>
                    <CusAgGridForReport
                        columnDefs={columnDefs}
                        tableData={tabledata}
                    />
                </Paper>
            </Box>
        </CardCloseOnly>
    )
}

export default memo(AreaWiseReport)