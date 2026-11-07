import React, { useCallback, useState } from 'react'
import { dietTypeWisePatients } from '../CommonData/Common'
import { Modal, ModalDialog, Box, Typography } from '@mui/joy'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { MdRestaurantMenu } from "react-icons/md";
import DietPatientInfoCard from './DietPatientInfoCard';
import DietWeekWiseChartDetail from './DietWeekWiseChartDetail';
import DietButton from '../DietComponent/DietButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

const DietNewOrderList = () => {
    const [openModal, setOpenModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)

    const handleOpenModal = useCallback((patient) => {
        setSelectedPatient(patient)
        setOpenModal(true)
    }, [])

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedPatient(null);
    }

    const handleDietProcess = useCallback(() => {

    }, [])


    return (
        <Box sx={{ width: '100%' }}>
            {Object.entries(dietTypeWisePatients).map(([dietType, patients], idx) => (
                <Box
                    key={idx}
                    sx={{
                        mb: 3,
                        pb: 2,
                        borderBottom: '2px solid #d3d2d245',

                    }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <MdRestaurantMenu size={22} />
                        <Typography sx={{ fontSize: 22, fontWeight: 600 }}>
                            {dietType.toUpperCase()}
                        </Typography>
                    </Box>


                    {patients?.map((patient, pIdx) => (
                        <Box key={pIdx}>
                            {/* PATIENT INFO */}
                            <DietPatientInfoCard
                                patient={patient}
                                openModal={() => handleOpenModal(patient)}
                                processDiet={handleDietProcess}
                            />
                        </Box>
                    ))}
                </Box>
            ))}
            <Modal open={openModal} onClose={handleCloseModal}>
                <ModalDialog
                    variant="plain"
                    sx={{
                        width: '90vw',
                        height: '90vh',
                        m: 0,
                        borderRadius: 0,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography
                            fontWeight={700}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: { xs: 10, sm: 16 }
                            }}>
                            <PersonOutlineIcon fontSize="medium" fontWeight={800} />
                            {selectedPatient?.patientName?.toUpperCase()}
                        </Typography>

                        <DietButton
                            icon={CancelOutlinedIcon}
                            name="Close"
                            onClick={handleCloseModal}
                        />
                    </Box>

                    {/* Content */}
                    <Box sx={{ flex: 1, overflowY: 'auto' }}>
                        {selectedPatient?.weekDiet && (
                            <DietWeekWiseChartDetail dietData={selectedPatient.weekDiet} />
                        )}
                    </Box>
                </ModalDialog>
            </Modal>


        </Box>
    )
}

export default DietNewOrderList
