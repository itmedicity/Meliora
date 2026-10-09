import React, { memo, useState } from "react";
import {
    Box,
    Typography,
    Avatar,
    Chip,
    Input,
    Textarea,
    Button,
} from "@mui/joy";

import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MoneyIcon from '@mui/icons-material/Money';

import { axioslogin } from "src/views/Axios/Axios";
import {
    errorNotify,
    succesNotify
} from "src/views/Common/CommonCode";

import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import DietTextComponent from "../../DietComponent/DietTextComponent";

import BusinessIcon from "@mui/icons-material/Business";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkIcon from "@mui/icons-material/Work";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { usePettyCashDetails } from "../../CommonData/UseQuery";


const EmployeeCard = ({
    employee,
    onfinish
}) => {

    const queryClient = useQueryClient();

    const { data: PettyCashDetail = [] } = usePettyCashDetails(employee?.employee_id, "ISSUED");

    const UserPettyCash = PettyCashDetail?.pending_petty_cash;

    const givenBy = useSelector(
        state => state.LoginUserData.empid
    );
    const [amount, setAmount] = useState("");
    const [remarks, setRemarks] = useState("");
    const [loading, setLoading] = useState(false);

    if (!employee) return null;

    /*
    
    */

    const handleIssuePettyCash = async () => {
        const cashAmount = Number(amount);

        if (!cashAmount || cashAmount <= 0) {
            return errorNotify(
                "Enter a valid petty cash amount"
            );
        }

        const payload = {
            employee_id: employee.employee_id,
            given_by: givenBy,
            amount: cashAmount,
            remarks: remarks.trim()
        };

        try {

            setLoading(true);

            const response =
                await axioslogin.post(
                    "/cashclosing/assign-pettycash",
                    payload
                );

            const {
                success,
                message
            } = response?.data ?? {};


            if (success !== 1) {
                return errorNotify(
                    message ||
                    "Error in issuing petty cash"
                );
            }


            succesNotify(
                message ||
                "Petty cash issued successfully"
            );


            /*
            ==================================
            REFRESH PETTY CASH DATA
            ==================================
            */

            await queryClient.invalidateQueries({
                queryKey: ["employee-petty-cash"]
            });


            /*
            ==================================
            RESET FORM
            ==================================
            */

            setAmount("");
            setRemarks("");
            onfinish()

        } catch (error) {

            console.error(
                "Petty cash assignment failed:",
                error
            );

            errorNotify(
                "Error in issuing petty cash"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <Box
            sx={{
                mt: 1.5,
                border: "1px solid #e5dce9",
                borderRadius: "10px",
                bgcolor: "#fff",
                overflow: "hidden",
                display: 'flex',
                width: '100%'

            }}>
            <Box
                sx={{
                    width: "30%",
                    minWidth: 280,
                    px: 1.5,
                    py: 1.3,
                    bgcolor: "#faf8fc",
                    borderRight: "1px solid #eee8f1",
                    boxSizing: "border-box"
                }}>

                {/* EMPLOYEE HEADER*/}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.1
                    }} >

                    <Avatar
                        sx={{
                            width: 42,
                            height: 42,
                            bgcolor: "#7c51a1",
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 700,
                            flexShrink: 0
                        }}
                    >
                        {employee?.employee_name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </Avatar>


                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0
                        }}
                    >

                        <Typography
                            level="title-sm"
                            sx={{
                                fontWeight: 700,
                                color: "#33283a",
                                fontSize: 15,
                                lineHeight: 1.2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {employee?.employee_name}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 0.25,
                                fontSize: 9,
                                fontWeight: 600,
                                color: "#918693"
                            }}
                        >
                            Employee No: {employee?.employee_no}
                        </Typography>

                    </Box>


                    <Chip
                        size="sm"
                        variant="soft"
                        sx={{
                            bgcolor: "#e9f6ed",
                            color: "#2e7d46",
                            fontSize: 9,
                            fontWeight: 700,
                            borderRadius: "5px",
                            px: 0.8,
                            flexShrink: 0
                        }}
                    >
                        ACTIVE
                    </Chip>

                </Box>


                {/*  EMPLOYEE DETAILS */}

                <Box
                    sx={{
                        mt: 1.3,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.65
                    }}
                >

                    {/* DEPARTMENT */}

                    <EmployeeInfoRow
                        icon={<BusinessIcon />}
                        value={employee?.department_name}
                    />


                    {/* SECTION */}

                    <EmployeeInfoRow
                        icon={<ApartmentIcon />}
                        value={employee?.section_name}
                    />


                    {/* DESIGNATION */}

                    <EmployeeInfoRow
                        icon={<WorkIcon />}
                        value={employee?.designation_name}
                    />


                    {/* GENDER */}

                    <EmployeeInfoRow
                        icon={<PersonOutlineIcon />}
                        value={
                            Number(employee?.gender) === 1
                                ? "MALE"
                                : "FEMALE"
                        }
                    />


                    {/* MOBILE */}

                    <EmployeeInfoRow
                        icon={<PhoneIcon />}
                        value={employee?.mobile}
                    />


                    {/* EMAIL */}

                    <EmployeeInfoRow
                        icon={<EmailIcon />}
                        value={employee?.email}
                    />

                </Box>

            </Box>



            {/* PETTY CASH SECTION */}
            <Box
                sx={{
                    borderTop: "1px solid #eee8f1",
                    bgcolor: "#fcfbfd",
                    width: '70%'
                }} >

                {/* PETTY CASH HEADER */}

                <Box
                    sx={{
                        px: 1.5,
                        py: 1.1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between"
                    }}>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,

                        }}
                    >

                        <Box
                            sx={{
                                width: 30,
                                height: 30,
                                borderRadius: "7px",
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "center",
                                bgcolor: "#eee6f4",
                                color: "#7c51a1"
                            }}
                        >
                            <PaymentsOutlinedIcon
                                sx={{
                                    fontSize: 17
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                level="body-sm"
                                sx={{
                                    fontWeight: 700,
                                    color:
                                        "#403746"
                                }}
                            >
                                ISSUE PETTY CASH
                            </Typography>
                            <Typography
                                level="body-xs"
                                sx={{
                                    fontSize: 9,
                                    color:
                                        "#968b9a"
                                }}
                            >
                                Delivery cash allocation
                            </Typography>

                        </Box>
                    </Box>

                    <Box>
                        <Box sx={{
                            display: "flex",
                            gap: 1,
                            alignItems: 'flex-end',
                            bgcolor: "#feebff",
                            borderRadius: 5,
                            p: 1
                        }}>
                            <Box
                                sx={{
                                    width: 30,
                                    height: 30,
                                    borderRadius: "7px",
                                    display: "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    bgcolor: "#eee6f4",
                                    color: "#7c51a1"
                                }}
                            >
                                <MoneyIcon
                                    sx={{
                                        fontSize: 17
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: 9,
                                        color:
                                            "#403746"
                                    }}>
                                    PETTY CASH
                                </Typography>
                                <Typography
                                    level="body-xs"
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: 900,
                                        color:
                                            "#000000"
                                    }}
                                >
                                    {UserPettyCash || '-'}
                                </Typography>

                            </Box>

                        </Box>
                    </Box>
                </Box>
                {/*   ISSUE CASH FORM */}






                <Box
                    sx={{
                        p: 1.5
                    }}
                >

                    <Box>
                        <Box>

                            <Typography
                                level="body-xs"
                                sx={{
                                    mb: 0.5,
                                    color:
                                        "#807582",
                                    fontSize: 10
                                }}
                            >
                                Amount
                            </Typography>

                            <Input
                                size="sm"
                                type="number"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value
                                    )
                                }
                                placeholder="0.00"
                                startDecorator={
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color:
                                                "#7c51a1"
                                        }}
                                    >
                                        ₹
                                    </Typography>
                                }
                                slotProps={{
                                    input: {
                                        min: 0,
                                        step: "0.01",
                                        inputMode:
                                            "decimal"
                                    }
                                }}
                                sx={{
                                    "--Input-focusedThickness":
                                        "1px",
                                    "--Input-focusedHighlight":
                                        "#7c51a1",
                                    fontSize: 13,
                                    fontWeight: 600
                                }}
                            />

                        </Box>

                        {/* REMARKS */}

                        <Box sx={{ mb: 2 }}>

                            <Typography
                                level="body-xs"
                                sx={{
                                    mb: 0.5,
                                    color:
                                        "#807582",
                                    fontSize: 10
                                }}
                            >
                                Remarks
                            </Typography>

                            <Textarea
                                size="sm"
                                minRows={2}
                                maxRows={3}
                                value={remarks}
                                onChange={(e) =>
                                    setRemarks(
                                        e.target.value
                                    )
                                }
                                placeholder="Optional note..."
                                sx={{
                                    fontSize: 12,
                                    fontFamily: 'Bahnschrift'
                                }}
                            />

                        </Box>


                        {/* ISSUE BUTTON */}

                        <Button
                            size="sm"
                            loading={loading}
                            disabled={
                                !amount ||
                                Number(amount) <= 0
                            }
                            onClick={
                                handleIssuePettyCash
                            }
                            startDecorator={
                                !loading && (
                                    <CheckCircleOutlineIcon
                                        sx={{
                                            fontSize: 16
                                        }}
                                    />
                                )
                            }
                            sx={{
                                minWidth: 120,
                                height: 36,
                                bgcolor:
                                    "#7c51a1",
                                fontSize: 11,
                                fontWeight: 700,

                                "&:hover": {
                                    bgcolor:
                                        "#69438a"
                                }
                            }}
                        >
                            Issue Cash
                        </Button>

                    </Box>

                </Box>

            </Box>

        </Box>
    );
};


const EmployeeInfoRow = ({
    icon,
    value
}) => {

    if (!value) return null;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                minWidth: 0
            }}
        >

            {/* ICON */}

            <Box
                sx={{
                    width: 22,
                    height: 22,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                    bgcolor: "#eee7f3",
                    color: "#0b0b0b",

                    "& svg": {
                        fontSize: 13
                    }
                }}
            >
                {icon}
            </Box>


            {/* TEXT */}

            <Box
                sx={{
                    minWidth: 0,
                    flex: 1
                }}
            >
                <DietTextComponent
                    value={value}
                    size={11}
                    weight={800}
                    color="#4a0853"
                />
            </Box>

        </Box>
    );
};




export default memo(EmployeeCard);