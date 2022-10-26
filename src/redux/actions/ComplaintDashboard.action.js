import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const {
    FETCH_TOTAL_COMPLAINTS,
    FETCH_PENDING_COMPLAINTS,
    FETCH_ASSIGNEDCOMPLAINTS_DASH,
    FETCH_RECTIFIEDCOMPLAINTS_DASH,
    FETCH_VERIFIEDCOMPLAINTS_DASH
} = ActionTyps

export const getTotalcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/totalcomplaints/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        const { count_totalcmp } = data[0]
        dispatch({ type: FETCH_TOTAL_COMPLAINTS, payload: count_totalcmp, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_TOTAL_COMPLAINTS, payload: 0, loadingStatus: false })
    }
}
export const getPendingcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/pendingcomplaints/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        const { pending_cmp } = data[0]
        dispatch({ type: FETCH_PENDING_COMPLAINTS, payload: pending_cmp, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_PENDING_COMPLAINTS, payload: 0, loadingStatus: false })
    }
}
export const getAssignedcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/assignedcomplaints/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        const { assigned_cmp } = data[0]
        dispatch({ type: FETCH_ASSIGNEDCOMPLAINTS_DASH, payload: assigned_cmp, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_ASSIGNEDCOMPLAINTS_DASH, payload: 0, loadingStatus: false })
    }
}
export const getRectifiedcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/rectifycomplaints/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        const { rectify_cmp } = data[0]
        dispatch({ type: FETCH_RECTIFIEDCOMPLAINTS_DASH, payload: rectify_cmp, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_RECTIFIEDCOMPLAINTS_DASH, payload: 0, loadingStatus: false })
    }
}
export const getVerifiedcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/verifycomplaints/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        const { verify_cmp } = data[0]
        dispatch({ type: FETCH_VERIFIEDCOMPLAINTS_DASH, payload: verify_cmp, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_VERIFIEDCOMPLAINTS_DASH, payload: 0, loadingStatus: false })
    }
}