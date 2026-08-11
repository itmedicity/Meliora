import React, { useState, useEffect, useCallback } from 'react'
import { Box, Card, Typography, Button } from '@mui/joy'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import getDay from 'date-fns/getDay'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import { format, isSameDay } from 'date-fns'
import enUS from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MdChevronLeft, MdChevronRight, MdToday } from 'react-icons/md'
import { getAppointmentsByDate, getCertificateDetailsByToken } from 'src/api/masterApi'
import MedicineFilesApproveModal from '../MedicineInformation/MedicineFilesApproveModal'
import UploadIndentFormModal from './UploadIndentFormModal'
import './Weekelybooking.css'
import { axioslogin } from 'src/views/Axios/Axios'
import { generateIndentPdf } from './IndentPdf'
import { warningNotify } from 'src/views/Common/CommonCode'

// Setup date-fns localizer for react-big-calendar
const locales = {
  'en-US': enUS
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

// Custom Toolbar Component matching the design
const CustomToolbar = ({ label, view, onView, onNavigate }) => {
  return (
    <div className="calendar-header">
      <div className="nav-group">
        <div className="arrow-pill">
          <button className="arrow-btn" onClick={() => onNavigate('PREV')} title="Previous">
            <MdChevronLeft size={22} />
          </button>
          <button className="arrow-btn" onClick={() => onNavigate('NEXT')} title="Next">
            <MdChevronRight size={22} />
          </button>
        </div>
        <button className="today-btn" onClick={() => onNavigate('TODAY')}>
          <MdToday size={18} style={{ marginRight: 6 }} />
          today
        </button>
      </div>

      <h2 className="title-text">{label}</h2>

      <div className="view-group">
        {[
          { key: 'month', label: 'month' },
          { key: 'week', label: 'week' },
          { key: 'day', label: 'day' },
          { key: 'agenda', label: 'list' }
        ].map((item) => (
          <button
            key={item.key}
            className={`view-btn ${view === item.key ? 'active' : ''}`}
            onClick={() => onView(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const Weekelybooking = () => {
  // Current view date
  const [currentDate, setCurrentDate] = useState(new Date())
  // Currently highlighted / selected date
  const [selectedDate, setSelectedDate] = useState(new Date())
  // Current view mode ('month', 'week', 'day', 'agenda')
  const [currentView, setCurrentView] = useState('month')

  const [appointments, setAppointments] = useState([])
  const [openCertModal, setOpenCertModal] = useState(false)
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [certData, setCertData] = useState([])


  const fetchAppointments = useCallback(async (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd')
    const data = await getAppointmentsByDate(formattedDate)
    setAppointments(data)
  }, [])

  const handleOpenCertificates = async (row) => {
    const data = await getCertificateDetailsByToken(row.token_id)
    setCertData(data)
    setOpenCertModal(true)
  }

  const handleOpenUploadDetails = async (row) => {
    const data = await getCertificateDetailsByToken(row.token_id)
    setCertData(data)
    setOpenUploadModal(true)
  }

  useEffect(() => {
    fetchAppointments(selectedDate)
  }, [selectedDate, fetchAppointments])

  // Handle slot / day clicking to select a date
  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start)
    setCurrentDate(slotInfo.start)
  }

  // Handle event clicking to select a date
  const handleSelectEvent = (event) => {
    setSelectedDate(event.start)
    setCurrentDate(event.start)
  }

  // Apply custom classes/styles to day cells
  const dayPropGetter = (date) => {
    if (isSameDay(date, selectedDate)) {
      return {
        className: 'selected-day-cell'
      }
    }
    return {}
  }

  const handleDownloadForm = async (apt) => {

    try {
      const result = await axioslogin.get(`/indent/getIndentFormByToken?tokenId=${apt.token_id}`);
      const { success, data } = result.data;
      if (success === 1 && data) {
        generateIndentPdf(apt, data);
      } else {
        warningNotify("Please fill the Indent Details first.");
      }
    } catch (error) {
      console.error("Error fetching indent data", error);
      warningNotify("Failed to fetch indent details. Please try again.");
    }
  }
  // Empty events list (no green selected box overlay)
  const events = []

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <MedicineFilesApproveModal
        open={openCertModal}
        onClose={() => setOpenCertModal(false)}
        onSuccess={() => {
          setOpenCertModal(false);
          fetchAppointments(selectedDate);
        }}
        detailsData={certData}
      />
      <UploadIndentFormModal
        open={openUploadModal}
        onClose={() => setOpenUploadModal(false)}
        detailsData={certData}
        appointmentDate={selectedDate}
      />
      <Card variant="outlined" sx={{ borderRadius: 'md', p: 0, border: 'none' }}>
        <div style={{ height: "75vh", padding: "20px", width: "100%" }} className="calendar-card">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            selectable={true}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            dayPropGetter={dayPropGetter}
            components={{
              toolbar: CustomToolbar
            }}
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            view={currentView}
            onView={(view) => setCurrentView(view)}
          />
        </div>
      </Card>

      <Box sx={{ mt: 4, px: 1, pb: 4 }}>
        <Typography level="h5" sx={{ fontWeight: 600, mb: 3, color: '#1a252c', fontFamily: 'Inter, sans-serif' }}>
          Booked Tokens for {format(selectedDate, 'dd/MM/yyyy')}
        </Typography>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>SlNo</th>
                <th>Token No</th>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((apt, idx) => {
                  const isApproved = apt.VerificationStatus === 1;
                  const isRejected = apt.rejectionstatus === "2";

                  let statusText = 'Approval Pending';
                  let statusClass = 'status-pending';

                  if (isRejected) {
                    statusText = 'Rejected by Purchase Team';
                    statusClass = 'status-rejected';
                  } else if (isApproved) {
                    statusText = 'Approved by Purchase Team';
                    statusClass = 'status-approved';
                  }

                  return (
                    <tr key={apt.token_id}>
                      <td style={{ fontWeight: 600, color: '#1a252c' }}>{idx + 1}</td>
                      <td style={{ color: '#4a5568' }}>{apt.prefix}/{apt.tokenno}</td>
                      <td style={{ color: '#4a5568' }}>{apt.medicalrep_name}</td>
                      <td style={{ color: '#4a5568' }}>{apt.companyname}</td>
                      <td>
                        <span className={`status-text ${statusClass}`}>
                          {statusText}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <Button
                          size="sm"
                          className="action-btn"
                          sx={{ mr: 1 }}
                          onClick={() => handleOpenCertificates(apt)}
                        >
                          View Certificates
                        </Button>
                        {isApproved && (
                          <Button
                            size="sm"
                            className="action-btn"
                            onClick={() => handleDownloadForm(apt)}
                            sx={{ mr: 1 }}
                          >
                            Download Indent Form
                          </Button>
                        )}
                        {apt.VerificationStatus !== 0 && (
                          <Button
                            size="sm"
                            className="action-btn"
                            onClick={() => handleOpenUploadDetails(apt)}
                          >
                            Upload Details
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#718096' }}>
                    No booked tokens for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  )
}

export default Weekelybooking
