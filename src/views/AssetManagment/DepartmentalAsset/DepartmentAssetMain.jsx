import { Box, CssVarsProvider } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import CloseIcon from '@mui/icons-material/Close'
import { getCustodianDept, getDeptSecAssetList } from 'src/api/AssetApis'
import { useQuery } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { getRoomsNameNdTypeList } from 'src/redux/actions/CmRoomNameNdTypeList.action'
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import WorkIcon from '@mui/icons-material/Work'
import ConstructionIcon from '@mui/icons-material/Construction'
import HiveIcon from '@mui/icons-material/Hive'
import { Virtuoso } from 'react-virtuoso'

const DepartmentAssetMain = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [selectedDept, setSelectedDept] = useState(null)

  const secName = useSelector(state => {
    return state.LoginUserData.empdeptsec
  })

  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

  const { data: custodianArray = [] } = useQuery({
    queryKey: ['getAllCustodianDept'],
    queryFn: getCustodianDept
  })

  const CustDept = useMemo(() => custodianArray, [custodianArray])
  useEffect(() => {
    dispatch(getRoomsNameNdTypeList(empsecid))
  }, [dispatch, empsecid])

  const departmentIcons = {
    1: <KeyboardHideIcon sx={{ height: '100%', width: '100%', color: '#2C2743' }} />,
    2: <ConstructionIcon sx={{ height: '100%', width: '100%', color: '#2C2743' }} />,
    3: <StarHalfIcon sx={{ height: '100%', width: '100%', color: '#2C2743' }} />,
    4: <WorkIcon sx={{ height: '100%', width: '100%', color: '#2C2743' }} />,
    5: <SettingsSuggestIcon sx={{ height: '100%', width: '100%', color: '#2C2743' }} />
  }

  const handleSelect = deptSlno => {
    setSelectedDept(deptSlno === selectedDept ? null : deptSlno)
  }
  useEffect(() => {
    if (CustDept.length > 0) {
      setSelectedDept(CustDept[0].am_custodian_slno)
    }
  }, [CustDept])

  const searchhData = useMemo(
    () => ({
      item_custodian_dept: selectedDept,
      item_deptsec_slno: empsecid
    }),
    [selectedDept, empsecid]
  )

  const { data: getCustAssetInSec = [] } = useQuery({
    queryKey: ['getAllcustodianWiseAsset', searchhData],
    queryFn: () => getDeptSecAssetList(searchhData)
  })

  const AssetList = useMemo(() => getCustAssetInSec, [getCustAssetInSec])

  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  return (
    <Paper sx={{ borderRadius: 0, height: '90vh' }}>
      <CssVarsProvider>
        <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
          <TextComponent
            sx={{
              color: '#5A676C',
              fontWeight: 600,
              fontSize: 14,
              flex: 1,
              m: 0.5,
              pl: 1,
              fontFamily: 'Arial'
            }}
            text={`ASSET LIST ${secName}`}
          />
          <Box>
            <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
              <CloseIcon fontSize="small" />
            </CusIconButton>
          </Box>
        </Box>
        <Box sx={{ m: 0.5, border: 1, borderColor: '#D0D0D0', p: 1, borderRadius: 2, flex: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {CustDept.map(dept => {
              const icon = departmentIcons[dept.am_custodian_slno] || (
                <HiveIcon sx={{ height: '100%', width: '100%', color: '#2C2743' }} />
              )
              const isSelected = selectedDept === dept.am_custodian_slno
              return (
                <Box
                  key={dept.am_custodian_slno}
                  sx={{
                    p: 1,
                    minWidth: 180,
                    borderRadius: 8,
                    bgcolor: isSelected ? '#3e3a70' : '#615CA5',
                    boxShadow: isSelected ? 3 : 0,
                    cursor: 'pointer'
                  }}
                  onClick={() => handleSelect(dept.am_custodian_slno)}
                >
                  <Box sx={{ flex: 1, display: 'flex', height: 30, gap: 1 }}>
                    <TextComponent
                      sx={{ flex: 1, fontSize: 13, fontWeight: 800, pt: 1, color: 'white' }}
                      text={dept.am_custodian_name}
                    />
                    <Box sx={{}}>{icon}</Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box sx={{ flex: 1, m: 0.5, border: 1, p: 1, borderColor: '#D0D0D0' }}>
          <Box sx={{ flex: 1 }}>
            <TextComponent
              text={`Total Count : ${AssetList.length}`}
              sx={{ fontWeight: 600, color: '#2C2743', pb: 0.5 }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderBottom: 1,
              borderTop: 1,
              borderColor: 'lightgray',
              bgcolor: 'white',
              flex: 1
            }}
          >
            <Box sx={{ width: 70, pl: 2, pt: 1, fontWeight: 600, color: 'black', fontSize: 12 }}>#</Box>

            <Box sx={{ width: 165 }}>Asset No.</Box>
            <Box sx={{ width: 300 }}>Category</Box>
            <Box sx={{ flex: 1 }}>Item Name</Box>
          </Box>
          <Box sx={{ overflow: 'auto', flex: 1 }}>
            <Virtuoso
              style={{ height: '68vh' }}
              totalCount={AssetList.length}
              itemContent={index => {
                const val = AssetList[index]
                return (
                  <Box
                    key={val.am_spare_item_map_slno}
                    sx={{
                      borderBottom: 1,
                      borderColor: '#D3D3D3',
                      py: 0.5,
                      mb: 0.5,
                      flex: 1,
                      display: 'flex'
                    }}
                  >
                    <Box sx={{ width: 70, pl: 2, fontWeight: 400, color: 'black', fontSize: 12 }}>{index + 1}</Box>
                    <Box sx={{ width: 165, fontWeight: 400, color: 'black', fontSize: 14 }}>
                      {val.item_asset_no + '/' + val.item_asset_no_only.toString().padStart(6, '0')}
                    </Box>
                    <Box sx={{ width: 300, fontWeight: 400, color: 'black', fontSize: 14 }}>{val.category_name}</Box>
                    <Box sx={{ flex: 1, fontWeight: 400, color: 'black', fontSize: 14 }}>{val.item_name}</Box>
                  </Box>
                )
              }}
            />
          </Box>
        </Box>
      </CssVarsProvider>
    </Paper>
  )
}
export default memo(DepartmentAssetMain)
