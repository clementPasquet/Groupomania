import React, { useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { UidContext } from "./AppContext";
import {likePost,unLikePost} from "../reducers/postActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbsUp, faHeart} from '@fortawesome/free-solid-svg-icons'



const Like = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch=useDispatch();

  const like =() =>{
    dispatch(likePost(post._id,uid))
    setLiked(true)
  }

  const unlike =() =>{
dispatch(unLikePost(post._id, uid))
    setLiked(false);

  }

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <div className="like">
     {uid && liked === false &&(
        <FontAwesomeIcon icon={faThumbsUp} onClick={like} />
     )} 
      {uid && liked === true &&(
        <FontAwesomeIcon icon={faHeart}  onClick={unlike} />
     )} 
     <span>{post.likers.length}</span>
    </div>
   

  );
};

export default Like;
