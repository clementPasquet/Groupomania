import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createPost,getPosts} from '../reducers/postActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-regular-svg-icons'



const CreatePost = () => {
    const [postText,setPostText]= useState("");
    const [postImage, setPostImage]=useState(null);
    const [file ,setFile]=useState();
    const userData = useSelector((state)=> state.userReducer);
    const dispatch =useDispatch();
 
    const submitPicture =(e) =>{
      setPostImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);

   };
    const submitPost = async (e) => {
     
      
      if(postText || postImage){
        const data =new FormData();
        data.append('postID',userData._id);
        data.append('postText',postText);
        
          
        if(file) {data.append('file',file)
           
           console.log(file)}
       
        await dispatch (createPost(data))
        dispatch(getPosts())
      }
       };


   
       

    return (
       <div className ="createPost">
        <div className ="profilImage">
          <img src={userData.picture} alt="user-profil" />
        </div>
       <div className="postForm">
        <textarea
        name="postText"
        id="postText"
        placeholder="Que voulez vous dire ?"
        onChange={(e)=> setPostText(e.target.value)}
        value={postText}
        />
       </div>
        <div className="createPost__addFile">
        <div className="iconImg">
        <FontAwesomeIcon icon={faImage} />
        </div>
          <input className="inputFile" type="file" id="file-upload" name="file" accept =".jpg, .jpeg, .png" onChange={(e) => submitPicture(e)} />
        </div>

      <button className="createPost__sendForm" onClick={submitPost}>Envoyer</button>
       </div>
    );
};

export default CreatePost;