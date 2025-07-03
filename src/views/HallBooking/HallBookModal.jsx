import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
// import { ToastContainer } from 'react-toastify'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextFieldCustom from '../Components/TextFieldCustom';
import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CustomeToolTip from '../Components/CustomeToolTip';
import DepartmentSelect from '../CommonSelectCode/DepartmentSelect';
// import { format } from 'date-fns'
import moment from 'moment'
import { axioslogin } from '../Axios/Axios';
import { infoNotify, succesNotify } from '../Common/CommonCode';
import { useSelector } from 'react-redux';
import CusCheckBox from '../Components/CusCheckBox';
import HallMasterSelect from '../CommonSelectCode/HallMasterSelect';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const HallBookModal = ({ open, setOpen, count, setCount, setModal }) => {
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    const [dept, setDept] = useState(0);
    const [hall, sethall] = useState(0)
    const [hallbooking, setBooking] = useState({
        h_book_event: "",
        h_book_attendees: '',
        h_booking_reason: '',
        h_book_startdatetime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        h_book_enddatetime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
        h_book_contno: '',
        h_book_email: '',


    })
    const { h_book_event, h_book_attendees, h_booking_reason, h_book_startdatetime, h_book_enddatetime, h_book_contno, h_book_email } = hallbooking
    const updateHallbooking = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setBooking({ ...hallbooking, [e.target.name]: value })
    }, [hallbooking])

    //checkbox for catering
    const [catering, setCatering] = useState({
        tea: false,
        snacks: false,
        breakfast: false,
        lunch: false,
        dinner: false
    })
    const { tea, snacks, breakfast, lunch, dinner } = catering
    //checkbox for items
    const [items, setItems] = useState({
        mikeset: false,
        ac: false,
        projector: false,
        podium: false,
        dias: false,
        conferencetable: false
    })
    const { mikeset, ac, projector, podium, dias, conferencetable } = items;

    const hallitem = useMemo(() => {
        return {
            mikeset: mikeset === true ? 1 : 0,
            ac: ac === true ? 2 : 0,
            projector: projector === true ? 3 : 0,
            podium: podium === true ? 4 : 0,
            dias: dias === true ? 5 : 0,
            conferencetable: conferencetable === true ? 6 : 0
        }
    }, [mikeset, ac, projector, podium, dias, conferencetable])

    const updateCatering = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setCatering({ ...catering, [e.target.name]: value })
    }, [catering])

    const updateItems = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItems({ ...items, [e.target.name]: value })
    }, [items])

    const cateringFoods = useMemo(() => {
        return {
            tea: tea === true ? 1 : 0,
            snacks: snacks === true ? 2 : 0,
            breakfast: breakfast === true ? 3 : 0,
            lunch: lunch === true ? 4 : 0,
            dinner: dinner === true ? 5 : 0
        }
    }, [tea, snacks, breakfast, lunch, dinner])

    const postData = useMemo(() => {
        return {
            h_book_event: h_book_event,
            h_book_attendees: h_book_attendees,
            h_booking_reason: h_booking_reason,
            h_book_startdatetime: moment(h_book_startdatetime).format('YYYY-MM-DD hh:mm:ss'),
            h_book_enddatetime: moment(h_book_enddatetime).format('YYYY-MM-DD hh:mm:ss'),
            h_book_contno: h_book_contno,
            h_book_email: h_book_email,
            h_book_dept: dept,
            h_book_hall: hall,
            h_book_hall_items: hallitem,
            h_book_catering: cateringFoods,
            create_user: id
        }
    }, [h_book_event, h_book_attendees, h_booking_reason, h_book_startdatetime, h_book_enddatetime, h_book_contno, h_book_email, dept, id, cateringFoods, hallitem, hall])
    const resetForm = useMemo(() => {
        return {
            h_book_event: "",
            h_book_attendees: '',
            h_booking_reason: '',
            h_book_startdatetime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            h_book_enddatetime: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
            h_book_contno: '',
            h_book_email: ''
        }
    }, [])

    const resetCatering = useMemo(() => {
        return {
            tea: false,
            snacks: false,
            breakfast: false,
            lunch: false,
            dinner: false
        }
    }, [])

    const resetItem = useMemo(() => {
        return {
            mikeset: false,
            ac: false,
            projector: false,
            podium: false,
            dias: false,
            conferencetable: false
        }
    }, [])

    const reset = useCallback(() => {
        setOpen(false);
        setModal(0);
        setDept(0);
        sethall(0)
        setCatering(resetCatering);
        setItems(resetItem);
    }, [setOpen, setModal, resetCatering, resetItem])

    const EventSubmit = useCallback((e) => {
        e.preventDefault();
        const EventSubmit = async (postData) => {
            const result = await axioslogin.post('/hallBooking', postData)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message);
                setCount(count + 1);
                setBooking(resetForm);
                reset();
            } else {
                infoNotify(message)
            }
        }
        if (dept !== 0) {
            EventSubmit(postData)
        } else {
            infoNotify("Please Select Department")
        }
    }, [postData, count, dept, resetForm, setCount, reset])
    return (
        <Fragment>
            {/* <ToastContainer /> */}
            <Dialog
                open={open}
                onClose={reset}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-descriptiona"
            >
                < DialogContent id="alert-dialog-slide-descriptiona"
                    sx={{
                        width: 530,
                        height: 520
                    }}
                >    < DialogContentText id="alert-dialog-slide-descriptiona">
                        Event Booking
                    </DialogContentText>
                    <Box sx={{ width: "100%", mt: 0.5 }}>
                        <Paper square elevation={3} sx={{ p: 1 }}>
                            <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }}>Programme Summary</Typography>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 0.5,
                                mt: 1
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: '100%'
                                    // width: { xs: '50%', sm: '50%', md: '100%', lg: '100%', xl: '100%', },
                                }} >
                                    <TextFieldCustom
                                        placeholder="Event Name"
                                        type="text"
                                        size="sm"
                                        name="h_book_event"
                                        value={h_book_event}
                                        onchange={updateHallbooking}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: '100%',
                                p: 0.5,

                            }}>
                                <TextFieldCustom
                                    placeholder="No.of attendees"
                                    type="text"
                                    size="sm"
                                    name="h_book_attendees"
                                    value={h_book_attendees}
                                    onchange={updateHallbooking}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                width: '100%',
                                p: 0.5

                            }}>
                                <TextFieldCustom
                                    placeholder="Reason"
                                    type="text"
                                    size="sm"
                                    name="h_booking_reason"
                                    value={h_booking_reason}
                                    onchange={updateHallbooking}
                                />
                            </Box>




                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 0.5,
                                // mt: 1
                            }}>
                                <CustomeToolTip title="Start Date Time">
                                    <Box sx={{ width: '100%' }}>
                                        <TextFieldCustom
                                            placeholder="Start Date Time"
                                            type="datetime-local"
                                            size="sm"
                                            name="h_book_startdatetime"
                                            value={h_book_startdatetime}
                                            onchange={updateHallbooking}
                                        />
                                    </Box>
                                </CustomeToolTip>
                                <CustomeToolTip title="End Date Time">
                                    <Box sx={{ width: '100%', ml: 1 }}  >
                                        <TextFieldCustom
                                            placeholder="End Date Time"
                                            type="datetime-local"
                                            size="sm"
                                            name="h_book_enddatetime"
                                            value={h_book_enddatetime}
                                            onchange={updateHallbooking}
                                        />
                                    </Box>
                                </CustomeToolTip>
                            </Box>
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                                p: 0.5,
                                // mt: 1
                            }}>
                                <Box sx={{ width: "100%" }}>
                                    <TextFieldCustom
                                        placeholder="Contact Number"
                                        type="text"
                                        size="sm"
                                        name="h_book_contno"
                                        value={h_book_contno}
                                        onchange={updateHallbooking}
                                    />
                                </Box>
                                <Box sx={{ width: "100%", ml: 1 }} >
                                    <TextFieldCustom
                                        placeholder="e-mail"
                                        type="email"
                                        size="sm"
                                        name="h_book_email"
                                        value={h_book_email}
                                        onchange={updateHallbooking}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ width: "100%", mt: 1, p: 0.5 }}>
                                <DepartmentSelect value={dept} setValue={setDept} />
                            </Box>
                            <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }}> Hall Selection</Typography>
                            </Box>

                            <Box sx={{ width: "100%", mt: 1, p: 0.5 }}>
                                <HallMasterSelect value={hall} setValue={sethall} />

                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }}>
                                <Box sx={{ width: "30%", p: 0.5, mt: 0.5 }}>
                                    <CusCheckBox
                                        label="Mike and Set"
                                        color="primary"
                                        size="md"
                                        name="mikeset"
                                        value={mikeset}
                                        onCheked={updateItems}
                                        checked={mikeset}
                                    />
                                </Box>
                                <Box sx={{ width: "20%", p: 0.5, mt: 0.5 }}>
                                    <CusCheckBox
                                        label="Ac"
                                        color="primary"
                                        size="md"
                                        name="ac"
                                        value={ac}
                                        onCheked={updateItems}
                                        checked={ac}
                                    />
                                </Box>
                                <Box sx={{ width: "30%", p: 0.5, mt: 0.5 }}>
                                    <CusCheckBox
                                        label="Projector"
                                        color="primary"
                                        size="md"
                                        name="projector"
                                        value={projector}
                                        onCheked={updateItems}
                                        checked={projector}
                                    />
                                </Box>
                                <Box sx={{ width: "20%", p: 0.5, mt: 0.5 }}>
                                    <CusCheckBox
                                        label="Podium"
                                        color="primary"
                                        size="md"
                                        name="podium"
                                        value={podium}
                                        onCheked={updateItems}
                                        checked={podium}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", p: 0.5, mt: 0.5, width: "100%" }}>
                                <Box sx={{ width: "30%" }}>
                                    <CusCheckBox
                                        label="Dias"
                                        color="primary"
                                        size="md"
                                        name="dias"
                                        value={dias}
                                        onCheked={updateItems}
                                        checked={dias}
                                    />
                                </Box>
                                <Box sx={{ width: "40%" }}>
                                    <CusCheckBox
                                        label="Conference table"
                                        color="primary"
                                        size="md"
                                        name="conferencetable"
                                        value={conferencetable}
                                        onCheked={updateItems}
                                        checked={conferencetable}
                                    />
                                </Box>


                            </Box>
                            <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                                <Typography sx={{ fontStyle: "oblique", fontWeight: 500, color: '#94B7FC' }}> Catering</Typography>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%", p: 0.5, }}>
                                <Box sx={{ width: "20%" }}>
                                    <CusCheckBox
                                        label="Tea"
                                        color="primary"
                                        size="md"
                                        name="tea"
                                        value={tea}
                                        onCheked={updateCatering}
                                        checked={tea}
                                    />
                                </Box>
                                <Box sx={{ width: "20%" }}>
                                    <CusCheckBox
                                        label="Snack"
                                        color="primary"
                                        size="md"
                                        name="snacks"
                                        value={snacks}
                                        onCheked={updateCatering}
                                        checked={snacks}
                                    />
                                </Box>
                                <Box sx={{ width: "25%" }}>
                                    <CusCheckBox
                                        label="BreakFast"
                                        color="primary"
                                        size="md"
                                        name="breakfast"
                                        value={breakfast}
                                        onCheked={updateCatering}
                                        checked={breakfast}
                                    />
                                </Box>
                                <Box sx={{ width: "20%" }}>
                                    <CusCheckBox
                                        label="Lunch"
                                        color="primary"
                                        size="md"
                                        name="lunch"
                                        value={lunch}
                                        onCheked={updateCatering}
                                        checked={lunch}
                                    />
                                </Box>
                                <Box sx={{ width: "20%" }}>
                                    <CusCheckBox
                                        label="Dinner"
                                        color="primary"
                                        size="md"
                                        name="dinner"
                                        value={dinner}
                                        onCheked={updateCatering}
                                        checked={dinner}
                                    />
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary"
                        onClick={EventSubmit}
                    >Save</Button>
                    <Button color="secondary"
                        onClick={reset}
                    >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default memo(HallBookModal)