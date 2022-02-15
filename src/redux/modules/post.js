import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import moment from 'moment';
import axios from "axios";



// 액션
const GET_POST = 'GET_POST';



// 액션함수
const getPost = createAction(GET_POST, (post_list) => ({post_list}));


// initialState
const initialState = {
    list: [],
}

const initialPost = {
    id: 0,
    userId: 3,
    nickname: "Daisy",
    content: "너무 졸려요. 살려주세요.",
    imgUrl: "https://post-phinf.pstatic.net/MjAxODA5MTBfMTE4/MDAxNTM2NTYxNzcyNzM5.yrHHJfPfuGHyIzuYrKJ7OkvJqF09taHupE9QzHuFG9sg.uGaZqSOID-_r6JBZtUOefL2hXprvOUOBby4NUOkaRdsg.JPEG/180910_%EC%96%B4%EC%A9%90%EC%A7%80_%EB%8D%94_%ED%94%BC%EA%B3%A4%ED%95%9C_%EA%B2%83_%EA%B0%99%EB%8D%94%EB%9D%BC%EB%8B%88-%EC%B9%B4%EB%93%9C%EB%89%B4%EC%8A%A4%28%EB%84%A4%EC%9D%B4%EB%B2%84%EC%9A%A9%29.jpg",
    userIcon: "https://post-phinf.pstatic.net/MjAxODA5MTBfMTE4/MDAxNTM2NTYxNzcyNzM5.yrHHJfPfuGHyIzuYrKJ7OkvJqF09taHupE9QzHuFG9sg.uGaZqSOID-_r6JBZtUOefL2hXprvOUOBby4NUOkaRdsg.JPEG/180910_%EC%96%B4%EC%A9%90%EC%A7%80_%EB%8D%94_%ED%94%BC%EA%B3%A4%ED%95%9C_%EA%B2%83_%EA%B0%99%EB%8D%94%EB%9D%BC%EB%8B%88-%EC%B9%B4%EB%93%9C%EB%89%B4%EC%8A%A4%28%EB%84%A4%EC%9D%B4%EB%B2%84%EC%9A%A9%29.jpg",
    comment_cnt: 0,
    date: moment().format('YYYY-MM-DD HH:mm:ss'),
}


const getPostDB = () => {
    return async function (dispatch, getState, { history }){

        try {
            const docs = await axios.get('http://localhost:3003/post');
            
            dispatch(getPost(docs.data))
        } catch(err) {
            console.log("포스트를 불러올 수 없습니다!", err);
        }
        
    }
}

const getOnePostDB = (post_id) => {
    return async function (dispatch, getState, {history}){

        try {
            const doc = await axios.get(`http://localhost:3003/post/${post_id}`);
            
            dispatch(getPost([doc.data]))
        } catch(err) {
            console.log("포스트를 불러올 수 없습니다.",err);
        }
    }
}

// const updateCommentCntDB = (post_id, plus) => {
//     return async function(dispatch){
//         try{
//             const doc = await axios.get(`http://localhost:3003/post/${post_id}`);

//             if(plus){
//                 await axios.put(`http://localhost:3003/post/${post_id}`,{comment_cnt: doc.data.comment_cnt})
//             } else if(!plus){

//             }
//         }
//     }
// }


export default handleActions({
    [GET_POST]: (state, action) => produce(state, (draft) => {
        draft.list = action.payload.post_list;
        console.log(draft.list)
    }),
},initialState)

const actionCreators = {
    getPost,
    getPostDB,
    getOnePostDB,
}

export {actionCreators};