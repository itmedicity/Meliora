
// import React, { useCallback, useMemo, useState } from "react";
// import { Box } from "@mui/material";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import BillingPatientDetail from "./BillingPatientDetail";
// import BillingItemTable from "./BillingItemTable";
// import DietThermalBill from "./DietThermalBill";

// import KotItemHeader from "../../KotItemList/KotItemHeader";

// import {
//     useBystanderBillDetails,
//     usePatientDetail,
//     usePatientDietBillDetails,
//     usePatientExtraOrderBills,
//     usePatientOpenBillDetails,
//     usePatientSimpleSummary,
//     usePatientTransactions
// } from "../../CommonData/UseQuery";
// import BillingSummary from "./BillingSummary";
// import useThermalPrint from "../DischargeBillComponent/useThermalPrint";
// import { prepareBillingPayload } from "../../CommonData/Common";
// import { useSelector } from "react-redux";
// import { axioslogin } from "src/views/Axios/Axios";
// import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
// import PizzaLoader from "../../CanteenOrderConfirmation/Components/PizzaLoader";

// const DietBillingDetail = () => {



//     const { ptNo, ipNo } = useParams();
//     const location = useLocation();
//     const [loading, SetLoading] = useState(false);
//     const activeTab = location.state;



//     const id = useSelector(state => {
//         return state.LoginUserData.empid
//     })

//     const {
//         thermalBillRef,
//         printThermalBill,
//     } = useThermalPrint();

//     const navigate = useNavigate();

//     const handleThermalPrint = () => {
//         printThermalBill();
//     };

//     const [filter, setFilter] = useState("ALL");

//     const { data: PatientFullDetail = [] } =
//         usePatientDetail(ipNo, ptNo);

//     const { data: patientSummary = [] } =
//         usePatientSimpleSummary(ipNo, ptNo);

//     const { data: patientTransactions = [] } =
//         usePatientTransactions(ipNo, ptNo, activeTab);

//     const { data: BystanderDetails = [] } =
//         useBystanderBillDetails(ipNo, ptNo, activeTab);

//     const { data: PatienDietBills = [] } =
//         usePatientDietBillDetails(ipNo, ptNo, activeTab);

//     const { data: patientExraFOod = [] } =
//         usePatientExtraOrderBills(ipNo, ptNo, activeTab);

//     const { data: PatientOpenBillDetails = [] } =
//         usePatientOpenBillDetails(ipNo);


//     const Patient = PatientFullDetail?.[0] ?? {};
//     const Summary = patientSummary?.[0] ?? {};

//     // Counts
//     const counts = useMemo(() => ({
//         diet: PatienDietBills.length,
//         extra: patientExraFOod.length,
//         bystander: BystanderDetails.length,
//         total:
//             PatienDietBills.length +
//             patientExraFOod.length +
//             BystanderDetails.length,
//     }), [
//         PatienDietBills,
//         patientExraFOod,
//         BystanderDetails,
//     ]);



//     // Billing table
//     const filteredTransactions = useMemo(() => {
//         switch (filter) {
//             case "DIET":
//                 return patientTransactions.filter(
//                     x => x.billing_type === "DIET_ORDER"
//                 );
//             case "EXTRA":
//                 return patientTransactions.filter(
//                     x => x.billing_type === "EXTRA_ORDER"
//                 );
//             case "BYSTANDER":
//                 return patientTransactions.filter(
//                     x =>
//                         x.party === "BYSTANDER" ||
//                         x.billing_type === "PATIENT_CANTEEN_ORDER"
//                 );
//             default:
//                 return patientTransactions;
//         }

//     }, [filter, patientTransactions]);


//     // Generate bill for the Pending
//     const handleGeneratePatientBill = useCallback(async () => {

//         const PendingTransactions = filteredTransactions
//             ?.filter(item =>
//                 String(item.status)?.toUpperCase() === "PENDING");

