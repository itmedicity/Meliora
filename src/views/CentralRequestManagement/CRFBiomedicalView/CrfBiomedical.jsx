import { Box, CssVarsProvider, IconButton, Input, Typography } from '@mui/joy'
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import CustomCloseIconCmp from '../ComonComponent/Components/CustomCloseIconCmp';
import moment from 'moment';
import { format } from 'date-fns';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import MasterComponent from './Components/MasterComponent';
import { Virtuoso } from 'react-virtuoso';

const CrfBiomedical = () => {
    const history = useHistory();
    const [tableData, setTableData] = useState([])
    const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [open, setOpen] = useState(false)

    const backToSetting = useCallback(() => {
        history.push(`/Home`)
    }, [history])

    const handleStartDateChange = useCallback((e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
        if (endDate && new Date(endDate) < new Date(newStartDate)) {
            setEndDate('');
            return;
        }
        if (endDate && new Date(endDate) < new Date(newStartDate)) {
            infoNotify('End date cannot be earlier than the start date.');
            return;
        }
    }, [endDate]);

    const handleEndDateChange = useCallback((e) => {
        setEndDate(e.target.value);
    }, []);

    const searchCrf = useMemo(() => {
        return {
            from: format(new Date(startDate), 'yyyy-MM-dd 00:00:00'),
            to: format(new Date(endDate), 'yyyy-MM-dd 23:59:59'),
        }
    }, [startDate, endDate])
    const searchCRFDetails = useCallback(async (e) => {
        e.preventDefault();
        setOpen(true)
        const getcrfBiomedical = async (searchCrf) => {
            const result = await axioslogin.post('/newCRFRegister/biomedicalView', searchCrf)
            const { success, data, message } = result.data;
            if (success === 1) {
                const datas = data?.map((val) => {
                    const obj = {
                        req_status: val.req_status,
                        req_slno: val.req_slno,
                        actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Nil',
                        needed: val.needed !== null ? val.needed : 'Nil',
                        req_deptsec: val.req_deptsec.toLowerCase(),
                        user_deptsection: val.user_deptsection.toLowerCase(),
                        em_name: val.create_user.toLowerCase(),
                        emer_type_name: val.emer_type_name,
                        emer_type_escalation: val.emer_type_escalation,
                        request_deptsec_slno: val.request_deptsec_slno,
                        location: val.location,
                        emergeny_remarks: val.emergeny_remarks,
                        expected_date: val.expected_date,
                        image_status: val.image_status,
                        emergency_flag: val.emergency_flag,
                        emer_slno: val.emer_slno,
                        req_date: val.req_date,
                        dept_name: val.dept_name,
                        dept_type: val.dept_type,
                        dept_id: val.dept_id,
                        dept_type_name: val.dept_type === 1 ? 'Clinical' : val.dept_type === 2 ? 'Non Clinical' : 'Academic',
                        user_deptsec: val.user_deptsec,
                        category: val.category_name
                    }
                    return obj
                })
                setTableData(datas)
                setOpen(false)
            } else {
                warningNotify(message)
                setOpen(false)
            }
        }
        getcrfBiomedical(searchCrf)
    }, [searchCrf])


    const buttonStyle = {
        border: '1px solid #bbdefb', width: '100%',
        fontSize: 13, height: 36, lineHeight: '1.2', color: '#1D617A',
        bgcolor: 'white', borderRadius: 6,
        '&:hover': {
            bgcolor: 'white',
            color: '#1976d2'
        },
    }

    return (
        <Fragment>
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', }}>
                <Box sx={{ display: 'flex', backgroundColor: "#f0f3f5", border: '1px solid #B4F5F0' }}>
                    <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: .5, color: '#385E72', }}>CRF Details</Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
                        <CssVarsProvider>
                            <CustomCloseIconCmp
                                handleChange={backToSetting}
                            />
                        </CssVarsProvider>
                    </Box>
                </Box>
                <Box sx={{
                    width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', py: 2,
                    border: '1px solid #B4F5F0', borderTop: 'none'
                }}>
                    <Box sx={{ display: 'flex', width: { xs: '100%', md: '60vw', lg: '50vw', xl: '50vw', flexWrap: 'wrap', } }}>
                        <Box sx={{ display: 'flex', flex: 1, gap: 0.5, }}>
                            {['Start Date', 'End Date'].map((label, idx) => (
                                <CssVarsProvider key={label}>
                                    <Input
                                        startDecorator={
                                            <Typography sx={{ fontSize: 14, color: '#1D617A', fontWeight: 550, pr: 0.5 }}>
                                                {label}
                                            </Typography>
                                        }
                                        sx={{
                                            height: 25, borderRadius: 6, border: '1px solid #bbdefb', width: '100%',
                                            color: '#0d47a1', fontSize: 14
                                        }}
                                        size="md"
                                        type="date"
                                        name={idx === 0 ? 'startDate' : 'endDate'}
                                        value={idx === 0 ? startDate : endDate}
                                        onChange={idx === 0 ? handleStartDateChange : handleEndDateChange}
                                        slotProps={{
                                            input: {
                                                min: idx === 1 ? startDate : undefined,
                                                max: moment(new Date()).format('YYYY-MM-DD')
                                            }
                                        }}
                                    />
                                </CssVarsProvider>
                            ))}
                        </Box>
                        <Box sx={{ flex: 0.3, pl: 1.5, }}>
                            <CssVarsProvider>
                                <IconButton
                                    sx={buttonStyle}
                                    onClick={searchCRFDetails}
                                >
                                    Search
                                </IconButton>
                            </CssVarsProvider>
                        </Box>
                    </Box>

                </Box>
                <Box sx={{ height: window.innerHeight - 210, overflow: 'auto', flexWrap: 'wrap', bgcolor: 'white' }}>
                    {tableData.length !== 0 ?
                        <Virtuoso
                            data={tableData}
                            totalCount={tableData?.length}
                            itemContent={(index, val) =>
                                <Box key={index} sx={{
                                    mb: 0.4,
                                    width: "100%", flexWrap: 'wrap', border: '1px solid #21B6A8', borderRadius: 2,
                                }}>
                                    <MasterComponent val={val} />
                                </Box>
                            }
                        >
                        </Virtuoso>
                        :
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', fontSize: 25, opacity: 0.5,
                            pt: 10, color: 'grey'
                        }}>
                            No Report Found
                        </Box>}
                </Box>
            </Box>
        </Fragment >
    )
}
export default memo(CrfBiomedical)