
import React, { useCallback, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BillingPatientDetail from "./BillingPatientDetail";
import BillingItemTable from "./BillingItemTable";
import DietThermalBill from "./DietThermalBill";

import KotItemHeader from "../../KotItemList/KotItemHeader";

import {
    useBystanderBillDetails,
    usePatientDetail,
    usePatientDietBillDetails,
    usePatientExtraOrderBills,
    // usePatientFullDeliveryDetails,
    usePatientSimpleSummary,
    usePatientTransactions
} from "../../CommonData/UseQuery";
import BillingSummary from "./BillingSummary";
import useThermalPrint from "../DischargeBillComponent/useThermalPrint";
import { prepareBillingPayload } from "../../CommonData/Common";
import { useSelector } from "react-redux";
import { axioslogin } from "src/views/Axios/Axios";
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";

const DietBillingDetail = () => {

    const { ptNo, ipNo } = useParams();

    const id = useSelector(state => {
        return state.LoginUserData.empid
    })

    const {
        thermalBillRef,
        printThermalBill,
    } = useThermalPrint();

    const navigate = useNavigate();

    const handleThermalPrint = () => {
        printThermalBill();
    };

    const [filter, setFilter] = useState("ALL");

    const { data: PatientFullDetail = [] } =
        usePatientDetail(ipNo, ptNo);

    const { data: patientSummary = [] } =
        usePatientSimpleSummary(ipNo, ptNo);


    const { data: patientTransactions = [] } =
        usePatientTransactions(ipNo, ptNo, 'PENDING');


    const { data: BystanderDetails = [] } =
        useBystanderBillDetails(ipNo, ptNo, 'PENDING');

    const { data: PatienDietBills = [] } =
        usePatientDietBillDetails(ipNo, ptNo, 'PENDING');

    const { data: patientExraFOod = [] } =
        usePatientExtraOrderBills(ipNo, ptNo, 'PENDING');

    const Patient = PatientFullDetail?.[0] ?? {};
    const Summary = patientSummary?.[0] ?? {};

    // Counts
    const counts = useMemo(() => ({
        diet: PatienDietBills.length,
        extra: patientExraFOod.length,
        bystander: BystanderDetails.length,
        total:
            PatienDietBills.length +
            patientExraFOod.length +
            BystanderDetails.length,
    }), [
        PatienDietBills,
        patientExraFOod,
        BystanderDetails,
    ]);



    // Billing table
    const filteredTransactions = useMemo(() => {
        switch (filter) {
            case "DIET":
                return patientTransactions.filter(
                    x => x.billing_type === "DIET_ORDER"
                );
            case "EXTRA":
                return patientTransactions.filter(
                    x => x.billing_type === "EXTRA_ORDER"
                );
            case "BYSTANDER":
                return patientTransactions.filter(
                    x =>
                        x.party === "BYSTANDER" ||
                        x.billing_type === "PATIENT_CANTEEN_ORDER"
                );
            default:
                return patientTransactions;
        }

    }, [filter, patientTransactions]);


    const handleGeneratePatientBill = useCallback(async () => {
        const payload = prepareBillingPayload({
            patient: Patient,
            items: filteredTransactions,
            createdBy: id,
        });
        try {
            const response = await axioslogin.post("/dietdelivery/billing/create", payload)
            const { success, message } = response?.data ?? {};
            if (success !== 1) return warningNotify(message || "Error in Inserting the Patient Bill Details!")
            succesNotify(message || "Successfully Generated Bill")
        } catch (error) {
            errorNotify("Billing Creation Failed:")
            console.error(
                "Billing Creation Failed:",
                error
            );
        }
    }, [
        Patient,
        filteredTransactions,
        id
    ]);

    const handlePdfPrint = (printType) => {
        navigate(`/Home/diet/print/${ptNo}/${ipNo}`, {
            state: {
                patient: Patient,
                summary: Summary,
                dietBills: thermalDietBills,
                extraBills: thermalExtraBills,
                bystanderBills: thermalBystanderBills,
                filter,
                printType,
            },
        });

    };



    // Thermal bill

    const thermalDietBills = useMemo(() => {

        return filter === "ALL" || filter === "DIET"
            ? PatienDietBills
            : [];

    }, [filter, PatienDietBills]);

    const thermalExtraBills = useMemo(() => {

        return filter === "ALL" || filter === "EXTRA"
            ? patientExraFOod
            : [];

    }, [filter, patientExraFOod]);

    const thermalBystanderBills = useMemo(() => {

        return filter === "ALL" || filter === "BYSTANDER"
            ? BystanderDetails
            : [];

    }, [filter, BystanderDetails]);

    return (

        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                height: '90vh'
            }}
        >

            <KotItemHeader name="BILLING DETAIL" />

            <Box sx={{
                display: "flex",
                width: "100%",
                gap: 2,
                p: 1,
            }}>
                <Box
                    sx={{
                        width: "80%",
                        gap: 2
                    }}>

                    <BillingSummary
                        summary={Summary}
                    />

                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        p: 1
                    }}>

                        <Box
                            sx={{
                                width: "25%"
                            }}>
                            <BillingPatientDetail
                                patient={Patient}
                                filter={filter}
                                onFilterChange={setFilter}
                                dietCount={counts.diet}
                                extraCount={counts.extra}
                                bystanderCount={counts.bystander}
                                onPdfPrint={handlePdfPrint}
                                onThermalPrint={handleThermalPrint}
                                onGeneratePatientBill={handleGeneratePatientBill}

                            />
                        </Box>

                        <Box
                            sx={{
                                width: "75%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                height: "calc(100vh - 350px)", // adjust as needed
                                overflow: "hidden",
                            }} >
                            <Box
                                sx={{
                                    flex: 1,
                                    overflowY: "auto",
                                    pr: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,

                                    "&::-webkit-scrollbar": {
                                        width: 8,
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        bgcolor: "grey.400",
                                        borderRadius: 10,
                                    },
                                }} >
                                {/* <BillingDeliveryTable
                                    details={filteredDelivery}
                                /> */}
                                <BillingItemTable
                                    items={filteredTransactions}
                                />

                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "20%",
                        gap: 2,
                        p: 1,
                        boxShadow: 'md',
                        height: "85vh",
                        overflow: "hidden",
                    }}>
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            pr: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,

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
                            patient={Patient}
                            summary={Summary}
                            dietBills={thermalDietBills}
                            extraBills={thermalExtraBills}
                            bystanderBills={thermalBystanderBills}
                        />



                    </Box>
                </Box>
            </Box>
        </Box>

    );

};

export default DietBillingDetail;