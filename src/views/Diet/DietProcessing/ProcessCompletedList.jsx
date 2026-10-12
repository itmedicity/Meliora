import React, { memo, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import { bodyCell, headerCell, rowStyle } from '../CommonData/Common'
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak'
import DietButton from '../DietComponent/DietButton'
import NotProcessed from './NotProcessed'
import {
    //errorNotify, succesNotify,
    warningNotify
} from 'src/views/Common/CommonCode'
import PatientScheduleCancelModal from '../DietModal/PatientScheduleCancelModal'


const ProcessCompletedList = ({
    processedRows,
    fetchscheduled,
    fetchactive
}) => {
    // const id = useSelector(state => state.LoginUserData.empid);
    const [open, setOpen] = useState(false)
    const [selectedpatient, setSelectedPatient] = useState({});
    // const [loading, setLoading] = useState(false);

    const filteredList = useMemo(() => {
        return processedRows
    }, [processedRows])


    /** SINGLE ROW PROCESS */
    const HandleCancelPatientType = (Patient) => {
        if (!Patient.patient_diet_id) return warningNotify("Patient Id is Missing!");
        setOpen(true)
        setSelectedPatient(Patient)
    };


    return (
        <Box sx={{ width: '100%', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            {/* {loading && <CustomeIncidentLoading text={"Updating Please Wait"} />} */}
            {/* HEADER */}
            <Box sx={{ ...rowStyle, backgroundColor: '#7c51a1', borderBottom: '1px solid #ddd' }}>
                <Box sx={{ width: 70, fontWeight: 600, fontSize: 13, color: 'white' }}>Sl No</Box>
                <Box sx={headerCell}>Diet Name</Box>
                <Box sx={headerCell}>Patient Name</Box>
                <Box sx={headerCell}>Process Date</Box>
                <Box sx={headerCell}>Type</Box>
                <Box sx={headerCell}>Status</Box>
                <Box sx={headerCell}>Cancel</Box>
                {/* <Box sx={headerCell}>Served</Box> */}
            </Box>

            {/* BODY */}
            <Box sx={{ maxHeight: 720, overflowY: 'auto', backgroundColor: '#fff', }}>
                {filteredList?.length === 0 && <NotProcessed />}

                {
                    filteredList?.map((row, index) => {
                        return (
                            <Box
                                key={row?.patient_diet_id}
                                sx={{
                                    ...rowStyle,
                                    borderBottom: '1px solid #f0f0f0',
                                    '&:hover': { backgroundColor: '#fafafa' }
                                }}
                            >
                                <Box sx={{ width: 70, fontSize: 12 }}>{index + 1}</Box>
                                <Box sx={bodyCell}>{row?.diet_name}</Box>
                                <Box sx={bodyCell}>{row?.patient_name}</Box>
                                <Box sx={bodyCell}>{row?.process_date}</Box>
                                <Box sx={bodyCell}>{row?.type_desc}</Box>
                                {/* <Box sx={bodyCell}>{row?.schedule_status}</Box>
                                 */}
                                 <Box
    sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.7,
        px: 1.2,
        py: 0.5,
        borderRadius: "999px",
        fontSize: "10px",
        fontWeight: 800,
        letterSpacing: "0.3px",

        ...(row?.schedule_status === "SERVED" && {
            color: "#2e7d32",
            backgroundColor: "#edf7ed",
            border: "1px solid #c8e6c9",
        }),

        ...(row?.schedule_status === "PENDING" && {
            color: "#ed6c02",
            backgroundColor: "#fff8e1",
            border: "1px solid #ffe082",
        }),

        ...(row?.schedule_status === "CANCELLED" && {
            color: "#d32f2f",
            backgroundColor: "#fff1f1",
            border: "1px solid #ffcdd2",
        }),
    }}
>
    <Box
        sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor:
                row?.schedule_status === "SERVED"
                    ? "#43a047"
                    : row?.schedule_status === "PENDING"
                    ? "#fb8c00"
                    : "#e53935",
        }}
    />

    {row?.schedule_status || "PENDING"}
</Box>
                                <Box sx={bodyCell}>
                                    <DietButton
                                        width={40}
                                        onClick={() => HandleCancelPatientType(row)}
                                        disabled={row?.schedule_status !== 'PENDING'}
                                        name={''}
                                        icon={InsertPageBreakIcon}
                                    /></Box>
                            </Box>
                        )
                    })}

                <PatientScheduleCancelModal
                    open={open}
                    onClose={() => setOpen(false)}
                    patient={selectedpatient}
                    fetchscheduled={fetchscheduled}
                    fetchactive={fetchactive}
                />

            </Box>
        </Box>
    )
}

export default memo(ProcessCompletedList)
