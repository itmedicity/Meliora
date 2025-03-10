import { Box, } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getCondemPendingDatas } from 'src/api/AssetApis';
import EditCondemSubmitionModal from '../EditCondemSubmitionModal';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import PendingCondems from './PendingCondems';
import ViewSubmittedModal from '../ViewSubmittedModal';


const SubmittedCondemList = ({ empdept, empId }) => {

    const condemStat = 8;
    const postCondemDept = useMemo(() => {
        return {
            empdept: empdept,
            condem_status: condemStat
        };
    }, [empdept, condemStat]);


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

    const editForm = useCallback((val) => {
        setformDetails(val)
        setmodalEditFlag(1)
        setmodalEditOpen(true)
    }, [])

    const { data: CondemSubittedData } = useQuery({
        queryKey: ['getCondemPendingData', formCount],
        queryFn: () => getCondemPendingDatas(postCondemDept),
        enabled: empdept !== undefined,
    });

    // const condemStatusPending = useMemo(() => {
    //     return CondemSubittedData?.filter(item => item.condem_status === 1) || [];
    // }, [CondemSubittedData]);

    // const condemStatusInchOrHod = useMemo(() => {
    //     return CondemSubittedData?.filter(item => item.condem_status === 2 || item.condem_status === 3) || [];
    // }, [CondemSubittedData]);


    const [selectedValue, setSelectedValue] = useState("1");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return (
        <Box sx={{ py: 1, px: .5 }}>
            {modalEditFlag === 1 ?
                <EditCondemSubmitionModal
                    modalEditOpen={modalEditOpen}
                    setmodalEditOpen={setmodalEditOpen}
                    setmodalEditFlag={setmodalEditFlag}
                    empId={empId}
                    formDetails={formDetails}
                    empdept={empdept}
                    setformCount={setformCount}
                    formCount={formCount}
                />
                : null}
            {modalViewFlag === 1 ?
                <ViewSubmittedModal
                    modalViewOpen={modalViewOpen}
                    setmodalViewOpen={setmodalViewOpen}
                    setmodalViewFlag={setmodalViewFlag}
                    empId={empId}
                    formDetails={formDetails}
                    empdept={empdept}

                />
                : null}
            <RadioGroup
                name="radio-buttons-group"
                value={selectedValue}
                onChange={handleChange}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, justifyContent: "center", mt: 1.5, mb: 2 }}>
                    <Radio value="1" label="Pendings" color="neutral" />
                    <Radio value="2" label="Select Registered Days" color="neutral" />
                    <Radio value="3" label="All Registered List " color="neutral" />
                </Box>
            </RadioGroup>

            {selectedValue === "1" && <PendingCondems condemStatusPending={CondemSubittedData} editForm={editForm} viewForm={viewForm} />}


        </Box>
    )
}

export default memo(SubmittedCondemList)
