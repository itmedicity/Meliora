
import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    Typography,
    // Tooltip
} from '@mui/joy';
import IncidentTextComponent from './IncidentTextComponent';

const DisplayVisitorDetail = ({ visitorDetail }) => {


    const data = visitorDetail;
    if (!data) return null;

    const renderLine = (label, value) => (
        <Typography
            level="body-sm"
            sx={{
                fontSize: { xs: 14, lg: 15 },
                color: '#403d3dff',
                fontWeight: 500,
                fontFamily: 'var(--roboto-font)'
            }}
        >
            <Box component="span" sx={{ fontWeight: 700 }}>{label}:</Box> {value || 'N/A'}
        </Typography>
    );

    const infoItems = [
        {
            label: 'Visitor Name',
            value: data.visitor_name,
        },
        {
            label: 'Gender / Age',
            value: `${data.visitor_gender === 'M' ? 'Male' : data.visitor_gender === 'F' ? 'Female' : 'Other'} / ${data.visitor_age}`,
        },
        {
            label: 'Mobile Number',
            value: data.visitor_mobile,
        },
        {
            label: 'Address',
            value: data.visitor_address,
        },
        {
            label: 'Incident Location',
            value: data.incident_location,
        },
        {
            label: 'Purpose of Visit',
            value: data.purpose,
        }
    ];

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
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <IncidentTextComponent
                            text="Visitor Details"
                            size={{ xs: 16, lg: 14 }}
                            weight={700}
                            color="#1a1a1a"
                        />
                        <Box mt={1}>
                            {infoItems?.map(({ label, value, icon }, idx) => (
                                <Box key={idx}>{renderLine(label, value, icon)}</Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default DisplayVisitorDetail;
