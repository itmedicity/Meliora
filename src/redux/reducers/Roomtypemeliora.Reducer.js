import { ActionTyps } from '../constants/action.type'
const { FETCH_ROOMTYPEMELIORA } = ActionTyps
//intial state
const roomtypemeliora = {
  roomtypemeliList: [],
  loadingStatus: false,
}
/*** roomtypemelioraaction type check then payload set to the state and loading status set as true */
export const getRoomtypemeli = (state = roomtypemeliora, { type, payload }) => {
  switch (type) {
    case FETCH_ROOMTYPEMELIORA:
      return { ...state, roomtypemeliList: payload, loadingStatus: true }
    default:
      return state
  }
}
