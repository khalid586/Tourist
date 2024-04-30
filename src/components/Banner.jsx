import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import Image from "next/image";
import { Carousel } from "keep-react";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';

function Banner({places}) {
    const fourPlaces = places.slice(0,4);
  return (
    <Carousel className='md:m-8' slideInterval={1000} showControls={true} indicators={true}>
    {
        fourPlaces.map((place,index) => 
                <img key={index} src= {place.photoUrl} alt="slider-2" />
        )
    }   
    </Carousel>
  )
}

export default Banner