import { ActionTyps } from '../constants/action.type'
const { FETCH_DEPTSEC_INCH_HOD } = ActionTyps
//intial state
const deptSecInchHod = {
  deptSecInchHodList: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setDeptSecInchHod = (state = deptSecInchHod, { type, payload }) => {
  switch (type) {
    case FETCH_DEPTSEC_INCH_HOD:
      return { ...state, deptSecInchHodList: payload, loadingStatus: true }
    default:
      return state
  }
}
