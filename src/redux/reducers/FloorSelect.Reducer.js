import { ActionTyps } from '../constants/action.type'
const { FETCH_GET_FLOOR } = ActionTyps
//intial state
const floor = {
  floorList: [],
  loadingStatus: false,
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getFloorselect = (state = floor, { type, payload }) => {
  switch (type) {
    case FETCH_GET_FLOOR:
      return { ...state, floorList: payload, loadingStatus: true }
    default:
      return state
  }
}
