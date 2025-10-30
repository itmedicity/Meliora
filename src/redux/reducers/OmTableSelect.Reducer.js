import { ActionTyps } from '../constants/action.type'
const { FETCH_OM_TABLE_LIST } = ActionTyps
//intial state
const OmTableList = {
  OmTableListdata: [],
  loadingStatus: false
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setOmTableList = (state = OmTableList, { type, payload }) => {
  switch (type) {
    case FETCH_OM_TABLE_LIST:
      return { ...state, OmTableListdata: payload, loadingStatus: true }
    default:
      return state
  }
}
