import { Box, Table, Tooltip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useDispatch, useSelector } from 'react-redux'
import TextComponent from 'src/views/Components/TextComponent'
import AddIcon from '@mui/icons-material/Add'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { getSpecification } from 'src/api/AssetApis'
import { useQuery } from 'react-query'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CusIconButton from 'src/views/Components/CusIconButton'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh'
import { getRackList } from 'src/redux/actions/AmRackList.action'
import RackSelect from './RackSelect'

const SpecDetailsComp = ({ detailArry, assetSpare }) => {
  const { am_item_map_slno, am_spare_item_map_slno, assetno } = detailArry

  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [specific, setSpecific] = useState('')
  const [specSlno, setspecSlno] = useState(0)
  const [editSpec, seteditSpec] = useState(0)
  const [specificationTabledata, setspecificationTabledata] = useState([])
  const [count, setCount] = useState(0)
  const [rackno, setrackNo] = useState(0)
  const [userdata, setUserdata] = useState({
    manufacturslno: '',
    asset_no: assetno,
    asset_noold: '',
  })
  const { manufacturslno, asset_no, asset_noold } = userdata
  const updateDeviceDetails = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setUserdata({ ...userdata, [e.target.name]: value })
    },
    [userdata],
  )

  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const updateSpecific = useCallback(
    (e) => {
      setSpecific(e.target.value)
    },
    [setSpecific],
  )

  const postSpec = useMemo(() => {
    return {
      am_item_map_slno: am_item_map_slno,
      specifications: specific,
      status: 1,
      create_user: id,
    }
  }, [am_item_map_slno, specific, id])

  const updateSpec = useMemo(() => {
    return {
      am_item_map_slno: am_item_map_slno,
      specifications: specific,
      status: 1,
      delete_user: id,
      am_sec_detal_slno: specSlno,
    }
  }, [am_item_map_slno, specific, id, specSlno])

  const rowSelect = useCallback((val) => {
    const { am_sec_detal_slno, specifications } = val
    setspecSlno(am_sec_detal_slno)
    setSpecific(specifications)
    seteditSpec(1)
    setIsOpen(true)
  }, [])

  const reset = useCallback(() => {
    const frmdata = {
      manufacturslno: '',
      asset_no: '',
      asset_noold: '',
    }
    setUserdata(frmdata)
  }, [setUserdata])

  const DeviceRefresh = useCallback(() => {
    reset()
  }, [reset])

  const SaveEditSpecDetails = useCallback(
    (e) => {
      const SpecInsert = async () => {
        const result = await axioslogin.post(`/ItemMapDetails/SpecificationInsert`, postSpec)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setSpecific('')
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      const SpecUpdate = async () => {
        const result = await axioslogin.patch(`/ItemMapDetails/SepcUpdate`, updateSpec)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify('Specification Updated Successfully')
          setCount(count + 1)
          setSpecific('')
          seteditSpec(0)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (editSpec === 1) {
        SpecUpdate(updateSpec)
      } else {
        SpecInsert(updateSpec)
      }
    },
    [postSpec, updateSpec, count, setCount, editSpec],
  )

  const DeleteSlect = useCallback(
    (val) => {
      const { am_sec_detal_slno, specifications } = val

      const DeleteSlected = {
        am_item_map_slno: am_item_map_slno,
        specifications: specifications,
        status: 0,
        delete_user: id,
        am_sec_detal_slno: am_sec_detal_slno,
      }

      const SpecDelete = async () => {
        const result = await axioslogin.patch(`/ItemMapDetails/SepcUpdate`, DeleteSlected)
        const { success, message } = result.data
        if (success === 1) {
          succesNotify('Specification Deleted')
          setCount(count + 1)
        } else {
          infoNotify(message)
        }
      }

      SpecDelete()
    },
    [am_item_map_slno, id, setCount, count],
  )

  const { data: specificationDetailsData } = useQuery({
    queryKey: ['getSpecification', count],
    queryFn: () => getSpecification(am_item_map_slno),
    enabled: am_item_map_slno !== undefined,
  })

  const specificationDetails = useMemo(() => specificationDetailsData, [specificationDetailsData])

  useEffect(() => {
    setspecificationTabledata(specificationDetails || [])
  }, [specificationDetails])

  const patchData = useMemo(() => {
    return {
      am_manufacture_no: manufacturslno,
      am_asset_no: asset_no,
      am_asset_old_no: asset_noold,
      edit_user: id,
      am_item_map_slno: am_item_map_slno,
      item_rack_slno: rackno !== 0 && rackno !== undefined ? rackno : null,
    }
  }, [am_item_map_slno, manufacturslno, asset_no, asset_noold, id, rackno])

  const patchadataSpare = useMemo(() => {
    return {
      am_manufacture_no: manufacturslno,
      am_asset_no: asset_no,
      am_asset_old_no: asset_noold,
      edit_user: id,
      am_spare_item_map_slno: am_spare_item_map_slno,
      spare_rack_slno: rackno !== 0 && rackno !== undefined ? rackno : null,
    }
  }, [am_spare_item_map_slno, manufacturslno, asset_no, asset_noold, id, rackno])

  useEffect(() => {
    const checkinsertOrNotDetail = async (am_item_map_slno) => {
      const result = await axioslogin.get(
        `/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`,
      )
      const { success, data } = result.data
      if (success === 1) {
        const { am_manufacture_no, am_asset_old_no, rack } = data[0]
        const frmdata = {
          manufacturslno: am_manufacture_no ?? '',
          asset_no: assetno ?? '',
          asset_noold: am_asset_old_no ?? '',
        }
        setUserdata(frmdata)
        setrackNo(rack ?? 0)
      }
    }

    const checkinsertOrNotDetailSpare = async (am_spare_item_map_slno) => {
      const result = await axioslogin.get(
        `/ItemMapDetails/checkDetailInsertOrNotSpare/${am_spare_item_map_slno}`,
      )
      const { success, data } = result.data
      if (success === 1) {
        const { am_manufacture_no, am_asset_old_no, rack } = data[0]
        const frmdata = {
          manufacturslno: am_manufacture_no ?? '',
          asset_no: assetno ?? '',
          asset_noold: am_asset_old_no ?? '',
        }
        setUserdata(frmdata)
        setrackNo(rack ?? 0)
      }
    }

    if (assetSpare === 1) {
      checkinsertOrNotDetail(am_item_map_slno)
    } else {
      checkinsertOrNotDetailSpare(am_spare_item_map_slno)
    }

    dispatch(getRackList())
  }, [am_item_map_slno, am_spare_item_map_slno, assetSpare, assetno, dispatch])

  const EditDetails = useCallback(
    (e) => {
      e.preventDefault()
      const updateGRNDetails = async (patchData) => {
        const result = await axioslogin.patch('/ItemMapDetails/DeviceDetailsUpdate', patchData)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
        } else {
          warningNotify(message)
        }
      }

      const updateGRNDetailsSpare = async (patchadataSpare) => {
        const result = await axioslogin.patch(
          '/ItemMapDetails/DeviceDetailsUpdateSpare',
          patchadataSpare,
        )
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
        } else {
          warningNotify(message)
        }
      }

      if (assetSpare === 1) {
        updateGRNDetails(patchData)
      } else {
        updateGRNDetailsSpare(patchadataSpare)
      }
    },
    [patchData, assetSpare, patchadataSpare],
  )

  const [previousValues, setPreviousValues] = useState([])

  const handleEnter = (inputValue) => {
    if (inputValue && !previousValues.includes(inputValue)) {
      setPreviousValues((prev) => [...prev, inputValue])
    }
    setUserdata('')
  }

  return (
    <Box>
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
        <TextComponent
          text={'DETAILS'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15,
          }}
        />
        <Box sx={{ flex: 1, display: 'flex' }}>
          <Box sx={{ width: 500 }}>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <TextComponent
                text={'Manufacture Slno'}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  pt: 1,
                  width: 130,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="manufacturslno"
                  value={manufacturslno}
                  onchange={updateDeviceDetails}
                  onEnter={handleEnter}
                ></TextFieldCustom>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <TextComponent
                text={'Asset Old No.'}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  pt: 1,
                  width: 130,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <TextFieldCustom
                  type="text"
                  size="sm"
                  name="asset_noold"
                  value={asset_noold}
                  onchange={updateDeviceDetails}
                ></TextFieldCustom>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <TextComponent
                text={'Select Rack'}
                sx={{
                  fontWeight: 600,
                  color: '#727B8C',
                  pt: 1,
                  width: 130,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <RackSelect value={rackno} setValue={setrackNo} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ width: 130 }}></Box>
              <Box sx={{ flex: 1, gap: 0.5, display: 'flex' }}>
                <Box>
                  <CusIconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    clickable="true"
                    onClick={EditDetails}
                  >
                    <LibraryAddIcon fontSize="small" />
                  </CusIconButton>
                </Box>
                <Box>
                  <CusIconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    clickable="true"
                    onClick={DeviceRefresh}
                  >
                    <RefreshIcon fontSize="small" />
                  </CusIconButton>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
        </Box>
      </Box>
      {am_item_map_slno !== undefined ? (
        <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: 0.5 }}>
          <TextComponent
            text={'SPECIFICATIONS'}
            sx={{
              fontWeight: 500,
              color: 'black',
              fontSize: 15,
              py: 0.5,
            }}
          />
          <Box
            sx={{
              display: 'flex',
              pt: 0.5,
              pl: 0.8,
              cursor: 'pointer',
              border: 1,
              width: 100,
              borderColor: '#0B6BCB',
              borderRadius: 5,
            }}
            onClick={toggleOpen}
          >
            <TextComponent
              text={'Add New'}
              sx={{
                color: '#0B6BCB',
                fontSize: 14,
                textShadow:
                  '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.7)',
                transform: 'translateZ(0)',
                '&:hover': { color: '#263F60' },
              }}
            />

            <AddIcon sx={{ p: 0.2, color: '#0B6BCB', '&:hover': { color: '#263F60' } }} />
          </Box>
          {isOpen && (
            <Box sx={{ flex: 1, display: 'flex', pt: 0.8, pr: 1.5, pb: 0.5 }}>
              <Box sx={{ flex: 1 }}>
                <TextFieldCustom
                  type="text"
                  placeholder={'Add Specification'}
                  size="sm"
                  name="specific"
                  value={specific}
                  onchange={updateSpecific}
                ></TextFieldCustom>
              </Box>
              <Box sx={{ pl: 0.5 }}>
                <Tooltip title="Add  " placement="top">
                  <AddCircleOutlineIcon
                    onClick={() => SaveEditSpecDetails()}
                    sx={{ width: 30, height: 30, cursor: 'pointer' }}
                  />
                </Tooltip>
              </Box>
            </Box>
          )}

          {specificationTabledata.length > 0 ? (
            <Box sx={{ flex: 1, border: 1, borderColor: 'lightgrey', mr: 1.5, mb: 1 }}>
              <Table stickyHeader>
                <thead>
                  <tr>
                    <th style={{ width: 40, align: 'center' }}>#</th>
                    <th style={{ width: 50, align: 'center' }}>Edit</th>
                    <th style={{ flexGrow: 1, align: 'center' }}>Specifications</th>
                    <th style={{ width: 80 }}>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {specificationTabledata &&
                    specificationTabledata.map((val, index) => {
                      return (
                        <tr
                          key={index}
                          // sx={{
                          //     '&:last-child td, &:last-child th': { border: 0, },
                          //     maxHeight: 60,
                          //     minHeight: 2,

                          // }}
                        >
                          <td> {index + 1}</td>
                          <td>
                            {' '}
                            <EditOutlinedIcon
                              onClick={() => rowSelect(val)}
                              sx={{ cursor: 'pointer', '&:hover': { color: '#0000FF' } }}
                            />
                          </td>
                          <td> {val.specifications}</td>
                          <td>
                            <DeleteOutlineIcon
                              onClick={() => DeleteSlect(val)}
                              sx={{ cursor: 'pointer', '&:hover': { color: '#0000FF' } }}
                            />
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
            </Box>
          ) : null}
        </Box>
      ) : null}
    </Box>
  )
}
export default memo(SpecDetailsComp)
