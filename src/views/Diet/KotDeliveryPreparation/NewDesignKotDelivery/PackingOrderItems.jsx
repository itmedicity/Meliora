import React from "react";
import {
    Box,
    Paper,
    Typography,
    Divider,
    Stack,
    Checkbox
} from "@mui/material";


const PackingOrderItems = ({
    items = [],
    assignedItemIds = new Set(),
    activePacketId,
    getItemId,
    isItemSelected,
    handleItemToggle
}) => {

    // Only show items which are NOT already assigned to a packet
    const remainingOrderItems = items?.filter((item) => {
        const itemId = getItemId(item);
        return !assignedItemIds.has(
            String(itemId)
        );
    });

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e2e8f0",
                borderRadius: 2,
                overflow: "hidden"
            }}
        >

            {/* HEADER */}
            <Box
                sx={{
                    px: 1.5,
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#f8fafc"
                }}
            >

                <Typography
                    fontSize={13}
                    fontWeight={700}
                >
                    ORDER ITEMS
                </Typography>

                <Typography
                    fontSize={11}
                    color="text.secondary"
                >
                    {remainingOrderItems.length} remaining
                </Typography>

            </Box>

            <Divider />

            {/* ITEMS */}
            <Stack>

                {remainingOrderItems.map((item, index) => {

                    const itemId = getItemId(item);

                    const selected =
                        isItemSelected(item);

                    return (
                        <Box
                            key={itemId ?? index}
                            sx={{
                                px: 1.5,
                                py: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                borderBottom:
                                    "1px solid #f1f5f9"
                            }}
                        >

                            <Checkbox
                                size="small"
                                checked={selected}
                                disabled={!activePacketId}
                                onChange={() =>
                                    handleItemToggle(item)
                                }
                            />

                            <Box
                                sx={{
                                    flex: 1,
                                    minWidth: 0
                                }}
                            >

                                <Typography
                                    fontSize={12}
                                    fontWeight={600}
                                >
                                    {
                                        item?.item_name ??
                                        item?.item_name_short ??
                                        item?.item_name_long ??
                                        "Item"
                                    }
                                </Typography>

                                <Typography
                                    fontSize={11}
                                    color="text.secondary"
                                >
                                    Qty:{" "}
                                    {item?.quantity ?? 0}
                                </Typography>

                            </Box>

                        </Box>
                    );

                })}

            </Stack>

        </Paper>
    );
};

export default PackingOrderItems;