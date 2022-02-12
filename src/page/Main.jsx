import React from 'react';
import styled from 'styled-components';
import Post from '../component/Post';
import UserList from '../component/UserList';

import { Grid } from '../elements';

const Main = () => {
    return (
        <>
            <Grid flex>
                <UserListWrap>
                    <UserList/>
                </UserListWrap>
                <Grid width='70%' margin= '120px 0 0 0'>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                    <Grid margin='0 0 50px 0'>
                        <Post/>
                    </Grid>
                   
                </Grid>
            </Grid>
        </>
    );
};

const UserListWrap = styled.div`
    width: 28%;
    position: sticky;
    top: 0;
    left: 0;
    align-self: flex-start;
    padding-top: 120px;


`

export default Main;