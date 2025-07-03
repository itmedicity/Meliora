import { ActionTyps } from '../constants/action.type'
const { FETCH_CM_ROOMTYPE_ROOMNAME } = ActionTyps
//initial state

const RoomsNameNdType = {
  RoomsNameNdTypeList: [],
  loadingStatus: false,
}

/*** Department action type check then payload set to the state and loading status set as true */
export const getRoomsNameNdTypeList = (state = RoomsNameNdType, { type, payload }) => {
  switch (type) {
    case FETCH_CM_ROOMTYPE_ROOMNAME:
      return { ...state, RoomsNameNdTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
