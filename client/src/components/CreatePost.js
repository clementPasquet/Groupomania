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

  const submitPost = async (e) => {
    const data = new FormData();
    data.append("postID", userData._id);
    if (postText) {
      data.append("postText", postText);
    }

    if (file) {
      data.append("file", file);

      console.log(file);
    }

    await dispatch(createPost(data));
    setPostText("");
    setFile(undefined);
    dispatch(getPosts());
  };

  return (
    <>
      {uid ? (
        <div className="createPost__content">
          <img
            crossorigin="anonymous"
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

          <div className="createPost__addFile">
            <div>
              <FontAwesomeIcon className="createPost__iconImg" icon={faImage} />
            </div>
            <input
              className="createPost__inputFile"
              type="file"
              id="file-upload"
              name="file"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setFile(e.target.files[0])}
            />
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
