import { ActionTyps } from '../constants/action.type'
const { FETCH_PROJECTS_TASKMANAGEMENT } = ActionTyps
//initial state

const ProjectName = {
  ProjectList: [],
  loadingStatus: false
}

/*** Department action type check then payload set to the state and loading status set as true */
export const getProjectList = (state = ProjectName, { type, payload }) => {
  switch (type) {
    case FETCH_PROJECTS_TASKMANAGEMENT:
      return { ...state, ProjectList: payload, loadingStatus: true }
    default:
      return state
  }
}

export const getProjectListWithgoal = (state = ProjectName, { type, payload }) => {
  switch (type) {
    case FETCH_PROJECTS_TASKMANAGEMENT:
      return { ...state, ProjectList: payload, loadingStatus: true }
    default:
      return state
  }
}

export const getNonGoalProjectList = (state = ProjectName, { type, payload }) => {
  switch (type) {
    case FETCH_PROJECTS_TASKMANAGEMENT:
      return { ...state, ProjectList: payload, loadingStatus: true }
    default:
      return state
  }
}

export const getprojectFrTaskCreation = (state = ProjectName, { type, payload }) => {
  switch (type) {
    case FETCH_PROJECTS_TASKMANAGEMENT:
      return { ...state, ProjectList: payload, loadingStatus: true }

    default:
      return state
  }
}
