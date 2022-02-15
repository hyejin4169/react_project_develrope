import React from "react";
import { Text, Input, Grid, Button } from "../elements"

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
// import { history } from "../redux/configureStore";
// import { emailCheck } from "../shared/common";

const Login = (props) => {

  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  }

  const changePwd = (e) => {
    setPwd(e.target.value);
  }

  const logIn = () => {
    dispatch(userActions.loginDB(email,pwd));
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          로그인
        </Text>

        <Grid padding="16px 0px">
        <Input
          label="이메일"
          placeholder="이메일을 입력해주세요."
          _onChange={changeEmail}
        />
        </Grid>

        <Grid padding="16px 0px">
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요."
          type="password"
          _onChange={changePwd}
        />
      </Grid>

      <Grid center><Button text="로그인하기" _onClick={logIn}></Button></Grid>
      
      {/* { _onClick={() => } history.push('/'); console.log("로그인!"); login();}}> */}

      </Grid>
    </React.Fragment>
  );
};

export default Login;

