import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Image, Text } from '../elements';

const UserList = (props) => {
    return (
        <>
            <Grid height='450px'>
                <UserItem/>
                <UserItem/>
                <UserItem/>
                <UserItem/>
                <UserItem/>
            </Grid>
        </>
    );
};

export default UserList;


const UserItem = (props) => {
    return (
        <Grid flex padding='10px 10px' margin='0 0 10px 0' height='auto' >  
            <UserBox>
                <Grid>
                    <Image shape='circle' src={props.userIcon}/>
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
                <Button width='60px' height='30px' radius='15px' text='GitHub'/>
                <Button width='60px' height='30px' radius='15px' margin='0 0 0 10px' text='블로그'/>
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