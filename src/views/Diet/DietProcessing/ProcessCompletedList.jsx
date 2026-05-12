import React, { memo, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import { bodyCell, headerCell, rowStyle } from '../CommonData/Common'
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak'
import DietButton from '../DietComponent/DietButton'
import NotProcessed from './NotProcessed'
import { warningNotify } from 'src/views/Common/CommonCode'
import PatientScheduleCancelModal from '../DietModal/PatientScheduleCancelModal'



const ProcessCompletedList = ({
    processedRows,
    fetchscheduled,
    fetchactive
}) => {

    const [open, setOpen] = useState(false)
    const [selectedpatient, setSelectedPatient] = useState({})

    const filteredList = useMemo(() => {
        return processedRows
    }, [processedRows])


    /** SINGLE ROW PROCESS */
    const HandleCancelPatientType = (Patient) => {
        if (!Patient.patient_diet_id) return warningNotify("Patient Id is Missing!");
        setOpen(true)
        setSelectedPatient(Patient)
    }

    return (
        <Box sx={{ width: '100%', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            {/* HEADER */}
            <Box sx={{ ...rowStyle, backgroundColor: '#7c51a1', borderBottom: '1px solid #ddd' }}>
                <Box sx={{ width: 70, fontWeight: 600, fontSize: 13, color: 'white' }}>Sl No</Box>
                <Box sx={headerCell}>Diet Name</Box>
                <Box sx={headerCell}>Patient Name</Box>
                <Box sx={headerCell}>Process Date</Box>
                <Box sx={headerCell}>Type</Box>
                <Box sx={headerCell}>Status</Box>
                <Box sx={headerCell}>Cancel</Box>
            </Box>

            {/* BODY */}
            <Box sx={{ maxHeight: 720, overflowY: 'auto', backgroundColor: '#fff', }}>
                {filteredList?.length === 0 && <NotProcessed />}

                {
                    filteredList?.map((row, index) => {
                        return (
                            <Box
                                key={row?.patient_diet_id}
                                sx={{
                                    ...rowStyle,
                                    borderBottom: '1px solid #f0f0f0',
                                    '&:hover': { backgroundColor: '#fafafa' }
                                }}
                            >
                                <Box sx={{ width: 70, fontSize: 12 }}>{index + 1}</Box>
                                <Box sx={bodyCell}>{row?.diet_name}</Box>
                                <Box sx={bodyCell}>{row?.patient_name}</Box>
                                <Box sx={bodyCell}>{row?.process_date}</Box>
                                <Box sx={bodyCell}>{row?.type_desc}</Box>
                                <Box sx={bodyCell}>{row?.schedule_status}</Box>
                                <Box sx={bodyCell}>
                                    <DietButton
                                        width={40}
                                        onClick={() => HandleCancelPatientType(row)}
                                        // disabled={!isRowSelected && !isProcessed || isProcessingRow}
                                        name={''}
                                        icon={InsertPageBreakIcon}
                                    /></Box>

                            </Box>
                        )
                    })}

                <PatientScheduleCancelModal
                    open={open}
                    onClose={() => setOpen(false)}
                    patient={selectedpatient}
                    fetchscheduled={fetchscheduled}
                    fetchactive={fetchactive}
                // onConfirm={(data) => HandlePatientMealcancellation(data)}
                />

            </Box>
        </Box>
    )
}

export default memo(ProcessCompletedList)
