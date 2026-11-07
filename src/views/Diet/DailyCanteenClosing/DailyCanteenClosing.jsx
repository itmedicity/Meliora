import { Box } from '@mui/material';
import React, { memo, useState } from 'react'
import KotItemHeader from '../KotItemList/KotItemHeader';
import PosFilterComponent from '../DietPos/PosComponent/PosFilterComponent';
import CanteenClosinngMain from './CanteenClosinngMain';
import { useGetTodayDetailBillSumary, useGetTodaySettledBillDetails } from '../CommonData/UseQuery';
import { usePosFilter } from '../DietReducer/contextprovider/PosFilterContext';
import ClosingTab from './ClosingTab';
import ClosingSummaryView from './CanteenClosingSummaryComponent/ClosingSummaryView';

const DailyCanteenClosing = () => {


    const { state } = usePosFilter();
    const [search, setSearch] = useState("");
    const [selectedStations, setSelectedStations] = useState([])
    const [activeTab, setActiveTab] = useState("SUMMARY");
    const { bed, patient } = state;

    const { data: SettledPatientDetails = [] } = useGetTodaySettledBillDetails();

    const { data: TodayDetailBillSummary = [] } = useGetTodayDetailBillSumary();


    //filtering patient details
    const FinalAdmmiteddDetail = Array.isArray(SettledPatientDetails)
        ? SettledPatientDetails?.filter(item => {
            const bedMatch =
                !bed ||
                String(item?.bed_code) === String(bed);


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
            <KotItemHeader name="DAILY CANTEEN CLOSING " />

            <ClosingTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            {
                activeTab === "SUMMARY" ?
                    <ClosingSummaryView orders={TodayDetailBillSummary} />

                    : (
                        <>

                            <PosFilterComponent
                                FinalAdmmiteddDetail={SettledPatientDetails}
                                selectedStations={selectedStations}
                                search={search}
                                setSearch={setSearch}
                            />


                            <CanteenClosinngMain
                                orders={FinalAdmmiteddDetail}
                                selectedStations={selectedStations}
                                setSelectedStations={setSelectedStations}
                            />

                        </>
                    )
            }


        </Box>
    )
}

export default memo(DailyCanteenClosing);