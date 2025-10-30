import { Box, Input, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { warningNotify } from 'src/views/Common/CommonCode'
import DownloadIcon from '@mui/icons-material/Download'
import AmsReportTable from './AmsReportTable'
import { useDispatch } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close';

const AmsPatientDetailsReport = () => {

    const history = useNavigate();
    const dispatch = useDispatch();



    const backtoSetting = useCallback(() => {
        history('/Home/Reports')
    }, [history])


    const [exports, setexport] = useState(0)
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [PatientReportData, setPatientReportData] = useState([])

    const handleFromDateChange = useCallback((event) => {
        setFromDate(event.target.value)
    }, []);

    const handleToDateChange = useCallback((event) => {
        setToDate(event.target.value)
    }, [])

    const onExportClick = () => {
        if (PatientReportData.length === 0) {
            warningNotify("No Data For Download, Please select dates")
            setexport(0)
        }
        else {
            setexport(1)
        }
    }

    const postData = useMemo(() => ({
        fromDate: fromDate ? format(new Date(fromDate), 'yyyy-MM-dd 00:00:00') : null,
        toDate: toDate ? format(new Date(toDate), 'yyyy-MM-dd 23:59:59') : null,
    }), [fromDate, toDate]);

    useEffect(() => {
        if (exports === 1) {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
            setexport(0)
        }
        else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        }
    }, [exports, dispatch])

    const search = useCallback(() => {
        const getReportAntibioticPatients = async (postData) => {
            const result = await axioslogin.post('/amsAntibiotic/getReportAntibioticPatients', postData)
            const { success, data } = result.data;
            if (success === 2) {
                setPatientReportData(data)
            }
            else {
                setPatientReportData([])
            }
        }
        getReportAntibioticPatients(postData)

    }, [postData])

    const Clear = useCallback(() => {
        setexport(0)
        setFromDate('')
        setToDate('')
        setPatientReportData([])
    }, [])

    const [columnDefs] = useState([
        { headerName: "#", autoHeight: true, wrapText: true, width: 50, filter: "true", valueGetter: (params) => params.node.rowIndex + 1, minWidth: 80, },
        { headerName: "Mrd Number ", field: "mrd_no", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "IP Number", field: "patient_ip_no", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Patient Name", field: "patient_name", autoHeight: true, wrapText: true, minWidth: 280, filter: "true" },
        { headerName: "Age", field: "patient_age", autoHeight: true, wrapText: true, minWidth: 50, filter: "true" },
        { headerName: "Gender", field: "patient_gender", autoHeight: true, wrapText: true, minWidth: 100, filter: "true" },
        { headerName: "Location", field: "patient_location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Bed Number", field: "bed_code", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Consultant Department", field: "consultant_department", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Consultant Doctor", field: "doc_name", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Priority-Class Antibiotic ", field: "Antibiotic_1", minWidth: 300 },
        { headerName: "Antibiotic 1 Date of Billing", field: "Antibiotic_1_BillDate", minWidth: 200 },
        { headerName: "Antibiotic 2", field: "Antibiotic_2", minWidth: 300 },
        { headerName: "Antibiotic 2 Date of Billing", field: "Antibiotic_2_BillDate", minWidth: 300 },
        { headerName: "Antibiotic 3", field: "Antibiotic_3", minWidth: 300 },
        { headerName: "Antibiotic 3 Date of Billing", field: "Antibiotic_3_BillDate", minWidth: 300 },
        { headerName: "Antibiotic 4", field: "Antibiotic_4", minWidth: 300 },
        { headerName: "Antibiotic 4 Date of Billing", field: "Antibiotic_4_BillDate", minWidth: 300 },
        { headerName: "Antibiotic 5", field: "Antibiotic_5", minWidth: 300 },
        { headerName: "Antibiotic 5 Date of Billing", field: "Antibiotic_5_BillDate", minWidth: 300 },
        { headerName: "Clinical Assessment", field: "clinical_assesment", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Sample ID", field: "sample_id", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Date of Collection", field: "date_of_collection", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        {
            headerName: "Whether Sample Collected For Antibiotic",
            field: "samp_collect_for_antibiotic",
            valueGetter: (params) =>
                params.data.samp_collect_for_antibiotic === 1 ? "Yes" : "No",
            minWidth: 200
        },
        { headerName: "Date of issue of Report", field: "date_of_issue_of_report", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "ABST Culture Report", field: "abst_culture_report", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Empirical Antibiotic", field: "emprical_antibiotic", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Empirical Antibiotic Date of Start", field: "emprical_antibio_date_of_start", autoHeight: true, wrapText: true, minWidth: 350 },
        {
            headerName: "Empirical Antibiotic Compliance to policy",
            field: "emprical_antibio_complaince_policy_status",
            valueGetter: (params) =>
                params.data.emprical_antibio_complaince_policy === 1 ? "Yes" : "No",
            minWidth: 200
        },
        { headerName: "Escalation/De-escalation IV to Oral Switch", field: "escal_descal_iv_oral_switich", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        {
            headerName: "Compliance to Pathogen Directed Therapy",
            field: "compliance_pathogen_directed_therapy_status",
            valueGetter: (params) =>
                params.data.compliance_pathogen_directed_therapy === 1 ? "Yes" : "No",
            minWidth: 200
        },
        { headerName: "Lab No.", field: "lab_no", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Specimen", field: "specimen", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Fluid Type", field: "fluid_type", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Sample Type", field: "sample_type", autoHeight: true, wrapText: true, minWidth: 30 },
        { headerName: "Investigation", field: "investigation", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Organism 1", field: "organism_one", autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
        { headerName: "Organism 2", field: "organism_two", autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
        { headerName: "Growth", field: "growth", autoHeight: true, wrapText: true, minWidth: 350, filter: "true" },
        { headerName: "Growth Remark 1", field: "growth_remark_one", autoHeight: true, wrapText: true, minWidth: 400 },
        { headerName: "Growth Remark 2", field: "growth_remark_two", autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
        { headerName: "Growth Remark 3", field: "growth_remark_three", autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
        { headerName: "Result Verified Date", field: "result_verified_date", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Cultural Details Remark", field: "culture_details_remarks", autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
        { headerName: "Physician And Ams Comments", field: "physician_ams_comments", autoHeight: true, wrapText: true, minWidth: 400, filter: "true" },
        { headerName: "Patient Out Come", field: "patient_outcome", autoHeight: true, wrapText: true, minWidth: 400 },
    ])

    return (
        <Box sx={{ flexGrow: 1, }} >
            <Box sx={{ height: 30, bgcolor: '#eff3f6', display: 'flex' }}>
                <Box sx={{ flex: 1, p: .5 }}>
                    Antibiotic Prescription Patient Report
                </Box>
                <CusIconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    clickable="true"
                    onClick={backtoSetting}
                >
                    <CloseIcon fontSize="small" />
                </CusIconButton>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                m: 0
            }} >
                <Box sx={{ display: 'flex', justifyContent: 'center', flex: 1, mt: 2, gap: .5 }}>
                    <Box sx={{ width: 180 }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: .5 }}>Bill Date From</Typography>
                        <Input
                            variant="outlined"
                            type='date'
                            size='sm'
                            value={fromDate || ""}
                            name='fromDate'
                            onChange={handleFromDateChange}
                        />
                    </Box>
                    <Box sx={{ width: 180 }} >
                        <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550, pl: .5 }} >Bill Date To</Typography>
                        <Input
                            variant="outlined"
                            type='date'
                            size='sm'
                            value={toDate || ""}
                            name='toDate'
                            disabled={!fromDate}
                            slotProps={{
                                input: {
                                    min: fromDate,
                                    max: format(new Date(), "yyyy-MM-dd")
                                },
                            }}
                            onChange={handleToDateChange}
                        />
                    </Box>
                    <Box sx={{ pt: 2.4 }} >
                        <CusIconButton size="sm" variant="outlined" clickable="true" onClick={search} >
                            <SearchOutlinedIcon fontSize='small' sx={{ color: '#145DA0' }} />
                        </CusIconButton>
                    </Box>
                    <Box sx={{ pt: 2.4 }} >
                        <CusIconButton size="sm" variant="outlined" clickable="true" onClick={Clear} >
                            <RefreshIcon fontSize='small' sx={{ color: '#145DA0' }} />
                        </CusIconButton>
                    </Box>
                </Box>
            </Box>
            <Paper square sx={{ width: { md: '100%', lg: '100%', xl: '100%' }, p: 1 }}>
                <Paper
                    square
                    sx={{
                        backgroundColor: '#f0f3f5',
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexDirection: 'row-reverse',
                        gap: 0.1,
                        p: 0.3,
                        borderLeft: 2,
                        borderColor: '#d3d3d3',
                    }}
                >
                    <Box>
                        <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                            <DownloadIcon />
                        </CusIconButton>
                    </Box>
                </Paper>
                <AmsReportTable
                    columnDefs={columnDefs}
                    tableData={PatientReportData}
                />
            </Paper>
            <Box sx={{ height: 30, bgcolor: '#eff3f6', display: 'flex', justifyContent: 'flex-end' }}>
                <CusIconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    clickable="true"
                    onClick={backtoSetting}
                >
                    <CloseIcon fontSize="small" />
                </CusIconButton>
            </Box>
        </Box>

    )
}

export default AmsPatientDetailsReport

