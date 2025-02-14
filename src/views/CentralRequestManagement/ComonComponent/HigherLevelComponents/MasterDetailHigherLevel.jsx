import { Box } from '@mui/material'
import React, { Fragment, memo } from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'
import { format, isValid } from 'date-fns';
import ErrorIcon from '@mui/icons-material/Error';
import { keyframes } from '@mui/system';

const MasterDetailHigherLevel = ({ val, selectedCompany }) => {

    const { req_slno, req_date, req_deptsec, user_deptsection, actual_requirement, needed, dept_name, po_number,
        category, location, expected_date, emergency_flag, em_name, emer_type_name, emergeny_remarks, po_prepartion } = val
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
                    <Box sx={{ flex: 0.7, borderRight: '1px solid lightgray', flexWrap: 'wrap' }}>
                        <Box sx={{ ml: 1, mt: 0.5 }}>
                            <Typography sx={{ fontSize: 15, color: '#003060', fontWeight: 'bold' }}>
                                {selectedCompany === '2' ? 'CRF/KMC/' + req_slno : 'CRF/TMC/' + req_slno}</Typography>
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
                        <Box sx={{ flex: 0.6, textAlign: 'center', borderRight: '1px solid lightgray' }}>
                            <ErrorIcon
                                sx={{
                                    mt: 2,
                                    height: 30,
                                    width: 30,
                                    color: '#d50000',
                                    animation: `${blinkAnimation} 1s infinite`
                                }}
                            />
                            <Typography sx={{ fontSize: 13, color: '#b71c1c', pt: 0.2, fontWeight: 550 }}>
                                {emer_type_name !== null ? capitalizeWords(emer_type_name) : null}
                            </Typography>
                            <Typography sx={{ fontSize: 11, color: '#b71c1c', pt: 0.2 }}>
                                {emergeny_remarks !== null ? capitalizeWords(emergeny_remarks) : null}</Typography>
                        </Box>
                        : null}
                    <Box sx={{ flex: 3.5, flexWrap: 'wrap' }}>
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
                        <Box sx={{ m: 0.7, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', pr: 0.5 }}>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>CATEGORY</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, pl: 1 }}>{category.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>REQ. DEPARTMENT</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{capitalizeWords(req_deptsec)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>LOCATION </Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{capitalizeWords(location)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', }}>
                                <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>EXPECTED DATE</Typography>
                                <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                <Typography sx={{ fontSize: 13, }}>&nbsp;&nbsp;{expdate}</Typography>
                            </Box>
                            {po_prepartion === 1 ?
                                <Box sx={{ display: 'flex', }}>
                                    <Typography sx={{ fontSize: 11, color: '#003060', fontWeight: 'bold', pt: 0.4 }}>#Order</Typography>
                                    <Typography sx={{ fontSize: 12, color: '#003060', fontWeight: 'bold', pl: 1, }}>: </Typography>
                                    <Typography sx={{ fontSize: 13, color: '#145DA0', pr: 1 }}>&nbsp;&nbsp;{po_number}</Typography>
                                </Box> : null
                            }
                        </Box>
                    </Box>
                </Box>
            </CssVarsProvider>
        </Fragment>
    )
}

export default memo(MasterDetailHigherLevel)