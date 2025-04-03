import { CssVarsProvider, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, Suspense, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCRFPurchaseDashboard, getCRMDashboard, getPOStoreDashboard } from 'src/redux/actions/CrmDashBoardList.action'
import DashboardSkeleton from './Components/DashboardSkeleton'
import { getDefaultCompany } from 'src/api/CommonApiCRF'
import { useQuery } from 'react-query'

const CRFStatusView = React.lazy(() => import("./CRFStatus/CRFStatusView"))
const CRFPurchaseStatus = React.lazy(() => import("./CRFPurchaseStatus/CRFPurchaseStatus"))
const CRFStoreStatus = React.lazy(() => import("./CRFStoreStatus/CRFStoreStatus"))

const CrfDashboardMain = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCRMDashboard())
        dispatch(getCRFPurchaseDashboard())
        dispatch(getPOStoreDashboard())
    }, [dispatch])

    const crfData = useSelector((state) => {
        return state.setCRMDashBoard.setCRMDashboardList
    })
    // const crfData = useMemo(() => crfStatus, [crfStatus])

    const purchaseData = useSelector((state) => {
        return state.getCRFPurchaseDashboard.setCRMPurcahseList
    })
    // const purchaseData = useMemo(() => purchaseStatus, [purchaseStatus])

    const storeData = useSelector((state) => {
        return state.getPOStoreDashboard.setPoStoreList
    })
    // const storeData = useMemo(() => storeStatus, [storeStatus])
    // const { data: compData, isLoading: isCompLoading, error: compError } = useQuery({
    //     queryKey: 'getCompany',
    //     queryFn: () => getCompanyDetails(),
    //     staleTime: Infinity
    // });
    // const companyData = useMemo(() => compData, [compData]);


    const { data: companyData, isLoading: isCompLoading, error: compError } = useQuery({
        queryKey: 'getdefaultCompany',
        queryFn: () => getDefaultCompany(),
        staleTime: Infinity
    });
    const company = useMemo(() => companyData, [companyData]);

    if (isCompLoading) return <p>Loading...</p>;
    if (compError) return <p>Error Occurred.</p>;
    return (
        <Paper variant="outlined" sx={{ bgcolor: '#F8F8F8' }}>
            <CssVarsProvider>
                <Tabs aria-label="CRF Dashboard Tabs" defaultValue={0} sx={{ bgcolor: '#F0F4F8' }}>
                    <TabList
                        disableUnderline
                        sx={{
                            m: 0.6, gap: 0.5, pb: 0.3,
                            borderRadius: 'xl',
                            // bgcolor: 'background.level1',
                            [`& .${tabClasses.root}[aria-selected="true"]`]: {
                                boxShadow: 'sm',
                                backgroundColor: '#0277bd',
                                color: 'white',
                            },
                        }}
                    >
                        <Tab
                            disableIndicator
                            sx={{
                                ml: 0.5,
                                height: 50, borderTopLeftRadius: 200, bgcolor: 'white', border: '1px solid #c5cae9',
                                transition: 'transform 0.2s', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)', width: 250,
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    bgcolor: 'white',
                                },
                            }}

                        >  CRF Status
                        </Tab>
                        <Tab
                            disableIndicator
                            sx={{
                                height: 50, borderTopLeftRadius: 200, bgcolor: 'white', border: '1px solid #c5cae9',
                                transition: 'transform 0.2s', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)', width: 250,
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    bgcolor: 'white',
                                },
                            }}
                        >
                            CRF - Purchase Status
                        </Tab>
                        <Tab
                            disableIndicator
                            sx={{
                                height: 50, borderTopLeftRadius: 200, bgcolor: 'white', border: '1px solid #c5cae9',
                                transition: 'transform 0.2s', boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)', width: 250,
                                '&:hover': {
                                    transform: 'scale(1.01)',
                                    bgcolor: 'white',
                                },
                            }}
                        >
                            CRF - Store Status
                        </Tab>
                    </TabList>
                    {
                        /*****
                         *   <Suspense fallback={<Skeleton sx={{ 
                         * }} ></Skeleton>} > 
                         *          <CRFStatusView crfData={crfData} />
                         * </Suspense>
                                               */
                    }
                    <TabPanel value={0} sx={{ p: 0 }}>
                        <Suspense fallback={<DashboardSkeleton />}>
                            <CRFStatusView crfData={crfData} companyData={company} />
                        </Suspense>
                    </TabPanel>

                    <TabPanel value={1} sx={{ p: 0 }}>
                        <Suspense fallback={<DashboardSkeleton />}>
                            <CRFPurchaseStatus purchaseData={purchaseData} companyData={company} />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0 }}>
                        <Suspense fallback={<DashboardSkeleton />}>
                            <CRFStoreStatus storeData={storeData} companyData={company} />
                        </Suspense>
                    </TabPanel>
                </Tabs>
            </CssVarsProvider>
        </Paper >
    )
}
export default memo(CrfDashboardMain)