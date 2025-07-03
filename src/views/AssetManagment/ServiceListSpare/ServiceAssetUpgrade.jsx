import { Box, Tooltip } from '@mui/joy'
import React, { memo, useCallback } from 'react'
import TextComponent from 'src/views/Components/TextComponent'
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp'
import CmSpareList from 'src/views/ComManagement/CmComponent/CmSpareList'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ChangeCircleSharpIcon from '@mui/icons-material/ChangeCircleSharp'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const ServiceAssetUpgrade = ({
  spareDetails,
  serviceSparee,
  item_asset_no_only,
  item_custodian_dept,
  sparez,
  setSparez,
  setSpareName,
  count,
  id,
  handleDelete,
  AddNewSpare,
  spareData,
  AddNewSpareUnderAsset,
  setCount,
  sparecount,
  setsparecount,
}) => {
  const RemoveSpare = useCallback(
    val => {
      const { am_spare_item_map_slno, asset_spare_slno } = val
      const RemoveSparee = {
        delete_user: id,
        asset_spare_slno: asset_spare_slno,
        am_spare_item_map_slno: am_spare_item_map_slno,
      }
      const RemoveSpareUpdate = async RemoveSparee => {
        const result = await axioslogin.patch('/ItemMapDetails/spareRemoveFromAsset', RemoveSparee)
        const { success, message } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setsparecount(sparecount + 1)
        } else {
          warningNotify(message)
          setCount(count + 1)
          setsparecount(sparecount + 1)
        }
      }
      RemoveSpareUpdate(RemoveSparee)
    },
    [id, setCount, count, setsparecount, sparecount]
  )

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        maxHeight: '100%',
        m: 0,
        pt: 0.5,
      }}
    >
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
        {spareDetails.length !== 0 ? (
          <Box sx={{ flex: 1, mb: 3 }}>
            <TextComponent
              text={'SPARE PARTS'}
              sx={{
                flex: 1,
                fontWeight: 500,
                color: 'black',
                fontSize: 15,
                pb: 1,
              }}
            />
            {spareDetails.length !== 0 && (
              <Box sx={{ flex: 1, mt: 1, display: 'flex', bgcolor: '#EBEFFB', mr: 2 }}>
                <Box sx={{ width: 50, textAlign: 'center', fontSize: 15, fontWeight: 600 }}>#</Box>
                <Box sx={{ width: 120, fontSize: 14, fontWeight: 600 }}>Spare Number</Box>
                <Box sx={{ flex: 1, fontSize: 14, fontWeight: 600 }}>Spare Name</Box>
                <Box sx={{ width: 100, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
                  Remove Spare
                </Box>
                <Box sx={{ width: 80, textAlign: 'center', fontSize: 14, fontWeight: 600 }}>
                  Service
                </Box>
              </Box>
            )}
            {spareDetails.map((val, index) => {
              const formattedSlno = val.spare_asset_no_only.toString().padStart(6, '0')
              return (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    borderBottom: 1,
                    borderColor: 'lightgrey',
                    pt: 0.8,
                    mr: 2,
                  }}
                >
                  <Box sx={{ width: 50, textAlign: 'center', fontSize: 13, fontWeight: 500 }}>
                    {index + 1}
                  </Box>
                  <Box sx={{ width: 120, fontSize: 13, fontWeight: 500 }}>
                    {val.spare_asset_no}/{formattedSlno}
                  </Box>
                  <Box sx={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{val.item_name}</Box>
                  <Tooltip
                    title={
                      'By clicking, the spare will be removed from the asset and add back to the stock'
                    }
                    sx={{ width: 200 }}
                    placement="top"
                  >
                    <Box
                      sx={{
                        width: 100,
                        textAlign: 'center',
                        fontSize: 13,
                        pr: 0.5,
                        cursor: 'pointer',
                      }}
                    >
                      <ChangeCircleSharpIcon
                        sx={{
                          color: 'black',
                          cursor: 'pointer',
                        }}
                        onClick={() => RemoveSpare(val)}
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip
                    title={
                      'Click Here for Service this Spare (this will be transfered to the service list)'
                    }
                    sx={{ width: 200 }}
                    placement="top"
                  >
                    <Box
                      sx={{
                        width: 80,
                        textAlign: 'center',
                        fontSize: 13,
                        pr: 0.5,
                        cursor: 'pointer',
                      }}
                    >
                      <ManageAccountsSharpIcon
                        sx={{
                          color: '#603A70',
                          cursor: 'pointer',
                          p: 0.1,
                          '&:hover': { color: 'black' },
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
        {item_asset_no_only !== undefined ? (
          <Box sx={{ mb: 2 }}>
            <TextComponent
              text={'SPARE UPGRADE/REPLACE'}
              sx={{
                flex: 1,
                fontWeight: 500,
                color: 'black',
                fontSize: 15,
                pb: 1,
              }}
            />
            <Box sx={{ display: 'flex', flex: 1 }}>
              <Box sx={{ flex: 1 }}>
                <CmSpareList
                  sparez={sparez}
                  setSparez={setSparez}
                  item_custodian_dept={item_custodian_dept}
                  setSpareName={setSpareName}
                  count={sparecount}
                />
              </Box>
              <Box sx={{ ml: 1, mr: 5, pt: 0.5 }}>
                <AddCircleIcon
                  sx={{ height: 28, width: 28, cursor: 'pointer' }}
                  onClick={AddNewSpare}
                />
              </Box>
            </Box>
            {spareData.length !== 0 ? (
              <>
                <Box sx={{ flex: 1, display: 'flex', bgcolor: '#EBEFFB', mt: 1, mr: 2 }}>
                  <Box
                    sx={{
                      flex: 0.5,
                      textAlign: 'center',
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'black',
                    }}
                  >
                    #
                  </Box>
                  <Box sx={{ flex: 10, fontSize: 14, fontWeight: 600, color: 'black' }}>
                    Spare Name
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 14,
                      fontWeight: 600,
                      pr: 0.3,
                      color: 'black',
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
                        display: 'flex',
                        borderBottom: 1,
                        borderColor: 'lightgrey',
                        py: 0.5,
                        mr: 2,
                      }}
                    >
                      <Box sx={{ flex: 0.5, textAlign: 'center', fontSize: 13 }}>{index + 1}</Box>
                      <Box sx={{ flex: 10, fontSize: 13 }}>{val.name}</Box>
                      <Tooltip
                        title={'Spare will be removed  by clicking'}
                        color="neutral"
                        placement="left"
                      >
                        <Box
                          sx={{
                            flex: 1,
                            textAlign: 'center',
                            fontSize: 13,
                            pr: 0.5,
                            cursor: 'pointer',
                          }}
                        >
                          <DeleteForeverIcon
                            sx={{
                              color: 'darkred',
                              cursor: 'pointer',
                              p: 0.1,
                              '&:hover': { color: 'red' },
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
                      boxShadow:
                        '2px 2px 4px rgba(0, 0, 0, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.6)',
                      transform: 'translateZ(0)',
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        boxShadow:
                          '3px 3px 6px rgba(240, 218, 218, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.7)',
                      },
                    }}
                    onClick={AddNewSpareUnderAsset}
                  >
                    Add
                  </Box>
                </Box>
              </>
            ) : null}
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

export default memo(ServiceAssetUpgrade)
