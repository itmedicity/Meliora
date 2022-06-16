import React, { useState, useEffect } from 'react'
import { getMenuSlno } from 'src/views/Constant/Constrant';
import { Link } from 'react-router-dom'
import { py_setting_one, py_setting_two, py_setting_three } from './SettingsMenu';


const Settings = () => {
    const [pyrol_secOne, setpyrol_secOne] = useState();
    const [pyrol_secTwo, setpyrol_secTwo] = useState();
    const [pyrol_secThree, setpyrol_secThree] = useState();
    // const [user_secOne, setuser_secOne] = useState();
    const [count, setCount] = useState(0)

    useEffect(() => {
        getMenuSlno().then((val) => {
            const menuSlnoArray = val.map((value) => {
                return value.menu_slno;
            })
            const setting_section_one = py_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setpyrol_secOne(setting_section_one)
            const setting_section_two = py_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setpyrol_secTwo(setting_section_two)
            const setting_section_three = py_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setpyrol_secThree(setting_section_three)
            // const setting_section_usermngt = userManagement_one.filter(val => menuSlnoArray.includes(val.slno));
            // setuser_secOne(setting_section_usermngt)
            setCount(1)
        })
    }, [count])
    return (

        <div>
            <div className="card"  >
                {/* <CustomCardHeader title={"Card One"} /> */}

                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h6 >Common Master</h6>
                </div>
                <div className="card-body">
                    <div className="row" >
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    pyrol_secOne && pyrol_secOne.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    pyrol_secTwo && pyrol_secTwo.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    pyrol_secThree && pyrol_secThree.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card"  >


                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h6 >CMS Master</h6>
                </div>
            </div>
            <div className="card"  >


                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h6 >User Management</h6>
                </div>
            </div>
        </div>

    )
}

export default Settings