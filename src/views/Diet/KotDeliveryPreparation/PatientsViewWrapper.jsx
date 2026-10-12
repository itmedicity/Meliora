import React from 'react'
import PatientsView from './PatientsView'
import { Box } from '@mui/joy'

const PatientsViewWrapper = ({ patientsByDiet, setOpenModal, setSelectedPatient }) => {
    if (!patientsByDiet.length) {
        return (
            <Box
                sx={{
                    // mt: 1,
                    p: 1,
                    borderRadius: 6,
                    bgcolor: '#fff3f3',
                    border: '1px dashed #ffb3b3',
                    fontSize: 13
                }}
            >
                No patients found for this diet
            </Box>
        )
    }

    return <PatientsView
        setOpenModal={setOpenModal}
        setSelectedPatient={setSelectedPatient}
        filteredPatients={patientsByDiet}
    />
}

export default PatientsViewWrapper


