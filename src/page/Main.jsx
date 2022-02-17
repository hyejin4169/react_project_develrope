import React from "react";
import styled from "styled-components";

import Post from "../component/Post";
import UserList from "../component/UserList";
import { Grid, Button } from "../elements";


import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as userActions } from "../redux/modules/user";
import Permit from './../shared/Permit';
import UserListAll from "../component/UserListAll";


const Main = (props) => {
  const dispatch = useDispatch();

  const { history } = (props);

  const token = localStorage.getItem('token');
  const is_login = useSelector(state => state.user.is_login);

  const post_list = useSelector((state) => state.post.list);
  const user_list = useSelector(state => state.user.user_list);

  const [user_length, setUserLength] = React.useState(false);

  const [width, setWidth] = React.useState(window.innerWidth);

  
  window.onresize = () => {
    setWidth(window.innerWidth);
  }

  // React.useEffect(() => {
  //   dispatch(postActions.getPostDB());
  // }, []);

  
  // React.useEffect(()=>{
  //   if(is_login, token){
  //       dispatch(userActions.getSixUsersDB());
  //   }
  // },[])
  
  const openUserList = () => {   
    dispatch(userActions.getAllUsersDB());
    setUserLength(true);
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
  }

  const closeUserList = () => {
    const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    setUserLength(false);
  }

  return (
    <>  
        <ModalWrap user_length={user_length} onClick={closeUserList}/>
          {user_length && (
            <UserListAll/>
            )}
      <Grid flex justify={ width >= 1024 ? 'space-between' : 'center'}>
            {(width >= 1024 )&& (
              <UserListWrap>
                {(token && is_login) && (
                  <>
                    <UserList is_login={is_login} token={token} user_list={user_list}/>
                    <Button text='더 많은 유저 보기' fz='16px' fw='500' width='200px' margin='0 auto' bgc='#092493' _onClick={openUserList}/>
                  </>
                )}
                {(!token || !is_login) && (
                  <LoginCome>
                    <p>지금 <span>로그인</span> 하시고</p>
                    <p>다른 유저의 블로그를 방문해보세요</p>
                    <Button margin='3vh auto 0' width='250px' _onClick={()=>{history.push('/login')}} bgc='#092493' fz='16px' fw='500' >로그인하러 가기</Button>
                  </LoginCome>
                )}
              </UserListWrap>    
            )}
        <Grid width={width>=1024 ? "70%" : '100%'} margin="120px 0 0 0" padding={width < 1024 && '0 16px'}>
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
        </Grid>
      </Grid>
      <Permit>
        {width < 1024 && (
          <UserIcon onClick={()=>{openUserList()}}>
            <svg viewBox="0 0 24 24">
                <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v2.016h-16.031v-2.016q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z"></path>
            </svg>
          </UserIcon>
        )}
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

const ModalWrap = styled.div`
  width: 100vw;
  height: ${props => props.user_length ? `100vh` : `0px`};
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000bf;
  z-index: 999999;
  transition: 0.3s;
`

const UserIcon = styled.button`
    border: 0;
    background-color: #092493;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 3px 0 0 0;
    cursor: pointer;
    margin: 0;
    position: fixed;
    right: 21.5px;
    bottom: 100px;

    /* &:hover svg{
      fill: #666;
    } */

    svg {
        overflow: visible;
        width: 20px;
        height: 20px;
        fill: #fff;
        transition: 0.1s;

    }
`;

export default Main;
