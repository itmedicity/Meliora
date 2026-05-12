import React, { useState, useMemo, useEffect, memo, useRef } from "react";
import { Box, Divider } from "@mui/joy";
import DietTextComponent from "../DietComponent/DietTextComponent";
import DietButton from "../DietComponent/DietButton";
// import ChooseNursingBed from "src/views/CommonSelectCode/ChooseNursingBed";
// import ChooseNursingStation from "src/views/CommonSelectCode/ChooseNursingStation";
// import NsPatientListPanel from "./Components/NsPatientListPanel";
import CanteenOrderItemList from "../CanteenOrderConfirmation/Components/CanteenOrderItemList";
import KotItemHeader from "../KotItemList/KotItemHeader";
import '../../Master/DietMasters/DietStyle/DietStyle.css'
import {
    // useAllNursingStationPatient,
    useAllOrderPartyType,
    // useCustomerExtraOrderDetail,
    useCustomerPreviousCanteenOrder,
    useGetPatientDetail
} from "../CommonData/UseQuery";
import PatientInfoCard from "./Components/PatientInfoCard";
import { groupOrders } from "./CommonResuableFun/Reusable";
import RecentOrdersCard from "./Components/RecentOrdersCard";
import PartyTypeSelector from "./Components/PartyTypeSelector";
import FoodOrderBuilder from "./Components/FoodOrderBuilder";
import FoodDetailShowCard from "./Components/FoodDetailShowCard";
import usePrintBill from "./BillingComponent/usePrintBill";
import ThermalBill from "./BillingComponent/ThermalBill";
import BedSelect from "./Components/BedSelect";
import PrintIcon from '@mui/icons-material/Print';
import { axioslogin } from "src/views/Axios/Axios";
import { useSelector } from "react-redux";
import { errorNotify, succesNotify, warningNotify } from "src/views/Common/CommonCode";

