import React from "react";
import { Grid, Text, Button, Input } from "../elements";
import Upload from "../shared/Upload";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import styled from "styled-components";
import { actionCreators as imageActions } from "../redux/modules/image";


const PostWrite = (props) => {
  const dispatch = useDispatch();

  const is_login = useSelector((state) => state.user.is_login);

  const preview = useSelector((state) => state.image.preview);

  const post_list = useSelector((state) => state.post.list);
  console.log(is_login);
  const post_id = props.match.params.id;
  console.log("post_id : ", post_id)
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.postId === +post_id) : null;
  console.log("_post : ", _post)

  const [contents, setContents] = React.useState(_post ? _post.content : ''); //수정기능
  //post 있는 경우엔 contents 넣어주고 없으면 빈값
  const [disabled, setDisabled] = React.useState(false);


  React.useEffect(() => {
    if (!preview || !contents) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [preview, contents]);

  React.useEffect(() => {
    if (is_edit && !_post) {
      console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      dispatch(imageActions.setPreview(_post.imgUrl));
    }
    if (!is_edit) {
      dispatch(imageActions.setPreview(null));
    }
  }, []);

  const changeContents = (e) => {
    setContents(e.target.value);
  };

  const addPost = () => {
    if (!contents) {
      window.alert("내용을 작성해주세요!");
      return;
    }
    if (!preview) {
      window.alert("이미지를 업로드해주세요!");
      return;
    }
    dispatch(postActions.addPostDB(contents));
  };


  const editPost = () => {
    if (!contents) {
      window.alert("내용을 작성해주세요!");
      return;
    }
    if (!preview) {
      window.alert("이미지를 업로드해주세요!");
      return;
    }
    dispatch(postActions.editPostDB(contents, post_id));
  };

 if(!is_login){
    return(
      <Grid flex direction='column' justify='center' align='center' padding='10vh 0 0 0'>
        <Text bold='700' size='30px'>앗, 포스팅 전에</Text>
        <Text bold='700' size='30px' margin='1vw 0 0 0'>먼저 로그인해주세요!</Text>
        <Button _onClick={()=>{history.replace('/login')}} width='15vw' minWidth='100px' margin='7vh 0 0 0'>로그인</Button>

  return (
    <>
      <Grid flex justify='center' padding='5vh 16px 0 16px' margin='5vh 0'>
        <Text margin="0px" size="30px" bold='700'>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>

      <Grid flex padding="16px">
        <Grid>
          <Grid margin='0 0 50px 0'>
            <Upload />
          </Grid>
          <Input
            value={contents} //수정기능: 먼저 value 넘겨줌
            _onChange={changeContents}
            label="게시글 내용"
            placeholder="포스팅 내용을 작성해주세요 :-)"
            multiLine
          />
        </Grid>
        <Grid ps='relative' radius='8px' overflow='hidden' margin='0 0 0 20px'>
          {preview ? (
            <Image
              shape="rectangle"
              src={preview}
            />
           ):(
            <PreviewBox/>          
           )}
        </Grid>
      </Grid>



      <Grid center padding="16px" margin='2vh 0 0 0'>
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
    </>
  );
};

const PreviewBox = styled.div`
  width: 100%;
  padding-top: 70%;
  background-color: #dedede;
  /* border-radius: 8px; */

    &::before{
      content: 'Preview';
      color: #888; 
      display: block;
      width: 30vw;
      height: 200px;
      font-size: 2.5vw;
      font-weight: 500;
      letter-spacing: -0.05em;
      text-align: center;
      line-height: 200px;
      position: absolute;
      top: calc(50% - 100px);
      left: calc(50% - 15vw);

    }
`;


export default PostWrite;
