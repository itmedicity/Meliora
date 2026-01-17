import React, { memo } from 'react';
import { Box, Tooltip } from '@mui/joy';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import RoomIcon from '@mui/icons-material/Room';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { BiSolidUserDetail } from "react-icons/bi";
import IncidentTextComponent from './IncidentTextComponent';
import CardHeader from './CardHeader';
import { CiEdit } from "react-icons/ci";

const VisitorDetailCardDisplay = ({ visitorDetail, HandleVisitorEdit }) => {



    const infoItems = [
        {
            label: 'Visitor Name',
            value: visitorDetail?.[0]?.visitor_name,
            icon: <PersonIcon fontSize="small" />
        },
        {
            label: 'Gender / Age',
            value: `${visitorDetail?.[0]?.visitor_gender === 'M' ? 'Male' : visitorDetail?.[0]?.visitor_gender === 'F' ? 'Female' : 'Other'} / ${visitorDetail?.[0]?.visitor_age}`,
            icon: <WcIcon fontSize="small" />
        },
        {
            label: 'Mobile Number',
            value: visitorDetail?.[0]?.visitor_mobile,
            icon: <PhoneIcon fontSize="small" />
        },
        {
            label: 'Address',
            value: visitorDetail?.[0]?.visitor_address,
            icon: <HomeIcon fontSize="small" />
        },
        {
            label: 'Incident Location',
            value: visitorDetail?.[0]?.incident_location,
            icon: <RoomIcon fontSize="small" />
        },
        {
            label: 'Purpose of Visit',
            value: visitorDetail?.[0]?.purpose,
            icon: <EditNoteIcon fontSize="small" />
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

            }}>
            <Box sx={{ flex: 1, position: 'relative' }}>
                <CardHeader icon={BiSolidUserDetail} text="Visitor Details" size={24} />
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
                    onClick={HandleVisitorEdit}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.2,
                    borderRadius: 3,
                    backgroundColor: '#fafafa',
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

export default memo(VisitorDetailCardDisplay);
