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
        men_slno: 127,
        component: CNavItem,
        name: 'Incharge Approval',
        to: '/Home/CRFInchargeApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 95,
        component: CNavItem,
        name: 'HOD Approval',
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
        men_slno: 128,
        component: CNavItem,
        name: 'MS Approval',
        to: '/Home/CrfMSApproval',
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
        name: 'CAO/COO Approval',
        to: '/Home/Req.CAOApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 100,
        component: CNavItem,
        name: 'NDRF Form',
        to: '/Home/NDRF',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },
    {
        men_slno: 99,
        component: CNavItem,
        name: 'ED Approval',
        to: '/Home/Req.EDApproval',
        icon: <CIcon icon={cilCircle} customClassName="nav-icon" />,
    },


]

export default CrmTransactions;