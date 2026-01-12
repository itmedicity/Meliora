import React, { memo } from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    Divider,
    Chip,
    Typography
} from '@mui/joy';
import IncidentTextComponent from '../Components/IncidentTextComponent';



const DisplayStaffDetail = ({ data }) => {
    if (!data) return null;

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
                    {/* Section 1: Basic Info */}
                    <Grid xs={12} md={4}>
                        <IncidentTextComponent
                            text="Basic Info"
                            size={{ xs: 16, lg: 14 }}
                            weight={700}
                            color="#1a1a1a"
                        />
                        <Box mt={1}>
                            {renderLine('Staff ID', data?.em_no)}
                            {renderLine('Name', data?.em_name)}
                            {renderLine('Gender', data?.em_gender === 1 ? "Male" : "Female")}
                            {renderLine('Designation', data.designation)}
                            {renderLine('Department', data?.dept_name)}
                        </Box>
                    </Grid>

                    <Divider
                        orientation="vertical"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            mx: 1,
                        }}
                    />

                    {/* Section 2: Contact Info */}
                    <Grid xs={12} md={3}>
                        <IncidentTextComponent
                            text="Contact Info"
                            size={{ xs: 16, lg: 14 }}
                            weight={700}
                            color="#1a1a1a"
                        />
                        <Box mt={1}>
                            {renderLine('Mobile', data?.em_mobile)}
                            {renderLine('Email', data?.email)}
                            {renderLine('Location', data?.sect_name)}
                            {renderLine('Joining Date', data?.em_doj)}
                        </Box>
                    </Grid>

                    <Divider
                        orientation="vertical"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            mx: 1,
                        }}
                    />

                    {/* Section 3: Status Info */}
                    <Grid xs={12} md={4}>
                        <IncidentTextComponent
                            text="Status"
                            size={{ xs: 16, lg: 14 }}
                            weight={700}
                            color="#1a1a1a"
                        />
                        <Box mt={1}>
                            {renderLine('Employment Type', data.employment_type)}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IncidentTextComponent
                                    text="Active Status:"
                                    size={14}
                                    weight={600}
                                    color="#403d3dff"
                                />
                                <Chip
                                    variant="soft"
                                    color={"success"}
                                    size="sm">Active</Chip>
                            </Box>
                            {!data?.address
                                ? renderLine('Address', `${data?.addressPermnt1 || ""} ${data?.addressPermnt2 || ""}`)
                                : renderLine('Address', data?.address || "--")
                            }
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default memo(DisplayStaffDetail);
