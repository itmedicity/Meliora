import { CssVarsProvider, Tab, tabClasses, TabList, TabPanel, Tabs } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, Suspense, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCRFPurchaseDashboard,
  getCRMDashboard,
  getPOStoreDashboard
} from 'src/redux/actions/CrmDashBoardList.action'
import DashboardSkeleton from './Components/DashboardSkeleton'
import { getDefaultCompany } from 'src/api/CommonApiCRF'
import { useQuery } from '@tanstack/react-query'
import { axioslogin } from 'src/views/Axios/Axios'

const CRFStatusView = React.lazy(() => import('./CRFStatus/CRFStatusView'))
const CRFPurchaseStatus = React.lazy(() => import('./CRFPurchaseStatus/CRFPurchaseStatus'))
const CRFStoreStatus = React.lazy(() => import('./CRFStoreStatus/CRFStoreStatus'))

const CrfDashboardMain = () => {
  const [Dashright, SetDashright] = useState([])
  const empsecid = useSelector(state => {
    return state.LoginUserData.empid
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCRMDashboard())
    dispatch(getCRFPurchaseDashboard())
    dispatch(getPOStoreDashboard())

    // }
  }, [dispatch])

  useEffect(() => {
    const postdata = {
      empsecid: empsecid
    }
    if (empsecid > 0) {
      const getDash = async () => {
        const result = await axioslogin.post('/newCRFRegister/Dashright', postdata)
        const { success, data } = result.data
        if (success === 1) {
          // SetDashright(data[0])
          const rights = JSON?.parse(data[0]?.dash_view)
          SetDashright(rights)
        }
      }
      getDash()
    }
  }, [empsecid])

  const crfData = useSelector(state => {
    return state.setCRMDashBoard.setCRMDashboardList
  })
  // const crfData = useMemo(() => crfStatus, [crfStatus])

  const purchaseData = useSelector(state => {
    return state.getCRFPurchaseDashboard.setCRMPurcahseList
  })
  // const purchaseData = useMemo(() => purchaseStatus, [purchaseStatus])

  const storeData = useSelector(state => {
    return state.getPOStoreDashboard.setPoStoreList
  })
  // const storeData = useMemo(() => storeStatus, [storeStatus])
  // const { data: compData, isLoading: isCompLoading, error: compError } = useQuery({
  //     queryKey: 'getCompany',
  //     queryFn: () => getCompanyDetails(),
  //     staleTime: Infinity
  // });
  // const companyData = useMemo(() => compData, [compData]);

  const {
    data: companyData,
    isLoading: isCompLoading,
    error: compError
  } = useQuery({
    queryKey: 'getdefaultCompany',
    queryFn: () => getDefaultCompany(),
    staleTime: Infinity
  })
  const company = useMemo(() => companyData, [companyData])

  if (isCompLoading) return <p>Loading...</p>
  if (compError) return <p>Error Occurred.</p>

  const availableTabs = []

  if (Dashright?.includes(1)) {
    availableTabs?.push({
      key: 'crf',
      label: 'CRF Status',
      component: <CRFStatusView crfData={crfData} companyData={company} />
    })
  }
  if (Dashright?.includes(2)) {
    availableTabs?.push({
      key: 'purchase',
      label: 'CRF - Purchase Status',
      component: <CRFPurchaseStatus purchaseData={purchaseData} companyData={company} />
    })
  }
  if (Dashright?.includes(3)) {
    availableTabs?.push({
      key: 'store',
      label: 'CRF - Store Status',
      component: <CRFStoreStatus storeData={storeData} companyData={company} />
    })
  }

  const firstTabKey = availableTabs[0]?.key

  return (
    <Paper variant="outlined" sx={{ bgcolor: '#F8F8F8', width: "100%" }}>
      {/* <CssVarsProvider> */}
      {availableTabs?.length > 0 && (
        <Tabs aria-label="CRF Dashboard Tabs" defaultValue={firstTabKey} sx={{ bgcolor: '#F0F4F8' }}>
          <TabList
            disableUnderline
            sx={{
              m: 0.6,
              gap: 0.5,
              pb: 0.3,
              borderRadius: 'xl',
              [`& .${tabClasses.root}[aria-selected="true"]`]: {
                boxShadow: 'sm',
                backgroundColor: 'var(--royal-purple-300)',
                color: 'white'
              }
            }}
          >
            {availableTabs?.map(tab => (
              <Tab
                key={tab.key}
                value={tab.key}
                disableIndicator
                sx={{
                  ml: 0.5,
                  height: 50,
                  borderTopLeftRadius: 200,
                  bgcolor: 'white',
                  border: '1px solid #c5cae9',
                  transition: 'transform 0.2s',
                  boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                  width: 250,
                  '&:hover': {
                    transform: 'scale(1.01)',
                    bgcolor: 'white'
                  }
                }}
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          {availableTabs?.map(tab => (
            <TabPanel key={tab.key} value={tab.key} sx={{ p: 0 }}>
              <Suspense fallback={<DashboardSkeleton />}>{tab.component}</Suspense>
            </TabPanel>
          ))}
        </Tabs>
      )}
      {/* </CssVarsProvider> */}
    </Paper>
  )
}
export default memo(CrfDashboardMain)
