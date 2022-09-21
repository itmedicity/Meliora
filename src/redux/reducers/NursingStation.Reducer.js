import { ActionTyps } from '../constants/action.type'
const { FETCH_NURSSTATION } = ActionTyps;
//initial state
const NurseSation = {
    nusreStationList: [],
    loadingStatus: false
}
/*** User group action type check then payload set to the state and loading status set as true */
export const getNusringStation = (state = NurseSation, { type, payload }) => {
    switch (type) {
        case FETCH_NURSSTATION:
            return { ...state, nusreStationList: payload, loadingStatus: true }
        default:
            return state
    }
}