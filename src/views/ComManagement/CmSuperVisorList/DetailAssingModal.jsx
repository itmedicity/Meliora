import {
  Box,
  Button,
  Chip,
  CssVarsProvider,
  Input,
  Modal,
  ModalDialog,
  Textarea,
  Typography,
} from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel'
import { format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import ComPrioritySelect from 'src/views/CommonSelectCode/ComPrioritySelect'
import moment from 'moment'
import CmDeptEmployee from 'src/views/CommonSelectCode/CmDeptEmployee'

const DetailAssingModal = ({
  open,
  setdetailAssingOpen,
  detailAssingData,
  setdetailAssingFlag,
  setCount,
  count,
}) => {
  const {
    complaint_slno,
    complaint_desc,
    compalint_date,
    rm_roomtype_name,
    rm_room_name,
    rm_insidebuildblock_name,
    rm_floor_name,
    location,
    complaint_type_name,
  } = detailAssingData

  const [assing, setAssing] = useState([])
  const [prioselet, setPriSelect] = useState(0)
  const [aprroxdate, setapproxdate] = useState('')
  const [remark, setRemark] = useState('')
  const [empName, setempname] = useState([])
  const empdept = useSelector(state => state?.LoginUserData?.empdept)
  const id = useSelector(state => state?.LoginUserData?.empid)
  const [maxTime, setmaxTime] = useState('')

  const updateRemark = useCallback(
    e => {
      setRemark(e.target.value)
    },
    [setRemark]
  )

  const updateaprroxdate = e => {
    setapproxdate(e.target.value)
  }

  const Close = useCallback(() => {
    setdetailAssingFlag(0)
    setdetailAssingOpen(false)
  }, [setdetailAssingOpen, setdetailAssingFlag])

  const postdata = useMemo(() => {
    return {
      em_department: empdept,
    }
  }, [empdept])

  const reset = useCallback(() => {
    setAssing([])
    setPriSelect([])
    setapproxdate('')
    setRemark('')
    setempname([])
  }, [])

  const detailAssign = useCallback(() => {
    const validAssignments = assing.filter(empId => {
      const isDuplicate = empName.some(emp => emp.assigned_emp === empId)
      if (isDuplicate) {
        const emp = empName.find(emp => emp.assigned_emp === empId)
        infoNotify(`${emp.em_name} is already assigned under this complaint.`)
        return false
      }
      return true
    })
    if (validAssignments.length > 0) {
      if (aprroxdate !== '') {
        if (prioselet !== null) {
          const postData = validAssignments.map(val => {
            return {
              complaint_remark: remark,
              complaint_slno: complaint_slno,
              assigned_emp: val,
              assigned_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
              assign_rect_status: 0,
              assigned_user: id,
              compalint_priority: prioselet,
              aprrox_date: aprroxdate,
              assign_status: 1,
            }
          })
          const Assignemp = async postData => {
            const result = await axioslogin.post(`/complaintassign/detailassign`, postData)
            const { message, success } = result.data
            if (success === 1) {
              succesNotify(message)
              setCount(count + 1)
              reset()
              Close()
            } else {
              infoNotify(message)
            }
          }

          Assignemp(postData)
        } else {
          infoNotify('Please Select any Priority')
        }
      } else {
        infoNotify('Please Select an Approximate Completion Date')
      }
    } else {
      infoNotify('Please Select an  Employee')
    }
  }, [
    assing,
    empName,
    aprroxdate,
    prioselet,
    remark,
    complaint_slno,
    id,
    Close,
    count,
    reset,
    setCount,
  ])

  const buttonStyle = {
    fontSize: 16,
    color: '#523A28',
    cursor: 'pointer',
    boxShadow: 5,
    border: 'none',
    transition: 'transform 0.2s, bgcolor 0.2s',
    '&:hover': {
      bgcolor: 'white',
      color: '#523A28',
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
  }

  useEffect(() => {
    const getEmployeees = async () => {
      const result = await axioslogin.get(`Rectifycomplit/getAssignEmps/${complaint_slno}`)
      const { success, data } = result.data
      if (success === 1) {
        setempname(data)
      } else {
        setempname([])
      }
    }
    getEmployeees()
  }, [complaint_slno])

  useEffect(() => {
    const defaultTime = moment().add(maxTime, 'minutes').format('YYYY-MM-DDTHH:mm')
    setapproxdate(defaultTime)
  }, [maxTime])

  return (
    <Box>
      <CssVarsProvider>
        <Modal open={open}>
          <ModalDialog
            sx={{
              width: '45vw',
              p: 0,
              overflow: 'auto',
            }}
          >
            <Box>
              <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1 }}>
                <Box sx={{ flex: 1, color: 'grey' }}>Assign to Employee</Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }} onClick={Close} />
                </Box>
              </Box>

              <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: 0.5, mb: 3 }}>
                <Box sx={{ flex: 2, pl: 0.5 }}>
                  <Typography sx={{ pl: 0.5, fontWeight: 600, color: 'Black' }}>
                    Ticket No.{complaint_slno}
                  </Typography>
                  <Typography sx={{ pl: 0.5, fontSize: 14, color: 'Black' }}>
                    {complaint_desc}
                  </Typography>
                  <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black', py: 0.5 }}>
                    Complaint Type: {complaint_type_name}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
                  <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>{location}</Typography>
                  {rm_room_name !== null ? (
                    <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>
                      {rm_room_name}
                      {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name
                        ? ` (${rm_roomtype_name ? rm_roomtype_name : ''}${
                            rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''
                          }${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${
                            rm_insidebuildblock_name && rm_floor_name ? ' - ' : ''
                          }${rm_floor_name ? rm_floor_name : ''})`
                        : 'Not Updated'}
                    </Typography>
                  ) : null}
                  <Typography sx={{ pl: 0.5, fontSize: 13, color: 'Black' }}>
                    {compalint_date}
                  </Typography>
                </Box>
              </Box>
              {empName.length !== 0 ? (
                <Box sx={{ flex: 1, mt: 3 }}>
                  <Typography sx={{ pl: 3.1, fontWeight: 500, fontSize: 14 }}>
                    Assignees :
                  </Typography>
                  <Box
                    sx={{
                      mx: 2.5,
                      py: 0.4,
                      minHeight: 30,
                      border: 1.5,
                      borderRadius: 5,
                      borderColor: '#D7DFE8',
                    }}
                  >
                    {empName?.map((val, index) => {
                      return (
                        <Chip key={index} sx={{ bgcolor: '#D3C7A1', ml: 0.5 }}>
                          {val.em_name}
                        </Chip>
                      )
                    })}
                  </Box>
                </Box>
              ) : null}
              <Box sx={{ flex: 1, mx: 2.5, mt: 1 }}>
                {empName.length !== 0 ? (
                  <Typography sx={{ fontWeight: 500, pl: 0.5, fontSize: 14 }}>
                    Add More Assignees :
                  </Typography>
                ) : (
                  <Typography sx={{ fontWeight: 500, pl: 0.5, fontSize: 14 }}>
                    Select Assignees :
                  </Typography>
                )}
                <CmDeptEmployee postdata={postdata} value={assing} setValue={setAssing} />
                <Box sx={{ flex: 1, display: 'flex', mt: 1, gap: 1.5 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 500, pl: 0.5, fontSize: 14 }}>
                      Select Priority :
                    </Typography>
                    <ComPrioritySelect
                      value={prioselet}
                      setValue={setPriSelect}
                      setmaxTime={setmaxTime}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 500, pl: 0.5, fontSize: 14 }}>
                      Approx. Completion Date & time:
                    </Typography>
                    <Input
                      sx={{ pl: 3, cursor: 'pointer', color: 'grey' }}
                      type="datetime-local"
                      name="aprroxdate"
                      value={aprroxdate}
                      onChange={updateaprroxdate}
                      slotProps={{
                        input: {
                          max: maxTime,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box sx={{ mt: 1.5 }}>
                  <Typography sx={{ fontWeight: 500, pl: 0.5, fontSize: 14 }}>Remarks :</Typography>
                  <Textarea
                    minRows={2}
                    placeholder="type here..."
                    name="remark"
                    value={remark}
                    onChange={updateRemark}
                  />
                </Box>
              </Box>
              <Box sx={{ pb: 1, mr: 1, mt: 3, display: 'flex', justifyContent: 'right' }}>
                <Button variant="plain" sx={buttonStyle} onClick={detailAssign}>
                  Save
                </Button>
                <Button variant="plain" sx={buttonStyle} onClick={Close}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(DetailAssingModal)
