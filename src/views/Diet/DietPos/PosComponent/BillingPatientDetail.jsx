import React, { memo, useState } from "react";
import {
    Box,
    Paper,
    Tooltip,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import KingBedIcon from "@mui/icons-material/KingBed";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PrintIcon from "@mui/icons-material/Print";
import DietTextComponent from "../../DietComponent/DietTextComponent";
import BillCard from "./BillCard";
import BillPrintDialog from "./BillPrintDialog";
import ActionCard from "./ActionCard";

const Item = ({ title, icon, value }) => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
        }}
    >
        <Tooltip title={title} arrow>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    minWidth: 22,
                }}
            >
                {icon}
            </Box>
        </Tooltip>

        <DietTextComponent
            value={value || "-"}
            size={12}
            weight={600}
        />
    </Box>
);

const BillingPatientDetail = ({
    patient,
    filter = "ALL",
    onFilterChange = () => { },
    dietCount = 0,
    extraCount = 0,
    bystanderCount = 0,
    onPdfPrint = () => { },
    onThermalPrint = () => { },
    onGeneratePatientBill = () => { }
}) => {

    const [openPrintDialog, setOpenPrintDialog] = useState(false);

    const handlePrint = (printType) => {
        setOpenPrintDialog(false);
        onPdfPrint(printType);
    };

    const address = [
        patient?.fb_ptc_loadd1,
        patient?.fb_ptc_loadd2,
        patient?.fb_ptc_loadd3,
        patient?.fb_ptc_loadd4,
    ]
        .filter(Boolean)
        .join(", ");

    const total =
        dietCount +
        extraCount +
        bystanderCount;

    return (
        <Paper
            elevation={1}
            sx={{
                p: 2.5,
                borderRadius: 2,
            }}
        >
            <DietTextComponent
                value="PATIENT INFORMATION"
                size={10}
                weight={600}
            />

            <Box
                sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1
                    }}>
                        <PersonIcon fontSize="large" sx={{
                            color: '#7c30be'
                        }} />
                        <DietTextComponent
                            value={patient?.patient_name}
                            size={24}
                            weight={900}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: 1,
                        }}
                    >

                        <Item
                            title="Patient ID"
                            icon={<BadgeIcon fontSize="small" />}
                            value={patient?.patient_id}
                        />

                        <Item
                            title="Admission"
                            icon={<LocalHospitalIcon fontSize="small" />}
                            value={patient?.admission_id}
                        />

                        <Item
                            title="Gender"
                            icon={<WcIcon fontSize="small" />}
                            value={`${patient?.gender} • ${patient?.age_year}Y`}
                        />

                        <Item
                            title="Admission Date"
                            icon={<CalendarMonthIcon fontSize="small" />}
                            value={patient?.admission_date}
                        />

                        <Item
                            title="Mobile"
                            icon={<PhoneIcon fontSize="small" />}
                            value={patient?.mobile}
                        />

                        <Item
                            title="Bed"
                            icon={<KingBedIcon fontSize="small" />}
                            value={patient?.bed_no}
                        />
                    </Box>

                    <Box mt={1}>
                        <Item
                            title="Address"
                            icon={<LocationOnIcon fontSize="small" />}
                            value={address}
                        />
                    </Box>
                </Box>

                {/* Billing Overview */}

                <Box
                    sx={{
                        width: "100%",
                    }}
                >
                    <DietTextComponent
                        value="BILLING OVERVIEW"
                        size={15}
                        weight={700}
                    />

                    <Box
                        sx={{
                            mt: 1.5,
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            gap: 1.2,
                        }}
                    >
                        <BillCard
                            title="All"
                            count={total}
                            color="#1976d2"
                            selected={filter === "ALL"}
                            onClick={() => onFilterChange("ALL")}
                            icon={<ReceiptLongIcon />}
                        />

                        <BillCard
                            title="Diet"
                            count={dietCount}
                            color="#2e7d32"
                            selected={filter === "DIET"}
                            onClick={() => onFilterChange("DIET")}
                            icon={<RestaurantMenuIcon />}
                        />

                        <BillCard
                            title="Extra"
                            count={extraCount}
                            color="#ed6c02"
                            selected={filter === "EXTRA"}
                            onClick={() => onFilterChange("EXTRA")}
                            icon={<LunchDiningIcon />}
                        />

                        <BillCard
                            title="Bystander"
                            count={bystanderCount}
                            color="#0288d1"
                            selected={filter === "BYSTANDER"}
                            onClick={() => onFilterChange("BYSTANDER")}
                            icon={<RoomServiceIcon />}
                        />
                    </Box>
                </Box>
                {/* Print Options */}

                <Box
                    sx={{
                        width: "100%",
                        mt: 3,
                    }}
                >
                    <DietTextComponent
                        value="PRINT OPTIONS"
                        size={15}
                        weight={700}
                    />

                    <Box
                        sx={{
                            mt: 1.5,
                            display: "grid",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            gap: 1.2,
                        }}
                    >
                        <ActionCard
                            icon={ReceiptLongIcon}
                            title="Generate"
                            onClick={onGeneratePatientBill}
                            bgColor="#E8F5E9"
                            borderColor="#A5D6A7"
                            hoverColor="#C8E6C9"
                            iconColor="success.main"
                        />

                        <ActionCard
                            icon={PictureAsPdfIcon}
                            title="PDF"
                            onClick={() => setOpenPrintDialog(true)}
                            bgColor="#FFEBEE"
                            borderColor="#EF9A9A"
                            hoverColor="#FFCDD2"
                            iconColor="error.main"
                        />

                        <ActionCard
                            icon={PrintIcon}
                            title="Thermal"
                            onClick={onThermalPrint}
                            bgColor="#E3F2FD"
                            borderColor="#90CAF9"
                            hoverColor="#BBDEFB"
                            iconColor="primary.main"
                        />
                    </Box>
                </Box>

            </Box>
            <BillPrintDialog
                open={openPrintDialog}
                onClose={() => setOpenPrintDialog(false)}
                onPrint={handlePrint}
            />
        </Paper>
    );
};

export default memo(BillingPatientDetail);