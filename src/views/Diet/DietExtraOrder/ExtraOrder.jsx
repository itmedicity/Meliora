import { IconButton, Paper, Typography, Box, Tooltip } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { editicon } from 'src/color/Color'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import moment from 'moment'
import ExtraOrderTable from './ExtraOrderTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardMasterView from 'src/views/Components/CardMasterView'
import CusModelMessage from 'src/views/Components/CusModelMessage'
import NursingStationMeliSelect from 'src/views/CommonSelectCode/NursingStationMeliSelect'
import ExtraRoomMeliSelect from './ExtraRoomMeliSelect'
import ExtraDietTypeSelect from './ExtraDietTypeSelect'
import { format } from 'date-fns'
import ExtraOrderView from './ExtraOrderView'
import { Fragment } from 'react'
import ItemSelectExtra from 'src/views/CommonSelectCode/ItemSelectExtra'

const ExtraOrder = () => {
  /** Variable initialization */
  const history = useNavigate()
  const [disview, setDisview] = useState(0)
  const [checkAction, setCheckaction] = useState(0)
  const [room, setRoom] = useState(0)
  const [diet, setDiet] = useState(0)
  const [dietold, setDietold] = useState(0)
  const [item, setItem] = useState(0)
  const [add, setAdd] = useState(0)
  const [nurse, setNurse] = useState(0)
  const [itemName, setItemName] = useState('')
  const [procsdetl_slno, setProcesDetal] = useState(0)
  const [Count, setCount] = useState(0)
  const [food, setFood] = useState({
    item_slno: '',
    rate_hos: '',
    rate_cant: ''
  })
  const { rate_hos, rate_cant } = food
  const [order, setOrder] = useState({
    pt_no: '',
    ptc_ptname: '',
    process_date: moment(new Date()).format('YYYY-MM-DD')
  })
  const { process_date, pt_no, ptc_ptname } = order
  const [process, setProcess] = useState('')
  const updateOrder = useCallback(
    e => {
      const value = e.target.value
      setOrder({ ...order, [e.target.name]: value })
    },
    [order]
  )

  const post = useMemo(() => {
    return {
      item_slno: item
    }
  }, [item])
  // Refesh function for window refresh and after insert and update data clear
  const refreshWindow = useCallback(() => {
    const frmreset = {
      item_slno: '',
      rate_hos: '',
      rate_cant: ''
    }
    const refresh = {
      pt_no: '',
      ptc_ptname: '',
      process_date: moment(new Date()).format('YYYY-MM-DD')
    }
    setOrder(refresh)
    setRoom(0)
    setDiet(0)
    setItem(0)
    setFood(frmreset)
    setProcess('')
    setAdd(0)
    setNewdata([])
    setCanteen(0)
    setHospital(0)
    setCheckaction(0)
    setCount(0)
    setNurse(0)
    setDisview(0)
    setDietold(0)
    setItemName(0)
    setProcesDetal(0)
  }, [])

  useEffect(() => {
    const getRate = async () => {
      const result = await axioslogin.post(`/extraorder/rate`, post)
      const { message, success, data } = result.data
      if (success === 1) {
        const { item_slno, rate_hos, rate_cant } = data[0]
        const frmdata = {
          item_slno: item_slno,
          rate_hos: rate_hos,
          rate_cant: rate_cant
        }
        setFood(frmdata)
      } else {
        infoNotify(message)
      }
    }
    if (item !== 0) {
      getRate()
    }
  }, [item, post])
  const frmreset = {
    item_slno: '',
    rate_hos: '',
    rate_cant: ''
  }
  const [newfood, setNewdata] = useState([])
  const [sumCanteen, setCanteen] = useState(0)
  const [sumHosptial, setHospital] = useState(0)
  const addnew = () => {
    if (item !== 0) {
      setAdd(1)
      const newdata = {
        // id: Math.ceil(Math.random() * 1000),
        item_slno: item,
        type_slno: diet,
        rate_hos: rate_hos,
        rate_cant: rate_cant,
        item_name: itemName,
        count: Count,
        total_hos: rate_hos * Count,
        total_cat: rate_cant * Count
      }

      if (newfood.length !== 0) {
        if (newfood[0].item_slno !== item) {
          setNewdata([...newfood, newdata])
          setNewdata([...newfood, newdata])
          setCanteen(sumCanteen + rate_cant * Count)
          setHospital(sumHosptial + rate_hos * Count)
          setItem(0)
          setCount(1)
          setFood(frmreset)
        } else {
          warningNotify('Item Already Select For Oder')
        }
      } else {
        setNewdata([...newfood, newdata])
        setNewdata([...newfood, newdata])
        setCanteen(sumCanteen + rate_cant * Count)
        setHospital(sumHosptial + rate_hos * Count)
        setItem(0)
        setCount(1)
        setFood(frmreset)
      }
    } else {
      warningNotify('Please Select Item')
    }
  }
  const postData = useMemo(() => {
    return {
      rm_code: room,
      process_date: process_date
    }
  }, [room, process_date])

  useEffect(() => {
    const getProcessno = async () => {
      const result = await axioslogin.post('/extraorder', postData)
      const { message, success, data } = result.data
      if (success === 1) {
        const { diet_slno, proc_slno, pt_no, process_date, ptc_ptname } = data[0]
        const frmdata = {
          pt_no: pt_no,
          ptc_ptname: ptc_ptname,
          process_date: process_date
        }
        setOrder(frmdata)
        setCount(1)
        setProcess(proc_slno)
        setDiet(diet_slno)
        setDietold(diet_slno)
        succesNotify(message)
      } else if (success === 0) {
        setProcess('')
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    if (room !== 0) {
      getProcessno()
    }
  }, [room, postData])
  /** insert data */
  const Insert = useMemo(() => {
    return {
      proc_slno: process,
      type_slno: diet !== 0 ? diet : dietold,
      rate_hos: sumHosptial,
      rate_cant: sumCanteen,
      is_extra_billed: 1,
      extra_bill_date: format(new Date(), 'yyyy-MM-dd hh-mm-ss')
    }
  }, [process, sumHosptial, sumCanteen, diet, dietold])
  /**ipdate datas */
  const update = useMemo(() => {
    return {
      proc_slno: process,
      type_slno: diet !== 0 ? diet : dietold,
      rate_hos: sumHosptial,
      rate_cant: sumCanteen,
      is_extra_billed: 1,
      extra_bill_date: format(new Date(), 'yyyy-MM-dd hh-mm-ss'),
      prod_slno: procsdetl_slno
    }
  }, [process, sumHosptial, sumCanteen, diet, dietold, procsdetl_slno])
  /** Model open function */
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const submitExtraorder = useCallback(e => {
    setOpen(true)
  }, [])

  const submitDiettype = useCallback(
    e => {
      e.preventDefault()
      /***    * insert function for extra order detail table    */
      const InsertExtra = async extraOrder => {
        const result = await axioslogin.post('/extraorder/insertextra', extraOrder)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          refreshWindow()
          setOpen(false)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      /***    * insert function for use call back     */
      const InsertFunc = async Insert => {
        if (process === '') {
          infoNotify('Please Choose the Room')
        } else {
          const result = await axioslogin.post('/extraorder/insert', Insert)
          const { success, insertId } = result.data
          if (success === 1) {
            const extraOrder =
              newfood &&
              newfood.map(val => {
                return {
                  prod_slno: insertId,
                  item_slno: val.item_slno,
                  hos_rate: val.rate_hos,
                  cant_rate: val.rate_cant,
                  type_slno: val.type_slno,
                  extra_status: 1,
                  count: val.count
                }
              })
            const timeout = setTimeout(() => {
              InsertExtra(extraOrder)
            }, 400)
            return () => clearTimeout(timeout)
          }
        }
      }
      /** Extra order update function */
      const UpdateFunc = async update => {
        const result = await axioslogin.patch('/extraorder/updateExta', update)
        const { message, success } = result.data
        if (success === 1) {
          const extraOrder =
            newfood &&
            newfood.map(val => {
              return {
                prod_slno: procsdetl_slno,
                item_slno: val.item_slno,
                hos_rate: val.rate_hos,
                cant_rate: val.rate_cant,
                type_slno: val.type_slno,
                extra_status: 1,
                count: val.count
              }
            })
          InsertExtra(extraOrder)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      if (checkAction === 0) {
        InsertFunc(Insert)
        setAdd(0)
      } else {
        UpdateFunc(update)
      }
    },
    [Insert, process, newfood, checkAction, refreshWindow, update, procsdetl_slno]
  )
  /** Extra order list view button function */
  const dietExtraViews = useCallback(params => {
    setDisview(0)
    setCheckaction(1)
    const getItemArry = async prod_slno => {
      const result = await axioslogin.get(`/extraorder/getExtraOrderDetail/${prod_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setAdd(1)
        setNewdata(data)
      }
    }

    const dataa = params.api.getSelectedRows()
    const { orderdate, rate_hos, rate_cant, co_ora_nurse, pt_no, ptc_ptname, prod_slno, rm_code } = dataa[0]
    setProcesDetal(prod_slno)
    getItemArry(prod_slno)
    setNurse(co_ora_nurse)
    setRoom(rm_code)
    setHospital(rate_hos)
    setCanteen(rate_cant)
    const frmdata = {
      pt_no: pt_no,
      ptc_ptname: ptc_ptname,
      process_date: moment(orderdate).format('YYYY-MM-DD')
    }
    setOrder(frmdata)
  }, [])

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  //View button function
  const viewdatas = useCallback(() => {
    if (checkAction === 1) {
      warningNotify('Please update or close taken file before take another')
    } else {
      setDisview(1)
    }
  }, [checkAction])

  const [editCount, setEditCount] = useState(0)
  const [editArry, setEditArry] = useState([])
  // in item list edit icon taken button functon
  const editdatas = useCallback(value => {
    const { item_slno, count } = value
    setEditArry(value)
    setItem(item_slno)
    setCount(count)
    setEditCount(count)
  }, [])

  /** when count change array update function */

  const setForUpdate = useCallback(() => {
    if (Count !== editCount && Count !== 1) {
      const { item_slno, rate_hos, rate_cant, item_name, type_slno } = editArry
      const newarry = newfood.filter(val => {
        return val.item_slno !== item_slno
      })
      const newdata = {
        item_slno: item_slno,
        type_slno: type_slno,
        rate_hos: rate_hos,
        rate_cant: rate_cant,
        item_name: item_name,
        count: Count,
        total_hos: rate_hos * Count,
        total_cat: rate_cant * Count
      }
      if (newdata.item_slno !== undefined) {
        setNewdata([...newarry, newdata])
        if (Count > editCount) {
          setCanteen(sumCanteen + rate_cant * (editCount + Count))
          setHospital(sumHosptial + rate_hos * (editCount + Count))
        } else {
          setCanteen(sumCanteen - rate_cant * (editCount - Count))
          setHospital(sumHosptial - rate_hos * (editCount - Count))
        }
      }
    }
  }, [editCount, Count, editArry, newfood, sumHosptial, sumCanteen])

  useEffect(() => {
    setForUpdate()
  }, [Count])

  return (
    <Fragment>
      {disview === 0 ? (
        <CardMasterView
          title="Extra Order"
          close={backtoSetting}
          submit={submitExtraorder}
          refresh={refreshWindow}
          view={viewdatas}
        >
          <CusModelMessage
            open={open}
            handleClose={handleClose}
            message="Are you sure  Place The order"
            submitDiettype={submitDiettype}
          />
          <Box sx={{ width: '100%', p: 1 }}>
            <Paper square elevation={3} sx={{ p: 2 }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                    mt: 1
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      mt: 0.8
                    }}
                  >
                    <Typography>Date</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      height: 15,
                      mb: 1
                    }}
                  >
                    <TextFieldCustom
                      type="date"
                      size="sm"
                      name="process_date"
                      value={process_date}
                      onchange={updateOrder}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                    mt: 1
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      pl: { xl: 1, md: 1 }
                    }}
                  >
                    <Typography>Patient Id</Typography>
                  </Box>
                  <Box
                    sx={{
                      height: 15,
                      mb: 2,
                      width: '100%'
                    }}
                  >
                    <TextFieldCustom
                      placeholder="Patient Id"
                      type="text"
                      size="sm"
                      name="pt_no"
                      value={pt_no}
                      disabled={true}
                    />
                  </Box>
                </Box>
              </Box>
              {/* 
     2nd section */}

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                    mt: 0.8
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%'
                    }}
                  >
                    <Typography>Nursing Station</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      mt: { xs: 0.8, sm: 0.8, md: 0.5, xl: 0.5 }
                    }}
                  >
                    <NursingStationMeliSelect value={nurse} setValue={setNurse} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                    mt: 0.5
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      mb: 1.2,
                      pl: { xl: 1, md: 1 }
                    }}
                  >
                    <Typography>Patient Name</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <TextFieldCustom
                      placeholder="Pateint Name"
                      type="text"
                      size="sm"
                      name="ptc_ptname"
                      value={ptc_ptname}
                      disabled={true}
                    />
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                    mt: 0.4
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%'
                    }}
                  >
                    <Typography>Room No</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      mt: { xs: 0.8, sm: 0.8, md: 0.5, xl: 0.5 }
                    }}
                  >
                    <ExtraRoomMeliSelect value={room} setValue={setRoom} nurse={nurse} />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                    mt: 0.5
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      mb: 1.2,
                      pl: { xl: 1, md: 1 }
                    }}
                  >
                    <Typography>Process No</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <TextFieldCustom
                      placeholder="Process Slno"
                      type="text"
                      size="sm"
                      name="em_no"
                      value={process}
                      disabled={true}
                    />
                  </Box>
                </Box>
              </Box>
              {/* 3rd section */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <Typography>Diet Type</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      mt: { xs: 0.8, sm: 0.8, xl: 0.6, md: 0.6 }
                    }}
                  >
                    <ExtraDietTypeSelect
                      value={diet}
                      setValue={setDiet}
                      proc_slno={process}
                      process_date={process_date}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      pl: { xl: 1, md: 1 }
                    }}
                  >
                    <Typography>Items</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      mt: 1
                    }}
                  >
                    <ItemSelectExtra value={item} setValue={setItem} setName={setItemName} />
                  </Box>
                </Box>
              </Box>
              {/* 4th section */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <Typography sx={{ mt: 0.4 }}>Hospital Rate</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      // mt: { xs: 0.8, sm: 0.8, md: 0.5, xl: 0.5 },
                      mt: { sm: 0.5, xs: 0.5, xl: 0, lg: 0.5, md: 0.2 }
                    }}
                  >
                    <TextFieldCustom
                      placeholder="Hospital Rate"
                      type="text"
                      size="sm"
                      name="em_no"
                      value={rate_hos}
                      disabled={true}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      pl: { xl: 1, md: 1 }
                    }}
                  >
                    <Typography sx={{ mt: 0.4 }}>Count</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      mt: 0.5
                    }}
                  >
                    <TextFieldCustom
                      placeholder="Count"
                      type="text"
                      size="sm"
                      name="Count"
                      value={Count}
                      onchange={e => {
                        setCount(e.target.value)
                      }}
                    />
                  </Box>
                </Box>
              </Box>
              {/* 5 th */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%'
                    }}
                  >
                    <Typography sx={{ mt: 0.4 }}>Total Rate</Typography>
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      // mt: { xs: 0.8, sm: 0.8, md: 0.5, xl: 0.5 },
                      mt: { sm: 0.5, xs: 0.5, xl: 0, lg: 0.5, md: 0.2 }
                    }}
                  >
                    <TextFieldCustom
                      placeholder="Total Rate"
                      type="text"
                      size="sm"
                      name="sumHosptial"
                      value={sumHosptial}
                      disabled={true}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' }
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      pl: { xl: 1, md: 1 }
                    }}
                  ></Box>
                  <Box
                    sx={{
                      width: '100%',
                      mt: 0.5
                    }}
                  >
                    <Tooltip title="Add" arrow>
                      <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={addnew}>
                        <MdOutlineAddCircleOutline />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 1
                }}
              >
                {add === 1 ? (
                  <ExtraOrderTable
                    newfood={newfood}
                    setNewdata={setNewdata}
                    setHospital={setHospital}
                    setCanteen={setCanteen}
                    sumCanteen={sumCanteen}
                    sumHosptial={sumHosptial}
                    editdatas={editdatas}
                  />
                ) : null}
              </Box>
            </Paper>
          </Box>
        </CardMasterView>
      ) : (
        <ExtraOrderView dietExtraViews={dietExtraViews} setDisview={setDisview} />
      )}
    </Fragment>
  )
}
export default ExtraOrder
