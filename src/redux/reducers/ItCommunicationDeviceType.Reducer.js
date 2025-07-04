import { ActionTyps } from '../constants/action.type'
const { FETCH_COMMUNICATION_DEVICE_TYPE } = ActionTyps
//intial state
const deviceType = {
  deviceTypeList: [],
  loadingStatus: false
}
/*** Building action type check then payload set to the state and loading status set as true */
export const getDeviceType = (state = deviceType, { type, payload }) => {
  switch (type) {
    case FETCH_COMMUNICATION_DEVICE_TYPE:
      return { ...state, deviceTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
