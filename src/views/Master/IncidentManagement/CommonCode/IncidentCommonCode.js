// import { axioslogin } from "src/views/Axios/Axios";


// export const getAllIncidentCategory = async () => {
//     return await axioslogin.get('/incidentMaster/allcategory').then(res => {
//         const { success, data } = res.data
//         if (success === 1 && data.length > 0) {
//             return data
//         } else {
//             return []
//         }
//     })
// }



// export const getAllIncidentSubCategory = async () => {
//     return await axioslogin.get('/incidentMaster/getallsubcatmast').then(res => {
//         const { success, data } = res.data
//         if (success === 1 && data.length > 0) {
//             return data
//         } else {
//             return []
//         }
//     })
// }


// export const fetchAllIncidents = async (id) => {
//     const res = await axioslogin.post('/incidentMaster/getallincident', { logged_user: id });
//     const { success, data } = res.data;
//     if (success === 2 && data.length > 0) {
//         return data
//     } else {
//         return []
//     }
// };



// export const hodinchargeApprovalIncident = async (dep, sec) => {
//     const res = await axioslogin.post('/incidentMaster/hodinchargeaprvl', {
//         dep_slno: dep,
//         sec_slno: sec
//     });
//     const { success, data } = res.data;
//     if (success === 2 && data.length > 0) {
//         return data
//     } else {
//         return []
//     }
// };




import { axioslogin } from "src/views/Axios/Axios";
import { infoNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";

// Get all incident categories
export const getAllIncidentCategory = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/allcategory');
        const { success, data } = res.data || {};
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching incident categories:", error?.message || error);
        return [];
    }
};

//  Get all incident sub-categories
export const getAllIncidentSubCategory = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getallsubcatmast');
        const { success, data } = res.data || {};
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching incident sub-categories:", error?.message || error);
        return [];
    }
};

//  Fetch all incidents for a logged-in user
export const fetchAllIncidents = async (id) => {
    if (!id) {
        console.log("fetchAllIncidents called without a valid user id");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getallincident', { logged_user: id });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};

export const fetchAllInvolvedDep = async (slno) => {
    if (!slno) {
        console.log("fetchAllIncidents called without a valid user slno");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getallinvolveddep', { inc_register_slno: slno });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};



export const fetchAllInvolvedEmployeeDep = async (slno, empId) => {
    if (!slno) {
        console.log("fetchAllIncidents called without a valid user slno");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getallinvolveddepemp', { inc_register_slno: slno, em_id: empId });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};


export const getAllCommonDataCollectionDeparment = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getdatacollectioncs');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};


export const getAllIncidentActionMastDetail = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getallactiodetail');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};


export const getAllIncidentDataCollection = async (depid, empid) => {
    if (!depid) {
        console.log("getAllIncidentDataCollection called without a valid user Department Id");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getdepdatacollection', { dept_id: depid, em_id: empid });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};


export const getAllIncidentDeparmentAction = async (depid) => {
    if (!depid) {
        console.log("getAllIncidentDataCollection called without a valid user Department Id");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getactiondetails', { dept_id: depid });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};

export const getEmployeeType = async (depid) => {
    if (!depid) {
        console.log("getEmployeeType called without a valid user Section Id");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getemptype', { dept_id: depid });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};


export const getFishBoneAnalysisData = async (depid, slno) => {
    if (!depid || !slno) {
        console.log("getFishBoneAnalysisData called without a valid user Ids");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getfishbonedetail', {
            dept_id: depid,
            incident_slno: slno
        });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};

export const getAllDeparmentActions = async (slno) => {
    if (!slno) {
        console.log("getAllDeparmentActions called without a valid user Ids");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getalldepartmentaction', {
            inc_register_slno: slno
        });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};

export const getDepActions = async (slno, depslno) => {
    if (!slno || !depslno) {
        console.log("getDepActions called without a valid user Ids or Deparmentslno");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getdepactions', {
            inc_register_slno: slno,
            dep_id: depslno
        });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};




export const getAllActiveDepartments = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getallactivedepartment');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};



export const getAllActiveDepartmentSection = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getallactivedepartment');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};



export const getDefaultDataCollectionDeparment = async (depid) => {
    if (!depid) {
        console.log("getEmployeeType called without a valid user Section Id");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getempdeptype', { inc_category: depid });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all incidents:", error?.message || error);
        return [];
    }
};


// Not using  this api 
export const hodinchargeApprovalIncident = async (dep, sec) => {
    if (!dep || !sec) {
        console.log("hodinchargeApprovalIncident called with missing dep/sec");
        return [];
    }

    try {
        const res = await axioslogin.post('/incidentMaster/hodinchargeaprvl', {
            dep_slno: dep,
            sec_slno: sec
        });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};


// not using this api 
export const Incidentqualitydep = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/qadincidents');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};


//  approval incidents
export const incidentLevelApprovalFetch = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/fetchlevelapproval');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching Level approval incidents:", error?.message || error);
        return [];
    }
};

// Common Approval level Detail getting
export const IncidentCommonLevelApprovalDetails = async (approvalList) => {
    if (!approvalList) {
        warningNotify("Department Id or Section Id Missing");
        return [];
    }

    try {
        const res = await axioslogin.post('/incidentMaster/common/leveldetail', {
            approval_list: approvalList
        });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error Fetching approval incidents:", error?.message || error);
        return [];
    }
};


export const IncidentCommonLevelApprovalDetailMaster = async (dep, sec) => {

    if (!dep || !sec) {
        warningNotify("Department Id or Section Id Missing");
        return [];
    }

    try {
        const res = await axioslogin.post('/incidentMaster/leveldetailmaster', {
            dep_slno: dep,
            sec_slno: sec
        });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error Fetching approval incidents:", error?.message || error);
        return [];
    }
};

export const IncidentEmployeeApprovalDepartments = async (emp_id, levelNo) => {
    if (!emp_id) {
        warningNotify("Employee Id  Missing");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/approvaldeps', {
            emp_id: emp_id,
            level_no: levelNo
        });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error Fetching approval Deparments:", error?.message || error);
        return [];
    }
};

export const getAllIncidentLevelMapItemDetail = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getinclevelitemmap');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};


export const incidentDataCollectionMapFetch = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/fetchalldcmm');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};

export const getallCommonSettingMaster = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/commonsetting');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};


export const getallCommonSettingMapMaster = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getallcsmapmaster');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};


export const getAllDepartmentType = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getalldeptype');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};


export const getAllIncDcEmpMap = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getalldatacollectionemp');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};
// export const currentLevelNotApprovedIncident = async (levelno, priority, dep, sec) => {
//     try {
//         const res = await axioslogin.post('/incidentMaster/fetchcurrentlevelapprvl', {
//             current_level: levelno,
//             minus_level: Number(levelno) - 1,
//             level_priority: priority,
//             dep_slno: dep,
//             sec_slno: sec
//         });
//         const { success, data } = res.data || {};
//         if (success === 2 && Array.isArray(data) && data.length > 0) {
//             return data;
//         }
//         return [];
//     } catch (error) {
//         console.error("Error fetching Level approval incidents:", error?.message || error);
//         return [];
//     }
// };

export const currentLevelNotApprovedIncident = async (approvalList) => {
    try {
        const res = await axioslogin.post(
            "/incidentMaster/fetchcurrentlevelapprvl",
            { ApprovalDepartments: approvalList }
        );

        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data)) return data;

        return [];
    } catch (error) {
        console.error("Error fetching level approval incidents:", error);
        return [];
    }
};


export const DashBoardIncidentDetails = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/dashboarddata');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error Fetching DashBoard Incidents", error?.message || error);
        return [];
    }
};

// Fething Current Company Detail
export const getCurrentCompanyDetail = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getcompany');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error Fetching DashBoard Incidents", error?.message || error);
        return [];
    }
};

