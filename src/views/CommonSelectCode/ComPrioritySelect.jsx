import React, { useEffect, memo, useState } from 'react'
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { axioslogin } from "src/views/Axios/Axios"
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/joy';

const ComPrioritySelect = ({ value, setValue, disabled }) => {

    const [pririty, setpriority] = useState([])
    useEffect(() => {
        const gerPriority = async () => {
            const result = await axioslogin.get('/compriority');
            const { success, data } = result.data
            if (success === 1) {
                setpriority(data)
            } else {
                setpriority([])
            }
        }
        gerPriority()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue); // newValue should directly give you the selected value      
    };





    return (
        <Box>
            {/* <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Priority</MenuItem>
                    {
                        pririty && pririty.map((val, index) => {
                            return <MenuItem key={index} value={val.cm_priority_slno}>{val.cm_priority_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl> */}
            <Select
                placeholder="Select Priority"
                indicator={<KeyboardArrowDown />}
                value={value}
                onChange={handleChange}  // Attach the handleChange function
                sx={{
                    width: '100%',
                    [`& .${selectClasses.indicator}`]: {
                        transition: '0.2s',
                        [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                        },
                    },
                }}
            >
                {
                    pririty && pririty.map((val, index) => {
                        return <Option key={index} value={val.cm_priority_slno}>
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Box sx={{ flex: 1 }}>
                                    {val.cm_priority_desc}
                                </Box>
                                <Box sx={{ fontSize: 14 }}>
                                    {val.escalation_min !== 0 ? <>
                                        ({val.escalation_min}min - {val.escalation_max}min)</> : null}
                                </Box>

                            </Box></Option>
                    })
                }
            </Select>
        </Box >
    )
}

export default memo(ComPrioritySelect)