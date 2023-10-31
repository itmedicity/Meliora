import { axioslogin } from "src/views/Axios/Axios"
import { ActionTyps } from "../constants/action.type"
const { FETCH_BACKUP_DAILY,
    FETCH_BACKUP_DAYDETAILS,
    FETCH_BACKUP_MONTHLY,
    FETCH_BACKUP_MONTHDETAILS,
    FETCH_BACKUP_YEARLY,
    FETCH_BACKUP_YEARDETAILS,
    FETCH_BACKUP_WEEKLY,
    FETCH_BACKUP_WEEKDETAILS,
    FETCH_BACKUP_SELECTEDDAYS,
    FETCH_BACKUP_DAYS } = ActionTyps


export const getDailyCount = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/selectdaily')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_DAILY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_DAILY, payload: [], loadingStatus: false })
    }
}

export const getDayDetails = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/daydetails')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_DAYDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_DAYDETAILS, payload: [], loadingStatus: false })
    }
}


export const getMonthlyCount = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/monthly')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_MONTHLY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_MONTHLY, payload: [], loadingStatus: false })
    }
}

export const getMonthDetails = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/monthdetails')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_MONTHDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_MONTHDETAILS, payload: [], loadingStatus: false })
    }
}


export const getYearlyBackup = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/yearly')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_YEARLY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_YEARLY, payload: [], loadingStatus: false })
    }
}


export const getYearDetails = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/yeardetails')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_YEARDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_YEARDETAILS, payload: [], loadingStatus: false })
    }
}


export const getWeeklyBackup = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/weekly')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_WEEKLY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_WEEKLY, payload: [], loadingStatus: false })
    }
}
export const getWeeklyDetails = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/weeklydetails')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_WEEKDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_WEEKDETAILS, payload: [], loadingStatus: false })
    }
}

export const getSelectedDaysDetails = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/select')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_SELECTEDDAYS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_SELECTEDDAYS, payload: [], loadingStatus: false })
    }
}

export const getDaysDetails = () => async (dispatch) => {
    const result = await axioslogin.get('/backupdash/days')
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_DAYS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_DAYS, payload: [], loadingStatus: false })
    }
}
