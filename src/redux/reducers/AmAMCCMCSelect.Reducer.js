import { ActionTyps } from '../constants/action.type'
const { FETCH_AMCCMC_MAST } = ActionTyps
//initial state
const AmcCmcMaster = {
  AmcCmcMasterList: [],
  loadingStatus: false
}
/*** Designation action type check then payload set to the state and loading status set as true */
export const setAmcCmcMaster = (state = AmcCmcMaster, { type, payload }) => {
  switch (type) {
    case FETCH_AMCCMC_MAST:
      return { ...state, AmcCmcMasterList: payload, loadingStatus: true }
    default:
      return state
  }
}
