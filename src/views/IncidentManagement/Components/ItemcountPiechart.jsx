import React from 'react';
import { Box } from '@mui/joy';
import { PieChart } from '@mui/x-charts/PieChart';

const ItemcountPiechart = ({ data }) => {

    return (

        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,

            }}
        >
            <PieChart
                sx={{ width: 80 }}
                height={80}
                series={[
                    {
                        data,
                        innerRadius: 20,   // smaller radius inside
                        outerRadius: 33,   // larger radius outside
                        startAngle: -90,
                        endAngle: 270,
                        cx: 45, cy: 42
                    },
                ]}
            />
        </Box>

    );
};

export default ItemcountPiechart;
