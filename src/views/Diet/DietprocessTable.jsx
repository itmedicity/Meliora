import React, { useState, useCallback, useEffect, memo, Fragment } from 'react'
import { Box } from '@mui/material'
import CusAgGridMast from '../Components/CusAgGridMast'
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import DietProcessModel from './DietProcessModel';
import Button from '@mui/material/Button';
const DietprocessTable = ({ depand }) => {
    const [tabledata, setTabledata] = useState([])
    const [open, setOpen] = useState(false);
    //column title setting
    const [column] = useState([
        { headerName: "Plan Slno", field: "plan_slno" },
        { headerName: "Patient Id", field: "pt_no" },
        { headerName: "Patient Name", field: "ptc_ptname" },
        { headerName: "Room/Ward", field: "bdc_no" },
        { headerName: "Plan Date", field: "plan_date" },
        { headerName: "Remarks", field: "plan_remark" },
        {
            headerName: 'Diet Process', cellRenderer: params => <IconButton
                sx={{ color: editicon, paddingY: 0.5 }}
                onClick={() => dietProcess(params)}>
                <TaskAltRoundedIcon />
            </IconButton>
        }
    ])
    const [columnprocess] = useState([
        { headerName: "Plan Slno", field: "plan_slno" },
        { headerName: "Patient Id", field: "pt_no" },
        { headerName: "Patient Name", field: "ptc_ptname" },
        { headerName: "Room/Ward", field: "bdc_no" },
        { headerName: "Plan Date", field: "plan_date" },
        { headerName: "Remarks", field: "plan_remark" },
    ])

    //get all data
    useEffect(() => {
        const getUserTable = async () => {
            if (depand === 1) {
                const result = await axioslogin.get('/dietplan/getdietplan/NewOrder')
                const { success, data } = result.data
                if (success === 1) {
                    setTabledata(data)
                } else {
                    warningNotify("Error occured contact EDP")
                }
            } else {
                const result = await axioslogin.get('/dietplan/dirtplan/proceeslist')
                const { success, data } = result.data
                if (success === 1) {
                    setTabledata(data)
                } else {
                    warningNotify("Error occured contact EDP")
                }
            }
        }
        getUserTable();
    }, [depand])

    const [detail, setdeatial] = useState([])
    const [mdopen, setmdopen] = useState(0)
    const dietProcess = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setdeatial(data)
        setmdopen(1)
        setOpen(true)
    }, [])

    const allProcess = () => {

    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        < Fragment >
            {mdopen !== 0 ? <DietProcessModel open={open} handleClose={handleClose} detail={detail} /> : null}
            <Box sx={{ width: "100%", pt: 1 }}>
                {depand === 1 ?
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        // background: "blue",
                        display: "flex",
                        flexDirection: { xl: "column", lg: "column", md: "column", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            alignItems: "flex-end",
                        }}>
                            <Box sx={{
                                width: "20%", pl: 1, pr: 1, pb: 1,
                            }}>
                                <Button onClick={allProcess} variant="contained" size="small" color="primary">All</Button>
                            </Box>
                        </Box>
                        <CusAgGridMast
                            columnDefs={column}
                            tableData={tabledata}
                        />
                    </Box>
                    : null
                }
                {depand === 0 ?
                    <CusAgGridMast
                        columnDefs={columnprocess}
                        tableData={tabledata}
                    /> : null
                }
            </Box>
        </Fragment >
    )
}

export default memo(DietprocessTable)