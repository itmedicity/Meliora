import { ActionTyps } from '../constants/action.type'
const { FETCH_EQUIPMENT_SELECT } = ActionTyps

const QIEquipment = {
  EquipmentList: [],
  loadingStatus: false
}
export const getEquipmentList = (state = QIEquipment, { type, payload }) => {
  switch (type) {
    case FETCH_EQUIPMENT_SELECT:
      return { ...state, EquipmentList: payload, loadingStatus: true }
    default:
      return state
  }
}