//         const payload = prepareBillingPayload({
//             patient: Patient,
//             items: PendingTransactions,
//             createdBy: id,
//         });
//         try {
//             SetLoading(true)
//             const response = await axioslogin.post("/dietdelivery/billing/create", payload)
//             const { success, message } = response?.data ?? {};
//             if (success !== 1) return warningNotify(message || "Error in Inserting the Patient Bill Details!")
//             succesNotify(message || "Successfully Generated Bill")
//             navigate("/Home/dietpos")
//         } catch (error) {
//             errorNotify("Billing Creation Failed:")
//             console.error("Billing Creation Failed:", error);
//         } finally {
//             SetLoading(false)
//         }
//     }, [
//         Patient,
//         filteredTransactions,
//         id,
//         navigate
//     ]);

//     // Handle FInal Settlemenat

//     const handleSettleBilling = useCallback(async () => {

//         if (!PatientOpenBillDetails?.length) {
//             return warningNotify("No pending bills found");
//         }

//         const billingIds = PatientOpenBillDetails
//             .map(item => Number(item.billing_id))
//             .filter(id => Number.isInteger(id) && id > 0);

//         if (!billingIds.length) {
//             return warningNotify("No valid billing details found");
//         }

//         if (!ipNo) {
//             return warningNotify("Admission ID not found");
//         }

//         const payload = {
//             admission_id: ipNo,
//             billing_ids: billingIds,
//             employee_id: id
//         };

//         try {
//             SetLoading(true)
//             const response = await axioslogin.post(
//                 "/dietdelivery/settle-billing",
//                 payload
//             );

//             const { success, message } = response?.data ?? {};

//             if (!success) return warningNotify(message || "Billing settlement failed");


//             succesNotify(
//                 message || "Billing settled successfully"
//             );

//             navigate("/Home/dietpos");

//         } catch (error) {

//             console.error(
//                 "Billing Settlement Failed:",
//                 error
//             );

//             errorNotify(
//                 error?.response?.data?.message ||
//                 "Billing Settlement Failed"
//             );
//         } finally {
//             SetLoading(false)
//         }

//     }, [
//         ipNo,
//         id,
//         navigate,
//         PatientOpenBillDetails
//     ]);


//     //Handle Print Funcitons
//     const handlePdfPrint = (printType) => {
//         navigate(`/Home/diet/print/${ptNo}/${ipNo}`, {
//             state: {
//                 patient: Patient,
//                 summary: Summary,
//                 dietBills: thermalDietBills,
//                 extraBills: thermalExtraBills,
//                 bystanderBills: thermalBystanderBills,
//                 filter,
//                 printType,
//             },
//         });

//     };



//     // Thermal bill

//     const thermalDietBills = useMemo(() => {

//         return filter === "ALL" || filter === "DIET"
//             ? PatienDietBills
//             : [];

//     }, [filter, PatienDietBills]);

//     const thermalExtraBills = useMemo(() => {

//         return filter === "ALL" || filter === "EXTRA"
//             ? patientExraFOod
//             : [];

//     }, [filter, patientExraFOod]);

//     const thermalBystanderBills = useMemo(() => {

//         return filter === "ALL" || filter === "BYSTANDER"
//             ? BystanderDetails
//             : [];

//     }, [filter, BystanderDetails]);

//     return (

//         <Box
//             sx={{
//                 width: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 height: '90vh'
//             }}
//         >

//             <KotItemHeader name="BILLING DETAIL" />


//             {
//                 loading && <PizzaLoader />
//             }

//             <Box sx={{
//                 display: "flex",
//                 width: "100%",
//                 gap: 2,
//                 p: 1,
//             }}>
//                 <Box
//                     sx={{
//                         width: "80%",
//                         gap: 2
//                     }}>

//                     <BillingSummary
//                         summary={Summary}
//                     />

//                     <Box sx={{
//                         display: 'flex',
//                         gap: 1,
//                         p: 1
//                     }}>

//                         <Box
//                             sx={{
//                                 width: "25%"
//                             }}>
//                             <BillingPatientDetail
//                                 patient={Patient}
//                                 filter={filter}
//                                 onFilterChange={setFilter}
//                                 dietCount={counts.diet}
//                                 extraCount={counts.extra}
//                                 bystanderCount={counts.bystander}
//                                 onPdfPrint={handlePdfPrint}
//                                 onThermalPrint={handleThermalPrint}
//                                 onGeneratePatientBill={handleGeneratePatientBill}
//                                 onSettle={handleSettleBilling}
//                                 activeTab={activeTab}
//                             />
//                         </Box>

