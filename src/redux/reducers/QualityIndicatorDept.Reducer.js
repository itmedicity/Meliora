import { ActionTyps } from '../constants/action.type'
const { FETCH_QUALITY_INDICATOR_DEPT } = ActionTyps

const QualityDept = {
  qiDeptList: [],
  loadingStatus: false
}
export const getQltyDept = (state = QualityDept, { type, payload }) => {
  switch (type) {
    case FETCH_QUALITY_INDICATOR_DEPT:
      return { ...state, qiDeptList: payload, loadingStatus: true }
    default:
      return state
  }
}
