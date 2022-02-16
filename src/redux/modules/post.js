import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";
// import { actionCreators as userActions } from "../redux/modules/user";


const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_index) => ({
  post_index,
}));

// initialState
const initialState = {
  list: [],
};

// 게시글 하나에 대한 기본적인 정보
const initialPost = {
  userId: "",
  nickname: "",
  imgUrl:
    "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg",
  userIcon:
    "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg",
  comment_cnt: 0,
  date: moment().format("YYYY-MM-DD HH:mm:ss"),
  content: "",
};

//middleware actions
const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    axios
      .get('http://3.35.132.95/api/post')
      .then((res) => {
        console.log("main posts : ", res.data);
        dispatch(getPost(res.data.post));
      })
      .catch((err) => {
        window.alert("글을 불러올 수 없어요!");
        console.log("글 불러오기 실패!", err);
      });
  };
};

const getOnePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    axios
      .get(`http://3.35.132.95/api/detail/${postId}`)
      .then((res) => {
        console.log("res : ", res)
        dispatch(getPost([res.data.detail]));
      })
      .catch((err) => {
        window.alert("해당 글을 불러올 수 없어요!");
        console.log("선택 글 불러오기 실패!", err);
      });
  };
};

const addPostDB = (content) => {
  return async function (dispatch, getState, { history }) {
    const user_info = getState().user.user; //user 정보 가져옴
    const doc = { //db에 요청할 정보들
      userId: user_info.uid,
      nickname: user_info.nickname,
      imgUrl: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg",
      userIcon: user_info.userIcon,
      comment_cnt: 0,
      date: moment().format("YYYY-MM-DD HH:mm:ss"),
      content: content,
    };

    axios
      .post('http://3.35.132.95/api/post', {...doc}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }})
      .then((res) => {
        // console.log("res.data : ", res.data);
        dispatch(addPost({...doc, postId: res.data.postId}));
      })
      .catch((err) => {
        window.alert("해당 글을 불러올 수 없어요!");
        console.log("선택 글 불러오기 실패!", err);
      })
      .then(() => {
        history.replace("/");
      });
  };
};

const editPostDB = (content, postId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) {
      console.log("게시물 정보가 없어요!");
      return;
    }

      const _post_idx = getState().post.list.findIndex((p) => p.postId === postId);
      const _post = getState().post.list[_post_idx];

      axios
        .put(`http://3.35.132.95/api/item/${postId}`, {content: content, imgUrl: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg"}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        .then((res) => {
          dispatch(editPost(postId, {..._post, content: content, imgUrl: "https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/00/a0000370/img/basic/a0000370_main.jpg"}));
          history.replace('/')
        })
        .catch((err) => {
          window.alert("글을 수정할 수 없어요!");
          console.log("글 수정하기 실패!", err);
        });
    };
  };


const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) {
    return;
    }

    const _post = getState().post.list;

    axios.delete(`http://3.35.132.95/api/item/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((res) => {
      const post_index = _post.findIndex((p) => {
        return parseInt(p.postId) === parseInt(postId);
      });

      dispatch(deletePost(post_index));
    history.replace("/");
    })
    .catch((err) => {
      console.log("게시글 삭제 실패!", err);
    });
  };
};

// reducer
export default handleActions(
  {
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),

    [EDIT_POST]: (state, action) =>
    produce(state, (draft) => {
      let idx = draft.list.findIndex((p) => p.id === action.payload.post_id); //id로 내가 뭘 수정할건지 찾아야함(리스트에서 몇번째인걸 고칠건지)
      draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    }),

    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = state.list.filter((l, idx) => {
          return parseInt(action.payload.post_index) !== idx;
        });
      }),
  },
  initialState
);

const actionCreators = {
  getPost,
  getPostDB,
  getOnePostDB,
  addPost,
  addPostDB,
  editPost,
  editPostDB,
  deletePost,
  deletePostDB,
};

export { actionCreators };
