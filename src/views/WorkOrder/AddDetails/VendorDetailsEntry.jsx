import React, { memo } from 'react'
import {
    Box,
    Card,
    Typography,
    Input,
    Textarea,
    Divider,
} from '@mui/joy'
import BusinessIcon from '@mui/icons-material/Business'
import DescriptionIcon from '@mui/icons-material/Description'
import SelectVendorNames from './SelectVendorNames'

const VendorDetailsEntry = ({
    SelectedData,
    vendorList,
    SetVendorList,
    wod,
    setWod,
    vendor_Desc,
    setVendor_Desc
}) => {

    const { sec_name, crfNo, req_date } = SelectedData || {}

    const labelStyle = { fontWeight: 600, mb: 0.5 }
    const inputStyle = { borderRadius: 'lg' }

    return (
        <Box
            sx={{
                p: 2,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
                gap: 2
            }}
        >
            {/* LEFT – Vendor Details */}
            <Card
                sx={{
                    borderRadius: '2xl',
                    p: 3,
                    background:
                        'linear-gradient(180deg,#ffffff,#f1f5ff)',
                    color: '#fff',
                    boxShadow: 'xl'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <BusinessIcon />
                    <Typography level="h4" fontWeight={800}>
                        Vendor Details
                    </Typography>
                </Box>

                <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.3)' }} />

                <Typography level="body-sm" sx={labelStyle}>
                    Vendor Name
                </Typography>

                <SelectVendorNames
                    vendorList={vendorList}
                    SetVendorList={SetVendorList}
                />

                <Box mt={3}>
                    <Typography level="body-sm" sx={labelStyle}>
                        Vendor Description
                    </Typography>

                    <Textarea
                        minRows={6}
                        placeholder="Enter vendor scope / remarks..."
                        value={vendor_Desc}
                        onChange={(e) => setVendor_Desc(e.target.value)}
                        sx={{
                            bgcolor: '#fff',
                            color: '#000',
                            borderRadius: 'lg',
                            boxShadow: 'sm'
                        }}
                    />
                </Box>
            </Card>

            {/* RIGHT – Work Order Info */}
            <Card
                sx={{
                    borderRadius: '2xl',
                    p: 3,
                    background:
                        'linear-gradient(180deg,#ffffff,#f1f5ff)',
                    boxShadow: 'xl',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ color: '#4338ca' }} />
                    <Typography level="h4" fontWeight={800}>
                        Work Order Information
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 2
                    }}
                >
                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            Work Order No
                        </Typography>
                        <Input
                            placeholder="WO-2026-001"
                            sx={inputStyle}
                        />
                    </Box>

                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            Work Order Date
                        </Typography>
                        <Input
                            type="date"
                            value={wod}
                            onChange={(e) => setWod(e.target.value)}
                            sx={inputStyle}
                        />
                    </Box>

                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            BOM Req No
                        </Typography>
                        <Input
                            value={crfNo || ''}
                            disabled
                            sx={{
                                ...inputStyle,
                                bgcolor: '#eef2ff',
                                fontWeight: 700
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography level="body-sm" sx={labelStyle}>
                            BOM Req Date
                        </Typography>
                        <Input
                            value={req_date || ''}
                            disabled
                            sx={{
                                ...inputStyle,
                                bgcolor: '#eef2ff',
                                fontWeight: 700
                            }}
                        />
                    </Box>

                    <Box sx={{ gridColumn: 'span 2' }}>
                        <Typography level="body-sm" sx={labelStyle}>
                            Department
                        </Typography>
                        <Input
                            value={sec_name || ''}
                            disabled
                            sx={{
                                ...inputStyle,
                                bgcolor: '#ede9fe',
                                fontWeight: 800,
                                color: '#5b21b6'
                            }}
                        />
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default memo(VendorDetailsEntry)
