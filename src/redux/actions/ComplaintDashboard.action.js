import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const {
    FETCH_TOTAL_COMPLAINTS,
    FETCH_PENDING_COMPLAINTS,
    FETCH_ASSIGNEDCOMPLAINTS_DASH,
    FETCH_RECTIFIEDCOMPLAINTS_DASH,
    FETCH_VERIFIEDCOMPLAINTS_DASH,
    FETCH_ONHOLDCOMPLAINTS_DASH
} = ActionTyps

export const getTotalcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/totalcomplaints/${id}`);
    const { success, data } = result.data
    if (success === 1) {
        const { count_totalcmp } = data[0]
        dispatch({ type: FETCH_TOTAL_COMPLAINTS, payload: count_totalcmp, status: false })
    }
    else {
        dispatch({ type: FETCH_TOTAL_COMPLAINTS, payload: 0, status: false })
    }
}
export const getPendingcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/pendingcomplaints/${id}`);
    const { success1, data1 } = result.data
    if (success1 === 1) {
        const { pending_cmp } = data1[0]
        dispatch({ type: FETCH_PENDING_COMPLAINTS, payload: pending_cmp, status: false })
    }
    else {
        dispatch({ type: FETCH_PENDING_COMPLAINTS, payload: 0, status: false })
    }
}
export const getAssignedcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/assignedcomplaints/${id}`);
    const { success2, data2 } = result.data
    if (success2 === 1) {
        const { assigned_cmp } = data2[0]
        dispatch({ type: FETCH_ASSIGNEDCOMPLAINTS_DASH, payload: assigned_cmp, status: false })
    }
    else {
        dispatch({ type: FETCH_ASSIGNEDCOMPLAINTS_DASH, payload: 0, status: false })
    }
}
export const getRectifiedcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/rectifycomplaints/${id}`);
    const { success4, data4 } = result.data
    if (success4 === 1) {
        const { rectify_cmp } = data4[0]
        dispatch({ type: FETCH_RECTIFIEDCOMPLAINTS_DASH, payload: rectify_cmp, status: false })
    }
    else {
        dispatch({ type: FETCH_RECTIFIEDCOMPLAINTS_DASH, payload: 0, status: false })
    }
}
export const getVerifiedcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/verifycomplaints/${id}`);
    const { success5, data5 } = result.data
    if (success5 === 1) {
        const { verify_cmp } = data5[0]
        dispatch({ type: FETCH_VERIFIEDCOMPLAINTS_DASH, payload: verify_cmp, status: false })
    }
    else {
        dispatch({ type: FETCH_VERIFIEDCOMPLAINTS_DASH, payload: 0, status: false })
    }
}
export const getOnholdcomplaints = (id) => async (dispatch) => {
    const result = await axioslogin.get(`/cmdashboard/onholdcomplaints/${id}`);
    const { success3, data3 } = result.data
    if (success3 === 1) {
        const { onhold_cmp } = data3[0]
        dispatch({ type: FETCH_ONHOLDCOMPLAINTS_DASH, payload: onhold_cmp, status: false })
    }
    else {
        dispatch({ type: FETCH_ONHOLDCOMPLAINTS_DASH, payload: 0, status: false })
    }
}
