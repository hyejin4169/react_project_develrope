import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import moment from 'moment';
import axios from "axios";

// 액션
const GET_COMMENT = 'GET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

// 액션함수
const getComment = createAction(GET_COMMENT, (post_id, comment_list) => ({post_id,comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
const editComment = createAction(EDIT_COMMENT, (post_id, comment_id, comment) => ({post_id, comment_id, comment}))
const deleteComment = createAction(DELETE_COMMENT, (post_id, comment_id) => ({post_id, comment_id})); 

const initialState = {
    list: {},
}

// 미들웨어
const getCommentDB = (post_id) => {
    return async function(dispatch) {
        try{
            const docs = await axios.get(`http://3.35.132.95/api/comment/${post_id}`);
            console.log(docs.data)
            dispatch(getComment(post_id, docs.data.result))
        }catch(err){
            console.log('댓글 정보를 가져올 수 없습니다',err);
        }
    }
}

const addCommentDB = (post_id, comment) => {
    return async function(dispatch, getState, { history }){
        const user_info = getState().user.user
        try{
            const doc = {
                userId: user_info.uid,
                nickname: user_info.nickname, 
                comment: comment,
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                postId: post_id,
                userIcon: user_info.userIcon
            }

            const _doc = await axios.post(`http://3.35.132.95/api/comment/${post_id}`,{comment: comment},{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }});

            if(_doc.data.ok){
                dispatch(addComment(post_id, {...doc, commentId: _doc.data.commentId}));
            }

        } catch(err){
            console.log('댓글을 추가할 수 없습니다.',err);
        }
    }
}

const editCommentDB = (post_id, comment_id, comment) => {
    return async function(dispatch, getState, {history}){
        try{
            const edit = await axios.put(`http://3.35.132.95/api/comment/${comment_id}`,{comment: comment},{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }})
              console.log(edit)
              if(edit.data.ok){
                dispatch(editComment(post_id, comment_id, comment))
            } else{
                alert('댓글 수정에 실패했습니다!')
            }
            
        } catch(err){
            alert('댓글 수정에 실패했습니다!')
            console.log(err);
        }
    }
}

const deleteCommentDB = (post_id, comment_id) => {
    return async function(dispatch, getState, {history}){
            console.log(comment_id)
        try{
            const _delete = await axios.delete(`http://3.35.132.95/api/comment/${comment_id}`,{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
              }})

              if(_delete.data.ok){
                  dispatch(deleteComment(post_id, comment_id))
              } else{
                  alert('댓글 삭제에 실패했습니다!')
              }

        } catch(err){
            alert('댓글 삭제에 실패했습니다!')
            console.log(err);
        }

    }
}

export default handleActions({
    [GET_COMMENT]: (state, action) => produce(state, (draft)=>{
        draft.list[action.payload.post_id] = action.payload.comment_list;
    }),
    [ADD_COMMENT]: (state, action) => produce(state, (draft)=>{
        draft.list[action.payload.post_id].unshift(action.payload.comment);
    }),
    [EDIT_COMMENT]: (state, action) => produce(state, (draft)=>{
        draft.list[action.payload.post_id].map(a=>{
            if(a.commentId === action.payload.comment_id){
                a.comment = action.payload.comment;
                return a;
            }
            return a;
        })
    }),
    [DELETE_COMMENT]: (state, action) => produce(state, (draft)=>{
        draft.list[action.payload.post_id] = draft.list[action.payload.post_id].filter(a=>a.commentId !== action.payload.comment_id);
    })
},initialState);

const actionCreators = {
    getComment,
    addComment,
    editComment,
    deleteComment,
    getCommentDB,
    addCommentDB,
    editCommentDB,
    deleteCommentDB,
}

export {actionCreators};