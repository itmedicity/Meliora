
import React, { memo, useCallback, useState } from "react";
import {
    Box,
    Card,
    Typography,
    Input,
    Button,
} from "@mui/joy";

import { warningNotify, } from "../Common/CommonCode";
import { axiosellider } from "../Axios/Axios";
import AbhaPatientDetails from "./AbhaPatientDetails";

const BillNoSearch = ({ PatDetails, setPatDetails }) => {
    const [searchData, setSearchData] = useState({
        billNumber: "",
        billDate: "",
    });

    const handleChange = (field) => (event) => {
        setSearchData((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" }).toUpperCase();
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const handleSearch = useCallback(async () => {
        const payload = {
            billNumber: searchData.billNumber,
            billDate: formatDate(searchData.billDate),
        };
        const response = await axiosellider.post('/admission/getPatientDetailsByBillNo', payload)
        const { success, data } = response.data;

        if (success === 1) {
            setPatDetails(data[0]);
        } else {
            warningNotify("Please Enter Correct Bill Number!");
            setPatDetails({});
            return null;
        }
    }, [searchData, setPatDetails])

    return (
        <Box
            sx={{
                minHeight: "100vh",
                p: { xs: 1, sm: 2, md: 3 },
                background:
                    "radial-gradient(circle at top left, rgba(124,81,161,.15), transparent 30%), radial-gradient(circle at top right, rgba(59,130,246,.12), transparent 30%), #F8FAFC",
            }}
        >
            <Card
                sx={{
                    mb: 2,
                    borderRadius: "16px",
                    border: "1px solid #E2E8F0",
                    background: "linear-gradient(180deg,#FFFFFF,#F8FAFC)",
                    boxShadow: "0 4px 20px rgba(15,23,42,0.08)",
                    p: {
                        xs: 1.5,
                        sm: 2,
                        md: 3,
                    },
                }}
            >
                <Typography
                    level="h3"
                    sx={{
                        mb: 2,
                        color: "#0F4C81",
                        fontWeight: 700,
                        fontSize: {
                            xs: "1.2rem",
                            sm: "1.4rem",
                            md: "1.7rem",
                        },
                    }}
                >
                    Bill Search
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: 2,
                    }}
                >
                    {/* Bill Number */}
                    <Box>
                        <Typography
                            level="body-sm"
                            sx={{
                                mb: 0.5,
                                fontWeight: 600,
                                color: "text.secondary",
                            }}
                        >
                            Bill Number
                        </Typography>

                        <Input
                            size="md"
                            placeholder="Enter Bill Number"
                            value={searchData.billNumber}
                            onChange={handleChange("billNumber")}
                            sx={{
                                width: "100%",
                            }}
                        />
                    </Box>

                    {/* Bill Date */}
                    <Box>
                        <Typography
                            level="body-sm"
                            sx={{
                                mb: 0.5,
                                fontWeight: 600,
                                color: "text.secondary",
                            }}
                        >
                            Bill Date
                        </Typography>

                        <Input
                            size="md"
                            type="date"
                            value={searchData.billDate}
                            onChange={handleChange("billDate")}
                            sx={{
                                width: "100%",
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: 1,
                        display: "flex",
                        justifyContent: {
                            xs: "stretch",
                            sm: "flex-end",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                        }}
                    >
                        <Button
                            onClick={handleSearch}
                            size="md"
                            sx={{
                                width: "100%",
                                maxWidth: {
                                    xs: "140px",
                                    sm: "160px",
                                    md: "180px",
                                },
                                borderRadius: "55px",
                                fontWeight: 600,
                                backgroundColor: "#916EB1",
                                "&:hover": {
                                    backgroundColor: "#7f5ca0",
                                },
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
            </Card>
            {PatDetails?.PT_NO && (
                <AbhaPatientDetails
                    key={PatDetails?.PT_NO}
                    PatDetails={PatDetails}
                    setPatDetails={setPatDetails}
                    name={PatDetails?.PTC_NAME}
                    mobile={PatDetails?.BMC_MOBILENO}
                    email={PatDetails?.BMC_EMAIL}
                    address1={PatDetails?.BMC_LOADD1}
                    address2={PatDetails?.BMC_LOADD2}
                    extraVerifyParams={{
                        billNo: searchData?.billNumber,
                        bmc_slno: PatDetails?.BMC_SLNO
                    }}
                    updateEndpoint="/admission/updateDataUsingBillNumber"
                />
            )}
        </Box>
    );
};

export default memo(BillNoSearch);


