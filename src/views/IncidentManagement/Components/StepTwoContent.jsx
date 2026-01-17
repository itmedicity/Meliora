import React, { Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import CustomeIncidentLoading from './CustomeIncidentLoading';

// Lazy imports
const ManualPatientForm = lazy(() => import('./ManualPatientForm'));
const PatientDetailCard = lazy(() => import('./PatientDetailCard'));
const VisitorDetailCard = lazy(() => import('./VisitorDetailCard'));
const VisitorDetailCardDisplay = lazy(() => import('./VisitorDetailCardDisplay'));
const AddHospitalProperty = lazy(() => import('./AddHospitalProperty'));
const HospitalPropertyDetailCardDisplay = lazy(() => import('./HospitalPropertyDetailCardDisplay'));
const StaffDetailCard = lazy(() => import('../StaffDetail/StaffDetailCard'));



const StepTwoContent = ({
    isloadingdetail,
    symbolToLabel,
    selectedSymbol,
    iseditdata,
    isvistoredit,
    ishpedit,
    ptdetail,
    staffdetail,
    visitordata,
    hpdetail,
    formData,
    setFormData,
    setPtDetail,
    setIsEditData,
    setVisitorData,
    setIsVisitorEdit,
    setHpDetail,
    setIsHpedit,
    HanldePatientDetailEdit,
    HandleVisitorEdit,
    HandleHpEdit

}) => {




    const type = symbolToLabel[selectedSymbol];

    return (
        <Box sx={{ position: 'relative' }}>
            {isloadingdetail && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 20,
                        backdropFilter: 'blur(2px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2,
                    }}
                >
                    <CustomeIncidentLoading text={type === "Staff" ? "Fetching Staff data..." : "Fetching patient data..."} />
                </Box>
            )}

            <Suspense fallback={<CustomeIncidentLoading text={"Loading....?"} />}>
                {type === 'Patient' && !iseditdata && (
                    <ManualPatientForm
                        goBack={setIsEditData}
                        formData={formData}
                        setFormData={setFormData}
                        setPatientDetail={setPtDetail}
                        patientDetail={ptdetail}
                    />
                )}

                {type === 'Patient' && iseditdata && ptdetail.length > 0 && (
                    <PatientDetailCard InPatientDetail={ptdetail[0]} HanldePatientDetailEdit={HanldePatientDetailEdit} />
                )}


                {/* && selectstaff staffdetail.length > 0 & &  */}
                {type === 'Staff' && (
                    <StaffDetailCard staffDetail={staffdetail?.[0]} />
                )}


                {/* isvistoredit && */}
                {type === 'Visitors' && !isvistoredit && (
                    <VisitorDetailCard
                        goBack={setIsVisitorEdit}
                        formData={formData}
                        setFormData={setFormData}
                        setVisitorDetail={setVisitorData}
                        visitordata={visitordata}
                    />
                )}

                {type === 'Visitors' && isvistoredit && visitordata.length > 0 && (
                    <VisitorDetailCardDisplay visitorDetail={visitordata} HandleVisitorEdit={HandleVisitorEdit} />
                )}

                {type === 'Hospital Properties' && !ishpedit && (
                    <AddHospitalProperty
                        goBack={setIsHpedit}
                        formData={formData}
                        setFormData={setFormData}
                        setPropertyDetail={setHpDetail}
                        hpdetail={hpdetail}
                        isEdit={!ishpedit}
                    />
                )}

                {type === 'Hospital Properties' && ishpedit && hpdetail?.length > 0 && (
                    <HospitalPropertyDetailCardDisplay
                        propertyDetail={hpdetail}
                        HandleHpEdit={HandleHpEdit}
                    />
                )}
            </Suspense>
        </Box>
    );
};

export default StepTwoContent;
