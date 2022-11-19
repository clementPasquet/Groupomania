import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "./AppContext";
import { likePost, unLikePost } from "../reducers/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faHeart } from "@fortawesome/free-solid-svg-icons";

const Like = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unLikePost(post._id, uid));
    setLiked(false);
  };

  //le hook useEffect vérifie a la compilation du composant 
  //vérifie que le post recu en props est bien liké par l'utilisateur connecté
  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="postInteractions__content">
      {uid && liked === false && (
        <FontAwesomeIcon
          className="postInteractions__Icon"
          icon={faThumbsUp}
          onClick={like}
        />
      )}
      {uid && liked === true && (
        <FontAwesomeIcon
          className="postInteractions__iconHeart"
          icon={faHeart}
          onClick={unlike}
        />
      )}
      {uid && (
        <div className="postInteractions__Icon--number">
          {post.likers.length}
        </div>
      )}
    </div>
  );
};

export default Like;
