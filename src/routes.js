import React from 'react'

const NotCorect = React.lazy(() => import('./views/dashboard/Home'))
const Home = React.lazy(() => import('./views/ComManagement/Dashboard/TicketManagementCmDeptMain'))
const Settings = React.lazy(() => import('../src/Menus/Settings'))
const Administrtion = React.lazy(() => import('../src/views/Administration/Test'))
const DepartmentMast = React.lazy(() => import('./views/Master/Department/DepartmentMast'))
const DepartmentSectionMast = React.lazy(() =>
  import('./views/Master/DepartmentSectionMast/DeptSectionMast')
)
const ComplaintDepartment = React.lazy(() => import('./views/Master/ComplaintDepartment/ComplaintDeptMast'))
const ComplaintRegister = React.lazy(() => import('./views/ComManagement/ComplaintRegisterMain/TicketRegisterMain'))
const UserGroupMast = React.lazy(() => import('./views/Master/UserGroupMaster/UserGroupMast'))
const ModuleMast = React.lazy(() => import('./views/Master/ModuleMaster/ModuleMaster'))
const UserGroupRights = React.lazy(() => import('./views/Master/UserGroupRight/UserGroupRight'))
const ModuleGroupMast = React.lazy(() => import('./views/Master/ModuleGroupMaster/ModuleGroupMast'))
const RequestType = React.lazy(() => import('./views/Master/RequestType/RequestTypeMast'))
const ComplaintType = React.lazy(() => import('./views/Master/ComplaintType/ComplaintTypeMast'))
const HicPolicy = React.lazy(() => import('./views/Master/HicPolicy/HicPolicyMast'))
const HoldReason = React.lazy(() => import('./views/Master/ComplaintHoldReason/HoldReasonMaster'))
const ModuleuserRight = React.lazy(() => import('./views/Master/ModuleUserRight/ModuleUserRight'))
const AssignComplaint = React.lazy(() => import('./views/ComManagement/AssignComplaint/AssignComplaintTable'))
const DepartmentAssets = React.lazy(() => import('./views/AssetManagment/DepartmentalAsset/DepartmentAssetMain'))
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
const NotificationMainMeNu = React.lazy(() => import('./views/Notification/NotificationMainMenu'))
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
const SubRoomCreation = React.lazy(() => import('./views/RoomManagement/NewSubRoomCreation/NewSubRoomMast'))
const DietMenuSetting = React.lazy(() => import('./views/Master/DietMasters/DietMenuSetting/DietMenuSetting'))
const ItemGroup = React.lazy(() => import('./views/Master/DietMasters/ItemGroup/ItemGroupMast'))
const ItemMaster = React.lazy(() => import('./views/Master/DietMasters/ItemMaster/ItemMaster'))
const DietDetail = React.lazy(() => import('./views/Master/DietMasters/DietDetail/DietDetailMast'))
const DietApproval = React.lazy(() => import('./views/NursingStation/DietApprovalList'))
const DietPlanList = React.lazy(() => import('./views/NursingStation/DietPlanList'))
const DietOrderList = React.lazy(() => import('./views/Diet/DietOrder/DietOderTaking'))
const DietExtraOrder = React.lazy(() => import('./views/Diet/DietExtraOrder/ExtraOrder'))
const DietDelivery = React.lazy(() => import('./views/Diet/DietDeliveryMark'))
const RectifyComplaint = React.lazy(() => import('./views/ComManagement/RectifyComplaint/RectifyCompalint'))
const WeWorkInpatient = React.lazy(() => import('./views/WeWork/InPatientList'))
const Reports = React.lazy(() => import('./Menus/Reports'))
const DietReport = React.lazy(() => import('./views/Report/DietReport/DietTypeWise'))
const NusrseStationReport = React.lazy(() => import('./views/Report/DietReport/NurseStationWise'))
const PatientReport = React.lazy(() => import('./views/Report/DietReport/PatientWise'))
const DirectComplaintReg = React.lazy(() =>
  import('./views/ComManagement/DirectTicketRegistrationMain/DirectTicketMainTab')
)
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
const NDRFform = React.lazy(() => import('./views/RequestManagement/NdrfFrorm/NdrfFrom'))
const HallBooking = React.lazy(() => import('./views/HallBooking/HallBookingRegister'))
const Hallmaster = React.lazy(() => import('./views/Master/HallMaster/Hallmaster'))
const HallbookingReg = React.lazy(() => import('./views/HallBooking/HallbookingReg'))
const HallBookingApproval = React.lazy(() => import('./views/HallBooking/HallBookingApproval'))
const CAoApproval = React.lazy(() => import('./views/HallBooking/CeoApproval/CeoApproval'))
const HicComplaint = React.lazy(() => import('./views/ComManagement/HICComplaintList/HicComplaintList'))
const OMTableMast = React.lazy(() => import('./views/Master/RequestManagement/OMTableMast/OMTableMast'))
const OMEmpMapping = React.lazy(() => import('./views/Master/RequestManagement/OMEmpMap/OMEmpMapMast'))
const ManualList = React.lazy(() => import('./views/Manual/ManualList'))
const ComEmpMapping = React.lazy(() => import('./views/Master/ComEMPMapping/ComEmpMapping'))
const AssetStockDetails = React.lazy(() => import('./views/AssetManagment/StockDetails/StockMain'))
const ComPriorityMast = React.lazy(() => import('./views/Master/CompPriority/ComPriorityMast'))
const AssetDashboardMain = React.lazy(() => import('./views/AssetManagment/DasboardMain/DahboardMain'))
const CmsReportDeptWise = React.lazy(() => import('./views/Report/ComplaintReport/DeptWiseReport'))
const CampusMaster = React.lazy(() => import('./views/Master/RoomMasters/CampusMaster/CampusMaster'))
const BuildingMast = React.lazy(() => import('./views/Master/RoomMasters/BuildingMast/BuildingMast'))
const BluidBlockMast = React.lazy(() => import('./views/Master/RoomMasters/BuildBlockMast/BuildBlockMast'))
const InsideBuildBlock = React.lazy(() => import('./views/Master/RoomMasters/InsideBulidBlock/InsideBuildBlockMast'))
const FloorMaster = React.lazy(() => import('./views/Master/RoomMasters/FloorMast/FloorMast'))
const RoomTypeMaster = React.lazy(() => import('./views/Master/RoomMasters/RoomTypeMaster/RoomTypeMaster'))
const RoomCategoryMaster = React.lazy(() => import('./views/Master/RoomMasters/RoomCategoryMaster/RoomCategoryMaster'))
const FloorCreation = React.lazy(() => import('./views/RoomManagement/FloorCreation/FloorCreation'))
const RoomNewCreation = React.lazy(() => import('./views/RoomManagement/RoomNewCreation/RoomCreation'))
const TeamMaster = React.lazy(() => import('./views/Master/TaskManagement/TaskTeamMaster/TeamMast'))
const CRFDataCollection = React.lazy(() => import('./views/RequestManagement/CRFDataCollection/CrfDataCollectnTable'))
const RoomDashBoard = React.lazy(() => import('./views/RoomManagement/DashBoard/DashBoardMain'))
const RequstToAssign = React.lazy(() => import('./views/Report/ComplaintReport/RequstToAssign'))
const RequestToRectify = React.lazy(() => import('./views/Report/ComplaintReport/RequestToRectifctn'))
const RequestToVerify = React.lazy(() => import('./views/Report/ComplaintReport/RequestToVerfy'))
const AssignToRectify = React.lazy(() => import('./views/Report/ComplaintReport/AssignToRectify'))
const AssignToVerify = React.lazy(() => import('./views/Report/ComplaintReport/AssignToVerify'))
const RectifyToVerify = React.lazy(() => import('./views/Report/ComplaintReport/RectfyToVerify'))
const ComplaintCategoryRprt = React.lazy(() => import('./views/Report/ComplaintReport/ComplaintCategoryWise'))
const AreaWiseCompReport = React.lazy(() => import('./views/Report/ComplaintReport/AreaWiseReport'))
const CompPerAssignee = React.lazy(() => import('./views/Report/ComplaintReport/ComplaintPerAssignee'))
const TATCompPerAssignee = React.lazy(() => import('./views/Report/ComplaintReport/TatPerComplntAssignee'))
const ItemNameCreation = React.lazy(() => import('./views/AssetManagment/ItemNameCreation/ItemNameCreation'))
const PrimaryCustodian = React.lazy(() => import('./views/Master/AssetMasters/PrimaryCustodian/PrimaryCustodianMast'))
const SecondaryCustodian = React.lazy(() => import('./views/Master/AssetMasters/SecondaryCustodian/SecondaryCustodian'))
const UnitOfMeasurement = React.lazy(() => import('./views/Master/AssetMasters/AssetUOMmasters/UomMaster'))
const AssetModel = React.lazy(() => import('./views/Master/AssetMasters/AssetModel/AssetModel'))
const AssetSubModel = React.lazy(() => import('./views/Master/AssetMasters/AssetSubModel/AssetSubModel'))
const RoomAsset = React.lazy(() => import('./views/RoomManagement/DashBoard/DashBoardRoomAsset'))
const ItemCreation = React.lazy(() => import('./views/AssetManagment/ItemOpeningEntry/OpenEntryMain'))
const DashboardBackup = React.lazy(() => import('./views/ItManagement/DashboardBackup/Newdashboard'))
const PasswordManagement = React.lazy(() => import('./views/ItManagement/PasswordManagement/PasswordManagement'))
const BackupChecks = React.lazy(() => import('./views/ItManagement/BackupChecksAndMonitoring/BackupChecks'))
const SimType = React.lazy(() => import('./views/Master/ItMasters/BillManagement/SimType/SimTypeMaster'))
const WifiManageMenT = React.lazy(() => import('./views/ItManagement/WifiManagement/WifiManageMentMains'))
const CustodianDeptmt = React.lazy(() => import('./views/Master/AssetMasters/CustodianDepartment/CustodianDeptMast'))
const AssetItemListView = React.lazy(() => import('./views/AssetManagment/AssetItemDetails/DetailMain'))
const PasswordManagementCredentialType = React.lazy(() =>
  import('./views/Master/ItMasters/passwordManagement/PasswordCredentialType')
)
const BackupScheduleType = React.lazy(() => import('./views/Master/BackupMaster/ScheduleType/ScheduleTypeMast'))
const BackupScheduleTime = React.lazy(() => import('./views/Master/BackupMaster/ScheduleTime/ScheduleTimeMast'))
const Backupmast = React.lazy(() => import('./views/Master/BackupMaster/BackupDetails/BackupMast'))
const AssetRackMast = React.lazy(() => import('./views/Master/AssetMasters/AssetRackMast/AssetRackMaster'))
const TaskManagementMainDashboard = React.lazy(() => import('./views/TaskManagement/TaskDashboard/TmDashboardMain'))
const ITSimDetails = React.lazy(() => import('./views/ItManagement/SimDetails/SimDetails'))
const AssetDepartmentTransfer = React.lazy(() => import('./views/AssetManagment/AssetTransfer/AssetTransferMain'))
const AssetItemReport = React.lazy(() => import('./views/Report/AssetReport/AllItemsReports'))
const RequestRegister = React.lazy(() => import('./views/RequestManagement/RequestRegister/ReqRegistration'))
const CRFIncharge = React.lazy(() => import('./views/RequestManagement/InchargeApproval/InchargeApprovalTable'))
const ReqDepartmentApproval = React.lazy(() => import('./views/RequestManagement/DepartmentApprovals/HodApprovalTable'))
const DMSApproval = React.lazy(() => import('./views/RequestManagement/DMSCrfApproval/DMSCrfTable'))
const CRFMSApproval = React.lazy(() => import('./views/RequestManagement/MSApproval/MSApprovalTable'))
const ReqOMApproval = React.lazy(() => import('./views/RequestManagement/OMApproval/OmApproval'))
const ReqSMOApproval = React.lazy(() => import('./views/RequestManagement/SMOApproval/SmoApproval'))
const ReqCAOApproval = React.lazy(() => import('./views/RequestManagement/CAOApproval/CAOApproval'))
const ReqEDApproval = React.lazy(() => import('./views/RequestManagement/EDApproval/EDApproval'))
const ReqMDApproval = React.lazy(() => import('./views/RequestManagement/MDApproval/MDApprovalTable'))
const NdrfPurchase = React.lazy(() => import('./views/RequestManagement/NdrfPurchase/NdrfPurchaseTable'))
const CRFDashboard = React.lazy(() => import('./views/RequestManagement/CRFDashboard/CrdDashboardMain'))
const DeptSecBasedItemReport = React.lazy(() => import('./views/Report/AssetReport/DeptSecBaseReport'))
const TaskManagementEmployeeTask = React.lazy(() => import('./views/TaskManagement/Mytask/EmpTaskDash'))
const EmergencyTypeMast = React.lazy(() =>
  import('./views/Master/RequestManagement/EmergencyTypeMast/EmergencyTypeMast')
)
const CrfNewReqRegister = React.lazy(() => import('./views/CentralRequestManagement/CRFRequestMaster/CrfRequestMaster'))
const AssetDashboardM = React.lazy(() => import('./views/AssetManagment/DashboardAsset/DashboardMainAsset'))
const CensusDptMast = React.lazy(() => import('./views/Master/QualityIndicatorMaster/CensusDeptSecMast/QualityDept'))
const QualityIndicator = React.lazy(() =>
  import('./views/Master/QualityIndicatorMaster/QualityIndicatorsList/QualityIndicators')
)
const TMdepartmentReport = React.lazy(() => import('./views/Report/TaskReport/DepartmentWise/DepartmentWiseTask'))
const TMEmployeeReport = React.lazy(() => import('./views/Report/TaskReport/EmployeeWise/EmployeeeWiseTask'))
const CRFNewIncharge = React.lazy(() => import('./views/CentralRequestManagement/CrfInchargeApproval/InchargeApproval'))
const CRFNewHOD = React.lazy(() => import('./views/CentralRequestManagement/CrfHodApproval/CrfHodApproval'))
const CRFNewDMS = React.lazy(() => import('./views/CentralRequestManagement/CrfDmsApproval/CrfDMSApproval'))
const CRFNewMS = React.lazy(() => import('./views/CentralRequestManagement/CrfMsApproval/CrfMSApproval'))
const CRFNewMO = React.lazy(() => import('./views/CentralRequestManagement/CrfMOApproval/CrfMOApprovalMain'))
const CRFNewSMO = React.lazy(() => import('./views/CentralRequestManagement/CrfSMOApproval/CrfSMOApprovalMain'))
const CRFNewGM = React.lazy(() => import('./views/CentralRequestManagement/CrfGMApproval/CrfGMApprovalMain'))
const CRFNewMD = React.lazy(() => import('./views/CentralRequestManagement/CrfMDApproval/CrfMDApprovalMain'))
const CRFNewED = React.lazy(() => import('./views/CentralRequestManagement/CrfEDApproval/CrfEDApprovalMain'))
const CRFNewDashboard = React.lazy(() => import('./views/CentralRequestManagement/CrfDashboardNew/CrfDashboardMain'))
const TaskManagementMainCreateTask = React.lazy(() =>
  import('./views/TaskManagement/AllDepartmentsTaskZ/AllDepartmentMain')
)
const DailyCensus = React.lazy(() => import('./views/DailyCensus/DailyCensusCreate/CensusCreate'))
const DailyCensusReport = React.lazy(() => import('./views/DailyCensus/DailyCensusReport/CensusReportView'))
const CrfNewDataCollection = React.lazy(() =>
  import('./views/CentralRequestManagement/CrfDatacollection/CrfDataCollectionTable')
)
const CRFNewPdfView = React.lazy(() => import('./views/CentralRequestManagement/CrfPdfView/CrfPdfViewMain'))
const CRFNewPurchase = React.lazy(() => import('./views/CentralRequestManagement/PurchaseProcess/PurchaseTablemain'))
const CRFNewCRSStore = React.lazy(() => import('./views/CentralRequestManagement/CrfStoreProcess/CrfStoreProcessMain'))
const CRFNewStore = React.lazy(() => import('./views/CentralRequestManagement/CrfSubStores/CrfSubStoreMain'))
const BillAdds = React.lazy(() => import('./views/ItManagement/BillAdd/BillDashBoardMain'))
const IncHodAuthorization = React.lazy(() => import('./views/Master/AuthorizationMaster/AuthorizationMast'))
const BillCategory = React.lazy(() => import('./views/Master/ItMasters/BillManagement/BillCategory/BillCategoryMaster'))
const BillType = React.lazy(() => import('./views/Master/ItMasters/BillManagement/BillType/BillTypeMaster'))
const BillSupplierDetailsMast = React.lazy(() =>
  import('./views/Master/ItMasters/BillManagement/SupplierDetailsMast/SupplierDetails')
)
const QIdept = React.lazy(() => import('./views/Master/QualityIndicatorMaster/QIDeptMast/QualityIndDeptMast'))
const QIPatientMarking = React.lazy(() => import('./views/QualityIndicatorNew/DepartmentWisePatientMarking'))
const Incident = React.lazy(() => import('./views/IncidentManagement/IncidentList'))
const QIMonthlyReport = React.lazy(() => import('./views/QualityIndicatorNew/MonthlyReport'))
const QIValidation = React.lazy(() => import('./views/QualityIndicatorNew/QIValidation'))
const TimeReport = React.lazy(() => import('./views/QualityIndicatorNew/InitialAssessmentTimeReport'))
const QIListType = React.lazy(() => import('./views/Master/QualityIndicatorMaster/QIListTypeMast/QIListType'))
const DayWiseQiReport = React.lazy(() => import('./views/QualityIndicatorNew/DaywiseQiReport'))
const DataTransferHRM = React.lazy(() => import('./views/Master/DataImportFrmHR/DataImportHR'))
const TaskManagementTaskLists = React.lazy(() => import('./views/TaskManagement/DepartmentTask/DepartmentMain'))
const AcceptTask = React.lazy(() => import('./views/TaskManagement/AcceptTask/AcceptTaskFromDir'))
const AmcCmcAdding = React.lazy(() => import('./views/AssetManagment/ItemDetailEnter/AmcCmcAdding'))
const QiInchargeApr = React.lazy(() => import('./views/QualityIndicatorNew/InchargeApproval'))
const QiEquipment = React.lazy(() => import('./views/Master/QualityIndicatorMaster/EquipmentMaster/EquipmentMast'))
const QiHodAprv = React.lazy(() => import('./views/QualityIndicatorNew/HODApproval'))
const CrfNoBased = React.lazy(() => import('./views/Report/CrmReport/CrfNoBasedReport'))
const UserAcknowldged = React.lazy(() => import('./views/Report/CrmReport/UserAcknldgeList'))
const QiWaitingTime = React.lazy(() => import('./views/QualityIndicatorNew/WaitingTimeReport'))
const TMOverdueCountMaster = React.lazy(() => import('./views/Master/TaskManageMaster/TaskDuedateCount'))
const TaskPerformanceSheet = React.lazy(() => import('./views/TaskManagement/PerformanceSheet/PerformanceMain'))
const TaskPerformanceSlide = React.lazy(() => import('./views/TaskManagement/PerformanceMenu/MainPerformane'))
const UserNotAcknowldged = React.lazy(() => import('./views/Report/CrmReport/UserNotAckldgedList'))
const PurchaseCRFReport = React.lazy(() => import('./views/Report/CrmReport/PurchaseReport'))
const AllCRFReport = React.lazy(() => import('./views/Report/CrmReport/AllCRFReport'))
const FeedbackForm = React.lazy(() => import('./views/FeedBack/Feedback'))
const DeptAcess = React.lazy(() => import('./views/Master/QualityIndicatorMaster/QIEmpDeptAccessMast/DeptAcessMast'))
const AssetServiceList = React.lazy(() => import('./views/AssetManagment/ServiceListSpare/SpareSErviceList'))
const AssetCondemnationList = React.lazy(() => import('./views/AssetManagment/CondemnationList/CondemnationList'))
const PmDueList = React.lazy(() => import('./views/AssetManagment/PmOverDueList/PmOverdueList'))
const AllCRFReportWithPO = React.lazy(() => import('./views/Report/CrmReport/CRFAllReportWithPO'))
const TicketDashboardz = React.lazy(() => import('./views/ComManagement/Dashboard/TicketManagementCmDeptMain'))
const ItBackupTypeMast = React.lazy(() => import('./views/Master/ItMasters/BackUpType/BackUpTypeMaster'))
const SimOperator = React.lazy(() => import('./views/Master/ItMasters/SimOperators/SimOperators'))
const AllDeptCondemList = React.lazy(() => import('./views/AssetManagment/AllDeptRegCondemList/AllDeptRegcondemMain'))
const DeliverMarking = React.lazy(() => import('./views/CentralRequestManagement/DeliveryMarking/DeliveryMarkingStore'))
const ItemChecking = React.lazy(() => import('./views/CentralRequestManagement/ItemCheckingCRS/ItemCheckingMain'))
const CrfSearch = React.lazy(() => import('./views/CentralRequestManagement/CRFSearch/CrfDetailsSearch'))
const CompanyName = React.lazy(() => import('./views/Master/RequestManagement/CompanyMaster/CompanyMast'))
const CrfBiomedical = React.lazy(() => import('./views/CentralRequestManagement/CRFBiomedicalView/CrfBiomedical'))
const ApprovalMapping = React.lazy(() =>
  import('./views/Master/RequestManagement/CRFApprovalMappingMaster/ApprovalMappingMaster')
)
const ManagingDirectorApproval = React.lazy(() =>
  import('./views/CentralRequestManagement/CrfManagingDirectorApproval/ManagingDirectorMain')
)
const ViewCategoryMaster = React.lazy(() =>
  import('./views/Master/RequestManagement/CrfViewCategoryMaster/ViewCategoryMaster')
)
const CrfView = React.lazy(() => import('./views/CentralRequestManagement/CRFview/CrfView'))
const CrfStoreMaster = React.lazy(() => import('./views/Master/RequestManagement/StoreMaster/StoreMaster'))
const CrfCommon = React.lazy(() => import('./views/Master/RequestManagement/CrfCommon/CrfCommonMaster'))
const CrfDashboardMaster = React.lazy(() => import('./views/Master/RequestManagement/DashboardMaster/DashboardMaster'))
const DataCollectionMaster = React.lazy(() =>
  import('./views/Master/RequestManagement/DataCollectionMaster/DataCollection')
)
const DepartmentMapping = React.lazy(() =>
  import('./views/Master/RequestManagement/DepartmentMapping/DepartmentMaping')
)
const AmsMaster = React.lazy(() => import('./views/Master/AmsMaster/AmsMaster'))
const AmsPatientDetails = React.lazy(() => import('./views/Ams/AmsMain'))
const DcReport = React.lazy(() => import('./views/Report/DailyCensus/DailyCensus'))
const StaticUrl = React.lazy(() => import('./views/Master/StaticUrl/StaticUrl'))
const MelioraDepMaster = React.lazy(() => import('./views/Master/MelioraDepMaster/MelioraDepMaster'))
const MelioraDepSecMaster = React.lazy(() => import('./views/Master/MelioraDepSecMaster/MelioraDepSecMaster'))

