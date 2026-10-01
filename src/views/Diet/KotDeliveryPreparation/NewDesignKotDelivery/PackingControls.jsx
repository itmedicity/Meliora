import React, { memo } from "react";
import {
    Box,
    Button,
    Stack
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const PackingControls = ({
    saving = false,
    remainingItems = [],
    packets = [],
    assignedItemIds = new Set(),
    items = [],
    handleCreatePacket,
    handleAutoPack,
    handleSubmitPacking
}) => {

    const hasUnconfirmedPacket = packets.some(
        packet => !packet.confirmed
    );

    const noRemainingItems =
        remainingItems.length === 0;

    const submitDisabled =
        saving ||
        !packets.length ||
        assignedItemIds.size < items.length ||
        hasUnconfirmedPacket;

    return (
        <Box sx={{ p: 1.25 }}>
            <Stack
                direction="row"
                spacing={1}
            >

                {/* CREATE PACKET */}

                <Button
                    size="small"
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreatePacket}
                    disabled={
                        saving ||
                        noRemainingItems ||
                        hasUnconfirmedPacket
                    }
                >
                    Packet
                </Button>


                {/* AUTO PACKING */}

                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<AutoAwesomeIcon />}
                    onClick={handleAutoPack}
                    disabled={
                        saving ||
                        noRemainingItems ||
                        hasUnconfirmedPacket
                    }
                >
                    Auto Packing
                </Button>


                {/* SUBMIT */}

                <Button
                    size="small"
                    variant="contained"
                    onClick={handleSubmitPacking}
                    disabled={submitDisabled}
                >
                    {saving ? "Saving..." : "Submit"}
                </Button>

            </Stack>
        </Box>
    );
};

export default memo(PackingControls);