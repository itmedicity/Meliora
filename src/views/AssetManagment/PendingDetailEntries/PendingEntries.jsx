import { Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Virtuoso } from 'react-virtuoso'
import { getPendingDetailentryAsset, getPendingDetailentrySpare } from 'src/api/AssetApis'
import DescriptionIcon from '@mui/icons-material/Description'
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const PendingEntries = ({ enterDetails }) => {
  const [assetPendingDetails, setassetPendingDetails] = useState([])
  const [sparePendingDetails, setsparePendingDetails] = useState([])
  const [count, setCount] = useState(0)
  const combinedList = [...sparePendingDetails, ...assetPendingDetails]

  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const postData = useMemo(() => {
    return {
      am_custodian_dept_slno: empdept,
    }
  }, [empdept])

  const { data: dataAssetVal } = useQuery({
    queryKey: ['getPendingDetailentryAsset', postData, count],
    queryFn: () => getPendingDetailentryAsset(postData),
  })

  const dataAsset = useMemo(() => dataAssetVal, [dataAssetVal])

  useEffect(() => {
    setassetPendingDetails(dataAsset || [])
  }, [dataAsset])

  const { data: dataSpareVal } = useQuery({
    queryKey: ['getPendingDetailentrySpare', postData, count],
    queryFn: () => getPendingDetailentrySpare(postData),
  })

  const dataSpare = useMemo(() => dataSpareVal, [dataSpareVal])

  useEffect(() => {
    setsparePendingDetails(dataSpare || [])
  }, [dataSpare])

  const deleteitem = useCallback(
    val => {
      const { item_asset_no } = val
      const Inactive = async patchdata => {
        const result = await axioslogin.patch('/itemCreationDeptmap/itemInactive', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
        } else {
          warningNotify(message)
        }
      }
      const InactiveSpare = async patchdataSpare => {
        const result = await axioslogin.patch(
          '/itemCreationDeptmap/itemInactiveSpare',
          patchdataSpare
        )
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
        } else {
          warningNotify(message)
        }
      }
      if (item_asset_no !== undefined) {
        const { am_item_map_slno } = val
        const patchdata = {
          am_item_map_slno: am_item_map_slno,
        }
        Inactive(patchdata)
      } else {
        const { am_spare_item_map_slno } = val
        const patchdataSpare = {
          am_spare_item_map_slno: am_spare_item_map_slno,
        }

        InactiveSpare(patchdataSpare)
      }
    },
    [setCount, count]
  )

  return (
    <Box sx={{ m: 1, border: 1, borderColor: 'lightgrey', p: 1, height: '78vh' }}>
      {combinedList.length !== 0 ? (
        <Box sx={{ overflow: 'auto', p: 1, width: '100%' }}>
          <Box sx={{ minWidth: 1200 }}>
            <Box
              sx={{
                height: 40,
                display: 'flex',
                borderBottom: 1,
                borderTop: 1,
                borderColor: 'lightgray',
                pt: 1,
                bgcolor: 'white',
                gap: 1.9,
              }}
            >
              <Box sx={{ flex: 1, fontWeight: 600, color: 'black', fontSize: 14 }}>Inactive</Box>
              <Box sx={{ flex: 0.8, pl: 1.7, fontWeight: 600, color: 'black', fontSize: 12 }}>
                #
              </Box>
              <Box sx={{ flex: 1.5, fontWeight: 600, color: 'black', fontSize: 14 }}>
                Add Details
              </Box>
              <Box sx={{ flex: 2, fontWeight: 600, color: 'black', fontSize: 14 }}>Asset/Spare</Box>
              <Box sx={{ flex: 2.5, fontWeight: 600, color: 'black', fontSize: 14 }}>
                Asset/Spare No.
              </Box>
              <Box sx={{ flex: 3, fontWeight: 600, color: 'black', fontSize: 14 }}>Category</Box>
              <Box sx={{ flex: 9, fontWeight: 600, color: 'black', fontSize: 14, pl: 6 }}>
                Item Name
              </Box>
            </Box>
            <Box sx={{ width: '100%', overflow: 'auto' }}>
              <Box sx={{ width: '100%' }}>
                <Virtuoso
                  style={{ height: '69vh' }}
                  totalCount={combinedList.length}
                  itemContent={index => {
                    const val = combinedList[index]
                    const isPendinglist = index < sparePendingDetails.length
                    return (
                      <Box
                        key={val.slno}
                        sx={{
                          flex: 1,
                          display: 'flex',
                          mt: 0.3,
                          borderBottom: 0.5,
                          borderColor: 'lightgrey',
                          minHeight: 30,
                          maxHeight: 100,
                          background: val.hold_color,
                          pt: 0.5,
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Box sx={{ flex: 1, color: '#444444', fontSize: 14 }}>
                          <DeleteOutlineSharpIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => deleteitem(val)}
                          />
                        </Box>
                        <Box sx={{ flex: 0.8, pl: 1.7, color: '#444444', fontSize: 14 }}>
                          {index + 1}
                        </Box>

                        <Box sx={{ flex: 1.5, color: '#444444', fontSize: 14, pl: 0.4 }}>
                          <DescriptionIcon
                            onClick={() => enterDetails(val)}
                            sx={{ cursor: 'pointer' }}
                          />
                        </Box>

                        <Box sx={{ flex: 2, color: '#444444', fontSize: 14, fontWeight: 500 }}>
                          {val.spare_asset_no !== undefined ? 'Spare' : 'Asset'}
                        </Box>
                        <Box sx={{ flex: 2.5, color: '#444444', fontSize: 14 }}>
                          {isPendinglist
                            ? `${val.spare_asset_no}/${val.spare_asset_no_only
                                .toString()
                                .padStart(6, '0')}`
                            : `${val.item_asset_no}/${val.item_asset_no_only
                                .toString()
                                .padStart(6, '0')}`}
                        </Box>
                        <Box sx={{ flex: 3, color: '#444444', fontSize: 14 }}>
                          {val.category_name}
                        </Box>
                        <Box sx={{ flex: 9, color: '#444444', fontSize: 14, pl: 6 }}>
                          {val.item_name}
                        </Box>
                      </Box>
                    )
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            fontWeight: 800,
            color: 'lightgrey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
            height: '100%',
          }}
        >
          No Pending Entries
        </Box>
      )}
    </Box>
  )
}

export default memo(PendingEntries)
