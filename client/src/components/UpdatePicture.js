import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UidContext } from './AppContext';



const UpdatePicture = () => {
    const [image, setImage] = useState("");
  const uid = useContext(UidContext);


    

    const submitPicture =(e) =>{
    e.preventDefault();

        axios({
            method :"put",
            url:` ${process.env.REACT_APP_API_URL}api/user/${uid}` ,
            withCredentials:true,
            data: {
             image
            }
          })
          .then ((res)=>{
           
           
              window.location.reload();
            
          })
          .catch((err)=>{
              console.log(err);
            });
         };
    
    return (
        <div>
          <input 
                type="file" 
                id="image-upload" 
                name="file" 
                accept =".jpg, .jpeg, .png" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                />
        <input className="submitImage__btn" type="submit" value="Valider" onClick={submitPicture} />

                

            
        </div>
    );
};

export default UpdatePicture;