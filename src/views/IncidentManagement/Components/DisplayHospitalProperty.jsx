import React, { memo } from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    Typography
} from '@mui/joy';

import IncidentTextComponent from './IncidentTextComponent';
import { getCustodianDept } from 'src/api/AssetApis';
import { useQuery } from '@tanstack/react-query';

const DisplayHospitalProperty = ({ propertyDetail, size }) => {

    const { data: custodianArray = [] } = useQuery({
        queryKey: ['getCustdepInci'],
        queryFn: getCustodianDept,
        staleTime: Infinity
    });


    if (!propertyDetail?.length) return null;

    const renderLine = (label, value) => (
        <Typography
            level="body-sm"
            sx={{
                fontSize: size ? size : { xs: 14, lg: 14 },
                color: '#403d3dff',
                fontWeight: 500,
                fontFamily: 'var(--roboto-font)'
            }}
        >
            <Box
                component="span"
                sx={{
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.6
                }}
            >
                {label}:
            </Box>{' '}
            {value || 'N/A'}
        </Typography>
    );

    const isSingle = propertyDetail.length === 1;

    return (
        <Grid container spacing={2}>
            {propertyDetail.map((property, index) => {
                const Custodian = custodianArray?.find(item => item?.am_custodian_slno === Number(property?.am_custodian_slno));
                const infoItems = [
                    { label: 'Custodian Department', value: Custodian?.am_custodian_name ?? property?.item_custodian_dept },
                    { label: 'Item Name', value: property?.item_name },
                    { label: 'Department', value: property?.deptname },
                    { label: 'Manufacture Serial No', value: property?.am_manufacture_no },
                    { label: 'Location', value: property?.location }
                ];

                return (
                    <Grid
                        xs={12}
                        md={isSingle ? 12 : 6}
                        lg={isSingle ? 12 : 6}
                        xl={isSingle ? 12 : 6}
                        key={index}
                    >
                        <Card
                            variant="outlined"
                            sx={{
                                width: '100%',
                                minHeight: isSingle ? 180 : 160,
                                p: 2,
                                boxShadow: 'sm',
                                borderRadius: 'lg',
                            }}
                        >
                            <CardContent>
                                <IncidentTextComponent
                                    text={`${property?.item_name }`}
                                    size={{ xs: 16, lg: 14 }}
                                    weight={700}
                                    color="#1a1a1a"
                                />
                                <Box mt={1}>
                                    {infoItems.map(({ label, value }, idx) => (
                                        <Box key={idx} mt={0.8}>
                                            {renderLine(label, value)}
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default memo(DisplayHospitalProperty);
