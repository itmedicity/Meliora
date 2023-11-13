
import { ActionTyps } from '../constants/action.type'
const { FETCH_BACKUP_SCHEDULE_TIME } = ActionTyps;

const BackupScheduleTime = {
    scheduleTimeList: [],
    loadingStatus: false
}
export const getScheduleTime = (state = BackupScheduleTime, { type, payload }) => {
    switch (type) {
        case FETCH_BACKUP_SCHEDULE_TIME:
            return { ...state, scheduleTimeList: payload, loadingStatus: true }
        default:
            return state
    }
}

