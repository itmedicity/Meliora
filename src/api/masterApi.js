import { axioslogin } from 'src/views/Axios/Axios'

export const getbackupTypeList = async () => {
  return axioslogin.get('/backuptypemast/getBackupType').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}
export const getsimOperatorList = async () => {
  return axioslogin.get('/simOperators/getsimOperator').then(res => {
    const { success, data } = res.data
    if (success === 2) {
      return data
    }
  })
}

export const getScheduleDatesThisMonth = async () => {
  return axioslogin.get('/tokenMaster/GetdateThisMonth').then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    } else {
      return []
    }
  })
}

export const getDivisionList = async () => {
  return axioslogin.get('/tokenMaster/Getdivision').then(res => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    } else {
      return []
    }
  })
}
export const fetchLoginDetails = async (userId) => {
  try {
    const res = await axioslogin.get(`/indent/getuserLoginrep`, {
      params: { userId }
    });
    const { success, data } = res.data;

    return success === 1 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDeptTokenCount = async (appointmentdate, departmentId) => {
  try {
    const res = await axioslogin.get(`/indent/getDeptTokenCount`, {
      params: { appointmentdate, departmentId }
    });
    const { success, data } = res.data;
    if (success === 1 && data && data.length > 0) {
      return data[0].dept_booked || 0;
    }
    return 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};

export const getAppointmentsByRepId = async (medicalrepid) => {
  try {
    const res = await axioslogin.get(`/indent/getAppointmentsByRepId`, {
      params: { medicalrepid }
    });
    const { success, data } = res.data;
    return success === 1 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const getAppointmentsByDate = async (appointmentdate) => {
  try {
    const res = await axioslogin.get(`/indent/getAppointmentsByDate`, {
      params: { appointmentdate }
    });
    const { success, data } = res.data;
    return success === 1 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getCertificateDetailsByToken = async (token_id) => {
  try {
    const res = await axioslogin.get('/indent/getCertificateDetailsByToken', {
      params: { token_id }
    });
    const { success, data } = res.data;

    return success === 1 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateMedicalDocs = async (postData) => {
  try {
    const res = await axioslogin.patch('/indent/updateMedicalDocs', postData);
    return res.data;
  } catch (error) {
    console.error(error);
    return { success: 0, message: "Error updating medical docs" };
  }
};

export const getIndentMedicines = async () => {
  try {
    const res = await axioslogin.get('/indent/getIndentMedicines');
    const { success, data } = res.data;
    return success === 1 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getApprovedMedicines = async () => {
  try {
    const res = await axioslogin.get('/indent/getApprovedMedicines');
    const { success, data } = res.data;
    return success === 1 ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
