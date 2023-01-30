import React from 'react'

const Home = React.lazy(() => import('./views/dashboard/Home'))
const Settings = React.lazy(() => import('../src/Menus/Settings'))
const Administrtion = React.lazy(() => import('../src/views/Administration/Test'))
const DepartmentMast = React.lazy(() => import('./views/Master/Department/DepartmentMast'))
const DepartmentSectionMast = React.lazy(() => import('./views/Master/DepartmentSectionMast/DeptSectionMast'))
const ComplaintDepartment = React.lazy(() => import('./views/Master/ComplaintDepartment/ComplaintDeptMast'))
const ComplaintRegister = React.lazy(() => import('./views/ComManagement/ComplaintRegister/ComplaintRegistrMast'))
const UserGroupMast = React.lazy(() => import('./views/Master/UserGroupMaster/UserGroupMast'))
const ModuleMast = React.lazy(() => import('./views/Master/ModuleMaster/ModuleMaster'))
const UserGroupRights = React.lazy(() => import('./views/Master/UserGroupRight/UserGroupRight'))
const ModuleGroupMast = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMast'))
const RequestType = React.lazy(() => import('./views/Master/RequestType/RequestTypeMast'))
const ComplaintType = React.lazy(() => import('./views/Master/ComplaintType/ComplaintTypeMast'))
const HicPolicy = React.lazy(() => import('./views/Master/HicPolicy/HicPolicyMast'));
const moduleuserRight = React.lazy(() => import('./views/Master/ModuleUserRight/ModuleUserRight'))
const assignComplaint = React.lazy(() => import('./views/ComManagement/AssignComplaint/AssignComplaintTable'))
const ComplaintList = React.lazy(() => import('./views/ComManagement/ComplaintList'))
const AssetType = React.lazy(() => import('./views/Master/AssetMasters/AssetType/AssetTypeMaster'))
const ItemType = React.lazy(() => import('./views/Master/AssetMasters/ItemType/ItemTypeMast'))
const ItemCategory = React.lazy(() => import('./views/Master/AssetMasters/Category/CategoryMaster'))
const SubCategory = React.lazy(() => import('./views/Master/AssetMasters/SubCategory/SubCategoryMast'))
const AssetGroup = React.lazy(() => import('./views/Master/AssetMasters/Group/GroupMast'))
const SubGroup = React.lazy(() => import('./views/Master/AssetMasters/SubGroup/SubGroupMast'))
const Manufacture = React.lazy(() => import('./views/Master/AssetMasters/Manufacture/ManufactureMast'))
const Building = React.lazy(() => import('./views/Master/RoomMasters/BuildingMaster/BuildingMaster'))
const Floor = React.lazy(() => import('./views/Master/RoomMasters/FloorMaster/FloorMaster'))
const RoomType = React.lazy(() => import('./views/Master/RoomMasters/RoomType/RoomTypeMast'))
const RoomCategory = React.lazy(() => import('./views/Master/RoomMasters/RoomCategory/RoomCategoryMast'))
const NursingStation = React.lazy(() => import('./views/Master/NursingStation/NursingStationMast'))
const DietCategory = React.lazy(() => import('./views/Master/DietMasters/Diet/DietMaster'))
const DietType = React.lazy(() => import('./views/Master/DietMasters/DietType/DietTypeMast'))
const RateList = React.lazy(() => import('./views/Master/DietMasters/RateList/RateListMast'))
const DietIssue = React.lazy(() => import('./views/Master/DietMasters/DietIssueSchedule/DietIssueScheduleMast'))
const InpatientList = React.lazy(() => import('./views/NursingStation/InPatientList'))
const DietProcess = React.lazy(() => import('./views/Diet/DietProcess'))
const UserCreation = React.lazy(() => import('./views/Master/UserCreation/UserCreation'))
const UserCreationTable = React.lazy(() => import('./views/Master/UserCreation/UserCreationTable'))
const RoomCreation = React.lazy(() => import('./views/RoomManagement/Roomcreation/RoomCreation'))
const SubRoomCreation = React.lazy(() => import('./views/RoomManagement/SubRoomCreation/SubRoomCreation'))
const DietMenuSetting = React.lazy(() => import('./views/Master/DietMasters/DietMenuSetting/DietMenuSetting'))
const ItemGroup = React.lazy(() => import('./views/Master/DietMasters/ItemGroup/ItemGroupMast'))
const ItemMaster = React.lazy(() => import('./views/Master/DietMasters/ItemMaster/ItemMaster'))
const DietDetail = React.lazy(() => import('./views/Master/DietMasters/DietDetail/DietDetailMast'))
const DietApproval = React.lazy(() => import('./views/NursingStation/DietApprovalList'));
const DietPlanList = React.lazy(() => import('./views/NursingStation/DietPlanList'));
const DietOrderList = React.lazy(() => import('./views/Diet/DietOrder/DietOderTaking'));
const DietExtraOrder = React.lazy(() => import('./views/Diet/DietExtraOrder/ExtraOrder'));
const DietDelivery = React.lazy(() => import('./views/Diet/DietDeliveryMark'))
const RectifyComplaint = React.lazy(() => import('./views/ComManagement/RectifyComplaint/RectifyCompalint'))
const WeWorkInpatient = React.lazy(() => import('./views/WeWork/InPatientList'))
const Reports = React.lazy(() => import('./Menus/Reports'))
const DietReport = React.lazy(() => import('./views/Report/DietReport/DietTypeWise'))
const NusrseStationReport = React.lazy(() => import('./views/Report/DietReport/NurseStationWise'))
const PatientReport = React.lazy(() => import('./views/Report/DietReport/PatientWise'))
const DirectComplaintReg = React.lazy(() => import('./views/ComManagement/DirectCmRegister/DirectComplaintReg'))
const MonthlyReport = React.lazy(() => import('./views/Report/DietReport/MonthlyReport'))
const TotalAdmisson = React.lazy(() => import('./views/WeWork/WeworkTaotalAdmission/TotalAdmisson'))
const DamaCount = React.lazy(() => import('./views/WeWork/Damacount/DamaCount'))
const BhrcCount = React.lazy(() => import('./views/WeWork/BhrcList/BhrcCount'))
const RoundsAfternoonList = React.lazy(() => import('./views/WeWork/RoundsAfterNoon/RoundsAfternoonList'))
const DischargeList = React.lazy(() => import('./views/WeWork/DischrgeafternoonList/DischargeList'))
const HighAntibiotic = React.lazy(() => import('./views/Master/WEWorkMaster/HighAntibiotic/HighAntibioMast'))
const PatSurvillenceView = React.lazy(() => import('./views/WeWork/Patienntsurvillence/PatSurvillenceView'))
const NoshiftReport = React.lazy(() => import('./views/Report/WeworkReport/NoshiftReport'))
const HighAntiBioticReport = React.lazy(() => import('./views/Report/WeworkReport/HighAntiBioticReport'))
const EmpNsWiseMaping = React.lazy(() => import('./views/Master/WEWorkMaster/EmpNSWiseMapp/NSWiseMAppingMast'))
const ExtraOrderView = React.lazy(() => import('./views/Diet/DietExtraOrder/ExtraOrderView'))
const EscalationTime = React.lazy(() => import('./views/Master/EscalationTimeMast/EscalationTimeMast'))
const EscalationLevel1 = React.lazy(() => import('./views/TimeEscalation/Level1Escalation/Level1escalation'))
const EscalationLevel2 = React.lazy(() => import('./views/TimeEscalation/Level2Escalation/Level2escalation'))
const EscalationLevel3 = React.lazy(() => import('./views/TimeEscalation/Level3Escalation/Level3escalation'))
const EscalationLevel4 = React.lazy(() => import('./views/TimeEscalation/Level4Escalation/Level4escalation'))
const TopLevelED = React.lazy(() => import('./views/TimeEscalation/TopLevelEscalationED/TopelevelED'))
const EscalationMapping = React.lazy(() => import('./views/Master/EscalationMapping/EscalationMapping'))
const PendingOnholdList = React.lazy(() => import('./views/ComManagement/PendingOnhold/PendingOnHoldList'))
const TotalDeptWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/ComDashDeptAllTable'))
const PendingDeptWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/PendingAssignDept'))
const AssignDeptWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/AssignComDept'))
const VerifyDeptWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/VeriftComDept'))
const OnHoldPendingDeptWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/OnPendingComDept'))
const AssignEmpWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/AssignComEmp'))
const VerifyEmpWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/RectifyComEmp'))
const OnHoldPendingEmpWiseList = React.lazy(() => import('./views/dashboard/ComplaintDashViews/PendingOnholdEmp'))
const InPatientList = React.lazy(() => import('./views/dashboard/DietDashViews/TotalInpatientList'))
const DietPlannedList = React.lazy(() => import('./views/dashboard/DietDashViews/DietPalnnedList'))
const DietPlanPending = React.lazy(() => import('./views/dashboard/DietDashViews/DietPlanPendingList'))
const RequestRegister = React.lazy(() => import('./views/RequestManagement/RequestRegister/ReqRegistration'))
const ReqDepartmentApproval = React.lazy(() => import('./views/RequestManagement/DepartmentApproval/ReqDeptApproval'))
const ReqOMApproval = React.lazy(() => import('./views/RequestManagement/OMApproval/OmApproval'))
const ReqSMOApproval = React.lazy(() => import('./views/RequestManagement/SMOApproval/SmoApproval'))
const ReqCAOApproval = React.lazy(() => import('./views/RequestManagement/CAOApproval/CAOApproval'))
const ReqEDApproval = React.lazy(() => import('./views/RequestManagement/EDApproval/EDApproval'))
const NDRFform = React.lazy(() => import('./views/RequestManagement/NdrfFrorm/NdrfFrom'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/Home', exact: true, name: 'Home', component: Home },
  { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings },
  { path: '/Home/Administration', exact: true, name: 'Administator', component: Administrtion },
  { path: '/Home/Department', exact: true, name: 'Department Mast', component: DepartmentMast },
  { path: '/Home/DepartmentSection', exact: true, name: 'Department Mast', component: DepartmentSectionMast },
  { path: '/Home/ComplaintDepartment', exact: true, name: 'Complaint Department', component: ComplaintDepartment },
  { path: '/Home/ComplaintRegister', exact: true, name: 'Complaint Register', component: ComplaintRegister },
  { path: '/Home/Group', exact: true, name: 'User Group Master', component: UserGroupMast },
  { path: '/Home/ModuleMast', name: 'Module Master', component: ModuleMast },
  { path: '/Home/UserGroupRight', exact: true, name: 'User Group Rights', component: UserGroupRights },
  { path: '/Home/ModuleGroupMast', exact: true, name: 'Module group Master', component: ModuleGroupMast },
  { path: '/Home/RequestType', exact: true, name: 'Request Type', component: RequestType },
  { path: '/Home/ComplaintType', exact: true, name: 'Complaint Type', component: ComplaintType },
  { path: '/Home/HicPolicy', exact: true, name: 'Hic Policy', component: HicPolicy },
  { path: '/Home/ModuleUserRight', exact: true, name: 'Module User Right', component: moduleuserRight },
  { path: '/Home/AssignComplaint', exact: true, name: 'Assign Complaint', component: assignComplaint },
  { path: '/Home/ComplaintList', exact: true, name: 'Compliant List', component: ComplaintList },
  { path: '/Home/AssetType', exact: true, name: 'Asset Type', component: AssetType },
  { path: '/Home/ItemType', exact: true, name: 'Item Type', component: ItemType },
  { path: '/Home/ItemCategory', exact: true, name: 'Item Category', component: ItemCategory },
  { path: '/Home/SubCategory', exact: true, name: 'Sub Category', component: SubCategory },
  { path: '/Home/AssetGroup', exact: true, name: 'Group', component: AssetGroup },
  { path: '/Home/SubGroup', exact: true, name: 'SubGroup', component: SubGroup },
  { path: '/Home/Manufacture', exact: true, name: 'Manufacture', component: Manufacture },
  { path: '/Home/Building', exact: true, name: 'Building', component: Building },
  { path: '/Home/Floor', exact: true, name: 'Floor', component: Floor },
  { path: '/Home/RoomType', exact: true, name: 'RoomType', component: RoomType },
  { path: '/Home/RoomCategory', exact: true, name: 'RoomCategory', component: RoomCategory },
  { path: '/Home/NursingStation', exact: true, name: 'NursingStation', component: NursingStation },
  { path: '/Home/Diet', exact: true, name: 'DietCategory', component: DietCategory },
  { path: '/Home/DietIssue', exact: true, name: 'DietIssue', component: DietIssue },
  { path: '/Home/DietType', exact: true, name: 'DietType', component: DietType },
  { path: '/Home/RateList', exact: true, name: 'RateList', component: RateList },
  { path: '/Home/InpatientList', exact: true, name: 'In-Patient List', component: InpatientList },
  { path: '/Home/DietProcess', exact: true, name: 'Diet Process', component: DietProcess },
  { path: '/Home/UserCreation', exact: true, name: 'User Creation', component: UserCreation },
  { path: '/Home/UserCreationTable', exact: true, name: 'User Creation Table', component: UserCreationTable },
  { path: '/Home/RoomCreation', exact: true, name: 'Room Creation', component: RoomCreation },
  { path: '/Home/SubRoomCreation', exact: true, name: ' Sub Room Creation', component: SubRoomCreation },
  { path: '/Home/DietMenuSetting', exact: true, name: 'Diet Plan', component: DietMenuSetting },
  { path: '/Home/ItemGroup', exact: true, name: 'Item Group', component: ItemGroup },
  { path: '/Home/ItemMaster', exact: true, name: ' Item Master', component: ItemMaster },
  { path: '/Home/DietDetail', exact: true, name: 'Diet Detail', component: DietDetail },
  { path: '/Home/DietApproval', exact: true, name: ' Diet Approval', component: DietApproval },
  { path: '/Home/DietPlanList', exact: true, name: ' Diet Approval', component: DietPlanList },
  { path: '/Home/DietOrderList', exact: true, name: ' Diet Order List', component: DietOrderList },
  { path: '/Home/DietExtraOrder', exact: true, name: ' Diet Extra Order', component: DietExtraOrder },
  { path: '/Home/DietDelivery', exact: true, name: ' Diet Delivery', component: DietDelivery },
  { path: '/Home/RectifyComplaint', exact: true, name: 'Rectify Complaint', component: RectifyComplaint },
  { path: '/Home/WeWork/InpatientList', exact: true, name: 'WeWork Inpatient', component: WeWorkInpatient },
  { path: '/Home/Reports', exact: true, name: 'Reports', component: Reports },
  { path: '/Home/Report/Diet', exact: true, name: 'Diet Report', component: DietReport },
  { path: '/Home/Report/NurseStation', exact: true, name: 'Nuse Station Wise Report', component: NusrseStationReport },
  { path: '/Home/Report/Pateintwise', exact: true, name: 'Pateint wise Report', component: PatientReport },
  { path: '/Home/DirectComplaint', exact: true, name: 'Direct Complaint Register', component: DirectComplaintReg },
  { path: '/Home/Report/Monthly', exact: true, name: 'Monthly Report', component: MonthlyReport },
  { path: '/Home/totaladmission', exact: true, name: 'Total Admission', component: TotalAdmisson },
  { path: '/Home/ExtraOrderView', exact: true, name: 'Total Admission', component: ExtraOrderView },
  { path: '/Home/EscalationTime', exact: true, name: 'Escalation Time', component: EscalationTime },
  { path: '/Home/EscalationLevel1', exact: true, name: 'EscalationLevel1', component: EscalationLevel1 },
  { path: '/Home/EscalationLevel2', exact: true, name: 'EscalationLevel2', component: EscalationLevel2 },
  { path: '/Home/EscalationLevel3', exact: true, name: 'EscalationLevel3', component: EscalationLevel3 },
  { path: '/Home/EscalationLevel4', exact: true, name: 'EscalationLevel4', component: EscalationLevel4 },
  { path: '/Home/TopLevelED', exact: true, name: 'TopLevelED', component: TopLevelED },
  { path: '/Home/EscalationMapping', exact: true, name: 'EscalationMapping', component: EscalationMapping },
  { path: '/Home/PendingOnholdComplaint', exact: true, name: 'Pending Onhold List', component: PendingOnholdList },
  { path: '/Home/TotalDeptWiseList', exact: true, name: 'Total Comp Dept Wise List', component: TotalDeptWiseList },
  { path: '/Home/PendingDeptWiseList', exact: true, name: 'Pending For Assign Comp Dept Wise List', component: PendingDeptWiseList },
  { path: '/Home/AssignDeptWiseList', exact: true, name: 'Assign Comp Dept Wise List', component: AssignDeptWiseList },
  { path: '/Home/VerifyDeptWiseList', exact: true, name: 'Verify Comp Dept Wise List', component: VerifyDeptWiseList },
  { path: '/Home/OnHoldPendingDeptWiseList', exact: true, name: 'Onhold Comp Dept Wise List', component: OnHoldPendingDeptWiseList },
  { path: '/Home/AssignEmpWiseList', exact: true, name: 'Assign Comp Emp Wise List', component: AssignEmpWiseList },
  { path: '/Home/VerifyEmpWiseList', exact: true, name: 'verify Comp Emp Wise List', component: VerifyEmpWiseList },
  { path: '/Home/OnHoldPendingEmpWiseList', exact: true, name: 'Onhold Comp Emp Wise List', component: OnHoldPendingEmpWiseList },
  { path: '/Home/damaList', exact: true, name: "Dama count", component: DamaCount },
  { path: '/Home/BhrcList', exact: true, name: "Bhrc List", component: BhrcCount },
  { path: '/Home/roundsAfternoon', exact: true, name: "Rounds Afternoon", component: RoundsAfternoonList },
  { path: "/Home/disafternoonList", exact: true, name: 'Discharge Afternoon', component: DischargeList },
  { path: "/Home/HighAntibiotic", exact: true, name: 'High Antibiotic', component: HighAntibiotic },
  { path: "/Home/SurvillenceView", exact: true, name: 'Survillence view', component: PatSurvillenceView },
  { path: "/Home/noshift", exact: true, name: "No shift", component: NoshiftReport },
  { path: '/Home/highbioticReport', exact: true, name: "HighAntiBiotic Report", component: HighAntiBioticReport },
  { path: "/Home/WeEmpMap", exact: true, name: "Employee-Ns Wise Mapping", component: EmpNsWiseMaping },
  { path: '/Home/ExtraOrderView', exact: true, name: 'Total Admission', component: ExtraOrderView },
  { path: "/Home/DashBoard/InPatientList", exact: true, name: "InPatientList View", component: InPatientList },
  { path: '/Home/DietPlannedList', exact: true, name: 'DietPlannedList View', component: DietPlannedList },
  { path: '/Home/DietPlanPending', exact: true, name: 'DietPlanPending View', component: DietPlanPending },
  { path: '/Home/RequestRegister', exact: true, name: 'Request Register', component: RequestRegister },
  { path: '/Home/Req.DepartmentApproval', exact: true, name: 'Request Departmental Approval', component: ReqDepartmentApproval },
  { path: '/Home/Req.OMApproval', exact: true, name: 'Request OM Approval', component: ReqOMApproval },
  { path: '/Home/Req.SMOApproval', exact: true, name: 'Request SMO Approval', component: ReqSMOApproval },
  { path: '/Home/Req.CAOApproval', exact: true, name: 'Request CAO/MS/COO Approval', component: ReqCAOApproval },
  { path: '/Home/Req.EDApproval', exact: true, name: 'Request ED/MD Approval', component: ReqEDApproval },
  { path: '/Home/NDRF', exact: true, name: 'NDRF Form', component: NDRFform },
]

export default routes
