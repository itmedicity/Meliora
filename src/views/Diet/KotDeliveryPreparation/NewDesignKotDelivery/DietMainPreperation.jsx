import React, { lazy, memo, Suspense, useCallback, useState } from 'react'
import { Box } from '@mui/joy'
import MenuIcon from '@mui/icons-material/Menu'
import DietContextDrawer from './DietContextDrawer'
import PatientsViewWrapper from '../PatientsViewWrapper'
import DietTextComponent from '../../DietComponent/DietTextComponent'
// import PatientOrderModal from '../../DietModal/PatientOrderModal'
import PatientOrderCancelModal from '../../DietModal/PatientOrderCancelModal'
import ChooseAllEmployee from 'src/views/CommonSelectCode/ChooseAllEmployee'
import DietInputLabel from 'src/views/Master/DietMasters/DietComponent/DietInputLabel'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DietButton from '../../DietComponent/DietButton'
import { FILTER_ACTIONS } from '../../DietReducer/action/kotPreparationFilter.actions'
import { useKotFilter } from '../../DietReducer/contextprovider/KotFilterContext'
import AssignPatientConfirmModal from '../../DietModal/AssignPatientConfirmModal'
import Delivery from '../DietDelivery/Delivery'
import { infoNotify } from 'src/views/Common/CommonCode'
import RightSideDrawer from './RightSideDrawer'
import ProformaDetailsDrawer from './ProformaDetailsDrawer'
import { useBystanderBillingDetails, useProformaDetails } from '../../CommonData/UseQuery'
import CanteenBillDetailDrawer from './CanteenBillDetailDrawer'



const PatientOrderModal = lazy(() => import('../../DietModal/PatientOrderModal'));

const DRAWER_WIDTH = 280

