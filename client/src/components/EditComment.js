import React, { useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../reducers/postActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { UidContext } from './AppContext';


const EditComment = (comment,postId) => {
   const [isCommenter,setIsCommenter]=useState(false);
   const [edit, setEdit]=useState(false);
   const [text,setText]=useState("");
   const uid =useContext(UidContext);
   const dispatch= useDispatch();


   const submitEdit = (e) => {
e.preventDefault();

if(text){
    dispatch(editComment(postId,comment._id, text));
    setText('');
    setEdit(false);
}

   }
   const submitDelete =() => dispatch(deleteComment(postId,comment._id))

   useEffect(() => {
    const checkCommenter= () => {
      if (uid === comment.commenterId) {
        setIsCommenter(true);
      }
    };
    checkCommenter();
  }, [uid, comment.commenterId]);

    return (
        <div className ="editComment">
          {isCommenter  && edit === false &&(
            <span onClick={() => setEdit(!edit)}>
            edit
          </span>
          ) } 
           {isCommenter && edit  &&(
            <form action="" onSubmit={submitEdit} className="editcomment__form">
                <label htmlFor='text' onClick={() => setEdit(!edit)}>Editer</label>
                <br/>
                <input 
                type="text" 
                name="text" 
                onChange={(e)=> setText(e.target.value)}
                defaultValue={comment.text}
                />
                <br/>
                <div onClick={()=>{
                    if(window.confirm("Voulez-vous supprimer ce commentaire?")
                    ){
                        submitDelete();
                    }
                }}>
                < FontAwesomeIcon icon={faTrash}  />
                </div>
                <input type="submit" value="Valider" />
            </form>
          ) }   
        </div>
    );
};

export default EditComment;