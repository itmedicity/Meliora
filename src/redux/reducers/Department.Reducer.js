import { ActionTyps } from '../constants/action.type'

const { FETCH_DEPARTMENT } = ActionTyps;

const departmentName = {
    departmentList: [],
    loadingStatus: false
}

export const setDepartment = (state = departmentName, { type, payload }) => {
    switch (type) {
        case FETCH_DEPARTMENT:
            return { ...state, departmentList: payload, loadingStatus: true }
        default:
            return state
    }
}