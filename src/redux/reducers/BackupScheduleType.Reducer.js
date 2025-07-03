import { ActionTyps } from '../constants/action.type'
const { FETCH_BACKUP_SCHEDULE_TYPE } = ActionTyps

const BackupScheduleType = {
  scheduleTypeList: [],
  loadingStatus: false,
}
export const getScheduleType = (state = BackupScheduleType, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_SCHEDULE_TYPE:
      return { ...state, scheduleTypeList: payload, loadingStatus: true }
    default:
      return state
  }
}
