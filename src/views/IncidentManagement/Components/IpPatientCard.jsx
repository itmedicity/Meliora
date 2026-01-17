import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    // Divider,
    // Chip,
    Typography
} from '@mui/joy';

import IncidentTextComponent from './IncidentTextComponent';

const IpPatientCard = ({ data }) => {
    if (!data) return null;
    // const formatDate = (str) => str?.split(' ')[0] || 'N/A';

    const renderLine = (label, value) => (
        <Typography
            level="body-sm"
            sx={{
                fontSize: { xs: 14, lg: 13 },
                color: '#403d3dff',
                fontWeight: 500,
                fontFamily: 'var(--roboto-font)'
            }}
        >
            <Box component="span" sx={{ fontWeight: 700 }}>{label}:</Box> {value || 'N/A'}
        </Typography>
    );


    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                minHeight: 160,
                p: 2,
                boxShadow: 'sm',
                borderRadius: 'lg'
            }}
        >
            <CardContent>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                    }}
                >
                    {/* Section 1: Personal Info */}
                    <Grid xs={12} md={12} sx={{ flex: 1 }}>
                        <IncidentTextComponent
                            text="Personal Info"
                            size={{ xs: 16, lg: 18 }}
                            weight={700}
                            color="#1a1a1a"
                        />
                        <Box mt={1}>
                            {renderLine('Patient No', data?.PT_NO)}
                            {renderLine('Name', data?.PTC_PTNAME)}
                            {renderLine('Gender', data?.PTC_SEX === "F" ? "Female" : 'Male')}
                            {renderLine('Age', `${data?.PTN_YEARAGE} Y `)}
                            {renderLine('Mobile', data?.PTC_MOBILE)}
                            {!data?.address
                                ? renderLine(
                                    'Address',
                                    [data?.PTC_LOADD1, data?.PTC_LOADD2]
                                        .filter(Boolean)
                                        .join(', ')
                                )
                                : renderLine('Address', data?.address || "--")
                            }
                        </Box>
                    </Grid>

                    {/* <Divider
                        orientation="vertical"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            mx: 1,
                        }}
                    /> */}

                    {/* Section 2: Admission Info */}
                    {/* <Grid xs={12} md={3}>
                        <IncidentTextComponent
                            text="Admission Info"
                            size={{ xs: 16, lg: 14 }}
                            weight={700}
                            color="#1a1a1a"
                        />
                        <Box mt={1}>
                            {renderLine('IP No', data?.fb_ip_no)}
                            {renderLine('IP Date', formatDate(data?.fb_ipd_date_new || data?.fb_ipd_date))}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IncidentTextComponent
                                    text="Status:"
                                    size={14}
                                    weight={600}
                                    color="#403d3dff"
                                />
                                <Chip
                                    variant="soft"
                                    color={
                                        data?.fb_ipc_curstatus === 'ADM' ?
                                            'primary' : data?.fb_ipc_curstatus === 'PCO' ?
                                                'danger' : data?.fb_ipc_curstatus === 'DBC' ?
                                                    'warning' : 'neutral'
                                    }
                                    size="sm">
                                    {data?.fb_ipc_curstatus}
                                </Chip>
                            </Box>
                            {renderLine('Department', data?.fb_dep_desc)}
                            {renderLine('Discharge Date', formatDate(data?.fb_ipd_disc_new || data?.fb_ipd_disc))}
                        </Box>
                    </Grid> */}

                    {/* <Divider
                        orientation="vertical"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            mx: 1,
                        }}
                    /> */}

                    {/* Section 3: Contact & Doctor */}
                    {/* <Grid xs={12} md={5} sx={{ width: '100%' }}>
                        <IncidentTextComponent
                            text="Contact & Doctor"
                            size={{ xs: 16, lg: 14 }}
                            weight={700}
                            color="#1a1a1a"
                        />
                        <Box mt={1}>
                            {renderLine('Nursing Station', data?.fb_ns_name)}
                            {renderLine('Doctor', data?.fb_doc_name)} 
                            {renderLine('Mobile', data?.PTC_MOBILE)}
                            {renderLine(
                                'Address',
                                [data?.PTC_LOADD1, data?.PTC_LOADD2]
                                    .filter(Boolean)
                                    .join(', ')
                            )}
                             {renderLine(
                                'Address',
                                [data?.PTC_LOADD1, data?.PTC_LOADD2, data?.fb_ptc_loadd3, data?.fb_ptc_loadd4]
                                    .filter(Boolean)
                                    .join(', ')
                            )} 
                        </Box>
                    </Grid> */}


                </Grid>
            </CardContent>
        </Card>
    );
};

export default IpPatientCard;
