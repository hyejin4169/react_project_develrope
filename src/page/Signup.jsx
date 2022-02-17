import React from "react";
import { Text, Input, Grid, Button } from "../elements";
import Radio from "../component/Radio";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { emailCheck, pwdCheck } from "../shared/common";
import axios from "axios";

const Signup = (props) => {
  const dispatch = useDispatch();

  //이메일, 닉네임, 블로그 유형, 블로그, 깃허브, 비밀번호, 비밀번호 확인 확인
  const [id, setId] = React.useState("");
  const [user_name, setUserName] = React.useState("");
  const [blog_type, setBlogType] = React.useState("");
  const [blog_ad, setBlogAd] = React.useState("");
  const [git_ad, setGitAd] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");

  const [email_check, setEmailCheck] = React.useState(false);
  const [nickname_check, setNicknameCheck] = React.useState(false);

  const changeEmail = (e) => {
    setId(e.target.value);
    if (email_check) {
      setEmailCheck(false);
    }
  };

  const changeNick = (e) => {
    setUserName(e.target.value);
    if (nickname_check) {
      setNicknameCheck(false);
    }
  };

  const emailCheckF = async () => {
    if (emailCheck(id)) {
      try {
        let check = await axios.post("http://3.35.132.95/api/join/emailCheck", {
          email: id,
        });
        if (check.data.ok === true) {
          setEmailCheck(check.data.ok);
          alert(check.data.message);
        } else if (check.data.ok === false) {
          alert(check.data.errorMessage);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (!emailCheck(id)) {
      alert("이메일 형식을 먼저 확인해주세요!");
    }
  };

  const nicknameCheckF = async () => {
    try {
      let check = await axios.post(
        "http://3.35.132.95/api/join/nicknameCheck",
        { nickname: user_name }
      );
      if (check.data.ok === true) {
        setNicknameCheck(check.data.ok);
        alert(check.data.message);
      } else if (check.data.ok === false) {
        alert(check.data.errorMessage);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signup = () => {
    if (
      id === "" ||
      pwd === "" ||
      user_name === "" ||
      blog_type === "" ||
      blog_ad === "" ||
      git_ad === ""
    ) {
      window.alert("입력하지 않은 칸이 있습니다!!");
      return;
    }

    if (!email_check || !nickname_check) {
      window.alert("이메일이나 닉네임의 중복검사가 되지 않았습니다!");
    }

    if (!emailCheck(id)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    if (!pwdCheck(pwd)) {
      window.alert("이메일 형식이 맞지 않습니다!");
      return;
    }

    if (pwd !== pwd_check) {
      window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다!");
      return;
    }

    dispatch(
      userActions.signupDB(
        id,
        pwd,
        pwd_check,
        user_name,
        git_ad,
        blog_ad,
        blog_type
      )
    );
  };

  return (
    <React.Fragment>
      <Grid padding="16px" maxWidth="650px" margin="0 auto">
        <Text size="32px" bold>
          회원가입
        </Text>

        <Grid padding="16px 0px" margin="2vh auto 0" flex align="flex-end">
          <Grid>
            <Input
              label="이메일"
              placeholder="이메일을 입력해주세요."
              _onChange={changeEmail}
            />

            {id !== "" && !emailCheck(id) && (
              <Text color="red">이메일 형식이 올바르지 않습니다!</Text>
            )}
            {id !== "" && emailCheck(id) && (
              <Text color="green">사용할 수 있는 이메일 형식입니다!</Text>
            )}
          </Grid>
          <Button
            width="100px"
            height="45px"
            margin="0 0 0 10px"
            _disabled={email_check ? true : false}
            _onClick={emailCheckF}
          >
            중복확인
          </Button>
        </Grid>

        <Grid padding="16px 0px" flex>
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요."
            _onChange={changeNick}
          ></Input>
          <Button
            width="100px"
            margin="0 0 0 10px"
            _disabled={nickname_check ? true : false}
            _onClick={nicknameCheckF}
          >
            중복확인
          </Button>
        </Grid>

        <Grid padding="16px 0px">
          <Text>블로그 유형</Text>
          <Radio
            _onClick={(e) => {
              setBlogType(e.target.value);
              console.log(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px" margin="-1vh auto 0">
          <Input
            label="블로그"
            placeholder="블로그 주소를 입력해주세요."
            _onChange={(e) => {
              setBlogAd(e.target.value);
            }}
          ></Input>
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="GitHub"
            placeholder="GitHub 주소를 입력해주세요."
            _onChange={(e) => {
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
            }}
          />
          {pwd !== "" && !pwdCheck(pwd) && (
            <Text color="red">
              비밀번호는 최소 8자 이상으로 최소 하나의 문자, 하나의 숫자 및
              하나의 특수 문자를 포함하여야 합니다.
            </Text>
          )}
          {pwd !== "" && pwdCheck(pwd) && (
            <Text color="green">올바른 비밀번호 형식입니다.</Text>
          )}
        </Grid>

        <Grid padding="16px 0px">
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
            type="password"
            _onChange={(e) => {
              setPwdCheck(e.target.value);
            }}
          />
        </Grid>

        <Grid center>
          <Button
            margin="3vh auto 0"
            width="130px"
            height="46px"
            text="회원가입 하기"
            _onClick={signup}
          ></Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Signup.defaultProps = {};

export default Signup;
