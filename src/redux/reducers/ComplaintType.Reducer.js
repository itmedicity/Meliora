import { ActionTyps } from '../constants/action.type'
const { FETCH_COMPLAINT_TYPE, FETCH_COMPLAINT_TYPE_main, FETCH_COMPLAINT_TYPE_Opera, FETCH_COMPLAINT_TYPE_House, FETCH_COMPLAINT_TYPE_IT } = ActionTyps;
//intial state
const complaintType = {
    complainttypeList: [],
    loadingStatus: false
}
const complaintTypemain = {
    complainttypeListmain: [],
    loadingStatusmain: false
}
const complaintTypeIT = {
    complainttypeListIT: [],
    loadingStatusmainIT: false
}
const complaintTypeHouse = {
    complainttypeListmainHouse: [],
    loadingStatusmainHouse: false
}
const complaintTypeOper = {
    complainttypeListmainOper: [],
    loadingStatusmainOper: false
}
/*** Complainttype action type check then payload set to the state and loading status set as true */
export const getComplainttype = (state = complaintType, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_TYPE:
            return { ...state, complainttypeList: payload, loadingStatus: true }
        default:
            return state
    }

}

export const getComplainttypeMain = (state = complaintTypemain, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_TYPE_main:
            return { ...state, complainttypeListmain: payload, loadingStatusmain: true }
        default:
            return state
    }

}
export const getComplainttypeIT = (state = complaintTypeIT, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_TYPE_IT:
            return { ...state, complainttypeListIT: payload, loadingStatusmainIT: true }
        default:
            return state
    }

}
export const getComplainttypeHouse = (state = complaintTypeHouse, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_TYPE_House:
            return { ...state, complainttypeListmainHouse: payload, loadingStatusmainHouse: true }
        default:
            return state
    }

}
export const getComplainttypeOpera = (state = complaintTypeOper, { type, payload }) => {
    switch (type) {
        case FETCH_COMPLAINT_TYPE_Opera:
            return { ...state, complainttypeListmainOper: payload, loadingStatusmainOper: true }
        default:
            return state
    }

}