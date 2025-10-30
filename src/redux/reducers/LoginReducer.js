import { ActionTyps } from '../constants/action.type'

const { FETCH_LOGIN } = ActionTyps

const LoginInitialState = {}

export const LoginUserData = (state = LoginInitialState, { type, payload }) => {
  switch (type) {
    case FETCH_LOGIN:
      return { ...state, ...payload }
    default:
      return state
  }
}


export const getEmpID = (state)=> state.LoginUserData.empid || 0

