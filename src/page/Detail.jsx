import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import Post from "../component/Post";
import CommentList from "./../component/CommentList";
// import CommentWrite from "../component/CommentWrite";

const Detail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
//   const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector(state => state.post.list);
  const post_idx = post_list.findIndex((p) => p.id === +id);
  const post = post_list[post_idx];

  React.useEffect(() => {
    if (!post) {
        dispatch(postActions.getOnePostDB(id));
    }
  }, []);

  return (
    <>
      <Post {...post} />
      {/* <CommentWrite /> */}
      <CommentList />
    </>
  );
};

export default Detail;
