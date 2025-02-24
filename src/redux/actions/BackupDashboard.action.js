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


export const getDailyCount = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/selectdaily/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_DAILY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_DAILY, payload: [], loadingStatus: false })
    }
}

export const getDayDetails = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/daydetails/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_DAYDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_DAYDETAILS, payload: [], loadingStatus: false })
    }
}


export const getMonthlyCount = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/monthly/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_MONTHLY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_MONTHLY, payload: [], loadingStatus: false })
    }
}

export const getMonthDetails = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/monthdetails/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_MONTHDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_MONTHDETAILS, payload: [], loadingStatus: false })
    }
}


export const getYearlyBackup = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/yearly/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_YEARLY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_YEARLY, payload: [], loadingStatus: false })
    }
}


export const getYearDetails = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/yeardetails/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_YEARDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_YEARDETAILS, payload: [], loadingStatus: false })
    }
}


export const getWeeklyBackup = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/weekly/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_WEEKLY, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_WEEKLY, payload: [], loadingStatus: false })
    }
}
export const getWeeklyDetails = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/weeklydetails/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_WEEKDETAILS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_WEEKDETAILS, payload: [], loadingStatus: false })
    }
}

export const getSelectedDaysDetails = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/select/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_SELECTEDDAYS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_SELECTEDDAYS, payload: [], loadingStatus: false })
    }
}

export const getDaysDetails = (empdept) => async (dispatch) => {
    const result = await axioslogin.get(`/backupdash/days/${empdept}`)
    const { success, data } = result.data
    if (success === 2) {
        dispatch({ type: FETCH_BACKUP_DAYS, payload: data, loadingStatus: true })
    }
    else {
        dispatch({ type: FETCH_BACKUP_DAYS, payload: [], loadingStatus: false })
    }
}