//                         <Box
//                             sx={{
//                                 width: "75%",
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 gap: 2,
//                                 height: "calc(100vh - 350px)", // adjust as needed
//                                 overflow: "hidden",
//                             }} >
//                             <Box
//                                 sx={{
//                                     flex: 1,
//                                     overflowY: "auto",
//                                     pr: 1,
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     gap: 2,

//                                     "&::-webkit-scrollbar": {
//                                         width: 8,
//                                     },
//                                     "&::-webkit-scrollbar-thumb": {
//                                         bgcolor: "grey.400",
//                                         borderRadius: 10,
//                                     },
//                                 }} >
//                                 {/* <BillingDeliveryTable
//                                     details={filteredDelivery}
//                                 /> */}
//                                 <BillingItemTable
//                                     items={filteredTransactions}
//                                 />

//                             </Box>
//                         </Box>
//                     </Box>
//                 </Box>
//                 <Box
//                     sx={{
//                         display: "flex",
//                         width: "20%",
//                         gap: 2,
//                         p: 1,
//                         boxShadow: 'md',
//                         height: "85vh",
//                         overflow: "hidden",
//                     }}>
//                     <Box
//                         sx={{
//                             flex: 1,
//                             overflowY: "auto",
//                             pr: 1,
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: 2,

//                             "&::-webkit-scrollbar": {
//                                 width: 8,
//                             },
//                             "&::-webkit-scrollbar-thumb": {
//                                 bgcolor: "grey.400",
//                                 borderRadius: 10,
//                             },
//                         }}
//                     >
//                         <DietThermalBill
//                             ref={thermalBillRef}
//                             patient={Patient}
//                             summary={Summary}
//                             dietBills={thermalDietBills}
//                             extraBills={thermalExtraBills}
//                             bystanderBills={thermalBystanderBills}
//                         />



//                     </Box>
//                 </Box>
//             </Box>
//         </Box>

//     );

// };

// export default DietBillingDetail;


import React, {
    useCallback,
    useMemo,
    useState,
} from "react";

import { Box } from "@mui/material";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

import { useSelector } from "react-redux";

import BillingPatientDetail from "./BillingPatientDetail";
import BillingItemTable from "./BillingItemTable";
import DietThermalBill from "./DietThermalBill";
import BillingSummary from "./BillingSummary";
import KotItemHeader from "../../KotItemList/KotItemHeader";

import {
    useBystanderBillDetails,
    usePatientDetail,
    usePatientDietBillDetails,
    usePatientExtraOrderBills,
    usePatientOpenBillDetails,
    usePatientSimpleSummary,
    usePatientTransactions,
} from "../../CommonData/UseQuery";

import useThermalPrint from "../DischargeBillComponent/useThermalPrint";

import {
    prepareBillingPayload,
} from "../../CommonData/Common";

import { axioslogin } from "src/views/Axios/Axios";

import {
    errorNotify,
    succesNotify,
    warningNotify,
} from "src/views/Common/CommonCode";

import PizzaLoader from "../../CanteenOrderConfirmation/Components/PizzaLoader";


