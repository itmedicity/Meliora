import { Box, CssVarsProvider, IconButton, Typography } from '@mui/joy'
import { format } from 'date-fns';
import moment from 'moment';
import React, { Fragment, memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from 'src/views/Axios/Axios';
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp'
import CustomInputDateCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomInputDateCmp';
import { warningNotify } from 'src/views/Common/CommonCode';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';

const UserAcknldgeList = () => {
    const history = useHistory();
    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])

    const [open, setOpen] = useState(false)
    const [TableData, setTableData] = useState([]);
    const [TableDataDis, setTableDataDis] = useState(0)
    const [crfSearch, setCrfSearch] = useState({
        startDate: format(new Date(), "yyyy-MM-dd"),
        endDate: format(new Date(), "yyyy-MM-dd"),
    })
    const { startDate, endDate } = crfSearch
    const updateOnchange = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCrfSearch({ ...crfSearch, [e.target.name]: value })
    }, [crfSearch])
    const searchCRFDetails = useCallback(async (e) => {
        e.preventDefault();
        setOpen(true)
        const postdata = {
            startDate: format(new Date(startDate), 'yyyy-MM-dd 00:00:00'),
            endDate: format(new Date(endDate), 'yyyy-MM-dd 23:59:59')
        }
        const getdataUserAcknldged = async (postdata) => {
            const result = await axioslogin.post('/CrfReports/getdataUserAcknldged', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                console.log(data, "data");
                setTableDataDis(1)
                setTableData(data)
                setOpen(false)
            } else {
                warningNotify("No Report Found")
                setOpen(false)
            }
        }
        if (startDate !== '' && endDate !== '') {
            getdataUserAcknldged(postdata)
        } else {
            warningNotify("Select Start date and End date before Click Search Button")
            setOpen(false)
        }
    }, [endDate, startDate])
    // const [columnDefForTable] = useState([
    //     { headerName: 'Sl No ', field: 'slno', autoHeight: true, wrapText: true, minWidth: 30 },
    //     { headerName: 'Req Slno', field: 'req_slno', autoHeight: true, wrapText: true, minWidth: 30 },
    //     { headerName: 'Req Date', field: 'req_date', autoHeight: true, wrapText: true, minWidth: 30 },
    //     { headerName: 'Department', field: 'dept_name', autoHeight: true, wrapText: true, minWidth: 90, filter: "true" },
    //     { headerName: 'Department Section', field: 'req_deptsec', autoHeight: true, wrapText: true, minWidth: 90, filter: "true" },
    //     { headerName: 'Actual Requirement', field: 'actual_requirement', autoHeight: true, wrapText: true, minWidth: 150 },
    //     { headerName: 'Needed', field: 'needed', autoHeight: true, wrapText: true, minWidth: 150 },
    //     { headerName: 'Category', field: 'category_name', autoHeight: true, wrapText: true, minWidth: 120, filter: "true" },
    //     { headerName: 'Location', field: 'location', autoHeight: true, wrapText: true, minWidth: 90, filter: "true" },
    //     { headerName: 'Expected Date', field: 'expected_date', autoHeight: true, wrapText: true, minWidth: 90 },
    //     { headerName: 'Emergency Tye', field: 'emer_type_name', autoHeight: true, wrapText: true, minWidth: 90 },
    //     { headerName: 'Emergency remarks', field: 'emergeny_remarks', autoHeight: true, wrapText: true, minWidth: 90 },
    //     { headerName: 'Req.DeptSec', field: 'user_deptsec', autoHeight: true, wrapText: true, minWidth: 90 },
    //     { headerName: 'Req.User', field: 'req_user', autoHeight: true, wrapText: true, minWidth: 90 },
    //     { headerName: 'Acknowledgement Remark', field: 'user_acknldge_remarks', autoHeight: true, wrapText: true, minWidth: 150 },
    //     { headerName: 'Acknowledgement User', field: 'acknowUser', autoHeight: true, wrapText: true, minWidth: 90 },
    //     { headerName: 'Acknowledgement date', field: 'user_ack_date', autoHeight: true, wrapText: true, minWidth: 90 },
    // ])

    return (
        <Fragment>
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', }}>
                <Box sx={{ backgroundColor: "#f0f3f5", border: '1px solid #B4F5F0' }}>
                    <Box sx={{ display: 'flex', }}>
                        <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>
                            User Acknowledgement Report</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
                            <CssVarsProvider>
                                <CustomCloseIconCmp handleChange={backToSetting} />
                            </CssVarsProvider>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', bgcolor: '#E3EFF9', pb: 1 }}>
                    <Box sx={{ pt: 1, width: { xs: '100%', md: '60vw', lg: '50vw', xl: '50vw' } }}>
                        <Box sx={{ px: 1, display: 'flex' }} >
                            <Box sx={{ flex: 1, px: 0.3 }}>
                                <Typography sx={{ fontSize: 13, color: '#1D617A', px: 1, pt: 0.1, fontWeight: 550 }} >Start Date</Typography>
                                <CssVarsProvider>
                                    <CustomInputDateCmp
                                        className={{
                                            height: 25, borderRadius: 5, border: '1px solid #bbdefb',
                                            color: '#1D617A', fontSize: 14, width: '100%'
                                        }}
                                        size={'md'}
                                        type='date'
                                        value={startDate}
                                        name="startDate"
                                        handleChange={updateOnchange}
                                        slotProps={{
                                            input: { max: moment(new Date()).format('YYYY-MM-DD') }
                                        }}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 1, px: 0.3 }}>
                                <Typography sx={{ fontSize: 13, color: '#1D617A', px: 1, pt: 0.1, fontWeight: 550 }} >End Date</Typography>
                                <CssVarsProvider>
                                    <CustomInputDateCmp
                                        className={{
                                            height: 25, borderRadius: 5, border: '1px solid #bbdefb',
                                            color: '#1D617A', fontSize: 14, width: '100%'
                                        }}
                                        size={'md'}
                                        type='date'
                                        value={endDate}
                                        name="endDate"
                                        handleChange={updateOnchange}
                                        slotProps={{
                                            input: { max: moment(new Date()).format('YYYY-MM-DD') }
                                        }}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ flex: 0.5, px: 0.3, pt: 2.5 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        sx={{
                                            border: '1px solid #bbdefb', width: '100%',
                                            fontSize: 13, height: 38, lineHeight: '1.2', color: '#1D617A',
                                            bgcolor: 'white', borderRadius: 6,
                                            '&:hover': {
                                                bgcolor: 'white',
                                                color: '#1976d2'
                                            },
                                        }}
                                        onClick={searchCRFDetails}
                                    >
                                        Search
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Fragment >
    )
}

export default memo(UserAcknldgeList)