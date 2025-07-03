import { axioslogin } from 'src/views/Axios/Axios'
import { ActionTyps } from '../constants/action.type'
const { FETCH_PROJECTS_TASKMANAGEMENT } = ActionTyps

export const getProjectList = () => async dispatch => {
  const result = await axioslogin.get('TmDropDowns/getprojects')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: [], loadingStatus: false })
  }
}

export const getProjectListWithgoal = goalz => async dispatch => {
  const result = await axioslogin.get(`/TmDropDowns/getprojectswithGoal/${goalz}`)
  const { success, data } = result.data
  if (success === 2) {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: [], loadingStatus: false })
  }
}

export const getNonGoalProjectList = () => async dispatch => {
  const result = await axioslogin.get('/TmDropDowns/getNonGoalprojects')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: [], loadingStatus: false })
  }
}

export const getprojectFrTaskCreation = () => async dispatch => {
  const result = await axioslogin.get('TmDropDowns/getprojectFrTaskCreation')
  const { success, data } = result.data
  if (success === 1) {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: data, loadingStatus: true })
  } else {
    dispatch({ type: FETCH_PROJECTS_TASKMANAGEMENT, payload: [], loadingStatus: false })
  }
}
