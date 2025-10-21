import React, { memo } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import TextComponent from 'src/views/Components/TextComponent';

const AntibioticPieChart = ({ totResAntibiotic, totUnResAntibiotic }) => {
    const pieData = [
        {
            id: 0,
            value: totResAntibiotic,
            color: '#C690C6',
        },
        {
            id: 1,
            value: totUnResAntibiotic,
            color: '#C6C690',
        },
    ];

    const EmptypieData = [
        {
            id: 0,
            value: 1,
            color: 'lightgrey',
        },

    ];

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {totResAntibiotic === 0 && totUnResAntibiotic === 0 ?
                    <PieChart
                        height={145}
                        width={150}
                        series={[
                            {
                                data: EmptypieData,
                                innerRadius: 48,
                                outerRadius: 60,
                                paddingAngle: 3,
                                cornerRadius: 2,
                                cx: 60,
                            },
                        ]}
                    /> :
                    <PieChart
                        height={145}
                        width={150}
                        series={[
                            {
                                data: pieData,
                                innerRadius: 48,
                                outerRadius: 60,
                                paddingAngle: 3,
                                cornerRadius: 2,
                                cx: 60,
                            },
                        ]}
                    />}
            </Box>

            <Box sx={{ display: 'flex', pl: 0.5 }}>
                <CircleIcon sx={{ p: 0.5, color: '#C690C6' }} />
                <TextComponent
                    sx={{
                        fontWeight: 530,
                        fontFamily: 'Arial',
                        color: '#4C5270',
                        fontSize: 14,
                        pt: 0.3,
                    }}
                    text={`Restricted  : ${totResAntibiotic}`}

                />
            </Box>

            <Box sx={{ display: 'flex', pl: 0.5 }}>
                <CircleIcon sx={{ p: 0.5, color: '#C6C690' }} />
                <TextComponent
                    sx={{
                        fontWeight: 530,
                        fontFamily: 'Arial',
                        color: '#4C5270',
                        fontSize: 14,
                        pt: 0.3,
                    }}
                    text={`Unrestricted  : ${totUnResAntibiotic}`}
                />
            </Box>
        </Box>
    );
};

export default memo(AntibioticPieChart);
