import React from "react";
import styled from "styled-components";

import Post from "../component/Post";
import UserList from "../component/UserList";
import { Grid } from "../elements";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";


const Main = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
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
          {post_list.map((p, idx) => {
            return (
              <Grid
                key={p}
                margin="0 0 50px 0"
                _onClick={() => {
                  history.push(`/detail/${p.id}`);
                }}
              >
                <Post key={idx} {...p} />
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
