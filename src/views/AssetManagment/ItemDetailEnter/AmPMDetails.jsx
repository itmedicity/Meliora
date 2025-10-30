import { Box } from '@mui/joy'
import { addDays, format } from 'date-fns'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { useQuery } from '@tanstack/react-query'
import { getAmcCmcPmData, getPMDetailList } from 'src/api/AssetApis'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import { Virtuoso } from 'react-virtuoso'
import ItemQrDisplayModel from '../ItemListView/ItemQrDisplayModel'
import QrCode2Icon from '@mui/icons-material/QrCode2'

const AmPMDetails = ({ detailArry }) => {
  const { am_item_map_slno, am_category_pm_days } = detailArry
  const [setUpDate, setSetUpDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [count, setCount] = useState(0)
  const [dueDate, setdueDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [dueDateCount, setdueDateCount] = useState(am_category_pm_days || 0)
  const [instalationDate, setinstalationDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [itemAmcCmcslno, setItemAmcCmcslno] = useState(0)
  const [pmDetailsAll, setpmDetailsAll] = useState([])
  const [qrFlag, setQrFlag] = useState(0)
  const [selectedData, setSelectedData] = useState([])
  const [qrOpen, setqrOpen] = useState(false)

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const UpdateinstalationDate = useCallback(e => {
    setinstalationDate(e.target.value)
  }, [])

  const UpdateSetupDate = useCallback(e => {
    setSetUpDate(e.target.value)
  }, [])

  const UpdatedueDateCount = useCallback(
    e => {
      setdueDateCount(e.target.value)
      const Due = addDays(new Date(instalationDate), e.target.value)
      setdueDate(format(new Date(Due), 'yyyy-MM-dd'))
    },
    [instalationDate]
  )

  useEffect(() => {
    if (instalationDate && dueDateCount >= 0) {
      const Due = addDays(new Date(instalationDate), dueDateCount)
      setdueDate(format(new Date(Due), 'yyyy-MM-dd'))
    }
  }, [instalationDate, dueDateCount])

  const { data: AmcPmdetailsData } = useQuery({
    queryKey: ['getAmcCmcPmDataa', count],
    enabled: am_item_map_slno !== undefined,
    queryFn: () => getAmcCmcPmData(am_item_map_slno)
  })

  const AmcPmdetails = useMemo(() => AmcPmdetailsData, [AmcPmdetailsData])

  useEffect(() => {
    if (AmcPmdetails && AmcPmdetails.length > 0) {
      const { set_up_date, am_item_amcpm_slno } = AmcPmdetails[0]
      setSetUpDate(set_up_date)
      setItemAmcCmcslno(am_item_amcpm_slno)
    }
  }, [AmcPmdetails])

  const postdata = useMemo(() => {
    return {
      am_item_map_slno: am_item_map_slno,
      set_up_date: setUpDate,
      instalation_date: instalationDate,
      due_date: dueDate,
      create_user: id
    }
  }, [am_item_map_slno, setUpDate, instalationDate, dueDate, id])

  const patchData = useMemo(() => {
    return {
      am_item_map_slno: am_item_map_slno,
      set_up_date: setUpDate,
      instalation_date: instalationDate,
      due_date: dueDate,
      edit_user: id,
      am_item_amcpm_slno: itemAmcCmcslno
    }
  }, [am_item_map_slno, setUpDate, instalationDate, dueDate, itemAmcCmcslno, id])

  const SavePmDetails = useCallback(
    e => {
      e.preventDefault()
      const InsertPMDetail = async postdata => {
        const result = await axioslogin.post('/ItemMapDetails/PmInsert', postdata)
        const { success, message } = result.data
        if (success === 1) {
          setCount(count + 1)
          succesNotify(message)
          setaddPmFlag(0)
        } else {
          infoNotify(message)
        }
      }
      const updatePMDetails = async patchData => {
        const result = await axioslogin.patch('/ItemMapDetails/PmUpdate', patchData)
        const { message, success } = result.data
        if (success === 2) {
          setCount(count + 1)
          succesNotify(message)
          setaddPmFlag(0)
        }
      }
      if (setUpDate === null || setUpDate === '') {
        infoNotify('Enter Installation date')
      } else {
        if (itemAmcCmcslno === null || itemAmcCmcslno === 0 || itemAmcCmcslno === undefined) {
          InsertPMDetail(postdata)
        } else {
          updatePMDetails(patchData)
        }
      }
    },
    [postdata, patchData, count, itemAmcCmcslno, setCount, setUpDate]
  )

  const [addPmFlag, setaddPmFlag] = useState(0)
  const AddPm = useCallback(() => {
    setaddPmFlag(1)
  }, [])
  const ClosePm = useCallback(() => {
    setaddPmFlag(0)
  }, [])

  const { data: PmDetailss } = useQuery({
    queryKey: ['getPMDetailList', count],
    enabled: am_item_map_slno !== undefined,
    queryFn: () => getPMDetailList(am_item_map_slno)
  })

  useEffect(() => {
    if (PmDetailss) {
      setpmDetailsAll(PmDetailss)
    } else {
      setpmDetailsAll([])
    }
  }, [PmDetailss])

  const qrCodeOpen = useCallback(val => {
    const { am_item_map_slno, am_spare_item_map_slno, item_asset_no, item_asset_no_only } = val
    setSelectedData({
      am_item_map_slno: am_item_map_slno,
      am_spare_item_map_slno: am_spare_item_map_slno,
      assetno: item_asset_no + '/' + item_asset_no_only.toString().padStart(6, '0')
    })
    setQrFlag(1)
    setqrOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setqrOpen(false)
    setQrFlag(0)
  }, [setqrOpen, setQrFlag])

  return (
    <Box>
      {qrFlag === 1 ? <ItemQrDisplayModel open={qrOpen} handleClose={handleClose} selectedData={selectedData} /> : null}
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2 }}>
        <TextComponent
          text={'PM DETAILS'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />
        <Box
          sx={{
            display: 'flex',
            pt: 0.1,
            pl: 0.8,
            mt: 0.5,
            cursor: 'pointer',
            border: 1,
            width: 135,
            justifyContent: 'center',
            borderRadius: 4,
            borderColor: '#0B6BCB'
          }}
          onClick={AddPm}
        >
          <TextComponent
            text={'Add PM Details '}
            sx={{
              fontSize: 14,
              color: '#0B6BCB',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.7)',
              transform: 'translateZ(0)'
            }}
          />
          <AddIcon
            sx={{
              p: 0.2,
              color: '#0B6BCB'
            }}
          />
        </Box>
        {addPmFlag === 1 ? (
          <Box sx={{ flex: 1, display: 'flex' }}>
            <Box sx={{ width: 500 }}>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Installation Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    width: 130,
                    pt: 0.5
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="setUpDate"
                    value={setUpDate}
                    onchange={UpdateSetupDate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'PM Start From'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    pt: 0.5,
                    width: 130
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="instalationDate"
                    value={instalationDate}
                    onchange={UpdateinstalationDate}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Next PM With In '}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    width: 130,
                    pt: 0.5
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="number"
                    size="sm"
                    name="dueDateCount"
                    value={dueDateCount}
                    onchange={UpdatedueDateCount}
                    endDecorator={'Days'}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <TextComponent
                  text={'Next PM Date'}
                  sx={{
                    fontWeight: 600,
                    color: '#727B8C',
                    width: 130,
                    pt: 0.5
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <TextFieldCustom
                    type="date"
                    size="sm"
                    name="dueDate"
                    value={dueDate}
                    disabled={true}
                  ></TextFieldCustom>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ width: 120 }}></Box>
              </Box>
              <Box sx={{ display: 'flex', pt: 0.5 }}>
                <Box sx={{ width: 130, pt: 1 }}></Box>
                <Box sx={{ flex: 1, gap: 0.5, display: 'flex', pb: 2 }}>
                  <Box>
                    <CusIconButton
                      size="sm"
                      variant="outlined"
                      color="primary"
                      clickable="true"
                      onClick={SavePmDetails}
                    >
                      <LibraryAddIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                  <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ClosePm}>
                      <CloseIcon fontSize="small" />
                    </CusIconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ border: 1, borderColor: '#E0E1E3', py: 1, pl: 2, mt: 0.5 }}>
        <TextComponent
          text={'PM DETAIL LIST'}
          sx={{
            flex: 1,
            fontWeight: 500,
            color: 'black',
            fontSize: 15
          }}
        />
        <Box sx={{ flex: 1, pr: 1, pt: 1 }}>
          {pmDetailsAll.length === 0 ? (
            <Box
              sx={{
                height: 160,
                fontSize: 24,
                fontWeight: 600,
                color: 'lightgrey',
                textAlign: 'center',
                pt: 5
              }}
            >
              Empty PM Details
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: 'lightgrey',
                  pl: 1,
                  py: 0.5,
                  gap: 0.5
                }}
              >
                <Box sx={{ flex: 1 }}>#</Box>
                <Box sx={{ flex: 2 }}>Action</Box>
                <Box sx={{ flex: 4 }}>Pm Done Date</Box>
                <Box sx={{ flex: 4 }}>Pm Due Date</Box>
                <Box sx={{ flex: 3 }}>Status</Box>
              </Box>

              <Virtuoso
                style={{ height: '28vh' }}
                totalCount={pmDetailsAll?.length}
                itemContent={index => {
                  const sortedList = [...pmDetailsAll].sort(
                    (a, b) => (b.status === 1 ? 1 : 0) - (a.status === 1 ? 1 : 0)
                  )
                  const val = sortedList[index]
                  return (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        display: 'flex',
                        borderBottom: 1,
                        borderColor: 'lightgrey',
                        pl: 1,
                        py: 0.6,
                        gap: 0.5
                      }}
                    >
                      <Box sx={{ flex: 1, fontWeight: 600 }}>{index + 1}</Box>
                      <Box sx={{ flex: 2, fontWeight: 600 }}>
                        {val.status === 1 ? (
                          <QrCode2Icon
                            sx={{
                              color: 'black',
                              border: 1,
                              p: 0.1,
                              borderRadius: 0,
                              cursor: 'pointer'
                            }}
                            onClick={() => qrCodeOpen(val)}
                          />
                        ) : (
                          <QrCode2Icon sx={{ color: 'lightgrey', border: 1, p: 0.1, borderRadius: 0 }} />
                        )}
                      </Box>
                      <Box sx={{ flex: 4, fontWeight: 600 }}>
                        {val.am_pm_fromdate ? format(new Date(val.am_pm_fromdate), 'dd MMM yyyy') : ''}
                      </Box>
                      <Box sx={{ flex: 4, fontWeight: 600 }}>
                        {val.am_pm_dutedate ? format(new Date(val.am_pm_dutedate), 'dd MMM yyyy') : ''}
                      </Box>
                      <Box
                        sx={{
                          flex: 3,
                          fontWeight: 600,
                          color: val.status === 1 ? 'darkgreen' : val.status === 0 ? '#523A28' : 'black'
                        }}
                      >
                        {val.status === 1
                          ? 'Active *'
                          : val.status === 2
                            ? 'Inactive'
                            : val.status === 0
                              ? 'Expired'
                              : 'NotUpdated'}
                      </Box>
                    </Box>
                  )
                }}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(AmPMDetails)
