import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";
// import { useSelector, useDispatch } from "react-redux";
// import { actionCreators as postActions } from "../redux/modules/post";
// import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
    return (
        <React.Fragment>
          <Grid padding="16px">
            <Text margin="0px" size="36px" bold>
              게시글 작성
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
          </Grid>

          <Grid flex padding="16px">
          <Grid>
            <Image
              shape="rectangle"
            /></Grid>
            <Input
              label="게시글 내용"
              placeholder="게시글 작성"
              multiLine
            />
          </Grid>
    
          <Grid center padding="16px">
              {/* <Button
                text="게시글 수정"
              ></Button> */}
              <Button
                text="게시글 작성"
              ></Button>
          </Grid>
        </React.Fragment>
      );
    };

export default PostWrite;