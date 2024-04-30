import React from 'react'
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';


function MarqueeSlider({places}) {
  return (
       <Marquee pauseOnHover ={true} speed={70} >
            {places ?
                <div className='flex gap-16'>
                    {
                        places.map((place,index) => <Link key={index} className='flex flex-col justify-center items-center' to = {`details/${place._id}`}>
                            <img key={index} className = 'mx-16 rounded-full'  style={{ width: '70px' , height:'70px' }} 
                            src={place.photoUrl}  alt="" 
                            onError={(e)=>{
                                e.target.src = 'https://i.ibb.co/MDBxfMK/pexels-photo-1450360.jpg'; 
                            }}  
                        />
                        <p className='font-bold text-xs text-red-600'>{place.userName}</p>
                        </Link>
                        )
                    }
                </div>:

                <div>

                </div>

            } 
            
        </Marquee>
  )
}

export default MarqueeSlider