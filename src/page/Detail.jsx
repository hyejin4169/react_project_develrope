import React from 'react';
// import CommentWrite from '../component/CommentWrite';
import Post from '../component/Post';
import CommentList from './../component/CommentList';

const Detail = () => {
    return (
        <>
            <Post/>
            {/* <CommentWrite/> */}
            <CommentList/>
        </>
    );
};

export default Detail;