import { ActionTyps } from '../constants/action.type'
const {
    FETCH_ASSIGN_TO_RECTIFY_TAT

} = ActionTyps

const AssignToRectify = {
    AssignToRectifyList: [],
    loadingStatus: false
}

export const getAssignToRectifyList = (state = AssignToRectify, { type, payload }) => {
    switch (type) {
        case FETCH_ASSIGN_TO_RECTIFY_TAT:
            return { ...state, AssignToRectifyList: payload, loadingStatus: true }
        default:
            return state
    }
}