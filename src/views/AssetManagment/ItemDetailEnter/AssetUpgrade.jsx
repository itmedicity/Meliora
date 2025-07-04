import { Box, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getallSpareUnderAsset } from 'src/api/AssetApis'
import TextComponent from 'src/views/Components/TextComponent'
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp'
import { axioslogin } from 'src/views/Axios/Axios'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CmSpareList from 'src/views/ComManagement/CmComponent/CmSpareList'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ChangeCircleSharpIcon from '@mui/icons-material/ChangeCircleSharp'

const AssetUpgrade = ({ am_item_map_slno, item_custodian_dept, count, setCount }) => {
  const [spareDetails, setSpareDetails] = useState([])
  const [sparez, setSparez] = useState(0)
  const [spareName, setSpareName] = useState('')
  const [spareData, setSpareData] = useState([])

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const { data: allSpareUnderAssetData } = useQuery({
    queryKey: ['getAssetsSpecification', count],
    queryFn: () => getallSpareUnderAsset(am_item_map_slno)
  })

  const allSpareUnderAsset = useMemo(() => allSpareUnderAssetData, [allSpareUnderAssetData])

  useEffect(() => {
    setSpareDetails(allSpareUnderAsset || [])
  }, [allSpareUnderAsset])

  const RemoveSpare = useCallback(
    val => {
      const { am_spare_item_map_slno, asset_spare_slno } = val
      const RemoveSparee = {
        delete_user: id,
        asset_spare_slno: asset_spare_slno,
        am_spare_item_map_slno: am_spare_item_map_slno
      }
      const RemoveSpareUpdate = async RemoveSparee => {
        const result = await axioslogin.patch('/ItemMapDetails/spareRemoveFromAsset', RemoveSparee)
        const { success, message } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
        } else {
          warningNotify(message)
          setCount(count + 1)
        }
      }
      RemoveSpareUpdate(RemoveSparee)
    },
    [id, setCount, count]
  )

  const serviceSparee = useCallback(
    val => {
      const { am_spare_item_map_slno, asset_spare_slno } = val
      const patchdata = {
        delete_user: id,
        asset_spare_slno: asset_spare_slno,
        am_spare_item_map_slno: am_spare_item_map_slno
      }
      const ServiceSpareUpdate = async patchdata => {
        const result = await axioslogin.patch('/ItemMapDetails/spareService', patchdata)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
        } else {
          warningNotify(message)
          setCount(count + 1)
        }
      }
      ServiceSpareUpdate(patchdata)
    },
    [id, setCount, count]
  )

  const AddNewSpare = useCallback(() => {
    if (sparez === 0) {
      infoNotify('Please select Spare')
    } else {
      const isAlreadyAdded = spareData.some(item => item.spare_asset_no_only === sparez)
      if (isAlreadyAdded) {
        infoNotify('Spare already added')
        setSparez(0)
      } else {
        const newdata = {
          am_item_map_slno: am_item_map_slno,
          spare_asset_no_only: sparez,
          spare_status: 1,
          name: spareName,
          create_user: id
        }
        const datass = [...spareData, newdata]
        setSpareData(datass)
        setSparez(0)
      }
    }
  }, [am_item_map_slno, spareData, sparez, spareName, id])

  const handleDelete = indexToDelete => {
    setSpareData(prevArray => {
      const updatedArray = prevArray.filter((_, index) => index !== indexToDelete)
      return updatedArray
    })
  }

  const SparepostData =
    spareData &&
    spareData.map(val => {
      return {
        am_item_map_slno: val.am_item_map_slno,
        am_spare_item_map_slno: val.spare_asset_no_only,
        spare_status: 1,
        create_user: val.create_user
      }
    })
  const AddNewSpareUnderAsset = useCallback(() => {
    const SparedetailInsert = async SparepostData => {
      const result = await axioslogin.post(`/ItemMapDetails/SpareDetailsInsert`, SparepostData)
      const { message, success } = result.data
      if (success === 1) {
        succesNotify('New Spare Added Under Asset')
        setCount(count + 1)
        setSpareData([])
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    SparedetailInsert(SparepostData)
  }, [SparepostData, setCount, count])

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        maxHeight: '100%',
        m: 0,
        pt: 1,
        border: 1,
        borderColor: '#E0E1E3',
        py: 1,
        pl: 2
      }}
    >
      {spareDetails.length !== 0 ? (
        <Box sx={{ flex: 1, mb: 3 }}>
          <TextComponent
            text={'SPARE PARTS'}
            sx={{
              flex: 1,
              fontWeight: 500,
              color: 'black',
              fontSize: 15
            }}
          />

          {spareDetails.length !== 0 && (
            <Box sx={{ flex: 1, mt: 1.5, display: 'flex', bgcolor: '#EBEFFB ', mr: 2 }}>
              <Box sx={{ width: 50, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
              <Box sx={{ width: 105, fontSize: 14, fontWeight: 600 }}>Spare Number</Box>
              <Box sx={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Spare Name</Box>
              <Box sx={{ width: 95, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>Remove Spare</Box>
              <Box sx={{ width: 80, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>Service</Box>
            </Box>
          )}
          {spareDetails.map((val, index) => {
            const formattedSlno =
              val.spare_asset_no_only !== undefined ? val.spare_asset_no_only.toString().padStart(6, '0') : 0
            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  display: 'flex',
                  borderBottom: 1,
                  borderColor: 'lightgrey',
                  pt: 0.8,
                  mr: 2
                }}
              >
                <Box sx={{ width: 50, textAlign: 'center', fontSize: 13, fontWeight: 500 }}>{index + 1}</Box>
                <Box sx={{ width: 105, fontSize: 13, fontWeight: 500 }}>
                  {val.spare_asset_no}/{formattedSlno}
                </Box>
                <Box sx={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{val.item_name}</Box>

                <Tooltip
                  title={'By clicking, the spare will be removed from the asset and add back to the stock'}
                  placement="top"
                  sx={{ width: 200 }}
                >
                  <Box
                    sx={{
                      width: 95,
                      textAlign: 'center',
                      fontSize: 13,
                      pr: 0.5,
                      cursor: 'pointer'
                    }}
                  >
                    <ChangeCircleSharpIcon
                      sx={{
                        color: 'black',
                        cursor: 'pointer'
                      }}
                      onClick={() => RemoveSpare(val)}
                    />
                  </Box>
                </Tooltip>
                <Tooltip
                  title={'Spare will be Transfer to Service List by clicking'}
                  sx={{ width: 200 }}
                  color="neutral"
                  placement="top"
                >
                  <Box
                    sx={{
                      width: 80,
                      textAlign: 'center',
                      fontSize: 13,
                      pr: 0.5,
                      cursor: 'pointer'
                    }}
                  >
                    <ManageAccountsSharpIcon
                      sx={{
                        color: '#603A70',
                        cursor: 'pointer',
                        p: 0.1,
                        '&:hover': { color: 'black' }
                      }}
                      onClick={() => serviceSparee(val)}
                    />
                  </Box>
                </Tooltip>
              </Box>
            )
          })}
        </Box>
      ) : null}

      <Box sx={{ mb: 2 }}>
        <TextComponent
          text={'ADD NEW SPARE'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15,
            pb: 0.5
          }}
        />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Box sx={{ flex: 1 }}>
            <CmSpareList
              sparez={sparez}
              setSparez={setSparez}
              item_custodian_dept={item_custodian_dept}
              setSpareName={setSpareName}
              count={count}
            />
          </Box>
          <Box sx={{ mr: 3, pt: 0.5 }}>
            <AddCircleIcon sx={{ height: 30, width: 30, cursor: 'pointer' }} onClick={AddNewSpare} />
          </Box>
        </Box>
        {spareData.length !== 0 ? (
          <>
            <Box sx={{ flex: 1, mr: 1, display: 'flex', bgcolor: '#EBEFFB    ', mt: 1 }}>
              <Box
                sx={{
                  flex: 0.5,
                  textAlign: 'center',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'black'
                }}
              >
                #
              </Box>
              <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600, color: 'black' }}>Spare Name</Box>
              <Box
                sx={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 600,
                  pr: 0.3,
                  color: 'black'
                }}
              >
                Action
              </Box>
            </Box>
            {spareData.map((val, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    mr: 1.1,
                    display: 'flex',
                    borderBottom: 1,
                    py: 0.5,
                    borderLeft: 1,
                    borderRight: 1,
                    ml: 0.1,
                    borderColor: 'lightgrey'
                  }}
                >
                  <Box sx={{ flex: 0.5, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                  <Box sx={{ flex: 10, fontSize: 13 }}>{val.name}</Box>
                  <Tooltip placement="left" title={'Spare will be removed  by clicking'} color="neutral">
                    <Box
                      sx={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 13,
                        pr: 0.5,
                        cursor: 'pointer'
                      }}
                    >
                      <DeleteForeverIcon
                        sx={{
                          color: 'darkred',
                          cursor: 'pointer',
                          p: 0.1,
                          '&:hover': { color: 'red' }
                        }}
                        onClick={() => handleDelete(index)}
                      />
                    </Box>
                  </Tooltip>
                </Box>
              )
            })}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  bgcolor: '#3D86D0',
                  width: 100,
                  textAlign: 'center',
                  margin: 'auto',
                  borderRadius: 2,
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  mt: 1,
                  py: 0.3,
                  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)', // Outward shadow effect
                  transform: 'translateZ(0)', // For smoother shadow rendering
                  transition: 'transform 0.2s ease', // Smooth transition on hover
                  '&:hover': {
                    boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)' // Increase shadow on hover
                  }
                }}
                onClick={AddNewSpareUnderAsset}
              >
                Add
              </Box>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  )
}

export default memo(AssetUpgrade)
