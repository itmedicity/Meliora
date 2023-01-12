import { ActionTyps } from '../constants/action.type'
const { FETCH_AFTERNOONROUNDS_LIST } = ActionTyps

const AftternoonRounds = {
    RoundsList: [],
    loadingStatus: false

}

export const getAfternoonrounds = (state = AftternoonRounds, { type, payload }) => {
    switch (type) {
        case FETCH_AFTERNOONROUNDS_LIST:
            return { ...state, RoundsList: payload, loadingStatus: true }
        default:
            return state
    }

}