import React from 'react'
import { useAllPatientDietPlan } from '../CommonData/UseQuery'
import { Box } from '@mui/joy';
import KotItemHeader from '../KotItemList/KotItemHeader';

const DietDashboard = () => {

    const {
        data: allPatientDiet = [],
        // refetch: FetchPatientDietPlan
    } = useAllPatientDietPlan("W009")
    console.log({
        allPatientDiet
    });


    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <KotItemHeader
                name={'DIET LIST'}
                goBackPath={''}
            />
        </Box>
    )
}

export default DietDashboard