const DirectCanteenOrders = () => {

    const [personType, setPersonType] = useState(null);

    // const [selectedStation, setSelectedStation] = useState([]);

    // const [patient, setSelectedPatient] = useState({});
    // const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [selectedFood, setSelectedFood] = useState({})
    const [mealtype, setMealType] = useState(0)
    const { data: allPartyType = [] } = useAllOrderPartyType();

    const [bed, setBed] = useState(null);

    const [items, setItems] = useState([]);

    const [tempFood, setTempFood] = useState({
        item_id: null,
        item_name: "",
        qty: "",
        measure: "",
    });

    const { data: patient } = useGetPatientDetail(bed)


    const isSubmitting = useRef(false);

    const id = useSelector(state => {
        return state.LoginUserData.empid
    })


    const { billRef, printBill } = usePrintBill();

    const filteredPartyTypes = useMemo(() => {
        return allPartyType?.filter(
            p => p.party_name === "PATIENT" || p.party_name === "BYSTANDER"
        );
    }, [allPartyType]);


    const isPatient = useMemo(() => {
        const selected = filteredPartyTypes?.find(
            t => t.party_type_id === personType
        );
        return selected?.party_name === "PATIENT";
    }, [personType, filteredPartyTypes]);


    const { fb_ipad_slno, fb_ip_no, fb_bed_slno, fb_nurse_stn_slno } = patient?.[0] ?? {};

    const { data: PreviousOrders = [], refetch: RefetchPreviousOrder } = useCustomerPreviousCanteenOrder(fb_ip_no, personType);

    const mergedOrders = useMemo(() => {
        const canteen = PreviousOrders?.map(i => ({ ...i, type: "CANTEEN" })) || [];
        return canteen;
    }, [PreviousOrders]);

    const groupedOrders = useMemo(() => {
        return groupOrders(mergedOrders);
    }, [mergedOrders]);


    const resetItem = () => {
        setItems([])
    }

    /* TOTAL */
    const totalAmount = useMemo(() => {
        return items.reduce((sum, item) => {
            const qty = Number(item.qty || 0);
            const price = Number(item.price || 0);
            const gst = Number(item.gst_amount || 0);
            return sum + (qty * price) + gst;
        }, 0);
    }, [items]);





    /* SUBMIT */
    const handleSubmit = async () => {


        if (isSubmitting.current) return; //  prevent duplicate
        isSubmitting.current = true;

        if (!items || items.length === 0) {
            isSubmitting.current = false;
            return warningNotify("No items added");
        }

        if (!mealtype) {
            isSubmitting.current = false;
            return warningNotify("Please Select Expected Delivery Time!");
        }


        const existingOrderId = PreviousOrders?.find(
            i => i.order_status === "PENDING"
        )?.canteen_order_id;



        const FinalItems = items?.map(item => ({
            ...item,
            type_slno: mealtype
        }));


        try {
            if (!personType) {
                return warningNotify("Please Select Party Type");
            }

            if (!fb_ip_no) {
                return warningNotify("Please Select Patient / Bed");
            }

            if (!fb_ipad_slno) {
                return warningNotify("Patient Admission Details Missing");
            }

            if (!fb_bed_slno) {
                return warningNotify("Room / Bed Details Missing");
            }

            if (!fb_nurse_stn_slno) {
                return warningNotify("Nursing Station Missing");
            }

            // COMMON VALIDATION
            if (!items || items.length === 0) {
                return warningNotify("No items added");
            }

            if (existingOrderId) {
                const payload = {
                    itemDetail: FinalItems,
                    canteen_order_id: existingOrderId,
                    isExtra: isPatient ? true : false,
                    patient_id: fb_ipad_slno,
                    created_by: id,
                    order_status: 'CONFIRMED'
                };
                const res = await axioslogin.post(
                    "/canteenorder/add/items",
                    payload
                );
                const { success, message } = res.data || {};
                if (success === 0) return warningNotify(message);
                succesNotify("Items added to existing order");
                RefetchPreviousOrder()
                // RefetchExtraOrders()
                printBill();
                resetItem()
                return;
            }

            // CANTEEN ORDER 
            const order = {
                admission_id: fb_ip_no,
                party_type_id: personType,
                nursing_station_id: fb_nurse_stn_slno,
                room_id: fb_bed_slno,
                created_by: id,
                status: "CONFIRMED",
                isExtra: isPatient ? true : false,
                patient_id: fb_ipad_slno,
                order_status: 'CONFIRMED'
            };

            const payload = {
                order,
                items: FinalItems
            };

            const res = await axioslogin.post(
                "/canteenorder/create",
                payload
            );

            const { success, message } = res.data || {};

            if (success !== 1) return errorNotify(message);

            succesNotify("Order created successfully");
            RefetchPreviousOrder()
            // RefetchExtraOrders()
            resetItem()
            printBill();

        } catch (err) {
            console.error(err);
            errorNotify("Something went wrong");
        } finally {
            isSubmitting.current = false; //  release
        }
    };


    const lastKeyPressTime = useRef(0);
    const submitRef = useRef(handleSubmit);

    useEffect(() => {
        submitRef.current = handleSubmit;
    }, [handleSubmit]);

    useEffect(() => {
        const handleKeyDown = (e) => {

            // Ctrl + O → blur
            if (e.ctrlKey && e.key.toLowerCase() === "o") {
                e.preventDefault();
                document.activeElement?.blur();
                return;
            }

            // Ignore typing
            if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

            if (e.key.toLowerCase() === "p") {
                const now = Date.now();

                if (now - lastKeyPressTime.current < 400) {
                    submitRef.current(); // latest safe call
                    lastKeyPressTime.current = 0; //  prevent repeat
                    return;
                }

                lastKeyPressTime.current = now;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const patientType = filteredPartyTypes?.find(
            t => t?.party_name === "PATIENT"
        );
        if (patientType) {
            setPersonType(patientType?.party_type_id);
        }
    }, [filteredPartyTypes]);



    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '90vh' }}>
            {/* HEADER */}
            <KotItemHeader name={'DIRECT CANTEEN ORDERS'} />

            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    mt: 1,
                    bgcolor: '#f6f6f6d9',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 'md',
                    display: 'flex',
                    gap: 2
                }}>

                <Box
                    sx={{
                        width: "30%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "#ffffff",
                        border: "1px solid #eee"
                    }}
                >

                    {/* TITLE */}
                    <DietTextComponent
                        value="Order Context"
                        size={16}
                        weight={700}
                    />

                    <PartyTypeSelector
                        data={filteredPartyTypes}
                        value={personType}
                        onChange={(id) => {
                            setPersonType(id);
                            setItems([]);
                            // setBed(null);
                        }}
                    />
                    <Box>
                        <DietTextComponent value="Room No" size={12} color="#777" />
                        <BedSelect setBed={setBed} />
                    </Box>

                    <Box
                        sx={{ p: 0.5, borderRadius: 2 }}>
                        <PatientInfoCard patient={patient?.[0]} />
                    </Box>


                    <Box sx={{ mt: 1 }}>
                        <RecentOrdersCard data={groupedOrders} />
                    </Box>

                </Box>


                {/* <NsPatientListPanel
                    data={ActiveNsPatient}
                    selectedBed={bed}
                    onSelectPatient={(pt) => {
                        setBed(pt.fb_bd_code);
                        setSelectedPatient(pt)
                    }}
                    isPanelOpen={isPanelOpen}
                    setIsPanelOpen={setIsPanelOpen}
                /> */}

                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 2,
                        bgcolor: "#ffffff",
                        border: "1px solid #eee"
                    }} >

                    {/* FOOD SECTION */}
                    <Box sx={{ p: 2, display: 'flex', }}>
                        <FoodOrderBuilder
                            tempFood={tempFood}
                            setTempFood={setTempFood}
                            setItems={setItems}
                            setSelectedFood={setSelectedFood}
                            patient={patient?.[0]}
                            selectedFood={selectedFood}
                            personType={personType}
                            mealtype={mealtype} setMealType={setMealType}
                        />
                        <FoodDetailShowCard selectedFood={selectedFood} />
                    </Box>

                    <Divider />

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: "auto",
                            px: 2,
                            py: 1
                        }}
                    >
                        <CanteenOrderItemList
                            data={items}
                            onRemove={(index) =>
                                setItems(prev => prev.filter((_, i) => i !== index))
                            }
                        />
                    </Box>

                    {/* FOOTER */}
                    <Box
                        sx={{
                            p: 2,
                            borderTop: "1px solid #eee",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            bgcolor: "#fafafa"
                        }}
                    >
                        <DietTextComponent
                            value={`₹ ${totalAmount.toFixed(2)}`}
                            size={18}
                            weight={700}
                            color="#1976d2"
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <DietButton
                                width={150}
                                icon={PrintIcon}
                                name="Save and Print"
                                onClick={handleSubmit}
                            />
                        </Box>
                    </Box>
                </Box>
                {items.length > 0 && (
                    <Box sx={{ p: 2, borderTop: "1px dashed #ccc" }}>
                        <ThermalBill
                            billtype={isPatient}
                            ref={billRef}
                            patient={patient?.[0]}
                            items={items}
                        />

                        {/* <button onClick={printBill}>
                            Print Bill
                        </button> */}

                    </Box>
                )}

            </Box>
        </Box>



    );
};

export default memo(DirectCanteenOrders);