import React, { useCallback, useMemo, useEffect, memo, useState } from 'react'
import { Box, Grid, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import DietMenuSettCmp from './DietMenuSettCmp'
import SelectDietName from 'src/views/CommonSelectCode/SelectDietName'
import SelectDietTypeName from 'src/views/CommonSelectCode/SelectDietTypeName'
import ItemGroupName from 'src/views/CommonSelectCode/ItemGroupName'
import SelectItemName from 'src/views/CommonSelectCode/SelectItemName'
import { useSelector } from 'react-redux'
const DietMenuSetting = () => {
  const history = useNavigate()

  //state for select boxes
  const [diet, setDiet] = useState(0)
  const [item, setItem] = useState(0)
  const [group, setGroup] = useState(0)
  const [type, setType] = useState(0)
  const [day, setDay] = useState(0)
  const [dietName, setdietName] = useState('')
  const [typeName, setTypeName] = useState('')
  const [dayName, setDayName] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemgroupName, setItemGroupName] = useState('')
  const [count, setCount] = useState(0)
  const [dataPost, setdataPost] = useState([])
  const [dietmenu, setDietmenu] = useState({
    order_req: false,
    status: false,
  })

  const [dataset, setData] = useState({
    qty: '',
    unit: '',
    rate_hos: '',
    rate_cant: '',
  })

  //destructuring
  const { order_req, status } = dietmenu
  const { qty, unit, rate_hos, rate_cant } = dataset
  const updateDietmenu = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setDietmenu({ ...dietmenu, [e.target.name]: value })
    },
    [dietmenu],
  )
  // Get login user emp_id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })

  useEffect(() => {
    const getRate = async () => {
      const result = await axioslogin.get(`/dietmenudtl/item/rate/${item}`)
      const { success, data } = result.data
      if (success === 1) {
        const { qty, rate_cant, rate_hos, unit } = data[0]
        const formdara = {
          qty: qty,
          unit: unit,
          rate_hos: rate_hos,
          rate_cant: rate_cant,
        }
        setData(formdara)
      }
    }
    if (item !== 0) {
      getRate()
    }
  }, [item])

  const reset = () => {
    setDiet(0)
    setItem(0)
    setGroup(0)
    setType(0)
    setDay(0)
  }
  //Refresh function
  const refreshWindow = useCallback(() => {
    const formReset = {
      order_req: false,
      status: false,
      dmenu_slno: '',
    }
    const Resetdata = {
      qty: '',
      unit: '',
      rate_hos: '',
      rate_cant: '',
    }
    setDietmenu(formReset)
    setData(Resetdata)
    reset()
  }, [])

  //Click add button data store in an array and then insert to dmenu setting detail table
  const AddMenu = () => {
    if (diet !== 0 && group !== 0 && item !== 0 && type !== 0 && day !== 0) {
      const newdata = {
        id: Math.ceil(Math.random() * 1000),
        diet_slno: diet,
        dietname: dietName,
        typename: typeName,
        dayname: dayName,
        groupname: itemgroupName,
        itemname: itemName,
        grp_slno: group,
        item_slno: item,
        type_slno: type,
        days: day,
        qty: qty,
        unit: unit,
        rate_hos: rate_hos,
        rate_cant: rate_cant,
        em_id: id,
        status: status === true ? 1 : 0,
        order_req: order_req === true ? 1 : 0,
      }
      const datass = [...dataPost, newdata]
      if (dataPost.length !== 0) {
        if (
          dataPost[0].diet_slno === diet &&
          dataPost[0].order_req === newdata.order_req &&
          dataPost[0].status === newdata.status
        ) {
          setdataPost(datass)
        } else {
          warningNotify('Please Select Same Diet Or order request or status are not matching')
        }
      } else {
        setdataPost(datass)
      }
      refreshWindow()
    } else {
      warningNotify('Please Select All datas')
    }
  }
  //Insert data for dmenu setting table
  const dmenuPost = useMemo(() => {
    if (dataPost.length !== 0) {
      const { diet_slno, order_req, status } = dataPost[0]
      return {
        diet_slno: diet_slno,
        order_req: order_req,
        status: status,
        em_id: id,
      }
    }
  }, [dataPost, id])

  /*** usecallback function for form submitting */
  const submitDiettype = useCallback(
    (e) => {
      e.preventDefault()
      const formReset = {
        order_req: false,
        status: false,
        dmenu_slno: '',
      }
      const resetfrm = {
        qty: '',
        unit: '',
        rate_hos: '',
        rate_cant: '',
      }
      /*** * insert function for use call back     */
      const InsertData = async (dmenuPost) => {
        const result = await axioslogin.post(`/dietmenudtl/dmenu`, dmenuPost)
        return result.data
      }

      /*** * insert function for use call back     */
      const menudetailInsert = async (postMenuDetal) => {
        const result = await axioslogin.post(`/dietmenudtl/detailInsert`, postMenuDetal)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setDietmenu(formReset)
          setData(resetfrm)
          reset()
          setdataPost([])
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }

      InsertData(dmenuPost).then((value) => {
        const { success, insetid, data } = value
        if (success === 1) {
          const postMenuDetal =
            dataPost &&
            dataPost.map((val) => {
              return {
                dmenu_slno: insetid,
                grp_slno: val.grp_slno,
                item_slno: val.item_slno,
                type_slno: val.type_slno,
                days: val.days,
                qty: val.qty,
                unit: val.unit,
                rate_hos: val.rate_hos,
                rate_cant: val.rate_cant,
                em_id: id,
                status: val.status,
              }
            })
          menudetailInsert(postMenuDetal)
        } else if (success === 5) {
          const { dmenu_slno } = data[0]
          const postMenuDetal =
            dataPost &&
            dataPost.map((val) => {
              return {
                dmenu_slno: dmenu_slno,
                grp_slno: val.grp_slno,
                item_slno: val.item_slno,
                type_slno: val.type_slno,
                days: val.days,
                qty: val.qty,
                unit: val.unit,
                rate_hos: val.rate_hos,
                rate_cant: val.rate_cant,
                em_id: id,
                status: val.status,
              }
            })
          menudetailInsert(postMenuDetal)
        }
      })
    },
    [count, dmenuPost, dataPost, id],
  )

  //Close function
  const backToSettings = useCallback(() => {
    history(`/Home/Settings`)
  }, [history])

  return (
    <CardMaster
      title="Diet Menu Setting"
      close={backToSettings}
      submit={submitDiettype}
      refresh={refreshWindow}
    >
      <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
        <Grid container spacing={1}>
          <Grid item xl={3} lg={3}>
            <Grid container spacing={1}>
              <Grid item xl={12} lg={12}>
                <SelectDietName value={diet} setValue={setDiet} setName={setdietName} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <SelectDietTypeName value={type} setValue={setType} setName={setTypeName} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <Box sx={{}}>
                  <FormControl fullWidth size="small">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={day}
                      onChange={(e, { props }) => {
                        setDay(e.target.value)
                        setDayName(props.children)
                      }}
                      size="small"
                      fullWidth
                      variant="outlined"
                      sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                    >
                      <MenuItem value={0} disabled>
                        Select Days
                      </MenuItem>
                      <MenuItem value={1}>Monday</MenuItem>
                      <MenuItem value={2}>Tuesday</MenuItem>
                      <MenuItem value={3}>Wednesday</MenuItem>
                      <MenuItem value={4}>Thursday</MenuItem>
                      <MenuItem value={5}>Friday</MenuItem>
                      <MenuItem value={6}>Saturday</MenuItem>
                      <MenuItem value={7}>Sunday</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xl={12} lg={12}>
                <ItemGroupName value={group} setValue={setGroup} setName={setItemGroupName} />
              </Grid>
              <Grid item xl={12} lg={12}>
                <SelectItemName
                  value={item}
                  setValue={setItem}
                  setName={setItemName}
                  group={group}
                />
              </Grid>
              <Grid item xl={6} lg={6}>
                <TextFieldCustom
                  placeholder="Quantity"
                  type="text"
                  size="sm"
                  name="qty"
                  value={qty}
                  style={{ mt: 0 }}
                />
              </Grid>
              <Grid item xl={6} lg={6}>
                <TextFieldCustom
                  placeholder="Unit"
                  type="text"
                  size="sm"
                  name="unit"
                  value={unit}
                />
              </Grid>
              <Grid item xl={6} lg={6}>
                <TextFieldCustom
                  placeholder="Hospital rate"
                  type="text"
                  size="sm"
                  name="rate_hos"
                  value={rate_hos}
                />
              </Grid>
              <Grid item xl={6} lg={6}>
                <TextFieldCustom
                  placeholder="Canteen rate"
                  type="text"
                  size="sm"
                  name="rate_cant"
                  value={rate_cant}
                />
              </Grid>
              <Grid item xl={12} lg={12}>
                <Grid container spacing={1}>
                  <Grid item xl={6} lg={6}>
                    <CusCheckBox
                      label="Order request"
                      color="primary"
                      size="md"
                      name="order_req"
                      value={order_req}
                      checked={order_req}
                      onCheked={updateDietmenu}
                    />
                  </Grid>
                  <Grid item xl={6} lg={6}>
                    <IconButton variant="outlined" size="sm" color="primary" onClick={AddMenu}>
                      <MdOutlineAddCircleOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xl={12} lg={12}>
                <CusCheckBox
                  label="Status"
                  color="primary"
                  size="md"
                  name="status"
                  value={status}
                  checked={status}
                  onCheked={updateDietmenu}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={9} lg={9}>
            <DietMenuSettCmp dataPost={dataPost} setdataPost={setdataPost} />
          </Grid>
        </Grid>
      </Box>
    </CardMaster>
  )
}

export default memo(DietMenuSetting)
