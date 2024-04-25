
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from 'src/views/Axios/Axios';
import moment from 'moment';
import { succesNotify } from 'src/views/Common/CommonCode';
import { useSelector } from 'react-redux';
import PatientsListTable from './PatientsListTable';
const PatientsListView = ({ setSearchFlag, dailyDate, count, setCount }) => {

    const [tableData, setTableData] = useState([])
    const [endoList, setEndoList] = useState([])
    const [endoFlag, setEndoFlag] = useState(0)
    const history = useHistory()
    const backtoHome = useCallback(() => {
        history.push('/Home/QIPatientMarking')
        setSearchFlag(0)
    }, [history, setSearchFlag])

    const id = useSelector((state) => {
        return state?.LoginUserData.empid
    })

    useEffect(() => {
        const viewdata = {
            from: moment(dailyDate).format('YYYY-MM-DD 00:00:00'),
            to: moment(dailyDate).format('YYYY-MM-DD 23:59:59'),
        }
        const getPatientList = async () => {
            const result = await axioslogin.post('/qiendoscopy/viewList', viewdata)
            return result.data
        }
        getPatientList().then((value) => {
            const { success, data } = value
            if (success === 1) {
                setTableData(data)
            }
            else {
            }
        })
    }, [dailyDate, count])



    const ChangeStatus = async (e, val) => {
        if (e === true) {
            let viewselect = tableData.map((value) => {
                return value.qi_endo_slno === val.qi_endo_slno ? { ...value, endo_status: 1, } : value
            })
            setTableData(viewselect)
        }
        else {
            let viewselect = tableData.map((value) => {
                return value.qi_endo_slno === val.qi_endo_slno ? { ...value, endo_status: 0, } : value
            })
            setTableData(viewselect)

        }
    }
    const UpdateDetails = useCallback(() => {
        const NewArray = tableData.filter((val) => {
            return val.endo_status === 1
        })

        const updateArray = NewArray?.map((val) => {
            return {
                endo_status: val.endo_status,
                edit_user: id,
                qi_endo_slno: val.qi_endo_slno,
            }

        })
        const UpadatetData = async (updateArray) => {
            const result = await axioslogin.patch('/qiendoscopy/update', updateArray);
            return result.data
        }
        UpadatetData(updateArray).then((val) => {
            const { success, message } = val
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
            }
            else {
            }
        })
    }, [count, tableData, id, setCount])

    const ViewEndoQiDetails = useCallback(() => {
        const viewdata = {
            from: moment(dailyDate).format('YYYY-MM-DD 00:00:00'),
            to: moment(dailyDate).format('YYYY-MM-DD 23:59:59'),
        }
        const getPatientList = async () => {
            const result = await axioslogin.post('/qiendoscopy/view', viewdata)
            return result.data
        }
        getPatientList().then((value) => {
            const { success, data } = value
            if (success === 1) {
                setEndoList(data)
                setEndoFlag(1)
            }
            else {
                setEndoList([])
                setEndoFlag(0)
            }
        })
    }, [dailyDate])

    return (
        <Box>
            {
                endoFlag === 1 ? <PatientsListTable endoList={endoList} /> :
                    <Paper variant='outlined' square >
                        <Box sx={{ height: 38 }}>
                            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'flex-end', fontSize: 20, pt: 0.2, pr: 0.5 }}>
                                <HighlightOffIcon sx={{ cursor: 'pointer', height: 35, width: 35, opacity: 0.7 }} onClick={backtoHome} />
                            </Box>
                        </Box>
                        <Box>
                            <Box variant="outlined" sx={{ overflow: 'auto', }}>
                                <TableContainer sx={{ maxHeight: window.innerHeight - 210 }}>
                                    <Table size='md' stickyHeader padding={"none"}  >
                                        <TableHead >
                                            <TableRow sx={{ height: 40 }} >
                                                <TableCell sx={{ width: 50, border: '1px solid lightgrey', textAlign: 'center' }}> Sl.No</TableCell>
                                                <TableCell sx={{ width: 100, border: '1px solid lightgrey', borderLeft: 'none', pl: 2, textAlign: 'center' }}>Patient ID</TableCell>
                                                <TableCell sx={{ width: 150, border: '1px solid lightgrey', borderLeft: 'none', pl: 2, textAlign: 'center' }}>Patient Name</TableCell>
                                                <TableCell sx={{ width: 100, border: '1px solid lightgrey', borderLeft: 'none', pl: 2, textAlign: 'center' }}>Age/Gender</TableCell>
                                                <TableCell sx={{ width: 100, border: '1px solid lightgrey', borderLeft: 'none', pl: 2, textAlign: 'center' }}>Doctor Name</TableCell>
                                                <TableCell sx={{ width: 100, border: '1px solid lightgrey', borderLeft: 'none', pl: 2, textAlign: 'center' }}>Arrival Time</TableCell>
                                                <TableCell sx={{ width: 50, border: '1px solid lightgrey', borderLeft: 'none', borderRight: '1px solid grey', textAlign: 'center' }}>Endoscopy Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody >
                                            {tableData?.map((val, index) => {
                                                return <TableRow key={val.qi_endo_slno}>
                                                    <TableCell sx={{ fontSize: 13, borderLeft: '1px solid lightgrey', borderRight: '1px solid lightgrey', textAlign: 'center' }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, pl: 2, borderRight: '1px solid lightgrey' }}>{val.endo_ptno}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, pl: 2, borderRight: '1px solid lightgrey' }}>{val.endo_ptname}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, pl: 2, borderRight: '1px solid lightgrey' }}>{val.endo_ptage + ' / ' + val.endo_ptsex}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, pl: 2, borderRight: '1px solid lightgrey' }}>{val.doctor_name}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, pl: 2, borderRight: '1px solid lightgrey' }}>{moment(new Date(val.qi_endo_date)).format('DD-MM-YYYY HH:mm:ss')}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, pt: 1, pl: 2, borderRight: '1px solid lightgrey', textAlign: 'center' }}>
                                                        <input type="checkbox"
                                                            border='0.5px solid  #C4C4C4'
                                                            style={{
                                                                width: 16,
                                                                height: 16,
                                                            }}
                                                            checked={val.endo_status === 1 ? true : false}
                                                            onChange={(e) => {
                                                                ChangeStatus(e.target.checked, val)
                                                            }}
                                                        >
                                                        </input>

                                                    </TableCell>
                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{ pt: 0.5, pr: 0.5 }}>
                                    <Button sx={{
                                        fontSize: 15, cursor: 'pointer', color: 'white', height: 35, width: 300,
                                        bgcolor: '#616161', border: '1px solid lightgrey', borderRight: 'none', borderRadius: 1,
                                        ":hover": {
                                            bgcolor: '#757575',
                                            boxShadow: 2,
                                        }
                                    }}
                                        onClick={ViewEndoQiDetails}
                                    >
                                        View Endoscopy Patient List
                                    </Button>
                                </Box>
                                <Box sx={{ pt: 0.5, pr: 5 }}>
                                    <Button sx={{
                                        fontSize: 15, cursor: 'pointer', color: 'white', height: 35, width: 100,
                                        bgcolor: '#616161', border: '1px solid lightgrey', borderRight: 'none', borderRadius: 1,
                                        ":hover": {
                                            bgcolor: '#757575',
                                            boxShadow: 2,
                                        }
                                    }}
                                        onClick={UpdateDetails}
                                    >
                                        UPDATE
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper >
            }
        </Box >
    )
}

export default memo(PatientsListView)