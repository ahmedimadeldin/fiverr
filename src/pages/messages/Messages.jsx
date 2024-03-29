import React from 'react'
import {Link, useParams} from "react-router-dom";
import moment from "moment";
import {useQuery,useMutation, useQueryClient} from "@tanstack/react-query"
// import { newRequest } from "../../utils/newRequests.js";
import newRequest from "../../utils/newRequests.js"
import "./Messages.scss";

const Messages = () => {
   
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  
  
  const queryClient = useQueryClient();

  const {isLoading , error ,data} = useQuery({
      queryKey:["conversations"],
      queryFn:()=> 
      newRequest
      .get(`/conversations`).then((res) =>{
        return res.data
      }),
      
  });


  const mutation = useMutation({
    mutationFn:(id)=>{
        return newRequest.put(`/conversation/${id}`)
    },
    onSuccess:()=>{
        queryClient.invalidateQueries("conversations");
    }
});

  const handleRead = (id)=>{
    mutation.mutate(id);

  }

  return (
    <div className='messages'>
      {isLoading?
      "Loaing":
      error ?
      "somthing went wromg":
      (<div className='container'>
        <div className="title">
          <h1>Messages</h1>
           </div>
           <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last message</th>
              <th>Date</th>
              <th>Action </th>
            </tr>
            {data.map((c) =>(
            <tr key={c.id} className={
              (currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) 
              && 'active'}>
              <td>
                {currentUser.isSeller ? c.buyerId : c.sellerId}
              </td>
              <td>
                <Link to={`/message/${c.id}`} className='link'>
                  {c.lastMessage?.substring(0,70)+"..."}
                  </Link>  
              </td>
              <td>
                 {moment(c.updatedAt).fromNow()}
              </td>
              <td>{
                (currentUser.isSeller && !c.readBySeller) || (!currentUser.isSeller && !c.readByBuyer) &&
                  <button onClick={()=> handleRead(c.id)}>Mark as read</button>}

              </td>
              
            </tr>))}
            
           </table>
      </div>)}
    </div>
  )
}

export default Messages;