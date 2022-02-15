import React from 'react';
import { useSelector } from 'react-redux';

const Permit = (props) => {
    const token = localStorage.getItem('token');
    const is_login = useSelector(state => state.user.is_login);

    if(token && is_login){
        return(
            <>
                {props.children}
            </>
        )
    }
    return (null)
};

export default Permit;