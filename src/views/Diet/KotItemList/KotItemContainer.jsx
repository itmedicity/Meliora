import { Box } from '@mui/joy'
import React, { useCallback, useMemo, useState } from 'react'
import KotItemHeader from './KotItemHeader'
import DietFilterComponent from '../DietComponent/DietFilterComponent'
import KotFooterConfirm from './KotFooterConfirm'
import { useDietTimes, useKitchenOrderList } from '../CommonData/UseQuery'
import DietEmptyState from '../DietComponent/DietEmptyState'
import {
    groupMealItems,
    PrintFoodPreparationPdf,
    //  PrintFoodPreparationPdf
} from '../CommonData/CommonFun'
import { errorNotify, infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'

import KitchenStatusTab from './KitchenStatusTab'
import KotBatchCard from './KotBatchCard'

const KotItemContainer = () => {


    const [selectedBatches, setSelectedBatches] = useState([]);
    const [search, setSearch] = useState('');
    const [dietType, setDietType] = useState('');
    const [select, setSelect] = useState(false);
    const [activeTab, setActiveTab] = useState('ALL');

    // remove this when real data comes 
    const { data: DietTime = [] } = useDietTimes()
    // const id = useSelector((state) => state.LoginUserData.empid);

    const MatchType = DietTime?.find(v => v?.type_slno === Number(dietType));

    const {
        data: KitechOrderItem = [], refetch: FetchConfirmedOrder
    } = useKitchenOrderList();

    const groupedData = useMemo(() => {
        return groupMealItems(KitechOrderItem);
    }, [KitechOrderItem]);





    // Fiter data based on the Diet Type and Search keyword?
    const FinalFilterdData = useMemo(() => {

        return groupedData?.filter(item => {

            // DIET TYPE FILTER
            const matchType =
                !dietType ||
                item.meal_type?.toUpperCase() ===
                MatchType?.type_desc?.toUpperCase();

            // SEARCH FILTER
            const matchSearch =
                !search ||
                item?.item_name
                    ?.toUpperCase()
                    .includes(search.toUpperCase());

            // STATUS FILTER
            const matchStatus =
                activeTab === "ALL"
                    ? true
                    : item?.kitchen_status?.toUpperCase() ===
                    activeTab?.toUpperCase();

            return (
                matchType &&
                matchSearch &&
                matchStatus
            );

        });

    }, [
        groupedData,
        dietType,
        search,
        MatchType,
        activeTab
    ]);

    const handleBatchSelect = useCallback((batchId) => {

        setSelectedBatches(prev => {
            const exists = prev.includes(batchId);
            if (exists) {
                return prev.filter(id => id !== batchId);
            }
            return [...prev, batchId];
        });

    }, []);

    const HanldeSelectAll = useCallback((checked) => {
        setSelect(checked);
        if (checked) {
            // SELECT ONLY PENDING BATCHES
            const pendingBatchIds = FinalFilterdData
                ?.filter(batch =>
                    batch?.kitchen_status?.toUpperCase() === "PENDING"
                )
                ?.map(batch => batch.batch_id);

            setSelectedBatches(pendingBatchIds);
        } else {
            setSelectedBatches([]);
        }
    }, [FinalFilterdData]);


    const HandleBatchConfirmation = async () => {

        if (selectedBatches?.length === 0) {
            return warningNotify(
                "Select Batch List Before Sending!"
            );
        }
        // CREATE PAYLOAD ITEMS
        const payloadItems = selectedBatches.map(batch_id => ({ batch_id }));

        try {

            const payload = {
                items: payloadItems,
                kitchen_status: "SENT_TO_KITCHEN",
            };

            const res = await axioslogin.patch(
                "/productionbatch/update/batch-status",
                payload
            );

            const {
                success,
                message
            } = res.data || {};

            if (success === 0) {
                return warningNotify(message || "Error in Setting List!");
            }
            succesNotify(message || " Successfully Created Kot List");
            FetchConfirmedOrder()
            setSelectedBatches([])

        } catch (error) {
            console.error(error);
            errorNotify("Error in Status Updation");
        }
    };


    const pdfData =
        FinalFilterdData?.filter(batch => batch?.kitchen_status?.toUpperCase() === "SENT_TO_KITCHEN");

    const PrintToPdf = useCallback(() => {

        if (!pdfData?.length) {
            return infoNotify("No Item For Preparations");
        }

        PrintFoodPreparationPdf(pdfData);
    }, [pdfData]);

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                height: '90vh',

                overflowY: 'scroll',
                overflowX: 'hidden',
                scrollbarWidth: 'none',          // Firefox
                msOverflowStyle: 'none',          // IE & Edge
                '&::-webkit-scrollbar': {
                    display: 'none',               // Chrome, Safari
                },
            }}>
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 100,
                    width: "100%",
                    bgcolor: "#fff",
                    pb: 1,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
                }}
            >
                <KotItemHeader
                    name={'DIET LIST'}
                    goBackPath={''}
                />

                <DietFilterComponent
                    setSearch={setSearch}
                    setDietType={setDietType}
                    search={search}
                    dietType={dietType}
                    select={select}
                    HanldeSelectAll={HanldeSelectAll}
                />

                <KitchenStatusTab
                    kitchenOrders={FinalFilterdData}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onClick={PrintToPdf}
                />
            </Box>
            <Box
                sx={{
                    width: '95%',
                    minHeight: '55vh',

                    border: '1px solid #e9e5e56c',
                    mt: 1,
                    p: 1,
                    bgcolor: '#f6f6f6d9',
                }}
            >

                {
                    FinalFilterdData?.length === 0 ? (
                        <DietEmptyState
                            title="No food items found"
                            description="Try selecting a different diet type or search again"
                        />
                    ) : (

                        FinalFilterdData?.map((batch) => (
                            <KotBatchCard
                                key={batch.batch_id}
                                batch={batch}
                                refetch={FetchConfirmedOrder}
                                selected={
                                    selectedBatches.includes(batch.batch_id)
                                }
                                onSelectBatch={handleBatchSelect}
                            />
                        ))
                    )
                }


                <KotFooterConfirm
                    SendList={HandleBatchConfirmation}
                    confirmedItems={selectedBatches}
                    onConfirm={() => {
                        setSelect(false)
                        setSelectedBatches([])
                    }}
                />


            </Box>


        </Box>
    )
}

export default KotItemContainer