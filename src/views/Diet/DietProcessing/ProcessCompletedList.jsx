import React, { memo, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import { bodyCell, headerCell, rowStyle } from '../CommonData/Common'
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak'
import DietButton from '../DietComponent/DietButton'
import NotProcessed from './NotProcessed'
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import PatientScheduleCancelModal from '../DietModal/PatientScheduleCancelModal'
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import CustomeIncidentLoading from 'src/views/IncidentManagement/Components/CustomeIncidentLoading'


const ProcessCompletedList = ({
    processedRows,
    fetchscheduled,
    fetchactive
}) => {
    const id = useSelector(state => state.LoginUserData.empid);
    const [open, setOpen] = useState(false)
    const [selectedpatient, setSelectedPatient] = useState({});
    const [loading, setLoading] = useState(false);

    const filteredList = useMemo(() => {
        return processedRows
    }, [processedRows])


    /** SINGLE ROW PROCESS */
    const HandleCancelPatientType = (Patient) => {
        if (!Patient.patient_diet_id) return warningNotify("Patient Id is Missing!");
        setOpen(true)
        setSelectedPatient(Patient)
    };



    const HanldeFoodDelivered = async (patient) => {
        if (!patient.patient_diet_id) return warningNotify("Patient Id is Missing!");
        const payload = {
            patient_diet_id: patient.patient_diet_id,
            status: "SERVED",
            updated_by: id
        };

        try {
            setLoading(true);
            const response = await axioslogin.post(
                "/dietschedule/schedule/serve",
                payload
            );
            const { success, message } = response.data ?? {};
            if (success === 0) return warningNotify(message || "Error in Updating Status");
            succesNotify(message);
            fetchscheduled();
            fetchactive();
        } catch (error) {
            console.error(error);
            errorNotify("Error in Updating Status");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ width: '100%', borderRadius: 8, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
            {loading && <CustomeIncidentLoading text={"Updating Please Wait"} />}
            {/* HEADER */}
            <Box sx={{ ...rowStyle, backgroundColor: '#7c51a1', borderBottom: '1px solid #ddd' }}>
                <Box sx={{ width: 70, fontWeight: 600, fontSize: 13, color: 'white' }}>Sl No</Box>
                <Box sx={headerCell}>Diet Name</Box>
                <Box sx={headerCell}>Patient Name</Box>
                <Box sx={headerCell}>Process Date</Box>
                <Box sx={headerCell}>Type</Box>
                <Box sx={headerCell}>Status</Box>
                <Box sx={headerCell}>Cancel</Box>
                <Box sx={headerCell}>Served</Box>
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
                                <Box sx={bodyCell}>{row?.schedule_status}</Box>
                                <Box sx={bodyCell}>
                                    <DietButton
                                        width={40}
                                        onClick={() => HandleCancelPatientType(row)}
                                        disabled={row?.schedule_status !== 'PENDING' || loading}
                                        name={''}
                                        icon={InsertPageBreakIcon}
                                    /></Box>
                                <Box sx={bodyCell}>
                                    <DietButton
                                        width={40}
                                        onClick={() => HanldeFoodDelivered(row)}
                                        disabled={row?.schedule_status !== 'PENDING'
                                            || loading}
                                        name={''}
                                        icon={BrunchDiningIcon}
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
                // onConfirm={(data) => HandlePatientMealcancellation(data)}
                />

            </Box>
        </Box>
    )
}

export default memo(ProcessCompletedList)
