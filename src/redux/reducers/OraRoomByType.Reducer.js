import { ActionTyps } from '../constants/action.type'
const { FETCH_ORAROOM_ROOMTYPE } = ActionTyps
//intial state
const roomByRoomType = {
  roomByRoomTypeList: [],
  loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getOraRoomByRoomType = (state = roomByRoomType, { type, payload }) => {
  switch (type) {
    case FETCH_ORAROOM_ROOMTYPE:
      return { ...state, roomByRoomTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
