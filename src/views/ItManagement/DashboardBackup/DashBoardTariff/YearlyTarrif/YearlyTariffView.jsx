import { CssVarsProvider, Table, Typography } from '@mui/joy';
import React, { useCallback, useEffect, useState, memo } from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import EditIcon from '@mui/icons-material/Edit';
import YearlyBillEdits from './YearlyBillEdits'
import { Box, Paper } from '@mui/material';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';
import FileViewYearly from './FileViewYearly';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const YearlyTariffView = ({ yearlydata, setyearly, yearCount, setYearCount }) => {

  const [selectedYearlyBillImage, setselectedYearlyBillImage] = useState([]);
  const [tabledata, setTabledata] = useState([])
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [imageViewModalFlag, setimageViewModalFlag] = useState(0)
  const [count, setCount] = useState(0)
  const [getarry, setgetarry] = useState([])
  const [editFlag, setEditFalg] = useState(0)
  const [imageUrls, setImageUrls] = useState([]);
  const history = useHistory()

  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    setaddModalOpen(false)
    setimageViewModalFlag(0)
    setimageViewModalOpen(false)
    setImageUrls([])
  }, [setAddModalFlag, setaddModalOpen, setimageViewModalOpen, setimageViewModalFlag, setImageUrls])

  const editForSelect = useCallback((val) => {
    setgetarry(val)
    setEditFalg(1)
    setAddModalFlag(1)
    setaddModalOpen(true)
    setimageViewModalFlag(0)
    setimageViewModalOpen(false)
  }, [])

  const fileView = async (val) => {
    const { yearly_slno } = val;
    setgetarry(val);
    setAddModalFlag(0);
    setaddModalOpen(false);
    setimageViewModalFlag(0); // Initialize imageViewModalFlag to 0 initially
    setimageViewModalOpen(false); // Close the modal if it was open
    try {
      const result = await axioslogin.get(`/ItImageUpload/uploadFile/getYearlyBillImages/${yearly_slno}`);
      const { success } = result.data;
      if (success === 1) {
        const data = result.data;
        const fileNames = data.data;
        const fileUrls = fileNames.map((fileName) => {
          return `http://192.168.22.9/NAS/YearlyBll/${yearly_slno}/${fileName}`;
        });
        setImageUrls(fileUrls);
        // Open the modal only if there are files
        if (fileUrls.length > 0) {
          setimageViewModalFlag(1);
          setimageViewModalOpen(true);
          setselectedYearlyBillImage(val);
        } else {
          warningNotify("No Bills attached");
        }
      } else {
        warningNotify("No Bills attached");
      }
    } catch (error) {
      warningNotify('Error in fetching files:', error);
    }
  }
  useEffect(() => {
    if (yearlydata.length !== 0) {
      const arr = yearlydata?.map((val) => {
        const obj = {
          device_slno: val.device_slno,
          device_name: val.device_name,
          device_type_name: val.device_type_name,
          device_type_slno: val.device_type_slno,
          dept_name: val.dept_name,
          department: val.department,
          location: val.location,
          sec_name: val.sec_name,
          reciver_name: val.reciver_name,
          contact_no: val.contact_no,
          // ima: val.ima,
          sim_number: val.sim_number,
          provider: val.provider,
          providername: val.provider === 1 ? 'Vodafone Idea' : val.provider === 2 ? 'Airtel' : val.provider === 3 ? 'Jio' :
            val.provider === 4 ? 'Bsnl' : val.provider === 5 ? 'Reliance Communications' : val.provider === 6 ? 'Aircel' :
              val.provider === 7 ? 'Tata Docomo' : val.provider === 8 ? 'BSNL Mobile' : val.provider === 9 ? 'MNTL' :
                val.provider === 10 ? 'Tata Teleservices' : val.provider === 11 ? 'Telenor India' : val.provider === 12 ? 'MTS India' : 'N/A',
          isssued_deligate: val.isssued_deligate,
          issue_date: val.issue_date,
          asset_no: val.asset_no,
          // sim: val.sim,
          // issue: val.issue,
          tarrif: val.tarrif,
          sim_status: val.sim_status,
          issue_status: val.issue_status,
          tarrifname: val.tarrif === 1 ? 'Monthly' : val.tarrif === 2 ? 'Quarterly' : val.tarrif === 3 ? 'Yearly' : 'N/A',
          amount: val.amount,
          receiver_emp_id: val.receiver_emp_id,
          sim_mobile_num: val.sim_mobile_num,
          yearly_slno: val.yearly_slno,
          bill_amount: val.bill_amount,
          bill_date: val.bill_date,
          bill_entered_date: val.bill_entered_date,
          file_upload_status: val.file_upload_status,
          payed_status: val.payed_status,
          bill_number: val.bill_number,
          bill_due_date: val.bill_due_date,
          payed: val.payed
        }
        return obj
      })
      setTabledata(arr)
    }
  }, [yearlydata])
  const backtoDash = useCallback(() => {
    history.push('/Home/DashboardBackup')
    setyearly(0)
  }, [history, setyearly])
  return (
    <CardMasterClose close={backtoDash}>
      {AddModalFlag === 1 ? <YearlyBillEdits open={addModalOpen} handleClose={handleClose} yearCount={yearCount} setYearCount={setYearCount}
        setCount={setCount} count={count} getarry={getarry} editFlag={editFlag} /> :
        imageViewModalFlag === 1 ? <FileViewYearly imageUrls={imageUrls} open={imageViewModalOpen} handleClose={handleClose}
          selectedYearlyBillImage={selectedYearlyBillImage} getarry={getarry} /> : null}
      <CssVarsProvider>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ flex: 5 }}><Typography sx={{ fontWeight: 10, fontSize: 28, fontFamily: 'Anton', color: '#003060' }}>Yearly Tariff </Typography></Box>
          <Paper sx={{ width: 30, height: 20, backgroundColor: '#D6DBDF', mt: 1 }}></Paper>
          <Box sx={{ flex: 1, pl: 1, pt: .5 }}> pending bill</Box>
        </Box>
        <Paper variant="outlined" sx={{ maxHeight: 720, maxWidth: '100%', overflow: 'auto' }}>
          <CssVarsProvider>
            <Table padding={"none"} stickyHeader hoverRow>
              <thead>
                <tr>
                  <th style={{ width: 50 }} >SlNo</th>
                  <th style={{ width: 60 }}>Action</th>
                  <th style={{ width: 80 }}>Bills View</th>
                  <th style={{ width: 200, }}>Sim Operator</th>
                  <th style={{ width: 180, }}>Sim Mobile No</th>
                  <th style={{ width: 150, }}>Tarrif Amount</th>
                  <th style={{ width: 150, }}>Bill Amount</th>
                  <th style={{ width: 180, }} >Bill Date</th>
                  <th style={{ width: 180, }} >Bill Due Date</th>
                  <th style={{ width: 200, }}>Bill Number</th>
                  <th style={{ width: 200, }}>Device Name</th>
                  <th style={{ width: 200, }} >Device Type</th>
                  <th style={{ width: 250, }}>Department</th>
                  <th style={{ width: 250 }}>Location</th>
                  <th style={{ width: 150, }}>Reciever Emp ID</th>
                  <th style={{ width: 200, }}>Reciever Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  tabledata.map((val, index) => {
                    return <tr key={index}
                      style={{ height: 8, background: val.payed_status === null ? '#D6DBDF' : val.payed_status === 0 ? '#D6DBDF' : 'transparent' }}>
                      <td> {index + 1}</td>
                      <td><EditIcon sx={{ cursor: 'pointer', color: '#055C9D' }} size={6} onClick={() => editForSelect(val)} /></td>
                      <td style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <PermMediaIcon style={{ height: '20px', width: '20px', color: '#41729F' }}
                          onClick={() => fileView(val)} />
                      </td>
                      <td> {val.providername}</td>
                      <td>{val.sim_mobile_num || 'N/A'}</td>
                      <td>{val.amount || 'N/A'}</td>
                      <td>{val.bill_amount || 'N/A'}</td>
                      <td>{val.bill_date || 'N/A'}</td>
                      <td>{val.bill_due_date || 'N/A'}</td>
                      <td>{val.bill_number || 'N/A'}</td>
                      <td>{val.device_name || 'N/A'}</td>
                      <td> {val.device_type_name || 'N/A'}</td>
                      <td> {val.dept_name || 'N/A'}</td>
                      <td>{val.sec_name || 'N/A'}</td>
                      <td> {val.receiver_emp_id || 'N/A'}</td>
                      <td> {val.reciver_name || 'N/A'}</td>
                    </tr>
                  })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Paper>
      </CssVarsProvider>
    </CardMasterClose>
  )
}
export default memo(YearlyTariffView)