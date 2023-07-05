import React, { useEffect, useState } from 'react'
import { diet_one, diet_two, diet_three } from './ReportsMenu'
import { getMenuSlno } from '../views/Constant/Constant'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@mui/material'
import { titleTypography, cardActionBgClr } from 'src/color/Color';
import { cms_one } from './ReportsMenu'
const Reports = () => {
    const [diet_report_one, setdiet_report_one] = useState();
    const [diet_report_two, setdiet_report_two] = useState();
    const [diet_report_three, setdiet_report_three] = useState();
    const [cms, setcms_report_one] = useState();
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
            const cms_setting_section_one = cms_one.filter(val => menuSlnoArray.includes(val.slno));
            setcms_report_one(cms_setting_section_one)
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
                                cms && cms.map((val) => {
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
