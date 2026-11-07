import React, { memo, useEffect, useMemo, useRef } from "react";
import {
    Drawer,
    Box,
    Divider,
} from "@mui/material";


import {
    useAllAssignedItemStatus,
    useAllItemDeliveryStatus,
    useBystanderBillingDetails,
    useOrderItemDetail,
    usePackingDetails,
    usePatientExtraOrders
} from "../../CommonData/UseQuery";

import { useSelector } from "react-redux";
import AssignedOrderSummary from "./AssignedOrderSummary";
import PackingComponent from "./PackingComponent";


const RightSideDrawer = ({
    open,
    onClose,
    width = 620,
    itemDetails,
    onPrintData,
    printOrderIds = []
}) => {

    /* =========================================================
       ITEM DETAILS
    ========================================================= */
    const sentForPrintRef = useRef(new Set())


    const {
        canteen_order_id,
        type_slno,
        fb_ip_no,
        party_type_id,
        fb_ipad_slno,
        assignment_id,
        assignment_detail_id
    } = itemDetails ?? {};




    const {
        data: packagedetail = [],
        isLoading: isPackingLoading,
        refetch: FetchPackingDetail
    } = usePackingDetails(
        assignment_detail_id
    );



    /* =========================================================
       LOGGED IN EMPLOYEE
    ========================================================= */

    const employeeId = useSelector(
        state => state.LoginUserData.empid
    );


    /* =========================================================
       ORDER ITEMS
    ========================================================= */

    const {
        data: OrderFoodDetails = [],
        isLoading: isOrderLoading
    } = useOrderItemDetail(
        canteen_order_id
    );


    /* =========================================================
       PATIENT EXTRA ORDERS
    ========================================================= */

    const {
        data: PatientExtraOrders = [],
        isLoading: isExtraLoading
    } = usePatientExtraOrders(
        fb_ipad_slno,
        "CONFIRMED"
    );


    /* =========================================================
       ASSIGNED ITEM STATUS
    ========================================================= */

    const {
        data: ItemDetailStatus = [],
        isLoading: isDetailLoading
    } = useAllAssignedItemStatus(
        employeeId,
        assignment_id
    );



    /* =========================================================
       DELIVERY STATUS
    ========================================================= */

    const {
        data: ItemDeliveryStatus = [],
        isLoading: isStatusLoading
    } = useAllItemDeliveryStatus(
        canteen_order_id,
        type_slno
    );


    /* =========================================================
       BILLING DETAILS
    ========================================================= */

    const {
        data: BystanderBillingDetails = {
            bills: [],
            bill_items: []
        }
    } = useBystanderBillingDetails(
        assignment_detail_id
    );


    const billItems =
        BystanderBillingDetails?.bill_items || [];


    /* =========================================================
       CURRENT ORDER STATUS
    ========================================================= */

    const CurrentOrderStatus = useMemo(() => {

        return ItemDetailStatus?.find(
            item =>
                Number(item?.type_slno) === Number(type_slno) &&
                String(item?.fb_ip_no) === String(fb_ip_no)
        );

    }, [
        ItemDetailStatus,
        type_slno,
        fb_ip_no
    ]);


    const dietPlanId =
        CurrentOrderStatus?.plan_id || null;


    /* =========================================================
       PAGE LOADING
    ========================================================= */

    const isPageLoading =
        isOrderLoading ||
        isExtraLoading ||
        isStatusLoading ||
        isDetailLoading;



    console.log({
        isPageLoading
    });


    /* =========================================================
       FORMAT EXTRA ORDERS
    ========================================================= */

    const formattedExtraOrders = useMemo(() => {

        return (PatientExtraOrders || []).map(item => ({

            item_id: item?.item_id,

            item_name: item?.item_name,

            qty: Number(
                item?.quantity ?? 0
            ),

            price: Number(
                item?.price ?? 0
            ),

            description:
                item?.description ?? "",

            gst: Number(
                item?.gst ?? 0
            ),

            gst_amount: Number(
                item?.gst_amount ?? 0
            ),

            isExtra: true,

            order_status:
                item?.order_status,

            extra_order_id:
                item?.extra_order_id

        }));

    }, [
        PatientExtraOrders
    ]);


    /* =========================================================
       BUILD ITEM DETAILS
    ========================================================= */

    const items = useMemo(() => {

        if (!canteen_order_id) {
            return [];
        }


        const canteenItems =
            (OrderFoodDetails || []).map(item => ({
                ...item,
                isExtra: false
            }));


        return canteenItems.map(canteenItem => {

            /* ---------------------------------------------
               EXTRA ORDER MATCH
            --------------------------------------------- */

            const matchedExtra =
                formattedExtraOrders.find(extra =>
                    Number(extra?.item_id) ===
                    Number(canteenItem?.item_id) &&

                    Number(extra?.qty) ===
                    Number(canteenItem?.quantity)
                );


            /* ---------------------------------------------
               DELIVERY STATUS MATCH
            --------------------------------------------- */

            const matchedDelivery =
                (ItemDeliveryStatus || []).find(delivery =>
                    Number(delivery?.item_id) ===
                    Number(canteenItem?.item_id)
                );


            return {

                ...canteenItem,


                /* -----------------------------------------
                   EXTRA ORDER
                ----------------------------------------- */

                isExtra:
                    !!matchedExtra,

                extra_order_id:
                    matchedExtra?.extra_order_id || null,

                extra_order_status:
                    matchedExtra?.order_status || null,


                /* -----------------------------------------
                   DELIVERY
                ----------------------------------------- */

                delivery_id:
                    matchedDelivery?.delivery_id || null,

                delivery_status:
                    matchedDelivery?.delivery_status ||
                    "PENDING",

                delivered_qty:
                    Number(
                        matchedDelivery?.delivered_qty || 0
                    ),

                delivered_time:
                    matchedDelivery?.delivered_time ||
                    null,

                delivery_remarks:
                    matchedDelivery?.delivery_remarks ||
                    null,

                updated_by:
                    matchedDelivery?.updated_by ||
                    null,

                updated_at:
                    matchedDelivery?.updated_at ||
                    null,

                updated_remarks:
                    matchedDelivery?.updated_remarks ||
                    null,

                develivered_by:
                    matchedDelivery?.develivered_by ||
                    null,

                UpdatedByEmployee:
                    matchedDelivery?.UpdatedByEmployee ||
                    null

            };

        });

    }, [
        canteen_order_id,
        OrderFoodDetails,
        formattedExtraOrders,
        ItemDeliveryStatus
    ]);


    /* =========================================================
       FINAL FILTERED DATA
    ========================================================= */

    const FinalFilteredData = useMemo(() => {

        const data =
            (items || []).map(item => {

                let source_type =
                    "CANTEEN_ORDER";

                let source_id =
                    item?.canteen_order_item_id;


                /* -----------------------------------------
                   PATIENT WITH ACTIVE DIET PLAN
                ----------------------------------------- */

                if (
                    Number(party_type_id) === 2 &&
                    dietPlanId
                ) {

                    if (item?.isExtra) {

                        source_type =
                            "PATIENT_EXTRA_ORDER";

                        source_id =
                            item?.extra_order_id;

                    } else {

                        source_type =
                            "DIET_ORDER";

                        source_id =
                            null;
                    }
                }


                /* -----------------------------------------
                   BILL STATUS
                ----------------------------------------- */

                const matchedBillItem =
                    billItems?.find(
                        billItem =>
                            Number(
                                billItem?.delivery_id
                            ) ===
                            Number(
                                item?.delivery_id
                            )
                    );


                const ItemBillStatus =
                    matchedBillItem
                        ?.bill_item_status ||
                    null;


                const isBilled =
                    !!matchedBillItem;


                return {

                    ...item,

                    source_type,

                    source_id,

                    isBilled,

                    ItemBillStatus

                };

            });


        /* ---------------------------------------------
           FILTER BY MEAL TYPE
        --------------------------------------------- */

        return type_slno
            ? data.filter(
                item =>
                    Number(item?.type_slno) ===
                    Number(type_slno)
            )
            : data;

    }, [
        items,
        type_slno,
        dietPlanId,
        party_type_id,
        billItems
    ]);



    useEffect(() => {
        if (!canteen_order_id) return;

        const isPrintRequested = printOrderIds.includes(canteen_order_id);
        if (!isPrintRequested) return;

        if (!FinalFilteredData?.length) return;

        if (sentForPrintRef.current.has(canteen_order_id)) return;
        sentForPrintRef.current.add(canteen_order_id);

        onPrintData?.({
            orderId: canteen_order_id,
            items: FinalFilteredData,
            itemCount: FinalFilteredData.length,
            printCount: FinalFilteredData.length
        });
    }, [canteen_order_id, FinalFilteredData, printOrderIds, onPrintData]);


    return (

        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: {
                        xs: "100%",
                        sm: width
                    }
                }
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                <AssignedOrderSummary itemDetails={itemDetails} />

                <Divider />



                <PackingComponent
                    items={FinalFilteredData}
                    orderId={canteen_order_id}
                    assignmentDetailId={assignment_detail_id}
                    typeSlno={type_slno}
                    PackageDetails={packagedetail}
                    createdBy={employeeId}
                    refetch={FetchPackingDetail}
                    isLoading={isPackingLoading}
                />
            </Box>

        </Drawer>
    );
};


export default memo(RightSideDrawer);

