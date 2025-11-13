import React from 'react';
import { Box, Tooltip } from '@mui/joy';
import IncidentTextComponent from './IncidentTextComponent'; // Adjust path if needed
// import { CiEdit } from "react-icons/ci";
import { MdAssignmentAdd } from "react-icons/md";


const NoDataFound = ({
    onClick,
    text = "No Data Found",
    color = "#403d3dff",
    size = 14,
    weight = 600,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
                p: 1,
                mt: 2,
                border: '1px dashed #c4c4c4',
                borderRadius: '6px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: '#fffbfbff',
                    borderColor: '#b0bec5',
                },
            }}
        >
            <Tooltip title="Add Patient Details" placement="top">
                <Box
                    className="Button_hover"
                    onClick={onClick}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ffffff',
                        borderRadius: '50%',
                        width: 40,
                        height: 40,
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 6px 14px rgba(0, 0, 0, 0.15)',
                        },
                    }}
                >
                    <MdAssignmentAdd fontSize={23} color="#673ab7" />
                </Box>
            </Tooltip>

            <IncidentTextComponent
                text={text}
                color={color}
                size={size}
                weight={weight}
                style={{
                    marginTop: '1rem',
                    textAlign: 'center',
                }}
            />
        </Box>
    );
};

export default NoDataFound;
