import { ActionTyps } from '../constants/action.type'
const { FETCH_ROOM_CATEGORY_DATA } = ActionTyps
//intial state
const RmRoomCategory = {
  RmRoomCategoryList: [],
  loadingStatus: false,
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const getRmRoomCategory = (state = RmRoomCategory, { type, payload }) => {
  switch (type) {
    case FETCH_ROOM_CATEGORY_DATA:
      return { ...state, RmRoomCategoryList: payload, loadingStatus: true }
    default:
      return state
  }
}
