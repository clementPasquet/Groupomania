import React from "react";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { dateParser, isEmpty } from "./Utils";
import Like from "../components/Like";
import DeletePost from "../components/DeletePost"
import { updatePost } from "../reducers/postActions";
import Comments from "../components/Comments";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [isUpdated, setIsUpdated] = useState(false);
  const [activComments, setActivComments]=useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const dispatch =useDispatch();

  const updateCard =  () => {
    if(textUpdate) {
     dispatch(updatePost(post._id, textUpdate))
     window.location.reload()
    
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="Card" key={post._id}>
      {isLoading ? (
     null
      ) : (
        <>
          <div className="Card__picture">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.postID) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="Card__content">
            <div className="Card__content--Header">
              <div className="Card__content--pseudo">
                <h3>
                  {!isEmpty(userData[0]) &&
                    userData
                      .map((user) => {
                        console.log(user)
                        if (user._id === post.postID) return user.email;
                        else return null;
                      })
                      .join("")}
                </h3>
                <span>{dateParser(post.createdAt)}</span>
              </div>
              {post.postImage && (
              <img
                src={post.postImage}
                alt="card-img"
                className="Card__content--picture"
              />
            )}
            </div>
            <p>{post.postText}</p>
            {isUpdated && (
              <div className="modifyPost">
                <textarea
                  defaultValue={post.postText}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <button className="sendForm" onClick={updateCard}>
                  Envoyer
                </button>
              </div>
            )}
           <div className="Card__content--footer">
            {userData._id ===post.postID &&(
                <div className="updatePost">
                <div className="modifyPost__btn" onClick={()=> setIsUpdated(!isUpdated)}>
                    < FontAwesomeIcon icon={faPenToSquare} />
                </div>
                <DeletePost id={post._id} />
                </div>
            )}
            <div >
              <div className="comment-icon">
                <FontAwesomeIcon icon={faEnvelope} onClick={()=>setActivComments(!activComments)} />
                <span>{post.coms.length}</span>

              </div>
              <Like post={post} />
            </div>
            </div>
            {activComments && <Comments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
