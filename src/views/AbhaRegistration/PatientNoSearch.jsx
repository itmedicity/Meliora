
import React, { memo, useCallback, useState } from "react";
import {
    Box,
    Card,
    Typography,
} from "@mui/joy";

import { warningNotify, } from "../Common/CommonCode";
import { getFamilyDetails, } from "../IncidentManagement/CommonComponent/CommonFun";
import AbhaPatientSearch from "./AbhaPatientSearch";
import AbhaPatientDetails from "./AbhaPatientDetails";

const PatientNoSearch = ({ PatDetails, setPatDetails }) => {
    const [searchkeyword, setSearchKeyword] = useState("");

    const formatMRD = (input) => {
        if (!input) return "";

        const value = input.trim();

        const [prefix, numberPart] = value.split("-");

        if (!prefix || !numberPart) return value;

        const paddedNumber = numberPart.padStart(8, "0");

        return `${prefix}-${paddedNumber}`;
    };

    const HandleSearchDetail = useCallback(async () => {
        if (!searchkeyword?.trim()) {
            return warningNotify("Please enter MRD Number");
        }

        const formattedKeyword = formatMRD(searchkeyword);

        const result = await getFamilyDetails(formattedKeyword);

        if (result?.length > 0) {
            setPatDetails(result[0]);
        } else {
            setPatDetails({});
            warningNotify("Patient not found");
        }
    }, [searchkeyword, setPatDetails]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: { xs: 1, sm: 2, md: 3 },
                background:
                    "radial-gradient(circle at top left, rgba(124,81,161,.15), transparent 30%), radial-gradient(circle at top right, rgba(59,130,246,.12), transparent 30%), #F8FAFC",
            }}
        >
            {/* SEARCH */}
            <Card
                sx={{
                    mb: 2,
                    borderRadius: "20px",
                    border: "1px solid #E2E8F0",
                    background:
                        "linear-gradient(180deg,#FFFFFF,#F8FAFC)",
                    boxShadow:
                        "0 8px 30px rgba(15,23,42,0.08)",
                    p: { xs: 2, sm: 3 },
                }}
            >
                <Typography
                    level="h3"
                    sx={{
                        mb: 2,
                        color: "#0F4C81",
                        fontWeight: 800,
                    }}
                >
                    Patient Search
                </Typography>

                <AbhaPatientSearch
                    value={searchkeyword}
                    onChange={setSearchKeyword}
                    onClick={HandleSearchDetail}
                    placeholder="Enter MRD Number"
                />
            </Card>

            {/* PATIENT DETAILS */}
            {PatDetails?.PT_NO && (
                <AbhaPatientDetails
                    key={PatDetails?.PT_NO}
                    PatDetails={PatDetails}
                    setPatDetails={setPatDetails}
                    name={PatDetails?.PTC_PTNAME}
                    mobile={PatDetails?.PTC_MOBILE}
                    email={PatDetails?.PTC_EMAIL}
                    address1={PatDetails?.PTC_LOADD1}
                    address2={PatDetails?.PTC_LOADD2}
                    updateEndpoint="/admission/updateDataUsingMrdNumber"
                />
            )}
        </Box>
    );
};

export default memo(PatientNoSearch);



