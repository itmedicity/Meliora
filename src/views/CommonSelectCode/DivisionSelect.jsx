import React, { memo, useMemo } from 'react'
import { Box, FormControl, FormLabel, Option, Select } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { getDivisionList } from 'src/api/masterApi'

const DivisionSelect = ({ value, setValue }) => {
  const { data: divisionData = [], isLoading } = useQuery({
    queryKey: ['getDivisionList'],
    queryFn: getDivisionList,
  })

  // Filter out any inactive divisions if necessary, or map all
  const activeDivisions = useMemo(() => {
    if (!Array.isArray(divisionData)) return []
    return divisionData?.filter(item => item.status === 'Yes')
  }, [divisionData])

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl size="sm">
        <FormLabel sx={{ color: '#64748B', mb: 1 }}>
          Select Division
        </FormLabel>
        <Select
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          placeholder={isLoading ? "Loading divisions..." : "Choose a division"}
          disabled={isLoading}
          variant="outlined"
          size="sm"
          sx={{
            // borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            borderColor: '#E2E8F0',
            // fontWeight: 300,
            '&:hover': {
              borderColor: '#CBD5E1',
            },
            '&:focus-within': {
              outline: '0.5px solid #7c51a1',
              outlineOffset: '0.5px',
            }
          }}
        >
          <Option value={0} disabled>
            Select Division
          </Option>
          {activeDivisions.map((val) => (
            <Option key={val.division_slno} value={val.division_slno}>
              {val.division}
            </Option>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default memo(DivisionSelect)
