import { Box, Radio, RadioGroup } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import InchargePendings from './InchargePendings'
import { getCondemPendingDatas } from 'src/api/AssetApis'
import { useQuery } from 'react-query'
import ViewSubmittedModal from '../../CondemnationList/ViewSubmittedModal'
import CondemnationApprovalModal from '../../CondemnationList/CondemnationApprovalModal'
import SelectedDeptRegReqDate from '../../CondemnationList/DepartmentCondemnation/SelectedDeptRegReqDate'
import DepartmentcondemList from '../../CondemnationList/DepartmentCondemnation/DepartmentcondemList'

const CondemListForInchrge = ({ empdept, empId, menurights }) => {
  const condemStatusFrom = 7
  const condemstatusTo = 0

  const postCondemDept = useMemo(() => {
    return {
      empdept,
      condemStatusFrom: condemStatusFrom,
      condemstatusTo: condemstatusTo,
    }
  }, [empdept, condemStatusFrom, condemstatusTo])

  const [formDetails, setformDetails] = useState([])
  const [modalEditFlag, setmodalEditFlag] = useState(0)
  const [modalEditOpen, setmodalEditOpen] = useState(false)
  const [formCount, setformCount] = useState(0)
  const [modalViewFlag, setmodalViewFlag] = useState(0)
  const [modalViewOpen, setmodalViewOpen] = useState(false)

  const viewForm = useCallback(val => {
    setformDetails(val)
    setmodalViewFlag(1)
    setmodalViewOpen(true)
  }, [])

  const editForm = useCallback(val => {
    setformDetails(val)
    setmodalEditFlag(1)
    setmodalEditOpen(true)
  }, [])

  const { data: CondemnationInchData } = useQuery({
    queryKey: ['getCondemInchargePending', formCount],
    queryFn: () => getCondemPendingDatas(postCondemDept),
    enabled: empdept !== undefined,
  })

  const condemInchargePending = useMemo(() => {
    return CondemnationInchData?.filter(item => item.condem_status > 1) || []
  }, [CondemnationInchData])

  const SatusFrom = 8
  const StatusTo = 1

  const [selectedRValue, setSelectedRValue] = useState('1')
  const handleInchChange = event => {
    setSelectedRValue(event.target.value)
  }
  return (
    <Box>
      {modalEditFlag === 1 ? (
        <CondemnationApprovalModal
          modalApproveOpen={modalEditOpen}
          setmodalApproveOpen={setmodalEditOpen}
          setmodalApproveFlag={setmodalEditFlag}
          empId={empId}
          formDetails={formDetails}
          empdept={empdept}
          setformCount={setformCount}
          formCount={formCount}
          menurights={menurights}
        />
      ) : null}
      {modalViewFlag === 1 ? (
        <ViewSubmittedModal
          modalViewOpen={modalViewOpen}
          setmodalViewOpen={setmodalViewOpen}
          setmodalViewFlag={setmodalViewFlag}
          empId={empId}
          formDetails={formDetails}
          empdept={empdept}
        />
      ) : null}
      <RadioGroup name="radio-buttons-group" value={selectedRValue} onChange={handleInchChange}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            justifyContent: 'center',
            mt: 1.5,
            mb: 2,
          }}
        >
          <Radio value="1" label="Pendings" color="neutral" />
          <Radio value="2" label="Select Registered Dates" color="neutral" />
          <Radio value="3" label="All Registered List " color="neutral" />
        </Box>
      </RadioGroup>

      {selectedRValue === '1' ? (
        <Box>
          <InchargePendings
            condemInchargePending={condemInchargePending}
            editForm={editForm}
            viewForm={viewForm}
          />
        </Box>
      ) : selectedRValue === '2' ? (
        <Box>
          <SelectedDeptRegReqDate
            SatusFrom={SatusFrom}
            StatusTo={StatusTo}
            empdept={empdept}
            viewForm={viewForm}
          />
        </Box>
      ) : selectedRValue === '3' ? (
        <Box>
          <DepartmentcondemList
            SatusFrom={SatusFrom}
            StatusTo={StatusTo}
            empdept={empdept}
            viewForm={viewForm}
          />
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}

export default memo(CondemListForInchrge)
