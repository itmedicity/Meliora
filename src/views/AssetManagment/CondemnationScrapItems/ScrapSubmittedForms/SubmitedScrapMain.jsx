import { Box } from '@mui/joy'
import React, { memo, useEffect, useState } from 'react'
import { getSubmittedScarpForms } from 'src/api/AssetApis';
import SubmittedScrapPendingForm from './SubmittedScrapPendingForm';
import { useQuery } from '@tanstack/react-query';

const SubmitedScrapMain = () => {


    const [submittedPendingScarps, setsubmittedPendingScarps] = useState([]);
    const {
        data: AllsubmittedScrapData,
        isSuccess,
        isLoading
    } = useQuery({
        queryKey: ['getAllsubmittedScraps'],
        queryFn: getSubmittedScarpForms,
    });

    useEffect(() => {
        if (isSuccess) {
            setsubmittedPendingScarps(AllsubmittedScrapData);
        }
    }, [isSuccess, AllsubmittedScrapData]);



    return (
        <Box>
            <SubmittedScrapPendingForm submittedPendingScarps={submittedPendingScarps} isLoading={isLoading} />
        </Box>

    )
}

export default memo(SubmitedScrapMain)