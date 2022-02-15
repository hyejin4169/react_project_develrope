import React from "react";
import styled from "styled-components";

import Post from "../component/Post";
import UserList from "../component/UserList";
import { Grid, Button } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";


const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  console.log("post_list : ", post_list)
//   const user_info = useSelector((state) => state.user.user);
  const { history } = (props);

    React.useEffect(() => {
      dispatch(postActions.getPostDB());
    }, []);

//   React.useEffect(() => {
//     if (post_list.length < 2) {
//         dispatch(postActions.getPostDB());
//     }
//   }, []);

  return (
    <>
      <Grid flex>
        <UserListWrap>
          <UserList />
        </UserListWrap>
        <Grid width="70%" margin="120px 0 0 0">
          {post_list?.map((p) => {
            return (
              <Grid
                key={p.postId}
                margin="0 0 50px 0"
                _onClick={() => {
                  history.push(`/detail/${p.postId}`);
                }}
              >
                <Post {...p}/>
              </Grid>
            );
          })}
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
          <Grid margin="0 0 50px 0">
            <Post />
          </Grid>
        </Grid>
      </Grid>
      <Button float_btn _onClick={() => {history.push("/write");}}></Button>
    </>
  );
};

const UserListWrap = styled.div`
  width: 28%;
  position: sticky;
  top: 0;
  left: 0;
  align-self: flex-start;
  padding-top: 120px;
`;

export default Main;
