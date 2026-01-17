import React, { memo, useState } from 'react'
import {
    Box,
    Card,
    Typography,
    Input,
    Textarea,
    Select,
    Option,
    Divider
} from '@mui/joy'
import SelectVendorNames from '../AddDetails/SelectVendorNames'

const WorkOrderDetailsEntry = () => {

    const [vendorList, SetVendorList] = useState(null)

    return (
        <Box
            sx={{
                p: 2,
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap'
            }}
        >
            {/* 🔵 LEFT SIDE – Vendor Details */}
            <Card
                sx={{
                    flex: 1,
                    minWidth: 320,
                    borderRadius: 16,
                    color: '#fff'
                }}
            >

                <Typography level="body-sm">Vendor Name</Typography>

                <SelectVendorNames vendorList={vendorList} SetVendorList={SetVendorList} />

                <Typography level="body-sm">Description</Typography>
                <Textarea
                    minRows={4}
                    placeholder="Enter vendor description..."
                    sx={{
                        bgcolor: '#fff',
                        color: '#000'
                    }}
                />
            </Card>

            {/*  RIGHT SIDE – Work Order Details */}
            <Card
                sx={{
                    flex: 1,
                    minWidth: 360,
                    borderRadius: 16,
                    bgcolor: '#f9fafb'
                }}
            >
                <Typography level="h4" color="primary" mb={1}>
                    Work Order Details
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                    <Box>
                        <Typography level="body-sm">Work Order No</Typography>
                        <Input placeholder="WO-2026-001" />
                    </Box>

                    <Box>
                        <Typography level="body-sm">Work Order Date</Typography>
                        <Input type="date" />
                    </Box>

                    <Box>
                        <Typography level="body-sm">BOM Req No</Typography>
                        <Input placeholder="BOM-REQ-456" />
                    </Box>

                    <Box>
                        <Typography level="body-sm">BOM Req Date</Typography>
                        <Input type="date" />
                    </Box>

                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography level="body-sm">Department</Typography>
                        <Select placeholder="Select Department">
                            <Option value="bio">Biomedical</Option>
                            <Option value="it">IT</Option>
                            <Option value="maint">Maintenance</Option>
                            <Option value="admin">Administration</Option>
                        </Select>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default memo(WorkOrderDetailsEntry)

