import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Typography } from '@mui/material';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { Box, Button, CssVarsProvider, Modal, ModalDialog } from '@mui/joy';
import CancelIcon from '@mui/icons-material/Cancel';
import AssistantEmpSelect from 'src/views/CommonSelectCode/AssistantEmpSelect';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const AssistneedModal = ({ assistNeed, assistOpen, setassistNeedFlag, setAssistOpen, count, setCount }) => {

  const { complaint_slno, complaint_desc, compalint_date, rm_roomtype_name, rm_room_name, rm_insidebuildblock_name,
    rm_floor_name, location, complaint_type_name, } = assistNeed

  const complaintLocation = rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
    `${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''}`
    : "Not Updated"

  const id = useSelector(state => {
    return state.LoginUserData.empid

  })
  const emp_name = useSelector((state) => {
    return state.LoginUserData.empname
  })
  const inchargeName = useSelector((state) => {
    return state.LoginUserData.sectionInchargeName
  })
  const hodName = useSelector((state) => {
    return state.LoginUserData.sectionHodName
  })
  const inchargeId = useSelector((state) => {
    return state.LoginUserData.sectionInchargeId
  })
  const hodId = useSelector((state) => {
    return state.LoginUserData.sectionHodId
  })




  const [assistemp, setAssistemp] = useState([])
  const [assistedEmployees, setAssistedEmployees] = useState([])

  const Close = useCallback(() => {
    setassistNeedFlag(0)
    setAssistOpen(false)
    setAssistemp([])
  }, [setAssistOpen, setassistNeedFlag])

  const searchData = useMemo(() => {
    return {
      complaint_slno: complaint_slno,
    }
  }, [complaint_slno])

  useEffect(() => {
    let isMounted = true
    const getAllassistedEmployee = async (searchData) => {
      const result = await axioslogin.post('/complaintassign/AssistReqEmployee', searchData);
      const { success, data } = result.data;
      if (isMounted) {
        if (success === 2) {
          setAssistedEmployees(data);
        } else {
          setAssistedEmployees([]);
        }
      }
    };
    getAllassistedEmployee(searchData)
    return () => {
      isMounted = false;
    }
  }, [searchData])

  const assistentData = assistemp && assistemp.map((val) => {
    return {
      complaint_slno: complaint_slno,
      assigned_emp: val,
      assist_assign_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      assist_flag: 1,
      assist_requested_emp: id,
      assign_rect_status: 0,
      assigned_user: id,
      assist_requested_employee: emp_name,
      inchargeName: inchargeName,
      inchargeId: inchargeId,
      hodName: hodName,
      hodId: hodId,
      complaint_desc: complaint_desc,
      complaint_type_name: complaint_type_name,
      ticket_raised_section: location,
      complaintLocation: complaintLocation
    }
  }, [complaint_slno, assistemp, id, emp_name, hodId, inchargeName, inchargeId, hodName, complaint_desc, complaint_type_name, location, complaintLocation]);

  const Assistent = useCallback(() => {
    const AssistentEmp = async () => {
      const result = await axioslogin.post(`/complaintassign/assist/multiple`, assistentData);
      const { message, success } = result.data;
      if (success === 1) {
        succesNotify(message)
        setCount(count + 1)
        Close();
      } else if (success === 0) {
        infoNotify(message)
      } else {
        infoNotify(message)
      }
    }
    if (assistemp === 0) {
      infoNotify("Please Select Employee")
    } else {
      AssistentEmp(assistentData)
    }

  }, [assistentData, count, Close, setCount, assistemp])

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

  const empdept = useSelector((state) => {
    return state.LoginUserData.empdept
  })

  const postdata = {
    em_department: empdept,
    em_id: id
  }

  return (
    <CssVarsProvider>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={assistOpen}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 1, borderRadius: 10 }}>
        <ModalDialog variant="outlined" sx={{ width: '50vw', p: 0, overflow: 'auto', }}>
          <Box sx={{ flex: 1, display: 'flex', mt: 1, p: 1, }}>
            <Box sx={{ flex: 1, color: 'grey', }}>
              Request Assistance
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <CancelIcon sx={{ color: 'darkred', cursor: 'pointer' }}
                onClick={Close}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', bgcolor: '#ECEDEF', py: .5 }}>
            <Box sx={{ flex: 1, pl: .5 }}>
              <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', }}>Ticket No.{complaint_slno}</Typography>
              <Typography sx={{ pl: .5, fontSize: 14, color: 'Black', }}>
                {complaint_desc}
              </Typography>
              <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', py: .5 }}>
                Complaint Type: {complaint_type_name}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right', pr: 1.5 }}>
              <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                {location}
              </Typography>
              {rm_room_name !== null ?
                <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                  {rm_room_name}
                  {rm_roomtype_name || rm_insidebuildblock_name || rm_floor_name ?
                    ` (${rm_roomtype_name ? rm_roomtype_name : ''}${rm_roomtype_name && rm_insidebuildblock_name ? ' - ' : ''}${rm_insidebuildblock_name ? rm_insidebuildblock_name : ''}${(rm_insidebuildblock_name && rm_floor_name) ? ' - ' : ''}${rm_floor_name ? rm_floor_name : ''})`
                    : "Not Updated"}
                </Typography> : null}
              <Typography sx={{ pl: .5, fontSize: 13, color: 'Black', }}>
                {compalint_date
                  ? format(new Date(compalint_date), 'dd MMM yyyy,  hh:mm a')
                  : 'Invalid Date'}
              </Typography>
            </Box>
          </Box>

          {assistedEmployees.length !== 0 ?
            <Box sx={{ flex: 1, mx: 2, mb: 2 }}>
              <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', py: .5, }}>
                Selected Assistants
              </Typography>

              <Box sx={{ flex: 1, bgcolor: 'lightgrey', height: 22, display: 'flex', fontWeight: 600, mb: 1 }}>
                < Box sx={{ flex: .5, pl: 2 }}>
                  Employees
                </Box>
                <Box sx={{ width: 250 }}>
                  Status
                </Box>
                <Box sx={{ flex: .5 }}>
                  Remarks
                </Box>

              </Box>
              {assistedEmployees?.map((val, index) => {
                return (
                  <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}
                    key={index}>
                    < Box sx={{ pl: 2.5, flex: .5, fontWeight: 600, color: '#6B5647' }}>
                      {val.assigned_emp_name}
                    </Box>
                    <Box
                      sx={{
                        width: 250,
                        fontWeight: 600,
                        color:
                          val.assist_receive === 0 && val.assist_flag === 1
                            ? '#41729F' // Requested
                            : val.assist_receive === 1 && val.assist_flag === 1
                              ? 'darkgreen' // Accepted
                              : val.assist_receive === 0 && val.assist_flag === 2
                                ? 'darkred' // Rejected
                                : '#6B5647', // Default color
                      }}
                    >
                      {val.assist_receive === 0 && val.assist_flag === 1
                        ? 'Requested'
                        : val.assist_receive === 1 && val.assist_flag === 1
                          ? 'Accepted'
                          : val.assist_receive === 0 && val.assist_flag === 2
                            ? 'Rejected'
                            : null}
                    </Box>

                    <Box sx={{ flex: .5 }}>
                      {val.assist_receive === 0 && val.assist_flag === 1
                        ? 'Pending Request'
                        : val.assist_receive === 1 && val.assist_flag === 1
                          ? 'Accepted'
                          : val.assist_receive === 0 && val.assist_flag === 2
                            ? <>{val.assist_req_reject_reason}</>
                            : null}

                    </Box>
                  </Box>
                )
              })}
            </Box> : null}



          <Box sx={{ flex: 1, mx: 2, mb: 4 }}>
            <Typography sx={{ pl: .5, fontWeight: 600, color: 'Black', py: .5, }}>
              Select Assistance
            </Typography>
            <AssistantEmpSelect postdata={postdata} value={assistemp} setValue={setAssistemp} />
          </Box>


          <Box sx={{ textAlign: 'right', pb: 1, mr: 1 }}>
            <Button
              variant='plain'
              sx={buttonStyle}
              onClick={Assistent}
            >Save</Button>
            <Button
              variant='plain'
              sx={buttonStyle}
              onClick={Close}
            >Cancel</Button>
          </Box>

        </ModalDialog>
      </Modal>
    </CssVarsProvider >
  )
}

export default memo(AssistneedModal)