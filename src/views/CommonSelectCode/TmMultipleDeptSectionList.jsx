import { Autocomplete } from '@mui/joy'
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMultHodInCharge } from 'src/redux/actions/TmMultipleHODorInChargeList'

const TmMultipleDeptSectionList = ({ deptSection, setDeptSection }) => {
  const deptsecList = useSelector(state => state.getMultDepSection?.deptsectiondeptList)
  const dispatch = useDispatch()
  const handleChange = (event, value) => {
    setDeptSection(value)
  }
  useEffect(() => {
    if (deptSection.length !== 0) {
      const deptSecIds = deptSection.map(sec => sec.sec_id)
      dispatch(getMultHodInCharge(deptSecIds))
    }
  }, [deptSection, dispatch])

  return (
    <Autocomplete
      multiple
      sx={{
        width: '100%',
        minHeight: 40,
        bgcolor: 'transparent',
        '--Input-radius': '0px',
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: '2px solid',
        borderColor: 'neutral.outlinedBorder',
        '&:hover': {
          borderColor: 'neutral.outlinedHoverBorder'
        },
        '&::before': {
          border: '1px solid var(--Input-focusedHighlight)',
          transform: 'scaleX(0)',
          left: 0,
          right: 0,
          bottom: '-2px',
          top: 'unset',
          transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
          borderRadius: 0
        },
        '&:focus-within::before': {
          transform: 'scaleX(1)'
        }
      }}
      // value={department}
      placeholder="Select Department Sections"
      isOptionEqualToValue={(option, value) => option.sec_name === value.sec_name}
      getOptionLabel={option => option.sec_name || ''}
      options={deptsecList}
      onChange={handleChange}
      // renderinput={(params) => <TextField {...params} variant="standard" />
      // }
    />
  )
}

export default memo(TmMultipleDeptSectionList)
