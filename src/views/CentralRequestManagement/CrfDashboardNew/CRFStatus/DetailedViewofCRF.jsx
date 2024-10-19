import { Box, CssVarsProvider, IconButton, Input, Option, Radio, Select, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import { format, parse } from 'date-fns'
import React, { Fragment, memo, useCallback, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import FilterAltTwoToneIcon from '@mui/icons-material/FilterAltTwoTone';
import CRFDashboardDptSecSelect from 'src/views/CommonSelectCode/CRFDashboardDptSecSelect'
import CRFDashboardDptSelect from 'src/views/CommonSelectCode/CRFDashboardDptSelect'
import AlignHorizontalLeftTwoToneIcon from '@mui/icons-material/AlignHorizontalLeftTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import { Virtuoso } from 'react-virtuoso'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import DashboardApprovalView from './DashboardApprovalView'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomCloseIconCmp from '../../ComonComponent/CustomCloseIconCmp'
import CustomIconButtonCmp from '../../ComonComponent/CustomIconButtonCmp'
import CustomRadioButtonCmp from '../../ComonComponent/CustomRadioButtonCmp'
import CustomInputDateCmp from '../../ComonComponent/CustomInputDateCmp'

const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
};
const DetailedViewofCRF = ({ setFlag, disData, allFlag, setDisData, tableData, heading }) => {
    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState(formatDateForInput(new Date()));
    const [endDate, setEndDate] = useState(formatDateForInput(new Date()));
    const [searchFlag, setSearchFlag] = useState('0')
    const [department, setDepartment] = useState(0)
    const [clinic, setClinic] = useState(true)
    const [nonClinic, setNonClinic] = useState(false)
    // const [academic, setAcademic] = useState(false)
    const [dptSec, setdptSec] = useState(0)
    const [searchCrf, setsearchCrf] = useState('')
    const [modalData, setModalData] = useState([])
    const [modalopen, setModalOpen] = useState(false)
    const [modFlag, setModFlag] = useState(0)
    const [approvalRemarks, setApprovalRemarks] = useState([])

    const [datacolflag, setDataColFlag] = useState(0)
    const [datacolData, setDataColData] = useState([])

    useEffect(() => {
        dispatch(getDepartment())
    }, [dispatch])

    const startDateChange = useCallback((e) => {
        setStartDate(e.target.value)
    }, [])
    const endDateChange = useCallback((e) => {
        setEndDate(e.target.value)
    }, [])
    const ClearSearch = useCallback(() => {
        setSearchFlag(0)
        setStartDate(formatDateForInput(new Date()))
        setEndDate(formatDateForInput(new Date()))
        setDepartment(0)
        setdptSec(0)
        setClinic(true)
        setNonClinic(false)
        setsearchCrf('')
        setDisData(tableData)
        setApprovalRemarks([])
        setDataColFlag(0)
        setDataColData([])
    }, [tableData, setDisData])
    const changeSearchSelect = useCallback((e, newValue) => {
        setSearchFlag(newValue);
    }, [])

    const changeClinic = useCallback((e) => {
        if (e.target.checked === true) {
            setClinic(true)
            setNonClinic(false)
            // setAcademic(false)
        }
        else {
            setClinic(false)
            setNonClinic(true)
            // setAcademic(false)
        }
    }, [])
    const changeNonClinic = useCallback((e) => {
        if (e.target.checked === true) {
            setClinic(false)
            setNonClinic(true)
            // setAcademic(false)
        }
        else {
            setClinic(true)
            setNonClinic(false)
            // setAcademic(false)
        }
    }, [])
    // const changeAcademic = useCallback((e) => {
    //     if (e.target.checked === true) {
    //         setClinic(false)
    //         setNonClinic(false)
    //         setAcademic(true)
    //     }
    //     else {
    //         setClinic(true)
    //         setNonClinic(false)
    //         setAcademic(false)
    //     }
    // }, [])
    const changeCrfNo = useCallback((e) => {
        setsearchCrf(e.target.value)
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
        } else if (searchFlag === '2') {
            if (clinic === true) {
                const newData = tableData?.filter((val) => val.dept_type === 1)
                setDisData(newData)
            } else if (nonClinic === true) {
                const newData = tableData?.filter((val) => val.dept_type !== 1)
                setDisData(newData)
            }
            // else if (academic === true) {
            //     const newData = tableData?.filter((val) => val.dept_type === 3)
            //     setDisData(newData)
            // }
        }
        else if (searchFlag === '3') {
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
        else if (searchFlag === '4') {
            if (searchCrf === '') {
                infoNotify("Enter CRF No.")
            } else {
                const newData = tableData?.filter((val) => val.req_slno === parseInt(searchCrf))
                setDisData(newData)
            }
        }
    }, [tableData, startDate, endDate, searchFlag, clinic, nonClinic, department, dptSec, searchCrf, setDisData])

    const backtoHome = useCallback(() => {
        setFlag(0)
    }, [setFlag])

    const viewDetails = useCallback((reqSlno) => {
        const getApproItemDetails = async (reqSlno) => {
            try {
                const result = await axioslogin.get(`/CRFRegisterApproval/getItemListApproval/${reqSlno}`)
                const { success, data } = result.data
                if (success === 1) {
                    setModalData(data)
                    setModalOpen(true)
                    setModFlag(1)
                }
                else {
                    setModalData([])
                    setModalOpen(false)
                    setModFlag(0)
                }
            } catch (error) {
                warningNotify("Error fetching Items:", error)
                setModalData([])
                setModalOpen(false)
                setModFlag(0)
            }
        }
        getApproItemDetails(reqSlno)
        const newData = disData?.filter((val) => val.req_slno === reqSlno)
        setApprovalRemarks(newData)


        const checkDataCollectComplete = async (reqSlno) => {
            try {
                const result = await axioslogin.get(`/CRFRegisterApproval/DataCollectComplete/${reqSlno}`)
                const { success, data } = result.data
                if (success === 1) {
                    const yy = data && data.filter((val) => val.crf_dept_status === 1)
                    if (yy.length !== 0) {
                        const datas = yy.map((val) => {
                            const obj = {
                                crf_dept_remarks: val.crf_dept_remarks,
                                datagive_user: val.datagive_user,
                                data_entered: val.data_entered !== null ? val.data_entered.toLowerCase() : '',
                                reqest_one: val.reqest_one,
                                req_user: val.req_user !== null ? val.req_user.toLowerCase() : '',
                                create_date: val.create_date,
                                update_date: val.update_date,
                                crf_req_remark: val.crf_req_remark,
                                data_coll_image_status: val.data_coll_image_status,
                                crf_data_collect_slno: val.crf_data_collect_slno,
                            }
                            return obj
                        })
                        setDataColData(datas)
                        setDataColFlag(1)
                    }
                    else {
                        setDataColFlag(0)
                        setDataColData([])
                    }
                }
            } catch (error) {
                warningNotify("Error fetching Items:", error)
                setDataColFlag(0)
                setDataColData([])
            }
        }
        checkDataCollectComplete(reqSlno)

    }, [disData])

    const handleClose = useCallback(() => {
        setModalOpen(false)
        setModFlag(0)
        setModalData([])
    }, [setModalOpen])
    return (
        <Fragment>
            {/* <CustomBackDrop open={open} text="Please Wait" /> */}
            {modFlag === 1 ? <DashboardApprovalView modalData={modalData} handleClose={handleClose} open={modalopen}
                approvalRemarks={approvalRemarks} datacolflag={datacolflag} datacolData={datacolData} /> : null}
            <Box sx={{ height: window.innerHeight - 160, flexWrap: 'wrap', bgcolor: 'white', }}>
                <Paper variant='outlined' sx={{ bgcolor: 'white', pt: 0.5, height: 92 }}>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: 18, fontWeight: 550, color: '#41729F', ml: 1 }}>{heading}</Typography>
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
                                {allFlag === 1 ?
                                    <Select defaultValue="0" sx={{ width: 280, border: '1px solid #64b5f6', height: 20, color: '#1565c0', fontSize: 14 }}
                                        slotProps={{
                                            listbox: { placement: 'bottom-start' },
                                        }}
                                        placeholder="Search By"
                                        value={searchFlag}
                                        onChange={changeSearchSelect}
                                    >
                                        <Option value="1">Req. Date</Option>
                                        <Option value="2">Clinical / Non Clinical / Academic</Option>
                                        <Option value="3">Department / Department Section</Option>
                                        <Option value="4">CRF No.</Option>
                                    </Select> :
                                    <Select defaultValue="0" sx={{ width: 280, border: '1px solid #64b5f6', height: 20, color: '#1565c0', fontSize: 14 }}
                                        slotProps={{
                                            listbox: { placement: 'bottom-start' },
                                        }}
                                        placeholder="Search By"
                                        value={searchFlag}
                                        onChange={changeSearchSelect}
                                    >
                                        <Option value="1">Req. Date</Option>
                                        <Option value="3">Department / Department Section</Option>
                                        <Option value="4">CRF No.</Option>
                                    </Select>
                                }
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
                                            size={'md'}
                                            type='date'
                                            name={'endDate'}
                                            value={endDate}
                                            handleChange={endDateChange}
                                        />
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            : searchFlag === '2' ?
                                <Box sx={{ display: 'flex', pl: 2 }}>
                                    <Box sx={{ m: 0.5, pt: 0.7 }}>
                                        <CustomRadioButtonCmp
                                            label="Clinical"
                                            color="primary"
                                            size="md"
                                            checked={clinic}
                                            handleChange={changeClinic}
                                            className={{ color: '#1565c0' }}
                                        />
                                    </Box>
                                    <Box sx={{ m: 0.5, pt: 0.7 }}>
                                        <CustomRadioButtonCmp
                                            label="Non Clinical"
                                            color="primary"
                                            size="md"
                                            checked={nonClinic}
                                            handleChange={changeNonClinic}
                                            className={{ color: '#1565c0' }}
                                        />
                                    </Box>
                                    {/* <Box sx={{ m: 1, pt: 0.7 }}>
                                    <CssVarsProvider>
                                        <Radio label="Academic"
                                            color="primary"
                                            size="md"
                                            checked={academic}
                                            onChange={changeAcademic}
                                            sx={{ color: '#1565c0' }} />
                                    </CssVarsProvider>
                                </Box> */}
                                </Box>
                                : searchFlag === '3' ? <Box sx={{ display: 'flex', mt: 0.5, }}>
                                    <CRFDashboardDptSelect department={department} setDepartment={setDepartment}
                                        setdptSec={setdptSec} />
                                    {department !== 0 ?
                                        <Box sx={{ ml: 0.5 }}>
                                            <CRFDashboardDptSecSelect dptSec={dptSec} setdptSec={setdptSec} />
                                        </Box>

                                        : null}
                                </Box>
                                    : searchFlag === '4' ?
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
                                                    type='text'
                                                    name={'searchCrf'}
                                                    value={searchCrf}
                                                    handleChange={changeCrfNo}
                                                />
                                            </CssVarsProvider>

                                        </Box>
                                        : null}
                        {(searchFlag === '1' || searchFlag === '2' || searchFlag === '3' || searchFlag === '4') ?
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
                <Box sx={{ bgcolor: 'white', pt: 0.5, overflow: 'auto', }}>
                    {disData.length !== 0 ?
                        <Box sx={{ width: '100%' }}>
                            <Box display="flex" justifyContent="space-between" sx={{
                                bgcolor: '#41729F', flexWrap: 'nowrap', py: 0.5, position: 'sticky',
                                top: 0, zIndex: 1,
                            }}>
                                <Typography sx={{ width: 40, textAlign: 'center', fontWeight: 550, fontSize: 12, color: 'white' }}>Sl.No</Typography>
                                <Typography sx={{ width: 80, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Req.No</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Req.Date</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Dpt Section</Typography>
                                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Purpose</Typography>
                                <Typography sx={{ width: 250, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Justification</Typography>
                                <Typography sx={{ width: 200, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Location</Typography>
                                <Typography sx={{ width: 100, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white' }}>Expected Date</Typography>
                                <Typography sx={{ width: 150, textAlign: 'left', fontWeight: 550, fontSize: 12, color: 'white', mx: 0.5 }}>Approval Status</Typography>
                            </Box>
                            <Virtuoso
                                style={{ height: window.innerHeight - 282, width: '100%', }}
                                data={disData}
                                itemContent={(index, val) => (
                                    <React.Fragment key={index}>
                                        <Box display="flex" justifyContent="space-between" sx={{ borderBottom: '1px solid lightgrey', flexWrap: 'nowrap' }}>
                                            <Typography sx={{ width: 40, textAlign: 'center', fontSize: 12, my: 1 }}>{index + 1}</Typography>
                                            <Typography sx={{ width: 80, textAlign: 'left', fontSize: 12, my: 1 }}>{"CRF/TMC/" + val.req_slno}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.req_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                                            <Typography sx={{ width: 150, textAlign: 'left', fontSize: 12, my: 1, textTransform: 'capitalize' }}>{val.req_deptsec}</Typography>
                                            <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.actual_requirement}</Typography>
                                            <Typography sx={{ width: 250, textAlign: 'left', fontSize: 12, my: 1 }}>{val.needed}</Typography>
                                            <Typography sx={{ width: 200, textAlign: 'left', fontSize: 12, my: 1 }}>{val.location}</Typography>
                                            <Typography sx={{ width: 100, textAlign: 'left', fontSize: 12, my: 1 }}>{format(new Date(val.expected_date), 'dd-MM-yyyy')}</Typography>
                                            <Box sx={{
                                                width: 150, cursor: 'pointer', m: 0.5, display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', pr: 0.5,
                                            }} >
                                                < CssVarsProvider >
                                                    <IconButton
                                                        sx={{
                                                            fontSize: 12, height: '25px', minHeight: '25px', lineHeight: '1.2',
                                                            bgcolor: '#BFD7ED', width: '150px', my: 0.5,
                                                            '&:hover': {
                                                                bgcolor: '#BFD7ED',
                                                            },
                                                            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', borderRadius: 5,
                                                        }}
                                                        onClick={() => viewDetails(val.req_slno)}
                                                    >
                                                        {val.now_who}&nbsp;&nbsp;{val.now_who_status === 1 ? "Approved" : val.now_who_status === 2 ? "Rejected" :
                                                            val.now_who_status === 3 ? "On-Hold" : ""}
                                                    </IconButton>

                                                </CssVarsProvider>
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                )}
                            />
                        </Box>
                        :
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', fontSize: 30, opacity: 0.5,
                            pt: 10, color: 'grey'
                        }}>
                            No Report Found
                        </Box>
                    }
                </Box>
            </Box >
        </Fragment >
    )
}

export default memo(DetailedViewofCRF)