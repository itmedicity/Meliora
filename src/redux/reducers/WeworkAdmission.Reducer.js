import { ActionTyps } from '../constants/action.type'
const { FETCH_TOTAL_ADMISSION, FETCH_TOTAL_DAMA, FETCH_TOTAL_BHRC, FETCH_TOTAL_DOCVISIT, FETCH_TOTAL_DISAFTERNOON } =
  ActionTyps
//intial state

const Dashboard = {
  74: { slno: 74, name: 'Total', count: 0, status: true },
  75: { slno: 75, name: 'DAMA patient', count: 0, status: true },
  76: { slno: 76, name: 'BHRC Patient', count: 0, status: true },
  78: { slno: 78, name: 'Doctor Rounds Fter 2 pm', count: 0, status: true },
  79: { slno: 79, name: 'Discahrge after 2 pm', count: 0, status: true }
}

export const getTotalAdmission = (state = Dashboard, { type, payload, status }) => {
  switch (type) {
    case FETCH_TOTAL_ADMISSION:
      return { ...state, 74: { slno: 74, name: 'Total Admission', count: payload, status: status } }
    case FETCH_TOTAL_DAMA:
      return { ...state, 75: { slno: 75, name: 'Dama Patient', count: payload, status: status } }
    case FETCH_TOTAL_BHRC:
      return { ...state, 76: { slno: 76, name: 'Bhrc Patient', count: payload, status: status } }
    case FETCH_TOTAL_DOCVISIT:
      return {
        ...state,
        78: { slno: 78, name: 'Doctor Rounds after 2 pm', count: payload, status: status }
      }
    case FETCH_TOTAL_DISAFTERNOON:
      return {
        ...state,
        79: { slno: 79, name: 'Discharge after 2 pm', count: payload, status: status }
      }
    default:
      return state
  }
}
