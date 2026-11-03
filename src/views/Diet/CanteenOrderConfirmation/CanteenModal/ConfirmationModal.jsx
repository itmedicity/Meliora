import React, { memo, useState, useEffect, useMemo } from "react";
import {
    Modal,
    ModalDialog,
    ModalClose,
    Box,
    Divider,
    // Tooltip
} from "@mui/joy";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { motion, AnimatePresence } from "framer-motion";
import EggIcon from '@mui/icons-material/Egg';

import { axioslogin } from "src/views/Axios/Axios";
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
import DietTextComponent from "../../DietComponent/DietTextComponent";

import DietButton from "../../DietComponent/DietButton";
import { useOrderItemDetail, usePatientExtraOrders } from "../../CommonData/UseQuery";
import CanteenOrderItemList from "../Components/CanteenOrderItemList";
import CanteenFoodSection from "../Components/CanteenFoodSection";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import FoodDetailShowCard from "../../DirectCanteenOrder/Components/FoodDetailShowCard";
import ChooseDIetType from "src/views/CommonSelectCode/ChooseDIetType";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";

const ConfirmationModal = ({ open, onClose, order, activeTab }) => {


    const queryClient = useQueryClient();
    const [selectedFood, setSelectedFood] = useState({})
    const [type_slno, setDietType] = useState(0);
    const [typename, setTypeName] = useState("");
    const [showRemarks, setShowRemarks] = useState(false);

    const memoOrder = useMemo(() => order || {}, [
        order?.canteen_order_id
    ]);



    const {
        data: OrderFoodDetails = [],
        refetch: FetchPatientFoodOrderDetails
    } = useOrderItemDetail(memoOrder?.canteen_order_id);

    const {
        data: PatientExtraOrders = [],
        refetch: FetcthPatienExtraOrders
    } = usePatientExtraOrders(memoOrder?.fb_ipad_slno, activeTab);

    const id = useSelector(state => {
        return state.LoginUserData.empid
    })


    const [items, setItems] = useState([]);
    const [opendetailcard, setOpenDetailCard] = useState(false);
    const [initialItemCount, setInitialItemCount] = useState(0);



    const isPatient = Number(memoOrder?.party_type_id) === 2;

    const orderRemarks = items[0]?.order_remarks || "";
    const PlanRemarks = items[0]?.diet_plan_remarks || "";
    const DieticianRemaks = items[0]?.dietician_remarks || "";
    const dietName = items[0]?.diet_name || "";


    const UrgentItemEmergency = Array.isArray(items) &&
        items.length > 0 ?
        items
            ?.filter(val => val.emergency_id !== null && val.emergency_status === 'PENDING_ACKNOWLEDGEMENT')
            ?.map(id => id.emergency_id)
        :
        [];

    const [tempFood, setTempFood] = useState({
        item_id: null,
        item_name: "",
        qty: "",
        measure: "",
    });

    /* SET INITIAL ITEMS */
    useEffect(() => {
        if (!memoOrder?.canteen_order_id) return;

        if (OrderFoodDetails?.length > 0) {
            setItems(OrderFoodDetails);
            setInitialItemCount(OrderFoodDetails.length);
        } else {
            setItems([]);
            setInitialItemCount(0);
        }
    }, [memoOrder?.canteen_order_id, OrderFoodDetails]);


    useEffect(() => {
        if (!open) {
            setOpenDetailCard(false);
        }
    }, [open]);


    const formattedExtraOrders = useMemo(() => {
        return (PatientExtraOrders || []).map(item => ({
            item_id: item.item_id,
            item_name: item.item_name,
            qty: Number(item.quantity ?? 0),
            price: Number(item.price ?? 0),
            description: item.description ?? "",
            gst: Number(item.gst ?? 0),
            gst_amount: Number(item.gst_amount ?? 0),

            isExtra: true,          // IDENTIFIER
            order_status: item.order_status,
            extra_order_id: item.extra_order_id
        }));
    }, [PatientExtraOrders]);



    useEffect(() => {
        if (!memoOrder?.canteen_order_id) return;

        // clone canteen items
        const canteenItems = (OrderFoodDetails || []).map(item => ({
            ...item,
            isExtra: false
        }));

        // attach matching extra order identity
        const merged = canteenItems?.map(canteenItem => {

            const matchedExtra = formattedExtraOrders.find(extra =>
                extra.item_id === canteenItem.item_id &&
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

        setItems(merged);
        setInitialItemCount(merged.length);

    }, [
        memoOrder?.canteen_order_id,
        OrderFoodDetails,
        formattedExtraOrders
    ]);

    /* TOTAL */
    const totalAmount = items?.reduce((sum, item) => {
        const qty = Number(item.qty ?? item.quantity ?? 0);
        const price = Number(item.price ?? 0);
        const gstAmount = Number(item.gst_amount ?? 0);
        return sum + (qty * price) + gstAmount;
    }, 0);

    /* NEW ITEMS */
    const newItems = items?.filter(item => item.isNew === true);

    const hasPendingOrder = items?.some(item => item?.order_status === 'PENDING');

    const hanldeExtraOrder = async () => {

        //console.log("Order for Othre Prarthy type");

        if (!memoOrder?.canteen_order_id)
            return warningNotify("Order ID Missing");

        if (newItems.length === 0)
            return warningNotify("No new items added");

        try {


            const FinalPayload = {
                itemDetail: newItems,
                canteen_order_id: memoOrder?.canteen_order_id,
                isExtra: memoOrder?.party_name === 'PATIENT' ? true : false,
                patient_id: memoOrder?.fb_ipad_slno,
                created_by: id,
                order_status: 'PENDING'
            };


            const res = await axioslogin.post(
                "/canteenorder/add/items",
                FinalPayload
            );

            const { success, message } = res.data || {};

            if (success === 0) return warningNotify(message);

            succesNotify(message);
            FetchPatientFoodOrderDetails()
            setOpenDetailCard(false);
            onClose();

        } catch (err) {
            console.error(err);
            errorNotify("Error adding extra order");
        }
    };



    const handleAcknowledgeEmergency = async () => {
        if (!UrgentItemEmergency.length)
            return warningNotify("No emergency items found");

        if (!id) return warningNotify("Employee Id is Missing !.")

        try {
            const payload = {
                emergency_ids: UrgentItemEmergency,
                acknowledged_by: id,
            };

            const res = await axioslogin.patch(
                "/canteenorder/emergency/acknowledge",
                payload
            );

            const { success, message, data } = res.data || {};

            if (success === 0)
                return warningNotify(message);

            succesNotify(
                `${data?.acknowledged_count || 0} emergency items acknowledged`
            );

            FetchPatientFoodOrderDetails();
            FetcthPatienExtraOrders();

        } catch (err) {
            console.error(err);
            errorNotify("Error acknowledging emergency items");
        }
    };


    const confirmOrder = async () => {
        if (!memoOrder?.canteen_order_id) {
            return warningNotify("Order Id is Missing Kindly Refresh!");
        }

        const ExtraOrder = items
            ?.filter(i => i.isExtra && i.order_status === 'PENDING')
            ?.map(i => ({ extra_order_id: i.extra_order_id }));

        try {
            const canteenPayload = {
                status: 'CONFIRMED',
                canteen_order_id: memoOrder?.canteen_order_id,
                updated_by: id
            };

            const dietStatus = {
                order_status: 'CONFIRMED',
                order_id: memoOrder?.order_id,
                updated_by: id
            };

            const extraPayload = {
                status: 'CONFIRMED',
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

            succesNotify("Order Confirmed Successfully");

            FetchPatientFoodOrderDetails();
            FetcthPatienExtraOrders();

            queryClient.invalidateQueries({ queryKey: ['canteenorders'] });

            setOpenDetailCard(false);
            onClose();

        } catch (error) {
            console.error(error);
            errorNotify("Something went wrong while confirming order");
        }
    };

    /* REMOVE ITEM */
    const handleRemoveItem = (index) => {
        setItems(prev => prev.filter((_, i) => i !== index));
    };

    const isStyleNeed = selectedFood && Object.keys(selectedFood).length > 0;



    if (!order) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                size="sm"
                sx={{
                    width: "70vw",
                    minHeight: '40vh',
                    borderRadius: "md",
                    p: 2,
                }}
            >
                <ModalClose />

                {/* HEADER */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ReceiptLongOutlinedIcon fontSize="small" />
                    <DietTextComponent
                        value="Canteen Order Details"
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

                        <Box>
                            <DietTextComponent
                                value={`Order ID: CAN-${String(memoOrder?.canteen_order_id || 0).padStart(6, "0")}`}
                                size={13}
                                color="#555"
                            />

                            <Box
                                onClick={() => setShowRemarks((prev) => !prev)}
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 0.6,
                                    mt: 0.5,
                                    cursor: "pointer",
                                    color: "primary.600",
                                    "&:hover": {
                                        color: "primary.800",
                                    },
                                }}
                            >
                                <NotesRoundedIcon sx={{ fontSize: 15 }} />

                                <DietTextComponent
                                    value={showRemarks ? "Hide remarks" : "View order remarks"}
                                    size={11}
                                    color="primary"
                                    fontWeight={600}
                                />

                                {showRemarks
                                    ? <KeyboardArrowUpRoundedIcon sx={{ fontSize: 16 }} />
                                    : <KeyboardArrowDownRoundedIcon sx={{ fontSize: 16 }} />
                                }
                            </Box>

                            {(memoOrder?.is_urgent === 1 && UrgentItemEmergency?.length > 0) && <Box mt={1} >

                                <DietButton
                                    width={250}
                                    icon={BrunchDiningIcon}
                                    name="Acknowledge Urgency"
                                    onClick={handleAcknowledgeEmergency}
                                />
                            </Box>}
                        </Box>

                        {showRemarks && (
                            <Box
                                sx={{
                                    mt: 1,
                                    mb: 1,
                                    p: 1.5,
                                    borderRadius: "sm",
                                    bgcolor: "background.level1",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1.2,
                                }}
                            >
                                {isPatient && (
                                    <Box sx={{
                                        maxWidth: 800
                                    }}>
                                        <DietTextComponent
                                            value="Diet Plan Remarks"
                                            size={11}
                                            color="neutral"
                                            fontWeight={700}
                                        />
                                        <DietTextComponent
                                            value={PlanRemarks || "No diet plan remarks"}
                                            size={12}
                                        />
                                        {DieticianRemaks?.trim() !== "" &&
                                            <Box sx={{
                                                mt: 1
                                            }}>

                                                <DietTextComponent
                                                    value="Dietition Remarks"
                                                    size={11}
                                                    color="neutral"
                                                    fontWeight={700}
                                                />
                                                <DietTextComponent
                                                    value={DieticianRemaks || "No Dietition  remarks"}
                                                    size={12}
                                                />  </Box>
                                        }
                                    </Box>
                                )}

                                <Box sx={{
                                    maxWidth: 800
                                }}>
                                    <DietTextComponent
                                        value="Order Remarks"
                                        size={11}
                                        color="neutral"
                                        fontWeight={700}
                                    />
                                    <DietTextComponent
                                        value={orderRemarks || "No order remarks"}
                                        size={12}
                                        wrap
                                    />
                                </Box>
                            </Box>
                        )}
                        {
                            opendetailcard &&
                            <Box mt={1} >
                                <ChooseDIetType value={type_slno} setValue={setDietType} setName={setTypeName} />
                            </Box>
                        }
                    </Box>

                    <Box textAlign="right" >
                        <RestaurantOutlinedIcon sx={{ fontSize: 14 }} />
                        <DietTextComponent
                            value={memoOrder?.order_status}
                            size={12}
                            color="#666"
                        />
                        {
                            isPatient &&
                            <Box
                                sx={{
                                    bgcolor: "#e74c3c",
                                    color: "#fff",
                                    fontSize: 12,
                                    px: 1,
                                    borderRadius: 1,
                                    fontWeight: 600,
                                    fontFamily: 'Bahnschrift',
                                    textTransform: 'uppercase'
                                }}>
                                {dietName || "Not assigned"}
                            </Box>
                        }
                        {
                            activeTab === "PENDING" &&
                            <Box mt={1} >

                                <DietButton
                                    icon={BrunchDiningIcon}
                                    name="Add Item"
                                    onClick={() => setOpenDetailCard(true)}
                                />


                            </Box>
                        }
                    </Box>
                </Box>




                {
                    activeTab === "PENDING" &&
                    <AnimatePresence>
                        {opendetailcard && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Divider sx={{ my: 1.5 }} />
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexDirection: "column",
                                        boxShadow: 'md',
                                        p: 2
                                    }}>

                                    <Box sx={{
                                        display: 'flex',
                                        width: !isStyleNeed ? '40%' : '100%',
                                        justifyContent: !isStyleNeed ? 'center' : 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <Box sx={{ width: !isStyleNeed ? '100%' : "30%" }}>
                                            <DietTextComponent
                                                value={'EXTRA ORDER DETAIL'}
                                                size={22}
                                                weight={600}
                                                color="#0a0a0a"
                                            />

                                            <CanteenFoodSection
                                                isOpen={opendetailcard}
                                                memoOrder={memoOrder}
                                                tempFood={tempFood}
                                                setTempFood={setTempFood}
                                                setItems={setItems}
                                                setOpenDetailCard={setOpenDetailCard}
                                                selectedFood={selectedFood}
                                                setSelectedFood={setSelectedFood}
                                                type_slno={type_slno}
                                                TypeName={typename}
                                            />
                                        </Box>

                                        <FoodDetailShowCard selectedFood={selectedFood} />
                                    </Box>
                                </Box>
                            </motion.div>
                        )}
                    </AnimatePresence>
                }


                <Divider sx={{ my: 1.5 }} />

                <CanteenOrderItemList
                    FetcthPatienExtraOrders={FetcthPatienExtraOrders}
                    FetchPatientFoodOrderDetails={FetchPatientFoodOrderDetails}
                    onRemove={handleRemoveItem}
                    data={items}
                    activeTab={activeTab}
                />

                <Divider sx={{ my: 1.5 }} />

                {/* CONFIRM BUTTON */}
                {items?.length > initialItemCount && (
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <DietTextComponent
                            value="New items added"
                            size={14}
                            weight={600}
                        />
                        <DietButton
                            width={150}
                            icon={MenuBookIcon}
                            name="Add New Order"
                            // onClick={memoOrder?.party_name === 'PATIENT' ? handlePatientExtraOrder : hanldeExtraOrder}
                            onClick={hanldeExtraOrder}
                        />
                    </Box>
                )}




                {/* TOTAL */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <DietTextComponent value="₹ Total" size={15} weight={600} />
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
                            color="#1976d2"
                        />
                        {hasPendingOrder && activeTab !== "CANCELLED" &&
                            <DietButton
                                width={150}
                                icon={EggIcon}
                                name="Confirm Orders"
                                onClick={confirmOrder}
                            />
                        }
                    </Box>
                </Box>

            </ModalDialog>
        </Modal>
    );
};

export default memo(ConfirmationModal);