
// import React, { memo, useState, useEffect, useMemo } from "react";
// import {
//     Modal,
//     ModalDialog,
//     ModalClose,
//     Box,
//     Divider,
//     // Tooltip
// } from "@mui/joy";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
// import { useOrderItemDetail, usePatientExtraOrders } from "../CommonData/UseQuery";
// import DietTextComponent from "../DietComponent/DietTextComponent";

// import DeliveryItemList from "../KotDeliveryPreparation/NewDesignKotDelivery/DeliveryItemList";

// const PatientOrderModal = ({ open, onClose, patient, activeTab = "CONFIRMED" }) => {


//     const memoOrder = useMemo(() => patient || {}, [
//         patient?.canteen_order_id
//     ]);

//     const {
//         data: OrderFoodDetails = [],
//     } = useOrderItemDetail(memoOrder?.canteen_order_id);

//     const {
//         data: PatientExtraOrders = [],

//     } = usePatientExtraOrders(memoOrder?.fb_ipad_slno, activeTab);


//     console.log({
//         OrderFoodDetails
//     });


//     const [items, setItems] = useState([])



//     /* SET INITIAL ITEMS */
//     useEffect(() => {
//         if (!memoOrder?.canteen_order_id) return;

//         if (OrderFoodDetails?.length > 0) {
//             setItems(OrderFoodDetails);
//         } else {
//             setItems([]);
//         }
//     }, [memoOrder?.canteen_order_id, OrderFoodDetails]);





//     const formattedExtraOrders = useMemo(() => {
//         return (PatientExtraOrders || []).map(item => ({
//             item_id: item.item_id,
//             item_name: item.item_name,
//             qty: Number(item.quantity ?? 0),
//             price: Number(item.price ?? 0),
//             description: item.description ?? "",
//             gst: Number(item.gst ?? 0),
//             gst_amount: Number(item.gst_amount ?? 0),

//             isExtra: true,          // IDENTIFIER
//             order_status: item.order_status,
//             extra_order_id: item.extra_order_id
//         }));
//     }, [PatientExtraOrders]);



//     useEffect(() => {
//         if (!memoOrder?.canteen_order_id) return;

//         // clone canteen items
//         const canteenItems = (OrderFoodDetails || []).map(item => ({
//             ...item,
//             isExtra: false
//         }));

//         // attach matching extra order identity
//         const merged = canteenItems?.map(canteenItem => {

//             const matchedExtra = formattedExtraOrders.find(extra =>
//                 extra.item_id === canteenItem.item_id &&
//                 Number(extra.qty) === Number(canteenItem.quantity)
//             );

//             if (matchedExtra) {
//                 return {
//                     ...canteenItem,
//                     isExtra: true,
//                     extra_order_id: matchedExtra.extra_order_id,
//                     extra_order_status: matchedExtra.order_status
//                 };
//             }

//             return canteenItem;
//         });

//         setItems(merged);


//     }, [
//         memoOrder?.canteen_order_id,
//         OrderFoodDetails,
//         formattedExtraOrders
//     ]);

//     /* TOTAL */
//     const totalAmount = items?.reduce((sum, item) => {
//         const qty = Number(item.qty ?? item.quantity ?? 0);
//         const price = Number(item.price ?? 0);
//         const gstAmount = Number(item.gst_amount ?? 0);
//         return sum + (qty * price) + gstAmount;
//     }, 0);

//     /* NEW ITEMS */



//     if (!patient) return null;

//     return (
//         <Modal open={open} onClose={onClose}>
//             <ModalDialog
//                 size="sm"
//                 sx={{
//                     width: "70vw",
//                     minHeight: '40vh',
//                     borderRadius: "md",
//                     p: 2,
//                 }}
//             >
//                 <ModalClose />

//                 {/* HEADER */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <ReceiptLongOutlinedIcon fontSize="small" />
//                     <DietTextComponent
//                         value="Canteen Order Detailss"
//                         size={18}
//                         weight={600}
//                     />
//                 </Box>

//                 {/* ORDER INFO */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}>

//                     <Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <PersonOutlineIcon sx={{ fontSize: 16 }} />
//                             <DietTextComponent
//                                 value={memoOrder?.party_name || "Guest"}
//                                 size={15}
//                                 weight={600}
//                             />
//                         </Box>

//                         <DietTextComponent
//                             value={`Order ID: ${memoOrder?.canteen_order_id}`}
//                             size={13}
//                             color="#555"
//                         />
//                     </Box>



//                 </Box>

//                 <Divider sx={{ my: 1.5 }} />

//                 <DeliveryItemList orderdetail={patient} data={items} />

//                 <Divider sx={{ my: 1.5 }} />



//                 {/* TOTAL */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
//                     <DietTextComponent value="₹ Total" size={15} weight={600} />
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: 'column',
//                             alignItems: 'flex-end',
//                             gap: 1
//                         }}
//                     >

