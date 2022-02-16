import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  // const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  const post_id = props.match.params.id;
  console.log("post_id : ", post_id)
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.postId === +post_id) : null;
  console.log("_post : ", _post)

  const [contents, setContents] = React.useState(_post ? _post.content : ''); //수정기능
  //post 있는 경우엔 contents 넣어주고 없으면 빈값
  const [disabled, setDisabled] = React.useState(false);

  // React.useEffect(() => {
  //   if (!preview || !contents) {
  //     setDisabled(false);
  //   } else {
  //     setDisabled(true);
  //   }
  // }, [preview, contents]);

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    // if (is_edit) {
    //   dispatch(imageActions.setPreview(_post.image_url));
    // }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    if (!contents) {
      window.alert("내용을 작성해주세요!");
      return;
    }
    // if (!preview) {
    //   window.alert("이미지를 업로드해주세요!");
    //   return;
    // }
    dispatch(postActions.addPostDB(contents));
  };

  const editPost = () => {
    if (!contents) {
      window.alert("내용을 작성해주세요!");
      return;
    }
    dispatch(postActions.editPostDB(contents, post_id));
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          앗 잠깐!
        </Text>
        <Text size="16px">로그인 후에만 글을 쓸 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text margin="0px" size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        {/* <Upload /> */}
      </Grid>

      <Grid>
        <Grid pading="16px">
          <Text margin="0px" size="24px" bold>
            미리보기
          </Text>
          <Upload />
        </Grid>

        <Image
          shape="rectangle"
          src={"https://via.placeholder.com/400x300"}
        />
      </Grid>

      <Grid flex padding="16px">
        <Input
          value={contents} //수정기능: 먼저 value 넘겨줌
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button
            text="게시글 수정"
            _onClick={editPost}
            disabled={disabled}
          ></Button>
        ) : (
          <Button
            text="게시글 작성"

            _onClick={addPost}
            disabled={disabled}
          ></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
