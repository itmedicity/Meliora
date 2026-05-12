// import React, { memo, useState, useEffect, useMemo } from "react";
// import {
//     Modal,
//     ModalDialog,
//     ModalClose,
//     Box,
//     Divider,
//     Tooltip
// } from "@mui/joy";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
// import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
// import DietTextComponent from "../DietComponent/DietTextComponent";
// import PatientOrderItemList from "../DietComponent/PatientOrderItemList";
// import AddFoodSection from "../DietComponent/AddFoodSection";
// import DietButton from "../DietComponent/DietButton";
// import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
// import { motion, AnimatePresence } from "framer-motion";
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import { useAllPatientCancelledFOod, useAllPatientTemplateFoodDetail } from "../CommonData/UseQuery";
// import { formatProcessedAt } from "../CommonData/Common";
// import { useSelector } from "react-redux";
// import { axioslogin } from "src/views/Axios/Axios";
// import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";
// import PatientCancelledItemList from "../DietComponent/PatientCancelledItemList";

// const PatientOrderModal = ({ open, onClose, patient }) => {


//     const memoPatient = useMemo(() => patient || {}, [
//         patient?.plan_id,
//         patient?.type_id,
//         patient?.batch_id
//     ]);


//     console.log({
//         patient
//     });


//     const id = useSelector(state => {
//         return state.LoginUserData.empid
//     })

//     const { plan_id, type_id, batch_id } = memoPatient ?? {}

//     const { data: PaitentFoodDetail, refetch: fetchPatientFoodDetail } =
//         useAllPatientTemplateFoodDetail(plan_id, type_id, batch_id);

//     const { data: PaitentCancelledFoodDetail,
//         refetch: fetchAllCancledFoodDetail
//     } = useAllPatientCancelledFOod(plan_id, type_id, batch_id);



//     const [items, setItems] = useState(patient?.items || []);
//     const [opendetailcard, setOpenDetailCard] = useState(false);
//     const [initialItemCount, setInitialItemCount] = useState(0);
//     const [showAddTooltip, setShowAddTooltip] = useState(false);


//     //Setting Porps to the State Only For Development No need for this once real data comes
//     useEffect(() => {
//         if (PaitentFoodDetail) {
//             setItems(PaitentFoodDetail);
//             setInitialItemCount(PaitentFoodDetail.length);
//         } else {
//             setItems([]);
//             setInitialItemCount(0);
//         }
//     }, [PaitentFoodDetail]);


//     const [tempFood, setTempFood] = useState({
//         item_id: null,
//         item_name: "",
//         qty: "",
//         measure: "",
//         itemtype: "",
//         description: "",
//         Plan_id: ""
//     });

//     // Total Amount
//     const totalAmount =
//         items?.reduce((sum, item) => sum + item.qty * item.price, 0) || 0;

//     const newOrder = items?.filter(item => item.isNew === true);

//     const FinalPayload = {
//         batch_id: memoPatient?.batch_id,
//         type_id: memoPatient?.type_id,
//         plan_id: memoPatient?.plan_id,
//         diet_Id: memoPatient?.diet_id,
//         new_order_taken_by: id,
//         newOrderItem: newOrder // ? keep array properly
//     };

//     const handleNewOrders = async () => {

//         if (!memoPatient) return warningNotify("Patient Info Is Missing!!");

//         if (newOrder?.length === 0) {
//             setOpenDetailCard(true);
//             warningNotify("No Order. Please Add Items?")
//             return
//         };

//         try {
//             const response = await axioslogin.post('/fooddietorder/new-order', FinalPayload);
//             const { success, message } = response.data ?? {};
//             if (success === 0) return warningNotify(message);
//             succesNotify(message)
//             fetchPatientFoodDetail()
//             fetchAllCancledFoodDetail()
//         }
//         catch (error) {
//             console.error('Error Inserting item:', error);
//             errorNotify("Error in  Taking New Order !")
//             // Optional: show toast or alert to user
//         }
//     }

//     // Removing Item for the List
//     // Inside your component
//     const handleRemoveItem = async (item, removeIndex) => {
//         try {
//             // If item exists in DB (has production_item_id)
//             if (item.production_item_id) {
//                 const payload = {
//                     emp_id: id, // replace with current user ID dynamically
//                     plan_id: item.plan_id,
//                     production_item_id: item.production_item_id
//                 };

