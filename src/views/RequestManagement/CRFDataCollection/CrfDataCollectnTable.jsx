import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { getdataCollectionCRF } from 'src/redux/actions/CRFDataCollectionDept.action'
import _ from 'underscore'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CRFDataCollectinModel from './CRFDataCollectinModel'
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Typography } from '@mui/material'

const CrfDataCollectnTable = () => {

    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)

    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [datas, setdatas] = useState([])

    const empdeptsec = useSelector((state) => state.LoginUserData.empsecid, _.isEqual)

    useEffect(() => {
        dispatch(getdataCollectionCRF(empdeptsec))
    }, [dispatch, count, empdeptsec])

    const tabledata = useSelector((state) => {
        return state.setdataCollectionCRF.dataCollectionCrfList
    })

    //column title setting
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 80, cellRenderer: params => {
                if (params.data.senior_manage_approv !== null) {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <TextSnippetIcon />
                    </IconButton>
                } else {
                    return <IconButton onClick={() => DataEntry(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Data Entry">
                            <TextSnippetIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },

        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Emergency", field: "Emergency", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 180, autoHeight: true, wrapText: true, },
        { headerName: "Inch.Appr.Status", field: "approve_incharge", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Incharge Remarks", field: "incharge_remarks", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Hod.Approve Status", field: "approve_hod", minWidth: 150, wrapText: true, },
        { headerName: "Hod Remarks", field: "hod_remarks", minWidth: 300, wrapText: true, },
        { headerName: "OM Approve Status", field: "manag_operation_approvs", minWidth: 150, wrapText: true, },
        { headerName: "OM Remarks", field: "manag_operation_remarks", minWidth: 300, wrapText: true, },
        { headerName: "SMO Approve Status", field: "senior_manage_approvs", minWidth: 150, wrapText: true, },
        { headerName: "SMO Remarks", field: "senior_manage_remarks", minWidth: 300, wrapText: true, },
        { headerName: "CAO/COO/MD Approve Status", field: "cao_approves", minWidth: 150, wrapText: true, },
        { headerName: "CAO/COO/MD Remarks", field: "cao_approve_remarks", minWidth: 300, wrapText: true, },
        { headerName: "ED/MD Approve Status", field: "ed_approves", minWidth: 150, wrapText: true, },
        { headerName: "ED/MD Remarks", field: "ed_approve_remarks", minWidth: 300, wrapText: true, },
    ])


    const DataEntry = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(1)
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    const getRowStyle = params => {
        if (params.data.crf_dept_remarks === null) {
            return { background: '#81d4fa' };
        }
        else {
            return { background: '#81d4fa' };
        }

    };

    return (
        <CardCloseOnly
            title="Data Collection For CRF"
            close={backtoSetting}
        >

            {model === 1 ?
                <CRFDataCollectinModel

                    open={open}
                    setOpen={setOpen}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                /> : null}


            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                    getRowStyle={getRowStyle}
                />
            </Box>
            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
            }}>
                <Box sx={{ display: "flex" }}>
                    <IconButton >
                        <CropSquareIcon sx={{ background: '#81d4fa', pr: 5 }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", fontWeight: 400, pl: 1, pt: 1.2 }}>
                    <Typography >
                        Data already Given
                    </Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <IconButton >
                        <CropSquareIcon sx={{ background: '#fff59d', pr: 5 }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", fontWeight: 400, pl: 1, pt: 1.2 }}>
                    <Typography >
                        Data Not Given
                    </Typography>
                </Box>
            </Box>
        </CardCloseOnly>
    )
}

export default memo(CrfDataCollectnTable)