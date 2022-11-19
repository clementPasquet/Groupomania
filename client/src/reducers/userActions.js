import axios from "axios";

export const GET_USER = "GET_USER";

export const UPDATE_PROFIL = "UPDATE_PROFIL";
// cette fonction recupère les données relatives a l'utilisateur connecté et les envois au reducer
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(` ${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
// cette fonction envoi  au serveur et au reducer la data de l'image de profil
export const updateProfil = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({ type: UPDATE_PROFIL, payload: res.data.image });
          });
      })
      .catch((err) => console.log(err));
  };
};
