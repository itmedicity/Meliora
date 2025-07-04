import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const TmAllProjectList = ({ projectz, setprojectz, setdueDateProject }) => {
  const ProjectList = useSelector(state => state.getProjectListWithgoal?.ProjectList)
  const [projectx, setprojectx] = useState([{ tm_project_slno: 0, tm_project_name: '', tm_project_duedate: '' }])
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
        setdueDateProject(value.tm_project_duedate)
      } else {
        setprojectz(0)
      }
    },
    [setprojectz, setdueDateProject]
  )

  useEffect(() => {
    if (ProjectList.length > 0) {
      setprojectx(ProjectList)
    } else {
      setprojectx([])
    }
  }, [ProjectList])

  const isPastDue = duedate => {
    const today = new Date()
    const dueDate = new Date(duedate)
    return dueDate < today
  }

  const filterProps = props => {
    const { ownerState, ...restProps } = props
    return restProps
  }

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
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
          value={projectz === 0 ? projectx : value}
          placeholder="Select Project"
          clearOnBlur
          onChange={(event, newValue) => {
            setValue(newValue)
            Onclick(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          loading={true}
          loadingText="No Data"
          freeSolo
          isOptionEqualToValue={(option, value) => option.tm_project_name === value.tm_project_name}
          getOptionLabel={option => option.tm_project_name || ''}
          options={projectx}
          renderOption={(props, option) => {
            const filteredProps = filterProps(props)
            return (
              <li
                {...filteredProps}
                style={{
                  color: isPastDue(option.tm_project_duedate) ? 'darkred' : 'inherit',
                  padding: '4px 8px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                {option.tm_project_name}
              </li>
            )
          }}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(TmAllProjectList)
