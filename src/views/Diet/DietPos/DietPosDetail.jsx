import React, { useState } from 'react';
import { Box } from '@mui/material';
import KotItemHeader from '../KotItemList/KotItemHeader';
import PosOrderTab from './PosComponent/PosOrderTab';
import PosFilterComponent from './PosComponent/PosFilterComponent';
import PosMain from './PosComponent/PosMain';
import {
    useNewBillablePatientDetail
} from '../CommonData/UseQuery';
import { usePosFilter } from '../DietReducer/contextprovider/PosFilterContext';


const DietPosDetail = () => {


    const { state } = usePosFilter();
    const [selectedStations, setSelectedStations] = useState([])
    const [activeTab, setActiveTab] = useState("PENDING");
    const [search, setSearch] = useState("");


    const { bed, patient } = state;

    const { data: admittedPatients = [] } = useNewBillablePatientDetail(activeTab)



    const filteredPatients = Array.isArray(admittedPatients)
        ? admittedPatients.filter(item => {
            if (activeTab === 'SETTLED') {
                return item?.is_settled === 'Y';
            }
            if (activeTab === 'BILLED') {
                return item?.is_settled !== 'Y';
            }
            return true;
        })
        : [];


    const FinalAdmmiteddDetail = Array.isArray(filteredPatients)
        ? filteredPatients?.filter(item => {
            const bedMatch =
                !bed ||
                String(item?.bed_code) === String(bed);

            const stationMatch =
                !selectedStations?.length ||
                selectedStations.some(
                    station =>
                        String(station) === String(item?.nursing_station_code)
                );

            return bedMatch && stationMatch;
        })
        : [];


    console.log({
        admittedPatients
    });


    const FinalPatientDetail = Array.isArray(filteredPatients)
        ? filteredPatients.filter(item => {
            const bedMatch =
                !bed || String(item?.bed_code) === String(bed);

            const patientMatch =
                !patient || String(item?.pt_no) === String(patient);

            const nsStationMatch =
                !selectedStations?.length ||
                selectedStations.some(
                    station =>
                        String(station) === String(item?.nursing_station_code)
                );

            const searchText = String(search ?? '').trim().toLowerCase();

            const searchMatch =
                !searchText ||
                String(item?.pt_no ?? '').toLowerCase().includes(searchText) ||
                String(item?.patient_name ?? '').toLowerCase().includes(searchText);

            return bedMatch && patientMatch && nsStationMatch && searchMatch;
        })
        : [];







    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <KotItemHeader name="PATIENT FINAL SETTLEMENT" />

            <PosOrderTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            <PosFilterComponent
                FinalAdmmiteddDetail={FinalAdmmiteddDetail}
                selectedStations={selectedStations}
                search={search}
                setSearch={setSearch}
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