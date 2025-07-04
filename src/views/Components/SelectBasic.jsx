import React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { FormHelperText, Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

const SelectBasic = () => {
  const [age, setAge] = React.useState('')

  const handleChange = event => {
    setAge(event.target.value)
  }

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
  ]

  return (
    <Box>
      <Grid item container xl={12} lg={12} md={12} spacing={1}>
        <Grid item xl={12} lg={12} md={12}>
          <FormControl fullWidth size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              size="small"
              fullWidth
              sx={{ height: 25, lineHeight: 1.2, m: 0 }}
            >
              <MenuItem sx={{ height: 30 }} defaultValue disabled>
                Select Option
              </MenuItem>
              <MenuItem value={10} sx={{ height: 30 }}>
                Ten
              </MenuItem>
              <MenuItem value={20} sx={{ height: 30 }}>
                Twenty
              </MenuItem>
              <MenuItem value={30} sx={{ height: 30 }}>
                Thirty
              </MenuItem>
            </Select>
            <FormHelperText sx={{ m: 0, p: 0 }}>With Helper Text</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xl={12} lg={12} md={12}>
          <FormControl fullWidth size="small">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
              size="small"
              fullWidth
              displayEmpty
              // sx={{ height: 25, p: 0, m: 0, lineHeight: 1.200 }}
              sx={{ height: 25, lineHeight: 1.2, m: 0 }}
            >
              <MenuItem sx={{ height: 30 }} value="">
                Select Option
              </MenuItem>
              <MenuItem value={10} sx={{ height: 30 }}>
                Ten
              </MenuItem>
              <MenuItem value={20} sx={{ height: 30 }}>
                Twenty
              </MenuItem>
              <MenuItem value={30} sx={{ height: 30 }}>
                Thirty
              </MenuItem>
            </Select>
            {/* <FormHelperText sx={{ m: 0, p: 0 }} >With Out Helper</FormHelperText> */}
          </FormControl>
        </Grid>

        <Grid item xl={12} lg={12} md={12}>
          <Autocomplete
            size="small"
            fullWidth
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            // sx={{ width: 300 }}
            clearOnEscape
            disableClearable
            renderInput={params => <TextField size="small" {...params} />}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SelectBasic
