import { ActionTyps } from '../constants/action.type'
const { FETCH_ROOM_TYPE_DATA } = ActionTyps
//intial state
const RmRoomType = {
  RmRoomTypeList: [],
  loadingStatus: false,
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const getRmRoomType = (state = RmRoomType, { type, payload }) => {
  switch (type) {
    case FETCH_ROOM_TYPE_DATA:
      return { ...state, RmRoomTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
