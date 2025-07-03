import { ActionTyps } from '../constants/action.type'
const { FETCH_GOALS_TASKMANAGEMENT } = ActionTyps
//initial state

const GoalsName = {
  GoalsList: [],
  loadingStatus: false,
}

/*** Department action type check then payload set to the state and loading status set as true */
export const getGoalsList = (state = GoalsName, { type, payload }) => {
  switch (type) {
    case FETCH_GOALS_TASKMANAGEMENT:
      return { ...state, GoalsList: payload, loadingStatus: true }
    default:
      return state
  }
}
