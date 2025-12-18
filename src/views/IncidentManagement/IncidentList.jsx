import React, { memo, useMemo, Suspense } from 'react';
import { Box } from '@mui/joy';
import { useSelector } from 'react-redux';
import CustomeIncidentLoading from './Components/CustomeIncidentLoading';
import { groupIncidents } from './CommonComponent/CommonFun';
import { useAllIncidentDetails, useApprovalDepartmentFetching } from './CommonComponent/useQuery';

// Lazy load heavy components
const TabComponent = React.lazy(() => import('./Components/TabComponent'));

const IncidentList = () => {
  // Get login user empid
  const id = useSelector(state => state.LoginUserData.empid);

  const { data: ApprovalDepartments } = useApprovalDepartmentFetching(id);

  const {
    data: AllIncidentDetail,
    isLoading: AllincidentLoading,
    refetch: FetchalluserRegisteredIncident
  } = useAllIncidentDetails(id);


  // grouping data and returning them based on the tabllist
  const { rejectData, PendingList, ApprovedList, ProcessingList } = useMemo(() => {
    const grouped = groupIncidents(AllIncidentDetail)?.sort(
      (a, b) => b?.inc_register_slno - a?.inc_register_slno
    );

    return {
      rejectData: grouped.filter(
        (item) => item?.inc_current_level != 0 && item?.inc_current_level_review_state === 'R'),

      PendingList: grouped?.filter((item) => item?.inc_current_level === 0 && item?.inc_current_level_review_state === null),

      ApprovedList: grouped?.filter(
        (item) => item?.inc_all_approved === 1
      ),
      ProcessingList: grouped?.filter(
        (item) => item?.inc_current_level != 0 && item?.inc_current_level_review_state === 'A'
      ),

    };
  }, [AllIncidentDetail]);


  const TabDetails = useMemo(() => ([
    { id: 0, name: "Open ", data: PendingList, },
    { id: 1, name: "Rejected", data: rejectData },
    { id: 2, name: "Close ", data: ApprovedList },
    { id: 3, name: "Processing ", data: ProcessingList },
  ]), [PendingList, rejectData, ApprovedList, ProcessingList]);


  return (
    <Box sx={{ width: '100%' }}>
      <Suspense fallback={<CustomeIncidentLoading text="Loading Tabs..." />}>
        <TabComponent
          loadinglist={AllincidentLoading}
          level={"REGISTERED USER"}
          TabDetails={TabDetails}
          TotalLevelDepartments={ApprovalDepartments}
          fetchAgain={FetchalluserRegisteredIncident} />
      </Suspense>
    </Box>
  );
};

export default memo(IncidentList);
