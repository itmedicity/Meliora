import { createTheme, ThemeProvider } from '@mui/material';
import React, { Suspense, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Spinner from '../Components/Spinner';
import { useDispatch } from 'react-redux'
import { ActionTyps } from 'src/redux/constants/action.type';

const Protected = (props) => {
    const theme = createTheme({
        palette: {
            mode: 'light'
        }
    })
    const dispatch = useDispatch()
    let Component = props.cmp;
    let history = useHistory();
    const { FETCH_LOGIN } = ActionTyps;
    useEffect(() => {
        const loginDetl = sessionStorage.getItem('userDetl');
        const login = JSON.parse(loginDetl)
        if (!loginDetl) {
            history.push('/');
        } else {
            dispatch({ type: FETCH_LOGIN, payload: login })
        }
    }, [history, FETCH_LOGIN, dispatch]);

    return (
        <Suspense fallback={<Spinner />} >
            <ThemeProvider theme={theme} >
                <Component />
            </ThemeProvider>
        </Suspense>
    )
}

export default Protected