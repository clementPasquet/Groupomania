import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
  DELETE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "./postActions";

export default function postReducer(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });

    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.postText,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postid);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            coms: post.coms.map((com) => {
              if (com._id === action.payload.commentId) {
                return {
                  ...com,
                  text: action.payload.text,
                };
              } else {
                return com;
              }
            }),
          };
        } else return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });

    default:
      return state;
  }
}
