import React, { memo } from 'react'
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { BsBuildingCheck } from "react-icons/bs";
import { PiPersonLight } from "react-icons/pi";
import { BsSignpost2 } from "react-icons/bs";
import { Box } from '@mui/joy';
import IncidentTextComponent from './IncidentTextComponent';
import { formatDateTime } from '../CommonComponent/CommonFun';
const RegisterdUserCard = ({
    items,
    employeeName,
    departmentName,
    sectionName,
    designation, createDate
}) => {

    return (
        <Box
            sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "4px solid var(--rose-pink-400)",
                borderLeftWidth: "4px",   // keep left
                borderRightWidth: "none",  // keep right
                borderTop: "none",        // remove top
                borderBottom: "none",     // remove bottom
                borderRadius: "20px / 15px", // stronger curve horizontally
            }}>
            {/* Left side */}
            <Box sx={{ width: '70%', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PiPersonLight style={{ color: ' var(--rose-pink-400)', fontSize: 18 }} />
                    <IncidentTextComponent text={`${items?.em_name || employeeName || "--"}`} size={16} weight={600} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BsBuildingCheck style={{ color: ' var(--rose-pink-400)', fontSize: 15 }} />
                    <IncidentTextComponent text={`${items?.dept_name || departmentName || "--"}`} size={14} weight={400} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IoLocationOutline style={{ color: ' var(--rose-pink-400)', fontSize: 15 }} />
                    <IncidentTextComponent text={`${items?.sec_name || sectionName || "--"}`} size={10} weight={400} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BsSignpost2 style={{ color: ' var(--rose-pink-400)', fontSize: 15 }} />
                    <IncidentTextComponent text={`${items?.desg_name || designation || "--"}`} size={10} weight={400} />
                </Box>
            </Box>

            {/* Right side */}
            <Box sx={{ width: '30%', height: 80, display: 'flex', justifyContent: 'end', alignItems: 'flex-start', gap: 1 }}>
                <IoCalendarOutline style={{ color: ' var(--rose-pink-400)' }} />
                <IncidentTextComponent text={formatDateTime(items?.create_date || createDate, "dd/MM/yyyy hh:mm:ss a") // Custom format
                } size={12} weight={400} />
            </Box>
        </Box>
    )
}

export default memo(RegisterdUserCard);