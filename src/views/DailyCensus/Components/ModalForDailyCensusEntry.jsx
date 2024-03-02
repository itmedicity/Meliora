import { Box, Button, CssVarsProvider, Modal, ModalDialog, Tooltip, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';

const ModalForDailyCensusEntry = ({ open, handleClose, dailyDate, nsName, nsNo, yestCount, count, setCount }) => {
    const [existFlag, setExistFlag] = useState(0)
    const [total, settotal] = useState(0)

    const [censusDetails, setSensusDetails] = useState({
        census_slno: 0,
        admission: 0,
        discharge: 0,
        transferIn: 0,
        transferOut: 0,
        death: 0
    })
    const { census_slno, admission, discharge, transferIn, transferOut, death } = censusDetails

    const UpdateSensusDetails = useCallback((e) => {
        const containsOnlyDigits = (value) => /^\d+$/.test(value);
        const inputdata = (e.target.value);
        if (inputdata !== '' && !containsOnlyDigits(inputdata)) {
            infoNotify("Please enter data with digits only");
            return;
        }
        else {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            setSensusDetails({ ...censusDetails, [e.target.name]: value })
        }
    }, [censusDetails])
    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    useEffect(() => {
        const existSearch = {
            census_ns_slno: nsNo,
            census_date: moment(new Date(dailyDate)).format('YYYY-MM-DD')
        }

        const GetTodayData = async (existSearch) => {
            const result = await axioslogin.post('/qidailycensus/exist', existSearch);
            const { success, data } = result.data;
            if (success === 1) {
                setExistFlag(1)
                const { census_slno, total_admission, total_discharge, transfer_in, transfer_out,
                    total_death, census_total } = data[0]
                const fromdata = {
                    census_slno: census_slno,
                    admission: total_admission,
                    discharge: total_discharge,
                    transferIn: transfer_in,
                    transferOut: transfer_out,
                    death: total_death
                }

                setSensusDetails(fromdata)
                settotal(census_total)
            }
            else {
                setExistFlag(0)
                const fromdata = {
                    admission: 0,
                    discharge: 0,
                    transferIn: 0,
                    transferOut: 0,
                    death: 0
                }
                setSensusDetails(fromdata);
                settotal(yestCount)
            }
        }
        GetTodayData(existSearch)
    }, [nsNo, dailyDate, yestCount])

    const reset = useCallback(() => {
        const formreset = {
            census_slno: 0,
            admission: 0,
            discharge: 0,
            transferIn: 0,
            transferOut: 0,
            death: 0,
        }
        setSensusDetails(formreset);
        settotal(0)

        setExistFlag(0)
        handleClose()
    }, [handleClose])
    const ResetDetails = useCallback(() => {
        reset()
    }, [reset])
    const postdata = useMemo(() => {
        return {
            census_ns_slno: nsNo,
            census_date: dailyDate,
            yesterday_census: yestCount,
            total_admission: admission === '' ? 0 : admission,
            total_discharge: discharge === '' ? 0 : discharge,
            transfer_in: transferIn === '' ? 0 : transferIn,
            transfer_out: transferOut === '' ? 0 : transferOut,
            total_death: death === '' ? 0 : death,
            census_total: total,
            create_user: id
        }
    }, [nsNo, dailyDate, yestCount, admission, discharge, transferIn, transferOut, death, total, id])

    const patchdata = useMemo(() => {
        return {
            census_ns_slno: nsNo,
            census_date: dailyDate,
            yesterday_census: yestCount,
            total_admission: admission,
            total_discharge: discharge,
            transfer_in: transferIn,
            transfer_out: transferOut,
            total_death: death,
            census_total: total,
            edit_user: id,
            census_slno: census_slno
        }
    }, [nsNo, dailyDate, yestCount, admission, discharge, transferIn, transferOut, death, total, id, census_slno])

    const SaveDetails = useCallback((e) => {
        if (total < 0) {
            infoNotify("Total No.Of Patients Not Lessthan zero")
        }
        else {
            const InsertData = async (postdata) => {
                const result = await axioslogin.post('/qidailycensus/save', postdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                }
                else {
                    infoNotify(message)
                }
            }
            const UpdateData = async (patchdata) => {
                const result = await axioslogin.patch('/qidailycensus/update', patchdata);
                const { message, success } = result.data;
                if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                }
                else {
                    infoNotify(message)
                }
            }

            if (existFlag === 0) {
                InsertData(postdata)
            } else {
                UpdateData(patchdata)
            }
        }

    }, [postdata, reset, existFlag, patchdata, count, setCount, total])

    useEffect(() => {
        settotal((yestCount + (admission - discharge) + (transferIn - transferOut) - death))

    }, [yestCount, admission, discharge, transferIn, transferOut, death])

    return (
        <Fragment>
            <CssVarsProvider>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                >
                    <ModalDialog variant="none"
                        sx={{
                            width: '50vw',
                            borderRadius: 'md',
                        }}
                    >
                        <Paper sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex', flex: 0.5, fontSize: 18, pt: 0.8, justifyContent: 'flex-start', pl: 1, bgcolor: '#DBE8D8' }}>
                                <Typography sx={{ color: 'darkgreen' }}>{moment(new Date(dailyDate)).format('DD-MM-YYYY')}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1.5, fontSize: 18, pt: 0.8, justifyContent: 'center', bgcolor: '#DBE8D8' }}>
                                <Typography sx={{ color: 'darkgreen', textTransform: 'capitalize' }}>{nsName}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 0.5, justifyContent: 'flex-end', fontSize: 20, pt: 0.3, pl: 0.5, bgcolor: '#DBE8D8' }}>
                                <CusIconButton size="sm" variant="outlined" color="primary" style={{ borderRadius: 12, bgcolor: '#F7F8F8', opacity: 0.8 }} >
                                    <Tooltip title="Close" placement="bottom" >
                                        <CloseIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: 'darkgreen' }}
                                            onClick={handleClose} />
                                    </Tooltip>
                                </CusIconButton>
                            </Box>
                        </Paper>
                        <Box sx={{ overflow: 'auto', bgcolor: '#f5f5f5' }}>
                            <Box sx={{ display: 'flex', px: 3, }}>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography sx={{ color: '#088280' }}>Yesterday Census</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                        <TextFieldCustom
                                            disabled
                                            size="md"
                                            type="text"
                                            name="yestCount"
                                            value={yestCount}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography sx={{ color: '#088280' }}>Admissions</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.5 }}>
                                        <TextFieldCustom
                                            size="md"
                                            type="text"
                                            name="admission"
                                            value={admission}
                                            onchange={UpdateSensusDetails}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', px: 3, pt: 1 }}>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography sx={{ color: '#088280' }}>Discharge</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.5 }}>
                                        <TextFieldCustom
                                            size="md"
                                            type="text"
                                            name="discharge"
                                            value={discharge}
                                            onchange={UpdateSensusDetails}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography sx={{ color: '#088280' }}>Transfer In</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.5 }}>
                                        <TextFieldCustom
                                            size="md"
                                            type="text"
                                            name="transferIn"
                                            value={transferIn}
                                            onchange={UpdateSensusDetails}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', px: 3, pt: 1 }}>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography sx={{ color: '#088280' }}>Transfer Out</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.5 }}>
                                        <TextFieldCustom
                                            size="md"
                                            type="text"
                                            name="transferOut"
                                            value={transferOut}
                                            onchange={UpdateSensusDetails}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 1, pl: 1 }} >
                                    <Box sx={{ pl: 1 }}>
                                        <Typography sx={{ color: '#088280' }}>Death</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.5 }}>
                                        <TextFieldCustom
                                            size="md"
                                            type="text"
                                            name="death"
                                            value={death}
                                            onchange={UpdateSensusDetails}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', px: 3, py: 1 }}>
                                <Box sx={{ flex: 0.5, }} ></Box>
                                <Box sx={{ flex: 1, }} >
                                    <Box sx={{ pl: 1, display: 'flex', justifyContent: 'center' }}>
                                        <Typography sx={{ color: '#088280' }}>Total</Typography>
                                    </Box>
                                    <Box sx={{ pt: 0.5, fontWeight: 650 }}>
                                        <TextFieldCustom
                                            disabled
                                            size="md"
                                            type="text"
                                            name="total"
                                            value={total}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{ flex: 0.5 }} ></Box>
                            </Box>
                        </Box>
                        <Paper sx={{ display: 'flex', justifyContent: 'flex-end', bgcolor: '#DBE8D8' }}>
                            {
                                existFlag === 0 ?
                                    <Box sx={{ pr: 0.4, py: 0.4 }}>
                                        <CssVarsProvider>
                                            <Button variant="outlined" sx={{
                                                fontSize: 16, color: '#2C5E1A', width: 100, cursor: 'pointer',
                                                borderRadius: 14, bgcolor: '#F7F8F8'
                                            }}
                                                onClick={SaveDetails}
                                            >
                                                Save
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                                    :
                                    <Box sx={{ pr: 0.4, py: 0.4 }}>
                                        <CssVarsProvider>
                                            <Button variant="outlined" sx={{
                                                fontSize: 16, color: '#2C5E1A', width: 100, cursor: 'pointer',
                                                borderRadius: 14, bgcolor: '#F7F8F8'
                                            }}
                                                onClick={SaveDetails}
                                            >
                                                Update
                                            </Button>
                                        </CssVarsProvider>
                                    </Box>
                            }
                            <Box sx={{ pr: 1, py: 0.4 }}>
                                <CssVarsProvider>
                                    <Button variant="outlined" sx={{
                                        fontSize: 16, color: '#2C5E1A', width: 100, cursor: 'pointer',
                                        borderRadius: 14, bgcolor: '#F7F8F8'
                                    }}
                                        onClick={ResetDetails}
                                    >
                                        Reset
                                    </Button>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </ModalDialog>
                </Modal>
            </CssVarsProvider>
        </Fragment >
    )
}

export default memo(ModalForDailyCensusEntry)