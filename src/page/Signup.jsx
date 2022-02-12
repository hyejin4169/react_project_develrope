import React from "react";
import { Text, Input, Grid, Button, } from "../elements";
import Radio from '../component/Radio';

// import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";

const Signup = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px" flex align='flex-end'>
          <Input label="이메일" placeholder="이메일을 입력해주세요."></Input>
          <Button width='100px' height= '45px' margin= '0 0 0 10px'>중복확인</Button>
        </Grid>

        <Grid padding="16px 0px" flex>
          <Input label="닉네임" placeholder="닉네임을 입력해주세요."></Input>
          <Button width='100px' margin= '0 0 0 10px'>중복확인</Button>
        </Grid>

        <Grid padding="16px 0px">
          <Text>블로그 유형</Text>
          <Radio></Radio>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="블로그"
            placeholder="블로그 주소를 입력해주세요."
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="GitHub"
            placeholder="GitHub 주소를 입력해주세요."
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
          ></Input>
        </Grid>

        <Grid center>
          <Button text="회원가입 하기"></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
