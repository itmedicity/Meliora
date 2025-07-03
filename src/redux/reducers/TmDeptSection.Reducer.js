import { ActionTyps } from '../constants/action.type'
const { FETCH_DEPARTMENTSEC_TASKMANAGEMENT } = ActionTyps
//intial state

const subTaskDeptSection = {
  subTaskDeptsectionList: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const getDepartmentSecSubTask = (state = subTaskDeptSection, { type, payload }) => {
  switch (type) {
    case FETCH_DEPARTMENTSEC_TASKMANAGEMENT:
      return { ...state, subTaskDeptsectionList: payload, loadingStatus: true }
    default:
      return state
  }
}
