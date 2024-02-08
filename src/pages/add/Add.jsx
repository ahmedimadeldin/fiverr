import React, { useReducer, useState } from 'react';
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from '../../reducers/gigReducer';
import upload from '../../utils/upload.js';
import newRequest from '../../utils/newRequests.js';
import { useQuery,useQueryClient,useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [singleFile,setSingleFile] = useState(undefined)
  const [files,setFiles] = useState([]);
  const [uploading,setUploading] = useState(false);

  const [state,dispatch] = useReducer(gigReducer,INITIAL_STATE);

  const handleChange = (e)=>{
    dispatch (
      {type: "CHANGE_INPUT" 
      , payload : {name: e.target.name , value: e.target.value}
    });
};
  const handleFeature = (e)=>{
    e.preventDefault();

   dispatch (
      {type: "ADD_FEATURE" 
      , payload: e.target[0].value,
    });
  };
  const handleUpload = async()=>{
    setUploading(true);
    try {
      const cover = upload(singleFile);

      const images = await Promise.all(
        [...files].map( async file =>{
          const url = await upload(file)
          return url;
        })
      );

      setUploading(false);
      dispatch({type:"ADD_IMAGES" , payload:{cover,images}} )
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:(gig)=>{
            return newRequest.post("/gigs",gig)
        },
        onSuccess:()=>{
            queryClient.invalidateQueries("myGigs");
        }
    });

  const handleSubmit = (e)=>{
    e.preventDefault();
    mutation.mutate(state);
    navigate("/mygigs");
  }

  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
        <div className="left">
               <label htmlFor="">Title</label>
               <input name='title' type="text" placeholder={`I will do something I'm really good at `} onChange={handleChange}/>
               <label htmlFor="">Category</label>
               <select name="cat" id="cat" onChange={handleChange}>
                <option value="desing">Design</option>
                <option value="web">Web Development</option>
                <option value="anmiation">Animation</option>

               </select>
               <div className="images">
                <div className="imagesInputs">

               <label htmlFor="">Cover Image</label>
               <input type="file" name="" id="" onChange={e => setSingleFile(e.target.files[0])} />
              
               <label htmlFor="">Upload Images</label>
              <input type="file" name="" id="" multiple onChange={e => setFiles(e.target.files)}/>
                </div>
                 <button onClick={handleUpload}>{uploading ? "uploading" :"upload"}</button>
               </div>
               <label htmlFor="">Description</label>
               <textarea name="desc" id="" cols="30" rows="16" onChange={handleChange}
               placeholder='Brief description to introduce your service to customers'></textarea>
              <button onClick={handleSubmit}>Create</button>
             </div>
        <div className="right">
          <label htmlFor="">Service Title</label>
          <input type="text" name="shortTitle" onChange={handleChange} id="" placeholder='e.g One-page web design'/>
          <label htmlFor="">Short Description</label>
          <textarea name="shortDesc" id="" cols="30" rows="10" placeholder='Short description of your service' onChange={handleChange}></textarea>
          <label htmlFor="">Delivery Time{"e.g. 3 days"}</label>
          <input type="number" name="deliveryTime" onChange={handleChange} id="" min={1} />
          <label htmlFor="">Revision Number</label>
          <input type="number" name="revisionNumber" id="" min={1} onChange={handleChange} />

          <label htmlFor="">Add features</label>
          <form className='add' action="" onSubmit={handleFeature}>
          <input className = "in"type="text" name="features" id="" placeholder='e.g page design' />
           <button>Add</button>
          </form>
          <div className="addedFeatures">
            {state?.features?.map((f)=>
            (<div className="item" key={f}>
               <button onClick={()=>dispatch({type:"REMOVE_FEATURE",payload:f})}>
                {f}
                <span>X</span>
               </button>
            </div>))}
          </div>
          <label htmlFor="">Price</label>
          <input type="number" name="price" id="" min={1} onChange={handleChange} />



            </div>
        </div>
      </div>
    </div>
  )
}

export default Add;