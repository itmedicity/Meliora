import { Box } from '@mui/material'
import React, { Fragment, memo, } from 'react'
import { Chip, CssVarsProvider, Typography } from '@mui/joy'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CategoryIcon from '@mui/icons-material/Category';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Person3Icon from '@mui/icons-material/Person3';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import BalanceIcon from '@mui/icons-material/Balance';
import { format, isValid } from 'date-fns';
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from '@mui/system';

const MasterDetailCompnt = ({ val }) => {

    const { req_slno, req_date, req_deptsec, user_deptsection, actual_requirement, needed,
        category, location, expected_date, emergency_flag, em_name, emer_type_name, emergeny_remarks } = val
    const expdate = expected_date !== null && isValid(new Date(expected_date)) ? format(new Date(expected_date), 'dd-MM-yyyy') : "Not Updated"
    const capitalizeWords = (str) => str ? str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : '';
    const blinkAnimation = keyframes`0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; }`;
    return (
        <Fragment>
            <CssVarsProvider>
                <Box sx={{
                    display: 'flex', flex: 1, borderRadius: 2, borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0, borderBottom: '1px solid #9fa8da', flexWrap: 'wrap'
                }}>
                    <Box sx={{ flex: 1, borderRight: '1px solid lightgray' }}>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 15, color: '#003060', fontWeight: 'bold' }}>CRF/TMC/{req_slno}</Typography>
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 12, color: '#003060' }}>{format(new Date(req_date), 'dd-MM-yyyy hh:mm:ss a')}</Typography>
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 12, textTransform: 'uppercase', color: '#003060', fontWeight: 'bold' }}>{em_name}</Typography>
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5, pb: 0.5 }}>
                            <Typography sx={{ fontSize: 12, textTransform: 'capitalize', color: '#003060' }}>{user_deptsection}</Typography>
                        </Box>
                    </Box>
                    {emergency_flag === 1 ?
                        <Box sx={{ flex: 0.5, textAlign: 'center', borderRight: '1px solid lightgray' }}>
                            <ErrorIcon
                                sx={{
                                    mt: 2,
                                    height: 30,
                                    width: 30,
                                    color: '#d50000',
                                    animation: `${blinkAnimation} 1s infinite`
                                }}
                            />
                            <Typography sx={{ fontSize: 12, color: '#b71c1c', pt: 0.2, fontWeight: 550 }}>
                                {emer_type_name !== null ? capitalizeWords(emer_type_name) : null}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: '#b71c1c', pt: 0.2 }}>
                                {emergeny_remarks !== null ? capitalizeWords(emergeny_remarks) : null}</Typography>
                        </Box>
                        : null}
                </Box>
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(MasterDetailCompnt)