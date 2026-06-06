import React, { memo, useMemo } from "react";

import {
    Modal,
    ModalDialog,
    ModalClose,
    Box,
    Divider
} from "@mui/joy";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import DietTextComponent from "../../DietComponent/DietTextComponent";

import DietButton from "../../DietComponent/DietButton";

import { axioslogin } from "src/views/Axios/Axios";

import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";

import { useSelector } from "react-redux";

import { useQueryClient } from "@tanstack/react-query";

import { useOrderItemDetail, usePatientExtraOrders } from "../../CommonData/UseQuery";

import CanteenCancelItemList from "../Components/CanteenCancelItemList";


const CancelModal = ({ open, onClose, order, activeTab }) => {

    const queryClient = useQueryClient();

    const memoOrder = useMemo(() => order || {}, [
        order?.canteen_order_id
    ]);

    const id = useSelector(state => state.LoginUserData.empid);

    /*  FETCH SAME AS CONFIRM MODAL */
    const { data: OrderFoodDetails = [], refetch: FetchPatientFoodOrderDetails } =
        useOrderItemDetail(memoOrder?.canteen_order_id);

    const {
        data: PatientExtraOrders = [],
        refetch: refetchExtra
    } = usePatientExtraOrders(memoOrder?.fb_ipad_slno, activeTab);



    // const [items, setItems] = useState([]);

    /*  FORMAT EXTRA ITEMS */
    const formattedExtraOrders = useMemo(() => {
        return (PatientExtraOrders || []).map(item => ({
            ...item, // FULL DATA
            qty: Number(item.quantity ?? 0),
            price: Number(item.price ?? 0),
            gst_amount: Number(item.gst_amount ?? 0),
            isExtra: true,
            extra_order_id: item.extra_order_id,
            order_status: item.order_status
        }));

    }, [PatientExtraOrders]);



    const items = useMemo(() => {

        if (!memoOrder?.canteen_order_id) return [];

        // NORMAL ITEMS
        const normalItems = (OrderFoodDetails || []).map(item => {

            const matchedExtra = formattedExtraOrders?.find(extra =>
                Number(extra.item_id) === Number(item.item_id) &&
                Number(extra.qty) === Number(item.quantity)
            );

            // if exact qty + item match found
            if (matchedExtra) {
                return {
                    ...item,
                    isExtra: true,
                    extra_order_id: matchedExtra.extra_order_id,
                    order_status: matchedExtra.order_status
                };
            }
            // normal item
            return {
                ...item,
                isExtra: false
            };
        });

        // EXTRA ITEMS WHICH ARE NOT PRESENT IN MAIN ORDER
        const remainingExtraItems = formattedExtraOrders?.filter(extra => {

            return !OrderFoodDetails.some(item =>
                Number(item.item_id) === Number(extra.item_id) &&
                Number(item.quantity) === Number(extra.qty)
            );
        });

        return [
            ...normalItems,
            ...remainingExtraItems
        ];

    }, [
        memoOrder?.canteen_order_id,
        OrderFoodDetails,
        formattedExtraOrders
    ]);

    /* TOTAL (ignore cancelled) */
    const totalAmount = items?.reduce((sum, item) => {
        const qty = Number(item.qty ?? item.quantity ?? 0);
        const price = Number(item.price ?? 0);
        const gstAmount = Number(item.gst_amount ?? 0);
        return sum + (qty * price) + gstAmount;
    }, 0);



    /* 
    
    Single Item Cancellation Here
    */
    const handleCancelItem = async (item) => {
        try {
            // check item exists
            if (!item) {
                warningNotify("Invalid item data");
                return;
            }

            // handle extra order
            if (item?.isExtra === true) {

                // validate extra order id
                if (!item?.extra_order_id) {
                    warningNotify("Extra order id missing");
                    return;
                }

                const payload = {
                    FoodName: item.item_name,
                    extra_order_id: item.extra_order_id,
                    updated_by: id
                };

                const response = await axioslogin.patch(
                    '/patientExtraOrder/cancel',
                    payload
                );

                const { success, message } = response?.data ?? {};

                // check response
                if (success !== 1) {
                    warningNotify(message || "Failed to cancel extra item");
                    return;
                }

                succesNotify(message || "Extra item cancelled successfully");
                return;
            }

            // validate normal order fields
            if (!item?.canteen_order_item_id) {
                warningNotify("Canteen order item id missing");
                return;
            }

            if (!memoOrder?.order_id) {
                warningNotify("Order id missing");
                return;
            }

            if (!item?.item_id) {
                warningNotify("Item id missing");
                return;
            }

            const canteenPayload = {
                FoodName: item.item_name,
                canteen_order_item_id: item.canteen_order_item_id,
                is_active: 0
            };

            const dietPayload = {
                FoodName: item.item_name,
                order_id: memoOrder.order_id,
                item_id: item.item_id,
                is_active: 0
            };

            // call both APIs
            const [canteenRes, dietRes] = await Promise.all([
                axioslogin.patch('/canteenorder/order/cancel', canteenPayload),
                axioslogin.patch('/fooddietorder/cancel-food', dietPayload)
            ]);

            // check results
            const canteenSuccess = canteenRes?.data?.success === 1;
            const dietSuccess = dietRes?.data?.success === 1;
            const canteenSuccessMessage = canteenRes?.data?.message;

            if (canteenSuccess && dietSuccess) {
                succesNotify(canteenSuccessMessage);
            } else if (canteenSuccess || dietSuccess) {
                warningNotify("Partially cancelled. Please refresh");
            } else {
                warningNotify("Cancel failed in both APIs");
            }

        } catch (err) {
            console.error("Cancel Error:", err);
            // handle error
            warningNotify(
                err?.response?.data?.message || "Something went wrong. Try again."
            );
        } finally {
            // refresh data
            FetchPatientFoodOrderDetails();
            refetchExtra();
        }
    };


    // Funciton to cancel the Total Order 
    const handleCancelFullOrder = async () => {

        if (!memoOrder?.canteen_order_id) {
            return warningNotify("Order Id is Missing Kindly Refresh!");
        }

        const ExtraOrder = items
            ?.filter(i => i.isExtra && i.order_status === 'PENDING')
            ?.map(i => ({ extra_order_id: i.extra_order_id }));

        try {
            const canteenPayload = {
                status: 'CANCELLED',
                canteen_order_id: memoOrder?.canteen_order_id,
                updated_by: id
            };

            const dietStatus = {
                order_status: 'CANCELLED',
                order_id: memoOrder?.order_id,
                updated_by: id
            };

            const extraPayload = {
                status: 'CANCELLED',
                ExtraOrder,
                updated_by: id
            };

            // Step 1: update main order
            const mainRes = await axioslogin.patch("/canteenorder/status", canteenPayload);

            if (mainRes?.data?.success === 0) {
                return warningNotify(mainRes?.data?.message);
            }

            //  Step 2: parallel secondary updates
            const requests = [];

            if (memoOrder?.party_name === 'PATIENT' && memoOrder?.order_id != null) {
                requests.push(
                    axioslogin.patch("/fooddietorder/update-diet-status", dietStatus)
                );
            }

            if (memoOrder?.party_name === 'PATIENT' && ExtraOrder.length > 0) {
                requests.push(
                    axioslogin.patch("/patientExtraOrder/status", extraPayload)
                );
            }

            const responses = await Promise.all(requests);

            for (const res of responses) {
                if (!res || res?.data?.success !== 1) {
                    errorNotify(res?.data?.message || "Update failed");
                }
            }

            succesNotify("Order Cancelled Successfully");

            FetchPatientFoodOrderDetails();
            refetchExtra();

            queryClient.invalidateQueries({ queryKey: ['canteenorders'] });
            onClose();

        } catch (error) {
            console.error(error);
            errorNotify("Something went wrong while confirming order");
        }
    };


    if (!order) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                size="sm"
                sx={{
                    width: "60vw",
                    minHeight: '40vh',
                    borderRadius: "md",
                    p: 2,
                }}>
                <ModalClose />

                {/* HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ReceiptLongOutlinedIcon fontSize="small" />
                    <DietTextComponent
                        value="Cancel Order"
                        size={18}
                        weight={600}
                    />
                </Box>

                {/* ORDER INFO */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5 }}>

                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PersonOutlineIcon sx={{ fontSize: 16 }} />
                            <DietTextComponent
                                value={memoOrder?.party_name || "Guest"}
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

                    <Box textAlign="right">
                        <RestaurantOutlinedIcon sx={{ fontSize: 14 }} />
                        <DietTextComponent
                            value={memoOrder?.order_status}
                            size={12}
                            color="#666"
                        />
                    </Box>

                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* ITEM LIST */}
                <CanteenCancelItemList
                    data={items}
                    onCancelItem={handleCancelItem}
                />

                <Divider sx={{ my: 1.5 }} />

                {/* FOOTER */}
                <Box sx={{ display: "flex", justifyContent: 'flex-end', mt: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 1
                        }}
                    >
                        <DietTextComponent
                            value={`₹ ${totalAmount?.toFixed(2)}`}
                            size={15}
                            weight={700}
                            color="#d32f2f"
                        />

                        <DietButton
                            icon={RemoveShoppingCartIcon}
                            width={150}
                            name="Cancel Full Order"
                            color="danger"
                            onClick={handleCancelFullOrder}
                        />
                    </Box>
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default memo(CancelModal);