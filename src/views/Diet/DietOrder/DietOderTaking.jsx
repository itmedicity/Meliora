import React, { useCallback, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography } from '@mui/material'
import NursingStationMeliSelect from 'src/views/CommonSelectCode/NursingStationMeliSelect'
import ExtraRoomMeliSelect from '../DietExtraOrder/ExtraRoomMeliSelect'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CusIconButton from 'src/views/Components/CusIconButton'
import moment from 'moment'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify } from 'src/views/Common/CommonCode'
import DietOrderItems from './DietOrderItems'
import CustomPaperTitle from 'src/views/Components/CustomPaperTitle'
import { Fragment } from 'react'
import { useEffect } from 'react'

const DietOderTaking = () => {
  const history = useNavigate()
  const [nurse, setNurse] = useState(0)
  const [room, setRoom] = useState(0)
  const [selectDate, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [dietType, setDietType] = useState([])
  const [tabledis, setTabledis] = useState(0)

  const updateDate = e => {
    setDate(e.target.value)
  }

  const clicksearch = useCallback(
    e => {
      const postdata = {
        process_date: selectDate,
        rm_code: room,
      }
      const gettypeDmenu = async postdata => {
        const result = await axioslogin.post('/dietorder/getproslno/typeslno', postdata)
        const { message, success, data } = result.data
        if (success === 1) {
          setDietType(data)
          setTabledis(1)
        } else {
          infoNotify(message)
        }
      }
      gettypeDmenu(postdata)
    },
    [selectDate, room]
  )

  useEffect(() => {
    const getSearch = async () => {
      if (tabledis !== 0) {
        const d = new Date(selectDate)
        let day = d.getDay()
        const typeslno =
          dietType &&
          dietType.map(val => {
            return val.type_slno
          })
        const dmenuslno =
          dietType &&
          dietType.map(val => {
            return val.dmenu_slno
          })

        const postdata = {
          days: day,
          dmenu_slno: dmenuslno,
          type_slno: typeslno,
        }
      }
    }

    getSearch()
  }, [tabledis, dietType, selectDate])

  // const clicksearch = useCallback((e) => {

  //     dietType && dietType.map((val) => {

  //     })
  //     const getdMenudetail = async (dataa) => {
  //         // console.log(data);
  //         const d = new Date(selectDate)
  //         let day = d.getDay();
  //         const input = dataa && dataa.map((val) => {
  //             //  console.log(val);
  //             return {
  //                 days: day,
  //                 dmenu_slno: val.dmenu_slno,
  //                 type_slno: val.type_slno
  //             }

  //         })
  //         console.log(input);
  //         const result = await axioslogin.post('/dietorder/getItem/list', input);
  //         const { message, success, data } = result.data;

  //     }

  //     const postdata = {
  //         process_date: selectDate,
  //         rm_code: room
  //     }
  //     const gettypeDmenu = async (postdata) => {
  //         const result = await axioslogin.post('/dietorder/getproslno/typeslno', postdata);
  //         const { message, success, data } = result.data;
  //         if (success === 1) {
  //             //    console.log(data);
  //             setDietType(data)
  //             getdMenudetail(data)

  //             //setTabledis(1)
  //         }
  //         else {
  //             infoNotify(message)
  //         }
  //     }

  //     //    console.log(postdata);

  //     gettypeDmenu(postdata)

  // }, [selectDate, room])

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const refreshWindow = useCallback(() => {
    setNurse(0)
    setRoom(0)
    setDate(new Date())
  }, [])

  const [aa, setaa] = useState([])

  return (
    <CardMaster
      title="Diet Order"
      close={backtoSetting}
      //submit={submitExtraorder}
      refresh={refreshWindow}
    >
      <Box sx={{ width: '100%', p: 1 }}>
        <Paper square elevation={3} sx={{ p: 2 }}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                p: 0.5,
                // backgroundColor: "red"
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  //  backgroundColor: "red"
                }}
              >
                <Typography>Date</Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 15,
                  mt: 0,
                  //backgroundColor: "red",
                  mb: 2,
                }}
              >
                <TextFieldCustom
                  type="date"
                  size="sm"
                  name="selectDate"
                  value={selectDate}
                  onchange={updateDate}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                //backgroundColor: "black",
                p: 0.5,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  pl: { xl: 1, md: 1 },
                  // backgroundColor: "green"
                }}
              >
                <Typography>Nursing station</Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 15,
                  p: 0.5,
                  mb: 2,
                  //backgroundColor: "green"
                }}
              >
                <NursingStationMeliSelect value={nurse} setValue={setNurse} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                p: 0.5,
                //backgroundColor: "green"
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  pl: { xl: 1, md: 1 },
                  // backgroundColor: "blue"
                }}
              >
                <Typography>Room No</Typography>
              </Box>
              <Box
                sx={{
                  height: 15,
                  mb: 2,
                  p: 0.5,
                  width: '100%',
                  //backgroundColor: "blue"
                }}
              >
                <ExtraRoomMeliSelect value={room} setValue={setRoom} nurse={nurse} />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%' },
                p: 0.5,
                // backgroundColor: "orange"
                // mt: 1
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  mt: 0,
                }}
              >
                <CusIconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  clickable="true"
                  onClick={clicksearch}
                >
                  <SearchOutlinedIcon fontSize="small" />
                </CusIconButton>
              </Box>
            </Box>
          </Box>
        </Paper>

        {tabledis !== 0 ? (
          <Fragment>
            {dietType &&
              dietType.map(val => {
                return (
                  <Paper square elevation={3} sx={{ pt: 2, mt: 1 }} key={val.type_slno}>
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: {
                          xs: 'column',
                          sm: 'column',
                          md: 'row',
                          lg: 'row',
                          xl: 'row',
                        },
                      }}
                    >
                      <CustomPaperTitle heading={val.type_desc} />
                      <Box
                        sx={{
                          width: '90%',
                          p: 1,
                        }}
                      >
                        <DietOrderItems
                          date={selectDate}
                          dmenu={val.dmenu_slno}
                          type={val.type_slno}
                          setaa={setaa}
                          aa={aa}
                        />
                      </Box>
                    </Box>
                  </Paper>
                )
              })}
          </Fragment>
        ) : null}

        {/* {
                    tabledis !== 0 ? <Fragment>
                        dietType && dietType.map((val)=>{
                            return <Paper square elevation={3} sx={{ pt: 2, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                            }}>
                                <CustomPaperTitle heading="" />
                            </Box>
                        </Paper> 
                        })
                    </Fragment> : null




                } */}

        {/* {
                    tabledis !== 0 ?

                        <Paper square elevation={3} sx={{ pt: 2, mt: 1 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                            }}>
                                <TableContainer sx={{ maxHeight: 250, m: 2 }}>
                                    <Table size="small"
                                        stickyHeader aria-label="sticky table"

                                        sx={{ border: "0.5px solid" }}>
                                        <TableHead sx={{ border: "1px solid" }}>
                                            <TableRow >
                                                <TableCell align="center">Diet Type</TableCell>
                                                <TableCell align="center">diet Items</TableCell>

                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {dietType && dietType.map((val) => {
                                                //   console.log(dietType);
                                                return <TableRow
                                                    key={val.type_slno}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{val.type_desc}</TableCell>

                                                    <DietOrderItems
                                                        date={selectDate}
                                                        dmenu={val.dmenu_slno}
                                                        type={val.type_slno}
                                                    />


                                                </TableRow>
                                            })}

                                        </TableBody>




                                    </Table>
                                </TableContainer>

                            </Box>
                        </Paper>
                        : null
                } */}
      </Box>
    </CardMaster>
  )
}

export default DietOderTaking
