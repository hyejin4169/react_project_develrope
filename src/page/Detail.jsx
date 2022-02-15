import React from 'react';
// import CommentWrite from '../component/CommentWrite';
import Post from '../component/Post';
import { Button } from '../elements';
import CommentList from './../component/CommentList';
import CommentWrite from './../component/CommentWrite';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import Image from './../elements/Image';
import Grid from './../elements/Grid';
import styled from 'styled-components';

const Detail = (props) => {
    const dispatch = useDispatch()
    const id = props.match.params.id;
    const post_list = useSelector(state => state.post.list);
    const post = post_list.find(a => a.id === +id);
    
    React.useEffect(()=>{
        if(!post){
            dispatch(postActions.getOnePostDB(id));
        }
    },[])


    const {history} = props;

    if(!post){
        return(
            <>
                <LoadingWrap>
                    <Image src={'/static/Spinner-1s-204px.gif'} size='10vw' margin='auto'/>
                </LoadingWrap>
            </>
            
        )
    }

    return (
        <>
            <Post {...post}/>
            <CommentWrite id={id}/>
            <CommentList id={id}/>
            <Button float_btn _onClick={() => {history.push("/write");}} text={'댓글 작성'}/>
        </>
    );
};

const LoadingWrap = styled.div`
    position: fixed;
    top: calc(50% - 5vw);
    left: calc(50% - 5vw);
`

export default Detail;
