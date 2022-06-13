import React, { Fragment } from 'react'
import CardOne from '../Components/CardOne'
import CardThree from '../Components/CardThree'
import CardTwo from '../Components/CardTwo'

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
        </Fragment>
    )
}

export default Home