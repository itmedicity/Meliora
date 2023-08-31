import { ActionTyps } from '../constants/action.type'
const {
    FETCH_REQUEST_TO_ASSIGN_TAT

} = ActionTyps

const RequestToAssign = {
    RequestToAssignList: [],
    loadingStatus: false
}

export const getRequestToAssignList = (state = RequestToAssign, { type, payload }) => {
    switch (type) {
        case FETCH_REQUEST_TO_ASSIGN_TAT:
            return { ...state, RequestToAssignList: payload, loadingStatus: true }
        default:
            return state
    }
}