import { ActionTyps } from '../constants/action.type'
const { FETCH_DEPARTMENT_TASKMANAGEMENT } = ActionTyps
//initial state

const subTaskDepartmentName = {
  subTaskDepartmentList: [],
  loadingStatus: false
}

/*** Department action type check then payload set to the state and loading status set as true */
export const getDepartmentSubTask = (state = subTaskDepartmentName, { type, payload }) => {
  switch (type) {
    case FETCH_DEPARTMENT_TASKMANAGEMENT:
      return { ...state, subTaskDepartmentList: payload, loadingStatus: true }
    default:
      return state
  }
}
