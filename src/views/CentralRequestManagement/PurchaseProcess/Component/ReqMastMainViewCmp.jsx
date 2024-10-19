import { Box, CssVarsProvider, Typography } from '@mui/joy';
import { format, isValid } from 'date-fns';
import React, { Fragment } from 'react'
import { memo } from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from '@mui/system';

const ReqMastMainViewCmp = ({ val }) => {

    const { req_slno, req_date, em_name, dept_name, user_deptsection, actual_requirement, needed, category,
        req_deptsec, location, expected_date, emergency_flag, emer_type_name, emergeny_remarks } = val

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
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 12, textTransform: 'uppercase', color: '#003060' }}>{dept_name}</Typography>
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
                    <Box sx={{ flex: 3.5, }}>
                        <Box sx={{ m: 0.7, borderBottom: '1px solid lightgray', display: 'flex', pb: 0.5 }}>
                            <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', flex: 0.1, pt: 0.2 }}>REQUIREMENT </Typography>
                            <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold' }}>: </Typography>
                            <Typography sx={{ fontSize: 13, pl: 1, flex: 1 }}>{actual_requirement !== null ? capitalizeWords(actual_requirement) : "Not Given"}</Typography>
                        </Box>
                        <Box sx={{ m: 0.7, borderBottom: '1px solid lightgray', display: 'flex', pb: 0.5 }}>
                            <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', flex: 0.1, pt: 0.2 }}>JUSTIFICATION</Typography>
                            <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold' }}>: </Typography>
                            <Typography sx={{ fontSize: 13, pl: 1, flex: 1 }}>{needed !== null ? capitalizeWords(needed) : "Not Given"}</Typography>
                        </Box>
                        <Box sx={{ m: 0.7, display: 'flex' }}>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>CATEGORY</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', px: 1 }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>{capitalizeWords(category)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>REQ. DEPARTMENT</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', px: 1 }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{capitalizeWords(req_deptsec)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>EXPECTED DATE</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', px: 1 }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{expdate}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flex: 1 }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>LOCATION </Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', px: 1 }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{capitalizeWords(location)}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CssVarsProvider>
        </Fragment >
    )
}
export default memo(ReqMastMainViewCmp)