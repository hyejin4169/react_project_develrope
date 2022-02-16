import React from 'react';
import styled from 'styled-components';
import UserList from './UserList';
import { useSelector } from 'react-redux';

const UserListAll = (props) => {

    const user_list_all = useSelector(state => state.user.user_list_all);
    console.log(user_list_all);

    return (
        <>
            <ListModal>
                <UserList user_list_all={user_list_all}/>
            </ListModal>
        </>
    );
};

const ListModal = styled.div`
    --width: ${window.innerWidth < 500 ? '100%' : '500px'};
    --height: ${window.innerHeight < 700 ? '100%' : '700px'};
    width: var(--width);
    height: var(--height);
    background-color: #fff;
    position: fixed;
    top: calc(50% - var(--height)/2);
    left: calc(50% - var(--width)/2);
    z-index: 99999999;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 60px;

    opacity: 0;
    transform: translateY(20px);
    animation-name: jjahn;
    animation-delay: 0.2s;
    animation-duration: 0.8s;
    animation-fill-mode: forwards;


    @keyframes jjahn {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }

        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`

export default UserListAll;