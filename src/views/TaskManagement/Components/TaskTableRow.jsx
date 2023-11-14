import { Box } from '@mui/joy'
import React, { useState } from 'react'
import { memo } from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { format, isPast, isThisWeek, isToday, isTomorrow, isValid } from 'date-fns';
import AddTicketModal from './AddTicketModal';

const TaskTableRow = ({ taskName, dueDate }) => {

    const [open, setOpen] = useState(false)

    const newDate = new Date(dueDate)

    const getDudateFun = (date) => {
        // chec is valid date
        if (isValid(date)) {
            if (isPast(date)) {
                //check is this past dates 

                if (isToday(date)) {
                    return <Box sx={{ color: 'green' }}>Today</Box>
                } else {

                    let notThisWeek = format(date, 'dd-MM-yyyy')
                    return <Box sx={{ color: 'red' }} >{notThisWeek}</Box>
                }
            } else {
                //its future date
                if (isThisWeek(date)) {
                    // this week
                    if (isTomorrow(newDate)) {
                        return <Box sx={{ color: 'green' }}>Tomorrow</Box>

                    } else {
                        let notThisWeek = format(date, 'eeee')
                        return <Box sx={{ color: 'green' }}>{notThisWeek}</Box>
                    }
                } else {
                    let notThisWeek = format(date, 'dd-MM-yyyy')
                    return <Box sx={{ color: 'green' }}>{notThisWeek}</Box>
                }
            }
        } else {
            console.log('not a valid date')
            return <Box sx={{ color: 'red' }}>Not a valid date</Box>
        }
    }

    return (
        <tr style={{ display: 'flex', flexGrow: 1 }} >
            <td style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', textOverflow: 'ellipsis' }} >
                <AddTicketModal open={open} setOpen={setOpen} />
                <Box sx={{ display: 'flex', flex: 1 }} >
                    <Box sx={{
                        display: 'flex',
                        px: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                        <CheckCircleOutlineIcon sx={{
                            fontSize: 20,
                            ":hover": {
                                color: 'green',

                            },
                            cursor: 'pointer'
                        }}
                            onClick={() => setOpen(!open)}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            pl: 0.8,
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            textOverflow: 'ellipsis'
                        }}
                        component="div"
                    >
                        {taskName}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            width: '15%',
                            alignItems: 'center',
                            textTransform: 'capitalize',
                            pl: 0.8
                        }}
                    >
                        {/* {dueDates} */}
                        {getDudateFun(newDate)}
                    </Box>
                </Box>
            </td>
        </tr>
    )
}

export default memo(TaskTableRow) 