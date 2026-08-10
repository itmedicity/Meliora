import React, { useCallback, useMemo, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/joy'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector } from 'react-redux'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'
import DivisionMasterTable from './DivisionMasterTable'

const DivisionMaster = () => {
  const history = useNavigate()
  const [request, setRequest] = useState({
    Division_name: "",
    Division_status: false,
    Division_slno: ''
  })

  const [count, setCount] = useState(0)
  //state for edit
  const [edit, setEdit] = useState(0)
  //data set for edit
  const rowSelect = useCallback(params => {
    setEdit(1)
    const data = params.api.getSelectedRows()
    const { division, status, division_slno } = data[0]
    const frmdata = {
      Division_name: division,
      Division_status: status === 'Yes' ? true : false,
      Division_slno: division_slno
    }
    setRequest(frmdata)
  }, [])
  //destructuring
  const { Division_name, Division_status, Division_slno } = request

  const updateRequesttype = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setRequest({ ...request, [e.target.name]: value })
    },
    [request]
  )
  // Get login user emp_id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  //data for insert
  const postdata = useMemo(() => {
    return {
      Division_name: Division_name,
      Division_status: Division_status === true ? 1 : 0,
      create_user: id
    }
  }, [Division_status, Division_status, id])

  const patchdata = useMemo(() => {
    return {
      Division_name: Division_name,
      Division_status: Division_status === true ? 1 : 0,
      Division_slno: Division_slno
    }
  }, [Division_name, Division_status, Division_slno])

  const submitDashBoard = useCallback(
    async () => {
      const formreset = {
        Division_name: "",
        Division_status: false,
        Division_slno: ''
      }

      /***  * insert function for use call back     */
      const InsertFun = async postdata => {
        const result = await axioslogin.post('/tokenMaster/insertdivision', postdata)
        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setCount(count + 1)
          setRequest(formreset)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /***  * update function for use call back     */
      const updateFun = async patchdata => {
        const result = await axioslogin.post('/tokenMaster/updatedivision', patchdata)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          setCount(count + 1)
          setRequest(formreset)
          setEdit(0)
        } else if (success === 0) {
          infoNotify(message)
        } else {
          infoNotify(message)
        }
      }
      /*** edit=0 insert api call work else update call
       * edit initialy '0' when edit button click value changes to '1'
       */
      if (edit === 0) {
        InsertFun(postdata)
      } else {
        updateFun(patchdata)
      }
    },
    [edit, postdata, patchdata, count]
  )

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])

  const refreshWindow = useCallback(() => {
    // setCategory([])
  }, [])
  return (
    <CardMaster title="Division Master" submit={submitDashBoard} close={backtoSetting} refresh={refreshWindow}>
      <Box sx={{ p: 1 }}>
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "flex-start",
            }}
          >
            {/* Left Section */}
            <Box
              sx={{
                width: "30%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <TextFieldCustom
                placeholder="Division"
                type="text"
                size="sm"
                name="Division_name"
                value={Division_name}
                onchange={updateRequesttype}
              />

              <CusCheckBox
                label="Status"
                color="primary"
                size="md"
                name="Division_status"
                value={Division_status}
                checked={Division_status}
                onCheked={updateRequesttype}
              />
            </Box>

            {/* Right Section */}
            <Box sx={{ width: "70%", }} >
              <DivisionMasterTable
                count={count}
                rowSelect={rowSelect}
                setCount={setCount}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </CardMaster>)
}

export default DivisionMaster