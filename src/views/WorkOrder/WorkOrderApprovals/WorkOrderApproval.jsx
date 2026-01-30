
import React, { memo, useCallback, useState } from 'react'
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
import { Visibility } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import WoApprovalModal from './WoApprovalModal'
import { useSelector } from 'react-redux'
import { useApprovalDepartmentFetching } from
    'src/views/IncidentManagement/CommonComponent/useQuery'
import { getWorkOrderData } from '../WorkOrderCommonApi'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useNavigate } from 'react-router-dom'

/* ---------------- CONSTANTS ---------------- */
const WO_TYPE_MAP = {
    1: { label: 'AMC', color: 'primary' },
    2: { label: 'CMC', color: 'success' },
    3: { label: 'Rate Contract', color: 'warning' },
}

const STATUS_FILTERS = [
    { value: 'P', label: 'Pending', color: 'warning' },
    { value: 'A', label: 'Approved', color: 'success' },
    { value: 'R', label: 'Rejected', color: 'danger' },
]

/* ---------------- HEADER ---------------- */
const HeaderRow = () => (
    <Sheet
        variant="soft"
        sx={{
            display: 'grid',
            gridTemplateColumns: '0.5fr 1fr 1.6fr 1.2fr 1.2fr 2fr 0.6fr',
            px: 2,
            py: 1.5,
            fontWeight: 700,
            borderBottom: '1px solid',
            borderColor: 'divider',
        }}
    >
        <Typography level="body-xs">#</Typography>
        <Typography level="body-xs">Type</Typography>
        <Typography level="body-xs">WO No</Typography>
        <Typography level="body-xs">WO Date</Typography>
        <Typography level="body-xs">BOM No</Typography>
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
                '&:hover': { bgcolor: 'neutral.softHoverBg' },
            }}
        >
            <Typography level="body-sm">{index + 1}</Typography>

            <Chip size="sm" color={woType?.color} variant="soft">
                {woType?.label}
            </Chip>

            <Typography level="body-sm" fontWeight={700}>
                WO-{item.wo_slno}
            </Typography>

            <Typography level="body-sm">
                {new Date(item.wo_date).toLocaleDateString('en-IN')}
            </Typography>

            <Typography level="body-sm">{item.bom_regno}</Typography>

            <Typography level="body-sm">
                {item.it_supplier_name}
            </Typography>

            <Box textAlign="center">
                <IconButton
                    size="sm"
                    variant="soft"
                    color="primary"
                    onClick={() => onView(item)}
                >
                    <Visibility />
                </IconButton>
            </Box>
        </Box>
    )
})

/* ---------------- PAGE ---------------- */

const WorkOrderApprovalPage = () => {

    const [selectedWO, setSelectedWO] = useState(null)
    const [statusFilter, setStatusFilter] = useState('P')

    const { empid } = useSelector(s => s.LoginUserData)
    const levelNo = 26

    const history = useNavigate()

    const { data: ApprovalDepartments = [] } =
        useApprovalDepartmentFetching(empid, levelNo)

    const level_name = ApprovalDepartments?.[0]?.level_name
    const level_no = ApprovalDepartments?.[0]?.level_no
    const nextLevelNo = level_no ? level_no - 1 : null

    const { data: workOrders = [], isLoading } = useQuery({
        queryKey: ['GetWorkOrderDetails', nextLevelNo],
        queryFn: () => getWorkOrderData(nextLevelNo),
        enabled: nextLevelNo !== null,
        staleTime: Infinity,
    })

    const filteredWorkOrders = workOrders.filter(
        wo => wo.wo_current_level_review_status === statusFilter
    )

    const close = useCallback(() => {
        history(`/Home`)
    }, [history])

    return (
        <>
            <CardCloseOnly title="Work Order Approvals" close={close}>
                <Box sx={{ p: 0.5, width: "100%" }}>
                    {/* STATUS FILTER */}
                    <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                        {STATUS_FILTERS.map(status => (
                            <Chip
                                key={status.value}
                                variant={
                                    statusFilter === status.value
                                        ? 'solid'
                                        : 'soft'
                                }
                                color={status.color}
                                onClick={() =>
                                    setStatusFilter(status.value)
                                }
                            >
                                {status.label} (
                                {
                                    workOrders.filter(
                                        w =>
                                            w.wo_current_level_review_status ===
                                            status.value
                                    ).length
                                })
                            </Chip>
                        ))}
                    </Box>

                    <Card sx={{ p: 0 }}>
                        <HeaderRow />
                        <Divider />
                        {isLoading ? (
                            <Box p={3}>
                                <Typography>Loading…</Typography>
                            </Box>
                        ) : (
                            <Virtuoso
                                style={{ height: 650 }}
                                data={filteredWorkOrders}
                                itemContent={(i, item) => (
                                    <Row
                                        index={i}
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
                        empid={empid}
                        level_name={level_name}
                        level_no={level_no}
                    />
                )}
            </CardCloseOnly>
        </>
    )
}

export default memo(WorkOrderApprovalPage)
