import React from 'react'



const NotCorect = React.lazy(() => import('./views/dashboard/Home'))
const Home = React.lazy(() => import('./views/ComManagement/Dashboard/TicketManagementCmDeptMain'))
const Settings = React.lazy(() => import('../src/Menus/Settings'))
const Administrtion = React.lazy(() => import('../src/views/Administration/Test'))
const DepartmentMast = React.lazy(() => import('./views/Master/Department/DepartmentMast'))
const DepartmentSectionMast = React.lazy(() => import('./views/Master/DepartmentSectionMast/DeptSectionMast'))
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
const DirectComplaintReg = React.lazy(() => import('./views/ComManagement/DirectTicketRegistrationMain/DirectTicketMainTab'))
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
const PasswordManagementCredentialType = React.lazy(() => import('./views/Master/ItMasters/passwordManagement/PasswordCredentialType'))
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
const EmergencyTypeMast = React.lazy(() => import('./views/Master/RequestManagement/EmergencyTypeMast/EmergencyTypeMast'))
const CrfNewReqRegister = React.lazy(() => import('./views/CentralRequestManagement/CRFRequestMaster/CrfRequestMaster'))
const AssetDashboardM = React.lazy(() => import('./views/AssetManagment/DashboardAsset/DashboardMainAsset'))
const CensusDptMast = React.lazy(() => import('./views/Master/QualityIndicatorMaster/CensusDeptSecMast/QualityDept'))
const QualityIndicator = React.lazy(() => import('./views/Master/QualityIndicatorMaster/QualityIndicatorsList/QualityIndicators'))
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
const DeliverMarking = React.lazy(() => import('./views/CentralRequestManagement/DeliveryMarking/DeliveryMarkingStore'))
const ItemChecking = React.lazy(() => import('./views/CentralRequestManagement/ItemCheckingCRS/ItemCheckingMain'))
const CrfSearch = React.lazy(() => import('./views/CentralRequestManagement/CRFSearch/CrfDetailsSearch'))
const CompanyName = React.lazy(() => import('./views/Master/RequestManagement/CompanyMaster/CompanyMast'))
const CrfBiomedical = React.lazy(() => import('./views/CentralRequestManagement/CRFBiomedicalView/CrfBiomedical'))
const ApprovalMapping = React.lazy(() => import('./views/Master/RequestManagement/CRFApprovalMappingMaster/ApprovalMappingMaster'))
const ManagingDirectorApproval = React.lazy(() => import('./views/CentralRequestManagement/CrfManagingDirectorApproval/ManagingDirectorMain'))
const ViewCategoryMaster = React.lazy(() => import('./views/Master/RequestManagement/CrfViewCategoryMaster/ViewCategoryMaster'))
const CrfView = React.lazy(() => import('./views/CentralRequestManagement/CRFview/CrfView'))
const CrfStoreMaster = React.lazy(() => import('./views/Master/RequestManagement/StoreMaster/StoreMaster'))
const CrfCommon = React.lazy(() => import('./views/Master/RequestManagement/CrfCommon/CrfCommonMaster'))
const CrfDashboardMaster = React.lazy(() => import('./views/Master/RequestManagement/DashboardMaster/DashboardMaster'))
const DataCollectionMaster = React.lazy(() => import('./views/Master/RequestManagement/DataCollectionMaster/DataCollection'))
const DepartmentMapping = React.lazy(() => import('./views/Master/RequestManagement/DepartmentMapping/DepartmentMaping'))
const AmsMaster = React.lazy(() => import('./views/Master/AmsMaster/AmsMaster'))
const AmsPatientDetails = React.lazy(() => import('./views/Ams/AmsMain'))
const DcReport = React.lazy(() => import('./views/Report/DailyCensus/DailyCensus'))
const StaticUrl = React.lazy(() => import('./views/Master/StaticUrl/StaticUrl'))
const MelioraDepMaster = React.lazy(() => import('./views/Master/MelioraDepMaster/MelioraDepMaster'))
const MelioraDepSecMaster = React.lazy(() => import('./views/Master/MelioraDepSecMaster/MelioraDepSecMaster'))
const MelioraHodInchargeMaster = React.lazy(() => import('./views/Master/Meliora_Hod_Incharge/HodIncharge_master'))
const WorkOrderRegister = React.lazy(() => import('./views/WorkOrder/Workorder'))
const ContractMaster = React.lazy(() => import('./views/Master/WorkOrder Master/ContractMaster'))
const WorkLocationMaster = React.lazy(() => import('./views/Master/WorkLocationMaster/Worklocationmaster'))
const CrfTatReport = React.lazy(() => import('./views/Report/CrmReport/CrfTatReport'))
const CrfApprovalpending = React.lazy(() => import('./views/Report/CrmReport/CrfAppovalPending'))
const PendingPo = React.lazy(() => import('./views/Report/CrmReport/PendingPo'))
const CondemApprovalLevelMast = React.lazy(() => import('./views/Master/AssetMasters/CondemnationApprovalLevelMaster/CondemApprovalLevelMast'))
const CondemnInchargeApproval = React.lazy(() => import('./views/AssetManagment/CondemnationApproveMenu/InchargeHodCondemApproval/Incharge/CondemnInchargeApproval'))
const CondemHodApproval = React.lazy(() => import('./views/AssetManagment/CondemnationApproveMenu/InchargeHodCondemApproval/Hod/CondemHodApproval'))
const CondemnAllApproveMain = React.lazy(() => import('./views/AssetManagment/CondemnationApproveMenu/CondemnationAllApprove/CondemnAllApproveMain'))
const CondemnCategoryMast = React.lazy(() => import('./views/Master/AssetMasters/AssetCondemnationMasters/CondemnCategoryMaster/CondemnCategoryMast'))
const ScrapYardMain = React.lazy(() => import('./views/Master/AssetMasters/AssetCondemnationMasters/ScrapYard/ScrapYardMain'))
const CondemnQualityMast = React.lazy(() => import('./views/Master/AssetMasters/AssetCondemnationMasters/CondemnQualityMaster/CondemnQualityMast'))
const CondemUnitMaster = React.lazy(() => import('./views/Master/AssetMasters/AssetCondemnationMasters/CondemnUnitMaster/CondemUnitMaster'))
const SupplierCondemRateDetails = React.lazy(() => import('./views/Master/AssetMasters/AssetCondemnationMasters/SupplierCondemnation/SupplierCondemRateDetails'))
const ScrapLevelApproveMaster = React.lazy(() => import('./views/Master/AssetMasters/AssetCondemnationMasters/CondemnScrapLevelApprove/ScrapLevelApproveMaster'))
const ScrapItemMain = React.lazy(() => import('./views/AssetManagment/CondemnationScrapItems/ScrapItemMain'))
const ScrapApproveMain = React.lazy(() => import('./views/AssetManagment/CondemnationScrapItems/ScrapApprovalForm/ScrapApproveMain'))
const DashboardMain = React.lazy(() => import('./views/Ams/AmsDashboard/DashboardMain'))
const AmsPatientDetailsReport = React.lazy(() => import('./views/Report/AmsReport/AmsPatientDetailsReport'))
const CustodianTransfer = React.lazy(() => import('./views/AssetManagment/CustodianTransfer/CustodianTransfer'))
const HoldticketReport = React.lazy(() => import('./views/Report/ComplaintReport/HoldTicketReport'))
const PendingTicketsReport = React.lazy(() => import('./views/Report/ComplaintReport/PendingTicketsReport'))
const PendingTicketsCountReport = React.lazy(() => import('./views/Report/ComplaintReport/PendingTicketsCountReport'))
const CondemnationAssetOld = React.lazy(() => import('./views/AssetManagment/AssetCondemnationOld/CondemnationAssetOld'))
const DeliveryMarking_Report = React.lazy(() => import('./views/Report/CrmReport/DeliveryMarking_Report'))
const IcuDashboard = React.lazy(() => import('./views/IcuBeds/IcuDashboard'))
const AllDeviceCredentialList = React.lazy(() => import ('./views/ItManagement/PasswordManagement/AllDeviceCredentialList'))


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
  { path: 'HoldReason', name: 'Hold Reasons in Ticket', element: <HoldReason /> },
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
    name: 'Asset Spare Condemnation List',
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
  // { path: 'AllDeptCondemList', name: 'AllDeptCondemList', element: <AllDeptCondemList /> },
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
  { path: 'AmsDashboardMain', name: 'Ams Dashboard', element: <DashboardMain /> },
  { path: 'amsPatientDetailsReport', name: 'Ams Patient Details', element: < AmsPatientDetailsReport /> },
  { path: 'DcReport', name: 'DcReport', element: <DcReport /> },
  { path: 'DepartmentSection', name: 'Department Mast', element: <DepartmentSectionMast /> },
  { path: 'StaticUrl', name: 'StaticUrl', element: <StaticUrl /> },
  { path: 'MelioraDepMaster', name: 'MelioraDepMaster', element: <MelioraDepMaster /> },
  { path: 'MelioraDepSecMaster', name: 'MelioraDepSecMaster', element: <MelioraDepSecMaster /> },
  { path: 'MelioraHodInchargeMaster', name: 'MelioraHodInchargeMaster', element: <MelioraHodInchargeMaster /> },
  { path: 'WorkOrderRegister', name: 'WorkOrderRegister', element: <WorkOrderRegister /> },
  { path: 'ContractMaster', name: 'ContractMaster', element: <ContractMaster /> },
  { path: 'WorkLocationMaster', name: 'WorkLocationMaster', element: <WorkLocationMaster /> },
  { path: 'CrfTatReport', name: 'CrfTatReport', element: <CrfTatReport /> },
  { path: 'CrfApprovalpending', name: 'CrfApprovalpending', element: <CrfApprovalpending /> },
  { path: 'PendingPo', name: 'PendingPo', element: <PendingPo /> },

  {
    path: 'AssetCondemApprovalLevels',
    name: 'AssetCondemApprovalLevels',
    element: <CondemApprovalLevelMast />
  },
  {
    path: 'AssetCondemnInchargeApproval',
    name: 'Asset Condemn Incharge Approval',
    element: <CondemnInchargeApproval />
  },
  {
    path: 'CondemHodApproval',
    name: 'CondemHodApproval',
    element: <CondemHodApproval />
  },
  {
    path: 'CondemnAllApproveMain',
    name: 'CondemnAllApproveMain',
    element: <CondemnAllApproveMain />
  },
  {
    path: 'CondemnationCategoryMaster',
    name: 'CondemnationCategoryMaster',
    element: <CondemnCategoryMast />
  },
  {
    path: 'CondemnationScarpYard',
    name: 'CondemnationScarpYard',
    element: <ScrapYardMain />
  },
  {
    path: 'CondemQualityMaster',
    name: 'CondemQualityMaster',
    element: <CondemnQualityMast />
  },

  {
    path: 'CondemnQuantityUnit',
    name: 'CondemnQuantityUnit',
    element: <CondemUnitMaster />
  },

  {
    path: 'CondemnSupplierRate',
    name: 'CondemnSupplierRate',
    element: <SupplierCondemRateDetails />
  },


  {
    path: 'ScrapFormLevelApprove',
    name: 'ScrapFormLevelApprove',
    element: <ScrapLevelApproveMaster />
  },

  {
    path: 'CondemnedItemCategorization',
    name: 'CondemnedItemCategorization',
    element: <ScrapItemMain />
  },
  {
    path: 'condemScrapFormApprovals',
    name: 'condemScrapFormApprovals',
    element: <ScrapApproveMain />
  },
  {
    path: 'CustodianTransfer',
    name: 'CustodianTransfer',
    element: <CustodianTransfer />
  },


  {
    path: 'HoldticketPendingTicketsReportReport',
    name: 'PendingTicketsReport',
    element: <HoldticketReport />
  },
  {
    path: 'PendingTicketsReport',
    name: 'PendingTicketsReport',
    element: <PendingTicketsReport />
  },
  {
    path: 'PendingTicketsCountReport',
    name: 'PendingTicketsCountReport',
    element: <PendingTicketsCountReport />
  },


  {
    path: 'CondemnationAssetOld',
    name: 'CondemnationAssetOld',
    element: <CondemnationAssetOld />
  },
    {
    path: 'DeliveryMarking_Report',
    name: 'DeliveryMarking_Report',
    element: <DeliveryMarking_Report />
  },
  {
    path: 'IcuDashboard',
    name: 'IcuDashboard',
    element: <IcuDashboard />
  },
    {
    path: 'AllDeviceCredentialList',
    name: 'AllDeviceCredentialList',
    element: <AllDeviceCredentialList />
  },

]

export default routes
