import { Box, Radio, RadioGroup } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import ViewSubmittedModal from '../../CondemnationList/ViewSubmittedModal';
import CondemnationApprovalModal from '../../CondemnationList/CondemnationApprovalModal';
import SelectedRegDate from '../../CondemnationList/AllDeptcondemnation/SelectedRegDate';
import AllDeptRegistrdList from '../../CondemnationList/AllDeptcondemnation/AllDeptRegistrdList';

const CondemListforMatrlMang = ({ empId, menurights }) => {



    const [formDetails, setformDetails] = useState([])
    const [modalEditFlag, setmodalEditFlag] = useState(0);
    const [modalEditOpen, setmodalEditOpen] = useState(false);
    const [formCount, setformCount] = useState(0)
    const [modalViewFlag, setmodalViewFlag] = useState(0);
    const [modalViewOpen, setmodalViewOpen] = useState(false);


    const viewForm = useCallback((val) => {
        setformDetails(val)
        setmodalViewFlag(1)
        setmodalViewOpen(true)
    }, [])

    // const editForm = useCallback((val) => {
    //     setformDetails(val)
    //     setmodalEditFlag(1)
    //     setmodalEditOpen(true)
    // }, [])

    const SatusFrom = 8
    const SatusTo = 6

    // const condemStatusFrom = 7
    // const condemstatusTo = 6

    // const postCondemAllDept = useMemo(() => {
    //     return {

    //         condemStatusFrom: condemStatusFrom,
    //         condemstatusTo: condemstatusTo
    //     }
    // }, [condemStatusFrom, condemstatusTo])
    // const { data: AllDeptCondemPendingMaterials } = useQuery({
    //     queryKey: ['getAllDeptCondemPendingMaterails', formCount],
    //     queryFn: () => getAllDeptCondemPendingDatas(postCondemAllDept),
    // })

    const [selectedRValue, setSelectedRValue] = useState("1");
    const handleInchChange = (event) => {
        setSelectedRValue(event.target.value);
    };
    return (
        <Box>
            {modalEditFlag === 1 ?
                <CondemnationApprovalModal
                    modalApproveOpen={modalEditOpen}
                    setmodalApproveOpen={setmodalEditOpen}
                    setmodalApproveFlag={setmodalEditFlag}
                    empId={empId}
                    formDetails={formDetails}
                    setformCount={setformCount}
                    formCount={formCount}
                    menurights={menurights}
                />
                : null}
            {modalViewFlag === 1 ?
                <ViewSubmittedModal
                    modalViewOpen={modalViewOpen}
                    setmodalViewOpen={setmodalViewOpen}
                    setmodalViewFlag={setmodalViewFlag}
                    empId={empId}
                    formDetails={formDetails}
                />
                : null}
            <RadioGroup
                name="radio-buttons-group"
                value={selectedRValue}
                onChange={handleInchChange}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: "center", mt: 1.5, mb: 2 }}>
                    {/* <Radio value="1" label="Pendings" color="neutral" /> */}
                    <Radio value="1" label="Select Registered Dates" color="neutral" />
                    <Radio value="2" label="All Registered List " color="neutral" />
                </Box>
            </RadioGroup>


            {/* {selectedRValue === "1" ? */}
            {/* // <Box>
                //     <AllPendingsMaterialMange AllDeptCondemPendingMaterials={AllDeptCondemPendingMaterials} editForm={editForm} viewForm={viewForm} />
                // </Box>
                // : */}
            {selectedRValue === "1" ?
                <Box>
                    <SelectedRegDate SatusFrom={SatusFrom} SatusTo={SatusTo} viewForm={viewForm} />
                </Box> :
                selectedRValue === "2" ?
                    <Box>
                        <AllDeptRegistrdList SatusFrom={SatusFrom} SatusTo={SatusTo} viewForm={viewForm} />
                    </Box> : ''
            }
        </Box>
    )
}
export default CondemListforMatrlMang