import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const TmProjectListSearch = ({ projectz, setprojectz }) => {
  const ProjectList = useSelector(state => state.getProjectList?.ProjectList)
  const [projectx, setprojectx] = useState([{ tm_project_slno: 0, tm_project_name: '' }])
  const [value, setValue] = useState(projectx[0])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (projectz !== 0) {
      let newObj = ProjectList?.find(e => e.tm_project_slno === projectz)
      setValue(newObj)
    }
  }, [projectz, ProjectList])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setprojectz(value.tm_project_slno)
      } else {
        setprojectz(0)
      }
      return
    },
    [setprojectz]
  )
  useEffect(() => {
    ProjectList.length > 0 && setprojectx(ProjectList)
  }, [ProjectList])
  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '25px',
            borderRadius: 0.2,
            borderRight: 0
          }}
          value={projectz === 0 ? projectx : value}
          placeholder="search project"
          clearOnBlur
          style={{ minHeight: 29 }}
          onChange={(event, newValue) => {
            setValue(newValue)
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.tm_project_name === value.tm_project_name}
          getOptionLabel={option => option.tm_project_name || ''}
          options={projectx}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(TmProjectListSearch)
