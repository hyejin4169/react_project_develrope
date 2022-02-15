import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

import axios from "axios";

// 액션
const SET_USER = 'SET_USER';
const OUT_USER = 'OUT_USER';

// 액션 함수
const setUser = createAction(SET_USER, (user) => ({ user }));
const outUser = createAction(OUT_USER, () => ({ }));

const initialState = {
    user: null,
    is_login: false,
}

const signupDB = (email, password,check_password, nickname, git, blog, blogtype, userIcon='https://post-phinf.pstatic.net/MjAxODA5MTBfMTE4/MDAxNTM2NTYxNzcyNzM5.yrHHJfPfuGHyIzuYrKJ7OkvJqF09taHupE9QzHuFG9sg.uGaZqSOID-_r6JBZtUOefL2hXprvOUOBby4NUOkaRdsg.JPEG/180910_%EC%96%B4%EC%A9%90%EC%A7%80_%EB%8D%94_%ED%94%BC%EA%B3%A4%ED%95%9C_%EA%B2%83_%EA%B0%99%EB%8D%94%EB%9D%BC%EB%8B%88-%EC%B9%B4%EB%93%9C%EB%89%B4%EC%8A%A4%28%EB%84%A4%EC%9D%B4%EB%B2%84%EC%9A%A9%29.jpg') => {
    return async function(dispatch, getState, {history}){

        try {
            const join = await axios.post('http://3.35.132.95/api/join',{
                            email: email,
                            password: password,
                            confirmpassword: check_password,
                            nickname: nickname,
                            git: git,
                            blog: blog,
                            // blogtype: blogtype,
                            userIcon: userIcon,
                        });
            console.log(join);
            if(join.data.ok === true){
                window.alert('성공적으로 회원가입하셨습니다!');
                history.replace('/login');
            } else if(join.data.ok === false){
                window.alert('회원가입에 실패했습니다.');
                history.replace('/signup');
            }

        } catch(err){
            alert('회원가입에 실패했습니다.')
            console.log(err)
        }
    }
}

const loginDB = (email, pwd) => {
    return async function(dispatch, getState, {history}){
        console.log(history)
        try{
            const login = await axios.post('http://3.35.132.95/api/login',{
                email: email,
                password: pwd
            })
            console.log(login)
            if(login.data.ok === true){
                window.alert('로그인 되었습니다!')
                history.replace('/')
                // 토큰 받아서 넣어줘야 한다.
                localStorage.setItem('token',login.data.token);
                dispatch(setUser({
                    nickname: login.data.nickname,
                    email: email,
                    userIcon: login.data.userIcon,
                    uid: login.data.userId
                }))
            } else if(login.data.ok === false){
                window.alert('아이디와 비밀번호를 다시 확인해주세요.')
            };

        } catch(err){
            window.alert('회원가입에 실패했습니다.')
            console.log(err)
        }
    }
}

// const logoutDB = () => {
//     return async function(dispatch, getState, {history}){
//         try{

//         }catch(err){

//         };
//     }
// }

const loginCheckDB = () => {
    return async function(dispatch, getState, {history}){
        console.log('되나?')
        try{
            const check = await axios.get('http://3.35.132.95/api/auth',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(check.data.ok === true){
                dispatch(setUser({
                    nickname: check.data.nickname,
                    email: check.data.email,
                    userIcon: check.data.userIcon,
                    uid: check.data.userId
                }))
            } else{
                dispatch(outUser());
            }
        }catch(err){
            console.log('에러발생',err);
        };
    }
}


export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft)=>{
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [OUT_USER]: (state, action) => produce(state, (draft)=>{
        localStorage.removeItem('token');
        draft.user = null;
        draft.is_login = false;
    })
},initialState);

const actionCreators = {
    setUser,
    outUser,
    signupDB,
    loginDB,
    // logoutDB,
    loginCheckDB,
}

export { actionCreators };