const DietBillingDetail = () => {

    const { ptNo, ipNo } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = location.state;

    const employeeId = useSelector(
        state => state.LoginUserData.empid
    );

    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("ALL");



    // THERMAL PRINT


    const {
        thermalBillRef,
        printThermalBill,
    } = useThermalPrint();

    const handleThermalPrint = useCallback(() => {
        printThermalBill();
    }, [printThermalBill]);



    // DATA


    const {
        data: patientFullDetail = [],
    } = usePatientDetail(ipNo, ptNo);

    const {
        data: patientSummary = [],
    } = usePatientSimpleSummary(ipNo, ptNo);

    const {
        data: patientTransactions = [],
    } = usePatientTransactions(
        ipNo,
        ptNo,
        activeTab
    );

    const {
        data: bystanderDetails = [],
    } = useBystanderBillDetails(
        ipNo,
        ptNo,
        activeTab
    );

    const {
        data: patientDietBills = [],
    } = usePatientDietBillDetails(
        ipNo,
        ptNo,
        activeTab
    );

    const {
        data: patientExtraFood = [],
    } = usePatientExtraOrderBills(
        ipNo,
        ptNo,
        activeTab
    );

    const {
        data: patientOpenBillDetails = [],
    } = usePatientOpenBillDetails(ipNo);



    // BASIC DATA


    const patient = patientFullDetail[0] ?? {};
    const summary = patientSummary[0] ?? {};


    console.log({
        patientOpenBillDetails
    });




    // COUNTS


    const counts = useMemo(() => ({
        diet: patientDietBills.length,
        extra: patientExtraFood.length,
        bystander: bystanderDetails.length,
    }), [
        patientDietBills.length,
        patientExtraFood.length,
        bystanderDetails.length,
    ]);



    // FILTER TRANSACTIONS


    const filteredTransactions = useMemo(() => {

        if (filter === "ALL") {
            return patientTransactions;
        }

        if (filter === "DIET") {
            return patientTransactions.filter(
                item => item.billing_type === "DIET_ORDER"
            );
        }

        if (filter === "EXTRA") {
            return patientTransactions.filter(
                item => item.billing_type === "EXTRA_ORDER"
            );
        }

        if (filter === "BYSTANDER") {
            return patientTransactions.filter(
                item =>
                    item.party === "BYSTANDER" ||
                    item.billing_type === "PATIENT_CANTEEN_ORDER"
            );
        }

        return patientTransactions;

    }, [
        filter,
        patientTransactions,
    ]);



    // THERMAL BILL DATA


    const thermalBills = useMemo(() => {

        return {
            diet:
                filter === "ALL" || filter === "DIET"
                    ? patientDietBills
                    : [],

            extra:
                filter === "ALL" || filter === "EXTRA"
                    ? patientExtraFood
                    : [],

            bystander:
                filter === "ALL" || filter === "BYSTANDER"
                    ? bystanderDetails
                    : [],
        };

    }, [
        filter,
        patientDietBills,
        patientExtraFood,
        bystanderDetails,
    ]);



    // GENERATE BILL


    const handleGeneratePatientBill = useCallback(async () => {

        const pendingTransactions = filteredTransactions.filter(
            item =>
                String(item.status).toUpperCase() === "PENDING"
        );

        if (!pendingTransactions.length) {
            warningNotify("No pending transactions found");
            return;
        }

        const payload = prepareBillingPayload({
            patient,
            items: pendingTransactions,
            createdBy: employeeId,
        });

        try {

            setLoading(true);

            const response = await axioslogin.post(
                "/dietdelivery/billing/create",
                payload
            );

            const {
                success,
                message,
            } = response?.data ?? {};

            if (success !== 1) {
                warningNotify(
                    message ||
                    "Error in inserting patient bill details"
                );
                return;
            }

            succesNotify(
                message ||
                "Successfully generated bill"
            );

            navigate("/Home/dietpos");

        } catch (error) {

            console.error(
                "Billing Creation Failed:",
                error
            );

            errorNotify(
                error?.response?.data?.message ||
                "Billing Creation Failed"
            );

        } finally {

            setLoading(false);

        }

    }, [
        filteredTransactions,
        patient,
        employeeId,
        navigate,
    ]);



    // SETTLE BILL


    const handleSettleBilling = useCallback(async () => {

        if (!patientOpenBillDetails.length) {
            warningNotify("No pending bills found");
            return;
        }

        const billingIds = patientOpenBillDetails
            .map(item => Number(item.billing_id))
            .filter(
                billingId =>
                    Number.isInteger(billingId) &&
                    billingId > 0
            );

        if (!billingIds.length) {
            warningNotify(
                "No valid billing details found"
            );
            return;
        }

        if (!ipNo) {
            warningNotify(
                "Admission ID not found"
            );
            return;
        }

        const payload = {
            admission_id: ipNo,
            billing_ids: billingIds,
            employee_id: employeeId,
            settle_id: patient?.plan_id,
        };

        try {

            setLoading(true);

            const response = await axioslogin.post(
                "/dietdelivery/settle-billing",
                payload
            );

            const {
                success,
                message,
            } = response?.data ?? {};

            if (!success) {
                warningNotify(
                    message ||
                    "Billing settlement failed"
                );
                return;
            }

            succesNotify(
                message ||
                "Billing settled successfully"
            );

            navigate("/Home/dietpos");

        } catch (error) {

            console.error(
                "Billing Settlement Failed:",
                error
            );

            errorNotify(
                error?.response?.data?.message ||
                "Billing Settlement Failed"
            );

        } finally {

            setLoading(false);

        }

    }, [
        patientOpenBillDetails,
        ipNo,
        employeeId,
        navigate,
    ]);



    // PDF PRINT


    const handlePdfPrint = useCallback((printType) => {

        navigate(
            `/Home/diet/print/${ptNo}/${ipNo}`,
            {
                state: {
                    patient,
                    summary,

                    dietBills: thermalBills.diet,
                    extraBills: thermalBills.extra,
                    bystanderBills: thermalBills.bystander,

                    filter,
                    printType,
                },
            }
        );

    }, [
        navigate,
        ptNo,
        ipNo,
        patient,
        summary,
        thermalBills,
        filter,
    ]);



    // RENDER


    return (

        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: "90vh",
            }}
        >

            <KotItemHeader
                name="BILLING DETAIL"
            />

            {loading && <PizzaLoader />}


            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    gap: 2,
                    p: 1,
                }}
            >

                {/* LEFT 80% */}
                <Box
                    sx={{
                        width: "80%",
                    }}
                >

                    <BillingSummary
                        summary={summary}
                    />


                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            p: 1,
                        }}
                    >

                        {/* PATIENT DETAIL */}
                        <Box
                            sx={{
                                width: "25%",
                            }}
                        >

                            <BillingPatientDetail
                                patient={patient}
                                filter={filter}
                                onFilterChange={setFilter}

                                dietCount={counts.diet}
                                extraCount={counts.extra}
                                bystanderCount={counts.bystander}

                                onPdfPrint={handlePdfPrint}
                                onThermalPrint={handleThermalPrint}

                                onGeneratePatientBill={
                                    handleGeneratePatientBill
                                }

                                onSettle={
                                    handleSettleBilling
                                }

                                activeTab={activeTab}
                            />

                        </Box>


                        {/* TRANSACTIONS */}
                        <Box
                            sx={{
                                width: "75%",
                                display: "flex",
                                flexDirection: "column",
                                height: "calc(100vh - 350px)",
                                overflow: "hidden",
                            }}
                        >

                            <Box
                                sx={{
                                    flex: 1,
                                    overflowY: "auto",
                                    pr: 1,

                                    "&::-webkit-scrollbar": {
                                        width: 8,
                                    },

                                    "&::-webkit-scrollbar-thumb": {
                                        bgcolor: "grey.400",
                                        borderRadius: 10,
                                    },
                                }}
                            >

                                <BillingItemTable
                                    items={filteredTransactions}
                                />

                            </Box>

                        </Box>

                    </Box>

                </Box>


                {/* RIGHT 20% */}
                <Box
                    sx={{
                        width: "20%",
                        p: 1,
                        boxShadow: "md",
                        height: "85vh",
                        overflow: "hidden",
                    }}
                >

                    <Box
                        sx={{
                            height: "100%",
                            overflowY: "auto",
                            pr: 1,

                            "&::-webkit-scrollbar": {
                                width: 8,
                            },

                            "&::-webkit-scrollbar-thumb": {
                                bgcolor: "grey.400",
                                borderRadius: 10,
                            },
                        }}
                    >

                        <DietThermalBill
                            ref={thermalBillRef}
                            patient={patient}
                            summary={summary}

                            dietBills={
                                thermalBills.diet
                            }

                            extraBills={
                                thermalBills.extra
                            }

                            bystanderBills={
                                thermalBills.bystander
                            }
                        />

                    </Box>

                </Box>

            </Box>

        </Box>
    );
};

export default DietBillingDetail;