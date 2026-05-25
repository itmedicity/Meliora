import React, {
    memo,
    useState,
    useMemo,
    useCallback,
    Fragment,
} from "react";
import {
    Box,
    Typography,
    Input,
    IconButton,
    Tabs,
    TabList,
    Tab,
    TabPanel,
} from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { format, isValid, parse, parseISO } from "date-fns";

import AddDetails from "./AddDetails/AddDetails";
import ApprovedWorkOrder from "./ApprovedWorkOrder";
import { getCRFDetails } from "src/api/WorkOrderApi";
import { getApprovedWo, getWorkOrderData } from "./WorkOrderCommonApi";
import VirtuosoTable from "./Components/VirtuosoTable";
import Tableheader from "./Components/Tableheader";
import { useApprovalDepartmentFetching } from "../IncidentManagement/CommonComponent/useQuery";
import WoApprovalModal from "./WorkOrderApprovals/WoApprovalModal";

/* ================= COLUMN DEFINITIONS ================= */

const CRF_COLUMNS = [
    { key: "sl_no", label: "Sl No", align: "center" },
    { key: "crfNo", label: "CRF No", align: "left" },
    { key: "sec_name", label: "Department", align: "left" },
    { key: "req_date", label: "Req Date", align: "center" },
    { key: "expected_date", label: "Expected Date", align: "center" },
    { key: "em_no", label: "Requested User Number", align: "left" },
    { key: "em_name", label: "Requested User", align: "left" },
    { key: "work_order_status", label: "Status", align: "center" },
];

const APPROVAL_COLUMNS = [
    { key: "sl_no", label: "#", align: "center" },
    { key: "crfdata", label: "CRF No", align: "left" },
    { key: "it_supplier_name", label: "Supplier Name", align: "left" },
    { key: "wo_no", label: "WO No", align: "left" },
    { key: "approval_date", label: "WO Approval Date", align: "center" },
    { key: "em_name", label: "Approved User", align: "center" },
    { key: "status", label: "View", align: "center" },
];

const APPROVAL_PENDING_COLUMNS = [
    { key: "slno", label: "#", align: "center" },
    { key: "wo_type", label: "Type", align: "left" },
    { key: "wo_date", label: "WO Date", align: "left" },
    { key: "bom_regno", label: "BOM No", align: "center" },
    { key: "it_supplier_name", label: "Vendor", align: "left" },
    { key: "status", label: "View", align: "center" },
];

/* ================= MAIN COMPONENT ================= */

