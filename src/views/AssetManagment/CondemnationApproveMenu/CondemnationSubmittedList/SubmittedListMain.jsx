import { Box, Radio, RadioGroup } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { getActiveCondemnationLevel, getAllDeptCondemPendingDatas, getCondemPendingDatas } from 'src/api/AssetApis'
import { useQuery } from '@tanstack/react-query'
import CondemnationApproveModal from '../CondemnationApproveModal'
import ViewSubmittedModal from '../../CondemnationList/ViewSubmittedModal'
import PendingListCondemnation from './DeptCondemnationList/PendingListCondemnation'
import AllDeptPendingListCondem from './AllDeptCondemnationList/AllDeptPendingListCondem'

const SubmittedListMain = ({ menuRightsList, empId, empdept }) => {
  const { level_no } = menuRightsList

  const { data: ActiveCondemnationLevel } = useQuery({
    queryKey: ['getActiveCondemnationLevel'],
    queryFn: () => getActiveCondemnationLevel()
  })
  const ActiveCondemnations = useMemo(() => ActiveCondemnationLevel || [], [ActiveCondemnationLevel])
  const level_num = ActiveCondemnations.length > 0 ? ActiveCondemnations[0]?.level_num : null

  const [formDetails, setformDetails] = useState([])
  const [modalEditFlag, setmodalEditFlag] = useState(0)
  const [modalEditOpen, setmodalEditOpen] = useState(false)
  const [formCount, setformCount] = useState(0)
  const [modalViewFlag, setmodalViewFlag] = useState(0)
  const [modalViewOpen, setmodalViewOpen] = useState(false)
  const [PendingDeptDatas, setPendingDeptDatas] = useState([])
  const [AllDeptPendingDatas, setAllDeptPendingDatas] = useState([])

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

  const condemSToStatusDept = 0
  const condemFromStatusDept = level_num

  const postCondemDept = useMemo(() => {
    return {
      empdept,
      condemStatusFrom: condemFromStatusDept,
      condemstatusTo: condemSToStatusDept
    }
  }, [empdept, condemFromStatusDept, condemSToStatusDept])

  const { data: CondemDeptPendingData = [] } = useQuery({
    queryKey: ['getDeptCondemPendingData', formCount],
    queryFn: () => getCondemPendingDatas(postCondemDept),
    enabled: empdept !== undefined
  })

  useEffect(() => {
    if (CondemDeptPendingData.length > 0) {
      setPendingDeptDatas(CondemDeptPendingData)
    }
  }, [CondemDeptPendingData])

  const condemStatusFrom = level_num + 1
  const condemstatusTo = level_no + 1

  const postCondemAllDept = useMemo(() => {
    return {
      condemStatusFrom: condemStatusFrom,
      condemstatusTo: condemstatusTo
    }
  }, [condemStatusFrom, condemstatusTo])

  const { data: AllDeptCondemPendings = [] } = useQuery({
    queryKey: ['getAllDeptCondemPendings', formCount],
    queryFn: () => getAllDeptCondemPendingDatas(postCondemAllDept)
  })

  useEffect(() => {
    if (AllDeptCondemPendings.length > 0) {
      setAllDeptPendingDatas(AllDeptCondemPendings)
    }
  }, [AllDeptCondemPendings])

  const SatusFrom = 8
  const SatusTo = 4

  const [selectedRValue, setSelectedRValue] = useState('1')
  const handleInchChange = event => {
    setSelectedRValue(event.target.value)
  }

  return (
    <Box>
      {modalEditFlag === 1 ? (
        <CondemnationApproveModal
          modalApproveOpen={modalEditOpen}
          setmodalApproveOpen={setmodalEditOpen}
          setmodalApproveFlag={setmodalEditFlag}
          empId={empId}
          formDetails={formDetails}
          setformCount={setformCount}
          formCount={formCount}
          menuRightsList={menuRightsList}
        />
      ) : null}
      {modalViewFlag === 1 ? (
        <ViewSubmittedModal
          modalViewOpen={modalViewOpen}
          setmodalViewOpen={setmodalViewOpen}
          setmodalViewFlag={setmodalViewFlag}
          empId={empId}
          formDetails={formDetails}
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
            mb: 2
          }}
        >
          <Radio value="1" label="Pendings" color="neutral" />
          <Radio value="2" label="Select Registered Dates" color="neutral" />
          <Radio value="3" label="All Registered List " color="neutral" />
        </Box>
      </RadioGroup>
      {selectedRValue === '1' ? (
        <Box>
          {level_no === 1 || level_no === 2 ? (
            <PendingListCondemnation PendingDeptDatas={PendingDeptDatas} editForm={editForm} viewForm={viewForm} />
          ) : (
            <AllDeptPendingListCondem
              AllDeptPendingDatas={AllDeptPendingDatas}
              editForm={editForm}
              viewForm={viewForm}
            />
          )}
        </Box>
      ) : selectedRValue === '2' ? (
        <Box>{/* <SelectedRegDate SatusFrom={SatusFrom} SatusTo={SatusTo} viewForm={viewForm} /> */}</Box>
      ) : selectedRValue === '3' ? (
        <Box>{/* <AllDeptRegistrdList SatusFrom={SatusFrom} SatusTo={SatusTo} viewForm={viewForm} /> */}</Box>
      ) : (
        ''
      )}
    </Box>
  )
}

export default memo(SubmittedListMain)
