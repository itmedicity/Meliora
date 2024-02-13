import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { DownloadReportPdf } from './DownloadReportPdf';
import { ExporttoExcel } from './ExpertToExcel';
import { Paper } from '@mui/material';
import { Box, Tooltip, Typography } from '@mui/joy';
import CusIconButton from 'src/views/Components/CusIconButton';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ReportViewTable from './ReportViewTable';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import { BarChart, axisClasses } from '@mui/x-charts';


const DailyReportOfQI = ({ tableData, reportName, headerNames1, headerNames2, setTableFlag, setTableData, dateRange, processDate }) => {
    const [excelData, setExcelData] = useState([])
    // const [xValue, setxValue] = useState([])
    // const [yValue, setyValue] = useState([])
    const [barData, setBarData] = useState([])
    const [flag, setFlag] = useState(0)
    const history = useHistory()
    const backtoHome = useCallback(() => {
        setTableFlag(0)
        setTableData([])
        setFlag(0)
        history.push('/Home/QIDailyReport')
    }, [history, setTableFlag, setTableData])
    const fileName = "QI Daily Report";

    const pdfDownlloadView = useCallback((e) => {
        DownloadReportPdf(reportName, tableData, headerNames1, headerNames2)
    }, [reportName, tableData, headerNames1, headerNames2])

    const ExcelView = useCallback((e) => {
        ExporttoExcel(reportName, excelData, headerNames1, headerNames2, fileName)
    }, [reportName, excelData, headerNames1, headerNames2, fileName])

    // useEffect(() => {
    //     if (tableData.length !== 0) {

    //         const mergedArray = dateRange?.map(item1 => {
    //             const newarray = tableData.find(item2 => (item2.date) === moment(new Date(item1)).format('DD-MM-YYYY'));
    //             const result = newarray ? newarray.data3 : 0;

    //             return { day: moment(new Date(item1)).format('MMM-D'), result: result };
    //         });

    //         // console.log(mergedArray);
    //         const x = mergedArray?.map((val) => val.day)
    //         setxValue(x)
    //         const y = mergedArray?.map((val) => val.result)
    //         setyValue(y)
    //         setFlag(1)
    //     }
    // }, [tableData])


    useEffect(() => {
        if (tableData.length !== 0) {
            const newData = tableData?.map((val) => {
                return {
                    date: val.date,
                    data1: val.data1,
                    data2: val.data2,
                    data3: val.data3
                }
            })
            setExcelData(newData)
            const mergedArray = dateRange?.map(item1 => {
                const newarray = tableData.find(item2 => (item2.date) === moment(new Date(item1)).format('DD-MM-YYYY'));
                const result = newarray ? newarray.data3 : 0;

                return { day: parseInt(moment(new Date(item1)).format('D')), result: parseFloat(result) };
            });
            setBarData(mergedArray)
            setFlag(1)
        }
    }, [tableData, dateRange])

    const chartSetting = {
        yAxis: [
            {
                label: 'Result', color: 'darkgreen'
            },
        ],
        sx: {

            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-2px, 0)',
            },
        },
    };
    const valueFormatter = (value) => `${value}`;
    const today = new Date(processDate);
    const month = today.toLocaleString('default', { month: 'long' });

    return (

        <Fragment>
            <ToastContainer />

            <Box>
                <Paper sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', flex: 1, fontSize: 18, pt: 0.8, justifyContent: 'center', bgcolor: '#DBE8D8' }}>
                        <Box sx={{}}>
                            <Typography sx={{ color: 'darkgreen', fontSize: 16, textTransform: 'uppercase', fontWeight: 550 }}>
                                {reportName}
                            </Typography>
                        </Box>
                        <Box sx={{ color: 'darkgreen', fontSize: 15, textTransform: 'uppercase', fontWeight: 550, pl: 1 }}>
                            <Typography> &nbsp;-&nbsp; </Typography>
                        </Box>
                        <Box sx={{ color: 'darkgreen', fontSize: 16, textTransform: 'uppercase', fontWeight: 550, pl: 1 }} >
                            <Typography>{month}</Typography>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, bgcolor: '#DBE8D8', opacity: 0.8 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary"  >
                            <Tooltip title="Excel" placement="bottom" >
                                <DownloadIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: 'darkgreen' }}
                                    onClick={ExcelView} />
                            </Tooltip>
                        </CusIconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, bgcolor: '#DBE8D8', opacity: 0.8 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary"  >
                            <Tooltip title="PDF" placement="bottom" >
                                <PictureAsPdfIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: 'darkgreen' }}
                                    onClick={pdfDownlloadView} />
                            </Tooltip>
                        </CusIconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', fontSize: 20, pt: 0.5, pl: 0.5, bgcolor: '#DBE8D8', opacity: 0.8 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary"  >
                            <Tooltip title="Close" placement="bottom" >
                                <CloseIcon sx={{ cursor: 'pointer', size: 'lg', width: 35, height: 25, color: 'darkgreen' }}
                                    onClick={backtoHome}
                                />
                            </Tooltip>
                        </CusIconButton>
                    </Box>
                </Paper>
                <Box sx={{ pt: 0.5 }}>
                    <ReportViewTable tableData={tableData} headerNames1={headerNames1} headerNames2={headerNames2} />
                </Box>
                <Paper sx={{ pl: 2 }}>
                    {
                        flag === 1 ?
                            <Box sx={{ flexGrow: 1 }}>
                                <BarChart
                                    width={1500}
                                    height={400}
                                    dataset={barData}
                                    xAxis={[{ scaleType: 'band', dataKey: 'day', color: 'darkgreen' }]}
                                    series={[{ dataKey: "result", label: 'Result', color: '#33691e', valueFormatter }]}
                                    {...chartSetting}
                                />
                            </Box>
                            : <Box>

                            </Box>
                    }
                </Paper>

                {/* <BarChart
                    height={500}
                    width={800}
                    series={[
                        { data: yValue },
                    ]}
                    xAxis={[{ data: xValue, scaleType: 'band' }]}
                /> */}

            </Box >

        </Fragment >
    )
}

export default memo(DailyReportOfQI)