import React, { useState, useMemo, useEffect } from 'react'
import { Box } from '@mui/joy'
import KotItemHeader from '../KotItemList/KotItemHeader'
import CustomeTab from './CustomeTab'
import { useKotFilter } from '../DietReducer/contextprovider/KotFilterContext'
import DietMainPreperation from './NewDesignKotDelivery/DietMainPreperation'
import PreparationStatusFilter from './NewDesignKotDelivery/PreparationStatusFilter'
import {
    useGetAllAssignedOrderDetail,
    useFetchAllCanteenOrderStatus
} from '../CommonData/UseQuery';
import { socket } from 'src/ws/socket'
import { succesNotify } from 'src/views/Common/CommonCode'



const KotPreparationDelivery = () => {

    const [status, setStatus] = useState('');
    const [selectedStations, setSelectedStations] = useState([]);
    const [activeTab, setActiveTab] = useState('1');
    const [activeStatus, setActiveStatus] = useState(null);
    const { state } = useKotFilter();

    const {
        data: CanteenOrderDetails = [],
        refetch: FetchAllCanteenOrderDetail
    } = useFetchAllCanteenOrderStatus();


    const {
        data: AssingedOrders = [],
        refetch: FetchAllAssignOrderDetail
    } = useGetAllAssignedOrderDetail();



    useEffect(() => {

        console.log("socket listener mounted");
        const handleDeliveryUpdate = (data) => {
            console.log("SOCKET RECEIVED", data);
            succesNotify(
                `Your Orderd ${data?.meal} ${data?.item_name} is ${data?.delivery_status} !`
            );

            FetchAllAssignOrderDetail();
            FetchAllCanteenOrderDetail();
        };

        socket.on(
            "dietDeliveryStatusUpdated",
            handleDeliveryUpdate
        );

        return () => {

            socket.off(
                "dietDeliveryStatusUpdated",
                handleDeliveryUpdate
            );
        };

    }, []);
    const PendingOrder = CanteenOrderDetails?.filter(
        item =>
            !(AssingedOrders ?? []).some(
                assigned =>
                    assigned.canteen_order_id === item.canteen_order_id && assigned?.type_slno === item?.type_slno
            )
    );

    const DeliveryOrders =
        CanteenOrderDetails?.filter(item =>
            AssingedOrders?.some(
                assigned => assigned.canteen_order_id === item.canteen_order_id && assigned?.type_slno === item?.type_slno
            )
        );

    const FinalDeliveryOrderDetail = DeliveryOrders?.map(item => {
        const assigned = AssingedOrders?.find(
            assigned => assigned.canteen_order_id === item.canteen_order_id && assigned?.type_slno === item?.type_slno
        );

        return {
            ...item,
            assigned_to: assigned?.em_name || null,
            ItemPriority: assigned?.ItemPriority || null,
            ItemStatus: assigned?.ItemStatus || null,
            AssignyStatus: assigned?.AssignyStatus || null,
            assigned_at: assigned?.assigned_at || null,
        };
    });


    const SourceData = useMemo(() => {
        return activeTab === '2'
            ? FinalDeliveryOrderDetail
            : PendingOrder;
    }, [
        activeTab,
        PendingOrder,
        FinalDeliveryOrderDetail
    ]);

    const {
        ptsearch,
        dietName,
        dietPatient,
        diettype,
        assignee,
        nursingBed
    } = state;


 
    /* BASE FILTER */
    const filteredPatients = useMemo(() => {
        /*
            If there is no data in the selected source
            (Preparation or Delivery), return empty array.
        */
        if (!SourceData?.length) return [];
        /*
            Normalize filter values for comparison.
            - searchValue: lowercase trimmed text search
            - selectedDietSlno: selected diet identifier
            - selectedTime: selected meal type
        */
        const searchValue = ptsearch?.trim().toLowerCase();

        /*
            Apply all filters to the selected data source.
            Every condition must return true for the patient
            to be included in the final result.
        */
        return SourceData?.filter((pt) => {
            /*
                Search filter:
                Matches patient name or patient number.
                If no search text is entered, allow all.
            */
            const searchMatch =
                !searchValue ||
                pt.ptc_ptname?.toLowerCase().includes(searchValue) ||
                pt.fb_pt_no?.toLowerCase().includes(searchValue);

            /*
                Patient status filter:
                If no status selected, allow all.
            */
            const statusMatch =
                !status || pt.kitchen_status === status;


            const bedmatch =
                !nursingBed ||
                String(pt.fb_bd_code) === String(nursingBed);

            /*
                Nursing station filter:
                If no station selected, allow all.
            */
            const stationMatch =
                !selectedStations.length ||
                selectedStations.includes(pt.fb_ns_code);

            /*
                Diet name filter:
                Compare selected diet with patient diet.
                If none selected, allow all.
            */
            const dietMatch =
                !dietName ||
                String(pt.diet_id) === String(dietName);

            /*
                Diet time (meal) filter:
                Compare selected meal type with patient meal.
                If none selected, allow all.
            */
            const dietTimeMatch =
                !diettype ||
                String(pt.type_slno) === String(diettype);


            const PatientMatch = !dietPatient || String(pt.fb_pt_no) === String(dietPatient);

            return (
                searchMatch &&
                statusMatch &&
                stationMatch &&
                dietMatch &&
                dietTimeMatch &&
                PatientMatch &&
                bedmatch
            );
        });

    }, [
        SourceData,
        ptsearch,
        status,
        selectedStations,
        assignee,
        activeTab,
        nursingBed,
        dietPatient,
        diettype
    ]);





    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

            <KotItemHeader
                name={'DIET PREPERATION & DELIVERY'}
                goBackPath={''}
            />

            <CustomeTab
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setActiveStatus={setActiveStatus}
                activeStatus={activeStatus}
                FilteredPatientDetail={filteredPatients}
            />

            <PreparationStatusFilter
                selectedStations={selectedStations}
                value={status}
                onChange={setStatus}
                FilteredPatientDetail={filteredPatients}
            />

            <DietMainPreperation
                activeTab={activeTab}
                FilteredPatientDetail={filteredPatients}
                status={status}
                selectedStations={selectedStations}
                setSelectedStations={setSelectedStations}
            />

        </Box>
    )
}

export default KotPreparationDelivery
