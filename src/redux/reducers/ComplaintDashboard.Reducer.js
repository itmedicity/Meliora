import { ActionTyps } from '../constants/action.type'
const {
    FETCH_TOTAL_COMPLAINTS,
    FETCH_PENDING_COMPLAINTS,
    FETCH_ASSIGNEDCOMPLAINTS_DASH,
    FETCH_RECTIFIEDCOMPLAINTS_DASH,
    FETCH_VERIFIEDCOMPLAINTS_DASH
} = ActionTyps

const DashboardNotify = {
    67: { slno: 67, name: "Total Complaint", count: 0, status: true },
    68: { slno: 68, name: "Pending Complaints", count: 0, status: true },
    69: { slno: 69, name: "Assigned  Complaints", count: 0, status: true },
    70: { slno: 70, name: "Rectified  Complaints", count: 0, status: true },
    71: { slno: 71, name: "Verified Complaints", count: 0, status: true }
}
export const getTotalcomplaints = (state = DashboardNotify, { type, payload }) => {
    switch (type) {
        case FETCH_TOTAL_COMPLAINTS:
            return { ...state, 67: { slno: 67, name: "Total Complaint", count: payload, status: true } }
        case FETCH_PENDING_COMPLAINTS:
            return { ...state, 68: { slno: 68, name: "Pending Complaints", count: payload, status: true } }
        case FETCH_ASSIGNEDCOMPLAINTS_DASH:
            return { ...state, 69: { slno: 69, name: "Assigned Complaints", count: payload, status: true } }
        case FETCH_RECTIFIEDCOMPLAINTS_DASH:
            return { ...state, 70: { slno: 70, name: "Rectified  Complaints", count: payload, status: true } }
        case FETCH_VERIFIEDCOMPLAINTS_DASH:
            return { ...state, 71: { slno: 71, name: "Verified Complaints", count: payload, status: true } }
        default:
            return state
    }
}