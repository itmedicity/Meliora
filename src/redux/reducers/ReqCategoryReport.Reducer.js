import { ActionTyps } from '../constants/action.type'
const { FETCH_COM_CATEGORY_REPORT } = ActionTyps

const ReqCategoryReport = {
  ReqCategoryReportList: [],
  loadingStatus: false,
}

export const getReqCategoryReportList = (state = ReqCategoryReport, { type, payload }) => {
  switch (type) {
    case FETCH_COM_CATEGORY_REPORT:
      return { ...state, ReqCategoryReportList: payload, loadingStatus: true }
    default:
      return state
  }
}
