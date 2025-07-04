import { ActionTyps } from '../constants/action.type'
const { FETCH_BUILDING } = ActionTyps
//intial state
const building = {
  buildingList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getBuilding = (state = building, { type, payload }) => {
  switch (type) {
    case FETCH_BUILDING:
      return { ...state, buildingList: payload, loadingStatus: true }
    default:
      return state
  }
}
