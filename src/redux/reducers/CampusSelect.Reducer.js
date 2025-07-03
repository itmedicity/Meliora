import { ActionTyps } from '../constants/action.type'
const { FETCH_CAMPUS_SELECT } = ActionTyps
//initial state
const CampusName = {
  campusList: [],
  loadingStatus: false,
}
/*** Department action type check then payload set to the state and loading status set as true */
export const getCampus = (state = CampusName, { type, payload }) => {
  switch (type) {
    case FETCH_CAMPUS_SELECT:
      return { ...state, campusList: payload, loadingStatus: true }
    default:
      return state
  }
}
