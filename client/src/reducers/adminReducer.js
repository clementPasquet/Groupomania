import { GET_ADMIN } from "./userActions";

const initialState = {};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN:
      return action.payload;
    default:
      return state;
  }
}
