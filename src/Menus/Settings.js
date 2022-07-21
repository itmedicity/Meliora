import React, { useState, useEffect } from 'react'
import { getMenuSlno } from 'src/views/Constant/Constant';
import { Link } from 'react-router-dom'
import {
    co_setting_one, co_setting_two, co_setting_three, cm_setting_one, cm_setting_two,
    userManagement_one, userManagement_two, userManagement_three, cm_setting_three
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
    const [userManagment_secOne, setUserManag_secOne] = useState();
    const [userManagment_secTwo, setUserManag_secTwo] = useState();
    const [userManagment_secThree, setUserManag_secThree] = useState();
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
            //User Rights 
            const user_setting_section_one = userManagement_one.filter(val => menuSlnoArray.includes(val.slno));
            setUserManag_secOne(user_setting_section_one)
            const user_setting_section_two = userManagement_two.filter(val => menuSlnoArray.includes(val.slno));
            setUserManag_secTwo(user_setting_section_two)
            const user_setting_section_three = userManagement_three.filter(val => menuSlnoArray.includes(val.slno));
            setUserManag_secThree(user_setting_section_three)
            setCount(1)
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
            <CardHeader title={"Request Master"}
                titleTypographyProps={{ variant: "subtitle1", color: titleTypography }}
                sx={{
                    backgroundColor: cardActionBgClr,
                    paddingY: 0.5,
                }} />
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
        </Card>
    )
}
export default Settings