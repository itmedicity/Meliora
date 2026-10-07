import React, {
    memo,
    useCallback,
    useMemo,
    useState
} from "react";

import {
    Box,
    Divider,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import { axioslogin } from "src/views/Axios/Axios";
import PackingOrderItems from "./PackingOrderItems";
import PackingPacketList from "./PackingPacketList";
import ExistingPacketDetails from "./ExistingPacketDetails";
import ExistingPacketSelector from "./ExistingPacketSelector";
import PackingControls from "./PackingControls";
import { infoNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
import { useQueryClient } from "@tanstack/react-query";




const PackingComponent = ({
    items = [],
    orderId,
    assignmentDetailId,
    typeSlno,
    PackageDetails = [],
    createdBy = null,
    // isLoading,
    refetch
}) => {

    const [packets, setPackets] = useState([]);
    const [activePacketId, setActivePacketId] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [saving, setSaving] = useState(false);
    const [selectedPacketId, setSelectedPacketId] = useState(null);

    const queryClient = useQueryClient()

    /*ITEM ID*/

    const getItemId = useCallback((item) => {
        return (
            item?.canteen_order_item_id ??
            item?.order_detail_id ??
            item?.item_id
        );

    }, []);


    /* 
       EXISTING PACKETS
       Convert PackageDetails into grouped packets
     */

    const existingPackets = useMemo(() => {

        if (
            !Array.isArray(PackageDetails) ||
            PackageDetails.length === 0
        ) {
            return [];
        }

        const grouped = [];

        PackageDetails?.forEach(item => {

            const packetUid =
                item?.packet_uid;

            if (!packetUid) {
                return;
            }

            const existingPacket =
                grouped.find(
                    packet =>
                        packet.packet_uid ===
                        packetUid
                );

            if (existingPacket) {

                existingPacket.items.push(item);

            } else {

                grouped.push({
                    packing_id:
                        item?.packing_id,

                    packet_uid:
                        packetUid,

                    packet_no:
                        item?.packet_no,

                    confirmed: true,

                    items: [item]
                });

            }

        });

        return grouped;

    }, [PackageDetails]);


    /*  WHICH PACKETS TO DISPLAY */

    const displayPackets = useMemo(() => {

        /*
         * Existing packets come from backend.
         */

        if (existingPackets.length > 0) {

            if (!selectedPacketId) {
                return [];
            }

            return existingPackets.filter(
                packet =>
                    packet?.packet_uid ===
                    selectedPacketId
            );

        }

        /*
         * New packets created locally.
         */

        return packets;

    }, [
        existingPackets,
        selectedPacketId,
        packets
    ]);


    /*  ASSIGNED ITEM IDS */

    const assignedItemIds = useMemo(() => {

        const ids = new Set();


        /*
         * Existing backend packets
         */

        existingPackets.forEach(packet => {

            packet?.items?.forEach(item => {

                const id =
                    getItemId(item);

                if (
                    id !== undefined &&
                    id !== null
                ) {
                    ids.add(String(id));
                }

            });

        });


        /*
         * Locally confirmed packets
         */

        packets.forEach(packet => {

            if (!packet?.confirmed) {
                return;
            }

            packet?.items?.forEach(item => {

                const id =
                    getItemId(item);

                if (
                    id !== undefined &&
                    id !== null
                ) {
                    ids.add(String(id));
                }

            });

        });

        return ids;

    }, [
        existingPackets,
        packets,
        getItemId
    ]);


    /*  REMAINING ITEMS */

    const remainingItems = useMemo(() => {

        return items.filter(item => {

            const id =
                getItemId(item);

            return !assignedItemIds.has(
                String(id)
            );

        });

    }, [
        items,
        assignedItemIds,
        getItemId
    ]);

    /* 
       PACKET COUNT
     */

    const packetCount =
        existingPackets.length > 0
            ? existingPackets.length
            : packets.length;


    /* 
       CREATE PACKET
     */

    const handleCreatePacket = useCallback(() => {

        if (!items.length) {
            return;
        }


        /*
         * Don't allow another packet while
         * the previous packet is still being edited.
         */

        const hasUnconfirmedPacket =
            packets.some(
                packet =>
                    !packet.confirmed
            );

        if (hasUnconfirmedPacket) {
            return;
        }


        /*
         * Everything already packed.
         */

        if (
            assignedItemIds.size >=
            items.length
        ) {
            return;
        }


        const newPacket = {

            temp_id:
                `TEMP-${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(2, 8)}`,

            packet_no:
                packets.length + 1,

            confirmed: false,

            items: []

        };


        setPackets(prev => [
            ...prev,
            newPacket
        ]);


        setActivePacketId(
            newPacket.temp_id
        );

        setSelectedItems([]);

    }, [
        items.length,
        packets,
        assignedItemIds
    ]);


    /* 
       SELECT EXISTING PACKET
     */

    const handleSelectExistingPacket =
        useCallback((packetUid) => {
            setSelectedPacketId(
                prev =>
                    prev === packetUid
                        ? null
                        : packetUid
            );

        }, []);


    /* 
       ITEM TOGGLE
     */

    const handleItemToggle =
        useCallback(
            (item) => {

              

                if (!activePacketId) {
                    return;
                }

                const itemId = getItemId(item);


                setSelectedItems(prev => {
                    const exists =
                        prev.some(
                            id =>
                                String(id) ===
                                String(itemId)
                        );

                    if (exists) {
                        return prev.filter(
                            id =>
                                String(id) !==
                                String(itemId)
                        );
                    }
                    return [
                        ...prev,
                        itemId
                    ];

                });
            },
            [
                activePacketId,
                getItemId
            ]
        );


    /* 
       IS ITEM SELECTED
     */

    const isItemSelected =
        useCallback(
            (item) => {

                const itemId =
                    getItemId(item);

                return selectedItems.some(
                    id =>
                        String(id) ===
                        String(itemId)
                );

            },
            [
                selectedItems,
                getItemId
            ]
        );


    /* 
       CONFIRM PACKET
     */

    const handleConfirmPacket =
        useCallback(() => {

            if (!activePacketId) {
                return;
            }

            if (!selectedItems.length) {
                return;
            }

            setPackets(prev => {
                return prev.map(packet => {
                    if (
                        packet.temp_id !==
                        activePacketId
                    ) {
                        return packet;
                    }

                    const packetItems =
                        items?.filter(item => {

                            const itemId =
                                getItemId(item);

                            return selectedItems.some(
                                id =>
                                    String(id) ===
                                    String(itemId)
                            );

                        });


                    return {

                        ...packet,

                        items:
                            packetItems,

                        confirmed:
                            true

                    };

                });

            });


            setActivePacketId(null);

            setSelectedItems([]);

        }, [
            activePacketId,
            selectedItems,
            items,
            getItemId
        ]);


    /* 
       CANCEL PACKET
     */

    const handleCancelPacket =
        useCallback(
            (packetId) => {

                setPackets(prev => {

                    const filtered =
                        prev.filter(
                            packet =>
                                packet.temp_id !==
                                packetId
                        );


                    return filtered.map(
                        (packet, index) => ({
                            ...packet,
                            packet_no:
                                index + 1
                        })
                    );

                });


                if (
                    activePacketId ===
                    packetId
                ) {

                    setActivePacketId(
                        null
                    );

                    setSelectedItems([]);

                }

            },
            [
                activePacketId
            ]
        );


    /* 
       REMOVE ITEM FROM PACKET
     */
    const handleRemoveItemFromPacket = useCallback(
        (packetId, item) => {

            const itemId = getItemId(item);

            setPackets(prev => {

                const updatedPackets = prev
                    .map(packet => {

                        if (packet.temp_id !== packetId) {
                            return packet;
                        }

                        const remainingItems =
                            packet.items.filter(
                                packetItem =>
                                    String(
                                        getItemId(packetItem)
                                    ) !== String(itemId)
                            );

                        return {
                            ...packet,
                            items: remainingItems
                        };
                    })
                    .filter(packet => packet.items.length > 0)
                    .map((packet, index) => ({
                        ...packet,
                        packet_no: index + 1
                    }));


                return updatedPackets;
            });


            /*
             * The removed item should also be removed
             * from selectedItems.
             */
            setSelectedItems(prev =>
                prev.filter(
                    id =>
                        String(id) !== String(itemId)
                )
            );


            /*
             * Check whether the packet became empty.
             * If yes, clear the active packet.
             */
            setPackets(prev => {

                const packetStillExists =
                    prev.some(
                        packet =>
                            packet.temp_id === packetId
                    );

                if (!packetStillExists) {

                    setActivePacketId(current =>
                        current === packetId
                            ? null
                            : current
                    );

                }

                return prev;
            });

        },
        [getItemId]
    );

    /* 
       AUTO PACK
     */

    const handleAutoPack =
        useCallback(() => {

            if (!items.length) {
                return;
            }


            const hasUnconfirmedPacket =
                packets.some(
                    packet =>
                        !packet.confirmed
                );


            if (hasUnconfirmedPacket) {
                return;
            }


            const remaining =
                items.filter(item => {

                    const id =
                        getItemId(item);

                    return !assignedItemIds.has(
                        String(id)
                    );

                });


            if (!remaining.length) {
                return;
            }


            const startNumber =
                packets.length + 1;


            const autoPackets =
                remaining.map(
                    (item, index) => ({

                        temp_id:
                            `AUTO-${Date.now()}-${index}`,

                        packet_no:
                            startNumber +
                            index,

                        confirmed:
                            true,

                        items: [item]

                    })
                );


            setPackets(prev => [

                ...prev,

                ...autoPackets

            ]);

        }, [
            items,
            packets,
            assignedItemIds,
            getItemId
        ]);


    /* 
       PACKET ITEM COUNT
     */

    const getPacketItemCount =
        useCallback(
            (packet) => {

                return packet?.items?.reduce(
                    (total, item) =>
                        total +
                        Number(
                            item?.quantity ?? 0
                        ),
                    0
                ) || 0;

            },
            []
        );


    /* 
       SUBMIT PACKING
     */

    const handleSubmitPacking =
        useCallback(async () => {
            if (saving) {
                return;
            }

            if (!items.length) {
                return;
            }

            if (!packets.length) {
                return;
            }


            /*
             * Every packet must be confirmed.
             */

            const hasUnconfirmedPacket =
                packets.some(
                    packet =>
                        !packet.confirmed
                );


            if (hasUnconfirmedPacket) {
                return;
            }


            /*
             * All items must be packed.
             */

            if (
                assignedItemIds.size <
                items.length
            ) {
                return;
            }


            if (!orderId) {
                return;
            }


            const payload = {

                order_id:
                    orderId,

                created_by:
                    createdBy,

                packet_count:
                    packets.length,

                assignment_detail_id:
                    assignmentDetailId,

                type_slno:
                    typeSlno,

                packets:
                    packets.map(packet => ({

                        packet_no:
                            packet.packet_no,

                        items:
                            packet.items.map(item => ({

                                order_item_id:
                                    getItemId(item),

                                quantity:
                                    Number(
                                        item?.quantity ??
                                        0
                                    )

                            }))

                    }))

            };

            /*
                * Check invalid item IDs.
                */

            const hasInvalidItem =
                payload?.packets?.some(
                    packet =>
                        packet?.items.some(
                            item =>
                                !item.order_item_id
                        )
                );


            if (
                hasInvalidItem
            ) {

                return infoNotify(
                    "Invalid order item found!"
                );

            }

            try {

                setSaving(true);
                const response = await axioslogin.post("/dietdelivery/package/insert",
                    payload
                );

                const { success, message } = response?.data ?? {};

                if (success !== 1) return warningNotify(message)

                succesNotify("Order packed successfully!")
                setPackets([]);
                setActivePacketId(null);
                setSelectedItems([]);
                setSelectedPacketId(null);

                queryClient.invalidateQueries(['canteenorderstatus']);
                queryClient.invalidateQueries(['assignedorder']);
                refetch()

            } catch (error) {
                console.error(
                    "Packing submit error:",
                    error
                );

            } finally {

                setSaving(false);

            }

        }, [
            saving,
            items,
            packets,
            assignedItemIds,
            orderId,
            createdBy,
            assignmentDetailId,
            typeSlno,
            getItemId,
            queryClient
        ]);


    /* 
       RENDER
     */

    return (

        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                px: 1
            }}
        >

            {/* 
                PACKING HEADER
             */}

            <Paper
                elevation={0}
                sx={{
                    border:
                        "1px solid #e2e8f0",
                    borderRadius: 2,
                    overflow: "hidden",
                    mt: 1
                }}
            >

                <Box
                    sx={{
                        px: 1.5,
                        py: 1.25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                        background:
                            "#f8fafc",

                    }}
                >

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <Inventory2Icon
                            fontSize="small"
                        />

                        <Box>

                            <Typography
                                fontSize={14}
                                fontWeight={700}
                            >
                                {existingPackets.length
                                    ? "ORDER PACKED"
                                    : "PACK ORDER"}
                            </Typography>

                            <Typography
                                fontSize={11}
                                color="text.secondary"
                            >
                                {packetCount} packet
                                {packetCount !== 1
                                    ? "s"
                                    : ""}
                            </Typography>

                        </Box>

                    </Stack>

                </Box>


                <Divider />


                {/* 
                    NEW PACKING CONTROLS
                 */}

                {existingPackets.length === 0 && (
                    <PackingControls
                        saving={saving}
                        remainingItems={remainingItems}
                        packets={packets}
                        assignedItemIds={assignedItemIds}
                        items={items}
                        handleCreatePacket={handleCreatePacket}
                        handleAutoPack={handleAutoPack}
                        handleSubmitPacking={handleSubmitPacking}
                    />
                )}

            </Paper>


            {/* 
                EXISTING PACKET SELECTORS
             */}

            <ExistingPacketSelector
                existingPackets={existingPackets}
                selectedPacketId={selectedPacketId}
                handleSelectExistingPacket={handleSelectExistingPacket}
            />

            {/* 
                EXISTING PACKET DETAILS
             */}

            {existingPackets?.length > 0 && (
                <ExistingPacketDetails
                    displayPackets={displayPackets}
                    getPacketItemCount={getPacketItemCount}
                    getItemId={getItemId}
                />
            )}


            {/* 
                LOCAL PACKETS
             */}

            <PackingPacketList
                packets={packets}
                selectedItems={selectedItems}
                existingPackets={existingPackets}
                activePacketId={activePacketId}
                getPacketItemCount={getPacketItemCount}
                getItemId={getItemId}
                handleCancelPacket={handleCancelPacket}
                handleRemoveItemFromPacket={handleRemoveItemFromPacket}
                handleConfirmPacket={handleConfirmPacket}
            />

            {/* 
                ORDER ITEMS
             */}

            {existingPackets.length ===
                0 && remainingItems.length > 0 &&
                (
                    <PackingOrderItems
                        items={items}
                        assignedItemIds={assignedItemIds}
                        activePacketId={activePacketId}
                        getItemId={getItemId}
                        isItemSelected={isItemSelected}
                        handleItemToggle={handleItemToggle} />

                )}

        </Box>
    );
};


export default memo(PackingComponent);