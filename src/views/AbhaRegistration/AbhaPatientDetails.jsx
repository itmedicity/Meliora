import React, { memo, useCallback, useState, useRef } from "react";
import {
    Box,
    Card,
    Typography,
    Sheet,
    Avatar,
    Input,
    Checkbox,
    Button,
} from "@mui/joy";

import DOMPurify from "dompurify";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { succesNotify, warningNotify, } from "../Common/CommonCode";
import { axiosellider, axioslogin } from "../Axios/Axios";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";

const InfoRow = ({ icon, label, value }) => (
    <Box
        sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            py: 2,
            borderBottom: "1px solid #F1F5F9",
            "&:last-child": { borderBottom: "none" },
        }}
    >
        <Avatar sx={{ bgcolor: "#EEF2FF", color: "#4F46E5" }}>
            {icon}
        </Avatar>

        <Box sx={{ minWidth: 0 }}>
            <Typography level="body-xs" sx={{ color: "#94A3B8" }}>
                {label}
            </Typography>

            <Typography sx={{ fontWeight: 700, color: "#0F172A" }}>
                {value || "Not Available"}
            </Typography>
        </Box>
    </Box>
);

const AbhaPatientDetails = ({
    PatDetails,
    setPatDetails,
    name,
    mobile,
    email,
    address1,
    address2,
    extraVerifyParams = {},
    updateEndpoint
}) => {
    const [sameAsMobile, setSameAsMobile] = useState(false);
    const [sameAsEmail, setSameAsEmail] = useState(false);

    const [newMobile, setNewMobile] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [openOtpModal, setOpenOtpModal] = useState(false);
    const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);

    const handleOtpChange = (index, rawValue) => {
        const value = rawValue.slice(-1);
        if (value && !/^\d$/.test(value)) {
            return;
        }

        const newOtpValues = [...otpValues];
        newOtpValues[index] = value;
        setOtpValues(newOtpValues);

        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (!otpValues[index] && index > 0) {
                const newOtpValues = [...otpValues];
                newOtpValues[index - 1] = "";
                setOtpValues(newOtpValues);
                inputRefs.current[index - 1].focus();
            } else {
                const newOtpValues = [...otpValues];
                newOtpValues[index] = "";
                setOtpValues(newOtpValues);
            }
        }
    };

    const handleOtpPaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text");
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("");
            setOtpValues(digits);
            inputRefs.current[5].focus();
        }
    };

    const handleCopyField = (
        checked,
        setChecked,
        setValue,
        sourceValue
    ) => {
        setChecked(checked);
        setValue(checked ? sourceValue || "" : "");
    };

    const isValidOTPMobileNumber = (mobileNum) => {
        const regex = /^\d{10}$/;
        return regex.test(mobileNum);
    };

    // const isValidEmail = (emailVal) => {
    //     const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     return regex.test(emailVal);
    // };

    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
    };

    const handleSave = useCallback(async () => {
        if (!newMobile?.trim()) {
            return warningNotify("Please enter mobile number");
        }
        const sanitizedMobileNumber = sanitizeInput(newMobile);

        if (!isValidOTPMobileNumber(sanitizedMobileNumber)) {
            return warningNotify("Mobile number must be exactly 10 digits");
        }

        // if (newEmail?.trim()) {
        //     const sanitizedEmail = sanitizeInput(newEmail);
        //     if (!isValidEmail(sanitizedEmail)) {
        //         return warningNotify("Please enter a valid email address");
        //     }
        // }

        const obj = {
            mobileNumber: sanitizedMobileNumber,
            mrdNo: PatDetails?.PT_NO
        };
        const response = await axioslogin.post('/ElliderUpdation/OTPGenerate', obj);
        const { message, success } = response.data;
        if (success === 2) {
            succesNotify(message);
            setOpenOtpModal(true);
        } else {
            warningNotify(message);
        }
    }, [newMobile, PatDetails]);

    const handleVerifyOTP = useCallback(async () => {
        const otpCode = otpValues.join("");
        if (otpCode.length < 6) {
            return warningNotify("Please enter all 6 digits of the OTP");
        }
        const obj = {
            mrdNo: PatDetails?.PT_NO,
            mobileNumber: newMobile,
            newEmail: newEmail,
            otp: otpCode,
            ...extraVerifyParams
        };

        try {
            const result = await axioslogin.post(
                "/ElliderUpdation/VerifyOTP",
                obj
            );

            const { success, message } = result.data;

            if (success === 2) {
                const response2 = await axiosellider.post(updateEndpoint, obj);
                const { succ } = response2.data;
                if (succ === 1) {
                    succesNotify("Data Updated");
                    setOpenOtpModal(false);
                    setOtpValues(["", "", "", "", "", ""]);
                    setPatDetails({});
                } else {
                    warningNotify(message);
                }
            } else {
                warningNotify(message);
            }
        } catch (error) {
            warningNotify("OTP verification failed");
        }
    }, [otpValues, PatDetails, newMobile, newEmail, setPatDetails, extraVerifyParams, updateEndpoint]);

    const glassCard = {
        p: { xs: 2, sm: 3 },
        borderRadius: "20px",
        background: "rgba(255,255,255,0.9)",
        backdropFilter: "blur(10px)",
        border: "1px solid #E2E8F0",
        boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
        transition: "0.3s",
        "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 20px 40px rgba(15,23,42,0.12)",
        },
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
            }}
        >
            {/* HEADER CARD */}
            <Card sx={{ borderRadius: 3 }}>
                <Box
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        borderRadius: 5,
                        background: "linear-gradient(135deg,#9B7BB8,#7C51A1,#5F3B84)",
                        p: { xs: 1, sm: 1, md: 2 },
                        boxShadow: "0 20px 50px rgba(91,63,153,0.35)",
                    }}
                >
                    {/* Decorative Circles */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: -80,
                            right: -50,
                            width: { xs: 140, md: 220 },
                            height: { xs: 140, md: 220 },
                            borderRadius: "50%",
                            bgcolor: "rgba(255,255,255,0.08)",
                        }}
                    />

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: -70,
                            left: -40,
                            width: { xs: 100, md: 180 },
                            height: { xs: 100, md: 180 },
                            borderRadius: "50%",
                            bgcolor: "rgba(255,255,255,0.05)",
                        }}
                    />

                    <Box
                        sx={{
                            position: "relative",
                            zIndex: 2,
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                md: "row",
                            },
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "center",
                                md: "center",
                            },
                            gap: 1,
                        }}
                    >
                        {/* Patient Info */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                },
                                alignItems: "center",
                                textAlign: {
                                    xs: "center",
                                    sm: "left",
                                },
                                gap: 2,
                                width: "100%",
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: {
                                        xs: 70,
                                        sm: 85,
                                        md: 100,
                                    },
                                    height: {
                                        xs: 70,
                                        sm: 85,
                                        md: 100,
                                    },
                                    bgcolor: "rgba(255,255,255,0.15)",
                                    backdropFilter: "blur(20px)",
                                    border: "4px solid rgba(255,255,255,0.25)",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                                }}
                            >
                                <PersonIcon
                                    sx={{
                                        fontSize: {
                                            xs: 35,
                                            md: 55,
                                        },
                                        color: "#fff",
                                    }}
                                />
                            </Avatar>

                            <Box
                                sx={{
                                    minWidth: 0,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 800,
                                        fontSize: {
                                            xs: "1.3rem",
                                            sm: "1.8rem",
                                            md: "2.2rem",
                                        },
                                        lineHeight: 1.1,
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {name}
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.75)",
                                        mt: 1,
                                        fontSize: {
                                            xs: "0.75rem",
                                            md: "0.95rem",
                                        },
                                        letterSpacing: 1,
                                    }}
                                >
                                    PATIENT ID
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "1rem",
                                            md: "1.15rem",
                                        },
                                    }}
                                >
                                    {PatDetails?.PT_NO}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Stats */}
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "repeat(2,1fr)",
                                    sm: "repeat(2,120px)",
                                },
                                gap: 1.5,
                                width: {
                                    xs: "100%",
                                    md: "auto",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: "rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.7)",
                                        fontSize: 11,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Gender
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "1rem",
                                            md: "1.2rem",
                                        },
                                    }}
                                >
                                    {PatDetails?.PTC_SEX}
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    borderRadius: 3,
                                    bgcolor: "rgba(255,255,255,0.12)",
                                    backdropFilter: "blur(20px)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    textAlign: "center",
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.7)",
                                        fontSize: 11,
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Age
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: {
                                            xs: "1rem",
                                            md: "1.2rem",
                                        },
                                    }}
                                >
                                    {PatDetails?.PTN_YEARAGE}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: 2,
                            background: "linear-gradient(90deg,#fff,#D7C7FF,#fff)",
                            opacity: 0.8,
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: 3,
                    }}
                >
                    <Sheet sx={glassCard}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Contact
                        </Typography>

                        <InfoRow
                            icon={<PhoneIcon />}
                            label="Mobile"
                            value={mobile}
                        />

                        <InfoRow
                            icon={<EmailIcon />}
                            label="Email"
                            value={email}
                        />
                    </Sheet>

                    <Sheet sx={glassCard}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Address
                        </Typography>

                        <InfoRow
                            icon={<HomeIcon />}
                            label="Address 1"
                            value={address1}
                        />

                        <InfoRow
                            icon={<HomeIcon />}
                            label="Address 2"
                            value={address2}
                        />
                    </Sheet>

                    {/* MOBILE UPDATE */}
                    <Sheet sx={glassCard}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Mobile Number
                        </Typography>

                        <Checkbox
                            label="Copy existing mobile"
                            checked={sameAsMobile}
                            onChange={(e) =>
                                handleCopyField(
                                    e.target.checked,
                                    setSameAsMobile,
                                    setNewMobile,
                                    mobile
                                )
                            }
                        />

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                },
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <Input
                                readOnly
                                value={mobile || ""}
                            />

                            <Input
                                value={newMobile}
                                disabled={sameAsMobile}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (/^\d*$/.test(val) && val.length <= 10) {
                                        setNewMobile(val);
                                    }
                                }}
                                placeholder="New mobile number"
                            />
                        </Box>
                    </Sheet>

                    {/* EMAIL UPDATE */}
                    <Sheet sx={glassCard}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                mb: 2,
                            }}
                        >
                            Email Address
                        </Typography>

                        <Checkbox
                            label="Copy existing email"
                            checked={sameAsEmail}
                            onChange={(e) =>
                                handleCopyField(
                                    e.target.checked,
                                    setSameAsEmail,
                                    setNewEmail,
                                    email
                                )
                            }
                        />

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                },
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <Input
                                readOnly
                                value={email || ""}
                            />

                            <Input
                                value={newEmail}
                                disabled={sameAsEmail}
                                onChange={(e) =>
                                    setNewEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="New email address"
                            />
                        </Box>
                    </Sheet>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        mt: 2
                    }}
                >
                    <Button
                        onClick={handleSave}
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
                        Save Changes
                    </Button>
                </Box>
            </Card>

            <Modal
                open={openOtpModal}
                onClose={() => setOpenOtpModal(false)}
            >
                <ModalDialog
                    variant="outlined"
                    sx={{
                        minWidth: 400,
                        borderRadius: "16px",
                        p: 3
                    }}
                >
                    <ModalClose />

                    <Typography
                        level="h4"
                        sx={{
                            mb: 1,
                            fontWeight: 700
                        }}
                    >
                        OTP Verification
                    </Typography>

                    <Typography
                        level="body-sm"
                        sx={{
                            mb: 1,
                            color: "text.secondary"
                        }}
                    >
                        Enter the OTP sent to
                        <strong> {newMobile}</strong>
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 1.5,
                            mb: 1,
                            mt: 1
                        }}
                    >
                        {otpValues.map((digit, idx) => (
                            <Input
                                key={idx}
                                autoFocus={idx === 0}
                                slotProps={{
                                    input: {
                                        ref: (el) => (inputRefs.current[idx] = el),
                                        style: {
                                            textAlign: "center",
                                            fontSize: "1.5rem",
                                            fontWeight: "bold",
                                            padding: 0,
                                        }
                                    }
                                }}
                                value={digit}
                                onChange={(e) => handleOtpChange(idx, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                                onPaste={handleOtpPaste}
                                sx={{
                                    width: { xs: "42px", sm: "48px", md: "52px" },
                                    height: { xs: "42px", sm: "48px", md: "52px" },
                                    borderRadius: "10px",
                                    border: "1.5px solid",
                                    borderColor: digit ? "#916EB1" : "#E2E8F0",
                                    boxShadow: digit ? "0 0 0 2px rgba(145, 110, 177, 0.2)" : "none",
                                    transition: "all 0.2s",
                                    "&:focus-within": {
                                        borderColor: "#916EB1",
                                        boxShadow: "0 0 0 3px rgba(145, 110, 177, 0.25)"
                                    }
                                }}
                            />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1
                        }}
                    >

                        <Button
                            onClick={() => {
                                setOpenOtpModal(false);
                                setOtpValues(["", "", "", "", "", ""]);
                            }}
                            size="md"
                            sx={{
                                width: "80%",
                                maxWidth: {
                                    xs: "140px",
                                    sm: "160px",
                                    md: "180px",
                                },
                                borderRadius: "55px",
                                fontWeight: 600,
                                backgroundColor: "#c6bfcb",
                                "&:hover": {
                                    backgroundColor: "#857590",
                                },
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={handleVerifyOTP}
                            size="md"
                            sx={{
                                width: "80%",
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
                            Save Changes
                        </Button>

                    </Box>
                </ModalDialog>
            </Modal>
        </Box>
    );
};

export default memo(AbhaPatientDetails);
