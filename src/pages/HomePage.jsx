import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import SingleItem from '../components/SingleItem';



function HomePage() {
    const [places,setPlaces] = useState([]);
    const [loading,setLoading] = useState(true);
    const [allPlaces,setAllPlaces] = useState([]);
    const [countries,setCountries] = useState([]);
    const [tab,setTab] = useState(1);
    const [sortedPlaces,setSortedPlaces] = useState([]);
    const [selectedCountry,setSelectedCountry] = useState('');


    function sortbyCountry(countryName,index){
        if(countryName == 'all'){
            const sorted = [...allPlaces]
            setSortedPlaces(sorted)
            setSelectedCountry('All countries');
            return;
        }
        const sorted = allPlaces.filter(item => item.country == countryName)
        setSortedPlaces(sorted);
        setSelectedCountry(countryName);
        toast(`Showing spots from ${countryName}`)
    }

    useEffect(()=>{
        fetch('https://b9a10-server-side-khalid586-theta.vercel.app/countries')
        .then(res => res.json())
        .then(data => {console.log(data); setCountries(data)})
    },[])
    
    useEffect(()=>{
        fetch('https://b9a10-server-side-khalid586-theta.vercel.app/places')
        .then(res => res.json())
        .then(data => {
            setAllPlaces(data);
            setPlaces(data.slice(0,6)); 
            setSortedPlaces(data);
            setLoading(false);
        })
        .catch(error =>{
            toast.error(error);
            setLoading(false);
        })
    },[])

    const active = 'bg-red-600 text-white' , nonActive = 'bg-gray-100 text-black';

    return(
        <div className=''>
        <Helmet>
            <title>Tourist | Home</title>
        </Helmet>   


        <div className='text-xs flex justify-center m-4 p-2 gap-2 font-semibold'>
            <button className={`${tab === 1? active:nonActive}  px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(1)}>Recently Added</button>
            <button className={`${tab === 2 ? active:nonActive} px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(2)}>Countries</button>
        </div>  
        {
        
        loading ? <Spinner></Spinner>:
            <div className='grid grid-col-1 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4'>
            {
                tab == 1 && places.map(
                    (place,index) =>
                    <button onClick={() => setLoading(!loading)}>
                        <Link key={index} to = {`details/${place._id}`} className=''>
                            <img className='rounded-xl w-full' style={{ height: '300px' }} src={place.photoUrl} alt='place.img'  onError={(e) => {
                                e.target.src = 'https://i.ibb.co/MDBxfMK/pexels-photo-1450360.jpg'; 
                                e.target.alt = 'Fallback Image'; 
                            }}></img>
                            <div className='mx-2 my-1'>
                                <div className='flex items-center justify-between'>                            
                                    <p className='font-semibold flex gap-1 items-center'><FaLocationCrosshairs className='text-red-500'></FaLocationCrosshairs>{place.name}</p>
                                    <p className='flex gap-1 items-center font-semibold overflow-hidden overflow-ellipsis'><MdCloudUpload className='text-blue-500 text-bold'></MdCloudUpload><span className='text-xs'>{place.userName?place.userName:place.email}</span></p>
                                </div>
                                <p className='flex gap-1 items-center'><GrMapLocation className='text-green-400'></GrMapLocation>{place.country}</p>
                            </div>
                        </Link>
                    </button>
                )

                
            }
            {
                tab == 2 && 
                <div className='w-[97vw] py-2'>
                    <div className='m-4 mb-6  text-center'>
                        <select value={selectedCountry} className='font-bold' onChange={(e) => sortbyCountry(e.target.value, e.target.selectedIndex)}>
                            <option value={"all"}>All countries</option>
                            {countries.map((country, index) => (
                            <option key={index} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className=' gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            sortedPlaces.map(place => <SingleItem place={place}></SingleItem>)
                        }
                    </div>
                </div>
            }
            </div>
        }   
        <ToastContainer></ToastContainer>
        </div>
    )
}

export default HomePage