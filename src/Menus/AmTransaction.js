import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AmTransactions = [
    {
        men_slno: 178,
        component: CNavItem,
        name: 'Dashboard',
        to: '/Home/AssetDashboardM',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 266,
        component: CNavItem,
        name: 'Asset Overview',
        to: '/Home/AssetDashboardMain',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 144,
        component: CNavItem,
        name: 'Item Name Creation',
        to: '/Home/ItemNameCreation',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 145,
        component: CNavItem,
        name: 'Asset Opening Entry',
        to: '/Home/ItemCreation',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 155,
        component: CNavItem,
        name: 'Asset Detail Entry',
        to: '/Home/AssetItemListView',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 163,
        component: CNavItem,
        name: 'Asset Transfer',
        to: '/Home/AssetDeptTransfer',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 110,
        component: CNavItem,
        name: 'Stock Details',
        to: '/Home/AssetStockDetails',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 225,
        component: CNavItem,
        name: 'Condemnation List',
        to: '/Home/AssetCondemnationList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    // {
    //     men_slno: 259,
    //     component: CNavItem,
    //     name: 'Approve Condemnation',
    //     to: '/Home/CondemnationApproval',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },
    // {
    //     men_slno: 268,
    //     component: CNavItem,
    //     name: 'All Condemnation List ',
    //     to: '/Home/AllDeptCondemList',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },

    {
        men_slno: 228,
        component: CNavItem,
        name: 'PM Due List',
        to: '/Home/PmDueList',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 267,
        component: CNavItem,
        name: 'Asset List',
        to: '/Home/DepartmentAssets',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },



    //////////////
    // {
    //     men_slno: 144,
    //     component: CNavItem,
    //     name: 'Asset Name Creation',
    //     to: '/Home/ItemNameCreation',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },

    // {
    //     men_slno: 145,
    //     component: CNavItem,
    //     name: 'Asset Opening Entry',
    //     to: '/Home/ItemCreation',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },
    // {
    //     men_slno: 155,
    //     component: CNavItem,
    //     name: 'Asset Detail Entry',
    //     to: '/Home/AssetItemListView',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },
    // {
    //     men_slno: 163,
    //     component: CNavItem,
    //     name: 'Asset Transfer',
    //     to: '/Home/DeptTransfer',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },
    // {
    //     men_slno: 163,
    //     component: CNavItem,
    //     name: 'Asset Transfer',
    //     to: '/Home/AssetDeptTransfer',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },

    // {
    //     men_slno: 225,
    //     component: CNavItem,
    //     name: 'Condemnation List',
    //     to: '/Home/AssetCondemnationList',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },

    // {
    //     men_slno: 226,
    //     component: CNavItem,
    //     name: 'Service List',
    //     to: '/Home/AssetServiceList',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },


    // {
    //     men_slno: 228,
    //     component: CNavItem,
    //     name: 'PM Due List',
    //     to: '/Home/PmDueList',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },

    // {
    //     men_slno: 178,
    //     component: CNavItem,
    //     name: 'Inter Department Transfer',
    //     to: '/Home/AssetInterDeptTrans',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },


]

export default AmTransactions;