import React, { Fragment, useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import { format } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Box } from '@mui/material'
import CardCloseOnly from '../Components/CardCloseOnly'
import Button from '@mui/material/Button'
import HallBookModal from './HallBookModal'
import { axioslogin } from '../Axios/Axios'
import { infoNotify } from '../Common/CommonCode'
import HallBookingTable from './HallBookingTable'
const locales = {
  'en-US': require('date-fns/locale/en-US'),
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
const HallBookingRegister = () => {
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(0)
  const [count, setCount] = useState(0)
  // const addEvent = () => {
  //     setModal(1);
  //     setOpen(true);
  // }
  const [events, setEvents] = useState([])
  const [tabledata, setTable] = useState([])

  useEffect(() => {
    const getData = async () => {
      const result = await axioslogin.get('/hallBooking')
      const { success, message, data } = result.data
      if (success === 2) {
        const obj = data.map(values => {
          return {
            title: values.h_book_event,
            start: new Date(values.h_book_startdatetime),
            end: new Date(values.h_book_enddatetime),
          }
        })
        setEvents(obj)
        setTable(data)
      } else if (success === 1) {
        infoNotify(message)
      }
    }
    getData()
  }, [count])
  const [view, setView] = useState(0)
  const viewEvent = () => {
    setView(1)
  }
  return (
    <Fragment>
      {view === 1 ? (
        <HallBookingTable
          setView={setView}
          tabledata={tabledata}
          count={count}
          setCount={setCount}
        />
      ) : (
        <CardCloseOnly title="Event Calender">
          <Box sx={{ display: 'flex' }}>
            {/* <Box sx={{ p: 1, ml: 4, mt: 4 }}>
                                <Button variant="outlined" color="primary" onClick={addEvent} >Add Event</Button>
                            </Box> */}
            <Box sx={{ p: 1, mt: 4 }}>
              <Button variant="outlined" color="primary" onClick={viewEvent}>
                View Events
              </Button>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 700, margin: '50px', mt: 3 }}
            />
          </Box>
          {modal === 1 ? (
            <HallBookModal
              open={open}
              setOpen={setOpen}
              count={count}
              setCount={setCount}
              setModal={setModal}
            />
          ) : null}
        </CardCloseOnly>
      )}
    </Fragment>
  )
}
export default HallBookingRegister
