import React, { memo, useCallback, useState, useEffect } from 'react'
import CardMasterClose from 'src/views/Components/CardMasterClose';
import { Paper, Typography, } from '@mui/material';
import { CssVarsProvider, Table } from '@mui/joy';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import QuaterlyBillAddModal from './QuaterlyBillAddModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const QuaterlyPendingBill = ({ setquaterlyPendingBill, QuaterlyPendingData, quaterlyCount, setQuaterlyCount }) => {
  const [addModalOpen, setaddModalOpen] = useState(false)
  const [AddModalFlag, setAddModalFlag] = useState(0)
  const [getarry, setgetarry] = useState([])
  const [editFlag, setEditFalg] = useState(0)
  const [count, setCount] = useState(0)
  const [tabledata, setTabledata] = useState([])
  const history = useHistory()

  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    setaddModalOpen(false)
  }, [setAddModalFlag, setaddModalOpen])

  const editForSelect = useCallback((val) => {
    setgetarry(val)
    setEditFalg(1)
    setAddModalFlag(1)
    setaddModalOpen(true)
  }, [])

  const backtoDash = useCallback(() => {
    history.push('/Home/DashboardBackup')
    setquaterlyPendingBill(0)
  }, [history, setquaterlyPendingBill])

  useEffect(() => {
    if (QuaterlyPendingData.length !== 0) {
      const arr = QuaterlyPendingData?.map((val) => {
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
          sim_number: val.sim_number,
          provider: val.provider,
          providername: val.provider === 1 ? 'Vodafone Idea' : val.provider === 2 ? 'Airtel' : val.provider === 3 ? 'Jio' :
            val.provider === 4 ? 'Bsnl' : val.provider === 5 ? 'Reliance Communications' : val.provider === 6 ? 'Aircel' :
              val.provider === 7 ? 'Tata Docomo' : val.provider === 8 ? 'BSNL Mobile' : val.provider === 9 ? 'MNTL' :
                val.provider === 10 ? 'Tata Teleservices' : val.provider === 11 ? 'Telenor India' : val.provider === 12 ? 'MTS India' : 'N/A',
          isssued_deligate: val.isssued_deligate,
          issue_date: val.issue_date,
          asset_no: val.asset_no,
          issue: val.issue,
          tarrif: val.tarrif,
          tarrifname: val.tarrif === 1 ? 'Monthly' : val.tarrif === 2 ? 'Quarterly' : val.tarrif === 3 ? 'Yearly' : 'NIL',
          amount: val.amount,
          receiver_emp_id: val.receiver_emp_id,
          sim_mobile_num: val.sim_mobile_num,
          quaterly_slno: val.quaterly_slno,
          bill_amount: val.bill_amount,
          bill_date: val.bill_date,
          bill_entered_date: val.bill_entered_date,
          file_upload_status: val.file_upload_status,
          payed_status: val.payed_status,
          bill_number: val.bill_number,
          bill_due_date: val.bill_due_date
        }

        return obj
      })

      setTabledata(arr)
    }
  }, [QuaterlyPendingData])
  return (
    <Paper>
      <CardMasterClose
        // title={MonthlyTarriff }
        style={{ overflow: 'hidden' }}
        close={backtoDash}
      >
        {AddModalFlag === 1 ? <QuaterlyBillAddModal open={addModalOpen} handleClose={handleClose}
          quaterlyCount={quaterlyCount}
          setQuaterlyCount={setQuaterlyCount}
          setCount={setCount}
          count={count}
          getarry={getarry} editFlag={editFlag} /> : null}
        <Typography sx={{ fontWeight: 10, fontSize: 28, fontFamily: 'Anton', color: '#003060' }}>Add Quaterly Pending Bills</Typography>
        {/* <MonthlyTable editForSelect={editForSelect} /> */}
        <Paper variant="outlined" sx={{ maxHeight: 720, maxWidth: '100%', overflow: 'auto' }}>
          <CssVarsProvider>
            <Table padding={"none"} stickyHeader>
              <thead>
                <tr>
                  <th style={{ width: '4%' }}>Add</th>
                  {/* <th style={{width:'5%'}}>Action</th> */}
                  <th style={{ width: '5%' }} >SlNo</th>
                  <th style={{ width: '9%', }}>Device Name</th>
                  <th >Device Type</th>
                  <th>Department</th>
                  <th>Reciever Name</th>
                  <th>Reciever Emp ID</th>
                  <th>Sim Operator</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  tabledata.map((val, index) => {
                    return <tr key={index}
                      style={{ height: 8, background: val.payed_status === null ? '#D6DBDF' : val.payed_status === 0 ? '#D6DBDF' : 'transparent' }}>
                      <td>

                        <PlaylistAddCircleIcon sx={{ cursor: 'pointer' }} size={6}
                          onClick={() => editForSelect(val)}
                        />
                      </td>
                      <td> {index + 1}</td>
                      <td>{val.device_name}</td>
                      <td> {val.device_type_name}</td>
                      <td> {val.dept_name}</td>
                      <td> {val.reciver_name}</td>
                      <td> {val.receiver_emp_id}</td>
                      <td> {val.providername}</td>
                      <td> {val.amount}</td>
                    </tr>
                  })}
              </tbody>
            </Table>
          </CssVarsProvider>
        </Paper>
      </CardMasterClose>
    </Paper>
  )
}

export default memo(QuaterlyPendingBill)