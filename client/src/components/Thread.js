import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../reducers/postActions";
import Card from "./Card";

const Thread = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div>
      <ul className="thread-container">
        {posts[0] ? (
          posts.map((post) => {
            return <Card post={post} key={post._id} />;
          })
        ) : (
          <div className="threadNull">Soyer le premier a poster !</div>
        )}
      </ul>
    </div>
  );
};

export default Thread;
