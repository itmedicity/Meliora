import { ActionTyps } from '../constants/action.type'
const { FETCH_DIET_PLANNED_LIST } = ActionTyps
//intial state
const DietPlaned = {
  plannedList: [],
  loadingStatus: false
}
/*** Diet action type check then payload set to the state and loading status set as true */
export const setDietPlaned = (state = DietPlaned, { type, payload }) => {
  switch (type) {
    case FETCH_DIET_PLANNED_LIST:
      return { ...state, plannedList: payload, loadingStatus: true }
    default:
      return state
  }
}
