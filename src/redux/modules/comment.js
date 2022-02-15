import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import moment from 'moment';
import axios from "axios";

// 액션
const GET_COMMENT = 'GET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// 액션함수
const getComment = createAction(GET_COMMENT, (post_id, comment_list) => ({post_id,comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
const deleteComment = createAction(DELETE_COMMENT, (post_id, comment_id) => ({post_id, comment_id})); 

const initialState = {
    list: {},
}

// 미들웨어
const getCommentDB = (post_id) => {
    return async function(dispatch) {
        try{
            const docs = await axios.get(`http://localhost:3003/comment/?postId=${post_id}`);
            dispatch(getComment(post_id, docs.data))
        }catch(err){
            console.log('댓글 정보를 가져올 수 없습니다',err);
        }
    }
}

const addCommentDB = (post_id, comment) => {
    return async function(dispatch, getState, { history }){
        try{
            const doc = {
                userId: 3,
                nickname: "Ricky", 
                comment: comment,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                postId: post_id,
                userIcon: "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
            }

            const _doc = await axios.post('http://localhost:3003/comment',doc);

            console.log(_doc.data);
            dispatch(addComment(post_id, _doc.data));

        } catch(err){
            console.log('댓글을 추가할 수 없습니다.',err);
        }
    }
}

export default handleActions({
    [GET_COMMENT]: (state, action) => produce(state, (draft)=>{
        draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft)=>{
        draft.list[action.payload.post_id].unshift(action.payload.comment);
    })
},initialState);

const actionCreators = {
    getComment,
    addComment,
    deleteComment,
    getCommentDB,
    addCommentDB,
}

export {actionCreators};