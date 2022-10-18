import React from 'react';
import Navbar from '../components/Navbar';
import Thread from "../components/Thread";
import CreatePost from "../components/CreatePost";


const Feed = () => {
  
   return (
    <div className='feed'>
      <Navbar />
      <div className="createPost">
    <CreatePost /> 
      </div>
      <Thread />
   
    </div>
   );
};

export default Feed;