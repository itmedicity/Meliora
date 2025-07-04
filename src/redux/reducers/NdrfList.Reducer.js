import { ActionTyps } from '../constants/action.type'
const { FETCH_NDRF_LIST } = ActionTyps
//intial state
const NdrfList = {
  NdrfListdata: [],
  loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setNdrfList = (state = NdrfList, { type, payload }) => {
  switch (type) {
    case FETCH_NDRF_LIST:
      return { ...state, NdrfListdata: payload, loadingStatus: true }
    default:
      return state
  }
}
