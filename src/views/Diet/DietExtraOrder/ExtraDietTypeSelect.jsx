import React, { useEffect, useState, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNotify } from 'src/views/Common/CommonCode';

const ExtraDietTypeSelect = ({ value, setValue, proc_slno, process_date }) => {
    const [diettypedata, setdiettypedata] = useState([])

    useEffect(() => {
        if (proc_slno !== '') {
            const getDietType = async () => {
                const postdata = {
                    proc_slno: proc_slno,
                    process_date: process_date
                }
                const result = await axioslogin.post('/extraorder/dietType/get', postdata);
                const { success, data } = result.data
                if (success === 1) {
                    setdiettypedata(data)
                }
                else {
                    warningNotify("Error occured contact EDP")
                }
            }
            getDietType()
        }

    }, [proc_slno, process_date])
    return (
        <Box  >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Diet Type</MenuItem>
                    {
                        diettypedata && diettypedata.map((val, index) => {
                            return <MenuItem key={index} value={val.type_slno}>{val.type_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(ExtraDietTypeSelect)