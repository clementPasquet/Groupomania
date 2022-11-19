import { POST_ERRORS } from "./postActions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case POST_ERRORS:
      return {
        postError: action.payload,
      };
    default:
      return state;
  }
}
