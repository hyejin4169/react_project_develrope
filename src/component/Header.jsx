import React from "react";
import { Grid, Text, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
// import { apiKey } from "../shared/firebase";

// import NotiBadge from "./NotiBadge";
import HomeIcon from "@material-ui/icons/Home";
import styled from "styled-components";

const Header = (props) => {
  const token = localStorage.getItem('token');
  const is_login = useSelector(state => state.user.is_login);
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
            <HomeIcon
              fontSize="large"
              margin="0px"
              // size="25px"
              cursor="pointer"
              onClick={() => {
                history.push('/')
              }}
            />
          </Grid>

          <Grid flex>
            <Button
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
            <HomeIcon
              fontSize="large"
              margin="0px"
              // size="25px"
              cursor="pointer"
              onClick={() => {
                history.push('/')
              }}
            />
          </Grid>

          <Grid flex>
            <Button
              text="로그인"
              _onClick={() => {
                history.push("/login");
              }}
            ></Button>
            <Button
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
`

export default Header;
