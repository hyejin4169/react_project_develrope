import React from "react";
import { Grid, Image, Text, Button } from "../elements";

// import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";

const Post = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);

  return (
    <>
      <Grid border="1px solid #eee">
        <Grid flex padding="14px 16px" borderB="1px solid #eee">
          <Grid flex justify="flex-start" width="auto">
            <Image src={props.userIcon} shape="circle" margin="0 10px 0 0" />
            <Text bold="700" size="18px">
              {props.nickname}
            </Text>
          </Grid>

          <Grid is_flex width="auto">
          <Text>{props.insert_dt}</Text>
          {props.is_me && (
            <Button
              width="auto"
              margin="4px"
              padding="4px"
              _onClick={() => {
                history.push(`/write/${props.id}`);
              }}
            >
              수정
            </Button>
          )}
          
          {props.is_me && (
            <Button
              width="auto"
              margin="4px"
              padding="4px"
              _onClick={() => {
                dispatch(postActions.deletePostFB(props.id));
                // history.replace(`/`);
              }}
            >
              삭제
            </Button>
          )}
        </Grid>
          
          <Text width="max-content" color="#888" bold="300">
            {props.date}
          </Text>
        </Grid>

        <Grid>
          <Grid padding="20px 16px 25px"
>
            <Text space="0em">{props.content}</Text>
          </Grid>
          <Image src={props.imgUrl} shape="rectangle" />
        </Grid>

        <Grid padding="16px">
          <Text bold="600" size="15px">
            댓글 {props.comment_cnt}개
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

export default Post;
