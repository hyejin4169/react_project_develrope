import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";

// import { actionCreators as imageActions } from "./image";

const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
// const EDIT_POST = "EDIT_POST";
// const DELETE_POST = "DELETE_POST";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
// const editPost = createAction(EDIT_POST, (post_id, post) => ({
//   post_id,
//   post,
// }));
// const deletePost = createAction(DELETE_POST, (post_index) => ({
//   post_index,
// }));

// initialState
const initialState = {
  list: [],
};

// 게시글 하나에 대한 기본적인 정보
// const initialPost = {
//   id: 11,
//   userId: 5,
//   nickname: "Apple",
//   content: "흐아앙",
//   imgUrl:
//     "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg",
//   userIcon:
//   "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg",
//   comment_cnt: 0,
//   date: moment().format("YYYY-MM-DD HH:mm:ss"),
// };

//middleware actions

const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    axios
      .get("http://localhost:3003/post")
      .then((res) => {
        dispatch(getPost(res.data));
      })
      .catch((err) => {
        window.alert("글을 불러올 수 없어요!");
        console.log("글 불러오기 실패!", err);
      });
  };
};

const getOnePostDB = (post_id) => {
  return async function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3003/post/${post_id}`)
      .then((res) => {
        dispatch(getPost([res.data]));
      })
      .catch((err) => {
        window.alert("해당 글을 불러올 수 없어요!");
        console.log("선택 글 불러오기 실패!", err);
      });
    // let _post = doc.data();
    // let post_d = Object.keys(_post).reduce(
    //   (acc, cur) => {
    //     if (cur.indexOf("user_") !== -1) {
    //       return {
    //         ...acc,
    //         user_info: { ...acc.user_info, [cur]: _post[cur] },
    //       };
    //     }

    //     return { ...acc, [cur]: _post[cur] };
    //   },
    //   { id: doc.id, user_info: {} }
    // );

    // dispatch(getPost([post_d]));
  };
};

const addPostDB = (content, id, userId) => {
  return async function (dispatch, getState, { history }) {
    axios
    .post("http://localhost:3003/post", {
      id: id,
      userId: userId,
      nickname: "Apple",
      imgUrl:
        "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg",
      userIcon:
      "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg",
      comment_cnt: 0,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      content: content,
  })
    .then((res) => {
      console.log("res.data : ", res.data);
      dispatch(addPost(res.data));
    })
    .catch((err) => {
      window.alert("해당 글을 불러올 수 없어요!");
      console.log("선택 글 불러오기 실패!", err);
    })
    .then(() => {
      history.replace('/')
    })

    // const user_info = {
    //   user_name: _user.user_name,
    //   user_id: _user.uid,
    //   user_profile: _user.user_profile,
    // };

    // const _image = getState().image.preview;
    // console.log(_image);

    // const storageRef = ref(
    //   storage,
    //   `images/${user_info.user_id}_${new Date().getTime()}`
    // );
    // const _upload = uploadString(storageRef, _image, "data_url");
    // _upload.then((snapshot) => {
    //   getDownloadURL(snapshot.ref)
    //     .then((url) => {
    //       console.log(url);

    //       return url;
    //     })
    //     // db에서 모든 데이터가 받아진 후에 포스트를 만들 수 있게 함(비동기)
    //     .then(async (url) => {
    //       const postDB = await addDoc(collection(firestore, "post"), {
    //         ...user_info,
    //         ..._post,
    //         image_url: url,
    //       });
    //       let post = { user_info, ..._post, id: postDB.id, image_url: url };
    //       dispatch(addPost(post));
    //       history.replace("/");

    //       dispatch(imageActions.setPreview(null));
    //     })
  };
};

// const editPostFB = (post_id = null, post = {}) => {
//   return async function (dispatch, getState, { history }) {
//     if (!post_id) {
//       console.log("게시물 정보가 없어요!");
//       return;
//     }

//     const _image = getState().image.preview;
//     const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
//     const _post = getState().post.list[_post_idx];
//     const postDB = doc(db, "post", post_id);

//     if (_image === _post.image_url) {
//       await updateDoc(postDB, post);
//       dispatch(editPost(post_id, { ...post }));
//       history.replace("/");

//       return;
//     } else {
//       const user_id = getState().user.user.uid;
//       const storageRef = ref(
//         storage,
//         `images/${user_id}_${new Date().getTime()}`
//       );
//       const _upload = uploadString(storageRef, _image, "data_url");

//       _upload
//         .then((snapshot) => {
//           console.log(snapshot);

//           getDownloadURL(snapshot.ref)
//             .then((url) => {
//               console.log(url);

//               return url;
//             })
//             .then((url) => {
//               updateDoc(postDB, { ...post, image_url: url });
//               dispatch(editPost(post_id, { ...post, image_url: url }));
//               history.replace("/");
//             });
//         })
//         .catch((err) => {
//           window.alert("이미지 업로드에 문제가 있어요!");
//           console.log("이미지 업로드 실패!", err);
//         });
//     }
//   };
// };

// const deletePostDB = (post_id) => {
//   return async function (dispatch, getState, { history }) {
//     // if (!post_id) {
//     window.alert("삭제하시겠습니까?");
//     // }

//     const docRef = doc(db, "post", post_id);
//     await deleteDoc(docRef);

//     const _post_list = getState().post.list;
//     const post_index = _post_list.findIndex((d) => {
//       return d.id === post_id;
//     });
//     console.log("post_index : ", post_index);
//     dispatch(deletePost(post_index));
//     history.replace("/");
//   };

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        // draft.list = draft.list.reduce((acc, cur) => {
        //   if (acc.findIndex((a) => a.id === cur.id) === -1) {
        //     return [...acc, cur];
        //   } else {
        //     acc[acc.findIndex((a) => a.id === cur.id)] = cur;
        //     return acc;
        //   }
        // }, []);

        // if (action.payload.paging) {
        //   draft.paging = action.payload.paging;
        // }
        // draft.paging = action.payload.paging;
        // draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    // [EDIT_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.list.findIndex((p) => p.id === action.payload.post_id); //id로 내가 뭘 수정할건지 찾아야함(리스트에서 몇번째인걸 고칠건지)
    //     draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    //   }),

    // [DELETE_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.list = state.list.filter((l, idx) => {
    //       return parseInt(action.payload.post_index) !== idx;
    //     });
    //   }),
    // }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostDB,
  getOnePostDB,
  addPost,
  addPostDB,
  //   setPost,
  //   editPost,
  //   deletePost,
  //   editPostDB,
  //   deletePostDB,
};

export { actionCreators };
