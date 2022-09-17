import { Box, IconButton, Paper } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';
import SelectItemmaster from '../CommonSelectCode/SelectItemmaster';
import SelectrmmasterOra from '../CommonSelectCode/SelectrmmasterOra';
import CardMaster from '../Components/CardMaster'
import TextFieldCustom from '../Components/TextFieldCustom';
import { editicon } from 'src/color/Color'
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment'
import SelectDietType from '../CommonSelectCode/SelectDietType';
import ExtraOrderTable from './ExtraOrderTable';
import { axioslogin } from '../Axios/Axios';
import { infoNotify, succesNotify } from '../Common/CommonCode';
const ExtraOrder = () => {
    const history = useHistory();
    const [room, setRoom] = useState(0)
    const [value, setValue] = useState(0)
    // const [date, setDate] = useState(moment(new Date).format('YYYY-MM-DD'))
    const [add, setAdd] = useState(0);
    const [order, setOrder] = useState({
        pt_no: "",
        process_date: moment(new Date).format('YYYY-MM-DD')
    })
    const { pt_no, process_date } = order
    const updateOrder = useCallback((e) => {
        const value = e.target.value
        setOrder({ ...order, [e.target.name]: value })
    }, [order])
    const addnew = useCallback(() => {
        setAdd(1)
    }, [])
    const postData = useMemo(() => {
        return {
            rm_code: room,
            pt_no: pt_no,
        }
    }, [pt_no, room])
    const Search = useCallback(() => {
        const searchdata = async (postData) => {
            const result = await axioslogin.post('/extraorder', postData);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                // setCount(count + 1);
                // setDepartment(formreset);
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        searchdata(postData)
    }, [postData])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (

        <CardMaster
            title='Extra Order'
            close={backtoSetting}
        >
            <Box sx={{ width: "100%", pl: 1, pt: 1, pr: 1, pb: 1 }}>
                <Paper square elevation={3} sx={{ pl: 1, pt: 1, pr: 1, pb: 1 }} >
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "15%", pr: 1 }}>
                            <SelectrmmasterOra value={room} setValue={setRoom} />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Patient Id"
                                type="text"
                                size="sm"
                                name="pt_no"
                                value={pt_no}
                                onchange={updateOrder}
                            />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                type="date"
                                size="sm"
                                name="process_date"
                                value={process_date}
                                onchange={updateOrder}
                            />
                        </Box>
                        <Box sx={{ width: "15%", pr: 1 }}>
                            <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={Search}>
                                < SearchIcon />
                            </IconButton>
                        </Box>
                        <Box sx={{ width: "50%", pr: 1 }}>
                            {
                                add === 1 ? <ExtraOrderTable /> : null
                            }
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "10%", pr: 1, mt: 0.5 }} >
                            <TextFieldCustom
                                placeholder="Process Slno"
                                type="text"
                                size="sm"
                                name="em_no"
                            />
                        </Box>
                        <Box sx={{ width: "15%", pr: 1, mt: 1.2 }}>
                            <SelectDietType value={value} setValue={setValue} />
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        pl: 1, pt: 0.5, pr: 1, pb: 0.5,
                        display: "flex",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                    }}>
                        <Box sx={{ width: "15%", pr: 1, mt: 0.8 }} >
                            <SelectItemmaster value={value} setValue={setValue} />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}  >
                            <TextFieldCustom
                                placeholder="Hospital Rate"
                                type="text"
                                size="sm"
                                name="em_no"
                            />
                        </Box>
                        <Box sx={{ width: "10%", pr: 1 }}>
                            <TextFieldCustom
                                placeholder="Canteen Rate"
                                type="text"
                                size="sm"
                                name="em_no"
                            />
                        </Box>
                        <Box sx={{ width: "15%", pr: 1 }}>
                            <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={addnew}>
                                < MdOutlineAddCircleOutline />
                            </IconButton>
                        </Box>
                        <Box >
                        </Box>
                    </Box>
                    <Box >
                    </Box>
                </Paper>
            </Box>
        </CardMaster>
    )
}
export default ExtraOrder