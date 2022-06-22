import React, { Fragment } from 'react'
import CardOne from '../Components/CardOne'
import CardThree from '../Components/CardThree'
import CardTwo from '../Components/CardTwo'
import CustomMaterialTable from '../Components/CustomMaterialTable';

const Home = () => {
    return (
        <Fragment>
            <div>
                <CardOne />
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
        </Fragment>
    )
}

export default Home