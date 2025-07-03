import React, { memo, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const TmMultipleEmployeeSelect = ({ empl, setEmpl }) => {
  const empnameselect = useSelector(state => {
    return state.getDepartSecemployee.departsecempList || 0
  })

  const handleChange = e => {
    const {
      target: { value },
    } = e
    setEmpl(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Fragment>
      <Box>
        <Select
          placeholder="Add Assignee"
          sx={{
            height: 26,
            width: '100%',
            borderRadius: 1.5,
            borderColor: '#F9F9FB',
            bgcolor: '#F9F9FB',
          }}
          id="demo-multiple-name"
          size="lg"
          multiple
          value={empl}
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={0} disabled>
            Add assignee
          </MenuItem>
          {empnameselect &&
            empnameselect.map(val => {
              return (
                <MenuItem
                  sx={{ borderRadius: 1, mb: 0.2, mx: 0.5 }}
                  key={val.em_id}
                  value={val.em_id}
                >
                  {val.em_name}
                </MenuItem>
              )
            })}
        </Select>
      </Box>
    </Fragment>

    // <Select
    //     multiple
    //     placeholder='Add Assignee'
    //     value={(empl) => (
    //         <Box sx={{ display: 'flex', gap: '0.25rem' }}>
    //             {empnameselect.map((val) => (
    //                 <Chip
    //                     variant="soft" color="primary"
    //                     key={val.em_id}
    //                     value={val.em_id}
    //                 >
    //                 </Chip>
    //             ))}
    //         </Box>
    //     )}
    //     sx={{
    //         minWidth: '15rem',
    //     }}
    //     slotProps={{
    //         listbox: {
    //             sx: {
    //                 width: '100%',
    //             },
    //         },
    //     }}
    // >
    // </Select>
  )
}
export default memo(TmMultipleEmployeeSelect)
