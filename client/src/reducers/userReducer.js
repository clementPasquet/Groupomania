import { GET_USER, UPDATE_PROFIL } from "./userActions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPDATE_PROFIL:
      return action.payload;
    default:
      return state;
  }
}
