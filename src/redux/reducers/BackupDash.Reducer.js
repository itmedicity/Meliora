import { ActionTyps } from '../constants/action.type'
const {
  FETCH_BACKUP_DAILY,
  FETCH_BACKUP_DAYDETAILS,
  FETCH_BACKUP_MONTHLY,
  FETCH_BACKUP_MONTHDETAILS,
  FETCH_BACKUP_YEARLY,
  FETCH_BACKUP_YEARDETAILS,
  FETCH_BACKUP_WEEKLY,
  FETCH_BACKUP_WEEKDETAILS,
  FETCH_BACKUP_SELECTEDDAYS,
  FETCH_BACKUP_DAYS
} = ActionTyps

const DashboardInitial = {
  DailyCount: [],
  loadingStatus: false
}
export const getDailyCount = (state = DashboardInitial, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_DAILY:
      return { ...state, DailyCount: payload, loadingStatus: true }
    default:
      return state
  }
}

const Daysdetails = {
  dayslist: [],
  loadingStatus: false
}
export const getDayDetails = (state = Daysdetails, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_DAYDETAILS:
      return { ...state, dayslist: payload, loadingStatus: true }
    default:
      return state
  }
}

const MonthlyInitial = {
  MonthlyCount: [],
  loadingStatus: false
}
export const getMonthlyCount = (state = MonthlyInitial, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_MONTHLY:
      return { ...state, MonthlyCount: payload, loadingStatus: true }
    default:
      return state
  }
}

const MonthDetails = {
  Monthdata: [],
  loadingStatus: false
}
export const getMonthDetails = (state = MonthDetails, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_MONTHDETAILS:
      return { ...state, Monthdata: payload, loadingStatus: true }
    default:
      return state
  }
}

const YearlyBackup = {
  YearlyInitial: [],
  loadingStatus: false
}
export const getYearlyBackup = (state = YearlyBackup, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_YEARLY:
      return { ...state, YearlyInitial: payload, loadingStatus: true }
    default:
      return state
  }
}

const YearDetail = {
  Yearlydata: [],
  loadingStatus: false
}
export const getYearDetails = (state = YearDetail, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_YEARDETAILS:
      return { ...state, Yearlydata: payload, loadingStatus: true }
    default:
      return state
  }
}

const WeeklyCount = {
  Weekinitial: [],
  loadingStatus: false
}
export const getWeeklyBackup = (state = WeeklyCount, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_WEEKLY:
      return { ...state, Weekinitial: payload, loadingStatus: true }
    default:
      return state
  }
}

const WeekDetail = {
  WeekInit: [],
  loadingStatus: false
}
export const getWeeklyDetails = (state = WeekDetail, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_WEEKDETAILS:
      return { ...state, WeekInit: payload, loadingStatus: true }
    default:
      return state
  }
}

const SelectedDays = {
  Daysinitial: [],
  loadingStatus: false
}
export const getSelectedDaysDetails = (state = SelectedDays, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_SELECTEDDAYS:
      return { ...state, Daysinitial: payload, loadingStatus: true }
    default:
      return state
  }
}

const DaysList = {
  DaysData: [],
  loadingStatus: false
}
export const getDaysDetails = (state = DaysList, { type, payload }) => {
  switch (type) {
    case FETCH_BACKUP_DAYS:
      return { ...state, DaysData: payload, loadingStatus: true }
    default:
      return state
  }
}
