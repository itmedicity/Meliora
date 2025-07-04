import { ActionTyps } from '../constants/action.type'
const { FETCH_SUBROOM_ROOM_BASED } = ActionTyps
//intial state
const SubRoomBasedRoom = {
  SubRoomBasedRoomList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getSubRoomBasedOnRoom = (state = SubRoomBasedRoom, { type, payload }) => {
  switch (type) {
    case FETCH_SUBROOM_ROOM_BASED:
      return { ...state, SubRoomBasedRoomList: payload, loadingStatus: true }
    default:
      return state
  }
}
