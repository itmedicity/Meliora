import { CNavItem } from "@coreui/react";

const CmTransactions = [
    {
        men_slno: 5,
        component: CNavItem,
        name: 'Complaint Registration',
        to: '/Home/ComplaintRegister',
    },
    {
        men_slno: 66,
        component: CNavItem,
        name: ' Direct Complaint',
        to: '/Home/DirectComplaint',
    },
    {
        men_slno: 7,
        component: CNavItem,
        name: 'Complaint List All ',
        to: '/Home/ComplaintList',
    },
    {
        men_slno: 6,
        component: CNavItem,
        name: 'Complaint List ',
        to: '/Home/AssignComplaint',
    },
    {
        men_slno: 61,
        component: CNavItem,
        name: 'Rectify Complaint ',
        to: '/Home/RectifyComplaint',
    },
]

export default CmTransactions;