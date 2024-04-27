import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoCloudUploadOutline } from "react-icons/io5";



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
                        (place,index) =>
                        <Link key={index} to = {`details/${place._id}`} className=''>
                            <img className='rounded-xl' style={{ width:'500px', height: '300px' }} src={place.photoUrl}></img>
                            <div className='mx-2 my-1'>
                                <div className='flex items-center justify-between'>                            
                                    <p className='font-semibold flex gap-1 items-center'><FaLocationCrosshairs className='text-red-500'></FaLocationCrosshairs>{place.name}</p>
                                    <p className='flex gap-1 items-center font-semibold overflow-hidden overflow-ellipsis'><IoCloudUploadOutline className='text-blue-500 text-bold'></IoCloudUploadOutline><span className='text-xs'>{place.email}</span></p>
                                </div>
                                <p className='flex gap-1 items-center'><GrMapLocation className='text-green-400'></GrMapLocation>{place.country}</p>
                            </div>
                        </Link>
                    )
                }
            </div>
        </>
    )
}

export default HomePage