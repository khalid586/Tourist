import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';



function HomePage() {
    const [places,setPlaces] = useState([]);
    const [loading,setLoading] = useState(true);
    const [allPlaces,setAllPlaces] = useState([]);
    const [tab,setTab] = useState(true);
    
    useEffect(()=>{
        fetch('https://b9a10-server-side-khalid586-theta.vercel.app/places')
        .then(res => res.json())
        .then(data => {
            setAllPlaces(data);
            setPlaces(data.slice(0,6)); 
            setLoading(false);
        })
        .catch(error =>{
            toast.error(error);
            setLoading(false);
        })
    },[])

    const active = 'bg-red-600 text-white' , nonActive = 'bg-gray-100 text-black';

    return(
        <div>
        <Helmet>
            <title>Tourist | Home</title>
        </Helmet>   


        <div className='flex justify-center m-4 p-2 gap-2 font-semibold'>
            <button className={`${tab ? active:nonActive}  px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(!tab)}>Recently Added</button>
            <button className={`${!tab ? active:nonActive} px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(!tab)}>All Spots</button>
        </div>  
        {
        
        loading ? <Spinner></Spinner>:
            <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4'>
            {
                tab && places.map(
                    (place,index) =>
                    <Link key={index} to = {`details/${place._id}`} className=''>
                        <img className='rounded-xl w-full' style={{ height: '300px' }} src={place.photoUrl} alt='place.img'></img>
                        <div className='mx-2 my-1'>
                            <div className='flex items-center justify-between'>                            
                                <p className='font-semibold flex gap-1 items-center'><FaLocationCrosshairs className='text-red-500'></FaLocationCrosshairs>{place.name}</p>
                                <p className='flex gap-1 items-center font-semibold overflow-hidden overflow-ellipsis'><MdCloudUpload className='text-blue-500 text-bold'></MdCloudUpload><span className='text-xs'>{place.userName?place.userName:place.email}</span></p>
                            </div>
                            <p className='flex gap-1 items-center'><GrMapLocation className='text-green-400'></GrMapLocation>{place.country}</p>
                        </div>
                    </Link>
                )

                
            }
            {
                !tab && allPlaces.map(
                    (place,index) =>
                    <Link key={index} to = {`details/${place._id}`} className=''>
                        <img className='rounded-xl w-full' style={{ height: '300px' }} src={place.photoUrl} alt='place.img'></img>
                        <div className='mx-2 my-1'>
                            <div className='flex items-center justify-between'>                            
                                <p className='font-semibold flex gap-1 items-center'><FaLocationCrosshairs className='text-red-500'></FaLocationCrosshairs>{place.name}</p>
                                <p className='flex gap-1 items-center font-semibold overflow-hidden overflow-ellipsis'><MdCloudUpload className='text-blue-500 text-bold'></MdCloudUpload><span className='text-xs'>{place.userName?place.userName:place.email}</span></p>
                            </div>
                            <p className='flex gap-1 items-center'><GrMapLocation className='text-green-400'></GrMapLocation>{place.country}</p>
                        </div>
                    </Link>
                )
            }
            </div>
        }   
        </div>
    )
}

export default HomePage