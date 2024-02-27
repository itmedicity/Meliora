import React, { Fragment, memo, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { Box } from '@mui/material';

const DailyCensusTableView = ({ tableData, rowSelect }) => {
    const [column] = useState([
        {
            headerName: 'Action', width: 50,
            cellRenderer: (params) => <EditIcon sx={{ color: '#00838f' }}
                onClick={() => rowSelect(params)}
            />
        },
        { headerName: "Department", field: "qi_census_sec_name", width: 150, filter: "true" },
        { headerName: "Date", field: "census_date", width: 100, align: 'center' },
        { headerName: "Yesterday Census", field: "yesterday_census", width: 100 },
        { headerName: "Admissions", field: "total_admission", width: 100 },
        { headerName: "Discharge", field: "total_discharge", width: 80 },
        { headerName: "Transfer In", field: "transfer_in", width: 80 },
        { headerName: "Transfer Out", field: "transfer_out", width: 80 },
        { headerName: "Death", field: "total_death", width: 60, },
        { headerName: "Total", field: "census_total", width: 60 },
    ])

    // const [TotalReport] = useState([

    //     { headerName: "Department", field: "qi_census_sec_name", width: 150, filter: "true" },
    //     { headerName: "Yesterday Census", field: "yesterday_census", width: 100 },
    //     { headerName: "Admissions", field: "total_admission", width: 100 },
    //     { headerName: "Discharge", field: "total_discharge", width: 80 },
    //     { headerName: "Transfer In", field: "transfer_in", width: 80 },
    //     { headerName: "Transfer Out", field: "transfer_out", width: 80 },
    //     { headerName: "Death", field: "total_death", width: 60, },
    //     { headerName: "Total", field: "census_total", width: 60 },
    // ])

    // const column = viewFlag === true ? dailyColumn : TotalReport

    return (
        <Fragment>
            <Box sx={{ minHeight: 500 }}>

                <CusAgGridMast

                    columnDefs={column}
                    tableData={tableData}
                    onClick={rowSelect}
                />

                {/* <CustomAGSelect
                    columnDefs={column}
                    tableData={tableData}
                    onClick={rowSelect}
                /> */}
            </Box>
        </Fragment>
    )
}

export default memo(DailyCensusTableView)