import { CircularProgress } from '@mui/material';
import React, { Suspense, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import BackDrop from '../Components/BackDrop';
import Spinner from '../Components/Spinner';

const Protected = (props) => {

    let Component = props.cmp;
    let history = useHistory();
    useEffect(() => {
        const loginDetl = sessionStorage.getItem('userDetl');
        // const login = JSON.parse(loginDetl)
        if (!loginDetl) {
            history.push('/');
        }
    }, [history]);
    return (
        <div style={{ backgroundColor: "#e0f2f1", height: "100vh" }}  >
            <Suspense fallback={<Spinner />} >
                <Component />
            </Suspense>
        </div>
    )
}

export default Protected