import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const CrmNewTransaction = [

    {
        men_slno: 94,
        component: CNavItem,
        name: 'CRF Registration',
        to: '/Home/CrfNewRequestRegister',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 127,
        component: CNavItem,
        name: 'Incharge Approval',
        to: '/Home/CRFNewInchargeApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 95,
        component: CNavItem,
        name: 'HOD Approval',
        to: '/Home/CRFNewHODApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 124,
        component: CNavItem,
        name: 'DMS Approval',
        to: '/Home/CRFNewDMSApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },

    {
        men_slno: 128,
        component: CNavItem,
        name: 'MS Approval',
        to: '/Home/CRFNewMSApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    // {
    //     men_slno: 125,
    //     component: CNavItem,
    //     name: 'CRF Data Collection',
    //     to: '/Home/CrfDataCollection',
    //     icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    // },
    {
        men_slno: 96,
        component: CNavItem,
        name: 'CRF Documentation',
        to: '/Home/CRFNewOMApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 97,
        component: CNavItem,
        name: 'CRF Verification',
        to: '/Home/CRFNewSMOApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 98,
        component: CNavItem,
        name: 'GM Operations Approval',
        to: '/Home/CRFNewGMApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 164,
        component: CNavItem,
        name: 'MD Approval',
        to: '/Home/CRFNewMDApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 99,
        component: CNavItem,
        name: 'ED Approval',
        to: '/Home/CRFNewEDApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
]

export default CrmNewTransaction;
