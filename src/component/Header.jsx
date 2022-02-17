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
    setMiniBox(false)
  }

  const [width, setWidth] = React.useState(window.innerWidth);
  const [mini_box, setMiniBox] = React.useState(false);

  
  window.onresize = () => {
    setWidth(window.innerWidth);
  }

  if(width < 1024 && token && is_login){
    return(
      <React.Fragment>
        <HeaderWrap _width={width}>
          <Grid flex maxWidth='1200px' margin='0 auto'>
            <Grid self='center' width='max-content'>
              <Heading onClick={()=>{history.push('/')}} _width={width}>
                <Logo/>
              </Heading>
            </Grid>

            <Grid flex justify='flex-end' margin='0 20px 0 0'>
              {width >= 840 && (
                <>
                  <Grid flex width='max-content' margin='0 20px 0 0'>
                    <Grid height='max-content'>
                      <Image shape='circle' size='45px' src={`/static/${user_info?.userIcon}.jpg`}/>
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
                    text="로그아웃"
                    _onClick={logout}
                  />
                </>
              )} 
              {width < 840 && (
                <>
                  <Image shape='circle' size='45px' src={`/static/${user_info?.userIcon}.jpg`} 
                  _onClick={()=>{ mini_box ? setMiniBox(false) : setMiniBox(true)}}/>
                  <MiniBox mini={mini_box}>
                    <Text bold='800' size='15px' width='minibox'>{user_info?.nickname}</Text>
                    <Text bold='200' size='8px' space='0.03em' width='minibox'>{user_info?.email}</Text>
                    <Button width='4vw' height='30px' minWidth='100px' margin='10px auto 0' fz='12px' text="로그아웃" _onClick={logout} />
                  </MiniBox>
                </>
              )}
            </Grid>       
          </Grid>
        </HeaderWrap>
      </React.Fragment>
    )
  }

  if(width < 1024){
    return(
      <React.Fragment>
        <HeaderWrap _width={width}>
          <Grid flex maxWidth='1200px' margin='0 auto'>
            <Grid self='center' width='max-content'>
              <Heading onClick={()=>{history.push('/')}} _width={width}>
                <Logo/>
              </Heading>
            </Grid>

            <Grid flex justify='flex-end' margin='0 20px 0 0'>
              {width >= 840 && (
                <>
                  <Button width='6vw' height='40px' minWidth='113px' margin='0 10px 0 0' text="로그인" _onClick={() => { history.push("/login") }}/>
                  <Button width='6vw' height='40px' minWidth='113px' text="회원가입" _onClick={() => { history.push("/signup") }}/>
                </>
              )} 
              {width < 840 && (
                <>
                  <LoginIcon onClick={()=>{ mini_box ? setMiniBox(false) : setMiniBox(true)}}>
                    <svg viewBox="0 0 24 24">
                        <path d="M11.016 6.984l-1.406 1.406 2.578 2.625h-10.172v1.969h10.172l-2.578 2.625 1.406 1.406 4.969-5.016zM20.016 18.984h-8.016v2.016h8.016q0.797 0 1.383-0.586t0.586-1.43v-13.969q0-0.844-0.586-1.43t-1.383-0.586h-8.016v2.016h8.016v13.969z"></path>
                    </svg>
                  </LoginIcon>
                  <MiniBox mini={mini_box}>
                    <Button width='4vw' height='30px' minWidth='100px' margin='auto' fz='12px' text="로그인" _onClick={() => { history.push("/login"); setMiniBox(false);}}/>
                    <Button width='4vw' height='30px' minWidth='100px' margin='10px auto 0' fz='12px' text="회원가입" _onClick={() => { history.push("/signup"); setMiniBox(false);}}/>
                  </MiniBox>
                </>
              )}
            </Grid>       
          </Grid>
        </HeaderWrap>
      </React.Fragment>
    )
  }

  if(token && is_login){
    return(
      <React.Fragment>
      <HeaderWrap _width={width}>
        <Grid flex maxWidth='1200px' margin='0 auto'>
          <Grid ps>
            <Heading onClick={()=>{history.push('/')}} _width={width}>
              <Logo/>
            </Heading>
          </Grid>

          <Grid flex justify='flex-end' margin='0 20px 0 0'>
            <Grid flex width='max-content' margin='0 20px 0 0'>
              <Grid height='max-content'>
                <Image shape='circle' size='45px' src={`/static/${user_info.userIcon}.jpg`}/>
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
              bgc='#000'
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
  height: ${props => props._width >= 1024 ? '100px;' : '80px;'};
  z-index: 9999;
  border-bottom: 1px solid #aaa;
  background-color: #fff;
`;

const Heading = styled.h1`
  cursor: pointer;
  svg {
    margin-left: 20px;
    width: ${props => props._width >= 1024 ? '230px;' : '180px;'}
  }

  .cls-1 {
    fill: #092493;
  }
`
const MiniBox = styled.div`
  width: 20vw;
  min-width: 150px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  border : 1px solid #ddd;
  position: absolute;
  top: 70px;
  right: 5px;
  z-index: 9999;
  text-align: center;
  transform: ${props => props.mini? 'scaleY(1);' : 'scaleY(0);'};
  transition: 0.3s;
`

const LoginIcon = styled.button`
    border: 0;
    background-color: #000;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    padding: 3px 0 0 0;
    cursor: pointer;
    margin: 0;

    &:hover svg{
      fill: #666;
    }

    svg {
        margin-right: 3px;
        overflow: visible;
        width: 18px;
        height: 18px;
        fill: #fff;
        transition: 0.1s;

    }
`;

export default Header;
