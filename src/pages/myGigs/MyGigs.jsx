import React from 'react';
import {Link} from "react-router-dom";
import "./MyGigs.scss";
import {useQuery,useQueryClient,useMutation}from "@tanstack/react-query";
import getCurrentUser from '../../utils/getCurrentUser.js';
import newRequest from '../../utils/newRequests.js';


const MyGigs = () => {

  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const {isLoading , error ,data} = useQuery({

    queryKey:["myGigs"],
    queryFn:()=> 
    newRequest
    .get(`/gigs?userId=${currentUser.id}`).then((res) =>{
      return res.data
        }),
        
    });

    const mutation = useMutation({
      mutationFn:(id)=>{
          return newRequest.delete(`/gigs/${id}`);
      },
      onSuccess:()=>{
          queryClient.invalidateQueries("myGigs");
      }
    });

    const handleDelete = async(id)=>{
      mutation.mutate(id);
    }

  return (
    <div className='myGigs'>
      {isLoading?
      "loading":
      error?
      "somthing went wrong":
      (<div className='container'>
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add"><button>Add new Gig</button></Link>
           </div>
           <table>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Sales</th>
              <th>Action</th>
            </tr>
            {data.map((gig)=>(
            <tr key={gig._id}>
              <td>
                <img className='img' src={gig.cover} alt="" />
              </td>
              <td>
                {gig.title}
              </td>
              <td>
                {gig.price}
              </td>
              <td>
                {gig.sales}
              </td>
              <td>
                <img className='delete' src="/img/delete.png" alt="" onClick={()=>handleDelete(gig._id)}/>
              </td>
            </tr>))}
           </table>
      </div>)}
    </div>
  )
}

export default MyGigs;