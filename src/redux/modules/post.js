import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import moment from "moment";
// import { actionCreators as userActions } from "../redux/modules/user";


const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

// action creators
const getPost = createAction(GET_POST, (post_list) => ({ post_list }));
const addPost = createAction(ADD_POST, (post) => ({ post }));
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
      .get("http://3.35.132.95/api/post")
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
        console.log(res)
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
        window.alert("포스팅에 실패했습니다.");
        console.log("포스팅 실패!", err);
      })
      .then(() => {
        history.replace("/");
      });
  };
};

const deletePostDB = (postId) => {
  return async function (dispatch, getState, { history }) {
    if (!postId) {
    window.confirm("삭제하시겠습니까?");
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
  //   editPost,
  //   editPostDB,
  deletePost,
  deletePostDB,
};

export { actionCreators };
