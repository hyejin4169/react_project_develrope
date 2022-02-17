import React from "react";
import { Grid, Text, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import Image from './../elements/Image';
import Logo from './Logo';

const Header = (props) => {
  const token = localStorage.getItem('token');
  const is_login = useSelector(state => state.user.is_login);
  const user_info = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userActions.outUser());
    history.replace('/')
  }

  if(token && is_login){
    return(
      <React.Fragment>
      <HeaderWrap>
        <Grid flex maxWidth='1200px' margin='0 auto'>
          <Grid>
            <Heading onClick={()=>{history.push('/')}}>
              <Logo/>
            </Heading>
          </Grid>

          <Grid flex justify='flex-end'>
            <Grid flex width='max-content' margin='0 20px 0 0 '>
              <Grid height='max-content'>
                <Image shape='circle' size='45px' src={user_info.userIcon}/>
              </Grid>
              <Grid flex direction='column' justify='center' align='flex-start' margin='0 0 0 5px'>
                <Text bold='800' size='20px'>{user_info.nickname}</Text>
                <Text bold='200' size='12px' space='0.03em'>{user_info.email}</Text>
              </Grid>
            </Grid>
            <Button
              width='6vw'
              height='40px'
              minWidth='113px'
              bgc='#092493'
              text="로그아웃"
              _onClick={logout}
            />
          </Grid>        
        </Grid>
      </HeaderWrap>
    </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <HeaderWrap>
        <Grid flex maxWidth='1200px' margin='0 auto'>
          <Grid>
            <Heading onClick={()=>{history.push('/')}}>
              <Logo/>
            </Heading>
          </Grid>

          <Grid flex justify='flex-end'>
            <Button
              width='6vw'
              height='40px'
              minWidth='113px'
              margin='0 10px 0 0'
              text="로그인"
              _onClick={() => {
                history.push("/login");
              }}
            ></Button>
            <Button
              width='6vw'
              height='40px'
              minWidth='113px'
              text="회원가입"
              _onClick={() => {
                history.push("/signup");
              }}
            ></Button>
          </Grid>        
        </Grid>
      </HeaderWrap>
    </React.Fragment>
  );
};

const HeaderWrap = styled.div` 
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 9999;
  border-bottom: 1px solid #aaa;
  background-color: #fff;
`;

const Heading = styled.h1`
  cursor: pointer;
  svg {
    margin-left: 20px;
    width: 230px;
  }

  .cls-1 {
    fill: #092493;
  }
`

export default Header;
