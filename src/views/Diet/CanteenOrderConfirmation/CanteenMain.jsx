


import React, { memo, Suspense, useMemo, useState } from 'react'
import { Box } from '@mui/joy'
import MenuIcon from '@mui/icons-material/Menu'
import CanteenViewWrapper from './Components/CanteenViewWrapper'
import CanteenContextDrawer from './CanteenContextDrawer'
import DietTextComponent from '../DietComponent/DietTextComponent'
import ConfirmationModal from './CanteenModal/ConfirmationModal'
import CancelModal from './CanteenModal/CancelModal'
import DietButton from '../DietComponent/DietButton'
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import { useBatchFoodDetail } from '../CommonData/UseQuery'
import { organizeBatchData } from '../CommonData/CommonFun'
import { useSelector } from 'react-redux'
import { errorNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import PizzaLoader from './Components/PizzaLoader'
import { useQueryClient } from '@tanstack/react-query'
import BatchPreviewModal from './Components/BatchPreviewModal'

const DRAWER_WIDTH = 280

const CanteenMain = ({
    orders = [],
    selectedStations,
    setSelectedStations,
    activeTab
}) => {

    const [open, setOpen] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [loading, SetLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const [openBatchPreview, setOpenBatchPreview] = useState(false);
    const [batchRemark, setBatchRemark] = useState("");
    const queryClient = useQueryClient();

    const id = useSelector(state => {
        return state.LoginUserData.empid
    })

    const { data: batchFoodDetail = [] } =
        useBatchFoodDetail(selectedRows)



    const organizedBatchData = useMemo(() => {
        return organizeBatchData(batchFoodDetail);
    }, [batchFoodDetail]);



    const HandleOpenBatchCheck = async () => {
        try {
            SetLoading(true)

            if (!selectedRows?.length) {
                return warningNotify("Select Order Before Processing!");
            }

            if (!batchFoodDetail?.length) {
                return warningNotify("No Batch Food For Inserting!");
            }

            if (!batchRemark) return warningNotify("please Enter Remarks!");

            setOpenBatchPreview(true);

            if (!id) {
                return warningNotify("Processed By Staff Id Missing!");
            }

            const Payload = {
                BatchDetail: organizedBatchData,
                SelectedOrders: selectedRows,
                processed_by: id,
                remark: batchRemark
            };
           
            const result = await axioslogin.post(
                '/productionbatch/createproductionbatch',
                Payload
            );

            const { success, message } = result?.data ?? {};

            if (success === 0) {
                return errorNotify(
                    message || "Error In Inserting Batch Detail!"
                );
            }

            succesNotify(
                message || "Successfully Created The Batch!"
            );
            setSelectedRows([])
            queryClient.invalidateQueries(['ProductionMap'])
            setOpenBatchPreview(false);
            setBatchRemark("")
        } catch (error) {
            errorNotify("Error In Creating Batch Detail");
        } finally {
            SetLoading(false)
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '65vh',
                maxHeight: '75vh',
                mt: 1,
                bgcolor: '#f6f6f6d9',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 'md',
            }}
        >
            {
                loading && <PizzaLoader />
            }


            {!open && (
                <MenuIcon
                    onClick={() => setOpen(true)}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        zIndex: 20,
                        fontSize: 18,
                        cursor: 'pointer'
                    }}
                />
            )}

            <Box
                onScroll={(e) => setIsScrolled(e.currentTarget.scrollTop > 0)}
                sx={{
                    height: '100%',
                    px: 2,
                    pl: open ? `${DRAWER_WIDTH + 20}px` : '26px',
                    transition: 'padding-left 0.3s ease',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': { display: 'none' }
                }} >

                {/* HEADER */}
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 22,
                        p: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        bgcolor: isScrolled ? '#fffffff2' : '#f6f6f6d9',
                        boxShadow: isScrolled ? 'md' : ''
                    }}
                >


                    <DietTextComponent
                        size={22}
                        value="CANTEEN ORDER MANAGEMENT"
                    />
                    {
                        activeTab === "CONFIRMED" &&
                        <DietButton
                            width={200}
                            name={'CONFIRM ORDER BATCH'}
                            icon={BatchPredictionIcon}
                            onClick={() => {

                                if (!selectedRows?.length) {

                                    return warningNotify(
                                        "Select Order Before Processing!"
                                    );
                                }

                                if (!batchFoodDetail?.length) {

                                    return warningNotify(
                                        "No Batch Food For Inserting!"
                                    );
                                }

                                setOpenBatchPreview(true);
                            }}
                        />
                    }


                </Box>

                {/* CONTENT */}
                <CanteenViewWrapper
                    setSelectedRows={setSelectedRows}
                    selectedRows={selectedRows}
                    activeTab={activeTab}
                    orders={orders}
                    setOpenModal={setModalType}
                    setSelectedOrder={setSelectedOrder}
                />
            </Box>

            {/* MODALS */}
            <Suspense fallback={"loading..."}>
                <ConfirmationModal
                    activeTab={activeTab}
                    open={modalType === "order"}
                    onClose={() => setModalType(null)}
                    order={selectedOrder}
                />
            </Suspense>

            <CancelModal
                open={modalType === "cancel"}
                activeTab={activeTab}
                onClose={() => setModalType(null)}
                order={selectedOrder}
            />

            {/*  DRAWER CONNECTED */}
            <CanteenContextDrawer
                open={open}
                onClose={() => setOpen(false)}
                width={DRAWER_WIDTH}
                selectedStations={selectedStations}
                setSelectedStations={setSelectedStations}
            />
            <BatchPreviewModal
                open={openBatchPreview}
                onClose={() => setOpenBatchPreview(false)}
                organizedBatchData={organizedBatchData}
                batchRemark={batchRemark}
                setBatchRemark={setBatchRemark}
                loading={loading}
                onConfirm={async () => {

                    setOpenBatchPreview(false);

                    await HandleOpenBatchCheck();
                }}
            />
        </Box>
    )
}

export default memo(CanteenMain)