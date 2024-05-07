import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useLoaderData } from 'react-router-dom';
import { GrMapLocation } from "react-icons/gr";
import { FaInstagram, FaLocationCrosshairs } from "react-icons/fa6";
import { MdCloudUpload } from "react-icons/md";
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import SingleItem from '../components/SingleItem';
import MarqueeSlider from '../components/MarqueeSlider';
import Banner from '../components/Banner';
import { AuthContext } from '../providers/AuthProvider';

function HomePage() {
    const [places,setPlaces] = useState([]);
    const [loading,setLoading] = useState(true);
    const [allPlaces,setAllPlaces] = useState([]);
    const [countries,setCountries] = useState([]);
    const [tab,setTab] = useState(1);
    const [sortedPlaces,setSortedPlaces] = useState([]);
    const [selectedCountry,setSelectedCountry] = useState('');
    const {user} = useContext(AuthContext);

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
            setPlaces(data.slice(0,8)); 
            setSortedPlaces(data);
            setLoading(false);
        })
        .catch(error =>{
            toast.error(error);
            setLoading(false);
        })
    },[])

    const active = 'bg-red-600 text-white' , nonActive = 'bg-gray-100 text-black';
    const [validities, setValidities] = useState([]); 

    return(
        <div className=''>
        <Helmet>
            <title>Tourist | Home</title>
        </Helmet>   


        {
            !loading &&
            <Banner places = {places}></Banner>
        }

        {
            !loading &&
            <div className='text-xs flex justify-center m-4 p-2 gap-2 font-semibold'>
                <button className={`${tab === 1? active:nonActive}  px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(1)}>Latest</button>
                <button className={`${tab === 2 ? active:nonActive} px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(2)}>Countries</button>
            </div>  
        }
        {
        
        loading ? <Spinner></Spinner>:
            <div className='mx-2'> 
            {
                tab == 1 && <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'> 
                
                {places.map(
                    (place,index) =>
                        <button key={index}  className='' onClick={() => setLoading(!loading)}>
                            <Link key={index} to = {`details/${place._id}`}>
                                <img className='rounded-xl border-b-4 duration-500 hover:border-red-500' style={{ height: '300px' , width:'100vh'}} src={place.photoUrl} alt='place.img' 
                                onError={(e) => {
                                    e.target.src = 'https://i.ibb.co/MDBxfMK/pexels-photo-1450360.jpg'; 
                                    e.target.alt = 'Fallback Image'; 
                                }}>
                                    
                                </img>
                                <div className='mx-2 my-1'>
                                    <div className='flex items-center justify-between'>                            
                                        <p className='font-semibold flex gap-1 items-center text-sm'><FaLocationCrosshairs className='text-red-500'></FaLocationCrosshairs>{place.name}</p>
                                        <p className='flex gap-1 items-center font-semibold overflow-hidden overflow-ellipsis'><MdCloudUpload className='text-blue-500 text-bold'></MdCloudUpload><span className='text-xs'>{place.userName?place.userName:place.email}</span></p>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='flex gap-1 items-center text-xs'><GrMapLocation className='text-green-400'></GrMapLocation>{place.country}</p>
                                        { user?.email == place.email && <p className='text-xs font-medium text-red-600 flex gap-1 items-center'><FaInstagram className='text-blue-600'></FaInstagram> by you</p>}
                                    </div>
                                </div>
                            </Link>
                        </button>
                    
                )}

            </div>
            }
            {
                tab == 2 && 
                <div className='w-[97vw] py-2 ml-2'>
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
             {
                !loading && 
                <p className='w-full min-w-[95vw] my-4 mb-8'>
                        <p className='my-8  mb-12 text-3xl font-bold text-center'>Thanks to the contributers</p>
                        <MarqueeSlider places = {places}></MarqueeSlider>
                        <p className='text-xs text-center my-8 font-bold text-blue-500'>Upload a place information to see yourself in the contributors list</p>
                </p>
             }
        </div>
    )
}

export default HomePage