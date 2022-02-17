import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import axios from "axios";

// 액션
const SET_USER = 'SET_USER';
const OUT_USER = 'OUT_USER';
const SET_USERLIST= 'SET_USERLIST';
const SET_USERLIST_ALL= 'SET_USERLIST_ALL';

// 액션 함수
const setUser = createAction(SET_USER, (user) => ({ user }));
const outUser = createAction(OUT_USER, () => ({ }));
const setUserList = createAction(SET_USERLIST, (user_list) => ({user_list}));
const setUserListAll = createAction(SET_USERLIST_ALL, (user_list) => ({user_list}));

const initialState = {
    user: null,
    is_login: false,
    user_list: [],
    user_list_all: [],
}

const signupDB = (email, password,check_password, nickname, git, blog, blogtype, userIcon='https://cdn.imweb.me/upload/S20200903356594b8dc821/122e89b0892d2.jpg') => {
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
            window.alert('아이디와 비밀번호를 다시 확인해주세요.')
            console.log(err)
        }
    }
}

const loginCheckDB = () => {
    return async function(dispatch, getState, {history}){
        try{
            const check = await axios.get('http://3.35.132.95/api/auth',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
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

const getSixUsersDB = () => {
    return async function(dispatch, getState, {history}){
        const user_nick = getState().user.user?.nickname;
        try{
            const users = await axios.get('http://3.35.132.95/api/user',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            let user_list = users.data.user.filter(a=>a.nickname !== user_nick);
            user_list.length === 6 && user_list.pop();
            dispatch(setUserList(user_list))
        } catch(err){

        }
    }
}

const getAllUsersDB = () => {
    return async function(dispatch, getState, {history}){
        const user_nick = getState().user.user.nickname;
        try{
            const users = await axios.get('http://3.35.132.95/api/users',{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            let user_list = users.data.user.filter(a=>a.nickname !== user_nick);
            dispatch(setUserListAll(user_list))
        } catch(err){

        }
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
    }),
    [SET_USERLIST]: (state, action) => produce(state, (draft) => {
        draft.user_list = action.payload.user_list
    }),
    [SET_USERLIST_ALL]: (state, action) => produce(state, (draft) => {
        draft.user_list_all = action.payload.user_list
    })
},initialState);

const actionCreators = {
    setUser,
    outUser,
    setUserList,
    setUserListAll,
    signupDB,
    loginDB,
    loginCheckDB,
    getSixUsersDB,
    getAllUsersDB,
}

export { actionCreators };
