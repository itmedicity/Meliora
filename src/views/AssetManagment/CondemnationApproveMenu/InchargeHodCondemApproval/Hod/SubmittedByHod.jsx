


import { Box, Radio, RadioGroup } from '@mui/joy'
import React, { useState } from 'react'
import HodApprovedCondemn from './HodApprovedCondemn';
import AllApprovedHodView from './AllApprovedHodView';
import RejectedHodView from './RejectedHodView';

const SubmittedByHod = ({ empdept, empid }) => {

    // const viewForm = useCallback((val) => {
    //     setformDetails(val)
    //     setmodalViewFlag(1)
    //     setmodalViewOpen(true)
    // }, [])

    // const editForm = useCallback((val) => {
    //     setformDetails(val)
    //     setmodalEditFlag(1)
    //     setmodalEditOpen(true)
    // }, [])


    // const postCondemAllDept = useMemo(() => {
    //     return {
    //         req_dept: req_dept,
    //         LvLSatusFrom: LvLSatusFrom,
    //         LvLStatusTo: LvLStatusTo
    //     }
    // }, [req_dept, LvLSatusFrom, LvLStatusTo])

    // const { data: AllSubmittedCondemList = [], isLoading } = useQuery({
    //     queryKey: ['getAllDeptCondemList', LvLSatusFrom, LvLStatusTo],
    //     queryFn: () => getAllDeptCondemList(postCondemAllDept),
    //     enabled: !!LvLSatusFrom && !!LvLStatusTo
    // });


    const [selectedRValue, setSelectedRValue] = useState("1");
    const handleInchChange = (event) => {
        setSelectedRValue(event.target.value);
    };

    return (
        <Box>
            {/* {modalEditFlag === 1 ?
                <CondemnationApproveModal
                    modalApproveOpen={modalEditOpen}
                    setmodalApproveOpen={setmodalEditOpen}
                    setmodalApproveFlag={setmodalEditFlag}
                    empId={empId}
                    formDetails={formDetails}
                    menuRightsList={menuRightsList}
                    queryClient={queryClient}
                    setformDetails={setformDetails}
                />
                : null} */}
            {/* {modalViewFlag === 1 ?
                <ViewSubmittedModal
                    modalViewOpen={modalViewOpen}
                    setmodalViewOpen={setmodalViewOpen}
                    setmodalViewFlag={setmodalViewFlag}
                    empId={empId}
                    formDetails={formDetails}
                />
                : null} */}

            <RadioGroup
                name="radio-buttons-group"
                value={selectedRValue}
                onChange={handleInchChange}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: "center", mt: 1.5, mb: 2 }}>
                    <Radio value="1" label="Pendings" color="neutral" />
                    <Radio value="2" label="All Approved" color="neutral" />
                    <Radio value="3" label="Rejected" color="neutral" />
                </Box>
            </RadioGroup>
            {selectedRValue === "1" ?
                <Box>
                    <HodApprovedCondemn empdept={empdept} empid={empid} />
                </Box>
                :
                selectedRValue === "2" ?
                    <Box>
                        <AllApprovedHodView empdept={empdept} />
                    </Box>
                    :
                    <Box>
                        <RejectedHodView empdept={empdept} />
                    </Box>}
        </Box>
    )
}

export default SubmittedByHod