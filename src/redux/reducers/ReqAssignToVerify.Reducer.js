import { ActionTyps } from '../constants/action.type'
const {
    FETCH_ASSIGN_TO_VERIFY_TAT

} = ActionTyps

const AssignToVerify = {
    AssignToVerifyList: [],
    loadingStatus: false
}

export const getAssignToVerifyList = (state = AssignToVerify, { type, payload }) => {
    switch (type) {
        case FETCH_ASSIGN_TO_VERIFY_TAT:
            return { ...state, AssignToVerifyList: payload, loadingStatus: true }
        default:
            return state
    }
}