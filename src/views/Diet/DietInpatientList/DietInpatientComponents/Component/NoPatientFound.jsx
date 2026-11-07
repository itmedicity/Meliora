import React, { memo } from 'react';
import { Box } from '@mui/joy';

import DietTextComponent from 'src/views/Diet/DietComponent/DietTextComponent';

const NoPatientFound = ({
    title = 'No Patients Available',
    message = 'No patients matched the selected filters or no active diet plans are currently available.',
    suggestion = 'Try changing the nursing station, patient search, diet filter, or status selection.'
}) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '55vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    bgcolor: '#fff',
                    borderRadius: 5,
                    p: 4,
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                    border: '1px solid #e5e7eb',
                    background:
                        'linear-gradient(180deg, #ffffff 0%, #f9fbfd 100%)'
                }}>
  
                <Box
                    sx={{
                        width: 90,
                        height: 90,
                        margin: '0 auto',
                        borderRadius: '50%',
                        bgcolor: '#eef6ff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 2
                    }}
                >
                    <Box
                        component={'span'}
                        sx={{
                            fontSize: 42
                        }} >
                        🏥
                    </Box>
                </Box>

               
                <DietTextComponent
                    value={title}
                    size={20}
                    weight={700}
                    color={'#0b6bcb'}
                />

    
                <Box sx={{ mt: 1.5 }}>
                    <DietTextComponent
                        value={message}
                        size={13}
                        weight={500}
                        color={'#555'}
                    />
                </Box>
                <Box
                    sx={{
                        mt: 3,
                        p: 2,
                        borderRadius: 3,
                        bgcolor: '#f8fafc',
                        border: '1px dashed #cbd5e1'
                    }}
                >
                    <DietTextComponent
                        value={suggestion}
                        size={12}
                        weight={600}
                        color={'#374151'}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default memo(NoPatientFound);