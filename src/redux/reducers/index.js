import { combineReducers } from 'redux';
import { changeState } from '../reducers/SideBarToggerReducer';
import { LoginUserData } from '../reducers/LoginReducer'
import { getModuleName } from '../reducers/Module.Reducer'
import { getUserGroup } from '../reducers/UserGroup.Reducer'
import { setMenuName } from '../reducers/MenuName.Reducer'
import { getDepartment } from './Department.Reducer';
import { getComplaintDept } from './ComplaintDepartment.Reducer'
import { getHicpolicy } from './HicPolicy.Reducer'
import { getRequesttype } from './RequestType.reducer'
import { getDeptsection } from './DeptSection.Reducer'
import { getComplainttype } from './ComplaintType.Reducer'
import { getEmployeeName } from '../reducers/EmpName.Reducer'
import { getModuleGroup } from '../reducers/ModuleGroup.Reducer'
import { getAssetType } from '../reducers/AssetType.Reducer'
import { getSubModuleGroup } from './SubModuleGroup.Reducer'
import { getBranch } from './Branch.Reducer'
import { getDesignation } from './Designation.Reducer'
import { getSalutation } from './Salutation.Reducer'
import { getDeptsectionDept } from './DeptSecDept.Reducer'
import { getBuilding } from './Building.Reducer'
import { getoraRoomtype } from './Roomtype.Reducer'
import { getRoomtypemeli } from './Roomtypemeliora.Reducer'
import { getRmmasteroracle } from './RmmasterOra.Reducer'
import { getRmmastermeliora } from './Rmmastermeliora.Reducer'
import { getRoomcatora } from './RoomCatOra.Reducer'
import { getDiet } from './Diet.Reducer'
import { getDiettype } from './DietType.Reducer'
import { getOutlet } from './OutletOra.Reducer'
import { getItem } from './ItemMaster.Reducer'
import { getitemGrpName } from './Itemgroup.Reducer'
import { getNusringStation } from './NursingStation.Reducer'
import { getLoginProfileData } from './LoginProfile.Reducer'
import { getOraRoomByRoomType } from './OraRoomByType.Reducer'
import { getNusringStationMeli } from './NurseStatnMeli.Reducer'
import { getDepartemployee } from './Departwiseemployee.Reducer'
import { getAssistantemployee } from './AssistantEmp.Reducer'
import { changeStateAggrid } from '../reducers/StatechangeAgGrid';
import { getAsignedstaffnurse } from '../reducers/Asignrdstaff.reducer';
import { getComplaintList, setPendingOnholEmpWise, getOnholdList, setAssitRectEmpWise } from '../reducers/ComplaintDashboard.Reducer';
import { getComplaintLists } from '../reducers/ComplaintLists.Reducer'
import { getAssignedComplaintLists } from '../reducers/AssignedcmLists.Reducer'
import { getAssistComplaintLists } from '../reducers/AssistcmLists.Reducer'
import { getAllComplaintLists } from '../reducers/AllcomplaintsLists.Reducer'
import { getComplaintRights } from '../reducers/CmpRightsDashboard.Reducer'
import { getDepartSecemployee } from '../reducers/EmpNameDeptSec.Reducer'
import { getTotalAdmission } from '../reducers/WeworkAdmission.Reducer'
import { getTotalWeAdmission } from '../reducers/WeWrkTotAdmission.Reducer'
import { getWeBhrcDetl } from '../reducers/WeBhrcDetl.reducer'
import { getDamaDetl } from '../reducers/WeDamaDetl.reducer'
import { getDischargeList } from '../reducers/WeDiscAfternoonList.reducer'
import { getAfternoonrounds } from '../reducers/WeRoundsAfternoon.reducer'
import { getwenoShiftdetl } from '../reducers/WeOnesheetDetl.reducers'
import { getHighAntibioticdetl } from '../reducers/HighBiotic.Reducer'
import { getWeBhrcAdmitdetl } from '../reducers/WebhrcAdmitList.Reducer'
import { getFloorselect } from '../reducers/FloorSelect.Reducer'
import { getnursewisefloor } from '../reducers/NurseWiseFloor.reducer'
import { setExtraOrderList } from '../reducers/DietExtraOrder.Reducer'
import { getEscalation } from '../reducers/Level1Escalation.reducer'
import { getEscalationMaster } from '../reducers/EscalationMaster.Reducer'
import { getEscalationMapping } from '../reducers/EscalationMapping.Reducer'
import { getEscalationlvl2 } from '../reducers/Level2Escalation.Reducer'
import { getescalationlvl3 } from '../reducers/Level3Escalation.Reducer'
import { getescalationlvl4 } from '../reducers/Level4Escalation.Reducer'
import { getescalationtoplvl } from '../reducers/TopLevelEscalation.Reducer'
import { getEscalationMappingmaintenenace } from '../reducers/EscmappingMain.Reducer'
import { getEscalationMappingIt } from '../reducers/EscalationMappingIt.reducer'
import { getEscalationMappingToplvlIt } from '../reducers/EscalationMappingToplvlIt.Reducer'
import { getEscalationMappingToplvlmaintenenace } from '../reducers/EscalationMappingToplvlMain.Reducer'
import { getEscalationMappingLvl2It } from '../reducers/EscalationMappingLvl2It.Reducer'
import { getEscalationMappingLvl2Main } from '../reducers/EscalationMappingLvl2Main.Reducer'
import { getEscalationMappingLvl3It } from '../reducers/EscalationMappingLvl3It.Reducer'
import { getEscalationMappingLvl3Main } from '../reducers/EscalationLvl3Main.Reducer'
import { getEscalationMappingLvl4It } from '../reducers/EscalationMappingLvl4It.Reducer'
import { getEscalationMappingLvl4Main } from '../reducers/EscalationMappingLvl4Main.Reducer'
import { setComplaintListAll, setPendOnholdCompListAll } from '../reducers/ComplaintDashAllDept.Reducer'
import { setCompListAllForMenu } from '../reducers/CompalintListAll.Reducer'
import { setItemExtra } from '../reducers/ItemMasterExtra.Reducer'
import { setTotalInPateint } from '../reducers/TotalInPateintList.Reducer'
import { setDietPlaned } from '../reducers/DietPlannedList.Reducer'
import { setDietPlanPending } from '../reducers/DietPlanPending.Reducer'
import { getBhrctotalPatient } from '../reducers/BhrcTotalPatient.Reducer'
import { getEmpfloor } from '../reducers/EmpWiseFloor.reducer'
import { setRequestListByDeptSec } from '../reducers/ReqRegisterListByDept.Reducer'
import { setInchargeHodData } from '../reducers/InchargeHodChecks.Reducer'
import { setReqApprvDept } from '../reducers/ReqApprovDept.Reducer'
import { setReqApprovOthers } from '../reducers/ReqApprovOtherDept.Reducer'
import { getHallMasterSlno } from '../reducers/Hallmaster.Reducer'
import { setdepthallbookApproval } from '../reducers/HallbookingApproval.Reducer'
import { setNdrfList } from '../reducers/NdrfList.Reducer'

