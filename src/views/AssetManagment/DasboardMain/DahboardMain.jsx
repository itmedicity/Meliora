import { Avatar, Box, CssVarsProvider, Grid } from '@mui/joy'
import React, { memo, useMemo } from 'react'
import {
  getTotalCountAssetType,
  getTotalCountItemType,
  getTotAssetCount,
  getTotAssetValue,
  getTotSpareCount,
  getTotSpareValue,
} from 'src/api/CommonApi'
import { useQuery } from 'react-query'
import EquipmentIcon from '@mui/icons-material/Construction'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide'
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import ChairIcon from '@mui/icons-material/Chair'
import CheckroomIcon from '@mui/icons-material/Checkroom'
import BiotechIcon from '@mui/icons-material/Biotech'
import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import HiveIcon from '@mui/icons-material/Hive'
import WebhookIcon from '@mui/icons-material/Webhook'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee'
import FitbitIcon from '@mui/icons-material/Fitbit'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import ApiIcon from '@mui/icons-material/Api'
import LightModeIcon from '@mui/icons-material/LightMode'
import PixIcon from '@mui/icons-material/Pix'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'

const DahboardMain = () => {
  const { data: totAssetVal } = useQuery({
    queryKey: ['getTotAssetValue'],
    queryFn: () => getTotAssetValue(),
  })

  const { data: totSpareVal } = useQuery({
    queryKey: ['getTotSpareValue'],
    queryFn: () => getTotSpareValue(),
  })

  const { data: totAssetCountVal } = useQuery({
    queryKey: ['getTotAssetCount'],
    queryFn: () => getTotAssetCount(),
  })

  const { data: totspareCountVal } = useQuery({
    queryKey: ['getTotSpareCount'],
    queryFn: () => getTotSpareCount(),
  })

  const { data: itemTypeVal = [] } = useQuery({
    queryKey: ['getTotalCountItemType'],
    queryFn: () => getTotalCountItemType(),
  })
  const { data: assetTypeVal = [] } = useQuery({
    queryKey: ['getTotalCountAssetType'],
    queryFn: () => getTotalCountAssetType(),
  })

  const totAssetValue = useMemo(() => totAssetVal, [totAssetVal])
  const totSpareValue = useMemo(() => totSpareVal, [totSpareVal])
  const totAssetCount = useMemo(() => totAssetCountVal, [totAssetCountVal])
  const totspareCount = useMemo(() => totspareCountVal, [totspareCountVal])
  const itemType = useMemo(() => itemTypeVal, [itemTypeVal])
  const assetType = useMemo(() => assetTypeVal, [assetTypeVal])
  const spareCount = totspareCount?.[0]?.spare_count || 0
  const assetTotVal = totAssetValue?.[0]?.tot_asset || 0
  const spareTotVal = totSpareValue?.[0]?.tot_spare || 0
  const TotalAssetValue = assetTotVal + spareTotVal
  const assetcount = totAssetCount?.[0]?.asset_count || 0

  const iconMap = {
    1: <KeyboardHideIcon />,
    2: <EquipmentIcon />,
    3: <LayersOutlinedIcon />,
    4: <MenuBookIcon />,
    5: <ChairIcon />,
    6: <CheckroomIcon />,
    7: <BiotechIcon />,
    8: <WebhookIcon />,
    9: <ApiIcon />,
    10: <PixIcon />,
    11: <ScatterPlotIcon />,
    12: <TipsAndUpdatesIcon />,
  }

  const AssetTypeIcon = {
    1: <StarHalfIcon />,
    2: <HiveIcon />,
    3: <MiscellaneousServicesIcon />,
  }

  return (
    <Box
      sx={{
        minHeight: '88vh',
        bgcolor: '#f4f6f9',
        borderRadius: 1,
        boxShadow: 2,
        // border: 1, borderColor: '#BDC6D9',
      }}
    >
      <CssVarsProvider>
        <Box
          sx={{
            flex: 1,
            height: 25,
            m: 1,
            fontSize: 14,
            p: 0.5,
            fontWeight: 600,
            color: '#636b74',
          }}
        >
          ASSET & ITEM TYPE
        </Box>
        <Box sx={{ flex: 1, height: 64, mx: 1, display: 'flex', gap: 0.5, mb: 0.5 }}>
          <Box
            sx={{
              display: 'flex',
              border: 1,
              borderColor: '#d0d6e5',
              flex: 1,
              bgcolor: 'white',
              borderRadius: 5,
            }}
          >
            <Box
              sx={{
                width: 60,
                m: 0.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 1,
                borderColor: '#d0d6e5',
                bgcolor: '#f5fcf5',
              }}
            >
              <CurrencyRupeeIcon sx={{ width: 35, height: 35, color: 'darkgreen' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 0.8, pt: 0.5 }}>
                Total Asset Value
              </Box>
              <Box sx={{ fontSize: 20, fontWeight: 600, color: 'darkgreen', pt: 0.1 }}>
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  currencyDisplay: 'code',
                })
                  .format(TotalAssetValue)
                  .replace('INR', '')}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              border: 1,
              borderColor: '#d0d6e5',
              flex: 1,
              bgcolor: 'white',
              borderRadius: 5,
            }}
          >
            <Box
              sx={{
                width: 60,
                m: 0.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 1,
                borderColor: '#d0d6e5',
                bgcolor: '#fafcfe',
              }}
            >
              <FitbitIcon sx={{ width: 35, height: 35, color: '#41729F' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 0.8, pt: 0.5 }}>
                Total Asset Count
              </Box>
              <Box sx={{ fontSize: 20, fontWeight: 600, color: '#41729F', pt: 0.1, pl: 1 }}>
                {assetcount}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              border: 1,
              borderColor: '#d0d6e5',
              flex: 1,
              bgcolor: 'white',
              borderRadius: 5,
            }}
          >
            <Box
              sx={{
                width: 60,
                m: 0.5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 1,
                borderColor: '#d0d6e5',
                bgcolor: '#fef5f5',
              }}
            >
              <MiscellaneousServicesIcon sx={{ width: 35, height: 35, color: '#a31545' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ fontSize: 14, fontWeight: 600, color: '#636b74', pl: 0.8, pt: 0.5 }}>
                Total Spare Count
              </Box>
              <Box sx={{ fontSize: 20, fontWeight: 600, color: '#a31545', pt: 0.1, pl: 1 }}>
                {spareCount}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ bgcolor: 'white', mx: 1, border: 1, borderColor: '#d0d6e5', borderRadius: 5 }}>
          <Box
            sx={{ flex: 1, mx: 1, mt: 1, fontSize: 14, p: 0.5, fontWeight: 600, color: '#636b74' }}
          >
            Asset Type
          </Box>
          <Box sx={{ flex: 1, mx: 0.5, overflowY: 'auto', overflowX: 'hidden' }}>
            <Box sx={{ pb: 1, px: 0.5 }}>
              <Grid container spacing={0.5} sx={{ flex: 1 }}>
                {assetType?.map(val => {
                  return (
                    <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={val.asset_type_slno}>
                      <Box
                        sx={{
                          display: 'flex',
                          border: 1,
                          borderColor: '#d0d6e5',
                          flex: 1,
                          bgcolor: '#fafbfd',
                          borderRadius: 5,
                          height: 70,
                        }}
                      >
                        <Box sx={{ flex: 1, pl: 1.5 }}>
                          <Box sx={{ fontSize: 20, fontWeight: 600, color: '#41729F', pt: 1.5 }}>
                            {val.asset_item_service_0_count + val.asset_item_service_1_count}
                          </Box>
                          <Box sx={{ fontSize: 13, fontWeight: 600, color: '#636b74' }}>
                            {val.asset_type_name}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            width: 60,
                            m: 0.5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                          >
                            <Avatar
                              size="lg"
                              alt="pics"
                              sx={{
                                bgcolor: 'white',
                                // boxShadow: '0px 4px 10px rgba(123, 147, 202, 0.25)'
                              }}
                            >
                              {AssetTypeIcon[val.asset_type_slno] || <BubbleChartIcon />}
                            </Avatar>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: 'white',
            mx: 1,
            border: 1,
            borderColor: '#d0d6e5',
            borderRadius: 5,
            mt: 0.5,
          }}
        >
          <Box sx={{ flex: 1, mx: 1, fontSize: 14, p: 0.5, fontWeight: 600, color: '#636b74' }}>
            Item Type
          </Box>
          <Box sx={{ flex: 1, mx: 0.5, pb: 1, px: 0.5 }}>
            <Grid container spacing={0.5} sx={{ flex: 1 }}>
              {itemType?.map(val => {
                return (
                  <Grid xs={12} sm={12} md={6} lg={4} xl={3} key={val.item_type_slno}>
                    <Box
                      sx={{
                        display: 'flex',
                        border: 1,
                        borderColor: '#d0d6e5',
                        bgcolor: '#fafbfd',
                        borderRadius: 5,
                        height: 70,
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          flexGrow: 1,
                          pl: 1.5,
                          pr: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 20,
                            fontWeight: 600,
                            color: '#41729F',
                            lineHeight: 1.2,
                          }}
                        >
                          {val.asset_item_service_0_count + val.asset_item_service_1_count}
                        </Box>

                        {/* <Tooltip title={val.item_type_name} variant='plain' sx={{ width: 200 }}> */}
                        <Box
                          sx={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#636b74',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            lineHeight: 1.2,
                          }}
                        >
                          {val.item_type_name}
                        </Box>
                        {/* </Tooltip> */}
                      </Box>
                      <Box
                        sx={{
                          width: 60,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Avatar
                          alt="pics"
                          sx={{
                            bgcolor: 'white',
                            // boxShadow: '0px 4px 10px rgba(123, 147, 202, 0.25)',
                          }}
                        >
                          {iconMap[val.item_type_slno] || <LightModeIcon />}
                        </Avatar>
                      </Box>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </Box>
      </CssVarsProvider>
    </Box>
  )
}
export default memo(DahboardMain)
