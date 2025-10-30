import React, { Fragment, memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/joy/Autocomplete'
import { CssVarsProvider } from '@mui/joy/'

const TmGoalsList = ({ goalz, setgoalz }) => {
  const GoalsList = useSelector(state => state.getGoalsList?.GoalsList)

  const [goalx, setgoalx] = useState([{ tm_goals_slno: 0, tm_goal_name: '' }])

  const [value, setValue] = useState(goalx[0])

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (goalz !== 0) {
      let newObj = GoalsList?.find(e => e.tm_goals_slno === goalz)
      setValue(newObj)
    }
  }, [goalz, GoalsList])

  const Onclick = useCallback(
    value => {
      if (value !== null) {
        setValue(value)
        setgoalz(value.tm_goals_slno)
      } else {
        setgoalz(0)
      }
      return
    },
    [setgoalz]
  )
  useEffect(() => {
    GoalsList.length > 0 && setgoalx(GoalsList)
  }, [GoalsList])

  return (
    <Fragment>
      <CssVarsProvider>
        <Autocomplete
          sx={{
            '--Input-minHeight': '29px'
          }}
          value={goalz === 0 ? goalx : value}
          placeholder="select goal"
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
          loadingText="Loading..."
          freeSolo
          isOptionEqualToValue={(option, value) => option.tm_goal_name === value.tm_goal_name}
          getOptionLabel={option => option.tm_goal_name || ''}
          options={goalx}
        />
      </CssVarsProvider>
    </Fragment>
  )
}

export default memo(TmGoalsList)
