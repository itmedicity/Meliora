import { Box } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCondemPendingDatas } from 'src/api/AssetApis'
import EditCondemSubmitionModal from '../EditCondemSubmitionModal'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import PendingCondems from './PendingCondems'
import ViewSubmittedModal from '../ViewSubmittedModal'
import SelectedDeptRegReqDate from '../DepartmentCondemnation/SelectedDeptRegReqDate'
import DepartmentcondemList from '../DepartmentCondemnation/DepartmentcondemList'

const SubmittedCondemList = ({ empdept, empId }) => {
  const condemStatusFrom = 7
  const condemstatusTo = 0
  const postCondemDept = useMemo(() => {
    return {
      empdept: empdept,
      condemStatusFrom: condemStatusFrom,
      condemstatusTo: condemstatusTo
    }
  }, [empdept, condemstatusTo, condemStatusFrom])

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

  const SatusFrom = 8
  const StatusTo = 1
  const { data: CondemSubittedData } = useQuery({
    queryKey: ['getCondemPendingData', formCount],
    queryFn: () => getCondemPendingDatas(postCondemDept),
    enabled: empdept !== undefined
  })

  const [selectedValue, setSelectedValue] = useState('1')
  const handleChange = event => {
    setSelectedValue(event.target.value)
  }

  return (
    <Box sx={{ py: 1, px: 0.5 }}>
      {modalEditFlag === 1 ? (
        <EditCondemSubmitionModal
          modalEditOpen={modalEditOpen}
          setmodalEditOpen={setmodalEditOpen}
          setmodalEditFlag={setmodalEditFlag}
          empId={empId}
          formDetails={formDetails}
          empdept={empdept}
          setformCount={setformCount}
          formCount={formCount}
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
      <RadioGroup name="radio-buttons-group" value={selectedValue} onChange={handleChange}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            justifyContent: 'center',
            mt: 1.5,
            mb: 2
          }}
        >
          <Radio value="1" label="Pendings" color="neutral" />
          <Radio value="2" label="Select Registered Days" color="neutral" />
          <Radio value="3" label="All Registered List " color="neutral" />
        </Box>
      </RadioGroup>

      {selectedValue === '1' ? (
        <Box>
          <PendingCondems condemStatusPending={CondemSubittedData} editForm={editForm} viewForm={viewForm} />
        </Box>
      ) : selectedValue === '2' ? (
        <Box>
          <SelectedDeptRegReqDate SatusFrom={SatusFrom} StatusTo={StatusTo} empdept={empdept} viewForm={viewForm} />
        </Box>
      ) : selectedValue === '3' ? (
        <Box>
          <DepartmentcondemList SatusFrom={SatusFrom} StatusTo={StatusTo} empdept={empdept} viewForm={viewForm} />
        </Box>
      ) : (
        ''
      )}
    </Box>
  )
}

export default memo(SubmittedCondemList)