const DietMainPreperation = ({
    selectedStations,
    setSelectedStations,
    FilteredPatientDetail,
    activeTab
}) => {

    const [open, setOpen] = useState(true); // For Drawer Component
    const [isScrolled, setIsScrolled] = useState(false); //For animatin Purpsose . Not Important 
    const [selectedPatient, setSelectedPatient] = useState(null); // Hanlde the Selected patient Detail
    const [modalType, setModalType] = useState(null); // Commal State for View and Cancel Modal Hanlding

    const [deliverypatient, setDeliveryPatient] = useState({});
    const [printOrderIds, setPrintOrderIds] = useState([]);
    const [printData, setPrintData] = useState({});

    

    /**
     * 
     * Handling the Gloabal Disptch State Access
     */
    const { state, dispatch } = useKotFilter();
    const { assignee, selectedPatients } = state



    const handleOpenAssigneModal = () => {
        if (!assignee) return infoNotify("Please Select Assigneee!")
        setModalType("assignall")
    }


    /* PROFORMA DETAILS */

    const {
        data: ProformaDetails = [],
        isLoading: isProformaLoading
    } = useProformaDetails(
        deliverypatient?.assignment_detail_id
    );
    // Getting Orginal Bystander Billing Details
    const {
        data: BystanderBillingDetails = {
            bills: [],
            bill_items: []
        },
        isLoading: isBillingLoading,
        // refetch: refetchBystanderBilling
    } = useBystanderBillingDetails(
        deliverypatient?.assignment_detail_id
    );

    //Bill and it Item Details
    const bills = BystanderBillingDetails?.bills || [];
    const billItems = BystanderBillingDetails?.bill_items || [];


    // console.log({
    //     billItems,
    //     bills
    // });
    const handlePrintData = useCallback((data) => {
        setPrintData(prev => {
            const existing = prev[data.orderId];

            // Simple shallow comparison; adjust if your data structure needs more
            if (
                existing &&
                existing.orderId === data.orderId &&
                existing.itemCount === data.itemCount
                // optionally compare lengths or a version field if you have one
            ) {
                return prev; // no change → avoid re-render
            }

            return {
                ...prev,
                [data.orderId]: data,
            };
        });
    }, []);


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
            {!open && <MenuIcon onClick={() => setOpen(true)}
                sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    zIndex: 20,
                    fontSize: 18,
                    cursor: 'pointer'
                }} />}
            <Box
                onScroll={(e) => {
                    setIsScrolled(e.currentTarget.scrollTop > 0)
                }}
                sx={{
                    height: '100%',
                    px: 2,
                    pl: open ? `${DRAWER_WIDTH + 20}px` : '26px',
                    transition: 'padding-left 0.3s ease',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                        display: 'none'
                    },
                }} >

                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 22,
                        // bgcolor: '#f6f6f6d9',
                        transition: 'background-color 0.2s ease',
                        p: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        bgcolor: isScrolled ? '#fffffff2' : '#f6f6f6d9',
                        boxShadow: isScrolled ? 'md' : ''
                    }}>
                    <DietTextComponent
                        size={22}
                        value={activeTab === '1' ? "DIET PREPARATION AREA" : "DIET DELIVERY AREA"}
                        color={isScrolled ? '#000000' : '#000000'}
                    />
                    <Box>
                        {
                            activeTab === '1' &&
                            <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>

                                <DietInputLabel name={"Choose Assignee"} />
                                <ChooseAllEmployee value={assignee}
                                    setValue={(value) =>
                                        dispatch({
                                            type: FILTER_ACTIONS.SET_ASSIGNEE,
                                            payload: value
                                        })
                                    } />
                            </Box>
                        }
                        {
                            activeTab === '1' &&
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <DietButton
                                    name={"Assign Patients"}
                                    width={180}
                                    icon={CheckCircleIcon}
                                    onClick={handleOpenAssigneModal}
                                />
                            </Box>
                        }

                    </Box>
                </Box>

                {
                    activeTab === '1' ?
                        <PatientsViewWrapper
                            setOpenModal={setModalType}
                            setSelectedPatient={setSelectedPatient}
                            patientsByDiet={FilteredPatientDetail}
                        />
                        : <Delivery
                            filteredPatients={FilteredPatientDetail}
                            setOpenModal={setModalType}
                            setDeliveryPatient={setDeliveryPatient}
                            printData={printData}
                            printOrderIds={printOrderIds}
                            setPrintOrderIds={setPrintOrderIds}
                            setPrintData={setPrintData}
                        />
                }

            </Box>

            <RightSideDrawer
                open={modalType === "drawer"}
                onClose={() => setModalType(null)}
                title="Order Details"
                width={500}
                itemDetails={deliverypatient}
                printOrderIds={printOrderIds}
                onPrintData={handlePrintData}
            />

            <CanteenBillDetailDrawer
                open={modalType === "bill"}
                onClose={() => setModalType(false)}
                bills={bills}
                billItems={billItems}
                patientData={deliverypatient}
                loading={isBillingLoading}
                onReturnItem={(item) => {
                    console.log("Return item:", item);
                    // API call here
                }}
                onCancelBill={(bill) => {
                    console.log("Cancel bill:", bill);
                    // API call here
                }}
            />

            <ProformaDetailsDrawer
                open={modalType === "performa"}
                bills={bills}
                loading={isProformaLoading}
                onClose={() => setModalType(null)}
                proformaDetails={ProformaDetails}
                deliverypatient={deliverypatient}
            />

            <Suspense fallback={"loading...!"}>
                <PatientOrderModal
                    open={modalType === "view"}
                    onClose={() => setModalType(null)}
                    patient={selectedPatient}
                />
            </Suspense>

            <PatientOrderCancelModal
                open={modalType === "cancel"}
                onClose={() => setModalType(null)}
                patient={selectedPatient}
            // onConfirm={(data) => HandlePatientMealcancellation(data)}
            />

            <AssignPatientConfirmModal
                open={modalType === "assignall"}
                onClose={() => {
                    setModalType(false)
                }}
                assignee={assignee}
                patients={selectedPatients}
                dispatch={dispatch}

            />


            {/* LEFT INTERNAL DRAWER */}
            <DietContextDrawer
                open={open}
                onClose={() => setOpen(false)}
                width={DRAWER_WIDTH}
                setSelectedStations={setSelectedStations}
                selectedStations={selectedStations}
            />

        </Box>

    )
}

export default memo(DietMainPreperation)
