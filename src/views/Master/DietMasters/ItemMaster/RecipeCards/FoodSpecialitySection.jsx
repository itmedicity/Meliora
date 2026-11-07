import React, { memo } from 'react'
import { Box, Typography, Chip } from '@mui/joy'
import { useAllDietSpeciality } from 'src/views/Diet/CommonData/UseQuery'


const FoodSpecialitySection = ({ selectedDiets, setSelectedDiets }) => {

    const { data: speciality = [] } = useAllDietSpeciality()

    const handleDietToggle = (dietCode) => {
        setSelectedDiets(prev =>
            prev.includes(dietCode)
                ? prev.filter(code => code !== dietCode)
                : [...prev, dietCode]
        );
    };


    return (
        <>
            <Typography sx={{ mt: 2 }} fontWeight={600}>
                Food Speciality
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, border: '1px solid #9822c365', p: 1 }}>

                {speciality?.map((speciality) => {

                    const selected = selectedDiets.includes(speciality.speciality_id)

                    return (
                        <Chip
                            key={speciality.speciality_id}
                            variant={selected ? "solid" : "soft"}
                            onClick={() => handleDietToggle(speciality.speciality_id)}
                            sx={{
                                cursor: "pointer",
                                fontSize: 12,
                                px: 1.2,
                                py: 0.6,
                                borderRadius: 12,
                                textTransform: "uppercase",
                                opacity: speciality.is_active === 0 ? 0.4 : 1,
                                pointerEvents: speciality.is_active === 0 ? "none" : "auto",

                                "--Chip-bgColor": selected
                                    ? "var(--royal-purple-400)"
                                    : "transparent",

                                "--Chip-color": selected ? "#fff" : "#000",
                            }}
                        >
                            {speciality.clinical_description}
                        </Chip>
                    )

                })}

            </Box>
        </>
    )
}

export default memo(FoodSpecialitySection);