import { ActionTyps } from '../constants/action.type'
const { FETCH_BACKUP_DETAILS, FETCH_BACKUP_EMPLOYEE } = ActionTyps

const BackupInitial = {
  backupList: [],
  loadingStatus: false,
}
export const getBackupDetails = (state = BackupInitial, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_DETAILS:
      return { ...state, backupList: payload, loadingStatus: true }
    default:
      return state
  }
}

const EmpInitial = {
  empList: [],
  loadingStatus: false,
}
export const getEmployeeBackup = (state = EmpInitial, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_EMPLOYEE:
      return { ...state, empList: payload, loadingStatus: true }
    default:
      return state
  }
}
