import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import IncidentTextComponent from './IncidentTextComponent';
import { BiSolidUserDetail } from "react-icons/bi";
import CardHeader from './CardHeader';
import { CiEdit } from "react-icons/ci";

const PatientDetailCard = ({ InPatientDetail, HanldePatientDetailEdit }) => {
    const infoItems = [
        {
            label: 'Name',
            value: InPatientDetail?.PTC_PTNAME,
            icon: <PersonIcon fontSize="small" />
        },
        {
            label: 'Gender / Age',
            value: `${InPatientDetail?.PTC_SEX === 'M' ? 'Male' : 'Female'} / ${InPatientDetail?.PTN_YEARAGE}`,
            icon: <WcIcon fontSize="small" />
        },
        {
            label: 'IP Number',
            value: InPatientDetail?.PT_NO,
            icon: <BadgeIcon fontSize="small" />
        },
        {
            label: 'Mobile',
            value: InPatientDetail?.PTC_MOBILE,
            icon: <PhoneIcon fontSize="small" />
        },
        {
            label: 'Address',
            value: [
                InPatientDetail?.PTC_LOADD1,
                InPatientDetail?.PTC_LOADD2
            ].filter(Boolean).join(', '),
            icon: <HomeIcon fontSize="small" />
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
                <CardHeader icon={BiSolidUserDetail} text="Patient Details" size={24} />
                <CiEdit
                    fontSize={26}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        cursor: 'pointer',
                        zIndex: 10,
                        color: '#7c3aed'
                    }}
                    onClick={HanldePatientDetailEdit}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.2,

                    borderRadius: 3,
                    backgroundColor: '#fafafa',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
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

export default memo(PatientDetailCard);
