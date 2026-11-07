import { Typography, Box, Chip } from '@mui/joy'
import React from 'react'

import Male from '../../../assets/images/male.jpg'
import Female from '../../../assets/images/female.jpg'
import DietButton from '../DietComponent/DietButton'

import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined'
import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined'
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const DietPatientInfoCard = ({ patient, openModal, processDiet }) => {
    return (
        <Box
            sx={{
                p: { xs: 1, sm: 1.5 },
                mb: 2,
                borderRadius: 8,
                border: '1px solid #e0e0e0',
                boxShadow: 'md',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
            }}
        >
            {/* AVATAR */}
            <Box
                sx={{
                    width: { xs: 36, sm: 42 },
                    height: { xs: 36, sm: 42 },
                    // borderRadius: '50%',
                    overflow: 'hidden'
                }}
            >
                <img
                    src={patient.gender === 'F' ? Female : Male}
                    alt="Patient"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            {/* CONTENT */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    gap: 2,
                    flexWrap: { xs: 'wrap', md: 'nowrap' }
                }}
            >

                <Box sx={{ width: { xs: '30%', md: '45%' } }}>
                    <Typography
                        fontWeight={600}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: { xs: 10, sm: 16 }
                        }}
                    >
                        <PersonOutlineIcon fontSize="xs" />
                        {patient.patientName.toUpperCase()}
                    </Typography>

                    <Typography
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: { xs: 10, sm: 14 },
                            color: 'text.secondary'
                        }}
                    >
                        <BadgeOutlinedIcon fontSize="xs" />
                        {patient.mrdNumber}
                    </Typography>

                    {patient.mobileNo && (
                        <Chip
                            size="sm"
                            variant="soft"
                            startDecorator={<PhoneOutlinedIcon fontSize="xs" />}
                            sx={{ mt: 0.5, fontSize: { xs: 10, sm: 12 }, }}
                        >
                            {patient.mobileNo}
                        </Chip>
                    )}
                </Box>


                <Box
                    sx={{
                        width: { xs: '30%', md: '25%' },
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 0.5,
                            fontWeight: 600,
                            fontSize: { xs: 10, sm: 14 }
                        }}
                    >
                        <LocalHospitalOutlinedIcon fontSize="xs" />
                        {patient.nursingStation}
                    </Typography>

                    <Typography
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: 0.5,
                            fontSize: { xs: 10, sm: 13 },
                            color: 'text.secondary'
                        }}
                    >
                        <HotelOutlinedIcon fontSize="xs" />
                        Bed {patient.bedNo}
                    </Typography>
                </Box>

                {/* 3️⃣ ACTION */}
                <Box sx={{ width: { xs: '30%', md: '25%' }, display: 'flex', gap: 1, justifyContent: 'end' }}>
                    <DietButton
                        onClick={openModal}
                        icon={EmojiFoodBeverageOutlinedIcon}
                        name="View Diet"
                    />
                    <DietButton
                        onClick={processDiet}
                        icon={AddShoppingCartOutlinedIcon}
                        name="Process Diet"
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default DietPatientInfoCard
