import React from "react";
const { Box, Typography } = require("@mui/joy");
import { Business, CalendarMonth } from "@mui/icons-material";
import Section from "./Components/Section";
import Infocard from "./Components/Infocard";


export const ListRow = ({ children }) => (
    <Typography level="body-sm" sx={{ mb: 0.75 }}>
        {children}
    </Typography>
);

export const Empty = () => (
    <Typography level="body-sm" color="neutral">
        No data available
    </Typography>
);

export const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN") : "-";



export const actionBtn = bg => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    px: 3,
    py: 1.2,
    borderRadius: '999px',
    bgcolor: bg,
    color: 'white',
    fontWeight: 600,
    cursor: 'pointer',
})





export const InfoCards = ({ data }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mb: 3,
        }}
    >
        <Infocard
            icon={<Business />}
            label="Department"
            value={data.sec_name}
        />
        <Infocard
            icon={<CalendarMonth />}
            label="From Date"
            value={formatDate(data.wo_fromdate)}
        />
        <Infocard
            icon={<CalendarMonth />}
            label="To Date"
            value={formatDate(data.wo_todate)}
        />
    </Box>
);

export const DetailsSection = ({ icon, title, data = [], renderItem }) => (
    <Section icon={icon} title={title}>
        {data.length ? data.map(renderItem) : <Empty />}
    </Section>
);

export const ListSection = ({ icon, title, data = [] }) => (
    <Section icon={icon} title={title}>
        {data?.length ? (
            data?.map((t, i) => (
                <ListRow key={t.wot_slno || t.wop_slno || t.wob_slno}>
                    {i + 1}. {t.term_desc}
                </ListRow>
            ))
        ) : (
            <Empty />
        )}
    </Section>
);

export const inputStyle = {
    borderRadius: '10px',
    border: '1px solid #e5e7eb',
}

export const textareaStyle = {
    ...inputStyle,
    borderRadius: '12px',
}

export const fieldBox = {
    width: {
        xs: '100%',
        sm: '48%',
        md: '32%',
        lg: '15%',
    },
}

export const largeFieldBox = {
    width: {
        xs: '100%',
        md: '49%',
    },
}

export const nameFieldBox = {
    width: {
        xs: '100%',
        sm: '48%',
        md: '32%',
        lg: '40%',
    },
}

export const TAB_CONFIG = [
    { id: 1, label: 'ANNUAL MAINTANANCE CONTRACT' },
    { id: 2, label: 'COMPREHENSIVE MAINTANANCE CONTRACT' },
    { id: 3, label: 'RATE CONTRACT' },
]


export const validateVendorDetails = (draftData) => {
    const vd = draftData?.vendorDetails || {}

    const requiredFields = [
        { key: 'vendor_slno', label: 'Vendor' },
        { key: 'wod', label: 'WO Date' },
        { key: 'req_date', label: 'Request Date' },
        { key: 'fromDate', label: 'From Date' },
        { key: 'toDate', label: 'To Date' },
        { key: 'contractType', label: 'Contract Type' },
        { key: 'crfNo', label: 'crf Number' }

    ]

    for (const field of requiredFields) {
        const value = vd[field.key]
        if (!value) return `${field.label} is required`
    }

    return null
}

