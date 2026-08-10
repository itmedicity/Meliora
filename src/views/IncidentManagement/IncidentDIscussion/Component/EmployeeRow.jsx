import React, { memo } from 'react'
import {
    Avatar,
    Box,
    Chip,
    Sheet,
} from '@mui/joy';
import IncidentTextComponent from '../../Components/IncidentTextComponent';

const EmployeeRow = ({ onSelect, emp, selected }) => {

    return (
        <Sheet
            onClick={() => onSelect(emp)}
            sx={{
                p: 1.5,
                borderRadius: 18,
                cursor: 'pointer',
                border: selected
                    ? '2px solid #1976d2'
                    : '1px solid #e5e7eb',
                bgcolor: selected ? '#eff6ff' : '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
            }}
        >


            <Avatar sx={{ width: 42, height: 42 }}>
                {emp.em_name?.[0]}
            </Avatar>

            <Box sx={{ flex: 1 }}>
                <IncidentTextComponent text={emp?.em_name} size={12} weight={700} />
                <IncidentTextComponent text={emp?.desg_name} size={10} />
                <IncidentTextComponent
                    text={`${emp?.dept_name} - ${emp?.sec_name}`}
                    size={10}
                />
            </Box>

            {selected && (

                <Chip
                    color="success"
                    size="sm" >
                    Selected
                </Chip>
            )}

        </Sheet>
    )
}

export default memo(EmployeeRow)



