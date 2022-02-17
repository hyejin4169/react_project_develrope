import React from 'react';
import { Button, Image, Input, Text } from '../elements';
import Grid from '../elements/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commActions } from '../redux/modules/comment';
import { dateView } from '../shared/time';
import styled from 'styled-components';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const comment_list = useSelector(state => state.comment.list[props.id]);

    


    React.useEffect(() => {
        dispatch(commActions.getCommentDB(props.id))
    },[])

    return (
        <>
            <Grid>
                {
                    comment_list?.map(a=>{
                        return(
                            <CommentItem key={a.commentId} {...a}/>
                        )
                    })
                }              
            </Grid>
        </>
    );
};

export default CommentList;


const CommentItem = (props) => {
    
    const dispatch = useDispatch();
    const user_info = useSelector(state => state.user.user);
    const [edit, setEdit] = React.useState(false);
    const [comment, setComment] = React.useState(props.comment);

    const changeComm = (e) => {
        setComment(e.target.value);
        console.log(comment)
    }

    const editComm = () => {
        if(comment !== ''){
            dispatch(commActions.editCommentDB(props.postId, props.commentId, comment));
            setEdit(false);
        } else if(comment === ''){
            alert('댓글을 입력해주세요!');
        }
    }

    const deleteComm = () => {
        const confirm = window.confirm('댓글을 삭제하시겠습니까?');
        if(confirm){
            dispatch(commActions.deleteCommentDB(props.postId, props.commentId));
        }
    }

    if(edit){
        return(
            <>  
            <Grid flex padding='10px 16px' border='3px solid #777' margin='10px 0'>
                <Grid flex justify='flex-start' >
                    <Grid flex justify='flex-start' width='max-content' margin='0 2vw 0 0'>
                        <Image src={props.userIcon} shape='circle' margin='0 1vw 0 0'/>
                        <Text bold='700'>{props.nickname}</Text>
                    </Grid>
                    <Input is_submit padding='6px 3px' placeholder='' _defaultValue={props.comment} _onChange={changeComm}/>
                </Grid>
                <Grid flex justify='flex-end' width='max-content' margin='0 0 0 10px'>
                    <Button width='3vw' minWidth='60px' height='30px' _onClick={editComm}>수정</Button>
                </Grid>
            </Grid>
        </>
        )
    }

    return (
        <>  
            <Grid flex padding='10px 16px' border='1px solid #eee' margin='10px 0'>
                <Grid flex justify='flex-start' width='max-content'>
                    <Grid flex justify='flex-start' width='max-content' margin='0 2vw 0 0'>
                        <Image src={`/static/${props.userIcon}.jpg`} shape='circle' margin='0 1vw 0 0'/>
                        <Text bold='700'>{props.nickname}</Text>
                    </Grid>
                    <Text>{props.comment}</Text>
                </Grid>
                <Grid flex justify='flex-end' width='max-content'>
                    {(user_info?.uid === props.userId)&&(
                        <>
                            <ButtonEdit onClick={()=>{setEdit(true)}}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828q0.281-0.281 0.703-0.281t0.703 0.281l2.344 2.344q0.281 0.281 0.281 0.703t-0.281 0.703zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z"></path>
                                </svg>
                            </ButtonEdit>
                            <ButtonEdit onClick={()=>{deleteComm()}}>
                                <svg viewBox="0 0 24 24">
                                    <path d="M18.984 3.984v2.016h-13.969v-2.016h3.469l1.031-0.984h4.969l1.031 0.984h3.469zM6 18.984v-12h12v12q0 0.797-0.609 1.406t-1.406 0.609h-7.969q-0.797 0-1.406-0.609t-0.609-1.406z"></path>
                                </svg>
                            </ButtonEdit>
                        </>
                    )}
                    <Text color='#888' bold='300' size='12px'>{dateView(props.date)}</Text>
                </Grid>
            </Grid>
        </>
    );
};

CommentItem.defaultProps = {
    userIcon: 'https://cdn.imweb.me/upload/S20200903356594b8dc821/122e89b0892d2.jpg',
    nickname: '디벨로퍼',
    comment: '댓글입니다! 아마도요?',
    date: '2022-02-14 14:19:00',


}

const ButtonEdit = styled.button`
    border: 0;
    background-color: transparent;
    border-radius: 0;
    width: max-content;
    padding: 3px 0 0 0;
    margin-right: 4px;
    cursor: pointer;

    svg {
        overflow: visible;
        width: 18px;
        height: 18px;
        fill: #bbb;
        transition: 0.1s;

        &:hover{
            fill: #666;
        }
    }
`