const reducer = combineReducers({
    changeState,
    LoginUserData,
    getModuleName,
    getUserGroup,
    setMenuName,
    getDepartment,
    getComplaintDept,
    getHicpolicy,
    getRequesttype,
    getDeptsection,
    getComplainttype,
    getEmployeeName,
    getModuleGroup,
    getAssetType,
    getSubModuleGroup,
    getBranch,
    getDesignation,
    getSalutation,
    getDeptsectionDept,
    getBuilding,
    getoraRoomtype,
    getRoomtypemeli,
    getRmmasteroracle,
    getRmmastermeliora,
    getRoomcatora,
    getDiet,
    getDiettype,
    getOutlet,
    getItem,
    getitemGrpName,
    getNusringStation,
    getLoginProfileData,
    getOraRoomByRoomType,
    getNusringStationMeli,
    getDepartemployee,
    getAssistantemployee,
    changeStateAggrid,
    getAsignedstaffnurse,
    getComplaintLists,
    getAssignedComplaintLists,
    getAssistComplaintLists,
    getAllComplaintLists,
    getComplaintRights,
    getDepartSecemployee,
    getTotalAdmission,
    setExtraOrderList,
    getEscalation,
    getEscalationMaster,
    getEscalationMapping,
    getEscalationlvl2,
    getescalationlvl3,
    getescalationlvl4,
    getescalationtoplvl,
    getEscalationMappingmaintenenace,
    getEscalationMappingIt,
    getEscalationMappingToplvlIt,
    getEscalationMappingToplvlmaintenenace,
    getEscalationMappingLvl2It,
    getEscalationMappingLvl2Main,
    getEscalationMappingLvl3It,
    getEscalationMappingLvl3Main,
    getEscalationMappingLvl4It,
    getEscalationMappingLvl4Main,
    getComplaintList,
    getOnholdList,
    setAssitRectEmpWise,
    setPendingOnholEmpWise,
    setComplaintListAll,
    setPendOnholdCompListAll,
    setCompListAllForMenu,
    getTotalWeAdmission,
    getWeBhrcDetl,
    getDamaDetl,
    getDischargeList,
    getAfternoonrounds,
    getwenoShiftdetl,
    getHighAntibioticdetl,
    getWeBhrcAdmitdetl,
    getFloorselect,
    getnursewisefloor,
    setItemExtra,
    setDietPlaned,
    setTotalInPateint,
    setDietPlanPending,
    getBhrctotalPatient,
    getEmpfloor,
    setRequestListByDeptSec,
    setInchargeHodData,
    setReqApprvDept,
    setReqApprovOthers,
    getHallMasterSlno,
    setdepthallbookApproval,
    setNdrfList

})
export default reducer;
