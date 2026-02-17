import React, { memo, useState, useEffect } from "react";
import {
    Modal,
    ModalDialog,
    ModalClose,
    Box,
    Divider,
    Tooltip
} from "@mui/joy";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import DietTextComponent from "../DietComponent/DietTextComponent";
import PatientOrderItemList from "../DietComponent/PatientOrderItemList";
import AddFoodSection from "../DietComponent/AddFoodSection";
import DietButton from "../DietComponent/DietButton";
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import { motion, AnimatePresence } from "framer-motion";
import MenuBookIcon from '@mui/icons-material/MenuBook';

const PatientOrderModal = ({ open, onClose, patient }) => {

    const [items, setItems] = useState(patient?.items || []);
    const [opendetailcard, setOpenDetailCard] = useState(false);
    const [initialItemCount, setInitialItemCount] = useState(0);
    const [showAddTooltip, setShowAddTooltip] = useState(false);


    //Setting Porps to the State Only For Development No need for this once real data comes
    useEffect(() => {
        if (patient?.items) {
            setItems(patient.items);
            setInitialItemCount(patient.items.length);
        } else {
            setItems([]);
            setInitialItemCount(0);
        }
    }, [patient]);


    const [tempFood, setTempFood] = useState({
        item_id: null,
        item_name: "",
        qty: "",
        measure: "",
        itemtype: "",
        description: ""
    });

    // Total Amount
    const totalAmount =
        items?.reduce((sum, item) => sum + item.qty * item.price, 0) || 0;

    // Removing Item for the List
    const hanldeRemoveItem = (removeIndex) => {
        setItems((prev) =>
            prev.filter((_, index) => index !== removeIndex)
        );
    };

    useEffect(() => {
        if (open) {
            setShowAddTooltip(true);

            // Optional can be removed later but still good i think
            const timer = setTimeout(() => {
                setShowAddTooltip(false);
            }, 4000); // auto hide after 4s

            return () => clearTimeout(timer);
        }
    }, [open]);


    if (!patient) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <ModalDialog
                size="sm"
                sx={{
                    width: "60vw",
                    minHeight: '40vh',
                    borderRadius: "md",
                    p: 2,
                }}
            >
                <ModalClose />

                {/* Header */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <ReceiptLongOutlinedIcon fontSize="small" />
                    <DietTextComponent
                        value="Patient Order Details"
                        size={18}
                        weight={600}
                    />
                </Box>

                {/* Patient Info */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1.5,
                    }} >
                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <PersonOutlineIcon sx={{ fontSize: 16 }} />
                            <DietTextComponent
                                value={patient.ptc_ptname}
                                size={15}
                                weight={600}
                            />
                        </Box>

                        <DietTextComponent
                            value={`IP: ${patient.ip_no}`}
                            size={13}
                            weight={400}
                            color="#555"
                        />

                        <DietTextComponent
                            value={patient.fb_ns_name}
                            size={13}
                            weight={400}
                            color="#555"
                        />

                    </Box>

                    <Box sx={{ textAlign: "right" }}>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            justifyContent: "flex-end",
                            mt: 0.5
                        }}>
                            <RestaurantOutlinedIcon sx={{ fontSize: 14 }} />
                            <DietTextComponent
                                value={patient.meal}
                                size={12}
                                weight={400}
                                color="#666"
                            />
                        </Box>

                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            justifyContent: "flex-end",
                            mt: 0.5
                        }}>
                            <ReceiptLongOutlinedIcon sx={{ fontSize: 14 }} />
                            <DietTextComponent
                                value={patient.order_id}
                                size={12}
                                weight={400}
                                color="#666"
                            />
                        </Box>

                        <Box width={100} mt={1}>
                            {!opendetailcard && (
                                <Tooltip
                                    open={showAddTooltip}
                                    placement="top"
                                    variant="soft"
                                    color="primary"
                                    title={
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                        >
                                            <Box>
                                                <DietTextComponent
                                                    value={"Add Food to Existing List"}
                                                    size={13}
                                                    weight={800}
                                                    color="#7831b7"
                                                />
                                                <DietTextComponent
                                                    value={
                                                        "Click here to add additional food items to this patient’s order."
                                                    }
                                                    size={12}
                                                    weight={500}
                                                    color="#7831b7"
                                                />
                                            </Box>
                                        </motion.div>
                                    }
                                >
                                    <div
                                        onMouseEnter={() => setShowAddTooltip(false)}
                                    >
                                        <DietButton
                                            icon={BrunchDiningIcon}
                                            name="Add Item"
                                            onClick={() => {
                                                setShowAddTooltip(false);
                                                setOpenDetailCard(true);
                                            }}
                                        />
                                    </div>
                                </Tooltip>
                            )}
                        </Box>


                    </Box>
                </Box>


                {/* Add Section */}


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
                                    p: 2,
                                }}>
                                <Box sx={{ width: "60%" }}>
                                    <DietTextComponent
                                        value={'ADD FOOD DETAIL'}
                                        size={22}
                                        weight={600}
                                        color="#0a0a0a"
                                    />
                                </Box>

                                <AddFoodSection
                                    tempFood={tempFood}
                                    setTempFood={setTempFood}
                                    setItems={setItems}
                                    setOpenDetailCard={setOpenDetailCard}
                                />
                            </Box>
                        </motion.div>
                    )}
                </AnimatePresence>


                <Divider sx={{ my: 1.5 }} />
                {/* Items List */}
                <PatientOrderItemList
                    items={items}
                    onRemove={hanldeRemoveItem}
                />

                <Divider sx={{ my: 1.5 }} />
                {
                    items?.length > initialItemCount && (
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            boxShadow: 'md',
                            p: 1
                        }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <DietTextComponent
                                    value="New Items Where Added to the Patient"
                                    size={15}
                                    weight={600}
                                />
                            </Box>
                            <DietButton
                                icon={MenuBookIcon}
                                name="Confirm Order List"
                                onClick={() => setOpenDetailCard(true)}
                            />
                        </Box>
                    )}

                {/* Total */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <DietTextComponent value="₹ Total" size={15} weight={600} />
                    </Box>

                    <DietTextComponent
                        value={`₹ ${totalAmount}`}
                        size={15}
                        weight={700}
                        color="#1976d2"
                    />
                </Box>
            </ModalDialog>
        </Modal>
    );
};

export default memo(PatientOrderModal);

