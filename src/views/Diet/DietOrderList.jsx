import { Box } from '@mui/system'
import { IconButton, Paper } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useMemo, memo, useState } from 'react'
import Test from '../CommonSelectCode/Test'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { axioslogin } from '../Axios/Axios'
import { succesNotify, warningNotify, infoNotify } from '../Common/CommonCode'
import TextFieldCustom from '../Components/TextFieldCustom'
import { editicon } from 'src/color/Color'
import SearchIcon from '@mui/icons-material/Search'
import DietOrderSearch from './DietOrderSearch'
const DietOrderList = () => {
  const [value, setValue] = useState(0)
  const [room, setRoom] = useState([])
  const [value1, setValue1] = useState(0)
  const [dietdetail, setDietdetail] = useState([])
  const [date, setDate] = useState(0)
  const [dietcrct, setDietcect] = useState([])
  //for seraching
  const [search, setSearch] = useState(0)
  const [search1, setSearch1] = useState(0)

  const [slno, setSlno] = useState([])

  const postdata = useMemo(() => {
    return {
      ns_code: value
    }
  }, [value])
  useEffect(() => {
    const getRoom = async () => {
      if (value !== 0) {
        const result = await axioslogin.post(`/dietorder/room`, postdata)
        const { success, data } = result.data
        if (success === 1) {
          setRoom(data)
        } else {
          warningNotify('Error occured contact EDP')
        }
      }
    }
    getRoom()
  }, [value, postdata])
  const updateDate = useCallback(e => {
    setDate(e.target.value)
  }, [])
  const searchdata = useMemo(() => {
    return {
      rmc_slno: value1,
      process_date: date
    }
  }, [value1, date])
  // const Search = useCallback(() => {
  //     const getDietpatient = async (searchdata) => {
  //         const result = await axioslogin.post('/dietorder/getrmptname', searchdata);
  //         const { message, success, data } = result.data;
  //         console.log(data);
  //         if (success === 1) {
  //             succesNotify(message);
  //             setDietdetail(data)
  //             data.map((val) => {
  //                 dietdetail.map((value) => {
  //                     console.log(value.type_slno, val.type_slno)
  //                 })
  //             })
  //         }
  //         else {
  //             infoNotify(message)
  //         }
  //     }
  //     if (value1 === 0) {
  //         infoNotify("Please Select Room")
  //     } else if (date === 0) {
  //         infoNotify("Please Select Date")
  //     } else {
  //         getDietpatient(searchdata);
  //         setSearch(1)
  //     }
  // }, [searchdata, date, value1])
  const Search = useCallback(() => {
    const getDietpatient = async searchdata => {
      const result = await axioslogin.post('/dietorder/typeslno', searchdata)
      const { message, success, data } = result.data
      if (success === 1) {
        succesNotify(message)
        setDietcect(data)
        setSearch1(1)
        setSearch(1)
      } else {
        infoNotify(message)
      }
    }
    if (value1 === 0) {
      infoNotify('Please Select Room')
    } else if (date === 0) {
      infoNotify('Please Select Date')
    } else {
      getDietpatient(searchdata)
    }
  }, [searchdata, date, value1])

  useEffect(() => {
    const getSearch = async () => {
      if (search1 !== 0) {
        // const { dmenu_slno, type_desc, type_slno } = dietcrct[0]
        const typeslno =
          dietcrct &&
          dietcrct.map(val => {
            return val.type_slno
          })
        const dmenuslno =
          dietcrct &&
          dietcrct.map(val => {
            return val.dmenu_slno
          })
        // console.log("type slno", typeslno);
        // console.log("dmenu slno", dmenuslno);
        const search = {
          dmenu_slno: dmenuslno,
          type_slno: typeslno
        }
        const result = await axioslogin.post('/dietorder/itemslno', search)
        const { success, data } = result.data
        if (success === 1) {
          setSlno(data)
        } else {
          warningNotify('Error occured contact EDP')
        }
      }
    }
    getSearch()
  }, [search1, dietcrct])
  //Close function
  // const backToSetting = useCallback(() => {
  //     history.push(`/Home/settings`)
  // }, [history])
  return (
    <Fragment>
      <Box sx={{ width: '100%', pl: 1, pt: 1, pr: 1, pb: 1 }}>
        <Paper square elevation={3} sx={{ pl: 1, pt: 1, pr: 1, pb: 1 }}>
          {' '}
          <Box
            sx={{
              width: '100%',
              backgroundColor: '#f0f3f5',
              p: 0.2
            }}
          >
            Diet Order
          </Box>
          <Box
            sx={{
              width: '100%',
              pl: 1,
              pt: 0.5,
              pr: 1,
              pb: 0.5,
              // background: "blue",
              display: 'flex',
              flexDirection: { xl: 'row', lg: 'row', md: 'row', sm: 'column', xs: 'column' }
            }}
          >
            <Box sx={{ width: '20%', pr: 1, mt: 1 }}>
              <Test value={value} setValue={setValue} />
            </Box>
            <Box sx={{ width: '20%', pr: 1, mt: 1 }}>
              <FormControl fullWidth size="small">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  size="small"
                  fullWidth
                  value={value1}
                  onChange={e => setValue1(e.target.value)}
                  variant="outlined"
                  sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                >
                  <MenuItem value={0} disabled>
                    Select Room
                  </MenuItem>
                  {room &&
                    room.map((val, index) => {
                      return (
                        <MenuItem key={index} value={val.rm_code}>
                          {val.rmc_desc}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: '20%', pr: 1 }}>
              <TextFieldCustom type="date" size="sm" value={date} onchange={updateDate} />
            </Box>
            <Box sx={{ width: '10%', pr: 1 }}>
              <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={Search}>
                <SearchIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      </Box>
      {search === 1 ? (
        <DietOrderSearch dietdetail={dietdetail} dietcrct={dietcrct} slno={slno} setDietdetail={setDietdetail} />
      ) : null}
    </Fragment>
  )
}
export default memo(DietOrderList)
