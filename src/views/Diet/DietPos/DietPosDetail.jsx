import React, { useState } from 'react';
import { Box } from '@mui/material';
import KotItemHeader from '../KotItemList/KotItemHeader';
import PosOrderTab from './PosComponent/PosOrderTab';
import PosFilterComponent from './PosComponent/PosFilterComponent';
import PosMain from './PosComponent/PosMain';
import {
    // useAllAdmittedPatientDetail,
    useNewBillablePatientDetail
} from '../CommonData/UseQuery';
import { usePosFilter } from '../DietReducer/contextprovider/PosFilterContext';


const DietPosDetail = () => {


    const { state } = usePosFilter();
    const [selectedStations, setSelectedStations] = useState([])
    const [activeTab, setActiveTab] = useState("PENDING");
    const [activeStatus, setActiveStatus] = useState(null);

    const { bed, patient } = state;

    // const { data: admittedPatients = [] } = useAllAdmittedPatientDetail(selectedStations)
    const { data: admittedPatients = [] } = useNewBillablePatientDetail(activeTab)


    console.log({
        activeTab
    });
    


    // Replace with your API data
    const posOrders = [
        { bill_status: "PENDING" },
        { bill_status: "PENDING" },
        { bill_status: "BILLED" },
        { bill_status: "BILLED" },
    ];

    const FinalAdmmiteddDetail = Array.isArray(admittedPatients) && bed
        ? admittedPatients.filter(item => String(item.fb_bd_code) === String(bed))
        : admittedPatients;



    const FinalPatientDetail = Array.isArray(admittedPatients)
        ? admittedPatients.filter(item => {
            const bedMatch = !bed || String(item.fb_bd_code) === String(bed);
            const patientMatch = !patient || String(item.fb_pt_no) === String(patient);

            return bedMatch && patientMatch;
        })
        : [];

    console.log({
        FinalPatientDetail
    });


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <KotItemHeader name="POINT OF SALES" />

            <PosOrderTab
                posOrders={posOrders}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
            />

            <PosFilterComponent
                FinalAdmmiteddDetail={FinalAdmmiteddDetail}
                selectedStations={selectedStations}
            />
            <PosMain
                orders={FinalPatientDetail}
                selectedStations={selectedStations}
                setSelectedStations={setSelectedStations}
                activeTab={activeTab}
            />
        </Box>
    );
};

export default DietPosDetail;