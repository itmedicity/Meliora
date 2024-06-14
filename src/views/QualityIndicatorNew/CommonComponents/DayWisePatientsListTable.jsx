import { Box, CssVarsProvider, Table, Tooltip } from '@mui/joy'
import React, { useCallback, useState } from 'react'
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import ModalDayWiseQIView from '../EndoscopyQIMarking/ModalDayWiseQIView';
import { format } from 'date-fns';

const DayWisePatientsListTable = ({ viewData, qitype }) => {
    const [qiflag, setQiflag] = useState(0)
    const [modalopen, setModalOpen] = useState(false)
    const [rowSelect, setrowSelect] = useState([])

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

    return (
        <Box>
            {qiflag === 1 ? <ModalDayWiseQIView open={modalopen} handleClose={handleClose} rowSelect={rowSelect} /> : null}
            <Box variant="outlined" sx={{ overflow: 'auto', maxHeight: window.innerHeight - 270, padding: 'none' }}>
                <CssVarsProvider>
                    <Table aria-label="table with sticky header" borderAxis="both" padding={"none"} stickyHeader size='sm' stickyFooter hoverRow >
                        <thead style={{ alignItems: 'center' }}>
                            <tr style={{ height: 0.5 }}>
                                <th size='sm' style={{ width: 50, fontWeight: 650, fontSize: 14, textAlign: 'center' }}>&nbsp; Sl.No</th>
                                <th size='sm' style={{ width: 75, fontWeight: 650, fontSize: 14 }}>&nbsp;Patient ID</th>
                                <th size='sm' style={{ width: 150, fontWeight: 650, fontSize: 14 }}>&nbsp;Patient Name</th>
                                <th size='sm' style={{ width: 100, fontWeight: 650, fontSize: 14 }}>&nbsp;Age/Gender</th>
                                <th size='sm' style={{ width: 80, fontWeight: 650, fontSize: 14 }}>&nbsp;Contacts </th>
                                <th size='sm' style={{ width: 170, fontWeight: 650, fontSize: 14 }}>&nbsp;Doctor Name</th>
                                <th size='sm' style={{ width: 150, fontWeight: 650, fontSize: 14 }}>&nbsp;Arrival Time </th>
                                <th size='sm' style={{ width: 80, fontWeight: 650, fontSize: 14, textAlign: 'center' }}>&nbsp;View QI </th>
                            </tr>
                        </thead>
                        <tbody size='small'>
                            {viewData?.map((val, index) => {
                                return (< tr key={val.qi_slno} size='small'
                                    style={{ maxHeight: 2, cursor: 'pointer' }}  >
                                    <td size='sm' style={{ fontSize: 12, height: 5, textAlign: 'center' }}>{index + 1}</td>
                                    <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptno}</td>
                                    <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptname}</td>
                                    <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptage + ' / ' + val.ptsex}</td>
                                    <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{val.ptmobile}</td>
                                    <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{"Dr. " + val.doctor_name}</td>
                                    <td size='sm' style={{ fontSize: 12, height: 5 }}>&nbsp;{format(new Date(val.patient_arrived_date), 'dd-MM-yyyy hh:mm a')}</td>
                                    <td size='sm' style={{ textAlign: 'center', height: 5 }}>
                                        <CssVarsProvider>
                                            <Tooltip title="QI Details" placement='left'>
                                                <VisibilityTwoToneIcon
                                                    sx={{
                                                        color: '#667C30',
                                                        ":hover": {
                                                            // color: '#667C30'
                                                            color: '#384910'
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
        </Box>
    )
}

export default DayWisePatientsListTable