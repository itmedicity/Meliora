import { ActionTyps } from '../constants/action.type'
const { FETCH_ITEMGROUP } = ActionTyps
//initial state
const itemgrpname = {
  itemgrpList: [],
  loadingStatus: false
}
/*** Department action type check then payload set to the state and loading status set as true */
export const getitemGrpName = (state = itemgrpname, { type, payload }) => {
  switch (type) {
    case FETCH_ITEMGROUP:
      return { ...state, itemgrpList: payload, loadingStatus: true }
    default:
      return state
  }
}
