import React, { memo, useMemo } from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import {
    Badge,
    Box,
    Typography
} from '@mui/joy';
import { innerHeight } from 'src/views/Constant/Constant';
import IncidentListCard from './IncidentListCard';
import { getStatusInfo } from '../CommonComponent/CommonCode';
import { useCurrentCompanyData, useIncidentCommonApprovalLevels } from '../CommonComponent/useQuery';
import { TransforIncidentLevels } from '../CommonComponent/CommonFun';
import IncidentListCardSkeleton from '../SkeletonComponent/IncidentListCardSkeleton';

const TabComponent = ({ TabDetails, edit, fetchAgain, TotalLevelDepartments, level, loadinglist }) => {

    // current level of incident
    const {
        data: CommonIncidentLevels,
        isLoading: IncidentLevelLoading
    } = useIncidentCommonApprovalLevels(TotalLevelDepartments);

    // Transforming incomming data into Managable foramt (json to array)
    const incidentlevels = useMemo(() => {
        return TransforIncidentLevels(CommonIncidentLevels);
    }, [CommonIncidentLevels]);


    const { data: CurrrentComapny, isLoading: LoadingCompanyData } = useCurrentCompanyData();


    const CompanyNumber = CurrrentComapny?.length > 0 ? CurrrentComapny[0]?.company_slno : null;

    //  CHOOSING THE CURRENT COMPANY DETAILS
    const CompanyName = useMemo(() => {
        if (CompanyNumber == null) return ''; // or loading text
        return Number(CompanyNumber) === 1
            ? 'INCI/TMCH/'
            : 'INCI/KMCH/';
    }, [CompanyNumber]);

    return (
        <Box
            sx={{
                width: '100%',
                height: (innerHeight * 90) / 100,
                borderRadius: 'lg',
                border: '1px solid #e0e0e0',
                overflow: 'hidden',
            }}>
            <Tabs
                defaultValue={0}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* This is the scrollable container */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        pr: 1,
                        // hide scrollbar
                        '::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {/* Sticky Tab Header INSIDE scroll container */}
                    <Box
                        sx={{
                            position: 'sticky',
                            top: 0,
                            zIndex: 10,
                            bgcolor: 'background.body',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <TabList
                            disableUnderline
                            tabFlex={1}
                            sx={{
                                [`& .${tabClasses.root}`]: {
                                    fontSize: 'md',
                                    fontWeight: 'lg',
                                    height: 50,
                                    [`&[aria-selected="true"]`]: {
                                        color: '#000',
                                        bgcolor: '#eeeafaff',
                                    },
                                    [`&.${tabClasses.focusVisible}`]: {
                                        outlineOffset: '-4px',
                                    },
                                },
                            }} >
                            {TabDetails?.map((item, inx) => {
                                return (
                                    <Tab key={inx} disableIndicator variant="soft" sx={{ flexGrow: 1, position: 'relative' }}>
                                        <Badge
                                            size="sm"
                                            color="primary"
                                            variant="solid"
                                            badgeContent={item?.data?.length || 0}
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    backgroundColor: '#b19af7ff',
                                                    color: '#000',
                                                    fontSize: 10,
                                                    minWidth: 18,
                                                    height: 18,
                                                    borderRadius: '999px',
                                                    px: 0.6,
                                                },
                                            }}>
                                            <Typography>{item?.name}</Typography>
                                        </Badge>
                                    </Tab>
                                )
                            })}
                        </TabList>
                    </Box>

                    {TabDetails?.map((tab) => (
                        <TabPanel key={tab?.id} value={tab?.id}>
                            {/* New Content Here */}

                            {(LoadingCompanyData || loadinglist) && (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <IncidentListCardSkeleton key={`skeleton-${i}`} />
                                ))
                            )}

                            {!(LoadingCompanyData || loadinglist) &&
                                tab?.data?.map((item, idx) => {

                                    const levelsForIncident =
                                        incidentlevels?.find(
                                            lvl => lvl.dep_id === item.dep_slno && lvl.sec_id === item.sec_slno
                                        )?.levels || [];

                                    const CurrentlevelDetail =
                                        TotalLevelDepartments?.find(
                                            lvl => lvl.dep_id === item.dep_slno && lvl.sec_id === item.sec_slno
                                        ) || {};

                                    const levelName = level || CurrentlevelDetail?.level_name;
                                    const levelNo = CurrentlevelDetail?.level_no;
                                    const levelSlno = CurrentlevelDetail?.detail_slno;

                                    const { text, icons } = getStatusInfo(item, levelsForIncident);

                                    return (
                                        <IncidentListCard
                                            key={`incident-list-${idx}`}
                                            CompanyName={CompanyName}
                                            items={item}
                                            isedit={edit}
                                            level={levelName}
                                            status={text}
                                            icons={icons}
                                            fetchAgain={fetchAgain}
                                            levelNo={levelNo}
                                            levelSlno={levelSlno}
                                            loadinglevel={IncidentLevelLoading}
                                            FinalIncidentLevels={levelsForIncident}
                                        />
                                    );
                                })}

                        </TabPanel>
                    ))}
                </Box>
            </Tabs>
        </Box>
    );

}
export default memo(TabComponent);
