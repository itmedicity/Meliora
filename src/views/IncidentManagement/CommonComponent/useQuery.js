import { useQuery } from '@tanstack/react-query';
import {
    currentLevelNotApprovedIncident,
    DashBoardIncidentDetails,
    fetchAllIncidents,
    fetchAllInvolvedDep,
    fetchAllInvolvedEmployeeDep,
    FetchDashBoardIncident,
    getAllCommonDataCollectionDeparment,
    getAllDeparmentActions,
    getAllIncidentActionMastDetail,
    getAllIncidentCategory,
    getAllIncidentDataCollection,
    getAllIncidentDeparmentAction,
    getAllIncidentLevelMapItemDetail,
    getAllIncidentNature,
    getAllIncidentSubCategory,
    getCurrentCompanyDetail,
    getDataCollectEmployee,
    getDepActions,
    getDepartmentSectionEmployees,
    getFishBoneAnalysisData,
    hodinchargeApprovalIncident,
    IncidentCommonLevelApprovalDetailMaster,
    IncidentCommonLevelApprovalDetails,
    IncidentEmployeeApprovalDepartments,
    incidentLevelApprovalFetch
} from 'src/views/Master/IncidentManagement/CommonCode/IncidentCommonCode';


//  1. Get all incidents (HOD/Incharge Approval)  not using
export const useInchargeHodApprovalIncidents = (empdept, empsecid) => {
    return useQuery({
        queryKey: ['allIncidents', empdept, empsecid],
        queryFn: () => hodinchargeApprovalIncident(empdept, empsecid),
        enabled: !!empdept && !!empsecid,
    });
};
//  2. Get all incident levels
export const useIncidentLevels = () => {
    return useQuery({
        queryKey: ['getalllevels'],
        queryFn: incidentLevelApprovalFetch,
        staleTime: Infinity,
    });
};

//  3. Get incident level approvals (not approved)
export const useIncidentLevelApproval = (approvalList) => {
    return useQuery({
        queryKey: ['alllevelapproval', approvalList],
        queryFn: () => currentLevelNotApprovedIncident(approvalList),
        enabled: Array.isArray(approvalList) && approvalList.length > 0
    });
};



//  4. Fetch fishbone analysis details
export const useFishboneAnalysis = (empsecid, incRegisterSlno) => {
    return useQuery({
        queryKey: ['fbadetail', empsecid, incRegisterSlno],
        queryFn: () => getFishBoneAnalysisData(empsecid, incRegisterSlno),
        enabled: !!empsecid && !!incRegisterSlno,
    });
};


//  5. Fetch all department request/action details
export const useDepartmentActions = (incRegisterSlno) => {
    return useQuery({
        queryKey: ['getalldepactions', incRegisterSlno],
        queryFn: () => getAllDeparmentActions(incRegisterSlno),
        enabled: !!incRegisterSlno,
    });
};


//  6. Fetch all involved departments
export const useInvolvedDepartments = (incRegisterSlno) => {
    return useQuery({
        queryKey: ['allinvdep', incRegisterSlno],
        queryFn: () => fetchAllInvolvedDep(incRegisterSlno),
        enabled: !!incRegisterSlno,
    });
};




//  7. Fetch all Action Incdient departments
export const useIncidentActionsMaster = () => {
    return useQuery({
        queryKey: ['getallactionmastdet'],
        queryFn: () => getAllIncidentActionMastDetail(),
        staleTime: Infinity
    });
};

//  7. Fetch all Action Incdient departments
export const useIncidentLevelItemMap = () => {
    return useQuery({
        queryKey: ['getallinclevelitem'],
        queryFn: () => getAllIncidentLevelMapItemDetail(),
        staleTime: Infinity
    });
};


// 8. Fetch all Incident Categories
export const useIncidentCategory = () => {
    return useQuery({
        queryKey: ["getincidentcategory"],
        queryFn: () => getAllIncidentCategory(),
        staleTime: Infinity,
    });
};

// 9. Fetch all Incident Sub Categories
export const useIncidentSubCategory = () => {
    return useQuery({
        queryKey: ["getincidentsubcategory"],
        queryFn: () => getAllIncidentSubCategory(),
        staleTime: Infinity,
    });
};



//10 Fetch All Incident Department Data Collection
export const useIncidentDepartmentDataCollection = (empdept, empid) => {
    return useQuery({
        queryKey: ['incidentDataCollect', empdept, empid],
        queryFn: () => getAllIncidentDataCollection(empdept, empid),
        enabled: !!empdept && !!empid,
        staleTime: Infinity, // optional: match your other hook style
    });
};


