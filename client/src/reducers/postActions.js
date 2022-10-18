import axios from "axios";

//posts

export const GET_POSTS = "GET_POSTS";
export const CREATE_POST = "CREATE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";


export const CREATE_COMMENT ='CREATE_COMMENT';
export const EDIT_COMMENT ='EDIT_COMMENT';
export const DELETE_COMMENT ='DELETE_COMMENT';



export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(` ${process.env.REACT_APP_API_URL}api/post`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const createPost = (data) => {
  
  return (dispatch) => {
    console.log(data)
    data.set('postImage', data.get('file').path)
    return axios.post(`${process.env.REACT_APP_API_URL}api/post`, data);
     
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unLikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlikePost/` + postId,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, postText) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/` + postId,
      data: { postText },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { postText, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/` + postId,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};


export const createComment =(postId, commenterId,text,commenterEmail) =>{
  return(dispatch) =>{
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/coms-post/${postId}` ,
      data: { commenterId, text, commenterEmail },
    })
      .then((res) => {
        dispatch({ type: CREATE_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };

  }

  export const editComment =(postId, commentId,text) =>{
    return(dispatch) =>{
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/post/coms-update/${postId}` ,
        data: { commentId, text},
      })
        .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: { postId ,commentId,text} });
        })
        .catch((err) => console.log(err)); 
    };
  
    }

    export const deleteComment =(postId, commentId) =>{
      return(dispatch) =>{
        return axios({
          method: "patch",
          url: `${process.env.REACT_APP_API_URL}api/post/coms-delete/${postId}` ,
          data: { commentId},
        })
          .then((res) => {
            dispatch({ type:DELETE_COMMENT, payload: { postId ,commentId} });
          })
          .catch((err) => console.log(err)); 
      };
    
      }

