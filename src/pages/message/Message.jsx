import React from 'react'
import "./Message.scss";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query"
import { Link } from 'react-router-dom';
const Message = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {id} = useParams();

  const queryClient = useQueryClient();

  const {isLoading , error ,data} = useQuery({
    queryKey:["messages"],
    queryFn:()=> 
    newRequest
    .get(`/messages/${id}`).then((res) =>{
      return res.data
    }),
    
  });

  const mutation = useMutation({
    mutationFn:(message)=>{
        return newRequest.post(`/messages/`,message)
    },
    onSuccess:()=>{
        queryClient.invalidateQueries("messages");
    }
  });

  const handleSubmit = (e)=>{
    e.preventdefault()
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
        
    });
    e.target[0].value = "";
  }



  return (
    <div className='message'>
      <div className='container'>
        <span className="breadcrumbs">
          <Link to={"/messages"} className='link'>MESSAGES</Link>{"> JOHN DOE >"}
        </span>
        {isLoading?
        "loading":
        error?
        "somthing went wrong"
        :(<div className="messages">
          {data.map((m)=>
          (<div className={m.userId === currentUser._id ? "owner item" : "item"} key={m._id}>
            <img src="/img/noavatar.jpg" alt="" />
            <p>
              {m.desc}
            </p>
          </div>))}
          {/* <div className="item owner">
            <img src="/img/noavatar.jpg" alt="" />
            <p>Working on it , soon will deliver it</p>
          </div> */}
        </div>)}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
            <textarea placeholder='write a message' name="" id="" cols="30" rows="10"></textarea>
          <button type='submit'>Send</button>
          </form>
      </div>

    </div>
  )
}

export default Message;