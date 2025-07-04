import React, { useEffect, memo, useState } from 'react'
import Select, { selectClasses } from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import { axioslogin } from 'src/views/Axios/Axios'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Box } from '@mui/joy'

const ComPrioritySelect = ({ value, setValue, setmaxTime }) => {
  const [pririty, setpriority] = useState([])

  useEffect(() => {
    const gerPriority = async () => {
      const result = await axioslogin.get('/compriority/select')
      const { success, data } = result.data
      if (success === 1) {
        setpriority(data)
      } else {
        setpriority([])
      }
    }
    gerPriority()
  }, [])

  const convertMinutesToWdhm = totalMinutes => {
    const weeks = Math.floor(totalMinutes / (7 * 24 * 60))
    const days = Math.floor((totalMinutes % (7 * 24 * 60)) / (24 * 60))
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60)
    const minutes = totalMinutes % 60

    const parts = []
    if (weeks) parts.push(`${weeks} week`)
    if (days) parts.push(`${days} days`)
    if (hours) parts.push(`${hours} hours`)
    if (minutes) parts.push(`${minutes} minutes`)
    return parts.length ? parts.join(' ') : '0m'
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
    const selectedPriority = pririty.find(item => item.cm_priority_slno === newValue)
    if (selectedPriority) {
      setmaxTime(selectedPriority.escalation_max)
    }
  }

  return (
    <Box>
      <Select
        placeholder="Select Priority"
        indicator={<KeyboardArrowDown />}
        value={value}
        onChange={handleChange}
        sx={{
          width: '100%',
          [`& .${selectClasses.indicator}`]: {
            transition: '0.2s',
            [`&.${selectClasses.expanded}`]: {
              transform: 'rotate(-180deg)'
            }
          }
        }}
      >
        {pririty &&
          pririty.map((val, index) => {
            const minFormatted = convertMinutesToWdhm(val.escalation_min)
            const maxFormatted = convertMinutesToWdhm(val.escalation_max)

            return (
              <Option key={index} value={val.cm_priority_slno}>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                  <Box>{val.cm_priority_desc}</Box>
                  <Box sx={{ fontSize: 14 }}>
                    {val.escalation_min !== 0 ? ` ${minFormatted}  -  ${maxFormatted} ` : null}
                  </Box>
                </Box>
              </Option>
            )
          })}
      </Select>
    </Box>
  )
}

export default memo(ComPrioritySelect)

// import React, { useEffect, memo, useState } from 'react'
// import Select, { selectClasses } from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import { axioslogin } from "src/views/Axios/Axios"
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import { Box } from '@mui/joy';
// const ComPrioritySelect = ({ value, setValue, setmaxTime }) => {
//     const [pririty, setpriority] = useState([]);
//     useEffect(() => {
//         const gerPriority = async () => {
//             const result = await axioslogin.get('/compriority/select');
//             const { success, data } = result.data;
//             if (success === 1) {
//                 setpriority(data);
//             } else {
//                 setpriority([]);
//             }
//         };
//         gerPriority();
//     }, []);
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//         const selectedPriority = pririty.find((item) => item.cm_priority_slno === newValue);
//         if (selectedPriority) {
//             setmaxTime(selectedPriority.escalation_max);
//         }
//     };
//     return (
//         <Box>
//             <Select
//                 placeholder="Select Priority"
//                 indicator={<KeyboardArrowDown />}
//                 value={value}
//                 onChange={handleChange}
//                 sx={{
//                     width: '100%',
//                     [`& .${selectClasses.indicator}`]: {
//                         transition: '0.2s',
//                         [`&.${selectClasses.expanded}`]: {
//                             transform: 'rotate(-180deg)',
//                         },
//                     },
//                 }}
//             >
//                 {
//                     pririty && pririty.map((val, index) => (
//                         <Option key={index} value={val.cm_priority_slno}>
//                             <Box sx={{ flex: 1, display: 'flex' }}>
//                                 <Box sx={{ flex: 1 }}>
//                                     {val.cm_priority_desc}
//                                 </Box>
//                                 <Box sx={{ fontSize: 14 }}>
//                                     {val.escalation_min !== 0 ?
//                                         `(${val.escalation_min}min - ${val.escalation_max}min)` : null}
//                                 </Box>
//                             </Box>
//                         </Option>
//                     ))
//                 }
//             </Select>
//         </Box>
//     );
// }

// export default memo(ComPrioritySelect);
