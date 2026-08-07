import React, { memo } from "react";
import { Box } from "@mui/material";
import { format } from "date-fns";

const tdLabel = {
    fontWeight: 800,
    width: "15%",
    // padding: "3px 1px",
    verticalAlign: "top",
    fontSize: 10,
};

const tdValue = {
    width: "35%",
    // padding: "3px 2px",
    verticalAlign: "top",
    fontSize: 11,
    fontWeight: 600,
};

const DietBillPatientInfo = ({ patient = {} }) => {

    const address = [
        patient?.fb_ptc_loadd1,
        patient?.fb_ptc_loadd2,
        patient?.fb_ptc_loadd3,
        patient?.fb_ptc_loadd4,
    ]
        .filter(Boolean)
        .join(", ");

    return (
        <Box
            sx={{
                mt: 1,
                mb: 2,
                borderTop: "1px solid #767575",
                borderBottom: "1px solid #767575",
                py: 1,
            }}
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontFamily: "Arial",
                    fontSize: "11px",
                }}
            >
                <tbody>

                    <tr>
                        <td style={tdLabel}>Patient UID</td>
                        <td style={tdValue}>
                            : {patient.patient_id || "-"}
                        </td>

                        <td style={tdLabel}>Bill Date</td>
                        <td style={tdValue}>
                            : {format(new Date(), "dd-MMM-yyyy")}
                        </td>
                    </tr>

                    <tr>
                        <td style={tdLabel}>Patient Name</td>
                        <td style={tdValue}>
                            : {patient.patient_name || "-"}
                        </td>

                        <td style={tdLabel}>Admission No</td>
                        <td style={tdValue}>
                            : {patient.admission_id || "-"}
                        </td>
                    </tr>

                    <tr>
                        <td style={tdLabel}>Age / Gender</td>
                        <td style={tdValue}>
                            : {patient.age_year || "-"} Years /{" "}
                            {patient.gender || "-"}
                        </td>

                        <td style={tdLabel}>Admission Date</td>
                        <td style={tdValue}>
                            : {patient.admission_date || "-"}
                        </td>
                    </tr>

                    <tr>
                        <td style={tdLabel}>Ward </td>
                        <td style={tdValue}>
                            : {patient.nursing_station || "-"}

                        </td>

                        <td style={tdLabel}>Discharge Date</td>
                        <td style={tdValue}>
                            : {patient.discharge_date || "-"}
                        </td>
                    </tr>

                    <tr>
                        <td style={tdLabel}> Bed</td>
                        <td style={tdValue}>

                            : {patient.bed_no || "-"}
                        </td>
                        <td style={tdLabel}>Mobile</td>
                        <td style={tdValue}>
                            : {patient.mobile || "-"}
                        </td>

                    </tr>

                    <tr>
                        <td style={tdLabel}>Address</td>

                        <td
                            colSpan={3}
                            style={{
                                padding: "3px 2px",
                                verticalAlign: "top",
                                fontSize: 11,
                                fontWeight: 600,
                            }}
                        >
                            : {address || "-"}
                        </td>
                    </tr>
                </tbody>
            </table>
        </Box>
    );
};

export default memo(DietBillPatientInfo);