const WorkOrderList = () => {
    const navigate = useNavigate();
    const { empid } = useSelector((s) => s.LoginUserData);

    const [search, setSearch] = useState("");
    const [view, setView] = useState(0);
    const [tab, setTab] = useState(0);
    const [selectedData, setSelectedData] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    /* ================= DATA FETCH ================= */

    const { data: crfData = []} = useQuery({
        queryKey: ["getCRFDatas"],
        queryFn: getCRFDetails,
    });

    console.log("crfData:",crfData);
    
    const { data: approvedWo = [] } = useQuery({
        queryKey: ["GetApprovedWoDetails", empid],
        queryFn: () => getApprovedWo(empid),
        enabled: !!empid,
        staleTime: Infinity,
    });

    const levelNo = 26;

    const { data: ApprovalDepartments = [] } =
        useApprovalDepartmentFetching(empid, levelNo);

    const level_name = ApprovalDepartments?.[0]?.level_name;
    const level_no = ApprovalDepartments?.[0]?.level_no;
    const nextLevelNo = level_no ? level_no - 1 : null;

    const { data: workOrders = [] } = useQuery({
        queryKey: ["GetWorkOrderDetails", nextLevelNo],
        queryFn: () => getWorkOrderData(nextLevelNo),
        enabled: nextLevelNo !== null,
        staleTime: Infinity,
    });

    // console.log("crfData:", crfData);
    // console.log("workOrders:", workOrders); 

    /* ================= CHECK BOM VS CRF ================= */

    const crfDataWithDisable = useMemo(() => {
        if (!crfData?.length) return [];

        const bomSet = new Set(
            workOrders?.map((w) => String(w.bom_regno))
        );

        return crfData.map((row) => ({
            ...row,
            action_disabled: bomSet.has(String(row.req_slno)),
        }));
    }, [crfData, workOrders]);

    /* ================= HELPERS ================= */

    const formatDate = (value) => {
        if (!value) return null;

        let date =
            typeof value === "string"
                ? parseISO(value)
                : new Date(value);

        if (!isValid(date)) {
            date = parse(value, "dd-MM-yyyy", new Date());
        }

        return isValid(date) ? format(date, "yyyy-MM-dd") : null;
    };

    /* ================= FILTER ================= */

    const filteredCRF = useMemo(() => {
        if (!search) return crfDataWithDisable;

        const q = search.toLowerCase();

        return crfDataWithDisable.filter(
            (r) =>
                r?.crfNo?.toLowerCase().includes(q) ||
                r?.company_name?.toLowerCase().includes(q) ||
                String(r?.req_slno ?? "").includes(q)
        );
    }, [crfDataWithDisable, search]);

    const filteredApprovals = useMemo(() => {
        if (!search) return approvedWo;

        const q = search.toLowerCase();

        return approvedWo.filter(
            (r) =>
                r?.crfdata?.toLowerCase().includes(q) ||
                r?.company_name?.toLowerCase().includes(q) ||
                String(r?.bom_regno ?? "").includes(q)
        );
    }, [approvedWo, search]);

    /* ================= ACTION HANDLERS ================= */

    const openAddDetails = useCallback((row) => {
        if (row?.action_disabled) return;

        setSelectedData({
            sec_name: row.sec_name,
            request_deptsec_slno: row.request_deptsec_slno,
            crfNo: row.crfNo,
            req_date: formatDate(row.req_date),
            req_slno: row.req_slno,
        });
        setView(1);
    }, []);

    const openApprovedWO = useCallback((row) => {
        setSelectedData({
            ...row,
            approval_date: format(
                new Date(row.wo_approval_date),
                "dd-MM-yyyy"
            ),
        });
        setView(2);
    }, []);

    const openPendingApprovedWO = useCallback((row) => {
        setSelectedData({
            ...row,
        });
        setView(3);
        setOpenModal(true);
    }, []);

    /* ================= CONDITIONAL VIEWS ================= */

    if (view === 1) {
        return (
            <AddDetails
                setOpen={() => setView(0)}
                setSelectedData={setSelectedData}
                SelectedData={selectedData}
            />
        );
    }

    if (view === 2) {
        return (
            <ApprovedWorkOrder
                setOpen={() => setView(0)}
                setSelectedData={setSelectedData}
                SelectedData={selectedData}
            />
        );
    }

    if (view === 3) {
        return (
            <WoApprovalModal
                setView={setView}
                open={openModal}
                setOpen={setOpenModal}
                selectedWO={selectedData}
                setSelectedWO={setSelectedData}
                empid={empid}
                level_name={level_name}
                level_no={level_no}
            />
        );
    }

    /* ================= LIST VIEW ================= */

    return (
        <Fragment>
            <Box sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography level="h4" sx={{ color: "#7F55B1" }}>
                        CRF Work Orders
                    </Typography>

                    <IconButton size="sm" onClick={() => navigate("/Home")}>
                        <CloseIcon sx={{ color: "#7F55B1" }} />
                    </IconButton>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
                    <Input
                        size="sm"
                        placeholder="Search CRF No..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 260 }}
                    />
                </Box>

                <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 1.5 }}>
                    <TabList
                        sx={{
                            gap: 1,
                            p: 0,
                            borderRadius: "xl",
                            backgroundColor: "#F4EFFA",
                            boxShadow: "inset 0 0 0 1px #E0D7EE",
                            width: "fit-content",
                        }}
                    >
                        <Tab disableIndicator>Work Order List</Tab>
                        <Tab disableIndicator>Approval Pending List</Tab>
                        <Tab disableIndicator>Approval List</Tab>
                    </TabList>

                    <Box
                        sx={{
                            mt: 0,
                            borderRadius: "xl",
                            backgroundColor: "#FFF",
                            boxShadow: "0 7px 25px rgba(0,0,0,0.06)",
                            overflow: "hidden",
                        }}
                    >
                        <TabPanel value={0} sx={{ p: 0 }}>
                            <Tableheader columns={CRF_COLUMNS} />

                            <VirtuosoTable
                                data={filteredCRF}
                                columns={CRF_COLUMNS}
                                actionKey="work_order_status"
                                onAction={openAddDetails}
                            />
                        </TabPanel>

                        <TabPanel value={1} sx={{ p: 0 }}>
                            <Tableheader columns={APPROVAL_PENDING_COLUMNS} />

                            <VirtuosoTable
                                data={workOrders}
                                columns={APPROVAL_PENDING_COLUMNS}
                                actionKey="status"
                                onAction={openPendingApprovedWO}
                            />
                        </TabPanel>

                        <TabPanel value={2} sx={{ p: 0 }}>
                            <Tableheader columns={APPROVAL_COLUMNS} />

                            <VirtuosoTable
                                data={filteredApprovals}
                                columns={APPROVAL_COLUMNS}
                                actionKey="status"
                                onAction={openApprovedWO}
                            />
                        </TabPanel>
                    </Box>
                </Tabs>
            </Box>
        </Fragment>
    );
};

