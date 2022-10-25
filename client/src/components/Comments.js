import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../components/Utils";
import { createComment, getPosts } from "../reducers/postActions";
import EditComment from "./EditComment";

const Comments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const commentSubmit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(createComment(post._id, userData._id, text, userData.email))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments">
      {post.coms.map((com) => {
        return (
          <div className="comments__content" key={com._id}>
            <div className="comments__content--header">
              <img
                crossorigin="anonymous"
                className="comments__content--userPicture"
                src={
                  !isEmpty(usersData[0]) &&
                  usersData.reduce((image, user) =>
                    user._id === post.postID ? user.image : image
                  )
                }
                alt="poster-pic"
              />

              <div className="comments__content--top">
                <div>
                  <p className="comments__pseudo">{com.commenterEmail}</p>
                </div>
                <span className="comments__date">{com.timestamp}</span>
              </div>
            </div>
            <div>
              <p className="comments__content--text">{com.text}</p>
              <EditComment comment={com} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <div className="comments__form">
          <form action="" onSubmit={commentSubmit}>
            <input
              className="comments__content--input"
              type="text"
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
              placeholder="Laisser un commentaire"
            />
            <br />
            <input
              className="comments__content--btn"
              type="submit"
              value="Envoyer"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
