import { Badge, Box, Radio, RadioGroup, } from '@mui/joy'
import React, { useState } from 'react'
import ScrapAwaitingRemainingApprovals from './ScrapAwaitingRemainingApprovals';
import AllApprovedScraps from './AllApprovedScraps';
import { axioslogin } from 'src/views/Axios/Axios';
import { useQuery } from '@tanstack/react-query';

const ScrapApprovedFormMain = ({ id, EmployeeScrapLevelForm }) => {


    // const [approvedScrapInPending, setapprovedScrapInPending] = useState([]);
    // const [approvedScrapInPendingLength, setapprovedScrapInPendingLength] = useState(0)


    const getScrapActiveToplevel = async () => {
        const { data } = await axioslogin.get('condemMasters/getScrapActiveToplevel')
        if (data.success === 2) {
            return data.data
        } else {
            return
        }
    }


    const getAllScrapsApproved = async () => {
        const levelNoFrom = Array.isArray(ScrapActiveToplevel) && ScrapActiveToplevel.length > 0
            ? ScrapActiveToplevel[0].level_no
            : null;

        const levelNoTo = Array.isArray(ScrapActiveToplevel) && ScrapActiveToplevel.length > 0
            ? ScrapActiveToplevel[0].level_no
            : null;

        const postData = {
            levelNoFrom,
            levelNoTo
        };

        const { data } = await axioslogin.post('AssetCondemnation/getScrapsApproved', postData);
        if (data.success === 2) {
            return data.data;
        } else {
            return;
        }
    };

    const getScrapsAwaitingAllApproval = async () => {

        const levelNoFrom = Array.isArray(EmployeeScrapLevelForm) && EmployeeScrapLevelForm.length > 0
            ? EmployeeScrapLevelForm[0].level_no
            : null;
        const levelNoTo = Array.isArray(ScrapActiveToplevel) && ScrapActiveToplevel.length > 0
            ? ScrapActiveToplevel[0].level_no - 1
            : null;
        const postLevelData = {
            levelNoFrom,
            levelNoTo
        };


        const { data } = await axioslogin.post('AssetCondemnation/getScrapsApproved', postLevelData);
        if (data.success === 2) {
            return data.data;
        } else {
            return;
        }
    };


    const { data: ScrapActiveToplevel } = useQuery({
        queryKey: ['getScrapActiveToplevel'],
        queryFn: getScrapActiveToplevel,
    });

    const { data: AllScrapsApproved, isLoading: isLoadingAllApproved } = useQuery({
        queryKey: ['AllScrapsApprovedList', ScrapActiveToplevel],
        queryFn: getAllScrapsApproved,
        enabled: !!ScrapActiveToplevel && ScrapActiveToplevel.length > 0
    });

    const { data: ScrapsAwaitingAllApproval = [], isLoading: isLoadingAwaitingApproval } = useQuery({
        queryKey: ['ScrapsAwaitingAllApprovalList', ScrapActiveToplevel],
        queryFn: getScrapsAwaitingAllApproval,
        enabled: !!ScrapActiveToplevel && ScrapActiveToplevel.length > 0
    });

    const [selectedValue, setSelectedValue] = useState("1");
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };


    return (
        <Box>
            <RadioGroup
                name="radio-buttons-group"
                value={selectedValue}
                onChange={handleChange}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 3, justifyContent: "center", mt: 2 }}>
                    <Badge badgeContent={0} variant='solid' color='neutral'>
                        <Radio value="1" label="Pendings" color="neutral" />
                    </Badge>
                    <Badge badgeContent={0} variant='solid' color='neutral'>
                        <Radio value="2" label="All Approved Scraps" color="neutral" />
                    </Badge>
                    <Badge badgeContent={0} variant='solid' color='neutral'>
                        <Radio value="3" label="All Rejected Scraps" color="neutral" />
                    </Badge>
                </Box>
            </RadioGroup>

            {selectedValue === "1" ?
                <Box>
                    <ScrapAwaitingRemainingApprovals ScrapsAwaitingAllApproval={ScrapsAwaitingAllApproval} isLoading={isLoadingAllApproved}
                        EmployeeScrapLevelForm={EmployeeScrapLevelForm} id={id} />
                </Box>
                :
                selectedValue === "2" ?
                    <Box>
                        <AllApprovedScraps AllScrapsApproved={AllScrapsApproved} isLoading={isLoadingAwaitingApproval}
                            EmployeeScrapLevelForm={EmployeeScrapLevelForm} id={id} />
                    </Box>
                    // :
                    // selectedValue === "3" ?
                    //     <Box>

                    //     </Box>
                    : ''}
        </Box>

    )
}

export default ScrapApprovedFormMain