import { ActionTyps } from '../constants/action.type'
const { FETCH_MULT_HOD_INCHARGE } = ActionTyps
//intial state
const HodIncharge = {
  HodInchargeList: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getMultHodInCharge = (state = HodIncharge, { type, payload }) => {
  switch (type) {
    case FETCH_MULT_HOD_INCHARGE:
      return { ...state, HodInchargeList: payload, loadingStatus: true }
    default:
      return state
  }
}
