import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

function HomePage() {
    const [places,setPlaces] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/places')
        .then(res => res.json())
        .then(data => setPlaces(data))
    },[])
    return(
        <div>
            {
                places.length
            }
        </div>
    )
}

export default HomePage