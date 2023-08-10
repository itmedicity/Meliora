import { CNavItem } from "@coreui/react";
import React from 'react'
import { cilCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const CrmTransactions = [
    {
        men_slno: 94,
        component: CNavItem,
        name: 'CRF Registration',
        to: '/Home/RequestRegister',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 95,
        component: CNavItem,
        name: 'Department Approval',
        to: '/Home/Req.DepartmentApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 124,
        component: CNavItem,
        name: 'DMS Approval',
        to: '/Home/DMSApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 125,
        component: CNavItem,
        name: 'CRF Data Collection',
        to: '/Home/CrfDataCollection',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 96,
        component: CNavItem,
        name: 'CRF Documentation',
        to: '/Home/Req.OMApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 97,
        component: CNavItem,
        name: 'CRF Verification',
        to: '/Home/Req.SMOApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 98,
        component: CNavItem,
        name: 'CAO/COO/MS Approval',
        to: '/Home/Req.CAOApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 101,
        component: CNavItem,
        name: 'NDRF Form',
        to: '/Home/NDRF',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 99,
        component: CNavItem,
        name: 'ED/MD Approval',
        to: '/Home/Req.EDApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },


]

export default CrmTransactions;