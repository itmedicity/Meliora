import { Box, Divider } from '@mui/joy';
import React, { memo, useCallback } from 'react';
import IncidentTextComponent from './IncidentTextComponent';
import { CgFileDocument } from "react-icons/cg";
import AddButton from './AddButton';
import { BiSolidEditAlt } from "react-icons/bi";
import ApprovalButton from './ApprovalButton';
import { MdOutlinePendingActions } from "react-icons/md";
const IncidentListCard = ({
    isedit = true,
    level = 0
}) => {

    // View IncidentDetails
    const HandleViewOption = useCallback(() => {
        console.log("Working...?");

    }, []);

    const currentLevel = level === 0 ? "Registration completed" : "Approval Pending"
    return (
        <Box sx={{
            width: '100%',
            mb: 2,
        }}>
            <Box
                sx={{
                    width: '100%',
                    minHeight: 120,
                    borderTop: '1px solid #D0BFFF',
                    borderLeft: '1px solid #D0BFFF',
                    borderRight: '1px solid #D0BFFF',
                    borderBottom: 'none',
                    borderRadius: 5,
                    display: 'flex',
                    cursor: 'pointer',
                    alignItems: 'center',
                    gap: 2,
                    px: 2,
                    py: 1,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                }}>

                {/* Left Section */}
                <Box sx={{
                    width: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.2
                }}>
                    <IncidentTextComponent text="INCI/TMCH/9898" color="var(--royal-purple-400)" size={18} weight={900} />
                    <IncidentTextComponent text="22-07-2025 10:59:00 AM" color="#403d3dff" size={13} weight={400} />
                    <IncidentTextComponent text="ROHITH KRISHNA R" color="#1a1a1a" size={14} weight={700} />
                    <IncidentTextComponent text="INFORMATION TECHNOLOGY" color="#5A5A5A" size={12} weight={500} />
                    <IncidentTextComponent text="Infromation Technology" color="#5A5A5A" size={10} weight={400} />
                </Box>
                <Divider orientation="vertical" />
                {/* Middle Section */}
                <Box sx={{
                    width: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1
                }}>
                    <IncidentTextComponent text="PATIENT" color="#2b1a4f" size={16} weight={800} />
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.8,
                        rowGap: 1,
                        mt: 0.5
                    }}>
                        {["Clinical", "Non Clinical", "Fire"].map((tag) => (
                            <Box key={tag} sx={{
                                px: 1.4,
                                py: 0.3,
                                background: '#ede5f9',
                                border: '1px solid #c6b6e9',
                                borderRadius: '20px',
                                fontSize: 11,
                                fontWeight: 600,
                                color: '#5d3a9c',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                                boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.05)',
                                transition: 'background 0.3s',
                                '&:hover': {
                                    background: '#e2d6f3',
                                }
                            }}>
                                {tag}
                            </Box>
                        ))}
                    </Box>
                </Box>



                <Divider orientation="vertical" />
                {/* Right Section */}
                <Box
                    sx={{
                        width: '60%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5,
                    }}
                >
                    {/* Label */}
                    <IncidentTextComponent
                        text="Incident Description"
                        color="#74359c"
                        size={14}
                        weight={700}
                    />

                    {/* Description Text */}
                    <IncidentTextComponent
                        text="An incident is an event that interrupts normal operations and can potentially cause harm or damage. It's a broad term encompassing accidents, near misses, and dangerous occurrences. Describing an incident accurately and objectively is crucial for understanding what happened, determining the cause, and implementing preventative measures."
                        color="#403d3dff"
                        size={14}
                        weight={400}
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    />
                </Box>

            </Box>
            <Box sx={{
                width: '100%',
                height: 50,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                border: '1px solid #D0BFFF',
                px: 1,
                display: 'flex',
                justifyContent: 'space-between',
                bgcolor: '#eeeafaff'
            }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>

                    <AddButton onClick={HandleViewOption} label={"View"} icon={CgFileDocument} />
                    {
                        isedit && <AddButton onClick={HandleViewOption} label={"Edit"} icon={BiSolidEditAlt} />
                    }

                </Box>

                {/* <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 1,
                        px: 1.2,
                        py: 0.3,
                        borderRadius: '2px',
                        color: '#fff',
                        fontWeight: 500,
                        cursor: 'pointer',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                        userSelect: 'none',
                        my: 1,
                        background: 'var(--royal-purple-300)'
                    }}>

                    <IncidentTextComponent
                        text={currentLevel}
                        size={12}
                        color="#ffffffff"
                        weight={400}
                    />

                </Box> */}
                <ApprovalButton text={currentLevel} icon={MdOutlinePendingActions} />
            </Box>
        </Box>
    );
};

export default memo(IncidentListCard);
