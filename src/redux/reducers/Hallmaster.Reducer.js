import { ActionTyps } from '../constants/action.type'
const { FETCH_HALL_NAME } = ActionTyps
//initial state
const Hallname = {
  hallnameList: [],
  loadingStatus: false
}
/*** Department action type check then payload set to the state and loading status set as true */
export const getHallMasterSlno = (state = Hallname, { type, payload }) => {
  switch (type) {
    case FETCH_HALL_NAME:
      return { ...state, hallnameList: payload, loadingStatus: true }
    default:
      return state
  }
}
