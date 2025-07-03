import { ActionTyps } from '../constants/action.type'
const { FETCH_QI_DEPT_TYPE } = ActionTyps

const QIDeptTypeList = {
  qiTypeList: [],
  loadingStatus: false,
}
export const getQIDeptType = (state = QIDeptTypeList, { type, payload }) => {
  switch (type) {
    case FETCH_QI_DEPT_TYPE:
      return { ...state, qiTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
