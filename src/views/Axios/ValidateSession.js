import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify } from 'src/views/Common/CommonCode';

const ValidateSession = () => {

    const history = useHistory();

    useEffect(() => {
        axioslogin.get('/user').then((response) => {
            if (response.data.status !== 200) {
                sessionStorage.clear();
                infoNotify('session timed out...Please Login');
                history.push('/')
            }
        })

    }, [history]);


    return (
        <div></div>
    )
}

export default ValidateSession