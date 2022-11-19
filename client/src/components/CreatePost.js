import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, getPosts } from "../reducers/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { UidContext } from "./AppContext";
import UpdatePicture from "./UpdatePicture";

const CreatePost = () => {
  const uid = useContext(UidContext);

  const [postText, setPostText] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.errorReducer.postError);

  const submitPost = async (e) => {
    //on crée un objet data de type FormData dans lequel on ajoute de maniere conditionnelle le file et/ou le text du post
    //on utilise ensuite un dispatch en faisant appelle a createPost pour envoyer a la BD et au store la data du nouveu post
    //enfin on reinitialise le state du texte et du file puis on récupère de nouveaux les informations des posts
    const data = new FormData();
    data.append("postID", userData._id);
    if (postText || file) {
      if (postText) {
        data.append("postText", postText);
      }

      if (file) {
        data.append("file", file);
      }
      await dispatch(createPost(data));
      setPostText("");
      setFile(undefined);
      dispatch(getPosts());
    } else {
      alert("Veuillez écrire quelque chose ou importer une image ");
    }
  };

  return (
    <>
      {uid ? (
        <div className="createPost__content">
          <img
            crossOrigin="anonymous"
            className="createPost__profilImage"
            src={userData.image}
            alt="user-profil"
          />
          <UpdatePicture />

          <textarea
            className="createPost__postForm"
            name="postText"
            id="postText"
            placeholder="Que voulez vous dire ?"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          />
          {error && <div className="createPost__postError"> {error} </div>}
          <div className="createPost__addFile">
            <label htmlFor="file-uploadPost">
              <FontAwesomeIcon className="createPost__iconImg" icon={faImage} />

              <input
                className="createPost__inputFile"
                type="file"
                id="file-uploadPost"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>

          <button className="createPost__sendForm" onClick={submitPost}>
            Envoyer
          </button>
        </div>
      ) : (
        <h3 className="createPost__noId">Veuillez vous connecter</h3>
      )}
    </>
  );
};

export default CreatePost;
