import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured';
import TrustedBy from '../../components/trustedBy/TrustedBy';
import Slide from '../../components/Slide/Slide';
import { cards,projects } from '../../data.js';
import CatCard from '../../components/catCard/CatCard';
import Features from '../../components/features/Features';
import Business from '../../components/business/Business';
// import SimpleSlider from '../../components/Slide/Slide';
const Home = () => {

  return (
    <div className='home'>
      <Featured/>
      <TrustedBy/>
      <Slide slidesToShow={5} slidesToScroll={5}>
        {cards.map(card=>(
          <CatCard key={card.id} item={card}/>
        ))} 
      </Slide>
      
      <Features/>
      <Slide slidesToShow={5} slidesToScroll={5}>
        {projects.map((card)=>{
          <projectCard key={card.id} item={card}/>
        })}
      </Slide>
      < Business/>
      
      
    </div>
  )
}

export default Home;
