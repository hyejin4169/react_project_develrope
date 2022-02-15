import React from "react";
import styled from "styled-components";

import Post from "../component/Post";
import UserList from "../component/UserList";
import { Grid, Button } from "../elements";


import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Permit from './../shared/Permit';


const Main = (props) => {
  const dispatch = useDispatch();

  const { history } = (props);

  const token = localStorage.getItem('token');
  const is_login = useSelector(state => state.user.is_login);

  const post_list = useSelector((state) => state.post.list);

    React.useEffect(() => {
      dispatch(postActions.getPostDB());
    }, []);

  return (
    <>
      <Grid flex>
        <UserListWrap>
          {(token && is_login) && (
            <UserList />
          )}
          {(!token || !is_login) && (
            <LoginCome>
              <p>지금 <span>로그인</span> 하시고</p>
              <p>다른 유저의 블로그를 방문해보세요</p>
              <Button margin='3vh auto 0' width='250px' _onClick={()=>{history.push('/')}}>로그인</Button>
            </LoginCome>
          )}
        </UserListWrap>
        <Grid width="70%" margin="120px 0 0 0">
          {post_list?.map((p) => {
            return (
              <Grid
                key={p.postId}
                margin="0 0 50px 0"
                _onClick={() => {
                  history.push(`/detail/${p.postId}`);
                }}
              >
                <Post {...p}/>
              </Grid>
            );
          })}
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
        </Grid>
      </Grid>
      <Permit>
        <Button float_btn _onClick={() => {history.push("/write");}}></Button>
      </Permit>
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
`;

const LoginCome = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  line-height: 80%;
  padding: 3vh 0;

    p:first-of-type {
      span {
        font-weight: 800;
      }
    }
`

export default Main;
