import { ActionTyps } from '../constants/action.type'
const { FETCH_TOT_WRWRKADMISSION } = ActionTyps

const WeAdmissionTotal = {
    WeTotalList: [],
    loadingStatus: false

}

export const getTotalWeAdmission = (state = WeAdmissionTotal, { type, payload }) => {
    switch (type) {
        case FETCH_TOT_WRWRKADMISSION:
            return { ...state, WeTotalList: payload, loadingStatus: true }
        default:
            return state
    }

}