import { ActionTyps } from '../constants/action.type'
const { FETCH_REQUEST_TO_VERIFY_TAT } = ActionTyps

const RequestToVerify = {
  RequestToVerifyList: [],
  loadingStatus: false,
}

export const getRequestToVerifyList = (state = RequestToVerify, { type, payload }) => {
  switch (type) {
    case FETCH_REQUEST_TO_VERIFY_TAT:
      return { ...state, RequestToVerifyList: payload, loadingStatus: true }
    default:
      return state
  }
}
