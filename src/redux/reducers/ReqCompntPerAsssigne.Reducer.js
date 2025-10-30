import { ActionTyps } from '../constants/action.type'
const { FETCH_COMP_PER_ASSIGNEE_REPORT } = ActionTyps

const AssignToRectify = {
  AssignToRectifyList: [],
  loadingStatus: false
}

export const getAssignToRectifyList = (state = AssignToRectify, { type, payload }) => {
  switch (type) {
    case FETCH_COMP_PER_ASSIGNEE_REPORT:
      return { ...state, AssignToRectifyList: payload, loadingStatus: true }
    default:
      return state
  }
}
