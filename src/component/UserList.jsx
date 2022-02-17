import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Image, Text } from '../elements';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserList = (props) => {

    const user_list = props.user_list;
    const user_list_all = props.user_list_all;

    return (
        <>
        {user_list_all ? (
            <UserListInner height='450px' overflow='hidden'>
                {user_list_all?.map(a=>{
                    return(
                        <UserItem key={a._id} {...a}/> 
                    )
                })}
            </UserListInner>
        ) : (
            <Grid height='450px'>
                {user_list?.map(a=>{
                    return(
                        <UserItem key={a._id} {...a}/> 
                    )
                })}
            </Grid>
        ) }
        </>
    );
};

const UserListInner = styled.div`
    width: 100%;
    height: 90%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #092493; 
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: #eee; 
        border-radius: 4px;
    }
`

export default UserList;


const UserItem = (props) => {
    const git_url = (props.git.includes('http://') || props.git.includes('https://') ) ? props.git : `http://${props.git}`
    const blog_url = (props.blog.includes('http://') || props.blog.includes('https://') ) ? props.blog : `http://${props.blog}`
    return (
        <Grid flex padding='10px 10px' margin='0 0 10px 0' height='auto' >  
            <UserBox>
                <Grid>
                    <Image shape='circle' src={`/static/${props.userIcon}.jpg`}/>
                </Grid>
                <div>
                    <Text bold='700' size='16px'>
                        {props.nickname}
                    </Text>
                    <Text bold='300' size='12px' space='0.03em'>
                        {props.email}
                    </Text>
                </div>
            </UserBox>
            <Grid flex justify='flex-end'>
                <UserButton onClick={() => window.open(git_url, '_blank')} > 
                    <svg viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </UserButton>
                <UserButton onClick={() => window.open(blog_url, '_blank')} > 
                <svg viewBox="0 0 162.2 133.35">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <path d="M34.31,49.36a6.27,6.27,0,0,0-4.64,2,6.83,6.83,0,0,0,0,9.52,6.27,6.27,0,0,0,4.64,2,6.43,6.43,0,0,0,4.72-2,6.74,6.74,0,0,0,0-9.52A6.43,6.43,0,0,0,34.31,49.36Z"/>
                        <path d="M90.44,49.3a6.25,6.25,0,0,0-4.64,2,6.83,6.83,0,0,0,0,9.52,6.26,6.26,0,0,0,4.64,2,6.74,6.74,0,0,0,4.72-11.49A6.43,6.43,0,0,0,90.44,49.3Z"/>
                        <path d="M127.87,49.36a6.25,6.25,0,0,0-4.64,2,6.83,6.83,0,0,0,0,9.52,6.25,6.25,0,0,0,4.64,2,6.73,6.73,0,0,0,4.72-11.48A6.43,6.43,0,0,0,127.87,49.36Z"/>
                        <path d="M144.51,0H17.68A17.74,17.74,0,0,0,0,17.68V89.41A17.74,17.74,0,0,0,17.68,107.1H67.49s9.61,26.25,13.12,26.25S94.52,107.1,94.52,107.1h50A17.74,17.74,0,0,0,162.2,89.41V17.68A17.74,17.74,0,0,0,144.51,0ZM47.14,66.22c-2.5,2.83-6.36,4-10.56,4A13.76,13.76,0,0,1,28,67.54h-.12v2H18.32V28h9.53V43.91H28c2.57-2.21,6-2.95,10-3.08,3.45-.12,7,2,9.19,4.53A16.61,16.61,0,0,1,50.9,56,13.61,13.61,0,0,1,47.14,66.22Zm20.44,3.65H57.87V44.17c0-5.93-4.69-6.71-4.69-6.71V27.17S66.79,28,67.58,44.5ZM105.69,62a15.29,15.29,0,0,1-3.57,5,16.55,16.55,0,0,1-5.32,3.31,17.54,17.54,0,0,1-6.35,1.16A17,17,0,0,1,78.88,67a15.9,15.9,0,0,1-3.65-5,14.57,14.57,0,0,1,0-11.72,15.9,15.9,0,0,1,3.65-5,16.89,16.89,0,0,1,11.57-4.47,17.53,17.53,0,0,1,6.35,1.15,16.57,16.57,0,0,1,5.32,3.32,15.15,15.15,0,0,1,3.57,5,15.06,15.06,0,0,1,0,11.83Zm38.18,4.13c0,7.29-1.38,11.74-4.63,14.83-3.87,3.67-9.38,3.93-14,3.27V76.68c3.87.38,9.2-2.16,9.19-7.18V67.56h-.12c-2.17,3-5.34,4.09-9.56,4.09a12.25,12.25,0,0,1-9.59-4.13q-3.45-4-3.44-10.81,0-7.6,3.83-12.07a13.14,13.14,0,0,1,10.37-4.36c3.74,0,6.09.9,8.39,3h.12V41h9.46Z"/>
                    </g>
                </svg>
                </UserButton>
            </Grid>
        </Grid>
    );
};

UserItem.defaultProps = {
    userIcon: 'https://cdn.imweb.me/upload/S20200903356594b8dc821/122e89b0892d2.jpg',
    nickname: '디벨로퍼',
    email:'aaaaa@naver.com',
}

const UserBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > div {
        width: max-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 4px;
    }
   
`

const UserButton = styled.button`
    border: 0;
    background-color: transparent;
    border-radius: 0;
    width: max-content;
    padding: 3px 0 0 0;
    cursor: pointer;
    
    &:last-of-type{
        margin: 6px 0 0 15px;
    }

    svg {
        overflow: visible;
        width: 22px;
        height: 22px;
        fill: #bbb;
        transition: 0.1s;

        &:hover{
            fill: #666;
        }
    }

`
