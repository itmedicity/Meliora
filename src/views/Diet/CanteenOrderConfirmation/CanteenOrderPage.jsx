import React, { useState, useMemo } from 'react'
import { Box } from '@mui/joy'
import KotItemHeader from '../KotItemList/KotItemHeader'
import CanteenOrderTab from './Components/CanteenOrderTab'
import CanteenFilterComponent from './Components/CanteenFilterComponent'
import { useCanteenFilter } from '../DietReducer/contextprovider/CanteenFilterContext'
import CanteenMain from '../CanteenOrderConfirmation/CanteenMain'
import { useFetchAllCanteenOrders } from '../CommonData/UseQuery'

const CanteenOrderPage = () => {

    const [selectedStations, setSelectedStations] = useState([])
    const [activeStatus, setActiveStatus] = useState(null)
    const [activeTab, setActiveTab] = useState("PENDING")


    const { state } = useCanteenFilter()

    const {
        bed,
        patient,
        meal,
        type,
        search,
        status
    } = state

    /* API CALL */
    const { data: allOrders = [] } =
        useFetchAllCanteenOrders(activeTab)




    /* FILTER LOGIC */
    const filteredOrders = useMemo(() => {
        if (!allOrders?.length) return []

        const searchVal = search?.toLowerCase()

        return allOrders.filter(order => (
            (!searchVal ||
                order.fb_ptc_name?.toLowerCase().includes(searchVal) ||
                order.canteen_order_id?.toString().includes(searchVal)
            ) &&

            (!bed || String(order.fb_bd_code) === String(bed)) &&
            (!patient || order.fb_pt_no?.toLowerCase().includes(patient.toLowerCase())) &&

            (!meal ||
                order.item_name?.toLowerCase().includes(meal.toLowerCase())
            ) &&

            (!type || String(order.party_type_id) === String(type)) &&
            (!status || order.order_status === status) &&

            (!selectedStations.length ||
                selectedStations.includes(order.fb_ns_code)
            ) &&

            (!activeStatus ||
                order.order_status === activeStatus
            )
        ))
    }, [
        allOrders,
        bed,
        patient,
        meal,
        type,
        search,
        status,
        selectedStations,
        activeStatus
    ])


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

            <KotItemHeader name={'CANTEEN ORDER DETAILS'} />

            {/* STATUS TAB */}
            <CanteenOrderTab
                canteenOrders={allOrders}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
            />

            {/* FILTER */}
            <CanteenFilterComponent selectedStations={selectedStations} />

            {/* TABLE */}
            <CanteenMain
                activeTab={activeTab}
                orders={filteredOrders}
                selectedStations={selectedStations}
                setSelectedStations={setSelectedStations}
            />

        </Box>
    )
}

export default CanteenOrderPage