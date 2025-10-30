import { ActionTyps } from '../constants/action.type'
const { FETCH_CRM_DASHBOARD, FETCH_CRM_PURCHASE_DASHBOARD, FETCH_PO_STORE_DASHBOARD } = ActionTyps
//intial state
const CRMDashboard = {
  setCRMDashboardList: [],
  loadingStatus: false
}
/*** Requesttype action type check then payload set to the state and loading status set as true */
export const setCRMDashBoard = (state = CRMDashboard, { type, payload }) => {
  switch (type) {
    case FETCH_CRM_DASHBOARD:
      return { ...state, setCRMDashboardList: payload, loadingStatus: true }
    default:
      return state
  }
}

const CRMPurchaseDashboard = {
  setCRMPurcahseList: [],
  loadingStatus: false
}
export const getCRFPurchaseDashboard = (state = CRMPurchaseDashboard, { type, payload }) => {
  switch (type) {
    case FETCH_CRM_PURCHASE_DASHBOARD:
      return { ...state, setCRMPurcahseList: payload, loadingStatus: true }
    default:
      return state
  }
}

const CRMPOStoreDashboard = {
  setPoStoreList: [],
  loadingStatus: false
}
export const getPOStoreDashboard = (state = CRMPOStoreDashboard, { type, payload }) => {
  switch (type) {
    case FETCH_PO_STORE_DASHBOARD:
      return { ...state, setPoStoreList: payload, loadingStatus: true }
    default:
      return state
  }
}
