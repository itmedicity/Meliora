import { ActionTyps } from '../constants/action.type'
const { FETCH_NURSESTAN_MELI } = ActionTyps;
//initial state
const NurseSation = {
    nusreStationList: [],
    loadingStatus: false
}
/*** User group action type check then payload set to the state and loading status set as true */
export const getNusringStationMeli = (state = NurseSation, { type, payload }) => {
    switch (type) {
        case FETCH_NURSESTAN_MELI:
            return { ...state, nusreStationList: payload, loadingStatus: true }
        default:
            return state
    }
}