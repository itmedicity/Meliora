import { ActionTyps } from '../constants/action.type'
const { FETCH_ROOMTYPE } = ActionTyps
//intial state
const roomType = {
    roomtypeList: [],
    loadingStatus: false
}
/*** Roomtype action type check then payload set to the state and loading status set as true */
export const getoraRoomtype = (state = roomType, { type, payload }) => {
    switch (type) {
        case FETCH_ROOMTYPE:
            return { ...state, roomtypeList: payload, loadingStatus: true }
        default:
            return state
    }

}