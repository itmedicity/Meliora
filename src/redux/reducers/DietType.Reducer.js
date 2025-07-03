import { ActionTyps } from '../constants/action.type'
const { FETCH_DIET_TYPE } = ActionTyps
//intial state
const diettype = {
  diettypeList: [],
  loadingStatus: false,
}
/*** Diettype action type check then payload set to the state and loading status set as true */
export const getDiettype = (state = diettype, { type, payload }) => {
  switch (type) {
    case FETCH_DIET_TYPE:
      return { ...state, diettypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
