import { CssVarsProvider, IconButton, Option, Select, Typography } from '@mui/joy';
import { Badge, Box, FormControlLabel, Paper, Radio, RadioGroup } from '@mui/material'
import { parse } from 'date-fns';
import React, { memo, useCallback, useState } from 'react'
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import { infoNotify } from 'src/views/Common/CommonCode';
import CustomInputDateCmp from '../../ComonComponent/Components/CustomInputDateCmp';
import moment from 'moment';
import CRFDashboardDptSelect from 'src/views/CommonSelectCode/CRFDashboardDptSelect';
import CRFDashboardDptSecSelect from 'src/views/CommonSelectCode/CRFDashboardDptSecSelect';
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone';
import CustomIconButtonCmp from '../../ComonComponent/Components/CustomIconButtonCmp';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
}

const TopViewDesignPurchase = ({ radiovalue, allData, setDisData, setRadioValue, ackPending, crfProcess,
    quoNego, quoFinal, poProcess, apprvCount, dataCollection }) => {

    const [startDate, setStartDate] = useState(formatDateForInput(new Date()));
    const [endDate, setEndDate] = useState(formatDateForInput(new Date()));
    const [searchCrf, setsearchCrf] = useState('')
    const [searchFlag, setSearchFlag] = useState(0)
    const [dptSec, setdptSec] = useState(0)
    const [department, setDepartment] = useState(0)
    const ClearSearch = useCallback(() => {
        setSearchFlag(0)
        setStartDate(formatDateForInput(new Date()))
        setEndDate(formatDateForInput(new Date()))
        setDepartment(0)
        setdptSec(0)
        setsearchCrf('')
        setDisData(allData)
    }, [allData, setDisData])

    const updateRadioClick = useCallback(async (e) => {
        e.preventDefault()
        setRadioValue(e.target.value)
    }, [setRadioValue])
    const changeSearchSelect = useCallback((e, newValue) => {
        setSearchFlag(newValue);
    }, [])

    const startDateChange = useCallback((e) => {
        setStartDate(e.target.value)
    }, [])
    const endDateChange = useCallback((e) => {
        setEndDate(e.target.value)
    }, [])
    const changeCrfNo = useCallback((e) => {
        setsearchCrf(e.target.value)
    }, [])

    const SearchData = useCallback(() => {
        if (searchFlag === '1') {
            const newData = allData?.filter((val) => {
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
            if (searchCrf === '') {
                infoNotify("Enter CRF No.")
            } else {
                const newData = allData?.filter((val) => val.req_slno === parseInt(searchCrf))
                setDisData(newData)
            }
        }
        else if (searchFlag === '3') {
            if (department === 0) {
                infoNotify("Select Department")
            } else {
                if (dptSec === 0) {
                    const newData = allData?.filter((val) => val.dept_id === department)
                    setDisData(newData)
                } else {
                    const newData = allData?.filter((val) => val.dept_id === department && val.request_deptsec_slno === dptSec)
                    setDisData(newData)
                }
            }
        }
    }, [startDate, endDate, searchFlag, department, searchCrf, allData, setDisData, dptSec])


    return (
        <Box sx={{ flexWrap: 'wrap', }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', bgcolor: '#E3EFF9', border: '0.4px solid #B4F5F0', borderTop: 'none' }}>
                <RadioGroup
                    sx={{ pt: 1, flex: '1 1 auto', }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={radiovalue}
                    onChange={(e) => updateRadioClick(e)}
                >
                    <Badge
                        badgeContent={ackPending.length || 0}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            mr: 1,
                            '& .MuiBadge-badge': {
                                backgroundColor: '#F83839',
                                color: 'white',
                                transform: 'translate(70%, -10%)',
                            }
                        }}
                    >
                        <FormControlLabel value='1' sx={{
                            pl: 2, '& .MuiFormControlLabel-label': {
                                fontSize: {
                                    xs: '12px',
                                    sm: '14px',
                                    lg: '14px',
                                    xl: '16px'
                                }
                            }
                        }} control={
                            <Radio
                                sx={{
                                    color: 'red',
                                    '&.Mui-checked': {
                                        color: 'red',
                                    },
                                }}
                            />} label="Acknowledgement Pending" />
                    </Badge>
                    <Badge
                        badgeContent={crfProcess.length || 0}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            mr: 1,
                            '& .MuiBadge-badge': {
                                backgroundColor: '#E55B13',
                                color: 'white',
                                transform: 'translate(70%, -10%)',
                            }
                        }}
                    >
                        <FormControlLabel value='2' sx={{
                            pl: 1.5, '& .MuiFormControlLabel-label': {
                                fontSize: {
                                    xs: '12px',
                                    sm: '14px',
                                    lg: '14px',
                                    xl: '16px'
                                }
                            }
                        }} control={
                            <Radio
                                sx={{
                                    color: '#E55B13',
                                    '&.Mui-checked': {
                                        color: '#E55B13',
                                    },
                                }} />} label="Processing CRF " />
                    </Badge>
                    <Badge
                        badgeContent={quoNego.length || 0}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            mr: 1,
                            '& .MuiBadge-badge': {
                                backgroundColor: '#6200ea',
                                color: 'white',
                                transform: 'translate(70%, -10%)',
                            }
                        }}
                    >
                        <FormControlLabel value='3' sx={{
                            pl: 1.5, '& .MuiFormControlLabel-label': {
                                fontSize: {
                                    xs: '12px',
                                    sm: '14px',
                                    lg: '14px',
                                    xl: '16px'
                                }
                            }
                        }} control={
                            <Radio
                                sx={{
                                    color: '#6200ea',
                                    '&.Mui-checked': {
                                        color: '#6200ea',
                                    },
                                }}
                            />} label="Quotation Negotiation " />
                    </Badge>
                    <Badge
                        badgeContent={quoFinal.length || 0}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            mr: 1,
                            '& .MuiBadge-badge': {
                                backgroundColor: 'orange',
                                color: 'white',
                                transform: 'translate(70%, -10%)',
                            }
                        }}
                    > <FormControlLabel value='4' sx={{
                        pl: 1.5, '& .MuiFormControlLabel-label': {
                            fontSize: {
                                xs: '12px',
                                sm: '14px',
                                lg: '14px',
                                xl: '16px'
                            }
                        }
                    }} control={
                        <Radio
                            sx={{
                                color: 'orange',
                                '&.Mui-checked': {
                                    color: 'orange',
                                },
                            }} />
                    } label="Quotation Finalizing" />
                    </Badge>
                    <Badge
                        badgeContent={poProcess.length || 0}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            mr: 1,
                            '& .MuiBadge-badge': {
                                backgroundColor: '#0d47a1',
                                color: 'white',
                                transform: 'translate(70%, -10%)',
                            }
                        }}
                    >  <FormControlLabel
                            value='5'
                            sx={{
                                pl: 1.5,
                                '& .MuiFormControlLabel-label': {
                                    fontSize: {
                                        xs: '12px',
                                        sm: '14px',
                                        lg: '14px',
                                        xl: '16px'
                                    }
                                }
                            }}
                            control={
                                <Radio
                                    sx={{
                                        color: '#0d47a1',
                                        '&.Mui-checked': {
                                            color: '#0d47a1',
                                        },
                                    }}
                                />
                            }
                            label="PO Processing"
                        />
                    </Badge>

                    <Badge
                        badgeContent={apprvCount.length || 0}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            mr: 1,
                            '& .MuiBadge-badge': {
                                backgroundColor: '#1b5e20',
                                color: 'white',
                                transform: 'translate(70%, -10%)',
                            }
                        }}
                    >
                        <FormControlLabel
                            value='6'
                            sx={{
                                // pl: 1.5,
                                pl: { xl: 1.5, lg: 1.7 },
                                '& .MuiFormControlLabel-label': {
                                    fontSize: {
                                        xs: '12px',
                                        sm: '14px',
                                        lg: '14px',
                                        xl: '16px'
                                    }
                                }
                            }}
                            control={
                                <Radio
                                    sx={{
                                        color: '#1b5e20',
                                        '&.Mui-checked': {
                                            color: '#1b5e20',
                                        },
                                    }}
                                />
                            }
                            label="PO Approvals"
                        />
                    </Badge>
                    {/* </RadioGroup>
                <RadioGroup
                    sx={{
                        pt: 1, flex: '1 1 auto', bgcolor: '#D4F1F4', borderLeft: '1px solid lightblue',
                    }}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={radiovalue}
                    onChange={(e) => updateRadioClick(e)}
                > */}
                    <Badge
                        badgeContent={dataCollection.length || 0}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{
                            mr: 1,
                            '& .MuiBadge-badge': {
                                backgroundColor: '#0C6170',
                                color: 'white',
                                transform: 'translate(70%, -10%)',
                            }, bgcolor: '#D4F1F4'
                        }}
                    >
                        <FormControlLabel value='7' sx={{
                            pl: 2, bgcolor: '#D4F1F4',
                            '& .MuiFormControlLabel-label': {
                                fontSize: {
                                    xs: '12px',
                                    sm: '14px',
                                    lg: '14px',
                                    xl: '16px'
                                }
                            }
                        }} control={
                            <Radio
                                sx={{
                                    color: '#0C6170',
                                    '&.Mui-checked': {
                                        color: '#0C6170',
                                    }, bgcolor: '#D4F1F4'
                                }}
                            />} label="Data Collection Pending" />
                    </Badge>
                </RadioGroup>
            </Box>
            {radiovalue !== '6' ?
                <Paper sx={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', py: 0.3 }}>
                    <Box sx={{ m: 0.5, }}>
                        <CssVarsProvider>
                            <Select defaultValue="0" sx={{ width: 250, border: '1px solid #bbdefb', height: 20, color: '#1565c0', fontSize: 14 }}
                                slotProps={{
                                    listbox: { placement: 'bottom-start' },
                                }}
                                placeholder="Search By"
                                value={searchFlag}
                                onChange={changeSearchSelect}
                            >
                                <Option value="1">Req. Date</Option>
                                <Option value="2">CRF No.</Option>
                                {radiovalue !== '7' ?
                                    <Option value="3">Department Section</Option>
                                    : null}
                            </Select>
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ m: 0.5, pr: 1, }}>
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

                    {searchFlag === '1' ?
                        <Box sx={{ display: 'flex', m: 0.5 }}>
                            <Box sx={{ flex: '1 1 auto' }}>
                                <DateInput
                                    label="Start Date"
                                    value={startDate}
                                    onChange={startDateChange}
                                />
                            </Box>
                            <Box sx={{ flex: '1 1 auto', pl: 0.5 }}>
                                <DateInput
                                    label="End Date"
                                    value={endDate}
                                    onChange={endDateChange}
                                />
                            </Box>
                        </Box>
                        : searchFlag === '2' ?
                            <Box sx={{ pt: 0.5, pr: 0.7 }}>
                                <CssVarsProvider>
                                    <CustomInputDateCmp
                                        StartIcon={<Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AlignHorizontalLeftTwoToneIcon sx={{ height: 18, width: 18, color: '#0063C5' }} />
                                            <Typography sx={{ fontSize: '13px', color: '#0063C5' }}>CRF/TMC/</Typography>
                                        </Box>}
                                        className={{
                                            borderRadius: 6, border: '1px solid #bbdefb', width: 250, height: 35, color: '#1565c0'
                                        }}
                                        autoComplete={'off'}
                                        size={'md'}
                                        type='text'
                                        name={'searchCrf'}
                                        value={searchCrf}
                                        handleChange={changeCrfNo}
                                    />

                                </CssVarsProvider>
                            </Box>
                            : searchFlag === '3' ? <Box sx={{ display: 'flex', pt: 0.5, pr: 0.7 }}>
                                <CRFDashboardDptSelect department={department} setDepartment={setDepartment}
                                    setdptSec={setdptSec} />
                                {department !== 0 ?
                                    <Box sx={{ ml: 0.5 }}>
                                        <CRFDashboardDptSecSelect dptSec={dptSec} setdptSec={setdptSec} />
                                    </Box>

                                    : null}
                            </Box>
                                : null}
                    {(searchFlag === '1' || searchFlag === '2' || searchFlag === '3' || searchFlag === '4' || searchFlag === '5') ?
                        <Box sx={{ pt: 0.5 }}>
                            <CssVarsProvider>
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
                            </CssVarsProvider>
                        </Box>
                        : null
                    }
                </Paper>
                : null}
        </Box >
    )
}
const DateInput = ({ label, value, onChange }) => (
    <CssVarsProvider>
        <CustomInputDateCmp
            StartIcon={<Typography sx={{ fontSize: 14, color: '#0d47a1', fontWeight: 550, pr: 0.5 }}>{label}</Typography>}
            className={{
                height: 25, borderRadius: 5, border: '1px solid #bbdefb',
                color: '#0d47a1', fontSize: 14, width: 200,
            }}
            size={'md'}
            type='date'
            value={value}
            handleChange={onChange}
            slotProps={{
                input: { max: moment(new Date()).format('YYYY-MM-DD') }
            }}
        />
    </CssVarsProvider>
);
export default memo(TopViewDesignPurchase)