import { CssVarsProvider, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCRFPurchaseDashboard, getCRMDashboard, getPOStoreDashboard } from 'src/redux/actions/CrmDashBoardList.action'
import CRFStatusView from './CRFStatus/CRFStatusView'
import CRFPurchaseStatus from './CRFPurchaseStatus/CRFPurchaseStatus'
import CRFStoreStatus from './CRFStoreStatus/CRFStoreStatus'

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
    const purchaseData = useSelector((state) => {
        return state.getCRFPurchaseDashboard.setCRMPurcahseList
    })
    const storeData = useSelector((state) => {
        return state.getPOStoreDashboard.setPoStoreList
    })
    return (
        <Paper variant="outlined" sx={{ bgcolor: '#F8F8F8' }}>
            <CssVarsProvider>
                <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: '#F0F4F8' }}>
                    <TabList
                        disableUnderline
                        sx={{
                            m: 0.6, pt: 0.5,
                            gap: 0.5,
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
                    <TabPanel value={0} sx={{ p: 0 }}>
                        <CRFStatusView crfData={crfData} />
                    </TabPanel>
                    <TabPanel value={1} sx={{ p: 0 }}>
                        <CRFPurchaseStatus purchaseData={purchaseData} storeData={storeData} />
                    </TabPanel>
                    <TabPanel value={2} sx={{ p: 0 }}>
                        <CRFStoreStatus storeData={storeData} />
                    </TabPanel>

                </Tabs>
            </CssVarsProvider>
        </Paper >
    )
}
export default memo(CrfDashboardMain)