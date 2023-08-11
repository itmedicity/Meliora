import { ActionTyps } from '../constants/action.type'
const { FETCH_FLOOR_SELECT } = ActionTyps;
//initial state
const floorSelect = {
    floorList: [],
    loadingStatus: false
}
/*** Department action type check then payload set to the state and loading status set as true */
export const getFloorData = (state = floorSelect, { type, payload }) => {
    switch (type) {
        case FETCH_FLOOR_SELECT:
            return { ...state, floorList: payload, loadingStatus: true }
        default:
            return state
    }
}