import { ActionTyps } from '../constants/action.type'
const { FETCH_TAT_PERCOMP_ASSIGNEE } = ActionTyps

const AssignToRectify = {
  AssignToRectifyList: [],
  loadingStatus: false,
}

export const getAssignToRectifyList = (state = AssignToRectify, { type, payload }) => {
  switch (type) {
    case FETCH_TAT_PERCOMP_ASSIGNEE:
      return { ...state, AssignToRectifyList: payload, loadingStatus: true }
    default:
      return state
  }
}