export default memo(WorkOrderList);
// import React, {
//     memo,
//     useState,
//     useMemo,
//     useCallback,
//     Fragment,
// } from "react";
// import {
//     Box,
//     Typography,
//     Input,
//     IconButton,
//     Tabs,
//     TabList,
//     Tab,
//     TabPanel,
// } from "@mui/joy";
// import CloseIcon from "@mui/icons-material/Close";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { format, isValid, parse, parseISO } from "date-fns";

// import AddDetails from "./AddDetails/AddDetails";
// import ApprovedWorkOrder from "./ApprovedWorkOrder";
// import { getCRFDetails } from "src/api/WorkOrderApi";
// import { getApprovedWo, getWorkOrderData } from "./WorkOrderCommonApi";
// import VirtuosoTable from "./Components/VirtuosoTable";
// import Tableheader from "./Components/Tableheader";
// import { useApprovalDepartmentFetching } from "../IncidentManagement/CommonComponent/useQuery";
// import WoApprovalModal from "./WorkOrderApprovals/WoApprovalModal";

// /* ================= COLUMN DEFINITIONS ================= */

// const CRF_COLUMNS = [
//     { key: "sl_no", label: "Sl No", align: "center" },
//     { key: "crfNo", label: "CRF No", align: "left" },
//     { key: "sec_name", label: "Department", align: "left" },
//     { key: "req_date", label: "Req Date", align: "center" },
//     { key: "expected_date", label: "Expected Date", align: "center" },
//     { key: "em_no", label: "Requested User Number", align: "left" },
//     { key: "em_name", label: "Requested User", align: "left" },
//     { key: "work_order_status", label: "Status", align: "center" },
// ];

// const APPROVAL_COLUMNS = [
//     { key: "sl_no", label: "#", align: "center" },
//     { key: "crfdata", label: "CRF No", align: "left" },
//     { key: "it_supplier_name", label: "Supplier Name", align: "left" },
//     { key: "wo_no", label: "WO No", align: "left" },
//     { key: "approval_date", label: "WO Approval Date", align: "center" },
//     { key: "em_name", label: "Approved User", align: "center" },
//     { key: "status", label: "View", align: "center" },
// ];

