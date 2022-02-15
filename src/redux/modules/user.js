import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, () => ({  }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

// middleware actions
const signupDB = (email, nickname) => {
  return function (dispatch, getState, { history }) {
    axios
      .post("http://localhost:3003/user", {
        "email": email,
        "nickname": nickname,
      })
      .then((res) => {
        if (res.data === "회원가입 완료") {
          window.alert(res.data);
          history.push("/");
          return;
        }
        window.alert(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// const loginDB = (id, pwd) => {
//   return function (dispatch, getState, { history }) {
//     //로그인 state 유지
//     setPersistence(authService, browserSessionPersistence).then((res) => {
//       console.log("세션 추가");
//       console.log(id, pwd);
//       signInWithEmailAndPassword(authService, id, pwd)
//         .then((userCredential) => {
//           console.log("로그인 성공!");
//           console.log("usercredential : ", userCredential);
//           dispatch(
//             setUser({
//               id: id,
//               user_name: userCredential.user.displayName,
//               user_profile: "",
//               uid: userCredential.user.uid,
//             })
//           );
//           history.push("/");
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           window.alert("아이디와 비밀번호를 다시 확인해주세요!");
//           console.log(errorCode, errorMessage);
//         });
//     });
//   };
// };

// const loginCheckDB = () => {
//   return function (dispatch, getState, { history }) {
//     onAuthStateChanged(authService, (user) => {
//       if (user) {
//         dispatch(
//           setUser({
//             id: user.email,
//             user_name: user.displayName,
//             user_profile: "",
//             uid: user.uid,
//           })
//         );
//       } else {
//         dispatch(logOut());
//       }
//     });
//   };
// };

// const logoutDB = () => {
//   return function (dispatch, getState, { history }) {
//     signOut(authService).then(() => {
//       dispatch(logOut());
//       history.replace("/");
//     });
//   };
// };

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.user = action.payload.user;
        draft.is_login = true;
      }), //원본값을 복사한 값을 draft로 받아옴
    // [LOG_OUT]: (state, action) =>
    //   produce(state, (draft) => {
    //     deleteCookie("is_login");
    //     draft.user = null;
    //     draft.is_login = false;
    //   }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

// action creator export
const actionCreators = {
  setUser,
  getUser,
  logOut,
  signupDB,
  //   loginDB,
  //   loginCheckDB,
  //   logoutDB,
};

export { actionCreators };
