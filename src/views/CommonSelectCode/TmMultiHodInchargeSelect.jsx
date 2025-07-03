import { Autocomplete } from '@mui/joy'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

const TmMultiHodInchargeSelect = ({ value, setValue }) => {
  const HodInchargeList = useSelector(state => state.getMultHodInCharge?.HodInchargeList)

  const handleChange = (event, value) => {
    setValue(value)
  }

  const capitalize = str => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const formatOptionLabel = option => {
    const { em_name, sec_name, auth_post } = option
    const capitalizedSecName = sec_name.split(' ').map(capitalize).join(' ')
    return `${em_name} (${capitalizedSecName}-${auth_post === 1 ? 'Incharge' : 'HOD'})`
  }

  return (
    <Autocomplete
      multiple
      sx={{
        width: '100%',
        minHeight: 35,
        bgcolor: 'transparent',
        '--Input-radius': '0px',
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: '2px solid',
        borderColor: 'neutral.outlinedBorder',
        '&:hover': {
          borderColor: 'neutral.outlinedHoverBorder',
        },
        '&::before': {
          border: '1px solid var(--Input-focusedHighlight)',
          transform: 'scaleX(0)',
          left: 0,
          right: 0,
          bottom: '-2px',
          top: 'unset',
          transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
          borderRadius: 0,
        },
        '&:focus-within::before': {
          transform: 'scaleX(1)',
        },
      }}
      // value={department}
      placeholder="Select Assignees"
      // isOptionEqualToValue={(option, value) => option.em_name === value.em_name}
      // getOptionLabel={option => option.em_name || ''}
      isOptionEqualToValue={(option, value) =>
        formatOptionLabel(option) === formatOptionLabel(value)
      }
      getOptionLabel={formatOptionLabel}
      options={HodInchargeList}
      onChange={handleChange}
    />
  )
}

export default memo(TmMultiHodInchargeSelect)