// Incident Management ( rohith krishna)
// const IncidentRegistration = React.lazy(() => import('./views/IncidentManagement/NewIncidentRegistration'));
const IncidentDashboard = React.lazy(() => import('./views/IncidentManagement/IncidentDashboard'));
const IncidentRegistrationFinal = React.lazy(() => import('./views/IncidentManagement/IncidentRegistrationFinal'));
const IncidentApprovals = React.lazy(() => import('./views/IncidentManagement/IncidentApprovals'))



// const routes = [
//   { path: '/', exact: true, name: 'Home' },
//   { path: '/NotCorect', exact: true, name: 'NotCorect', component: NotCorect },
//   { path: '/Home', exact: true, name: 'Home', component: Home },
//   { path: '/Home/Settings', exact: true, name: 'Settings', component: Settings },
//   { path: '/Home/Administration', exact: true, name: 'Administator', component: Administrtion },
//   { path: '/Home/Department', exact: true, name: 'Department Mast', component: DepartmentMast },
//   { path: '/Home/DepartmentSection', exact: true, name: 'Department Mast', component: DepartmentSectionMast },
//   { path: '/Home/ComplaintDepartment', exact: true, name: 'Complaint Department', component: ComplaintDepartment },
//   { path: '/Home/ComplaintRegister', exact: true, name: 'Complaint Register', component: ComplaintRegister },
//   { path: '/Home/Group', exact: true, name: 'User Group Master', component: UserGroupMast },
//   { path: '/Home/ModuleMast', name: 'Module Master', component: ModuleMast },
//   { path: '/Home/UserGroupRight', exact: true, name: 'User Group Rights', component: UserGroupRights },
//   { path: '/Home/ModuleGroupMast', exact: true, name: 'Module group Master', component: ModuleGroupMast },
//   { path: '/Home/RequestType', exact: true, name: 'Request Type', component: RequestType },
//   { path: '/Home/ComplaintType', exact: true, name: 'Complaint Type', component: ComplaintType },
//   { path: '/Home/HicPolicy', exact: true, name: 'Hic Policy', component: HicPolicy },
//   { path: '/Home/holdReasonsinTicket', exact: true, name: 'hold Reasons in Ticket', component: holdReason },
//   { path: '/Home/ModuleUserRight', exact: true, name: 'Module User Right', component: moduleuserRight },
//   { path: '/Home/AssignComplaint', exact: true, name: 'Assign Complaint', component: assignComplaint },
//   { path: '/Home/DepartmentAssets', exact: true, name: 'Compliant List', component: DepartmentAssets },
//   { path: '/Home/AssetType', exact: true, name: 'Asset Type', component: AssetType },
//   { path: '/Home/ItemType', exact: true, name: 'Item Type', component: ItemType },
//   { path: '/Home/ItemCategory', exact: true, name: 'Item Category', component: ItemCategory },
//   { path: '/Home/SubCategory', exact: true, name: 'Sub Category', component: SubCategory },
//   { path: '/Home/AssetGroup', exact: true, name: 'Group', component: AssetGroup },
//   { path: '/Home/SubGroup', exact: true, name: 'SubGroup', component: SubGroup },
//   { path: '/Home/Manufacture', exact: true, name: 'Manufacture', component: Manufacture },
//   { path: '/Home/Building', exact: true, name: 'Building', component: Building },
//   { path: '/Home/Floor', exact: true, name: 'Floor', component: Floor },
//   { path: '/Home/RoomType', exact: true, name: 'RoomType', component: RoomType },
//   { path: '/Home/RoomCategory', exact: true, name: 'RoomCategory', component: RoomCategory },
//   { path: '/Home/NotificationMainMeNu', exact: true, name: 'NotificationMainMeNu', component: NotificationMainMeNu },
//   { path: '/Home/NursingStation', exact: true, name: 'NursingStation', component: NursingStation },
//   { path: '/Home/Diet', exact: true, name: 'DietCategory', component: DietCategory },
//   { path: '/Home/DietIssue', exact: true, name: 'DietIssue', component: DietIssue },
//   { path: '/Home/DietType', exact: true, name: 'DietType', component: DietType },
//   { path: '/Home/RateList', exact: true, name: 'RateList', component: RateList },
//   { path: '/Home/InpatientList', exact: true, name: 'In-Patient List', component: InpatientList },
//   { path: '/Home/DietProcess', exact: true, name: 'Diet Process', component: DietProcess },
//   { path: '/Home/UserCreation', exact: true, name: 'User Creation', component: UserCreation },
//   { path: '/Home/UserCreationTable', exact: true, name: 'User Creation Table', component: UserCreationTable },
//   { path: '/Home/RoomCreation', exact: true, name: 'Room Creation', component: RoomCreation },
//   { path: '/Home/SubRoomCreation', exact: true, name: ' Sub Room Creation', component: SubRoomCreation },
//   { path: '/Home/DietMenuSetting', exact: true, name: 'Diet Plan', component: DietMenuSetting },
//   { path: '/Home/ItemGroup', exact: true, name: 'Item Group', component: ItemGroup },
//   { path: '/Home/ItemMaster', exact: true, name: ' Item Master', component: ItemMaster },
//   { path: '/Home/DietDetail', exact: true, name: 'Diet Detail', component: DietDetail },
//   { path: '/Home/DietApproval', exact: true, name: ' Diet Approval', component: DietApproval },
//   { path: '/Home/DietPlanList', exact: true, name: ' Diet Approval', component: DietPlanList },
//   { path: '/Home/DietOrderList', exact: true, name: ' Diet Order List', component: DietOrderList },
//   { path: '/Home/DietExtraOrder', exact: true, name: ' Diet Extra Order', component: DietExtraOrder },
//   { path: '/Home/DietDelivery', exact: true, name: ' Diet Delivery', component: DietDelivery },
//   { path: '/Home/RectifyComplaint', exact: true, name: 'Rectify Complaint', component: RectifyComplaint },
//   { path: '/Home/WeWork/InpatientList', exact: true, name: 'WeWork Inpatient', component: WeWorkInpatient },
//   { path: '/Home/Reports', exact: true, name: 'Reports', component: Reports },
//   { path: '/Home/Report/Diet', exact: true, name: 'Diet Report', component: DietReport },
//   { path: '/Home/Report/NurseStation', exact: true, name: 'Nuse Station Wise Report', component: NusrseStationReport },
//   { path: '/Home/Report/Pateintwise', exact: true, name: 'Pateint wise Report', component: PatientReport },
//   { path: '/Home/DirectComplaint', exact: true, name: 'Direct Complaint Register', component: DirectComplaintReg },
//   { path: '/Home/Report/Monthly', exact: true, name: 'Monthly Report', component: MonthlyReport },
//   { path: '/Home/totaladmission', exact: true, name: 'Total Admission', component: TotalAdmisson },
//   { path: '/Home/ExtraOrderView', exact: true, name: 'Total Admission', component: ExtraOrderView },
//   { path: '/Home/EscalationTime', exact: true, name: 'Escalation Time', component: EscalationTime },
//   { path: '/Home/EscalationLevel1', exact: true, name: 'EscalationLevel1', component: EscalationLevel1 },
//   { path: '/Home/EscalationLevel2', exact: true, name: 'EscalationLevel2', component: EscalationLevel2 },
//   { path: '/Home/EscalationLevel3', exact: true, name: 'EscalationLevel3', component: EscalationLevel3 },
//   { path: '/Home/EscalationLevel4', exact: true, name: 'EscalationLevel4', component: EscalationLevel4 },
//   { path: '/Home/TopLevelED', exact: true, name: 'TopLevelED', component: TopLevelED },
//   { path: '/Home/EscalationMapping', exact: true, name: 'EscalationMapping', component: EscalationMapping },
//   { path: '/Home/PendingOnholdComplaint', exact: true, name: 'Pending Onhold List', component: PendingOnholdList },
//   { path: '/Home/TotalDeptWiseList', exact: true, name: 'Total Comp Dept Wise List', component: TotalDeptWiseList },
//   { path: '/Home/PendingDeptWiseList', exact: true, name: 'Pending For Assign Comp Dept Wise List', component: PendingDeptWiseList },
//   { path: '/Home/AssignDeptWiseList', exact: true, name: 'Assign Comp Dept Wise List', component: AssignDeptWiseList },
//   { path: '/Home/VerifyDeptWiseList', exact: true, name: 'Verify Comp Dept Wise List', component: VerifyDeptWiseList },
//   { path: '/Home/OnHoldPendingDeptWiseList', exact: true, name: 'Onhold Comp Dept Wise List', component: OnHoldPendingDeptWiseList },
//   { path: '/Home/AssignEmpWiseList', exact: true, name: 'Assign Comp Emp Wise List', component: AssignEmpWiseList },
//   { path: '/Home/VerifyEmpWiseList', exact: true, name: 'verify Comp Emp Wise List', component: VerifyEmpWiseList },
//   { path: '/Home/OnHoldPendingEmpWiseList', exact: true, name: 'Onhold Comp Emp Wise List', component: OnHoldPendingEmpWiseList },
//   { path: '/Home/damaList', exact: true, name: "Dama count", component: DamaCount },
//   { path: '/Home/BhrcList', exact: true, name: "Bhrc List", component: BhrcCount },
//   { path: '/Home/roundsAfternoon', exact: true, name: "Rounds Afternoon", component: RoundsAfternoonList },
//   { path: "/Home/disafternoonList", exact: true, name: 'Discharge Afternoon', component: DischargeList },
//   { path: "/Home/HighAntibiotic", exact: true, name: 'High Antibiotic', component: HighAntibiotic },
//   { path: "/Home/SurvillenceView", exact: true, name: 'Survillence view', component: PatSurvillenceView },
//   { path: "/Home/noshift", exact: true, name: "No shift", component: NoshiftReport },
//   { path: '/Home/highbioticReport', exact: true, name: "HighAntiBiotic Report", component: HighAntiBioticReport },
//   { path: "/Home/WeEmpMap", exact: true, name: "Employee-Ns Wise Mapping", component: EmpNsWiseMaping },
//   { path: '/Home/ExtraOrderView', exact: true, name: 'Total Admission', component: ExtraOrderView },
//   { path: "/Home/DashBoard/InPatientList", exact: true, name: "InPatientList View", component: InPatientList },
//   { path: '/Home/DietPlannedList', exact: true, name: 'DietPlannedList View', component: DietPlannedList },
//   { path: '/Home/DietPlanPending', exact: true, name: 'DietPlanPending View', component: DietPlanPending },
//   { path: '/Home/NDRF', exact: true, name: 'NDRF Form', component: NDRFform },
//   { path: '/Home/HallBooking', exact: true, name: 'Hall Booking', component: HallBooking },
//   { path: '/Home/Hallmaster', exact: true, name: "Hall master", component: Hallmaster },
//   { path: '/Home/HallbookingReg', exact: true, name: "HallbookingReg", component: HallbookingReg },
//   { path: '/Home/HallbookingApproval', exact: true, name: "HallBookingApproval", component: HallBookingApproval },
//   { path: '/Home/HallCeoApproval', exact: true, name: 'CAoApproval', component: CAoApproval },
//   { path: '/Home/Hic/Complaint', exact: true, name: 'HIC Complaint List', component: HicComplaint },
//   { path: '/Home/OMTableMast', exact: true, name: 'OM Table Master', component: OMTableMast },
//   { path: '/Home/OMEmpMapping', exact: true, name: 'OM Emp Mapping', component: OMEmpMapping },
//   { path: '/Home/Manual', exact: true, name: 'Manual List', component: ManualList },
//   { path: '/Home/ComplaintEmpMap', exact: true, name: 'Compalint EMP Mapping', component: ComEmpMapping },
//   { path: '/Home/AssetStockDetails', exact: true, name: 'Asset Stock Details', component: AssetStockDetails },
//   { path: '/Home/CompPriority', exact: true, name: 'Compalint Priority Master', component: ComPriorityMast },
//   { path: '/Home/AssetDashboardMain', exact: true, name: 'Registred Compalint List', component: AssetDashboardMain },
//   { path: '/Home/CmsReportDeptWise', exact: true, name: 'Registred Compalint List', component: CmsReportDeptWise },
//   { path: '/Home/Campus', exact: true, name: 'Campus master', component: CampusMaster },
//   { path: '/Home/BuildingMast', exact: true, name: 'Building master', component: BuildingMast },
//   { path: '/Home/BuildingBlockMaster', exact: true, name: 'Building block Master', component: BluidBlockMast },
//   { path: '/Home/InsideBuilding', exact: true, name: 'Inside Building block', component: InsideBuildBlock },
//   { path: '/Home/FloorMast', exact: true, name: ' Floor Master', component: FloorMaster },
//   { path: '/Home/RoomTypeMaster', exact: true, name: 'Room Type Master', component: RoomTypeMaster },
//   { path: '/Home/RoomCategoryMaster', exact: true, name: 'Room Category Master', component: RoomCategoryMaster },
//   { path: '/Home/FloorCreation', exact: true, name: 'Floor Creation', component: FloorCreation },
//   { path: '/Home/RoomCreationSideNav', exact: true, name: 'Room New Creation', component: RoomNewCreation },
//   { path: '/Home/TeamMaster', exact: true, name: 'Team Master', component: TeamMaster },
//   { path: '/Home/DMSApproval', exact: true, name: 'DMS Approval', component: DMSApproval },
//   { path: '/Home/CrfDataCollection', exact: true, name: 'CRF data Collection', component: CRFDataCollection },
//   { path: '/Home/RoomDashBoard', exact: true, name: 'Room Dashboard', component: RoomDashBoard },
//   { path: '/Home/RequstToAssign', exact: true, name: 'Request To Assign Report', component: RequstToAssign },
//   { path: '/Home/RequestToRectify', exact: true, name: 'Request To Rectification Report', component: RequestToRectify },
//   { path: '/Home/RequestToVerify', exact: true, name: 'Request To Verification Report', component: RequestToVerify },
//   { path: '/Home/AssignToRectify', exact: true, name: 'Assign To Rectification Report', component: AssignToRectify },
//   { path: '/Home/AssignToVerify', exact: true, name: 'Assign To Verification Report', component: AssignToVerify },
//   { path: '/Home/RectifyToVerify', exact: true, name: 'Rectification To Verification Report', component: RectifyToVerify },
//   { path: '/Home/ComplaintCategoryReport', exact: true, name: 'Complaint Category Report', component: ComplaintCategoryRprt },
//   { path: '/Home/AreaWiseReport', exact: true, name: 'Area Wise Compalint Report', component: AreaWiseCompReport },
//   { path: '/Home/ComplaintAssignee', exact: true, name: 'No Of Complaint per Assignee Report', component: CompPerAssignee },
//   { path: '/Home/TatPerAssignee', exact: true, name: 'TAT per Complaint per Assignee Report', component: TATCompPerAssignee },
//   { path: '/Home/ItemNameCreation', exact: true, name: 'Item Name Creation', component: ItemNameCreation },
//   { path: '/Home/PrimaryCustodian', exact: true, name: 'Primary Custodian', component: PrimaryCustodian },
//   { path: '/Home/SecondaryCustodian', exact: true, name: ' Secondary Custodian', component: SecondaryCustodian },
//   { path: '/Home/UnitOfMeasurement', exact: true, name: 'Unit Of Measurement', component: UnitOfMeasurement },
//   { path: '/Home/AssetModel', exact: true, name: 'Asset Model', component: AssetModel },
//   { path: '/Home/AssetSubModel', exact: true, name: 'Asset SubModel', component: AssetSubModel },
//   { path: '/Home/RoomAsset', exact: true, name: 'Room Asset', component: RoomAsset },
//   { path: '/Home/ItemCreation', exact: true, name: 'item Creation', component: ItemCreation },
//   { path: '/Home/DashboardBackup', exact: true, name: 'Dashboard Backup', component: DashboardBackup },
//   { path: '/Home/PasswordManagement', exact: true, name: 'Password Management', component: PasswordManagement },
//   { path: '/Home/BackupChecks', exact: true, name: 'Backup Checks & Monitoring', component: BackupChecks },
//   { path: '/Home/SimType', exact: true, name: 'Device Type', component: SimType },
//   { path: '/Home/WifiManageMenT', exact: true, name: 'Wifi Management', component: WifiManageMenT },
//   { path: '/Home/CusodianDepartment', exact: true, name: 'Custodian Department', component: CustodianDeptmt },
//   { path: '/Home/AssetItemListView', exact: true, name: 'Asset Item List View', component: AssetItemListView },
//   { path: '/Home/ScheduleType', exact: true, name: 'Backup Schedule Type', component: BackupScheduleType },
//   { path: '/Home/ScheduleTime', exact: true, name: 'Backup Schedule Time', component: BackupScheduleTime },
//   { path: '/Home/BackupMast', exact: true, name: 'Backup Details', component: Backupmast },
//   { path: '/Home/CredentialType', exact: true, name: 'Credential Type', component: PasswordManagementCredentialType },
//   { path: '/Home/AssetRackMast', exact: true, name: 'Asset Rack Master', component: AssetRackMast },
//   { path: '/Home/TaskManagementDashboard', exact: true, name: 'TaskManagement Dashboard', component: TaskManagementMainDashboard },
//   { path: '/Home/TaskManagementCreateTask', exact: true, name: 'TaskManagement Create Task', component: TaskManagementMainCreateTask },
//   { path: '/Home/ItSimdetails', exact: true, name: 'It Sim Details', component: ITSimDetails },
//   { path: '/Home/AssetDeptTransfer', exact: true, name: 'Asset Department Transfer', component: AssetDepartmentTransfer },
//   { path: '/Home/AssetItemReport', exact: true, name: 'Asset Item Report', component: AssetItemReport },
//   { path: '/Home/RequestRegister', exact: true, name: 'Request Register', component: RequestRegister },
//   { path: '/Home/CRFInchargeApproval', exact: true, name: 'CRF Incharge Approval', component: CRFIncharge },
//   { path: '/Home/Req.DepartmentApproval', exact: true, name: 'Request Departmental Approval', component: ReqDepartmentApproval },
//   { path: '/Home/DMSApproval', exact: true, name: 'DMS Approval', component: DMSApproval },
//   { path: '/Home/CrfMSApproval', exact: true, name: 'CRF MS Approval', component: CRFMSApproval },
//   { path: '/Home/Req.OMApproval', exact: true, name: 'Request OM Approval', component: ReqOMApproval },
//   { path: '/Home/Req.SMOApproval', exact: true, name: 'Request SMO Approval', component: ReqSMOApproval },
//   { path: '/Home/Req.CAOApproval', exact: true, name: 'Request CAO/MS/COO Approval', component: ReqCAOApproval },
//   { path: '/Home/Req.EDApproval', exact: true, name: 'Request ED Approval', component: ReqEDApproval },
//   { path: '/Home/Req.MDApproval', exact: true, name: 'Request MD Approval', component: ReqMDApproval },
//   { path: '/Home/NdrfPurchase', exact: true, name: 'Request Purchase', component: NdrfPurchase },
//   { path: '/Home/CrfDashboard', exact: true, name: 'CRF Dashboard', component: CRFDashboard },
//   { path: '/Home/DeptSecBasedItemReport', exact: true, name: 'Department Section Based Item Report', component: DeptSecBasedItemReport },
//   { path: '/Home/TaskManagementEmployeeTask', exact: true, name: 'TaskManagement Employee Task', component: TaskManagementEmployeeTask },
//   { path: '/Home/EmergencyType', exact: true, name: 'Emmergency Type Master', component: EmergencyTypeMast },
//   { path: '/Home/CrfNewRequestRegister', exact: true, name: 'CRF Nw Request Register', component: CrfNewReqRegister },
//   { path: '/Home/AssetDashboardM', exact: true, name: 'Asset Inter Departme', component: AssetDashboardM },
//   { path: '/Home/CensusDept', excat: true, name: 'Daily Census Department Section', component: CensusDptMast },
//   { path: '/Home/QualityIndicator', exact: true, name: 'Quality Indicator List', component: QualityIndicator },
//   { path: '/Home/TMdepartmentReport', exact: true, name: 'TM department Report', component: TMdepartmentReport },
//   { path: '/Home/TMEmployeeReport', exact: true, name: 'TM employee Report', component: TMEmployeeReport },
//   { path: '/Home/TaskManagementTaskLists', exact: true, name: 'TaskManagement TaskList', component: TaskManagementTaskLists },
//   { path: '/Home/DailyCensus', exact: true, name: 'Daily Census Entry', component: DailyCensus },
//   { path: '/Home/DailyCensusReport', exact: true, name: 'Daily Census Report', component: DailyCensusReport },
//   { path: '/Home/CRFNewInchargeApproval', exact: true, name: 'Incharge Approval', component: CRFNewIncharge },
//   { path: '/Home/CRFNewHODApproval', exact: true, name: 'HOD Approval', component: CRFNewHOD },
//   { path: '/Home/CRFNewDMSApproval', exact: true, name: 'DMS Approval', component: CRFNewDMS },
//   { path: '/Home/CRFNewMSApproval', exact: true, name: 'MS Approval', component: CRFNewMS },
//   { path: '/Home/CRFNewOMApproval', exact: true, name: 'CRF Documentation', component: CRFNewMO },
//   { path: '/Home/CRFNewSMOApproval', exact: true, name: 'CRF Verification', component: CRFNewSMO },
//   { path: '/Home/CRFNewGMApproval', exact: true, name: 'GM Operations Approval', component: CRFNewGM },
//   { path: '/Home/CRFNewMDApproval', exact: true, name: 'MD Approval', component: CRFNewMD },
//   { path: '/Home/CRFNewEDApproval', exact: true, name: 'ED Approval', component: CRFNewED },
//   { path: '/Home/CrfNewDashBoard', exact: true, name: 'CRF Dashboard', component: CRFNewDashboard },
//   { path: '/Home/CrfNewDataCollection', exact: true, name: 'CRF Data Collection', component: CrfNewDataCollection },
//   { path: '/Home/CRFNewPdfView', exact: true, name: 'CRF New PDF View', component: CRFNewPdfView },
//   { path: '/Home/CRFNewPurchase', exact: true, name: 'CRF New Purchase', component: CRFNewPurchase },
//   { path: '/Home/CRFNewCRSStore', exact: true, name: 'CRF New CRS Store', component: CRFNewCRSStore },
//   { path: '/Home/CRFNewStore', exact: true, name: 'CRF New Store', component: CRFNewStore },
//   { path: '/Home/Authorization', exact: true, name: 'Incharge/HOD Authorization', component: IncHodAuthorization },
//   { path: '/Home/BillAdds', exact: true, name: 'Bill Adds', component: BillAdds },
//   { path: '/Home/BillCategory', exact: true, name: 'Bill Category', component: BillCategory },
//   { path: '/Home/BillType', exact: true, name: 'Bill Type', component: BillType },
//   { path: '/Home/BillSupplierDetailsMast', exact: true, name: 'Bill Supplier Details Mast', component: BillSupplierDetailsMast },
//   { path: '/Home/QIDeptMast', exact: true, name: 'Quality Department Mast', component: QIdept },
//   { path: '/Home/QIPatientMarking', exact: true, name: 'Dept Wise Patient Marking', component: QIPatientMarking },
//   { path: '/Home/AcceptTask', exact: true, name: 'TaskManagement AcceptTask', component: AcceptTask },
//   { path: '/Home/IncidentList', exact: true, name: 'Incident List View', component: Incident },
//   { path: '/Home/QIMonthlyReport', exact: true, name: 'QI Monthly Report', component: QIMonthlyReport },
//   { path: '/Home/QIValidation', exact: true, name: 'QI Validation', component: QIValidation },
//   { path: '/Home/TimeReport', exact: true, name: 'Initial Assessment Time Report', component: TimeReport },
//   { path: '/Home/QiListType', exact: true, name: 'QI List Type Mast', component: QIListType },
//   { path: '/Home/DayWiseReport', exact: true, name: 'Day Wise QI Report', component: DayWiseQiReport },
//   { path: '/Home/DataTransferHRM', exact: true, name: 'Data Transfer from HR', component: DataTransferHRM },
//   { path: '/Home/AmcCmcAdding', exact: true, name: 'AMC CMC Adding', component: AmcCmcAdding },
//   { path: '/Home/QiIncharge', exact: true, name: 'Level I Approval', component: QiInchargeApr },
//   { path: '/Home/QIEquipment', exact: true, name: 'Quality Equipment Mast', component: QiEquipment },
//   { path: '/Home/QiHOD', exact: true, name: 'Level II Approval', component: QiHodAprv },
//   { path: '/Home/CrfNoBased', exact: true, name: 'CRF No Based', component: CrfNoBased },
//   { path: '/Home/userAckldged', exact: true, name: 'User Acknowledged CRF', component: UserAcknowldged },
//   { path: '/Home/WaitingReport', exact: true, name: 'Waiting Time For Service Diagnostics', component: qiWaitingTime },
//   { path: '/Home/TMOverdueCountMaster', exact: true, name: 'TM Overdue Count Master', component: TMOverdueCountMaster },
//   { path: '/Home/TaskPerformanceSheet', exact: true, name: 'Task Performance Sheet', component: TaskPerformanceSheet },
//   { path: '/Home/TaskPerformanceSlide', exact: true, name: 'Task Performance Slide', component: TaskPerformanceSlide },
//   { path: '/Home/userNotAckldged', exact: true, name: 'User Not Acknowledged CRF', component: UserNotAcknowldged },
//   { path: '/Home/purchaseCRFReport', exact: true, name: 'Purchase CRF Report', component: PurchaseCRFReport },
//   { path: '/Home/AllCRFReport', exact: true, name: 'All CRF Report', component: AllCRFReport },
//   { path: '/Home/feedback', exact: true, name: 'Feedback', component: feedbackForm },
//   { path: '/Home/QIdeptAccess', exact: true, name: 'QI Department Access Mast', component: deptAcess },
//   { path: '/Home/AssetServiceList', exact: true, name: 'Spare Service List', component: AssetServiceList },
//   { path: '/Home/AssetCondemnationList', exact: true, name: 'Spare Condemnation List', component: AssetCondemnationList },
//   { path: '/Home/PmDueList', exact: true, name: 'PM Due List in Asset', component: PmDueList },
//   { path: '/Home/DeliveryMarking', exact: true, name: 'CRS Delivery Marking', component: deliverMarking },
//   { path: '/Home/ItemChecking', exact: true, name: 'Item Checking', component: itemChecking },
//   { path: '/Home/SearchCrfDetails', exact: true, name: 'CRF Search', component: crfSearch },
//   { path: '/Home/CompanyMast', exact: true, name: 'Company Master', component: companyName },
//   { path: '/Home/CrfBiomedical', exact: true, name: 'CRF Biomedical View', component: crfBiomedical },
//   { path: '/Home/ApprovalMapping', exact: true, name: 'CRF Approval Mapping Master', component: approvalMapping },
//   { path: '/Home/CRFNewManagingDirector', exact: true, name: 'Managing Director Approval', component: managingDirectorApproval },
//   { path: '/Home/ViewCategoryMaster', exact: true, name: 'MenuView Category Master', component: ViewCategoryMaster },
//   { path: '/Home/CrfView', exact: true, name: 'Crf View', component: CrfView },
//   { path: '/Home/CrfStoreMaster', exact: true, name: 'Crf StoreMaster', component: CrfStoreMaster },
//   { path: '/Home/CrfCommon', exact: true, name: 'Crf Common Master', component: CrfCommon },
//   { path: '/Home/AllCRFReportWithPO', exact: true, name: 'All CRF Report With PO', component: AllCRFReportWithPO },
//   { path: '/Home/TicketDashboards', exact: true, name: 'Ticket Dashboards', component: TicketDashboardz },
//   { path: '/Home/AllDeptCondemList', exact: true, name: 'AllDeptCondemList', component: AllDeptCondemList },
//   { path: '/Home/ItBackupTypeMast', exact: true, name: 'ItBackupTypeMast', component: ItBackupTypeMast },
//   { path: '/Home/SimOperator', exact: true, name: 'SimOperator', component: SimOperator },
//   { path: '/Home/DashBoardMaster', exact: true, name: 'DashBoardMaster', component: CrfDashboardMaster },
//   { path: '/Home/DataCollectionMaster', exact: true, name: 'DataCollectionMaster', component: DataCollectionMaster },
//   { path: '/Home/DepartmentMapping', exact: true, name: 'DashBoardMaster', component: DepartmentMapping },
//   { path: '/Home/AmsMaster', exact: true, name: 'AmsMaster', component: AmsMaster },
//   { path: '/Home/AmsPatientDetails', exact: true, name: 'Ams Patient Details', component: AmsPatientDetails },
//   { path: '/Home/DcReport', exact: true, name: 'DcReport', component: DcReport },

