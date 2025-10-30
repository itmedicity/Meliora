import { ActionTyps } from '../constants/action.type'
const { FETCH_ROOMCATORA } = ActionTyps
//intial state
const roomcategory = {
  roomcatList: [],
  loadingStatus: false
}
/*** Roomcategory action type check then payload set to the state and loading status set as true */
export const getRoomcatora = (state = roomcategory, { type, payload }) => {
  switch (type) {
    case FETCH_ROOMCATORA:
      return { ...state, roomcatList: payload, loadingStatus: true }
    default:
      return state
  }
}
