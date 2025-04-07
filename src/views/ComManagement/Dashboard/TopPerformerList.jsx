import { Box, Typography } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getAllDeptemployeeList } from 'src/api/TicketApi';
import { useQuery } from 'react-query';
import { BarChart, } from '@mui/x-charts';

const TopPerformerList = ({ PostDate }) => {

    const { from, to } = PostDate
    const { data: AllDeptEmployees } = useQuery({
        queryKey: ['getAllemployee', PostDate],
        enabled: !!from && !!to,
        queryFn: () => getAllDeptemployeeList(PostDate),
    })

    const AllDeptemployeeList = useMemo(() => AllDeptEmployees || [], [AllDeptEmployees]);
    const allEmployees = useMemo(() => {
        if (AllDeptemployeeList && Array.isArray(AllDeptemployeeList)) {
            return AllDeptemployeeList.map(item => ({
                empName: item.em_name || 'N/A',
                totalComplaints: item.complaint_count || 0,
                rectifiedComplaints: item.closed_count || 0,
                DeptSec: item.sec_name,
                unrectifiedComplaints: Math.max((item.complaint_count - item.closed_count) || 0, 0),
            }));
        }
        return [];
    }, [AllDeptemployeeList]);

    const rectifiedComplaintsData = allEmployees.map(item => item.rectifiedComplaints ?? 0);
    const unrectifiedComplaintsData = allEmployees.map(item => item.unrectifiedComplaints ?? 0);
    const yLabels = allEmployees.map(item => {
        const empName = item.empName ?? 'N/A';
        const secname = item.DeptSec ?? 'Unknown Section';
        return `  ${secname}    ,    ${empName}  `;
    });

    const combinedData = yLabels.map((label, index) => {
        const rectified = rectifiedComplaintsData[index];
        const unrectified = unrectifiedComplaintsData[index];
        return {
            label,
            rectified: rectified || 0,
            unrectified: unrectified || 0,
        };
    });

    const rectifiedData = combinedData.map(item => item.rectified);
    const unrectifiedData = combinedData.map(item => item.unrectified);

    return (
        <Box sx={{ flex: 1, border: 1, borderColor: 'lightgrey', px: 1, py: 1, my: .5, bgcolor: 'white', borderRadius: 5 }}>
            <Box sx={{ flex: 1, display: 'flex' }}>
                <TextComponent text={"Top Contributors"} sx={{ flex: 1, fontWeight: 600, fontSize: 16, color: '#5D6C89', pl: 1, pt: 1 }} />
                <Box sx={{ display: 'flex', pr: 1 }}>
                    <DateRangeIcon sx={{ color: '#5D6C89', height: 20, width: 20 }} />
                    <Typography sx={{ fontSize: 13, color: '#5D6C89', pt: .3 }}>
                        From the last 7 days
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ flex: 1, }}>
                <Box sx={{ width: '100%', height: 400, }}>
                    {AllDeptemployeeList.length > 0 ? (
                        <BarChart
                            series={[
                                {
                                    data: rectifiedData,
                                    label: 'Rectified      ',
                                    id: 'Rectified',
                                    stack: 'total',
                                    color: '#CBD2DF',
                                },
                                {
                                    data: unrectifiedData,
                                    label: 'Pending',
                                    id: 'Pending',
                                    stack: 'total',
                                    color: '#F8FAFD',
                                    border: 1,
                                },
                            ]}
                            yAxis={[
                                {
                                    // data: yLabels,
                                    data: yLabels.map((label, index) => `${index + 1} ${label}`),
                                    scaleType: 'band',
                                    tickLabelStyle: {
                                        angle: 360,
                                        textAnchor: 'start',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        padding: 10,
                                        fontSize: 13,
                                        transform: 'translateX(20px)',
                                    },
                                },
                            ]}
                            margin={{ left: 20, right: 20, top: 50, bottom: 40 }}
                            layout="horizontal"
                            grid={{ vertical: true }}
                        />

                    ) : (
                        <BarChart
                            sx={{ width: '100%' }}
                            series={[
                                { data: [0], label: 'EmptyData', id: 'EmptyData', stack: 'total' },
                            ]}
                            xAxis={[{
                                data: ['No Data'], scaleType: 'band',
                            }]}
                            margin={{ left: 20, right: 20, top: 50, bottom: 40 }}
                        />
                    )}
                </Box>


            </Box>
        </Box>

    )
}

export default memo(TopPerformerList)