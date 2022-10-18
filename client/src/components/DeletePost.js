import React from 'react';
import {useDispatch} from 'react-redux'
import {deletePost} from '../reducers/postActions';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




const DeletePost = (props) => {
const dispatch = useDispatch();    
const deleteCard = () =>{
    console.log(props)
    dispatch(deletePost(props.id))
    window.location.reload();
    
}

    return (


        <div
        onClick={() => {
          if (window.confirm("Voulez-vous supprimer cet article ?")) {
            deleteCard();
          }
        }}
      >
        < FontAwesomeIcon icon={faTrash}  />
      </div>
    
    );
};

export default DeletePost;