import { ActionTyps } from '../constants/action.type'
const { FETCH_BHRC_PATIENT } = ActionTyps

const BhrcPatient = {
  PatientList: [],
  loadingStatus: false
}

export const getBhrctotalPatient = (state = BhrcPatient, { type, payload }) => {
  switch (type) {
    case FETCH_BHRC_PATIENT:
      return { ...state, PatientList: payload, loadingStatus: true }
    default:
      return state
  }
}
