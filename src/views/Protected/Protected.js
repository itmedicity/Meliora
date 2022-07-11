import { createTheme, ThemeProvider } from '@mui/material';
import React, { Suspense, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Spinner from '../Components/Spinner';

const Protected = (props) => {

    const theme = createTheme({
        palette: {
            mode: 'light'
        }
    })

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
        <Suspense fallback={<Spinner />} >
            <ThemeProvider theme={theme} >
                <Component />
            </ThemeProvider>
        </Suspense>
    )
}

export default Protected