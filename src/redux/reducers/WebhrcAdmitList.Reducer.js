import { ActionTyps } from '../constants/action.type'
const { FETCH_ADMIT_BHRC } = ActionTyps

const WeBhrcAdmitdetl = {
    WeBhrcAdmitList: [],
    loadingStatus: false

}

export const getWeBhrcAdmitdetl = (state = WeBhrcAdmitdetl, { type, payload }) => {
    switch (type) {
        case FETCH_ADMIT_BHRC:
            return { ...state, WeBhrcAdmitList: payload, loadingStatus: true }
        default:
            return state
    }

}