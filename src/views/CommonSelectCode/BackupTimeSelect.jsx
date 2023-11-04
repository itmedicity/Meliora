import React, { memo, Fragment } from 'react'
import { useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
const BackupTimeSelect = ({ scheduleTime, setScheduleTime }) => {
    const backupScheduleTime = useSelector((state) => state?.getScheduleTime.scheduleTimeList)
    // const [timelist, settimelist] = useState(0)
    // useEffect(() => {
    //     settimelist(backupScheduleTime)
    // }, [backupScheduleTime])
    const handleChange = (e) => {
        const {
            target: { value }
        } = e;
        setScheduleTime(
            typeof value === "string" ? value.split(",") : value
        );
    };
    return (
        <Fragment>
            <Box >
                {/* <CustomeToolTip title="Select Schedule Time"> */}
                <FormControl fullWidth >
                    <Select
                        sx={{ height: 26, lineHeight: 1.200, width: 338 }}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        multiple
                        value={scheduleTime}
                        onChange={handleChange}
                        variant='outlined'
                    >
                        <MenuItem value={0} disabled >Select Schedule Time</MenuItem>
                        {
                            backupScheduleTime && backupScheduleTime.map((val) => {
                                return (
                                    <MenuItem
                                        key={val.schedule_time_id}
                                        value={val.schedule_time_id}
                                    >
                                        {val.schedule_time_name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
                {/* </CustomeToolTip> */}
            </Box >
        </Fragment>
    )
}
export default memo(BackupTimeSelect)



