import React, { useEffect, useState } from 'react'
import {
    diet_one, diet_two, diet_three, cms_one, cms_two, cms_three, am_one, tm_one,
    crm_one, crm_two, crm_three
} from './ReportsMenu'
import { getMenuSlno } from '../views/Constant/Constant'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@mui/material'
import { titleTypography, cardActionBgClr } from 'src/color/Color';

const Reports = () => {
    const [diet_report_one, setdiet_report_one] = useState();
    const [diet_report_two, setdiet_report_two] = useState();
    const [diet_report_three, setdiet_report_three] = useState();
    const [cms_report_one, setcms_report_one] = useState();
    const [cms_report_two, setcms_report_two] = useState();
    const [cms_report_three, setcms_report_three] = useState();
    const [am_report_one, setam_report_one] = useState();
    const [tm_report_one, settm_report_one] = useState();
    const [crm_report_one, setcrm_report_one] = useState();
    const [crm_report_two, setcrm_report_two] = useState();
    const [crm_report_three, setcrm_report_three] = useState();
    const [dc_report_one, setdc_report_one] = useState();

    const [count, setCount] = useState(0)
    useEffect(() => {
        getMenuSlno().then((val) => {
            const menuSlnoArray = val[0].map((value) => {
                return value.menu_slno;
            })
            const Diet_report_one = diet_one.filter(val => menuSlnoArray.includes(val.slno));
            setdiet_report_one(Diet_report_one)
            const Diet_report_two = diet_two.filter(val => menuSlnoArray.includes(val.slno));
            setdiet_report_two(Diet_report_two)
            const Diet_report_three = diet_three.filter(val => menuSlnoArray.includes(val.slno));
            setdiet_report_three(Diet_report_three)

            //Complaint Management Report
            const Cms_report_one = cms_one.filter(val => menuSlnoArray.includes(val.slno));
            setcms_report_one(Cms_report_one)
            const Cms_report_two = cms_two.filter(val => menuSlnoArray.includes(val.slno));
            setcms_report_two(Cms_report_two)
            const Cms_report_three = cms_three.filter(val => menuSlnoArray.includes(val.slno));
            setcms_report_three(Cms_report_three)

            //Asset Management Report
            const am_report_one = am_one.filter(val => menuSlnoArray.includes(val.slno));
            setam_report_one(am_report_one)

            //Task Management Report
            const tm_report_one = tm_one.filter(val => menuSlnoArray.includes(val.slno));
            settm_report_one(tm_report_one)

            //Central Request Management Report
            const crm_report_one = crm_one.filter(val => menuSlnoArray.includes(val.slno));
            setcrm_report_one(crm_report_one)
            const crm_report_two = crm_two.filter(val => menuSlnoArray.includes(val.slno));
            setcrm_report_two(crm_report_two)
            const crm_report_three = crm_three.filter(val => menuSlnoArray.includes(val.slno));
            setcrm_report_three(crm_report_three)


            setCount(1)
        })
    }, [count])
    return (

        <Card>
            <CardHeader title={"Diet Report"}
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
                                diet_report_one && diet_report_one.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                diet_report_two && diet_report_two.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                diet_report_three && diet_report_three.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardHeader title={"Complaint Management Report"}
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
                                cms_report_one && cms_report_one.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                cms_report_two && cms_report_two.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                cms_report_three && cms_report_three.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardHeader title={"Asset Management Report"}
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
                                am_report_one && am_report_one.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardHeader title={"Task Management Report"}
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
                                tm_report_one && tm_report_one.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardHeader title={"Central Request Management Report"}
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
                                crm_report_one && crm_report_one.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                crm_report_two && crm_report_two.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                crm_report_three && crm_report_three.map((val) => {
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

export default Reports