//  getDeparmentSection
export const getDepartmentSection = async () => {
    try {
        const res = await axioslogin.get('/deptsecmaster/status')
        const { success, data } = res.data || {};
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};

//  getEmployee
export const getDepartmentSectionEmployees = async (id) => {
    try {
        const res = await axioslogin.get(`/common/emp/deptsec/${id}`)
        const { success, data } = res.data || {};
        if (success === 1 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error Fetching Section Employye:", error?.message || error);
        return [];
    }
};

export const getDataCollectEmployee = async (id) => {
    try {
        const res = await axioslogin.post(`/incidentMaster/getallactiveDcEmp`, {
            sec_id: id
        })
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error Fetching Section Employye:", error?.message || error);
        return [];
    }
};


export const getAllCommonSetting = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getactivesettings');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};


export const getAllIncidentNature = async () => {
    try {
        const res = await axioslogin.get('/incidentMaster/getallincnature');
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching HOD/Incharge approval incidents:", error?.message || error);
        return [];
    }
};

// common api handler  for all masters
export const handleApi = async (method, url, data, successCode, refetch, reset) => {
    try {
        const result = await axioslogin[method](url, data);
        const { message, success } = result.data;
        if (success === successCode) {
            succesNotify(message);
            refetch();
            reset();
        } else {
            infoNotify(message);
        }
    } catch (error) {
        infoNotify("Error while processing request");
        console.error(error);
    }

};


export const FetchDashBoardIncident = async (id) => {
    if (!id) {
        console.log("FetchDashBoardIncident called without a valid user id");
        return [];
    }
    try {
        const res = await axioslogin.post('/incidentMaster/getincidentcommon', { inc_register_slno: id });
        const { success, data } = res.data || {};
        if (success === 2 && Array.isArray(data) && data.length > 0) {
            return data;
        }
        return [];
    } catch (error) {
        console.error("Error fetching Dashboard incidents:", error?.message || error);
        return [];
    }
};
