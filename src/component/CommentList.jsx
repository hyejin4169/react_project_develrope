import React from 'react';
import { Image, Text } from '../elements';
import Grid from '../elements/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commActions } from '../redux/modules/comment';
import { dateView } from '../shared/time';

const CommentList = (props) => {
    const dispatch = useDispatch();
    const _comment_list = useSelector(state => state.comment.list[props.id]);
    const comment_list = _comment_list?.map(a=>a);

    comment_list?.sort((a,b) => {
            return(new Date(b.date).getTime() - new Date(a.date).getTime());
        })

    React.useEffect(() => {
        dispatch(commActions.getCommentDB(props.id))
    },[])

    return (
        <>
            <Grid>
                {
                    comment_list?.map(a=>{
                        return(
                            <CommentItem key={a.id} {...a}/>
                        )
                    })
                }              
            </Grid>
        </>
    );
};

export default CommentList;


const CommentItem = (props) => {

    return (
        <>  
            <Grid flex padding='10px 16px' border='1px solid #eee' margin='10px 0'>
                <Grid flex justify='flex-start' width='max-content'>
                    <Grid flex justify='flex-start' width='max-content' margin='0 2vw 0 0'>
                        <Image src={props.userIcon} shape='circle' margin='0 1vw 0 0'/>
                        <Text bold='700'>{props.nickname}</Text>
                    </Grid>
                    <Text>{props.comment}</Text>
                </Grid>
                <Text color='#888' bold='300' size='12px'>{dateView(props.date)}</Text>
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