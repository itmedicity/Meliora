import { Box, CssVarsProvider, Table, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { axioslogin } from 'src/views/Axios/Axios'
import BuildCircleIcon from '@mui/icons-material/BuildCircle'
import ServiceDetailsModal from './ServiceDetailsModal'
import CircleIcon from '@mui/icons-material/Circle'

const SpareSErviceList = () => {
  const [serviceList, setServiceList] = useState([])
  const [flag, setFlag] = useState(1)
  const [open, setOpen] = useState(false)
  const [serviceDetails, setserviceDetails] = useState([])
  const [assetServiceListt, setassetServiceListt] = useState([])
  const [count, setCount] = useState(0)
  const combinedList = [...serviceList, ...assetServiceListt]

  const empsecid = useSelector((state) => {
    return state.LoginUserData.empsecid
  })

  const ServiceDetailsView = useCallback((val) => {
    setFlag(1)
    setOpen(true)
    setserviceDetails(val)
  }, [])

  useEffect(() => {
    const getServiceList = async (empsecid) => {
      const result = await axioslogin.get(`/SpareCondemService/ServiceList/${empsecid}`)
      const { success, data } = result.data
      if (success === 1) {
        setServiceList(data)
      } else {
        setServiceList([])
      }
    }
    getServiceList(empsecid)
  }, [empsecid, count])

  useEffect(() => {
    const getAssetServiceList = async (empsecid) => {
      const result = await axioslogin.get(`/SpareCondemService/AssetServiceList/${empsecid}`)
      const { success, data } = result.data
      if (success === 1) {
        setassetServiceListt(data)
      } else {
        setassetServiceListt([])
      }
    }
    getAssetServiceList(empsecid)
  }, [empsecid, count])

  const uniqueHoldReasons = [
    ...new Map(
      [
        ...serviceList
          .map((item) => ({
            holdId: item.spare_service_hold,
            reason: item.cm_hold_reason,
            holdColor: item.hold_color,
          }))
          .filter((item) => item.holdId && item.reason && item.holdColor),
        ...assetServiceListt
          .map((item) => ({
            holdId: item.asset_item_service_hold,
            reason: item.cm_hold_reason,
            holdColor: item.hold_color,
          }))
          .filter((item) => item.holdId && item.reason && item.holdColor),
      ].map((item) => [item.holdId, item]),
    ).values(),
  ]

  return (
    <Box
      sx={{
        flex: 1,
        border: 2,
        borderColor: '#F0F3F5',
        height: '90vh',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: 28,
          bgcolor: '#F0F3F5',
          color: 'grey',
          fontWeight: 550,
          py: 0.5,
          pl: 2,
        }}
      >
        Service List
      </Box>
      {flag === 1 ? (
        <ServiceDetailsModal
          open={open}
          setOpen={setOpen}
          setFlag={setFlag}
          serviceDetails={serviceDetails}
          setCount={setCount}
          count={count}
        />
      ) : null}
      {combinedList.length !== 0 ? (
        <Box sx={{ height: '80vh', overflow: 'auto', m: 1 }}>
          <CssVarsProvider>
            <Table stickyHeader size="sm" sx={{ borderRadius: 2 }} borderAxis="both">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', width: 5 }}>#</th>
                  <th style={{ textAlign: 'center', width: 10 }}>Action</th>
                  <th style={{ textAlign: 'center', width: 10 }}>Item</th>
                  <th style={{ textAlign: 'center', width: 18 }}>Item No.</th>
                  <th style={{ textAlign: 'center', width: 28 }}>Serial No.</th>
                  <th style={{ textAlign: 'center', width: 30 }}>Category</th>
                  <th style={{ textAlign: 'center', width: 40 }}>Item Name</th>
                  <th style={{ textAlign: 'center', width: 25 }}>Transfered Employee</th>
                </tr>
              </thead>
              <tbody>
                {combinedList?.map((val, index) => {
                  const isServiceItem = index < serviceList.length
                  return (
                    <tr key={index} style={{ background: val.hold_color }}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>

                      <td style={{ textAlign: 'center' }}>
                        <BuildCircleIcon
                          sx={{ color: '#4C5270', cursor: 'pointer' }}
                          onClick={() => ServiceDetailsView(val)}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {val.spare_asset_no !== undefined ? 'Spare' : 'Asset'}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {isServiceItem
                          ? `${val.spare_asset_no}/${val.spare_asset_no_only
                              .toString()
                              .padStart(6, '0')}`
                          : `${val.item_asset_no}/${val.item_asset_no_only
                              .toString()
                              .padStart(6, '0')}`}
                      </td>

                      <td style={{ textAlign: 'center' }}>{val.am_manufacture_no}</td>
                      <td style={{ textAlign: 'center' }}>{val.category_name}</td>
                      <td style={{ textAlign: 'center' }}>{val.item_name}</td>
                      <td style={{ textAlign: 'center' }}>{val.em_name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            pt: 8,
            fontWeight: 800,
            fontSize: 25,
            color: 'lightgrey',
            height: '100%',
          }}
        >
          <Typography>Empty Service List</Typography>
        </Box>
      )}
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {uniqueHoldReasons.map(({ holdId, reason, holdColor }) => (
          <Box key={holdId} sx={{ display: 'flex', alignItems: 'center', mr: 2, my: 1 }}>
            <CircleIcon sx={{ color: holdColor, fontSize: 18, mr: 0.5, border: 1 }} />
            <Box sx={{ fontSize: 15, color: '#444444', fontWeight: 600 }}>{reason}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default memo(SpareSErviceList)
