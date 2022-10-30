import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Like from "../components/Like";
import DeletePost from "../components/DeletePost";
import { getPosts, updatePost } from "../reducers/postActions";
import Comments from "../components/Comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { addBackendUrl } from "./Utils";
import moment from "moment";
import "moment/locale/fr";
moment.locale("fr");

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [activComments, setActivComments] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const dispatch = useDispatch();

  const updateCard = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate))
        .then(() => dispatch(getPosts()))
        .then(() => setTextUpdate(""));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    usersData.length && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="Card" key={post._id}>
      {isLoading ? null : (
        <>
          <div className="Card__content">
            <div className="Card__content--header">
              <img
                crossorigin="anonymous"
                className="Card__content--userPicture"
                src={
                  usersData &&
                  usersData.reduce((image, user) =>
                    user._id === post.postID ? user.image : image
                  )
                }
                alt="poster-pic"
              />
              <div className="Card__content--headerLeft">
                <div className="Card__content--pseudo">
                  <p>
                    {usersData &&
                      usersData.reduce(
                        (email, user) =>
                          user._id === post.postID ? user.email : email,
                        null
                      )}
                  </p>
                </div>

                <span className="date">
                  {moment(post.createdAt).format("LLLL")}
                </span>
              </div>
            </div>
            {post.postImage && (
              <img
                crossorigin="anonymous"
                src={addBackendUrl(post.postImage)}
                alt="card-img"
                className="Card__content--picture"
              />
            )}

            <p className="Card__content--text">{post.postText}</p>
            {isUpdated && (
              <div className="Card__content--modifyPost">
                <textarea
                  className="Card__content--formUpdate"
                  defaultValue={post.postText}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <button
                  className="Card__content--btnUpdate"
                  onClick={updateCard}
                >
                  Envoyer
                </button>
              </div>
            )}
            {activComments && <Comments post={post} />}

            <div className="Card__content--footer">
              {userData.isAdmin ? (
                <div className="updatePost">
                  <div onClick={() => setIsUpdated(!isUpdated)}>
                    <FontAwesomeIcon
                      className="updatePost__Icon"
                      icon={faPenToSquare}
                    />
                  </div>
                  <DeletePost id={post._id} />
                </div>
              ) : (
                userData._id === post.postID && (
                  <div className="updatePost">
                    <div onClick={() => setIsUpdated(!isUpdated)}>
                      <FontAwesomeIcon
                        className="updatePost__Icon"
                        icon={faPenToSquare}
                      />
                    </div>
                    <DeletePost id={post._id} />
                  </div>
                )
              )}

              <div className="postInteractions">
                <div className="postInteractions__content">
                  <FontAwesomeIcon
                    className="postInteractions__Icon"
                    icon={faEnvelope}
                    onClick={() => setActivComments(!activComments)}
                  />
                  <div className="postInteractions__Icon--number">
                    {post.coms.length}
                  </div>
                </div>
                <Like post={post} />
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
