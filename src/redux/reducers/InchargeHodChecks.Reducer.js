import { ActionTyps } from '../constants/action.type'
const { FETCH_INCHARGE_HOD_CHECK } = ActionTyps
//intial state
const InchargeHod = {
  InchargeHoddata: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setInchargeHodData = (state = InchargeHod, { type, payload }) => {
  switch (type) {
    case FETCH_INCHARGE_HOD_CHECK:
      return { ...state, InchargeHoddata: payload, loadingStatus: true }
    default:
      return state
  }
}