// 11. Fetch All Department Action Details
export const useDepartmentReqActions = (inc_register_slno, empdept) => {
    return useQuery({
        queryKey: ['getdepactions', inc_register_slno, empdept],
        queryFn: () => getDepActions(inc_register_slno, empdept),
        enabled: !!inc_register_slno && !!empdept,
        staleTime: Infinity,    // optional: maintain consistency
    });
};

//  12. Get all incident levels
export const useIncidentCommonApprovalLevels = (approvalList) => {
    return useQuery({
        queryKey: ['getallcommonlevelapproval', approvalList],
        queryFn: () => {
            if (!Array.isArray(approvalList) || approvalList.length === 0) {
                return Promise.resolve([]);   // ← prevent loading
            }
            return IncidentCommonLevelApprovalDetails(approvalList);
        },
        // enabled: Array.isArray(approvalList) && approvalList.length > 0,
        staleTime: Infinity,
    });
};


//  13. Get all incident levels
export const useIncidentDashBoardData = () => {
    return useQuery({
        queryKey: ['dashdata'],
        queryFn: () => DashBoardIncidentDetails(),
        staleTime: Infinity,
    });
};


//  14. Get all incident levels
export const useCurrentCompanyData = () => {
    return useQuery({
        queryKey: ['currentcmp'],
        queryFn: () => getCurrentCompanyDetail(),
        staleTime: Infinity,
    });
};

//  15. Get all incident levels
export const useApprovalDepartmentFetching = (empid) => {
    return useQuery({
        queryKey: ['getapprovaldeps', empid],
        queryFn: () => IncidentEmployeeApprovalDepartments(empid),
        enabled: !!empid,
        staleTime: Infinity,
    });
};

//  16. Get all incident levels
export const useIncidentCommonApprovalLevelMaster = (empdept, empsecid) => {
    return useQuery({
        queryKey: ['getalllevelapprovalmast', empdept, empsecid],
        queryFn: () => IncidentCommonLevelApprovalDetailMaster(empdept, empsecid),
        enabled: !!empdept && !!empsecid,
        staleTime: Infinity,
    });
};

//17 Get all incidents by id
export const useAllIncidentDetails = (id) => {
    return useQuery({
        queryKey: ['allIncidents', id],
        queryFn: () => fetchAllIncidents(id),
        enabled: !!id,
        staleTime: Infinity,
    });
};

// 18 Get all incident department actions
export const useIncidentDepartmentActions = (empdept) => {
    return useQuery({
        queryKey: ['incidentaction', empdept],
        queryFn: () => getAllIncidentDeparmentAction(empdept),
        enabled: !!empdept,
        staleTime: Infinity,
    });
};


// Get all common data collection departments
export const useCommonDataCollectionDepartments = () => {
    return useQuery({
        queryKey: ['alldatacollectioncs'],
        queryFn: () => getAllCommonDataCollectionDeparment(),
        staleTime: Infinity,
    });
};



// Get all Employeee Based on Sec Id
export const useDepartmentSectionEmployee = (secid) => {
    return useQuery({
        queryKey: ['sectionemployee', secid],
        queryFn: () => getDepartmentSectionEmployees(secid),
        staleTime: Infinity,
        enabled: !!secid
    });
};

// Get all Employeee Based on Sec Id
export const useDepartDataCollectionEmployee = (secid) => {
    return useQuery({
        queryKey: ['dcemployee', secid],
        queryFn: () => getDataCollectEmployee(secid),
        staleTime: Infinity,
        enabled: !!secid
    });
};


export const useInidentNatuer = () => {
    return useQuery({
        queryKey: ['incnautre'],
        queryFn: () => getAllIncidentNature(),
        staleTime: Infinity,

    });
};

// Fetch all Employee involved departments
export const useEmployeeInvolvedDepartments = (incRegisterSlno, empID) => {
    return useQuery({
        queryKey: ['allempinvdep', incRegisterSlno, empID],
        queryFn: () => fetchAllInvolvedEmployeeDep(incRegisterSlno, empID),
        enabled: !!incRegisterSlno && !!empID,
    });
};



export const useIncidentDetailDashBoard = (id) => {
    return useQuery({
        queryKey: ['alldashboardincident', id],
        queryFn: () => FetchDashBoardIncident(id),
        enabled: !!id,
        staleTime: Infinity,
    });
};
// fetch current employee type (Clinical and Non Clinical)
// const { data: empDeptType } = useQuery({
//     queryKey: ['emptype', empdept],
//     queryFn: () => getEmployeeType(empdept),
//     enabled: !!empdept,
//     select: (data) => data?.[0]?.dept_type, // just pick what you need
// });

// const { data: getemployeedepartmenttype } = useQuery({
//     queryKey: ['empdeptype', empDeptType],
//     queryFn: () => getDefaultDataCollectionDeparment(empDeptType),
//     enabled: !!empDeptType,
// });