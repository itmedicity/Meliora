import { ActionTyps } from '../constants/action.type'
const {
    FETCH_REQUEST_TO_RECTIFY_TAT

} = ActionTyps

const RequestToRectfy = {
    RequestToRectfyList: [],
    loadingStatus: false
}

export const getRequestToRectfyList = (state = RequestToRectfy, { type, payload }) => {
    switch (type) {
        case FETCH_REQUEST_TO_RECTIFY_TAT:
            return { ...state, RequestToRectfyList: payload, loadingStatus: true }
        default:
            return state
    }
}