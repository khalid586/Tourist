import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';

function HomePage() {
    const [places,setPlaces] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/places')
        .then(res => res.json())
        .then(data => setPlaces(data))
    },[])


    return(
        <>
        <Helmet>
            <title>Tourist | Home</title>
        </Helmet>        
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 m-4'>
                {
                    places.map(
                        place =>
                        <div>
                            <img src={place.photoUrl}></img>
                            <p className='font-semibold '>{place.name}</p>
                            <p className=''>{place.country}</p>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default HomePage