import { ActionTyps } from '../constants/action.type'
const { FETCH_RECTIFY_TO_VERIFY_TAT } = ActionTyps

const RectifyToVerify = {
  RectifyToVerifyList: [],
  loadingStatus: false,
}

export const getRectifyToVerifyList = (state = RectifyToVerify, { type, payload }) => {
  switch (type) {
    case FETCH_RECTIFY_TO_VERIFY_TAT:
      return { ...state, RectifyToVerifyList: payload, loadingStatus: true }
    default:
      return state
  }
}
