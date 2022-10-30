import React, { useContext, useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { deleteComment, editComment, getPosts } from "../reducers/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { UidContext } from "./AppContext";

const EditComment = ({ comment, postId }) => {
  console.log(postId);
  const [isCommenter, setIsCommenter] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const submitEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };
  const submitDelete = () => {
    dispatch(deleteComment(postId, comment._id)).then(() =>
      dispatch(getPosts())
    );
  };

  useEffect(() => {
    if (uid === comment.commenterId) {
      setIsCommenter(true);
    }
  }, [uid, comment.commenterId]);

  return (
    <div className="editComment">
      {isCommenter === true && edit === false && (
        <button
          className="editComment__btnActiv "
          onClick={() => setEdit(!edit)}
        >
          Editer le commentaire
        </button>
      )}

      {isCommenter && edit && (
        //
        <form action="" onSubmit={submitEdit} className="editComment__form">
          <div className="editComment__left">
            <button
              className="editComment__btnActiv"
              onClick={() => setEdit(!edit)}
            >
              Annuler
            </button>
            <div
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire?")) {
                  submitDelete();
                }
              }}
            >
              <FontAwesomeIcon className="editComment__trash" icon={faTrash} />
            </div>
          </div>

          <input
            className="editComment__textArea"
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />

          <input className="editComment__btn" type="submit" value="Valider" />
        </form>
      )}
    </div>
  );
};

export default EditComment;
