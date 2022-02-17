import React from 'react';
import { Input, Button, Grid } from '../elements';
import { useDispatch } from 'react-redux';
import { actionCreators as commActions } from '../redux/modules/comment';

const CommentWrite = (props) => {
    const dispatch = useDispatch()
    const [content, setContent] = React.useState()
    
    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const addComment = () => {
        dispatch(commActions.addCommentDB(+props.id, content));
        setContent('');
    }

    return (
        <>  
            <Grid flex padding='16px'>
                <Input placeholder='댓글을 입력해주세요 :-)' is_submit _onChange={changeContent} value={content}></Input>
                <Button 
                    _disabled={!content ? true : false}
                    _onClick={addComment} 
                    text={'작성하기'} 
                    width='10%' 
                    minWidth='68px'
                    height='40px'
                    margin='0 0 0 2%'/>
            </Grid>
        </>
    );
};

export default CommentWrite;