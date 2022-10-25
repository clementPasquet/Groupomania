import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../reducers/postActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeletePost = (props) => {
  const dispatch = useDispatch();
  const deleteCard = () => {
    console.log(props);
    dispatch(deletePost(props.id)).then(() => dispatch(getPosts()));
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
