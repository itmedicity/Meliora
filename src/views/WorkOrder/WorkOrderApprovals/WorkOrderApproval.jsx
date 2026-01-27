import React, { memo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import {
    Box,
    Typography,
    Card,
    Sheet,
    Divider,
    Chip,
    IconButton,
} from '@mui/joy'
// import VisibilityIcon from '@mui/icons-material/Visibility'
import { Visibility } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { getWorkOrderData } from '../WorkOrderCommonApi'
import WoApprovalModal from './WoApprovalModal'
import { useSelector } from 'react-redux'
import { useApprovalDepartmentFetching } from 'src/views/IncidentManagement/CommonComponent/useQuery'

/* ---------------- HELPERS ---------------- */

const WO_TYPE_MAP = {
    1: { label: 'AMC', color: 'primary' },
    2: { label: 'CMC', color: 'success' },
    3: { label: 'Rate Contract', color: 'warning' },
}

/* ---------------- HEADER ---------------- */

const HeaderRow = () => (
    <Sheet
        variant="soft"
        sx={{
            display: 'grid',
            gridTemplateColumns: '0.5fr 1fr 1.6fr 1.2fr 1.2fr 2fr 0.6fr',
            px: 2,
            py: 1.6,
            fontWeight: 700,
            bgcolor: 'neutral.softBg',
            borderBottom: '1px solid',
            borderColor: 'divider',
        }}
    >
        <Typography level="body-xs">#</Typography>
        <Typography level="body-xs">Type</Typography>
        <Typography level="body-xs">WO Number</Typography>
        <Typography level="body-xs">WO Date</Typography>
        <Typography level="body-xs">BOM Reg No</Typography>
        <Typography level="body-xs">Vendor</Typography>
        <Typography level="body-xs" textAlign="center">
            View
        </Typography>
    </Sheet>
)

/* ---------------- ROW ---------------- */

const Row = memo(({ index, item, onView }) => {
    const woType = WO_TYPE_MAP[item.wo_type]

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '0.5fr 1fr 1.6fr 1.2fr 1.2fr 2fr 0.6fr',
                px: 2,
                py: 1.4,
                alignItems: 'center',
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.2s ease',
                '&:hover': {
                    bgcolor: 'neutral.softHoverBg',
                },
            }}
        >
            {/* Index */}
            <Typography level="body-sm" fontWeight={600}>
                {index + 1}
            </Typography>

            {/* WO Type */}
            <Chip size="sm" color={woType?.color} variant="soft">
                {woType?.label}
            </Chip>


            {/* WO Number */}
            <Typography level="body-sm" fontWeight={700}>
                {`WO-${item.wo_slno}`}
            </Typography>

            {/* Date */}
            <Typography level="body-sm" sx={{ color: "neutral" }} >
                {new Date(item.wo_date).toLocaleDateString('en-IN')}
            </Typography>

            {/* BOM */}
            <Typography level="body-sm">
                {item.bom_regno}
            </Typography>

            {/* Vendor */}
            <Typography
                level="body-sm"
                sx={{ fontWeight: 500 }}
            >
                {item.it_supplier_name}
            </Typography>

            {/* Action */}
            <Box textAlign="center">
                <IconButton
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                        borderRadius: '50%',
                        '&:hover': { bgcolor: 'primary.softHoverBg' },
                    }}
                    onClick={() => onView(item)}
                >
                    <Visibility />
                </IconButton>
            </Box>
        </Box>
    )
})

/* ---------------- MAIN PAGE ---------------- */

const WorkOrderApprovalPage = () => {

    const [selectedWO, setSelectedWO] = useState(null)

    const { data: workOrders = [], isLoading } = useQuery({
        queryKey: ['GetWorkOrderDetails'],
        queryFn: getWorkOrderData,
        staleTime: Infinity,
    })

    const { empid } = useSelector(s => s.LoginUserData);
    const levelNo = 26;

    /* ===================== APPROVAL DEPARTMENTS ===================== */

    const { data: ApprovalDepartments = [] } =
        useApprovalDepartmentFetching(empid, levelNo);

    // console.log(ApprovalDepartments, "ApprovalDepartments");

    return (
        <>
            <Box sx={{ p: 3, width: "100%" }}>
                <Typography level="h2" mb={0.5}>
                    Work Order Approvals
                </Typography>

                <Typography level="body-sm" mb={2} sx={{ color: "neutral" }}>
                    Review, verify and approve submitted work orders
                </Typography>

                <Card
                    sx={{
                        p: 0,
                        borderRadius: 'lg',
                        boxShadow: 'md',
                        overflow: 'hidden',
                    }}
                >
                    <HeaderRow />
                    <Divider />

                    {isLoading ? (
                        <Box sx={{ p: 4 }}>
                            <Typography level="body-sm">
                                Loading work orders…
                            </Typography>
                        </Box>
                    ) : (
                        <Virtuoso
                            style={{ height: 650 }}
                            data={workOrders}
                            itemContent={(index, item) => (
                                <Row
                                    index={index}
                                    item={item}
                                    onView={setSelectedWO}
                                />
                            )}
                        />
                    )}
                </Card>
            </Box>

            {selectedWO && (
                <WoApprovalModal
                    selectedWO={selectedWO}
                    onClose={() => setSelectedWO(null)}
                    ApprovalDepartments={ApprovalDepartments}
                />
            )}
        </>
    )
}

export default memo(WorkOrderApprovalPage)