// ]

const routes = [
  { path: '', element: <Home /> },
  { path: 'NotCorect', name: 'NotCorect', element: <NotCorect /> },
  { path: 'Home', name: 'Home', element: <Home /> },
  { path: 'Settings', name: 'Settings', element: <Settings /> },
  { path: 'Administration', name: 'Administator', element: <Administrtion /> },
  { path: 'Department', name: 'Department Mast', element: <DepartmentMast /> },
  { path: 'ComplaintDepartment', name: 'Complaint Department', element: <ComplaintDepartment /> },
  { path: 'ComplaintRegister', name: 'Complaint Register', element: <ComplaintRegister /> },
  { path: 'Group', name: 'User Group Master', element: <UserGroupMast /> },
  { path: 'ModuleMast', name: 'Module Master', element: <ModuleMast /> },
  { path: 'UserGroupRight', name: 'User Group Rights', element: <UserGroupRights /> },
  { path: 'ModuleGroupMast', name: 'Module group Master', element: <ModuleGroupMast /> },
  { path: 'RequestType', name: 'Request Type', element: <RequestType /> },
  { path: 'ComplaintType', name: 'Complaint Type', element: <ComplaintType /> },
  { path: 'HicPolicy', name: 'Hic Policy', element: <HicPolicy /> },
  { path: 'holdReasonsinTicket', name: 'Hold Reasons in Ticket', element: <HoldReason /> },
  { path: 'ModuleUserRight', name: 'Module User Right', element: <ModuleuserRight /> },
  { path: 'AssignComplaint', name: 'Assign Complaint', element: <AssignComplaint /> },
  { path: 'DepartmentAssets', name: 'Complaint List', element: <DepartmentAssets /> },
  { path: 'AssetType', name: 'Asset Type', element: <AssetType /> },
  { path: 'ItemType', name: 'Item Type', element: <ItemType /> },
  { path: 'ItemCategory', name: 'Item Category', element: <ItemCategory /> },
  { path: 'SubCategory', name: 'Sub Category', element: <SubCategory /> },
  { path: 'AssetGroup', name: 'Group', element: <AssetGroup /> },
  { path: 'SubGroup', name: 'SubGroup', element: <SubGroup /> },
  { path: 'Manufacture', name: 'Manufacture', element: <Manufacture /> },
  { path: 'Building', name: 'Building', element: <Building /> },
  { path: 'Floor', name: 'Floor', element: <Floor /> },
  { path: 'RoomType', name: 'Room Type', element: <RoomType /> },
  { path: 'RoomCategory', name: 'Room Category', element: <RoomCategory /> },
  {
    path: 'NotificationMainMeNu',
    name: 'Notification Main Menu',
    element: <NotificationMainMeNu />
  },
  { path: 'NursingStation', name: 'Nursing Station', element: <NursingStation /> },
  { path: 'Diet', name: 'Diet Category', element: <DietCategory /> },
  { path: 'DietIssue', name: 'Diet Issue', element: <DietIssue /> },
  { path: 'DietType', name: 'Diet Type', element: <DietType /> },
  { path: 'RateList', name: 'Rate List', element: <RateList /> },
  { path: 'InpatientList', name: 'In-Patient List', element: <InpatientList /> },
  { path: 'DietProcess', name: 'Diet Process', element: <DietProcess /> },
  { path: 'UserCreation', name: 'User Creation', element: <UserCreation /> },
  { path: 'UserCreationTable', name: 'User Creation Table', element: <UserCreationTable /> },
  { path: 'RoomCreation', name: 'Room Creation', element: <RoomCreation /> },
  { path: 'SubRoomCreation', name: 'Sub Room Creation', element: <SubRoomCreation /> },
  { path: 'DietMenuSetting', name: 'Diet Plan', element: <DietMenuSetting /> },
  { path: 'ItemGroup', name: 'Item Group', element: <ItemGroup /> },
  { path: 'ItemMaster', name: 'Item Master', element: <ItemMaster /> },
  { path: 'DietDetail', name: 'Diet Detail', element: <DietDetail /> },
  { path: 'DietApproval', name: 'Diet Approval', element: <DietApproval /> },
  { path: 'DietPlanList', name: 'Diet Plan List', element: <DietPlanList /> },
  { path: 'DietOrderList', name: 'Diet Order List', element: <DietOrderList /> },
  { path: 'DietExtraOrder', name: 'Diet Extra Order', element: <DietExtraOrder /> },
  { path: 'DietDelivery', name: 'Diet Delivery', element: <DietDelivery /> },
  { path: 'RectifyComplaint', name: 'Rectify Complaint', element: <RectifyComplaint /> },
  { path: 'WeWork/InpatientList', name: 'WeWork Inpatient', element: <WeWorkInpatient /> },
  { path: 'Reports', name: 'Reports', element: <Reports /> },
  { path: 'Report/Diet', name: 'Diet Report', element: <DietReport /> },
  {
    path: 'Report/NurseStation',
    name: 'Nurse Station Wise Report',
    element: <NusrseStationReport />
  },
  { path: 'Report/Patientwise', name: 'Patient Wise Report', element: <PatientReport /> },
  { path: 'DirectComplaint', name: 'Direct Complaint Register', element: <DirectComplaintReg /> },
  { path: 'Report/Monthly', name: 'Monthly Report', element: <MonthlyReport /> },
  { path: 'totaladmission', name: 'Total Admission', element: <TotalAdmisson /> },
  { path: 'ExtraOrderView', name: 'Extra Order View', element: <ExtraOrderView /> },
  { path: 'EscalationTime', name: 'Escalation Time', element: <EscalationTime /> },
  { path: 'EscalationLevel1', name: 'Escalation Level 1', element: <EscalationLevel1 /> },
  { path: 'EscalationLevel2', name: 'Escalation Level 2', element: <EscalationLevel2 /> },
  { path: 'EscalationLevel3', name: 'Escalation Level 3', element: <EscalationLevel3 /> },
  { path: 'EscalationLevel4', name: 'Escalation Level 4', element: <EscalationLevel4 /> },
  { path: 'TopLevelED', name: 'Top Level ED', element: <TopLevelED /> },
  { path: 'EscalationMapping', name: 'Escalation Mapping', element: <EscalationMapping /> },
  { path: 'PendingOnholdComplaint', name: 'Pending Onhold List', element: <PendingOnholdList /> },
  { path: 'TotalDeptWiseList', name: 'Total Comp Dept Wise List', element: <TotalDeptWiseList /> },
  {
    path: 'PendingDeptWiseList',
    name: 'Pending For Assign Comp Dept Wise List',
    element: <PendingDeptWiseList />
  },
  {
    path: 'AssignDeptWiseList',
    name: 'Assign Comp Dept Wise List',
    element: <AssignDeptWiseList />
  },
  {
    path: 'VerifyDeptWiseList',
    name: 'Verify Comp Dept Wise List',
    element: <VerifyDeptWiseList />
  },
  {
    path: 'OnHoldPendingDeptWiseList',
    name: 'Onhold Comp Dept Wise List',
    element: <OnHoldPendingDeptWiseList />
  },
  {
    path: 'AssignEmpWiseList',
    name: 'Assign Comp Emp Wise List',
    element: <AssignEmpWiseList />
  },
  {
    path: 'VerifyEmpWiseList',
    name: 'Verify Comp Emp Wise List',
    element: <VerifyEmpWiseList />
  },
  {
    path: 'OnHoldPendingEmpWiseList',
    name: 'Onhold Comp Emp Wise List',
    element: <OnHoldPendingEmpWiseList />
  },

  { path: 'damaList', name: 'Dama count', element: <DamaCount /> },
  { path: 'BhrcList', name: 'Bhrc List', element: <BhrcCount /> },
  { path: 'roundsAfternoon', name: 'Rounds Afternoon', element: <RoundsAfternoonList /> },
  { path: 'disafternoonList', name: 'Discharge Afternoon', element: <DischargeList /> },
  { path: 'HighAntibiotic', name: 'High Antibiotic', element: <HighAntibiotic /> },
  { path: 'SurvillenceView', name: 'Survillence view', element: <PatSurvillenceView /> },
  { path: 'noshift', name: 'No shift', element: <NoshiftReport /> },
  { path: 'highbioticReport', name: 'HighAntiBiotic Report', element: <HighAntiBioticReport /> },
  { path: 'WeEmpMap', name: 'Employee-Ns Wise Mapping', element: <EmpNsWiseMaping /> },
  { path: 'ExtraOrderView', name: 'Total Admission', element: <ExtraOrderView /> },
  { path: 'DashBoard/InPatientList', name: 'InPatientList View', element: <InPatientList /> },
  { path: 'DietPlannedList', name: 'DietPlannedList View', element: <DietPlannedList /> },
  { path: 'DietPlanPending', name: 'DietPlanPending View', element: <DietPlanPending /> },
  { path: 'NDRF', name: 'NDRF Form', element: <NDRFform /> },
  { path: 'HallBooking', name: 'Hall Booking', element: <HallBooking /> },
  { path: 'Hallmaster', name: 'Hall master', element: <Hallmaster /> },
  { path: 'HallbookingReg', name: 'HallbookingReg', element: <HallbookingReg /> },
  { path: 'HallbookingApproval', name: 'HallBookingApproval', element: <HallBookingApproval /> },
  { path: 'HallCeoApproval', name: 'CAoApproval', element: <CAoApproval /> },
  { path: 'Hic/Complaint', name: 'HIC Complaint List', element: <HicComplaint /> },
  { path: 'OMTableMast', name: 'OM Table Master', element: <OMTableMast /> },
  { path: 'OMEmpMapping', name: 'OM Emp Mapping', element: <OMEmpMapping /> },
  { path: 'Manual', name: 'Manual List', element: <ManualList /> },
  { path: 'ComplaintEmpMap', name: 'Compalint EMP Mapping', element: <ComEmpMapping /> },
  { path: 'AssetStockDetails', name: 'Asset Stock Details', element: <AssetStockDetails /> },
  { path: 'CompPriority', name: 'Compalint Priority Master', element: <ComPriorityMast /> },
  {
    path: 'AssetDashboardMain',
    name: 'Registred Compalint List',
    element: <AssetDashboardMain />
  },
  { path: 'CmsReportDeptWise', name: 'Registred Compalint List', element: <CmsReportDeptWise /> },
  { path: 'Campus', name: 'Campus master', element: <CampusMaster /> },
  { path: 'BuildingMast', name: 'Building master', element: <BuildingMast /> },
  { path: 'BuildingBlockMaster', name: 'Building block Master', element: <BluidBlockMast /> },
  { path: 'InsideBuilding', name: 'Inside Building block', element: <InsideBuildBlock /> },
  { path: 'FloorMast', name: ' Floor Master', element: <FloorMaster /> },
  { path: 'RoomTypeMaster', name: 'Room Type Master', element: <RoomTypeMaster /> },
  { path: 'RoomCategoryMaster', name: 'Room Category Master', element: <RoomCategoryMaster /> },
  { path: 'FloorCreation', name: 'Floor Creation', element: <FloorCreation /> },
  { path: 'RoomCreationSideNav', name: 'Room New Creation', element: <RoomNewCreation /> },
  { path: 'TeamMaster', name: 'Team Master', element: <TeamMaster /> },
  { path: 'DMSApproval', name: 'DMS Approval', element: <DMSApproval /> },
  { path: 'CrfDataCollection', name: 'CRF data Collection', element: <CRFDataCollection /> },
  { path: 'RoomDashBoard', name: 'Room Dashboard', element: <RoomDashBoard /> },
  { path: 'RequstToAssign', name: 'Request To Assign Report', element: <RequstToAssign /> },
  {
    path: 'RequestToRectify',
    name: 'Request To Rectification Report',
    element: <RequestToRectify />
  },
  {
    path: 'RequestToVerify',
    name: 'Request To Verification Report',
    element: <RequestToVerify />
  },
  {
    path: 'AssignToRectify',
    name: 'Assign To Rectification Report',
    element: <AssignToRectify />
  },
  { path: 'AssignToVerify', name: 'Assign To Verification Report', element: <AssignToVerify /> },
  {
    path: 'RectifyToVerify',
    name: 'Rectification To Verification Report',
    element: <RectifyToVerify />
  },
  {
    path: 'ComplaintCategoryReport',
    name: 'Complaint Category Report',
    element: <ComplaintCategoryRprt />
  },
  { path: 'AreaWiseReport', name: 'Area Wise Compalint Report', element: <AreaWiseCompReport /> },
  {
    path: 'ComplaintAssignee',
    name: 'No Of Complaint per Assignee Report',
    element: <CompPerAssignee />
  },
  {
    path: 'TatPerAssignee',
    name: 'TAT per Complaint per Assignee Report',
    element: <TATCompPerAssignee />
  },
  { path: 'ItemNameCreation', name: 'Item Name Creation', element: <ItemNameCreation /> },
  { path: 'PrimaryCustodian', name: 'Primary Custodian', element: <PrimaryCustodian /> },
  { path: 'SecondaryCustodian', name: ' Secondary Custodian', element: <SecondaryCustodian /> },
  { path: 'UnitOfMeasurement', name: 'Unit Of Measurement', element: <UnitOfMeasurement /> },
  { path: 'AssetModel', name: 'Asset Model', element: <AssetModel /> },
  { path: 'AssetSubModel', name: 'Asset SubModel', element: <AssetSubModel /> },
  { path: 'RoomAsset', name: 'Room Asset', element: <RoomAsset /> },
  { path: 'ItemCreation', name: 'item Creation', element: <ItemCreation /> },
  { path: 'DashboardBackup', name: 'Dashboard Backup', element: <DashboardBackup /> },
  { path: 'PasswordManagement', name: 'Password Management', element: <PasswordManagement /> },
  { path: 'BackupChecks', name: 'Backup Checks & Monitoring', element: <BackupChecks /> },
  { path: 'SimType', name: 'Device Type', element: <SimType /> },
  { path: 'WifiManageMenT', name: 'Wifi Management', element: <WifiManageMenT /> },
  { path: 'CusodianDepartment', name: 'Custodian Department', element: <CustodianDeptmt /> },
  { path: 'AssetItemListView', name: 'Asset Item List View', element: <AssetItemListView /> },
  { path: 'ScheduleType', name: 'Backup Schedule Type', element: <BackupScheduleType /> },
  { path: 'ScheduleTime', name: 'Backup Schedule Time', element: <BackupScheduleTime /> },
  { path: 'BackupMast', name: 'Backup Details', element: <Backupmast /> },

  {
    path: 'CredentialType',
    name: 'Credential Type',
    element: <PasswordManagementCredentialType />
  },
  { path: 'AssetRackMast', name: 'Asset Rack Master', element: <AssetRackMast /> },
  {
    path: 'TaskManagementDashboard',
    name: 'TaskManagement Dashboard',
    element: <TaskManagementMainDashboard />
  },
  {
    path: 'TaskManagementCreateTask',
    name: 'TaskManagement Create Task',
    element: <TaskManagementMainCreateTask />
  },
  { path: 'ItSimdetails', name: 'It Sim Details', element: <ITSimDetails /> },
  {
    path: 'AssetDeptTransfer',
    name: 'Asset Department Transfer',
    element: <AssetDepartmentTransfer />
  },
  { path: 'AssetItemReport', name: 'Asset Item Report', element: <AssetItemReport /> },
  { path: 'RequestRegister', name: 'Request Register', element: <RequestRegister /> },
  { path: 'CRFInchargeApproval', name: 'CRF Incharge Approval', element: <CRFIncharge /> },
  {
    path: 'Req.DepartmentApproval',
    name: 'Request Departmental Approval',
    element: <ReqDepartmentApproval />
  },
  { path: 'DMSApproval', name: 'DMS Approval', element: <DMSApproval /> },
  { path: 'CrfMSApproval', name: 'CRF MS Approval', element: <CRFMSApproval /> },
  { path: 'Req.OMApproval', name: 'Request OM Approval', element: <ReqOMApproval /> },
  { path: 'Req.SMOApproval', name: 'Request SMO Approval', element: <ReqSMOApproval /> },
  { path: 'Req.CAOApproval', name: 'Request CAO/MS/COO Approval', element: <ReqCAOApproval /> },
  { path: 'Req.EDApproval', name: 'Request ED Approval', element: <ReqEDApproval /> },
  { path: 'Req.MDApproval', name: 'Request MD Approval', element: <ReqMDApproval /> },
  { path: 'NdrfPurchase', name: 'Request Purchase', element: <NdrfPurchase /> },
  { path: 'CrfDashboard', name: 'CRF Dashboard', element: <CRFDashboard /> },
  {
    path: 'DeptSecBasedItemReport',
    name: 'Department Section Based Item Report',
    element: <DeptSecBasedItemReport />
  },
  {
    path: 'TaskManagementEmployeeTask',
    name: 'TaskManagement Employee Task',
    element: <TaskManagementEmployeeTask />
  },
  { path: 'EmergencyType', name: 'Emmergency Type Master', element: <EmergencyTypeMast /> },
  {
    path: 'CrfNewRequestRegister',
    name: 'CRF Nw Request Register',
    element: <CrfNewReqRegister />
  },
  { path: 'AssetDashboardM', name: 'Asset Inter Departme', element: <AssetDashboardM /> },
  {
    path: 'CensusDept',
    name: 'Daily Census Department Section',
    element: <CensusDptMast />
  },
  { path: 'QualityIndicator', name: 'Quality Indicator List', element: <QualityIndicator /> },
  { path: 'TMdepartmentReport', name: 'TM department Report', element: <TMdepartmentReport /> },
  { path: 'TMEmployeeReport', name: 'TM employee Report', element: <TMEmployeeReport /> },
  {
    path: 'TaskManagementTaskLists',
    name: 'TaskManagement TaskList',
    element: <TaskManagementTaskLists />
  },
  { path: 'DailyCensus', name: 'Daily Census Entry', element: <DailyCensus /> },
  { path: 'DailyCensusReport', name: 'Daily Census Report', element: <DailyCensusReport /> },
  { path: 'CRFNewInchargeApproval', name: 'Incharge Approval', element: <CRFNewIncharge /> },
  { path: 'CRFNewHODApproval', name: 'HOD Approval', element: <CRFNewHOD /> },
  { path: 'CRFNewDMSApproval', name: 'DMS Approval', element: <CRFNewDMS /> },
  { path: 'CRFNewMSApproval', name: 'MS Approval', element: <CRFNewMS /> },
  { path: 'CRFNewOMApproval', name: 'CRF Documentation', element: <CRFNewMO /> },
  { path: 'CRFNewSMOApproval', name: 'CRF Verification', element: <CRFNewSMO /> },
  { path: 'CRFNewGMApproval', name: 'GM Operations Approval', element: <CRFNewGM /> },
  { path: 'CRFNewMDApproval', name: 'MD Approval', element: <CRFNewMD /> },
  { path: 'CRFNewEDApproval', name: 'ED Approval', element: <CRFNewED /> },
  { path: 'CrfNewDashBoard', name: 'CRF Dashboard', element: <CRFNewDashboard /> },
  {
    path: 'CrfNewDataCollection',
    name: 'CRF Data Collection',
    element: <CrfNewDataCollection />
  },
  { path: 'CRFNewPdfView', name: 'CRF New PDF View', element: <CRFNewPdfView /> },
  { path: 'CRFNewPurchase', name: 'CRF New Purchase', element: <CRFNewPurchase /> },
  { path: 'CRFNewCRSStore', name: 'CRF New CRS Store', element: <CRFNewCRSStore /> },
  { path: 'CRFNewStore', name: 'CRF New Store', element: <CRFNewStore /> },
  { path: 'Authorization', name: 'Incharge/HOD Authorization', element: <IncHodAuthorization /> },
  { path: 'BillAdds', name: 'Bill Adds', element: <BillAdds /> },
  { path: 'BillCategory', name: 'Bill Category', element: <BillCategory /> },
  { path: 'BillType', name: 'Bill Type', element: <BillType /> },
  {
    path: 'BillSupplierDetailsMast',
    name: 'Bill Supplier Details Mast',
    element: <BillSupplierDetailsMast />
  },
  { path: 'QIDeptMast', name: 'Quality Department Mast', element: <QIdept /> },
  { path: 'QIPatientMarking', name: 'Dept Wise Patient Marking', element: <QIPatientMarking /> },
  { path: 'AcceptTask', name: 'TaskManagement AcceptTask', element: <AcceptTask /> },
  { path: 'IncidentList', name: 'Incident List View', element: <Incident /> },
  { path: 'QIMonthlyReport', name: 'QI Monthly Report', element: <QIMonthlyReport /> },
  { path: 'QIValidation', name: 'QI Validation', element: <QIValidation /> },
  { path: 'TimeReport', name: 'Initial Assessment Time Report', element: <TimeReport /> },
  { path: 'QiListType', name: 'QI List Type Mast', element: <QIListType /> },
  { path: 'DayWiseReport', name: 'Day Wise QI Report', element: <DayWiseQiReport /> },
  { path: 'DataTransferHRM', name: 'Data Transfer from HR', element: <DataTransferHRM /> },
  { path: 'AmcCmcAdding', name: 'AMC CMC Adding', element: <AmcCmcAdding /> },
  { path: 'QiIncharge', name: 'Level I Approval', element: <QiInchargeApr /> },
  { path: 'QIEquipment', name: 'Quality Equipment Mast', element: <QiEquipment /> },
  { path: 'QiHOD', name: 'Level II Approval', element: <QiHodAprv /> },
  { path: 'CrfNoBased', name: 'CRF No Based', element: <CrfNoBased /> },
  { path: 'userAckldged', name: 'User Acknowledged CRF', element: <UserAcknowldged /> },
  {
    path: 'WaitingReport',
    name: 'Waiting Time For Service Diagnostics',
    element: <QiWaitingTime />
  },
  {
    path: 'TMOverdueCountMaster',
    name: 'TM Overdue Count Master',
    element: <TMOverdueCountMaster />
  },
  {
    path: 'TaskPerformanceSheet',
    name: 'Task Performance Sheet',
    element: <TaskPerformanceSheet />
  },
  {
    path: 'TaskPerformanceSlide',
    name: 'Task Performance Slide',
    element: <TaskPerformanceSlide />
  },
  { path: 'userNotAckldged', name: 'User Not Acknowledged CRF', element: <UserNotAcknowldged /> },
  { path: 'purchaseCRFReport', name: 'Purchase CRF Report', element: <PurchaseCRFReport /> },
  { path: 'AllCRFReport', name: 'All CRF Report', element: <AllCRFReport /> },
  { path: 'feedback', name: 'Feedback', element: <FeedbackForm /> },
  { path: 'QIdeptAccess', name: 'QI Department Access Mast', element: <DeptAcess /> },
  { path: 'AssetServiceList', name: 'Spare Service List', element: <AssetServiceList /> },
  {
    path: 'AssetCondemnationList',
    name: 'Spare Condemnation List',
    element: <AssetCondemnationList />
  },
  { path: 'PmDueList', name: 'PM Due List in Asset', element: <PmDueList /> },
  { path: 'DeliveryMarking', name: 'CRS Delivery Marking', element: <DeliverMarking /> },
  { path: 'ItemChecking', name: 'Item Checking', element: <ItemChecking /> },
  { path: 'SearchCrfDetails', name: 'CRF Search', element: <CrfSearch /> },
  { path: 'CompanyMast', name: 'Company Master', element: <CompanyName /> },
  { path: 'CrfBiomedical', name: 'CRF Biomedical View', element: <CrfBiomedical /> },
  { path: 'ApprovalMapping', name: 'CRF Approval Mapping Master', element: <ApprovalMapping /> },
  {
    path: 'CRFNewManagingDirector',
    name: 'Managing Director Approval',
    element: <ManagingDirectorApproval />
  },
  {
    path: 'ViewCategoryMaster',
    name: 'MenuView Category Master',
    element: <ViewCategoryMaster />
  },
  { path: 'CrfView', name: 'Crf View', element: <CrfView /> },
  { path: 'CrfStoreMaster', name: 'Crf StoreMaster', element: <CrfStoreMaster /> },
  { path: 'CrfCommon', name: 'Crf Common Master', element: <CrfCommon /> },
  { path: 'AllCRFReportWithPO', name: 'All CRF Report With PO', element: <AllCRFReportWithPO /> },
  { path: 'TicketDashboards', name: 'Ticket Dashboards', element: <TicketDashboardz /> },
  { path: 'AllDeptCondemList', name: 'AllDeptCondemList', element: <AllDeptCondemList /> },
  { path: 'ItBackupTypeMast', name: 'ItBackupTypeMast', element: <ItBackupTypeMast /> },
  { path: 'SimOperator', name: 'SimOperator', element: <SimOperator /> },
  { path: 'DashBoardMaster', name: 'DashBoardMaster', element: <CrfDashboardMaster /> },
  {
    path: 'DataCollectionMaster',
    name: 'DataCollectionMaster',
    element: <DataCollectionMaster />
  },
  { path: 'DepartmentMapping', name: 'DashBoardMaster', element: <DepartmentMapping /> },
  { path: 'AmsMaster', name: 'AmsMaster', element: <AmsMaster /> },
  { path: 'AmsPatientDetails', name: 'Ams Patient Details', element: <AmsPatientDetails /> },
  { path: 'DcReport', name: 'DcReport', element: <DcReport /> },
  { path: 'IncidentReg', name: 'Incident Registration', element: <IncidentRegistrationFinal /> },
  { path: 'IncidentDashboard', name: 'Incident Dashboard', element: <IncidentDashboard /> },
  { path: 'IncidentApprovals', name: 'Incident Approvals', element: <IncidentApprovals /> },
  { path: 'DepartmentSection', name: 'Department Mast', element: <DepartmentSectionMast /> },
  { path: 'StaticUrl', name: 'StaticUrl', element: <StaticUrl /> },
  { path: 'MelioraDepMaster', name: 'MelioraDepMaster', element: <MelioraDepMaster /> },
  { path: 'MelioraDepSecMaster', name: 'MelioraDepSecMaster', element: <MelioraDepSecMaster /> },

]

export default routes