// const APPROVAL_PENDING_COLUMNS = [
//     { key: "slno", label: "#", align: "center" },
//     { key: "wo_type", label: "Type", align: "left" },
//     // { key: "wo_slno", label: "WO No", align: "left" },
//     { key: "wo_date", label: "WO Date", align: "left" },
//     { key: "bom_regno", label: "BOM No", align: "center" },
//     { key: "it_supplier_name", label: "Vendor", align: "left" },
//     { key: "status", label: "View", align: "center" },
// ];

// /* ================= MAIN COMPONENT ================= */

// const WorkOrderList = () => {
//     const navigate = useNavigate();
//     const { empid } = useSelector((s) => s.LoginUserData);


//     const [search, setSearch] = useState("");
//     const [view, setView] = useState(0); // 0=list, 1=add, 2=approved
//     const [tab, setTab] = useState(0);
//     const [selectedData, setSelectedData] = useState(null);
//     const [openModal, setOpenModal] = useState(false)

//     /* ================= DATA FETCH ================= */
//     const { data: crfData = [] } = useQuery({
//         queryKey: ["getCRFDatas"],
//         queryFn: getCRFDetails,
//     });

//     const { data: approvedWo = [] } = useQuery({
//         queryKey: ["GetApprovedWoDetails", empid],
//         queryFn: () => getApprovedWo(empid),
//         enabled: !!empid,
//         staleTime: Infinity,
//     });

//     const levelNo = 26

//     const { data: ApprovalDepartments = [] } =
//         useApprovalDepartmentFetching(empid, levelNo)

//     const level_name = ApprovalDepartments?.[0]?.level_name
//     const level_no = ApprovalDepartments?.[0]?.level_no
//     const nextLevelNo = level_no ? level_no - 1 : null

//     const { data: workOrders = [] } = useQuery({
//         queryKey: ['GetWorkOrderDetails', nextLevelNo],
//         queryFn: () => getWorkOrderData(nextLevelNo),
//         enabled: nextLevelNo !== null,
//         staleTime: Infinity,
//     })

//     console.log("crfData:", crfData);


//     console.log("workOrders:", workOrders);



//      check if the req_slno in crfData are same in bom_regno in workOrders  then disable the action button  
    

//     /* ================= HELPERS ================= */

//     const formatDate = (value) => {
//         if (!value) return null;
//         let date =
//             typeof value === "string"
//                 ? parseISO(value)
//                 : new Date(value);

//         if (!isValid(date)) {
//             date = parse(value, "dd-MM-yyyy", new Date());
//         }

//         return isValid(date) ? format(date, "yyyy-MM-dd") : null;
//     };

//     /* ================= FILTER ================= */

//     const filteredCRF = useMemo(() => {
//         if (!search) return crfData;
//         const q = search.toLowerCase();
//         return crfData.filter(
//             (r) =>
//                 r?.crfNo?.toLowerCase().includes(q) ||
//                 r?.company_name?.toLowerCase().includes(q) ||
//                 String(r?.req_slno ?? "").includes(q)
//         );
//     }, [crfData, search]);

//     const filteredApprovals = useMemo(() => {
//         if (!search) return approvedWo;
//         const q = search.toLowerCase();
//         return approvedWo.filter(
//             (r) =>
//                 r?.crfdata?.toLowerCase().includes(q) ||
//                 r?.company_name?.toLowerCase().includes(q) ||
//                 String(r?.bom_regno ?? "").includes(q)
//         );
//     }, [approvedWo, search]);

//     /* ================= ACTION HANDLERS ================= */

//     const openAddDetails = useCallback((row) => {
//         setSelectedData({
//             sec_name: row.sec_name,
//             request_deptsec_slno: row.request_deptsec_slno,
//             crfNo: row.crfNo,
//             req_date: formatDate(row.req_date),
//             req_slno: row.req_slno,
//         });
//         setView(1);
//     }, []);

//     const openApprovedWO = useCallback((row) => {
//         setSelectedData({
//             ...row,
//             approval_date: format(
//                 new Date(row.wo_approval_date),
//                 "dd-MM-yyyy"
//             ),
//         });
//         setView(2);
//     }, []);

