import React, { useEffect, useRef, useState } from 'react'
import "./Gigs.scss";
// import { gigs } from '../../data';
// import GigCard from 'src/components/gigCard/gigCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequests';
import { useLocation } from 'react-router-dom';


const Gigs = () => {
  const [open,setOpen] = useState(false);
  const [sort,setSort] =useState("sales");
  
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation();

  const {isLoading,error,data ,refetch} = useQuery({
    queryKey:["gigs"],
    queryFn:()=>
    newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then(res =>{
      return res.data
    }) 
  })

  const resort = (type)=>{
    setSort(type)
    setOpen(false)
  }

  useEffect(()=>{
    refetch();
  },[sort])

  const apply = ()=>{
    refetch();
  }

  return (
    <div className='gigs'>
      <div className="container">
        <span className='breadcrumbs'>FIVERR {`> GRAPHICS & DESIGN >`} </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundries of art and technology with Fiverr's AI artists
        </p>

        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type="text" placeholder='min' />
            <input type="text" placeholder='max' />
            <button onClick={apply}>Apply</button>

          </div>
          <div className="right">
            <span className='sortBy'>SortBy</span>
            <span className='sortType'>{sort === "sales" ? "BestSelling":"Newest"}</span>
            <img src="./img/down.png" alt="" onClick={()=>setOpen(!open)}/>
            {open && <div className="rightMenu">
              {sort === "sales" ? (<span  onClick={()=>resort("createdAt")} >Newest </span>) :
              ((<span onClick={()=>resort("sales")} >Best Selling</span>))}
              </div>}
          </div>
        </div>
           
        <div className="cards">
         {isLoading ?
         "loading":
         error?
         "something went wrong!" 
         :data.map(gig =>{
           // <GigCard key={gig._id} item = {gig} /> 
         }
         )}
        </div>

      </div>
    </div>
  )
}

export default Gigs;
