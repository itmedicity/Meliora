import { ActionTyps } from '../constants/action.type'
const { FETCH_TOTAL_COMPLAINTS, FETCH_ONHOLDCOMPLAINTS_DASH, FETCH_ASSIST_RECTY_EMP, FETCH_PENDING_ONHOLD_EMP } =
  ActionTyps

const complaints = {
  complaintList: [],
  loadingStatus: false
}

const onHold = {
  onHoldList: [],
  onholdStatus: false
}

const assitEmp = {
  assitEmpList: [],
  assitEmpStatus: false
}

const pendOnholdEmp = {
  pendOnholdEmpList: [],
  pendOnholdEmpStatus: false
}

export const getComplaintList = (state = complaints, { type, payload }) => {
  switch (type) {
    case FETCH_TOTAL_COMPLAINTS:
      return { ...state, complaintList: payload, loadingStatus: true }
    default:
      return state
  }
}

export const getOnholdList = (state = onHold, { type, payload }) => {
  switch (type) {
    case FETCH_ONHOLDCOMPLAINTS_DASH:
      return { ...state, onHoldList: payload, onholdStatus: true }
    default:
      return state
  }
}

export const setAssitRectEmpWise = (state = assitEmp, { type, payload }) => {
  switch (type) {
    case FETCH_ASSIST_RECTY_EMP:
      return { ...state, assitEmpList: payload, assitEmpStatus: true }
    default:
      return state
  }
}

export const setPendingOnholEmpWise = (state = pendOnholdEmp, { type, payload }) => {
  switch (type) {
    case FETCH_PENDING_ONHOLD_EMP:
      return { ...state, pendOnholdEmpList: payload, pendOnholdEmpStatus: true }
    default:
      return state
  }
}
