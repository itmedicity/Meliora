import React, { memo, useState } from 'react'
import { Box } from '@mui/joy'
import MenuIcon from '@mui/icons-material/Menu'
import DietContextDrawer from './DietContextDrawer'
import PatientsViewWrapper from '../PatientsViewWrapper'
import DietTextComponent from '../../DietComponent/DietTextComponent'
import PatientOrderModal from '../../DietModal/PatientOrderModal'
import PatientOrderCancelModal from '../../DietModal/PatientOrderCancelModal'
import ChooseAllEmployee from 'src/views/CommonSelectCode/ChooseAllEmployee'
import DietInputLabel from 'src/views/Master/DietMasters/DietComponent/DietInputLabel'
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DietButton from '../../DietComponent/DietButton'
import { FILTER_ACTIONS } from '../../DietReducer/action/kotPreparationFilter.actions'
import { useKotFilter } from '../../DietReducer/contextprovider/KotFilterContext'
import AssignPatientConfirmModal from '../../DietModal/AssignPatientConfirmModal'
import Delivery from '../DietDelivery/Delivery'


const DRAWER_WIDTH = 280

const DietMainPreperation = ({ selectedStations, setSelectedStations, FilteredPatientDetail, activeTab }) => {

    const [open, setOpen] = useState(true); // For Drawer Component
    const [isScrolled, setIsScrolled] = useState(false); //For animatin Purpsose . Not Important 
    const [selectedPatient, setSelectedPatient] = useState(null); // Hanlde the Selected patient Detail
    const [modalType, setModalType] = useState(null); // Commal State for View and Cancel Modal Hanlding

    /**
     * 
     * Handling the Gloabal Disptch State Access
     */
    const { state, dispatch } = useKotFilter();
    const { assignee, selectedPatients } = state


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
                        {
                            activeTab === '1' &&
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <DietButton
                                    name={"Assign Patients"}
                                    width={120}
                                    icon={CheckCircleIcon}
                                    onClick={() => setModalType("assignall")}
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
                        : <Delivery filteredPatients={FilteredPatientDetail} />
                }



            </Box>


            <PatientOrderModal
                open={modalType === "view"}
                onClose={() => setModalType(null)}
                patient={selectedPatient}
            />


            <PatientOrderCancelModal
                open={modalType === "cancel"}
                onClose={() => setModalType(null)}
                patient={selectedPatient}
                onConfirm={(data) => {
                    console.log("Cancel API Payload:", data);
                    setModalType(null);
                }}
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