//                 const response = await axioslogin.post('/fooddietorder/inactive-order', payload);
//                 const { success, message } = response.data ?? {};
//                 if (success === 0) return warningNotify(message);
//                 succesNotify(message)
//                 fetchAllCancledFoodDetail()
//             }
//             // Remove from UI list regardless of API call success
//             setItems((prev) => prev.filter((_, index) => index !== removeIndex));

//         } catch (error) {
//             console.error('Error removing item:', error);
//             errorNotify("Error in Inactiving Food Item Detail!")
//             // Optional: show toast or alert to user
//         }
//     };


//     useEffect(() => {
//         if (open) {
//             setShowAddTooltip(true);

//             // Optional can be removed later but still good i think
//             const timer = setTimeout(() => {
//                 setShowAddTooltip(false);
//             }, 4000); // auto hide after 4s

//             return () => clearTimeout(timer);
//         }
//     }, [open]);


//     if (!patient) return null;

//     return (
//         <Modal open={open} onClose={onClose}>
//             <ModalDialog
//                 size="sm"
//                 sx={{
//                     width: "60vw",
//                     minHeight: '40vh',
//                     borderRadius: "md",
//                     p: 2,
//                 }}
//             >
//                 <ModalClose />

//                 {/* Header */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <ReceiptLongOutlinedIcon fontSize="small" />
//                     <DietTextComponent
//                         value="Patient Order Details"
//                         size={18}
//                         weight={600}
//                     />
//                 </Box>

//                 {/* Patient Info */}
//                 <Box
//                     sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         mt: 1.5,
//                     }} >
//                     <Box>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                             <PersonOutlineIcon sx={{ fontSize: 16 }} />
//                             <DietTextComponent
//                                 value={memoPatient.ptc_ptname}
//                                 size={15}
//                                 weight={600}
//                             />
//                         </Box>

//                         <DietTextComponent
//                             value={`IP: ${memoPatient.ip_no}`}
//                             size={13}
//                             weight={400}
//                             color="#555"
//                         />

//                         <DietTextComponent
//                             value={memoPatient.fb_ns_name}
//                             size={13}
//                             weight={400}
//                             color="#555"
//                         />

//                     </Box>

//                     <Box sx={{ textAlign: "right" }}>
//                         <Box sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 0.5,
//                             justifyContent: "flex-end",
//                             mt: 0.5
//                         }}>
//                             <RestaurantOutlinedIcon sx={{ fontSize: 14 }} />
//                             <DietTextComponent
//                                 value={memoPatient.meal}
//                                 size={12}
//                                 weight={400}
//                                 color="#666"
//                             />
//                         </Box>

//                         <Box sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: 0.5,
//                             justifyContent: "flex-end",
//                             mt: 0.5
//                         }}>
//                             <ReceiptLongOutlinedIcon sx={{ fontSize: 14 }} />
//                             <DietTextComponent
//                                 value={formatProcessedAt(memoPatient.processed_at, true)}

//                                 size={12}
//                                 weight={400}
//                                 color="#666"
//                             />
//                         </Box>

//                         <Box width={100} mt={1}>
//                             {!opendetailcard && (
//                                 <Tooltip
//                                     open={showAddTooltip}
//                                     placement="top"
//                                     variant="soft"
//                                     color="primary"
//                                     title={
//                                         <motion.div
//                                             initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             animate={{ opacity: 1, y: 0, scale: 1 }}
//                                             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                                             transition={{ duration: 0.35, ease: "easeOut" }}
//                                         >
//                                             <Box>
//                                                 <DietTextComponent
//                                                     value={"Add Food to Existing List"}
//                                                     size={13}
//                                                     weight={800}
//                                                     color="#7831b7"
//                                                 />
//                                                 <DietTextComponent
//                                                     value={
//                                                         "Click here to add additional food items to this patient’s order."
//                                                     }
//                                                     size={12}
//                                                     weight={500}
//                                                     color="#7831b7"
//                                                 />
//                                             </Box>
//                                         </motion.div>
//                                     }
//                                 >
//                                     <div
//                                         onMouseEnter={() => setShowAddTooltip(false)}
//                                     >
//                                         <DietButton
//                                             icon={BrunchDiningIcon}
//                                             name="Add Item"
//                                             onClick={() => {
//                                                 setShowAddTooltip(false);
//                                                 setOpenDetailCard(true);
//                                             }}
//                                         />
//                                     </div>
//                                 </Tooltip>
//                             )}
//                         </Box>


