import React, { memo, useMemo, Suspense } from 'react';
import { Box } from '@mui/joy';
import { useSelector } from 'react-redux';
import { fetchAllIncidents } from '../Master/IncidentManagement/CommonCode/IncidentCommonCode';
import { useQuery } from '@tanstack/react-query';
import CustomeIncidentLoading from './Components/CustomeIncidentLoading';
import { groupIncidents } from './CommonComponent/CommonFun';

// Lazy load heavy components
const TabComponent = React.lazy(() => import('./Components/TabComponent'));

const IncidentList = () => {

  // Get login user empid
  const id = useSelector(state => state.LoginUserData.empid);

  const {
    data: AllIncidentDetail,
    isLoading: AllincidentLoading,
    refetch: FetchalluserRegisteredIncident
  } = useQuery({
    queryKey: id ? ['allIncidents', id] : [], // only run when id exists
    queryFn: () => fetchAllIncidents(id),
    enabled: !!id,
  });

  // Group & sort incidents
  const groupedData = useMemo(() => {
    if (!AllIncidentDetail) return [];
    const grouped = groupIncidents(AllIncidentDetail);
    return grouped.sort((a, b) => b?.inc_register_slno - a?.inc_register_slno);
  }, [AllIncidentDetail]);

  // Tab data config
  const TabDetails = useMemo(() => ([
    { id: 0, name: "Open Incident", data: groupedData },
    { id: 1, name: "Close Incident", data: groupedData },
    { id: 2, name: "Root Cause Analysis", data: groupedData }
  ]), [groupedData]);


  

  return (
    <Box sx={{ width: '100%' }}>
      {AllincidentLoading && (
        <CustomeIncidentLoading text={"Loading Registered Incidents"} />
      )}
      <Suspense fallback={<CustomeIncidentLoading text="Loading Tabs..." />}>
        <TabComponent
          level={"registerduser"}
          TabDetails={TabDetails}
          fetchAgain={FetchalluserRegisteredIncident} />
      </Suspense>
    </Box>
  );
};

export default memo(IncidentList);
