import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { deletePost, getPosts } from "../reducers/postActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const DeletePost = (props) => {
const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const deleteCard = () => {
    dispatch(deletePost(props.id,userData._id,userData.isAdmin)).then(() => dispatch(getPosts()));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer cet article ?")) {
          deleteCard();
        }
      }}
    >
      <FontAwesomeIcon className="updatePost__Icon" icon={faTrash} />
    </div>
  );
};

export default DeletePost;
