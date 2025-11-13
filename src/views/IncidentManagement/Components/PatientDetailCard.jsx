import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import IncidentTextComponent from './IncidentTextComponent';

const PatientDetailCard = ({ InPatientDetail }) => {
    const infoItems = [
        {
            label: 'Name',
            value: InPatientDetail?.fb_ptc_name,
            icon: <PersonIcon fontSize="small" />
        },
        {
            label: 'Gender / Age',
            value: `${InPatientDetail?.fb_ptc_sex === 'M' ? 'Male' : 'Female'} / ${InPatientDetail?.fb_ptn_yearage}`,
            icon: <WcIcon fontSize="small" />
        },
        {
            label: 'IP Number',
            value: InPatientDetail?.fb_pt_no,
            icon: <BadgeIcon fontSize="small" />
        },
        {
            label: 'Mobile',
            value: InPatientDetail?.fb_ptc_mobile,
            icon: <PhoneIcon fontSize="small" />
        },
        {
            label: 'Address',
            value: [
                InPatientDetail?.fb_ptc_loadd1,
                InPatientDetail?.fb_ptc_loadd2,
                InPatientDetail?.fb_ptc_loadd3,
                InPatientDetail?.fb_ptc_loadd4
            ].filter(Boolean).join(', '),
            icon: <HomeIcon fontSize="small" />
        }
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1.2,
                // px: 1,
                // py: 1,
                borderRadius: 3,
                backgroundColor: '#fafafa',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                // border: '1px solid #e0e0e0'
            }}
        >
            {infoItems?.map((item, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        px: 1,
                        py: 0.6,
                        borderRadius: 2,
                        backgroundColor: '#fff',
                        transition: 'background 0.2s',
                        '&:hover': {
                            backgroundColor: '#f3f4f6'
                        }
                    }}
                >
                    <Tooltip title={item.label}>
                        <Box sx={{ color: '#5b5b5b' }}>{item.icon}</Box>
                    </Tooltip>
                    <IncidentTextComponent
                        text={item.value || 'Not available'}
                        color={'#343434'}
                        size={13}
                        weight={600}
                    />
                </Box>
            ))}
        </Box>
    );
};

export default memo(PatientDetailCard);
