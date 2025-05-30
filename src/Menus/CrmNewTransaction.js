import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'



const CrmNewTransaction = [
    {
        men_slno: 199,
        component: CNavItem,
        name: 'CRF Dashboard',
        to: '/Home/CrfNewDashBoard',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 189,
        component: CNavItem,
        name: 'CRF Registration',
        to: '/Home/CrfNewRequestRegister',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 190,
        component: CNavItem,
        name: 'Incharge Approval',
        to: '/Home/CRFNewInchargeApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 233,
        component: CNavItem,
        name: 'CRF Search',
        to: '/Home/SearchCrfDetails',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 191,
        component: CNavItem,
        name: 'HOD Approval',
        to: '/Home/CRFNewHODApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 192,
        component: CNavItem,
        name: 'DMS Approval',
        to: '/Home/CRFNewDMSApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 193,
        component: CNavItem,
        name: 'MS Approval',
        to: '/Home/CRFNewMSApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 200,
        component: CNavItem,
        name: 'CRF Data Collection',
        to: '/Home/CrfNewDataCollection',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 194,
        component: CNavItem,
        name: 'CRF Documentation',
        to: '/Home/CRFNewOMApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 195,
        component: CNavItem,
        name: 'CRF Verification',
        to: '/Home/CRFNewSMOApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 196,
        component: CNavItem,
        name: 'GM Operations Approval',
        to: '/Home/CRFNewGMApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 197,
        component: CNavItem,
        name: 'MD Approval',
        to: '/Home/CRFNewMDApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 198,
        component: CNavItem,
        name: 'ED Approval',
        to: '/Home/CRFNewEDApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 253,
        component: CNavItem,
        name: 'Managing Director Approval',
        to: '/Home/CRFNewManagingDirector',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 201,
        component: CNavItem,
        name: 'CRF Purchase',
        to: '/Home/CRFNewPurchase',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 231,
        component: CNavItem,
        name: 'CRS Delivery Marking',
        to: '/Home/DeliveryMarking',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 232,
        component: CNavItem,
        name: 'Item Checking',
        to: '/Home/ItemChecking',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 202,
        component: CNavItem,
        name: 'CRF CRS',
        to: '/Home/CRFNewCRSStore',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 203,
        component: CNavItem,
        name: 'CRF Store',
        to: '/Home/CRFNewStore',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    // {
    //     men_slno: 243,
    //     component: CNavItem,
    //     name: 'CRF View',
    //     to: '/Home/CrfBiomedical',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },
    {
        men_slno: 243,
        component: CNavItem,
        name: 'CRF View',
        to: '/Home/CrfView',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
]

export default CrmNewTransaction;
