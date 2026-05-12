import React, { } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { Box, Paper, Checkbox } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CancelIcon from '@mui/icons-material/Cancel'
import DietButton from '../../DietComponent/DietButton'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import { format } from 'date-fns'
import { useFetchProductionMap } from '../../CommonData/UseQuery'
import BlenderTwoToneIcon from '@mui/icons-material/BlenderTwoTone';

const Cell = ({ width, children }) => (
    <Box sx={{ width, display: 'flex', alignItems: 'center' }}>
        {children}
    </Box>
)

const CanteenTable = ({
    data = [],
    onView,
    onCancel,
    setSelectedRows,
    selectedRows,
    activeTab,
}) => {



    const isCheckMode = activeTab === "CONFIRMED";


    const { data: ProductionMapDetail = [] } =
        useFetchProductionMap(isCheckMode);

    console.log({
        ProductionMapDetail
    });
    const mappedOrderIds = new Set(
        ProductionMapDetail?.map(item => item.canteen_order_id)
    );


    const getRowId = (row) => row.canteen_order_id;

    /* SELECT ALL */
    const handleSelectAll = (e) => {

        if (e.target.checked) {
            const allIds = data
                .filter(row => !mappedOrderIds.has(row.canteen_order_id))
                .map(row => row.canteen_order_id);

            setSelectedRows(allIds);

        } else {
            setSelectedRows([]);
        }
    };

    /* SINGLE SELECT */
    const handleSelectRow = (id) => {

        setSelectedRows(prev => {

            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }

            return [...prev, id];
        });
    };

    const selectableRows = data.filter(
        row => !mappedOrderIds?.has(row.canteen_order_id)
    );

    const isAllSelected =
        selectableRows.length > 0 &&
        selectedRows.length === selectableRows.length;


    const sortedData = [...data].sort((a, b) => {

        const aMapped = mappedOrderIds.has(a.canteen_order_id);
        const bMapped = mappedOrderIds.has(b.canteen_order_id);

        // send production items to bottom
        if (aMapped !== bMapped) {
            return aMapped ? 1 : -1;
        }
        // FIFO inside groups
        return new Date(a.order_time) - new Date(b.order_time);
    });


    return (
        <Paper sx={{ width: '100%' }}>

            {/* HEADER */}
            <Box
                display="flex"
                justifyContent="space-between"
                sx={{
                    bgcolor: '#7c51a1',
                    py: 0.6,
                    px: 1,
                    position: 'sticky',
                    top: 0,
                    zIndex: 1
                }}
            >
                {isCheckMode && (
                    <Cell width={40}>
                        <Checkbox
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            size="large"
                            sx={{
                                color: "white",
                                '&.Mui-checked': {
                                    color: "white"
                                }
                            }}
                        />
                    </Cell>
                )}

                {[
                    ['Order ID', 120],
                    ['Admission', 120],
                    ['MRD', 120],
                    ['Name', 120],
                    ['Type', 120],
                    ['Room', 100],
                    ['NS', 120],
                    ['Status', 120],
                    ['Time', 180],
                    ['Order', 100],
                    ['Cancel', 100]
                ].map(([label, width]) => (
                    <Cell key={label} width={width}>
                        <DietTextComponent value={label} color="white" weight={600} />
                    </Cell>
                ))}
            </Box>

            {/* BODY */}

            <Virtuoso
                style={{ height: '70vh' }}
                data={sortedData}
                // endReached={loadMore}
                itemContent={(index, row) => {
                    const rowId = getRowId(row);
                    const isMapped = mappedOrderIds.has(rowId);
                    return (
                        <Box
                            key={`${getRowId(row)}_${index + 1}`}
                            display="flex"
                            justifyContent="space-between"
                            sx={{
                                borderBottom: '1px solid lightgrey',
                                px: 1,
                                py: 0.5,
                                bgcolor: isMapped
                                    ? '#ececec'
                                    : selectedRows.includes(rowId)
                                        ? '#f5edff'
                                        : '#fff',
                                opacity: isMapped ? 0.7 : 1,
                                pointerEvents: isMapped ? 'none' : 'auto'
                            }}
                        >
                            {/* ROW CHECKBOX */}
                            {isCheckMode && (
                                <Cell width={40}>
                                    <Checkbox
                                        checked={selectedRows.includes(rowId)}
                                        onChange={() => handleSelectRow(rowId)}
                                        disabled={isMapped}
                                        size="medium"
                                    />
                                </Cell>
                            )}

                            <Cell width={120}>
                                <DietTextComponent value={row.canteen_order_id} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row.admission_id} size={12} />
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent value={row.fb_pt_no} size={12} />
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent value={row.fb_ptc_name} size={12} />
                            </Cell>
                            <Cell width={120}>
                                <DietTextComponent value={row.party_name} size={12} />
                            </Cell>
                            <Cell width={100}>
                                <DietTextComponent value={row.fb_bdc_no} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <DietTextComponent value={row.fb_ns_name} size={12} />
                            </Cell>

                            <Cell width={120}>
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    {isMapped && (
                                        <BlenderTwoToneIcon
                                            sx={{
                                                fontSize: 14,
                                                color: '#84058d'
                                            }}
                                        />
                                    )}

                                    <DietTextComponent
                                        value={isMapped ? "IN PRODUCTION" : row.order_status}
                                        size={12}
                                        color={isMapped ? "#84058d" : "inherit"}
                                    />
                                </Box>
                            </Cell>
                            <Cell width={180}>
                                <DietTextComponent
                                    value={
                                        row.order_time
                                            ? format(new Date(row.order_time), 'dd-MM-yyyy hh:mm a')
                                            : '-'
                                    }
                                    size={12}
                                />
                            </Cell>

                            <Cell width={100}>
                                <DietButton
                                    name={"orders"}
                                    width={80}
                                    icon={VisibilityIcon}
                                    onClick={() => onView(row)}
                                />
                            </Cell>

                            <Cell width={100}>
                                <DietButton
                                    disabled={row.order_status === "CANCELLED"}
                                    name={"cancel"}
                                    width={100}
                                    icon={CancelIcon}
                                    onClick={() => onCancel(row)}
                                />
                            </Cell>
                        </Box>
                    )
                }
                }
            />
        </Paper>
    )
}

export default CanteenTable