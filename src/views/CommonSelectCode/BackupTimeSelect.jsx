import React, { memo, Fragment } from 'react'
import { useSelector } from 'react-redux'
import FormControl from '@mui/material/FormControl'
import { Box, Option, Select } from '@mui/joy'
const BackupTimeSelect = ({ scheduleTime, setScheduleTime }) => {
  const backupScheduleTime = useSelector(state => state?.getScheduleTime.scheduleTimeList)
  // const [timelist, settimelist] = useState(0)
  // useEffect(() => {
  //     settimelist(backupScheduleTime)
  // }, [backupScheduleTime])
  // const handleChange = e => {
  //   const {
  //     target: { value }
  //   } = e
  //   setScheduleTime(typeof value === 'string' ? value.split(',') : value)
  // }
  return (
    <Fragment>
      <Box >
        {/* <CustomeToolTip title="Select Schedule Time"> */}
        <FormControl fullWidth>
          <Select
            sx={{ height: 28, lineHeight: 1.2, borderRadius: 1.5 }}
            placeholder="Select Schedule Time"
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            size="small"
            multiple
            value={scheduleTime}
            // onChange={(e, newValue) => handleChange(newValue)}
            onChange={(e, newValue) => {
              setScheduleTime(newValue);
            }}
            variant="outlined"
          >
            <Option value={0} disabled>
              Select Schedule Time
            </Option>
            {backupScheduleTime &&
              backupScheduleTime.map(val => {
                return (
                  <Option key={val.schedule_time_id} value={val.schedule_time_id}>
                    {val.schedule_time_name}
                  </Option>
                )
              })}
          </Select>
        </FormControl>
        {/* </CustomeToolTip> */}
      </Box>
    </Fragment>
  )
}
export default memo(BackupTimeSelect)