//                     </Box>
//                 </Box>


//                 {/* Add Section */}


//                 <AnimatePresence>
//                     {opendetailcard && (
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.95, y: -10 }}
//                             animate={{ opacity: 1, scale: 1, y: 0 }}
//                             exit={{ opacity: 0, scale: 0.95, y: -10 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <Divider sx={{ my: 1.5 }} />
//                             <Box
//                                 sx={{
//                                     display: "flex",
//                                     alignItems: "center",
//                                     flexDirection: "column",
//                                     boxShadow: 'md',
//                                     p: 2,
//                                 }}>
//                                 <Box sx={{ width: "60%" }}>
//                                     <DietTextComponent
//                                         value={'ADD FOOD DETAIL'}
//                                         size={22}
//                                         weight={600}
//                                         color="#0a0a0a"
//                                     />
//                                 </Box>

//                                 <AddFoodSection
//                                     tempFood={tempFood}
//                                     setTempFood={setTempFood}
//                                     setItems={setItems}
//                                     setOpenDetailCard={setOpenDetailCard}
//                                 />
//                             </Box>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>


//                 <Divider sx={{ my: 1.5 }} />
//                 {/* Items List */}
//                 <PatientOrderItemList
//                     items={items}
//                     onRemove={handleRemoveItem}
//                 />

//                 <PatientCancelledItemList
//                     items={PaitentCancelledFoodDetail || []}
//                 />

//                 <Divider sx={{ my: 1.5 }} />
//                 {
//                     items?.length > initialItemCount && (
//                         <Box sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             boxShadow: 'md',
//                             p: 1
//                         }}>
//                             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                                 <DietTextComponent
//                                     value={"New Items Where Added to the Patient"}
//                                     size={15}
//                                     weight={600}
//                                 />
//                             </Box>
//                             <DietButton
//                                 width={200}
//                                 icon={MenuBookIcon}
//                                 name="Confirm Order List"
//                                 onClick={handleNewOrders}
//                             />
//                         </Box>
//                     )}

//                 {/* Total */}
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                         <DietTextComponent value="₹ Total" size={15} weight={600} />
//                     </Box>

//                     <DietTextComponent
//                         value={`₹ ${totalAmount}`}
//                         size={15}
//                         weight={700}
//                         color="#1976d2"
//                     />
//                 </Box>
//             </ModalDialog>
//         </Modal>
//     );
// };

// export default memo(PatientOrderModal);





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
import { useOrderItemDetail, usePatientExtraOrders } from "../CommonData/UseQuery";
import DietTextComponent from "../DietComponent/DietTextComponent";

import CanteenOrderItemList from "../CanteenOrderConfirmation/Components/CanteenOrderItemList";

const PatientOrderModal = ({ open, onClose, patient, activeTab = "CONFIRMED" }) => {




    const memoOrder = useMemo(() => patient || {}, [
        patient?.canteen_order_id
    ]);

    const {
        data: OrderFoodDetails = [],

    } = useOrderItemDetail(memoOrder?.canteen_order_id);

    const {
        data: PatientExtraOrders = [],

    } = usePatientExtraOrders(memoOrder?.fb_ipad_slno, activeTab);


    const [items, setItems] = useState([])



    /* SET INITIAL ITEMS */
    useEffect(() => {
        if (!memoOrder?.canteen_order_id) return;

        if (OrderFoodDetails?.length > 0) {
            setItems(OrderFoodDetails);
        } else {
            setItems([]);
        }
    }, [memoOrder?.canteen_order_id, OrderFoodDetails]);





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



    if (!patient) return null;

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

                        <DietTextComponent
                            value={`Order ID: ${memoOrder?.canteen_order_id}`}
                            size={13}
                            color="#555"
                        />
                    </Box>



                </Box>

                <Divider sx={{ my: 1.5 }} />

                <CanteenOrderItemList onRemove={() => { }} data={items} />

                <Divider sx={{ my: 1.5 }} />



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