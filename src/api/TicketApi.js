import { axioslogin } from 'src/views/Axios/Axios'

export const getAllemployeesUnderDepartment = async postdata => {
  return axioslogin.post('/Ticketdashboard/employeeList', postdata).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getDeptTotalPendingtickets = async empdept => {
  return axioslogin.get(`/complaintassign/${empdept}`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const allTicketTypes = async postdata => {
  return axioslogin.post('/Ticketdashboard/ticketTypeBarchart', postdata).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getTodaysTickets = async PostDept => {
  return axioslogin.post('/Ticketdashboard/todaysTickets', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getOpenTickets = async PostDept => {
  return axioslogin.post('/Ticketdashboard/openTicketsCount', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getClosedTickets = async PostDept => {
  return axioslogin.post('/Ticketdashboard/closedTodayTicket', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getmonthlyticketChart = async searchmonthly => {
  return axioslogin.post('/Ticketdashboard/monthlyTicketchart', searchmonthly).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getTicketOpenWithin = async searchMonthlyOpenTimeRange => {
  return axioslogin.post('/Ticketdashboard/openWithIn', searchMonthlyOpenTimeRange).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getTicketcloseWithin = async searchMonthlycloseTimeRange => {
  return axioslogin.post('/Ticketdashboard/closeWithIn', searchMonthlycloseTimeRange).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getDeptPending = async PostDept => {
  return axioslogin.post('/Ticketdashboard/getDeptPending', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getTodayAssing = async PostDept => {
  return axioslogin.post('/Ticketdashboard/getTodayAssing', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    } else {
      return 0
    }
  })
}
export const getRegistrdFromSixDays = async PostDataa => {
  return axioslogin.post('/Ticketdashboard/getRegistrdFromSixDays', PostDataa).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getClosedFromSixDays = async PostDataa => {
  return axioslogin.post('/Ticketdashboard/getClosedFromSixDays', PostDataa).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getRegTodayInPend = async PostDept => {
  return axioslogin.post('/Ticketdashboard/getRegTodayInPend', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAllcomplaintDept = async PostDataa => {
  return axioslogin.post('/Ticketdashboard/AllcomplaintDept', PostDataa).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAllDeptemployeeList = async PostDataa => {
  return axioslogin.post('/Ticketdashboard/AllDeptemployeeList', PostDataa).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getPevRegTodayAssing = async PostDept => {
  return axioslogin.post('/Ticketdashboard/getPevRegTodayAssing', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getRegTodayAssignToday = async PostDept => {
  return axioslogin.post('/Ticketdashboard/getRegTodayAssignToday', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getPevAssingTodayRect = async PostDept => {
  return axioslogin.post('/Ticketdashboard/getPevAssingTodayRect', PostDept).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getallDeptPending = async () => {
  return axioslogin.get(`/Ticketdashboard/getallDeptPending`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAllDepttodaysTickets = async () => {
  return axioslogin.get(`/Ticketdashboard/getAllDepttodaysTickets`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAllDeptopenTicketsCount = async () => {
  return axioslogin.get(`/Ticketdashboard/getAllDeptopenTicketsCount`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getallDeptclosedTodayTicket = async () => {
  return axioslogin.get(`/Ticketdashboard/getallDeptclosedTodayTicket`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getallDeptRegTodayInPend = async () => {
  return axioslogin.get(`/Ticketdashboard/getallDeptRegTodayInPend`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getallDeptPevRegTodayAssing = async () => {
  return axioslogin.get(`/Ticketdashboard/getallDeptPevRegTodayAssing`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getallDeptRegistrdFromSixDays = async PostDatee => {
  return axioslogin.post('/Ticketdashboard/getallDeptRegistrdFromSixDays', PostDatee).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getallDeptClosedFromSixDays = async PostDatee => {
  return axioslogin.post('/Ticketdashboard/getallDeptClosedFromSixDays', PostDatee).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getallDepttRegTodayAssignToday = async () => {
  return axioslogin.get(`/Ticketdashboard/getallDepttRegTodayAssignToday`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getallDeptPevAssingTodayRect = async () => {
  return axioslogin.get(`/Ticketdashboard/getallDeptPevAssingTodayRect`).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getAllDeptPieTicketchart = async searchmonthly => {
  return axioslogin.post('/Ticketdashboard/getAllDeptPieTicketchart', searchmonthly).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getAllDeptopenWithIn = async searchMonthlyOpenTimeRange => {
  return axioslogin
    .post('/Ticketdashboard/AllDeptopenWithIn', searchMonthlyOpenTimeRange)
    .then(res => {
      const { success, data } = res.data
      if (success === 2) {
        return data
      }
    })
}
export const getAllDeptcloseWithIn = async searchMonthlyOpenTimeRange => {
  return axioslogin
    .post('/Ticketdashboard/AllDeptcloseWithIn', searchMonthlyOpenTimeRange)
    .then(res => {
      const { success, data } = res.data
      if (success === 2) {
        return data
      }
    })
}

export const getEmployeeuserrightsMenu = async postEmp => {
  return axioslogin.post('/Ticketdashboard/getEmployeeuserrightsMenu', postEmp).then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
