import React, { useState, useEffect } from 'react'
import { getMenuSlno } from 'src/views/Constant/Constant';
import { Link } from 'react-router-dom'
import {
    co_setting_one, co_setting_two, co_setting_three, cm_setting_one, cm_setting_two, cm_setting_three,
    crm_setting_one, crm_setting_two, crm_setting_three, userManagement_one, userManagement_two,
    userManagement_three, am_setting_one, am_setting_two, am_setting_three, rm_setting_one,
    rm_setting_two, rm_setting_three, it_setting_one, it_setting_two, it_setting_three,
    qi_setting_one, qi_setting_two, dc_setting_one, taskManagement_one,ams_one
} from './SettingsMenu';
import { Card, CardContent, CardHeader } from '@mui/material';
import { titleTypography, cardActionBgClr } from 'src/color/Color';

const Settings = () => {
    const [commonMast_secOne, setcommonMast_secOne] = useState();
    const [commonMast_secTwo, setcommonMast_secTwo] = useState();
    const [commonMast_secThree, setcommonMast_secThree] = useState();
    const [coMast_secOne, setcoMast_secOne] = useState();
    const [coMast_secTwo, setcoMast_secTwo] = useState();
    const [coMast_secThree, setcoMast_secThree] = useState();
    const [crmMast_secOne, setcrmMast_secOne] = useState();
    const [crmMast_secTwo, setcrmMast_secTwo] = useState();
    const [crmMast_secThree, setcrmMast_secThree] = useState();
    // const [taskMast_secOne, settaskMast_secOne] = useState();
    const [amMast_secOne, setamMast_secOne] = useState();
    const [amMast_secTwo, setamMast_secTwo] = useState();
    const [amMast_secThree, setamMast_secThree] = useState();
    const [rmMast_secOne, setrmMast_secOne] = useState();
    const [rmMast_secTwo, setrmMast_secTwo] = useState();
    const [rmMast_secThree, setrmMast_secThree] = useState();
    // const [dmMast_secOne, setdmMast_secOne] = useState();
    // const [dmMast_secTwo, setdmMast_secTwo] = useState();
    // const [dmMast_secThree, setdmMast_secThree] = useState();
    const [userManagment_secOne, setUserManag_secOne] = useState();
    const [userManagment_secTwo, setUserManag_secTwo] = useState();
    const [userManagment_secThree, setUserManag_secThree] = useState();
    // const [weMast_secOne, setweMast_secOne] = useState();
    // const [weMast_secTwo, setweMast_secTwo] = useState();
    // const [hallBooking_secOne, setHallBooking_secOne] = useState();
    const [itMast_secOne, setitMast_secOne] = useState();
    const [itMast_secTwo, setitMast_secTwo] = useState();
    const [itMast_secThree, setitMast_secThree] = useState();
    const [qiMast_secOne, setqiMast_secOne] = useState();
    const [qiMast_secTwo, setqiMast_secTwo] = useState();
    // const [qiMast_secThree, setqiMast_secThree] = useState();
    const [dcMast_secOne, setdcMast_secOne] = useState();
    const [taskManagment_secOne, setTaskManagment_secOne] = useState();
    const [ams_secone, setams_secOne] = useState()


    const [count, setCount] = useState(0)
    useEffect(() => {
        getMenuSlno().then((val) => {
            const menuSlnoArray = val[0].map((value) => {
                return value.menu_slno;
            })
            //Common Master Setting
            const setting_section_one = co_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setcommonMast_secOne(setting_section_one)
            const setting_section_two = co_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setcommonMast_secTwo(setting_section_two)
            const setting_section_three = co_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setcommonMast_secThree(setting_section_three)
            //Complaint Management Master
            const cm_setting_section_one = cm_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setcoMast_secOne(cm_setting_section_one)
            const cm_setting_section_two = cm_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setcoMast_secTwo(cm_setting_section_two)
            const cm_setting_section_three = cm_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setcoMast_secThree(cm_setting_section_three)

            //Request Management Master
            const crm_setting_section_one = crm_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setcrmMast_secOne(crm_setting_section_one)
            const crm_setting_section_two = crm_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setcrmMast_secTwo(crm_setting_section_two)
            const crm_setting_section_three = crm_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setcrmMast_secThree(crm_setting_section_three)


            // //Task Management Master
            // const task_setting_section_one = task_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            // settaskMast_secOne(task_setting_section_one)

            //Asset Management Master
            const am_setting_section_one = am_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setamMast_secOne(am_setting_section_one)
            const am_setting_section_two = am_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setamMast_secTwo(am_setting_section_two)
            const am_setting_section_three = am_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setamMast_secThree(am_setting_section_three)

            //Room Management Master
            const rm_setting_section_one = rm_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setrmMast_secOne(rm_setting_section_one)
            const rm_setting_section_two = rm_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setrmMast_secTwo(rm_setting_section_two)
            const rm_setting_section_three = rm_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setrmMast_secThree(rm_setting_section_three)

            // //Diet Management Master
            // const dm_setting_section_one = dm_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            // setdmMast_secOne(dm_setting_section_one)
            // const dm_setting_section_two = dm_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            // setdmMast_secTwo(dm_setting_section_two)
            // const dm_setting_section_three = dm_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            // setdmMast_secThree(dm_setting_section_three)

            // //WE Work
            // const we_setting_section_one = we_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            // setweMast_secOne(we_setting_section_one)
            // const we_setting_section_two = we_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            // setweMast_secTwo(we_setting_section_two)

            // //Hall Booking
            // const hall_setting_section_one = hall_booking_one.filter(val => menuSlnoArray.includes(val.slno));
            // setHallBooking_secOne(hall_setting_section_one)

            //IT Management
            const it_setting_section_one = it_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setitMast_secOne(it_setting_section_one)
            const it_setting_section_two = it_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setitMast_secTwo(it_setting_section_two)
            const it_setting_section_three = it_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setitMast_secThree(it_setting_section_three)

            //Quality Indicators
            const qi_setting_section_one = qi_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setqiMast_secOne(qi_setting_section_one)
            const qi_setting_section_two = qi_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setqiMast_secTwo(qi_setting_section_two)
            // const qi_setting_section_three = qi_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            // setqiMast_secThree(qi_setting_section_three)

            //Daily Census
            const dc_setting_section_one = dc_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setdcMast_secOne(dc_setting_section_one)


            //User Rights 
            const user_setting_section_one = userManagement_one.filter(val => menuSlnoArray.includes(val.slno));
            setUserManag_secOne(user_setting_section_one)
            const user_setting_section_two = userManagement_two.filter(val => menuSlnoArray.includes(val.slno));
            setUserManag_secTwo(user_setting_section_two)
            const user_setting_section_three = userManagement_three.filter(val => menuSlnoArray.includes(val.slno));
            setUserManag_secThree(user_setting_section_three)
            setCount(1)

            //TaskManagement
            const task_setting_section_one = taskManagement_one.filter(val => menuSlnoArray.includes(val.slno));
            setTaskManagment_secOne(task_setting_section_one)

            //AMS Master
            const ams_setting_section_one = ams_one.filter(val => menuSlnoArray.includes(val.slno));
            setams_secOne(ams_setting_section_one)

             

        })
    }, [count])

    return (
        <Card>
            <CardHeader title={"Common Master"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                commonMast_secOne && commonMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                commonMast_secTwo && commonMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                commonMast_secThree && commonMast_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardHeader title={"Compliant Master"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                coMast_secOne && coMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                coMast_secTwo && coMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                coMast_secThree && coMast_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
             <CardHeader title={"AMS "}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                ams_one && ams_one.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                              
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardHeader title={"CRF Master"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />

            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                crmMast_secOne && crmMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                crmMast_secTwo && crmMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                crmMast_secThree && crmMast_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardHeader title={"Asset Management"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                amMast_secOne && amMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                amMast_secTwo && amMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                amMast_secThree && amMast_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardHeader title={"Room Management"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                rmMast_secOne && rmMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                rmMast_secTwo && rmMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                rmMast_secThree && rmMast_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardHeader title={"Task Management"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                taskManagment_secOne && taskManagment_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>

                </div>
            </CardContent>

            <CardHeader title={"IT Management"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                itMast_secOne && itMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                itMast_secTwo && itMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                itMast_secThree && itMast_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardHeader title={"Quality Indicators"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                qiMast_secOne && qiMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                qiMast_secTwo && qiMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardHeader title={"Daily Census"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                dcMast_secOne && dcMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>


            <CardHeader title={"User Settings"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                userManagment_secOne && userManagment_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                userManagment_secTwo && userManagment_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                userManagment_secThree && userManagment_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>





            {/* <CardHeader title={"Task Management Master"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                taskMast_secOne && taskMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>

                </div>
            </CardContent> */}


            {/* <CardHeader title={"Diet Management"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                dmMast_secOne && dmMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                dmMast_secTwo && dmMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                dmMast_secThree && dmMast_secThree.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent> */}

            {/* <CardHeader title={"We Work"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                weMast_secOne && weMast_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                weMast_secTwo && weMast_secTwo.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardHeader title={"Hall Booking"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                hallBooking_secOne && hallBooking_secOne.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent> */}

        </Card>
    )
}
export default Settings