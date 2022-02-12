import React from 'react';
import { Grid, Image, Text } from '../elements';

const Post = (props) => {
    return (
        <>
            <Grid border='1px solid #eee'>
                <Grid flex  padding='14px 16px' borderB='1px solid #eee'>
                    <Grid flex justify='flex-start' width='auto'>
                        <Image src={props.userIcon} shape='circle' margin='0 10px 0 0'/>
                        <Text bold='700' size='18px'>{props.nickname}</Text>
                    </Grid>
                    <Text width='max-content' color='#888' bold='300'>{props.date}</Text>
                </Grid>
                <Grid>
                    <Grid padding='20px 16px 25px'>
                        <Text space='0em'>{props.content}</Text>
                    </Grid>
                    <Image src={props.imgUrl} shape='rectangle'/>
                </Grid>
                <Grid padding='16px'>
                    <Text bold='600' size='15px'>댓글 {props.comment_cnt}개</Text>
                </Grid>
            </Grid>
        </>
    );
};

Post.defaultProps = {
    nickname: '디벨로퍼',
    userIcon: 'https://cdn.imweb.me/upload/S20200903356594b8dc821/122e89b0892d2.jpg',
    date: '2021-04-19',
    content: '푹 쉴 수 있다면 얼마나 좋을까요?',
    imgUrl: 'https://cdn.imweb.me/upload/S20200903356594b8dc821/122e89b0892d2.jpg',
    comment_cnt: 0,

    
}

export default Post;