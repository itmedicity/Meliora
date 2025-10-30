import { ActionTyps } from '../constants/action.type'
const { FETCH_SALUTATION } = ActionTyps
//initial state
const salutationName = {
  salutationList: [],
  loadingStatus: false
}
/*** Designation action type check then payload set to the state and loading status set as true */
export const getSalutation = (state = salutationName, { type, payload }) => {
  switch (type) {
    case FETCH_SALUTATION:
      return { ...state, salutationList: payload, loadingStatus: true }
    default:
      return state
  }
}
