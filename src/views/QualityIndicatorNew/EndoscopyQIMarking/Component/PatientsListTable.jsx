
import React, { Fragment, memo, useCallback, useState } from 'react'
import { Paper } from '@mui/material'
import ListIcon from '@mui/icons-material/List';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useSelector } from 'react-redux';
import { Box, CssVarsProvider, Table, Tooltip, Typography } from '@mui/joy';
import { format } from 'date-fns';
import EndoscopyModalForQI from './EndoscopyModalForQI';
import { AddorRemovePatients } from './AddorRemovePatients';
const PatientsListTable = ({ qiMarkedList, count, setCount, dailyDate, depName, qidept, qitype, RefreshData }) => {
    const [qiflag, setQiflag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [rowSelect, setrowSelect] = useState([])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })
    const IndicatorsView = useCallback((val) => {
        setModalOpen(true)
        setrowSelect(val)
        if (qitype === 1) {
            setQiflag(1)
        }
        else {
        }
    }, [qitype])
    const handleClose = useCallback(() => {
        setModalOpen(false)
        setQiflag(0)
    }, [setModalOpen])

    const RemoveFromList = useCallback((val) => {
        if (qitype !== 0) {
            const { qi_slno } = val
            const updateArray = {
                qi_status: 0,
                edit_user: id,
                qi_slno: qi_slno
            }
            const UpdatePatients = async (setCount) => {
                await AddorRemovePatients(updateArray, qitype, count, setCount)
            }
            UpdatePatients(setCount)
        }
    }, [count, id, setCount, qitype])

    return (
        <Fragment>
            {qiflag === 1 ? <EndoscopyModalForQI open={modalopen} setQiflag={setQiflag} handleClose={handleClose} rowSelect={rowSelect}
                count={count} setCount={setCount} dailyDate={dailyDate} depName={depName} qidept={qidept} RefreshData={RefreshData}
            />
                : null}
            < Paper variant='outlined' square >
                <Box sx={{ display: 'flex', flex: 1, height: 35 }}>
                    <Box sx={{ pl: 0.7, pt: 0.4 }} >
                        <ListIcon sx={{ color: '#37474f', height: 30, width: 30 }} />
                    </Box>
                    <Box sx={{ flex: 1, fontSize: 17, pt: 0.7, pl: 0.5, }}>
                        <Typography sx={{ color: '#37474f', fontFamily: 'Arial' }}>
                            Endoscopy Patient&apos;s List
                        </Typography>
                    </Box>
                </Box>
                <Box variant="outlined" sx={{ overflow: 'auto', height: '39vh', '&::-webkit-scrollbar': { height: 8 } }}>
                    <CssVarsProvider>
                        <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                            <thead style={{ alignItems: 'center' }}>
                                <tr style={{ height: 0.5 }}>
                                    <th size='sm' style={{ width: 70, backgroundColor: '#78909c', color: 'white', fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                    <th size='sm' style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Patient ID</th>
                                    <th size='sm' style={{ width: 170, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Patient Name</th>
                                    <th size='sm' style={{ width: 120, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Age/Gender</th>
                                    <th size='sm' style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Contacts </th>
                                    <th size='sm' style={{ width: 190, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Doctor Name</th>
                                    <th size='sm' style={{ width: 70, backgroundColor: '#78909c', color: 'white', fontSize: 14, textAlign: 'center' }}>&nbsp;Token </th>
                                    <th size='sm' style={{ width: 150, backgroundColor: '#78909c', color: 'white', fontSize: 14 }}>&nbsp;Arrival Time </th>
                                    <th size='sm' style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14, textAlign: 'center' }}>&nbsp;Back to List </th>
                                    <th size='sm' style={{ width: 100, backgroundColor: '#78909c', color: 'white', fontSize: 14, textAlign: 'center' }}>&nbsp;QI Marking </th>
                                </tr>
                            </thead>
                            <tbody size='small'>
                                {qiMarkedList?.map((val, index) => {
                                    return (< tr key={val.qi_slno} size='small'
                                        style={{
                                            maxHeight: 2, cursor: 'pointer', background: (val.qi_save_status === 1) ? '#cfd8dc' : 'transparent'
                                        }}  >
                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{index + 1}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptno}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptname}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptage + ' / ' + val.ptsex}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptmobile}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{"Dr. " + val.doctor_name}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>&nbsp;{val.visit_token}</td>
                                        <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{format(new Date(val.patient_arrived_date), 'dd-MM-yyyy hh:mm a')}</td>
                                        <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                            <CssVarsProvider>
                                                {val.qi_save_status === 1 ?
                                                    <Tooltip title="QI Marked" placement='left'>
                                                        < ArrowCircleLeftIcon
                                                            disabled
                                                            sx={{
                                                                color: '#607d8b',
                                                            }}
                                                        />
                                                    </Tooltip>
                                                    :
                                                    <Tooltip title="Back to List" placement='left'>
                                                        < ArrowCircleLeftIcon sx={{
                                                            color: '#607d8b',
                                                            ":hover": {
                                                                color: '#37474f',
                                                            }
                                                        }}
                                                            onClick={(e) => RemoveFromList(val)}
                                                        />
                                                    </Tooltip>
                                                }
                                            </CssVarsProvider>
                                        </td>
                                        <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                            <CssVarsProvider>
                                                <Tooltip title="QI Marking" placement='left'>
                                                    <CheckCircleOutlineIcon
                                                        sx={{
                                                            color: '#546e7a',
                                                            ":hover": {
                                                                color: '#263238',
                                                            }
                                                        }}
                                                        onClick={(e) => IndicatorsView(val)}
                                                    />
                                                </Tooltip>
                                            </CssVarsProvider>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </CssVarsProvider>
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(PatientsListTable)