import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import CakeIcon from '@mui/icons-material/Cake';
import { BiSolidUserDetail } from "react-icons/bi";
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import TodayIcon from '@mui/icons-material/Today';
import IncidentTextComponent from '../Components/IncidentTextComponent';
import CardHeader from '../Components/CardHeader';

const StaffDetailCard = ({ staffDetail }) => {
    const infoItems = [
        {
            label: 'Name',
            value: staffDetail?.em_name,
            icon: <PersonIcon fontSize="small" />
        },
        {
            label: 'Staff ID',
            value: staffDetail?.em_no,
            icon: <BadgeIcon fontSize="small" />
        },
        {
            label: 'Department',
            value: staffDetail?.dept_name,
            icon: <WorkIcon fontSize="small" />
        },
        {
            label: 'Email',
            value: staffDetail?.em_email,
            icon: <EmailIcon fontSize="small" />
        },
        {
            label: 'Mobile Number',
            value: staffDetail?.em_mobile,
            icon: <LocalPhoneTwoToneIcon fontSize="small" />
        },
        {
            label: 'Date of Birth',
            value: staffDetail?.em_dob,
            icon: <CakeIcon fontSize="small" />
        },
        {
            label: 'Date of Joining',
            value: staffDetail?.em_doj,
            icon: <TodayIcon fontSize="small" />
        }
    ];

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 180,
                px: 2,
                py: 2,
                my: 2,
                border: '1.5px solid #ece6f1',
                bgcolor: '#fdfbff',
                borderRadius: 4,
                gap: 3,
                alignItems: 'flex-start',
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                position: 'relative',
                transition: 'all 0.3s ease',
                '&:hover': {
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                },
            }}>
            <Box sx={{ flex: 1, position: 'relative' }}>
                <CardHeader icon={BiSolidUserDetail} text="Staff Details" size={24} />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.2,
                    borderRadius: 3,
                    backgroundColor: '#fafafa',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
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
        </Box>

    );
};

export default memo(StaffDetailCard);
