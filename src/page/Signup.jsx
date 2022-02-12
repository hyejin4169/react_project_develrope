import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import Radio from "../component/Radio";

import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck, pwdCheck } from "../shared/common";

const Signup = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");
  const [blog_type, setBlogType] = React.useState("");
  const [blog_ad, setBlogAd] = React.useState("");
  const [git_ad, setGitAd] = React.useState("");

  const signup = () => {
    if (id === "" || pwd === "" || user_name === "" || blog_type === "" || blog_ad === "" || git_ad === "") {
      window.alert("입력하지 않은 칸이 있습니다!!");
      return;
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    if (pwd !== pwd_check) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!");
      return;
    }

    // dispatch(userActions.signupDB(id, pwd, user_name));
  };

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px" flex align="flex-end">
          <Grid>
            <Input
              label="이메일"
              placeholder="이메일을 입력해주세요."
              _onChange={(e) => {
                setId(e.target.value);
              }}/>

                {(id!=='' && !emailCheck(id))&&(
                <Text color='red'>
                  이메일 형식이 올바르지 않습니다!
                </Text>
                )}
                {(id!=='' && emailCheck(id))&&(
                <Text color='green'>
                  사용할 수 있는 이메일 형식입니다!
                </Text>
                )}             


          </Grid>
          <Button width="100px" height="45px" margin="0 0 0 10px">
            중복확인
          </Button>
        </Grid>

        <Grid padding="16px 0px" flex>
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          ></Input>
          <Button width="100px" margin="0 0 0 10px">
            중복확인
          </Button>
        </Grid>

        <Grid padding="16px 0px">
          <Text>블로그 유형</Text>
          <Radio _onClick={(e)=>{
            setBlogType(e.target.value);
            console.log(e.target.value);
          }}/>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="블로그"
            placeholder="블로그 주소를 입력해주세요."
            _onChange={(e)=>{
              setBlogAd(e.target.value);
            }}
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="GitHub"
            placeholder="GitHub 주소를 입력해주세요."
            _onChange={(e)=>{
              setGitAd(e.target.value);
            }}
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}/>
            {(pwd!=='' && !pwdCheck(pwd))&&(
              <Text color='red'>
                비밀번호는 최소 8자 이상으로 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자를 포함하여야 합니다.
              </Text>
            )}
            {(pwd!=='' && pwdCheck(pwd))&&(
              <Text color='green'>
                올바른 비밀번호 형식입니다.
              </Text>
            )}
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}/>
        </Grid>

        <Grid center>
          <Button text="회원가입 하기" _onClick={signup}></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
