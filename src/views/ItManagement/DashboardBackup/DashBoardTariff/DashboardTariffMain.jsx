import React, { memo, useCallback, useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { Box, Button, Grid, Typography, CssVarsProvider } from '@mui/joy'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewListIcon from '@mui/icons-material/ViewList';
import { axioslogin } from 'src/views/Axios/Axios';
import { isAfter, startOfMonth, startOfYear } from 'date-fns';
import { format } from 'date-fns'
import MonthlyTarifView from './MonthlyTarrif/MonthlyTarifView';
import QuaterlyTariffView from './QuaterlyTarrif/QuaterlyTariffView';
import YearlyTariffView from './YearlyTarrif/YearlyTariffView';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import MonthlyPendingBill from './MonthlyTarrif/MonthlyPendingBill';
import QuaterlyPendingBill from './QuaterlyTarrif/QuaterlyPendingBill';
import YearlyPendingBillView from './YearlyTarrif/YearlyPendingBillView';

const DashboardTariffMain = () => {
  const [backtoDashboard, setBackdashboard] = useState(1)
  const [monthly, setmonthly] = useState(0);
  const [quaterly, setquarterly] = useState(0);
  const [yearly, setyearly] = useState(0);
  const history = useHistory()
  const [monthlyPendingBill, setmonthlyPendingBill] = useState(0);
  const [quaterlyPendingBill, setquaterlyPendingBill] = useState(0);
  const [yearlyPendingBill, setyearlyPendingBill] = useState(0);
  const [count, setCount] = useState(0)
  const [monthlydata, setMonthlydata] = useState([])
  const [quaterlydata, setQuaterlydata] = useState([])
  const [yearlydata, setYearlydata] = useState([])
  const [monthlyCount, setMonthlyCount] = useState(0)
  const [quaterlyCount, setQuaterlyCount] = useState(0)
  const [yearCount, setYearCount] = useState(0)


  // useEffect(() => {

  //   // isAfter(new Date(), startOfOct) ? setQuater(new Date(currentYear, 9, 1)) :
  //   //   isAfter(new Date(), startOfJul) ? setQuater(new Date(currentYear, 6, 1)) :
  //   //     isAfter(new Date(), startOfApr) ? setQuater(new Date(currentYear, 3, 1)) :
  //   //       setQuater(new Date(currentYear, 0, 1))

  //   isAfter(new Date(), startOfOct) ? setQuater("2023-10-01") :
  //   isAfter(new Date(), startOfJul) ? setQuater("2023-07-01") :
  //     isAfter(new Date(), startOfApr) ? setQuater("2023-04-01") :
  //       setQuater("2023-01-01")
  // },[startOfOct,startOfJul,startOfApr])


  // const xxx = format(quaterMonths, "yyyy-MM-dd")
  const ViewMonthlyList = useCallback((e) => {
    setmonthly(1);
    setquarterly(0);
    setyearly(0);
    setmonthlyPendingBill(0);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);
  }, [])
  const ViewQuaterlyList = useCallback((e) => {
    setquarterly(1);
    setmonthly(0);
    setyearly(0);
    setmonthlyPendingBill(0);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);
  }, [])
  const ViewYearlyList = useCallback((e) => {
    setyearly(1);
    setmonthly(0);
    setquarterly(0);
    setmonthlyPendingBill(0);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);;
  }, [])

  const MonthlyPendingData = monthlydata && monthlydata.filter((val) => val.payed_status !== 1)
  const MonthlyPendingBillList = useCallback((e) => {
    setyearly(0);
    setmonthly(0);
    setquarterly(0);
    setmonthlyPendingBill(1);
    setquaterlyPendingBill(0);
    setyearlyPendingBill(0);
  }, [])

  const QuaterlyPendingData = quaterlydata && quaterlydata.filter((val) => val.payed_status !== 1)
  const QuaterlyPendingBillList = useCallback((e) => {
    setyearly(0);
    setmonthly(0);
    setquarterly(0);
    setquaterlyPendingBill(1)
    setmonthlyPendingBill(0)
    setyearlyPendingBill(0)
  }, [])

  const YearlyPendingData = yearlydata && yearlydata.filter((val) => val.payed_status !== 1)
  const YearlyPendingBillList = useCallback((e) => {
    setyearly(0);
    setmonthly(0);
    setquarterly(0);
    setquaterlyPendingBill(0)
    setmonthlyPendingBill(0)
    setyearlyPendingBill(1)
  }, [])

  const backtoSetting = useCallback(() => {
    history.push('/Home/Settings')
  }, [history])

  useEffect(() => {
    const monthlyy = format(new Date(startOfMonth(new Date())), "yyyy-MM-dd")
    const yearStart = format(new Date(startOfYear(new Date())), "yyyy-MM-dd")
    // const today = new Date();
    // const currentYear = today.getFullYear();
    // const startOfApr = startOfMonth(new Date(currentYear, 3, 1)); // April
    // const startOfJul = startOfMonth(new Date(currentYear, 6, 1)); // July
    // const startOfOct = startOfMonth(new Date(currentYear, 9, 1)); // October
    const today = new Date();
    const currentYear = today.getFullYear();
    const startOfApr = startOfMonth(new Date(currentYear, 3, 1)); // April
    const startOfJul = startOfMonth(new Date(currentYear, 6, 1)); // July
    const startOfOct = startOfMonth(new Date(currentYear, 9, 1)); // October

    const initial = async (checking) => {
      const result1 = await axioslogin.post(`/tarrifDetails/CheckInsetMonthlyOrNot`, checking);
      const { success } = result1.data
      if (success !== 1) {
        const result = await axioslogin.post(`/tarrifDetails/monthlyTarrifInsert`, checking);
        const { success } = result.data
        if (success === 1) {
          return 0
        }
      }
    }
    const getMonthlywise = async () => {

      const result = await axioslogin.get('tarrifDetails/monthlyview')
      const { success, data
      } = result.data

      if (success === 2) {




        data && data.map((val) => {
          const checking = {
            device_slno: val.device_slno,
            tarrif_amount: val.amount,
            monthly_bill_generate: monthlyy
          }
          initial(checking)
          return 0
        })



      }
    }
    const quater = async (checking) => {
      const result1 = await axioslogin.post(`/tarrifDetails/CheckInsetQuaterlyOrNot`, checking);
      const { success } = result1.data
      if (success !== 1) {
        const result = await axioslogin.post(`/tarrifDetails/quaterlyTarrifInsert`, checking);
        const { success } = result.data
        if (success === 1) {
          return 0
        }
      }
    }
    const getQuaterlywise = async () => {

      const result = await axioslogin.get('tarrifDetails/quaterlyview')
      const { success, data
      } = result.data
      if (success === 2) {

        data && data.map((val) => {
          const checking = {
            device_slno: val.device_slno,
            tarrif_amount: val.amount,
            quaterly_bill_generate: isAfter(new Date(), startOfOct)
              ? `${currentYear}-10-01`
              : isAfter(new Date(), startOfJul)
                ? `${currentYear}-07-01`
                : isAfter(new Date(), startOfApr)
                  ? `${currentYear}-04-01`
                  : `${currentYear}-01-01`,
          };
          quater(checking)
          return 0
        })

      }
    }

    const year = async (checking) => {
      const result1 = await axioslogin.post(`/tarrifDetails/CheckInsetYearlyOrNot`, checking);
      const { success } = result1.data
      if (success !== 1) {
        const result = await axioslogin.post(`/tarrifDetails/yearlyTarrifInsert`, checking);
        const { success } = result.data
        if (success === 1) {
          return 0
        }
      }
    }
    const getyearlywise = async () => {

      const result = await axioslogin.get('tarrifDetails/yearlyview')
      const { success, data
      } = result.data

      if (success === 2) {

        data && data.map((val) => {
          const checking = {
            device_slno: val.device_slno,
            tarrif_amount: val.amount,
            yearly_bill_generate: yearStart
          }

          year(checking)
          return 0
        })

      }
    }
    getMonthlywise()
    getQuaterlywise()
    getyearlywise()
  }, [count])


  useEffect(() => {
    const monthlyy = format(new Date(startOfMonth(new Date())), "yyyy-MM-dd")
    const getMonthlywiseArray = async () => {
      const Monthdataget = {
        monthly_bill_generate: monthlyy
      }
      const result1 = await axioslogin.post(`/tarrifDetails/getMonthData`, Monthdataget);
      const { success, dataa } = result1.data
      if (success === 1) {

        setMonthlydata(dataa);
      }
    }
    getMonthlywiseArray()
  }, [monthlyCount])

  useEffect(() => {

    const today = new Date();
    const currentYear = today.getFullYear();
    const startOfApr = startOfMonth(new Date(currentYear, 3, 1)); // April
    const startOfJul = startOfMonth(new Date(currentYear, 6, 1)); // July
    const startOfOct = startOfMonth(new Date(currentYear, 9, 1)); // October

    const getQuaterlywiseArray = async () => {
      const Quaterdataget = {
        quaterly_bill_generate: isAfter(new Date(), startOfOct) ? "2023-10-01" :
          isAfter(new Date(), startOfJul) ? "2023-07-01" :
            isAfter(new Date(), startOfApr) ? "2023-04-01" : "2023-01-01"
      }
      const result1 = await axioslogin.post(`/tarrifDetails/getQuaterlyData`, Quaterdataget);
      const { success, dataa } = result1.data
      if (success === 1) {

        setQuaterlydata(dataa);
      }
    }
    getQuaterlywiseArray()
  }, [quaterlyCount])



  useEffect(() => {
    const yearStart = format(new Date(startOfYear(new Date())), "yyyy-MM-dd")
    const getyearlywiseArray = async () => {
      const Yeardataget = {
        yearly_bill_generate: yearStart
      }
      const result1 = await axioslogin.post(`/tarrifDetails/getYearlyData`, Yeardataget);
      const { success, dataa } = result1.data
      if (success === 1) {

        setYearlydata(dataa);
      }
    }
    getyearlywiseArray()
  }, [yearCount])


  return (
    <Box>
      <Paper>
        {
          monthly === 1 ? <MonthlyTarifView monthlydata={monthlydata} setBackdashboard={setBackdashboard} setmonthly={setmonthly}
            monthlyCount={monthlyCount} setMonthlyCount={setMonthlyCount} /> :
            quaterly === 1 ? <QuaterlyTariffView quaterlydata={quaterlydata} setBackdashboard={setBackdashboard} setquarterly={setquarterly}
              quaterlyCount={quaterlyCount} setQuaterlyCount={setQuaterlyCount} /> :
              yearly === 1 ? <YearlyTariffView yearlydata={yearlydata} setBackdashboard={setBackdashboard} setyearly={setyearly}
                yearCount={yearCount} setYearCount={setYearCount} /> :
                monthlyPendingBill === 1 ? <MonthlyPendingBill setBackdashboard={setBackdashboard}
                  monthlyCount={monthlyCount}
                  setMonthlyCount={setMonthlyCount}
                  MonthlyPendingData={MonthlyPendingData}
                  setmonthlyPendingBill={setmonthlyPendingBill}
                  setCount={setCount} count={count} /> :
                  quaterlyPendingBill === 1 ? <QuaterlyPendingBill setBackdashboard={setBackdashboard}
                    quaterlyCount={quaterlyCount}
                    setQuaterlyCount={setQuaterlyCount}
                    setquaterlyPendingBill={setquaterlyPendingBill}
                    QuaterlyPendingData={QuaterlyPendingData}
                    setCount={setCount}
                    count={count} /> :
                    yearlyPendingBill === 1 ? <YearlyPendingBillView setBackdashboard={setBackdashboard}
                      yearCount={yearCount}
                      setYearCount={setYearCount}
                      setyearlyPendingBill={setyearlyPendingBill}
                      YearlyPendingData={YearlyPendingData}
                      setCount={setCount}
                      count={count} /> :
                      backtoDashboard === 1 ?
                        <CardMasterClose title={'DashBoard'} close={backtoSetting}>
                          <Box sx={{ display: 'flex', flex: 1 }}>
                            <Grid sx={{ p: 1 }} container spacing={2}>
                              <Grid sx={{ width: 400, }}>
                                <Paper
                                  variant="outlined"
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 1,
                                    width: '100%',
                                  }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#BBC8DE',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: 0.7,
                                      }}>
                                      <CalendarMonthIcon />
                                    </Box>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                      }}>
                                      <Box
                                        sx={{
                                          padding: '4px',
                                          borderRadius: '8px',
                                          marginRight: 'auto',
                                        }}>
                                        <Typography sx={{ fontSize: 20, color: '#055C9D' }}>Monthly Tarrif</Typography>
                                      </Box>
                                    </Box>
                                    <Box><CssVarsProvider>
                                      <Button variant="outlined"
                                        sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                        onClick={(e) => {
                                          MonthlyPendingBillList(e)
                                        }}
                                      >
                                        {MonthlyPendingData.length}
                                      </Button>
                                    </CssVarsProvider></Box>
                                  </Box>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      borderTop: 2,
                                      borderColor: '#BBC8DE',
                                      marginTop: 3,
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                    }}
                                    onClick={(e) => {
                                      ViewMonthlyList(e)
                                    }}
                                  >
                                    <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
                                      <Typography sx={{ color: '#04425B' }}>view</Typography>
                                      <ViewListIcon sx={{ color: '#055C9D' }} />
                                    </Box>
                                    <Box sx={{ ml: 1, mt: 1 }}></Box>
                                  </Box>
                                </Paper>
                              </Grid>
                            </Grid>
                            <Grid sx={{ p: 1 }} container spacing={2}>
                              <Grid sx={{ width: 400, ml: 5 }}>

                                <Paper
                                  // key={index}
                                  variant="outlined"
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 1,
                                    width: '100%',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#BBC8DE',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: 0.7,
                                      }}
                                    >
                                      <CalendarMonthIcon />

                                    </Box>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          padding: '4px',
                                          borderRadius: '8px',
                                          marginRight: 'auto',
                                        }}
                                      >
                                        <Typography sx={{ fontSize: 20, color: '#055C9D' }}>
                                          Quarterly Tarrif
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Box

                                    >

                                      <CssVarsProvider>
                                        <Button variant="outlined"
                                          sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                          onClick={(e) => {
                                            QuaterlyPendingBillList(e)
                                          }}
                                        >
                                          {QuaterlyPendingData.length}
                                        </Button>
                                      </CssVarsProvider>
                                    </Box>
                                  </Box>

                                  <Box
                                    sx={{
                                      display: 'flex',
                                      borderTop: 2,
                                      borderColor: '#BBC8DE',
                                      marginTop: 3,
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      // backgroundColor:'red'
                                    }}
                                    onClick={(e) => {
                                      ViewQuaterlyList(e)
                                    }}
                                  >
                                    <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
                                      <Typography sx={{ color: '#04425B' }}>view</Typography>
                                      <ViewListIcon sx={{ color: '#055C9D' }} />
                                    </Box>
                                    <Box sx={{ ml: 1, mt: 1 }}>

                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                              {/* ))} */}
                            </Grid>
                            <Grid sx={{ p: 1 }} container spacing={2}>

                              <Grid sx={{ width: 400, ml: 5 }}

                              >

                                <Paper
                                  // key={index}
                                  variant="outlined"
                                  sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    p: 1,
                                    width: '100%',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#BBC8DE',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        opacity: 0.7,
                                      }}
                                    >
                                      <CalendarMonthIcon />

                                    </Box>
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          padding: '4px',
                                          borderRadius: '8px',
                                          marginRight: 'auto',
                                        }}
                                      >
                                        <Typography sx={{ fontSize: 20, color: '#055C9D' }}>
                                          Yearly Tarrif
                                        </Typography>
                                      </Box>
                                    </Box>
                                    <Box

                                    >

                                      <CssVarsProvider>
                                        <Button variant="outlined"
                                          sx={{ fontWeight: 'bold', fontSize: 18, color: '#D01110', cursor: 'pointer' }}
                                          onClick={(e) => {
                                            YearlyPendingBillList(e)
                                          }}
                                        >
                                          {YearlyPendingData.length}

                                        </Button>
                                      </CssVarsProvider>
                                    </Box>
                                  </Box>

                                  <Box
                                    sx={{
                                      display: 'flex',
                                      borderTop: 2,
                                      borderColor: '#BBC8DE',
                                      marginTop: 3,
                                      alignItems: 'center',
                                      cursor: 'pointer',
                                      // backgroundColor:'red'
                                    }}
                                    onClick={(e) => {
                                      ViewYearlyList(e)
                                    }}
                                  >
                                    <Box sx={{ p: 1, mt: 1, display: 'flex' }}>
                                      <Typography sx={{ color: '#04425B' }}>view</Typography>
                                      <ViewListIcon sx={{ color: '#055C9D' }} />
                                    </Box>
                                    <Box sx={{ ml: 1, mt: 1 }}>
                                      {/* <IconButton size="small" color="success">
                                                           <ArrowRightAltIcon />
                                                       </IconButton> */}
                                    </Box>
                                  </Box>
                                </Paper>
                              </Grid>
                              {/* ))} */}
                            </Grid>
                          </Box>
                        </CardMasterClose>
                        : null
        }
      </Paper>
    </Box>
  )
}
export default memo(DashboardTariffMain)