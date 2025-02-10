import { Box, CssVarsProvider, IconButton, Option, Select, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { infoNotify } from 'src/views/Common/CommonCode';
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import moment from 'moment';
import { parse } from 'date-fns';

const CustomCloseIconCmp = React.lazy(() => import("../../ComonComponent/Components/CustomCloseIconCmp"))
const CustomIconButtonCmp = React.lazy(() => import("../../ComonComponent/Components/CustomIconButtonCmp"))
const CustomInputDateCmp = React.lazy(() => import("../../ComonComponent/Components/CustomInputDateCmp"))
const CRFDashboardDptSecSelect = React.lazy(() => import("src/views/CommonSelectCode/CRFDashboardDptSecSelect"))
const CRFDashboardDptSelect = React.lazy(() => import("src/views/CommonSelectCode/CRFDashboardDptSelect"))

const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
};
const CrfDetailSearchComp = ({ setFlag, setDisData, tableData }) => {
    const [department, setDepartment] = useState(0)
    const [dptSec, setdptSec] = useState(0)
    const [state, setState] = useState({
        startDate: formatDateForInput(new Date()),
        endDate: formatDateForInput(new Date()),
        searchFlag: '0',
        searchCrf: ''
    });
    const { startDate, endDate, searchFlag, searchCrf } = state
    const backtoHome = useCallback(() => {
        setFlag(0)
    }, [setFlag])

    const startDateChange = useCallback((e) => {
        setState(prevState => ({
            ...prevState,
            startDate: (e.target.value)
        }));
    }, [])
    const endDateChange = useCallback((e) => {
        setState(prevState => ({
            ...prevState,
            endDate: (e.target.value)
        }));
    }, [])
    const ClearSearch = useCallback(() => {
        setDepartment(0)
        setdptSec(0)
        setDisData(tableData)
        const initialState = {
            startDate: formatDateForInput(new Date()),
            endDate: formatDateForInput(new Date()),
            searchFlag: '0',
            searchCrf: ''
        }
        setState(initialState)
    }, [tableData, setDisData])
    const changeSearchSelect = useCallback((e, newValue) => {
        setState(prevState => ({
            ...prevState,
            searchFlag: (newValue)
        }));
    }, [])
    const changeCrfNo = useCallback((e) => {
        setState(prevState => ({
            ...prevState,
            searchCrf: (e.target.value)
        }));
    }, [])

    const SearchData = useCallback(() => {
        if (searchFlag === '1') {
            const newData = tableData?.filter((val) => {
                const reqDate = new Date(val.req_date).setHours(0, 0, 0, 0);
                const start = parse(startDate, 'yyyy-MM-dd', new Date()).setHours(0, 0, 0, 0);
                const end = parse(endDate, 'yyyy-MM-dd', new Date()).setHours(0, 0, 0, 0);

                return reqDate >= start && reqDate <= end;
            });

            if (newData.length !== 0) {
                setDisData(newData)
            } else {
                setDisData([])
            }
        }
        else if (searchFlag === '2') {
            if (department === 0) {
                infoNotify("Select Department")
            } else {
                if (dptSec === 0) {
                    const newData = tableData?.filter((val) => val.dept_id === department)
                    setDisData(newData)
                } else {
                    const newData = tableData?.filter((val) => val.dept_id === department && val.request_deptsec_slno === dptSec)
                    setDisData(newData)
                }
            }
        }
        else if (searchFlag === '3') {
            if (searchCrf === '') {
                infoNotify("Enter CRF No.")
            } else {
                const newData = tableData?.filter((val) => val.req_slno === parseInt(searchCrf))
                setDisData(newData)
            }
        }
    }, [tableData, startDate, endDate, searchFlag, department, dptSec, searchCrf, setDisData])
    return (
        <Fragment>
            <Paper variant='outlined' sx={{ bgcolor: 'white', pt: 0.5, height: 92 }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 550, color: '#41729F', ml: 1 }}>CRF Details</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, pt: 0.8, pr: 1 }}>
                        <CustomCloseIconCmp
                            handleChange={backtoHome}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ m: 0.5, }}>

                            <Select defaultValue="0" sx={{ width: 280, border: '1px solid #64b5f6', height: 20, color: '#1565c0', fontSize: 14 }}
                                slotProps={{
                                    listbox: { placement: 'bottom-start' },
                                }}
                                placeholder="Search By"
                                value={searchFlag}
                                onChange={changeSearchSelect}
                            >
                                <Option value="1">Req. Date</Option>
                                <Option value="2">Department / Department Section</Option>
                                <Option value="3">CRF No.</Option>
                            </Select>
                        </Box>
                        <Box sx={{ my: 0.5, pr: 1 }}>
                            <CssVarsProvider>
                                <IconButton
                                    variant="plain"
                                    sx={{
                                        color: '#0277bd',
                                        width: '100%',
                                        fontSize: 12,
                                        borderRadius: 5,
                                        height: '19px',
                                        lineHeight: '1',
                                    }}
                                    onClick={ClearSearch}
                                >
                                    <FilterAltTwoToneIcon sx={{ fontWeight: 550, color: '#0277bd', pr: 0.5, width: 30, height: 20 }} />
                                    Clear Filter
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Box>
                    {searchFlag === '1' ?
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ my: 0.5, mx: 0.5 }} >
                                <CssVarsProvider>
                                    <CustomInputDateCmp
                                        StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
                                        className={{
                                            height: 25, borderRadius: 5, border: '1px solid #bbdefb',
                                            color: '#0d47a1', fontSize: 14, width: 200,
                                        }}
                                        slotProps={{
                                            input: {
                                                max: moment(new Date()).format('YYYY-MM-DD')
                                            },
                                        }}
                                        size={'md'}
                                        type='date'
                                        name={'startDate'}
                                        value={startDate}
                                        handleChange={startDateChange}
                                    />
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ my: 0.5 }} >
                                <CssVarsProvider>
                                    <CustomInputDateCmp
                                        StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>Start Date </Typography>}
                                        className={{
                                            height: 35, borderRadius: 5, border: '1px solid #bbdefb',
                                            color: '#0d47a1', fontSize: 14, width: 200,
                                        }}
                                        slotProps={{
                                            input: {
                                                max: moment(new Date()).format('YYYY-MM-DD')
                                            },
                                        }}
                                        size={'md'}
                                        type='date'
                                        name={'endDate'}
                                        value={endDate}
                                        handleChange={endDateChange}
                                    />
                                </CssVarsProvider>
                            </Box>
                        </Box>
                        : searchFlag === '2' ? <Box sx={{ display: 'flex', mt: 0.5, }}>
                            <CRFDashboardDptSelect department={department} setDepartment={setDepartment}
                                setdptSec={setdptSec} />
                            {department !== 0 ?
                                <Box sx={{ ml: 0.5 }}>
                                    <CRFDashboardDptSecSelect dptSec={dptSec} setdptSec={setdptSec} />
                                </Box>

                                : null}
                        </Box>
                            : searchFlag === '3' ?
                                <Box sx={{ display: 'flex', my: 0.5, ml: 0.5 }}>
                                    <CssVarsProvider>
                                        <CustomInputDateCmp
                                            StartIcon={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
                                                <Typography sx={{ ml: 1, fontSize: '13px', color: '#0063C5' }}>CRF/TMC/</Typography>
                                            </Box>}
                                            className={{
                                                borderRadius: 6, border: '1px solid #bbdefb', width: 250, height: 35, color: '#1565c0'
                                            }}
                                            size={'md'}
                                            autoComplete={'off'}
                                            type='text'
                                            name={'searchCrf'}
                                            value={searchCrf}
                                            handleChange={changeCrfNo}
                                        />
                                    </CssVarsProvider>

                                </Box>
                                : null}
                    {(searchFlag === '1' || searchFlag === '2' || searchFlag === '3') ?
                        <Box sx={{ pt: 0.4, pl: 1 }}>
                            <   CustomIconButtonCmp
                                handleChange={SearchData}
                            >
                                Search
                                <SearchTwoToneIcon sx={{
                                    height: 22, width: 22, color: '#1565c0', ml: 1, pt: 0.2,
                                    '&:hover': {
                                        color: '#43B0F1'
                                    },
                                }} />
                            </CustomIconButtonCmp>
                        </Box>
                        : null
                    }
                </Box>
            </Paper >
        </Fragment>
    )
}

export default memo(CrfDetailSearchComp)