//                         <DietTextComponent
//                             value={`₹ ${totalAmount}`}
//                             size={15}
//                             weight={700}
//                             color="#1976d2"
//                         />
//                     </Box>
//                 </Box>

//             </ModalDialog>
//         </Modal>
//     );
// };

// export default memo(PatientOrderModal);



import React, { memo, useMemo } from "react";
import {
    Modal,
    ModalDialog,
    ModalClose,
    Box,
    Divider,
} from "@mui/joy";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import {
    useOrderItemDetail,
    usePatientExtraOrders
} from "../CommonData/UseQuery";

import DietTextComponent from "../DietComponent/DietTextComponent";
import DeliveryItemList from "../KotDeliveryPreparation/NewDesignKotDelivery/DeliveryItemList";

const PatientOrderModal = ({
    open,
    onClose,
    patient,
    activeTab = "CONFIRMED"
}) => {

    const memoOrder = useMemo(() => patient || {}, [
        patient?.canteen_order_id
    ]);

    /* ORDER ITEMS */
    const {
        data: OrderFoodDetails = [],
    } = useOrderItemDetail(
        memoOrder?.canteen_order_id
    );

    /* EXTRA ORDERS */
    const {
        data: PatientExtraOrders = [],
    } = usePatientExtraOrders(
        memoOrder?.fb_ipad_slno,
        activeTab
    );

    console.log({
        OrderFoodDetails,
        PatientExtraOrders
    });

    /* FORMAT EXTRA ORDERS */
    const formattedExtraOrders = useMemo(() => {

        return (PatientExtraOrders || []).map(item => ({
            item_id: Number(item.item_id),
            item_name: item.item_name,
            qty: Number(item.quantity ?? 0),
            price: Number(item.price ?? 0),
            description: item.description ?? "",
            gst: Number(item.gst ?? 0),
            gst_amount: Number(item.gst_amount ?? 0),

            isExtra: true,
            order_status: item.order_status,
            extra_order_id: item.extra_order_id
        }));

    }, [PatientExtraOrders]);

    /* FINAL MERGED ITEMS */
    const items = useMemo(() => {

        if (!memoOrder?.canteen_order_id) {
            return [];
        }

        // NORMAL ITEMS
        const canteenItems = (OrderFoodDetails || []).map(item => ({
            ...item,
            isExtra: false
        }));

        // MERGE EXTRA ORDER INFO
        return canteenItems.map(canteenItem => {

            const matchedExtra = formattedExtraOrders.find(extra =>
                Number(extra.item_id) === Number(canteenItem.item_id) &&
                Number(extra.qty) === Number(canteenItem.quantity)
            );

            if (matchedExtra) {
                return {
                    ...canteenItem,
                    isExtra: true,
                    extra_order_id: matchedExtra.extra_order_id,
                    extra_order_status: matchedExtra.order_status
                };
            }

            return canteenItem;
        });

    }, [
        memoOrder?.canteen_order_id,
        OrderFoodDetails,
        formattedExtraOrders
    ]);


    /* TOTAL */
    const totalAmount = useMemo(() => {

        return items?.reduce((sum, item) => {

            const qty =
                Number(item.qty ?? item.quantity ?? 0);

            const price =
                Number(item.price ?? 0);

            const gstAmount =
                Number(item.gst_amount ?? 0);

            return sum + (qty * price) + gstAmount;

        }, 0);

    }, [items]);

    if (!patient) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                size="sm"
                sx={{
                    width: {
                        xs: "95vw",
                        sm: "85vw",
                        md: "70vw"
                    },
                    minHeight: "40vh",
                    borderRadius: "md",
                    p: 2,
                }}
            >
                <ModalClose />

                {/* HEADER */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >
                    <ReceiptLongOutlinedIcon fontSize="small" />

                    <DietTextComponent
                        value="Canteen Order Details"
                        size={18}
                        weight={600}
                    />
                </Box>

                {/* ORDER INFO */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1.5
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1
                            }}
                        >
                            <PersonOutlineIcon
                                sx={{ fontSize: 16 }}
                            />

                            <DietTextComponent
                                value={
                                    memoOrder?.party_name || "Guest"
                                }
                                size={15}
                                weight={600}
                            />
                        </Box>

                        <DietTextComponent
                            value={`Order ID: ${memoOrder?.canteen_order_id}`}
                            size={13}
                            color="#555"
                        />
                    </Box>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* ITEM LIST */}
                <Box
                    sx={{
                        maxHeight: "55vh",
                        overflowY: "auto"
                    }}
                >
                    <DeliveryItemList
                        orderdetail={patient}
                        data={items || []}
                    />
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* TOTAL */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1
                    }}
                >
                    <DietTextComponent
                        value="₹ Total"
                        size={15}
                        weight={600}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            gap: 1
                        }}
                    >
                        <DietTextComponent
                            value={`₹ ${totalAmount}`}
                            size={15}
                            weight={700}
                            color="#1976d2"
                        />
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default memo(PatientOrderModal);