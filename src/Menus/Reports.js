import React, { useEffect, useState } from 'react'
import { diet_report_one } from './ReportsMenu'
import { getMenuSlno } from '../views/Constant/Constant'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@mui/material'
import { titleTypography, cardActionBgClr } from 'src/color/Color';
const Reports = () => {
    const [report_one, setreport_one] = useState();
    const [count, setCount] = useState(0)
    useEffect(() => {
        getMenuSlno().then((val) => {
            const menuSlnoArray = val[0].map((value) => {
                return value.menu_slno;
            })
            const Diet_report_one = diet_report_one.filter(val => menuSlnoArray.includes(val.slno));
            setreport_one(Diet_report_one)
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
                                report_one && report_one.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>

        // <Fragment>
        //     <div className="card"  >
        //         <div className="card-header bg-dark pb-0 border border-secondary text-white" >
        //             <h5 >Employee Record Reports</h5>
        //         </div>
        //         <div className="card-body">
        //             <div className="row" >
        //                 <div className="col-4">
        //                     <ul className="list-group list-group-flush">
        //                         {
        //                             report_one && report_one.map((val) => {
        //                                 return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
        //                             })
        //                         }
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // </Fragment>
    )
}

export default Reports
