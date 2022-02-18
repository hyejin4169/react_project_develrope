import React from "react";
import { Grid, Image, Text, Button } from "../elements";

import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import { dateView } from "../shared/time";
import styled from "styled-components";

const Post = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);

  const deletePost = () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      return dispatch(postActions.deletePostDB(props.postId));
    } else {
      return;
    };
  };

  return (
    <>
      <Grid border="1px solid #eee">
        <Grid flex padding="14px 16px" borderB="1px solid #eee">
          <Grid flex justify="flex-start" width="auto">
            <Image src={`/static/${props.userIcon}.jpg`} shape="circle" margin="0 10px 0 0" />
            <Text bold="700" size="18px">
              {props.nickname}
            </Text>
          </Grid>

          <Grid flex justify='flex-end'>
            {props.userId === user_info?.uid ? (
              <ButtonEdit onClick={(e)=>{e.stopPropagation();
                    history.push(`/write/${props.postId}`);}}>
                  <svg viewBox="0 0 24 24">
                      <path d="M20.719 7.031l-1.828 1.828-3.75-3.75 1.828-1.828q0.281-0.281 0.703-0.281t0.703 0.281l2.344 2.344q0.281 0.281 0.281 0.703t-0.281 0.703zM3 17.25l11.063-11.063 3.75 3.75-11.063 11.063h-3.75v-3.75z"></path>
                  </svg>
              </ButtonEdit>
            ) : null}

            {props.userId === user_info?.uid ? (
              <ButtonEdit onClick={(e)=>{e.stopPropagation(); deletePost();}}>
                  <svg viewBox="0 0 24 24">
                      <path d="M18.984 3.984v2.016h-13.969v-2.016h3.469l1.031-0.984h4.969l1.031 0.984h3.469zM6 18.984v-12h12v12q0 0.797-0.609 1.406t-1.406 0.609h-7.969q-0.797 0-1.406-0.609t-0.609-1.406z"></path>
                  </svg>
              </ButtonEdit>
            ) : null}
            <Grid width='max-content'>
              <Text width="max-content" color="#888" bold="300" >
                {dateView(props.date)}
              </Text>
            </Grid>
          </Grid>
        </Grid>

        <Grid>
          <Grid padding="20px 16px 25px">
            <Text space="0em" width='auto'>{props.content}</Text>
          </Grid>
          <Image src={props.imgUrl} shape="rectangle" />
        </Grid>

        <Grid padding="16px" flex justify='flex-start' align='center'>
          <CommentIcon>
            <svg viewBox="0 0 24 24">
                <path d="M18 8.016v-2.016h-12v2.016h12zM14.016 14.016v-2.016h-8.016v2.016h8.016zM6 9v2.016h12v-2.016h-12zM20.016 2.016q0.797 0 1.383 0.586t0.586 1.383v12q0 0.797-0.586 1.406t-1.383 0.609h-14.016l-3.984 3.984v-18q0-0.797 0.586-1.383t1.383-0.586h16.031z"></path>
            </svg>
          </CommentIcon>
          <Text bold="600" size="15px" >
            {props.comment_cnt}
          </Text>
        </Grid>
      </Grid>
    </>
  );
};

//필요한 props를 미리 넘겨놓는 방식
Post.defaultProps = {
  nickname: "디벨로퍼",
  userIcon:
    "https://cdn.imweb.me/upload/S20200903356594b8dc821/122e89b0892d2.jpg",
  date: "2021-04-19",
  content: "푹 쉴 수 있다면 얼마나 좋을까요?",
  imgUrl:
    "https://cdn.imweb.me/upload/S20200903356594b8dc821/122e89b0892d2.jpg",
  comment_cnt: 0,
};

const ButtonEdit = styled.button`
    border: 0;
    background-color: transparent;
    border-radius: 0;
    width: max-content;
    padding: 3px 0 0 0;
    margin-right: 4px;
    cursor: pointer;
    margin-right: 4px;
    
    &:last-of-type{
      margin-right: 15px;
    }

    svg {
        overflow: visible;
        width: 20px;
        height: 20px;
        fill: #bbb;
        transition: 0.1s;

        &:hover{
          fill: #666;
        }
    }
`;

const CommentIcon = styled.div`
  svg {
        overflow: visible;
        width: 25px;
        height: 25px;
        margin: 5px 5px 0 0;
        fill: #bbb;
        transition: 0.1s;
  }
`

export default Post;
