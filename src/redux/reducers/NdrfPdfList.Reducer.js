import { ActionTyps } from '../constants/action.type'
const { FETCH_NDRF_PDF_LIST } = ActionTyps
//intial state
const NdrfPdfList = {
  NdrfPdfListdata: [],
  loadingStatus: false,
}
/*** Deptsection action type check then payload set to the state and loading status set as true */
export const setNdrfPdfList = (state = NdrfPdfList, { type, payload }) => {
  switch (type) {
    case FETCH_NDRF_PDF_LIST:
      return { ...state, NdrfPdfListdata: payload, loadingStatus: true }
    default:
      return state
  }
}
