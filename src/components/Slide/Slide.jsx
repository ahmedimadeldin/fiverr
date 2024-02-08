import React from 'react'
// import Slider from "infinite-react-carousel";
import Slider from "react-slick";
import "./Slide.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// export default function SimpleSlider() {
//     var settings = {
//       dots: true,
//       infinite: true,
//       speed: 500,
//       slidesToShow: 1,
//       slidesToScroll: 1
//     };
//     return (
//    
//     );
//   }

  const Slide = ({children,slidesToShow, slidesToScroll})=>{
    var settings = {
              dots: true,
              infinite: true,
              speed: 500
              ,slidesToShow :5,slidesToScroll :5
              
            };

            
      return (
        <div className="slide">
            <div className="container">
                   <Slider className="slider" {...settings}>
                      {children}
                   </Slider>

            </div>
        </div>
      )
  }
export default Slide;

// const Slide = ({children,slidesToShow,arrowScroll}) => {
//   return (
//     <div className='slide'>
//         <div className="container">
//           <Slider slidesToShow = {slidesToShow} arrowScroll={arrowScroll}>
//             {children}
//           </Slider>
            
//         </div>
//     </div>
//   )
// }

