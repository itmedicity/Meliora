import React, { useEffect, memo, useState } from 'react'
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { axioslogin } from "src/views/Axios/Axios"
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Box } from '@mui/joy';

const ComPrioritySelect = ({ value, setValue, setmaxTime }) => {

    const [pririty, setpriority] = useState([]);


    useEffect(() => {
        const gerPriority = async () => {
            const result = await axioslogin.get('/compriority/select');
            const { success, data } = result.data;
            if (success === 1) {
                setpriority(data);
            } else {
                setpriority([]);
            }
        };
        gerPriority();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const selectedPriority = pririty.find((item) => item.cm_priority_slno === newValue);
        if (selectedPriority) {
            setmaxTime(selectedPriority.escalation_max);

        }
    };

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
                            transform: 'rotate(-180deg)',
                        },
                    },
                }}
            >
                {
                    pririty && pririty.map((val, index) => (
                        <Option key={index} value={val.cm_priority_slno}>
                            <Box sx={{ flex: 1, display: 'flex' }}>
                                <Box sx={{ flex: 1 }}>
                                    {val.cm_priority_desc}
                                </Box>
                                <Box sx={{ fontSize: 14 }}>
                                    {val.escalation_min !== 0 ?
                                        `(${val.escalation_min}min - ${val.escalation_max}min)` : null}
                                </Box>
                            </Box>
                        </Option>
                    ))
                }
            </Select>
        </Box>
    );
}

export default memo(ComPrioritySelect);
