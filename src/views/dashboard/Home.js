import React, { Fragment } from 'react'
import CardOne from '../Components/CardOne'
import CardThree from '../Components/CardThree'
import CardTwo from '../Components/CardTwo'
import CommonReport from '../Components/CommonReport'
import CommonReportFormOne from '../Components/CommonReportFormOne'
import CusCard from '../Components/CusCard'
import CustomAgGridMenuSelection from '../Components/CustomAgGridMenuSelection'
import CustomMaterialTable from '../Components/CustomMaterialTable'

const Home = () => {
  return (
    <Fragment>
      {/* <CommonReport /> */}
      {/* <CommonReportFormOne /> */}
      <CusCard />
      {/* <div>
                <CustomAgGrid />
                // <CardOne />
                <CusCard />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CardTwo />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CardThree />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CustomMaterialTable />
            </div>
            <div style={{ paddingTop: 5 }}>
                <CustomAgGrid />
            </div> */}
    </Fragment>
  )
}

export default Home
