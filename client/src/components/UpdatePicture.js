import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../reducers/postActions";
import { updateProfil } from "../reducers/userActions";

const UpdatePicture = () => {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [file, setFile] = useState(undefined);

  const submitPicture = (e) => {
    const sendPicture = (e) => {
      const data = new FormData();
      data.append("file", file);
      data.append("userId", userData._id);
      console.log("userdata", userData);

      dispatch(updateProfil(data, userData._id));
      dispatch(getPosts());
    };
    if (file) {
      sendPicture();
    }
  };

  return (
    <div className="updateProfil">
      <div className="updateProfil__content">
        <form action="" onSubmit={submitPicture}>
          <label className="updateProfil__label" htmlFor="file">
            Changer votre photo de profil
          </label>
          <input
            className="updateProfil__inputFile"
            type="file"
            id="file-upload"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="updateProfil__inputBtn"
            type="submit"
            value="Envoyer"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdatePicture;
