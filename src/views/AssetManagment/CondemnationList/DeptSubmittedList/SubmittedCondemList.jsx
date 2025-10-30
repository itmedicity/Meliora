import { Box } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCondemPendingDatas, getTopActiveCondemnationLevel } from 'src/api/AssetApis'
import EditCondemSubmitionModal from '../EditCondemSubmitionModal'
import Radio from '@mui/joy/Radio'
import RadioGroup from '@mui/joy/RadioGroup'
import PendingCondems from './PendingCondems'
import ViewSubmittedModal from '../ViewSubmittedModal'
import DepartmentcondemList from './DepartmentcondemList'
import RejectedcondemnListDept from './RejectedcondemnListDept'


const SubmittedCondemList = ({ empdept, empId, setAddmoreItemFlag, setFormDetailsInAddMoreItems, queryClient }) => {

  const { data: ActiveCondemnationLevel } = useQuery({
    queryKey: ['getActiveCondemnationLevel'],
    queryFn: () => getTopActiveCondemnationLevel()
  })
  const ActiveCondemnations = useMemo(() => ActiveCondemnationLevel || [], [ActiveCondemnationLevel])
  const level_num = ActiveCondemnations.length > 0 ? ActiveCondemnations[0]?.level_num : null


  const postCondemDept = useMemo(() => {
    return {
      empdept: empdept,
      levelNo: level_num
    }
  }, [empdept, level_num])


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
    setFormDetailsInAddMoreItems(val)
  }, [])


  const { data: CondemSubittedData, isLoading: loadingPending } = useQuery({
    queryKey: ['getCondemPendingData', formCount],
    queryFn: () => getCondemPendingDatas(postCondemDept),
    enabled: empdept !== undefined && level_num !== null
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
          setAddmoreItemFlag={setAddmoreItemFlag}
          queryClient={queryClient}
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
          <Radio value="2" label="Approved List " color="neutral" />
          <Radio value="3" label="Rejected  " color="neutral" />
        </Box>
      </RadioGroup>

      {selectedValue === '1' ? (
        <Box>
          <PendingCondems condemStatusPending={CondemSubittedData} editForm={editForm} viewForm={viewForm} loadingPending={loadingPending}
            setAddmoreItemFlag={setAddmoreItemFlag} />
        </Box>
      )
        : selectedValue === '2' ? (
          <Box>
            <DepartmentcondemList empdept={empdept} />
          </Box>
        )
          : selectedValue === '3' ? (
            <Box>
              <RejectedcondemnListDept empdept={empdept} editForm={editForm} />
            </Box>
          )
            :
            (
              ''
            )}
    </Box>
  )
}

export default memo(SubmittedCondemList)
