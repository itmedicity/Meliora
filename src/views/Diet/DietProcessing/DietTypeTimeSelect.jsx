import React, { useMemo, useEffect } from 'react'
import { Box, Checkbox, Typography } from '@mui/joy'
import { DietNameTimes, GroupedTime } from '../CommonData/Common'
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone'
import { isTimeInRange } from '../Helpers/HelperFunction'

const DietTypeTimeSelect = ({
  selectedDiets,
  setSelectedDietTimes,
  selectedDietTimes,
  isAllSelected
}) => {

  const combinedTimes = useMemo(() => {
    if (selectedDiets.length === 0) return []

    const timeMap = new Map()

    selectedDiets.forEach(dietName => {
      const diet = DietNameTimes.find(
        d => d.name?.toUpperCase() === dietName
      )

      diet?.times.forEach(time => {
        if (!timeMap.has(time.type)) {
          timeMap.set(time.type, time)
        }
      })
    })

    return Array.from(timeMap.values())
  }, [selectedDiets])


  // STEP 2: Group UNIQUE meals by FIXED TIME RANGES
  const groupedByFixedTime = useMemo(() => {
    if (selectedDiets.length === 0) return []

    return GroupedTime
      .map(range => ({
        range,
        meals: combinedTimes.filter(meal =>
          isTimeInRange(meal.time, range)
        )
      }))
      .filter(group => group.meals.length > 0)
  }, [combinedTimes, selectedDiets])


  /* ADDITION 1: SYNC TIMES WHEN DIETS CHANGE */
  useEffect(() => {
    if (!selectedDiets.length) return

    setSelectedDietTimes(prev => {
      const updated = { ...prev }

      // collect all selected times across diets
      const globallySelectedTimes = new Set(
        Object.values(prev).flat()
      )

      selectedDiets.forEach(dietName => {
        const diet = DietNameTimes.find(
          d => d.name?.toUpperCase() === dietName
        )
        if (!diet) return

        const allowedTimes = diet.times.map(t => t.type)

        // keep valid + add common selected times
        updated[dietName] = Array.from(
          new Set([
            ...(updated[dietName] || []).filter(time =>
              allowedTimes.includes(time)
            ),
            ...Array.from(globallySelectedTimes).filter(time =>
              allowedTimes.includes(time)
            )
          ])
        )
      })

      return updated
    })
  }, [selectedDiets, setSelectedDietTimes])


  useEffect(() => {
    if (!isAllSelected) return

    setSelectedDietTimes(prev => {
      const updated = { ...prev }

      selectedDiets.forEach(dietName => {
        const diet = DietNameTimes.find(
          d => d.name?.toUpperCase() === dietName
        )
        if (!diet) return

        //SELECT ALL AVAILABLE TIMES FOR THAT DIET
        updated[dietName] = diet.times.map(t => t.type)
      })

      return updated
    })
  }, [selectedDiets, setSelectedDietTimes])





  /*ADDITION 2: SAFE TOGGLE (ONLY IF DIET SUPPORTS TIME) */
  const handleTimeToggle = (mealType) => {
    setSelectedDietTimes(prev => {
      const updated = { ...prev }

      selectedDiets.forEach(dietName => {
        const diet = DietNameTimes.find(
          d => d.name?.toUpperCase() === dietName
        )
        if (!diet) return

        const supportsTime = diet.times.some(
          t => t.type === mealType
        )
        if (!supportsTime) return

        const current = updated[dietName] || []

        updated[dietName] = current.includes(mealType)
          ? current.filter(t => t !== mealType)
          : [...current, mealType]
      })

      return updated
    })
  }


  /* --------------------------------------------- */

  if (selectedDiets.length === 0) {
    return (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 500,
          color: 'black',
          fontFamily: 'Bahnschrift',
          whiteSpace: 'nowrap'
        }}
      >
        Select Diet to view timings
      </Typography>
    )
  }

  return (
    <>
      {/* HEADER */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 1,
            gap: 1
          }}
        >
          <PendingActionsTwoToneIcon sx={{ color: '#7c51a1' }} />
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--royal-purple-400)',
              fontFamily: 'Bahnschrift',
              whiteSpace: 'nowrap'
            }}
          >
            DIET TIMES
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          width: '100%',
        }}
      >
        {groupedByFixedTime.map((group, gIndex) => (
          <React.Fragment key={gIndex}>

            {/* TIME RANGE HEADING */}
            <Box sx={{ width: '100%', mt: 1 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#7c51a1',
                  fontFamily: 'Bahnschrift',
                }}
              >
                {group.range}
              </Typography>
            </Box>

            {/* MEALS INSIDE RANGE */}
            {group.meals.map(item => (
              <Box
                key={`${group.range}-${item.type}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flex: '0 0 calc(50% - 8px)',
                  mb: 0.5,
                }}
              >
                <Checkbox
                  size="sm"
                  variant="outlined"
                  onChange={() => handleTimeToggle(item.type)}
                  checked={
                    selectedDiets.some(
                      diet => selectedDietTimes[diet]?.includes(item.type)
                    )
                  }
                  sx={{
                    '--Checkbox-radius': '4px',
                    '--Checkbox-gap': '6px',
                    '--Checkbox-size': '20px',
                    '--joy-palette-primary': '#7c51a1',
                    '& .MuiCheckbox-root': {
                      borderColor: '#7c51a1',
                    },
                    '& .Mui-checked': {
                      color: '#7c51a1',
                    }
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'black',
                    fontFamily: 'Bahnschrift',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.type}
                </Typography>
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Box>
    </>
  )
}

export default DietTypeTimeSelect