//     const openPendingApprovedWO = useCallback((row) => {
//         setSelectedData({
//             ...row,
//             // wo_date: format(new Date(row.wo_date), "dd-MM-yyyy")
//         });
//         setView(3);
//         setOpenModal(true)
//     }, []);

//     /* ================= CONDITIONAL VIEWS ================= */

//     if (view === 1) {
//         return (
//             <AddDetails
//                 setOpen={() => setView(0)}
//                 setSelectedData={setSelectedData}
//                 SelectedData={selectedData}
//             />
//         );
//     }
//     if (view === 2) {
//         return (
//             <ApprovedWorkOrder
//                 setOpen={() => setView(0)}
//                 setSelectedData={setSelectedData}
//                 SelectedData={selectedData}
//             />
//         );
//     }
//     if (view === 3) {
//         return (
//             <WoApprovalModal
//                 setView={setView}
//                 open={openModal}
//                 setOpen={setOpenModal}
//                 selectedWO={selectedData}
//                 setSelectedWO={setSelectedData}
//                 empid={empid}
//                 level_name={level_name}
//                 level_no={level_no}
//             />)
//     }

//     /* ================= LIST VIEW ================= */

//     return (
//         <Fragment>
//             <Box sx={{ width: "100%", height: "100%" }}>
//                 {/* Header */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                     <Typography level="h4" sx={{ color: "#7F55B1" }}>
//                         CRF Work Orders
//                     </Typography>
//                     <IconButton size="sm" onClick={() => navigate("/Home")}>
//                         <CloseIcon sx={{ color: "#7F55B1" }} />
//                     </IconButton>
//                 </Box>

//                 <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 0.5 }}>
//                     <Input
//                         size="sm"
//                         placeholder="Search CRF No..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         sx={{ width: 260 }}
//                     />
//                 </Box>

//                 <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mt: 1.5 }}>
//                     <TabList
//                         sx={{
//                             gap: 1,
//                             p: 0,
//                             borderRadius: "xl",
//                             backgroundColor: "#F4EFFA",
//                             boxShadow: "inset 0 0 0 1px #E0D7EE",
//                             width: "fit-content",
//                         }}
//                     >
//                         <Tab disableIndicator>Work Order List</Tab>
//                         <Tab disableIndicator>Approval Pending List</Tab>
//                         <Tab disableIndicator>Approval List</Tab>
//                     </TabList>

//                     <Box
//                         sx={{
//                             mt: 0,
//                             borderRadius: "xl",
//                             backgroundColor: "#FFF",
//                             boxShadow: "0 7px 25px rgba(0,0,0,0.06)",
//                             overflow: "hidden",
//                         }}
//                     >
//                         <TabPanel value={0} sx={{ p: 0 }}>
//                             <Tableheader columns={CRF_COLUMNS} />
//                             <VirtuosoTable
//                                 data={filteredCRF}
//                                 columns={CRF_COLUMNS}
//                                 actionKey="work_order_status"
//                                 onAction={openAddDetails}
//                             />
//                         </TabPanel>

//                         <TabPanel value={1} sx={{ p: 0 }}>
//                             <Tableheader columns={APPROVAL_PENDING_COLUMNS} />
//                             <VirtuosoTable
//                                 data={workOrders}
//                                 columns={APPROVAL_PENDING_COLUMNS}
//                                 actionKey="status"
//                                 onAction={openPendingApprovedWO}
//                             />
//                         </TabPanel>

//                         <TabPanel value={2} sx={{ p: 0 }}>
//                             <Tableheader columns={APPROVAL_COLUMNS} />
//                             <VirtuosoTable
//                                 data={filteredApprovals}
//                                 columns={APPROVAL_COLUMNS}
//                                 actionKey="status"
//                                 onAction={openApprovedWO}
//                             />
//                         </TabPanel>
//                     </Box>
//                 </Tabs>

//             </Box>
//         </Fragment>
//     );
// };

// export default memo(WorkOrderList);
