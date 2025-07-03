import { ActionTyps } from '../constants/action.type'
const { FETCH_DESIGNATION } = ActionTyps
//initial state
const designationName = {
  designationList: [],
  loadingStatus: false,
}
/*** Designation action type check then payload set to the state and loading status set as true */
export const getDesignation = (state = designationName, { type, payload }) => {
  switch (type) {
    case FETCH_DESIGNATION:
      return { ...state, designationList: payload, loadingStatus: true }
    default:
      return state
  }
}
