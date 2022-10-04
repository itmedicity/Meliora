import { IconButton, Paper, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CardMaster from '../Components/CardMaster'
import TextFieldCustom from '../Components/TextFieldCustom';
import { editicon } from 'src/color/Color'
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import moment from 'moment'
import SelectDietType from '../CommonSelectCode/SelectDietType';
import ExtraOrderTable from './ExtraOrderTable';
import { axioslogin } from '../Axios/Axios';
import SelectItemName from 'src/views/CommonSelectCode/SelectItemName';
import { infoNotify, succesNotify, warningNotify } from '../Common/CommonCode';
import RmmasterMeliSelect from '../CommonSelectCode/RmmasterMeliSelect';
const ExtraOrder = () => {
    const history = useHistory();
    const [room, setRoom] = useState(0)
    const [diet, setDiet] = useState(0)
    const [dietold, setDietold] = useState(0)
    const [item, setItem] = useState(0)
    const [add, setAdd] = useState(0);
    const [itemName, setItemName] = useState("");
    const [food, setFood] = useState({
        item_slno: "",
        rate_hos: "",
        rate_cant: ""
    })
    const { rate_hos, rate_cant } = food
    const [order, setOrder] = useState({
        pt_no: "",
        process_date: moment(new Date).format('YYYY-MM-DD')
    })
    const { process_date } = order
    const [process, setProcess] = useState('')
    const updateOrder = useCallback((e) => {
        const value = e.target.value
        setOrder({ ...order, [e.target.name]: value })
    }, [order])

    const [patient, setPt] = useState('');
    const [pt, setPts] = useState(false);
    const updatePatient = async (e) => {
        setPt(e.target.value)
        if (patient.length <= 10) {
            setPts(true)
        }
    }
    const post = useMemo(() => {
        return {
            item_slno: item
        }
    }, [item])
    useEffect(() => {
        const getRate = async () => {
            const result = await axioslogin.post(`/extraorder/rate`, post);
            const { message, success, data } = result.data;
            if (success === 1) {
                const { item_slno, rate_hos, rate_cant } = data[0]
                const frmdata = {
                    item_slno: item_slno,
                    rate_hos: rate_hos,
                    rate_cant: rate_cant
                }
                setFood(frmdata)
            } else {
                infoNotify(message)
            }
        }
        if (item !== 0) {
            getRate();
        }
    }, [item, post])
    const frmreset = {
        item_slno: "",
        rate_hos: "",
        rate_cant: ""
    }
    const [newfood, setNewdata] = useState([]);
    const [sumCanteen, setCanteen] = useState(0);
    const [sumHosptial, setHospital] = useState(0);
    const addnew = () => {
        if (item !== 0) {
            setAdd(1)
            const newdata = {
                item_slno: item,
                type_slno: diet,
                rate_hos: rate_hos,
                rate_cant: rate_cant,
                item_name: itemName
            }
            setNewdata([...newfood, newdata])
            setCanteen(sumCanteen + rate_cant)
            setHospital(sumHosptial + rate_hos)
            setItem(0)
            setFood(frmreset)
        } else {
            warningNotify("Please Select Item")
        }
    }
    const postData = useMemo(() => {
        return {
            rm_code: room,
            process_date: process_date
        }
    }, [room, process_date])

    useEffect(() => {
        const getProcessno = async () => {
            const result = await axioslogin.post('/extraorder', postData);
            const { message, success, data } = result.data;
            if (success === 1) {
                const { diet_slno, proc_slno } = data[0]
                setProcess(proc_slno)
                setDiet(diet_slno)
                setDietold(diet_slno)
                succesNotify(message)
            }
            else if (success === 0) {
                setProcess("");
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        if (room !== 0 || pt === true) {
            getProcessno()
        }
    }, [room, postData, pt])
    const Insert = useMemo(() => {
        return {
            proc_slno: process,
            type_slno: diet !== 0 ? diet : dietold,
            rate_hos: sumHosptial,
            rate_cant: sumCanteen,
            is_extra_billed: 1
        }
    }, [process, sumHosptial, sumCanteen, diet, dietold])
    const reset = useCallback(() => {
        setRoom(0);
        setDiet(0);
        setProcess("");
        setNewdata([]);
    }, [])
    const submitDiettype = useCallback((e) => {
        e.preventDefault();
        /***    * insert function for use call back     */
        const InsertFunc = async (Insert) => {
            setAdd(0)
            if (process === '') {
                infoNotify("Please Choose the Room")
            } else {
                const result = await axioslogin.post('/extraorder/insert', Insert);
                const { success, insertId } = result.data;
                if (success === 1) {
                    const extraOrder = newfood && newfood.map((val) => {
                        return {
                            prod_slno: insertId,
                            item_slno: val.item_slno,
                            hos_rate: val.rate_hos,
                            cant_rate: val.rate_cant,
                            type_slno: val.type_slno,
                            extra_status: 1
                        }
                    })
                    const result = await axioslogin.post('/extraorder/insertextra', extraOrder);
                    const { message, success, } = result.data;
                    if (success === 1) {
                        succesNotify(message)
                        reset();
                    } else if (success === 0) {
                        infoNotify(message)
                    }
                    else {
                        infoNotify(message)
                    }
                }
            }
        }
        InsertFunc(Insert)
    }, [Insert, process, newfood, reset])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    const refreshWindow = useCallback(() => {
        const frmreset = {
            item_slno: "",
            rate_hos: "",
            rate_cant: ""
        }
        setRoom(0)
        setDiet(0)
        setItem(0)
        setFood(frmreset)
        setProcess("")
        setAdd(0)
        setNewdata([]);
        setCanteen(0);
        setHospital(0);
    }, [])
    return (
        <CardMaster
            title='Extra Order'
            close={backtoSetting}
            submit={submitDiettype}
            refresh={refreshWindow}
        >
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper square elevation={3} sx={{ p: 2 }} >
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            mt: 1
                        }} >
                            <Box sx={{
                                width: '100%',
                                mt: 0.8
                            }}>
                                <Typography   >Date</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                height: 15,
                                mb: 1
                            }}>
                                <TextFieldCustom
                                    type="date"
                                    size="sm"
                                    name="process_date"
                                    value={process_date}
                                    onchange={updateOrder}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            mt: 1
                        }}>
                            <Box sx={{
                                width: '100%',
                                pl: { xl: 1, md: 1 }
                            }}>
                                <Typography >Patient Id</Typography>
                            </Box>
                            <Box sx={{
                                height: 15,
                                mb: 2,
                                width: '100%',
                            }}>
                                <TextFieldCustom
                                    placeholder="Patient Id"
                                    type="text"
                                    size="sm"
                                    name="patient"
                                    value={patient}
                                    onchange={updatePatient}
                                />
                            </Box>
                        </Box>
                    </Box>
                    {/* 
                    2nd section */}
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            mt: 0.8
                        }} >
                            <Box sx={{
                                display: "flex",
                                width: '100%',
                            }}>
                                <Typography>Room No</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                mt: { xs: 0.8, sm: 0.8, md: 0.5, xl: 0.5 },
                            }}>
                                <RmmasterMeliSelect value={room} setValue={setRoom} />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                            mt: 0.5
                        }}>
                            <Box sx={{
                                width: '100%',
                                mb: 1.2,
                                pl: { xl: 1, md: 1 }
                            }}>
                                <Typography>Process No</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                            }}>
                                <TextFieldCustom
                                    placeholder="Process Slno"
                                    type="text"
                                    size="sm"
                                    name="em_no"
                                    value={process}
                                // disabled
                                />
                            </Box>
                        </Box>
                    </Box>
                    {/* 3rd section */}
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                        }}>
                            <Box sx={{
                                width: '100%',
                            }}>
                                <Typography>Diet Type</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                mt: { xs: 0.8, sm: 0.8, xl: 0.6, md: 0.6 }
                            }}>
                                <SelectDietType value={diet} setValue={setDiet} />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                        }}>
                            <Box sx={{
                                width: '100%',
                                pl: { xl: 1, md: 1 }
                            }}>
                                <Typography>Items</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                mt: 1
                            }}>
                                <SelectItemName value={item} setValue={setItem} setName={setItemName} />
                            </Box>
                        </Box>
                    </Box>
                    {/* 4th section */}
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                    }}>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                        }}>
                            <Box sx={{
                                width: '100%',
                            }}>
                                <Typography sx={{ mt: 0.4 }}>Hospital Rate</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                // mt: { xs: 0.8, sm: 0.8, md: 0.5, xl: 0.5 },
                                mt: { sm: 0.5, xs: 0.5, xl: 0, lg: 0.5, md: 0.2 }
                            }}>
                                <TextFieldCustom
                                    placeholder="Hospital Rate"
                                    type="text"
                                    size="sm"
                                    name="em_no"
                                    value={rate_hos}
                                />
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                        }}>
                            <Box sx={{
                                width: '100%',
                                pl: { xl: 1, md: 1 }
                            }}>
                                <Typography sx={{ mt: 0.4 }}>Canteen Rate</Typography>
                            </Box>
                            <Box sx={{
                                width: '100%',
                                mt: 0.5
                            }}>
                                <TextFieldCustom
                                    placeholder="Canteen Rate"
                                    type="text"
                                    size="sm"
                                    name="rate_cant"
                                    value={rate_cant}
                                />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                        mt: 1
                    }}>
                        <Box sx={{
                            width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                        }}>
                            <Box sx={{
                                width: '100%',
                            }}>
                                <IconButton sx={{ color: editicon, paddingY: 0.5 }} onClick={addnew}>
                                    < MdOutlineAddCircleOutline />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', }
                    }}
                    >   {
                            add === 1 ? <Fragment>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                }}>
                                    <Box sx={{
                                        width: '100%',
                                    }}>
                                        <Typography>Sum Hospital Rate</Typography>
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                    }}>
                                        <Typography>{sumHosptial}</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                }}>
                                    <Box sx={{
                                        width: '100%',
                                    }}>
                                        <Typography> Sum Canteen Rate</Typography>
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                    }}>
                                        <Typography>{sumCanteen}</Typography>
                                    </Box>
                                </Box>
                            </Fragment> : null
                        }
                    </Box>
                    <Box sx={{
                        mt: 1
                    }}>
                        {
                            add === 1 ? <ExtraOrderTable newfood={newfood} /> : null
                        }
                    </Box>
                </Paper>
            </Box>
        </CardMaster >
    )
}
export default ExtraOrder