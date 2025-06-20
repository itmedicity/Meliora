import { ActionTyps } from "../constants/action.type";
const { FETCH_COMPLAINT_DEPARTMENT, FETCH_COMPLAINT_DEPARTMENT_IT, FETCH_COMPLAINT_DEPARTMENT_KMC } = ActionTyps
//intial state
const complaintdeptName = {
    complaintdeptList: [],
    loadingStatus: false
}
const complaintdeptNameit = {
    complaintdeptListIT: [],
    loadingStatusIT: false
}
const complaintdeptNameKMC = {
    complaintdeptListKMC: [],
    loadingStatusKMC: false
}
/*** Complaint Department action type check then payload set to the state and loading status set as true */
export const getComplaintDept = (state = complaintdeptName, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_DEPARTMENT:
            return { ...state, complaintdeptList: payload, loadingStatus: true }
        default:
            return state
    }

}
export const getComplaintDeptIT = (state = complaintdeptNameit, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_DEPARTMENT_IT:
            return { ...state, complaintdeptListIT: payload, loadingStatusIT: true }
        default:
            return state
    }

}
export const getComplaintDeptKmc = (state = complaintdeptNameKMC, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_DEPARTMENT_KMC:
            return { ...state, complaintdeptListKMC: payload, loadingStatusKMC: true }
        default:
            return state
    }

}