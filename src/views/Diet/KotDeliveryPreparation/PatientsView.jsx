import React, { } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Box } from '@mui/joy'
import DietTextComponent from '../DietComponent/DietTextComponent'
import PatientCardTable from './NewDesignKotDelivery/PatientCardTable'

const PatientsView = ({ filteredPatients = [], setOpenModal, setSelectedPatient }) => {


    return (
        <Box sx={{ mt: 1 }}>
            <DietTextComponent
                size={15}
                value={`Patients (${filteredPatients.length})`}
                color="#5a2d82"
            />

            <AnimatePresence>

                <PatientCardTable
                    data={filteredPatients}
                    onView={(row) => {
                        setSelectedPatient(row);
                        setOpenModal("view");
                    }}
                    onCancel={(row) => {
                        setSelectedPatient(row);
                        setOpenModal("cancel");
                    }}
                // onConfirm={(row) => console.log('CONFIRM', row)}
                />


            </AnimatePresence>
        </Box>
    )
}

export default PatientsView
