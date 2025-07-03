import { ActionTyps } from '../constants/action.type'
const { FETCH_ROOM_DEPTSEC_BASED } = ActionTyps
//intial state
const RoomBasedDeptSection = {
  RoomBasedDeptSectionList: [],
  loadingStatus: false,
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getRoomBasedOnDeptSec = (state = RoomBasedDeptSection, { type, payload }) => {
  switch (type) {
    case FETCH_ROOM_DEPTSEC_BASED:
      return { ...state, RoomBasedDeptSectionList: payload, loadingStatus: true }
    default:
      return state
  }
}
