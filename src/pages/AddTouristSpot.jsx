import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import SingleItem from '../components/SingleItem';
import dotenv from 'dotenv';



function AddTouristSpot() {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
  

    const [places,setPlaces] = useState([]);
    const [tab,setTab] = useState(1);

    useEffect(()=>{
        fetch(`https://b9a10-server-side-khalid586-theta.vercel.app/places/${user.email}`)
        .then(res => res.json())
        .then(data => setPlaces(data))
    },[])

    const [charLeft,setCharLeft] = useState(0);

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const country = form.country.value;
        const photoUrl = form.photoUrl.value;
        const location = form.location.value;
        const avgCost = form.avgCost.value;
        const travelTime = form.travelTime.value;
        const visitorsPerYear = form.visitorsPerYear.value;
        const description = form.description.value;
        const email = user.email;
        const userName = user.displayName;

        setCharLeft(0);

        if(error){
            toast.error('Invalid image url provided')
        }

        if(70 - description.length > 0){
            setCharLeft(70 - description.length);
            return;
        }
    
        // Extract the values of selected checkboxes and store them in an array
        const seasonality = Array.from(form.querySelectorAll('input[name="seasonality"]:checked')).map(input => input.value);
    
        const place = { name, country, photoUrl, location, avgCost, travelTime, visitorsPerYear, description, email, userName, seasonality };
    
        form.reset();

        fetch('https://b9a10-server-side-khalid586-theta.vercel.app/places/',{
            method:'post',
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify(place)
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            if(data.acknowledged) toast.success('Spot added successfully')
            setPlaces([...places,place]);
            setTimeout(()=>{
                navigate('/')
            },1500)
        })
    
    }
    const [url,setUrl] = useState('https://i.ibb.co/r0d6F7Y/pexels-photo-3881104.jpg');
    const [error,setError] = useState(false);


    function checkUrl(e){
        const currUrl = e.target.value;
        setUrl(currUrl); 
        setError(false)

    }

    const active = 'bg-green-400 text-white' , nonActive = 'bg-gray-100 text-black';
    const desc = "Nestled within a vibrant cityscape, this lush garden sanctuary captivates visitors with its serene ambiance and vibrant flora. Verdant pathways wind through a tapestry of colorful blooms and verdant foliage, inviting tranquil moments of reflection amidst nature's embrace. Aromatic scents dance on the breeze, soothing the soul and rejuvenating the spirit."
    return (
     <>
        <Helmet>
            <title>Tourist | Add spot</title>
        </Helmet>

        <div className='text-xs flex justify-center m-4 p-2 gap-2 font-semibold'>
            <button className={`${tab === 1? active:nonActive}  px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(1)}>Add spot</button>
            <button className={`${tab === 2 ? active:nonActive} px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(2)}>Added spots</button>
        </div> 

        {   tab === 2 && places.length > 0 &&
            <div className='text-center'> 
                Hello <span className='font-bold'>{ user.displayName? user.displayName : user.email }</span> you have added following places
            </div> 
        }

        <div className=' m-4 p-4 rounded-lg flex justify-center'>
            {
                tab === 1 ?
                <form onSubmit={handleSubmit} className="min-w-80 mx-auto ">

                    <img className='hidden' src={url} alt="alternate image" onError={() => setError(true)} />
                    <div className="mb-5 flex gap-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place name</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Inani Beach" required />
                        </div>
                        
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                            <input onChange={checkUrl} type="text" name = 'photoUrl' id="photoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="https://picture.png"  required />
                            <div className='h-5'>                            
                                { error && <p className='text-xs text-red-500'>Invalid url</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                            <input type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Cox's Bazar" required />
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <input type="text" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Bangladesh" required />
                        </div>
                    </div>


                    <div className="mb-5 flex gap-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Average Cost</label>
                            <input type="number" name = 'avgCost' id="avgCost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="75000"  required />
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Travel Time (Days)</label>
                            <input type="number" name = 'travelTime' id="travelTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="7"  required />
                        </div>
                    </div>
                    <div className="mb-5 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total visitors/year</label>
                        <input type="number" name = 'visitorsPerYear' id="visitorsPerYear" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="7000"  required />
                    </div>
                    <div className="mb-5 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Description</label>
                        <input type="text" defaultValue={desc} name = 'description' id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
                        {charLeft > 0 && <p className='text-red-500 text-xs'> Description should be more than 70 characters. {charLeft} characters left</p>}
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seasonality</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="inline-flex items-center">
                                <input type="checkbox" name="seasonality" value="winter" className="form-checkbox h-4 w-4 text-green-500" />
                                <span className="ml-2 text-sm">Winter</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" name="seasonality" value="summer" className="form-checkbox h-4 w-4 text-green-500" />
                                <span className="ml-2 text-sm">Summer</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="checkbox" name="seasonality" value="fall" className="form-checkbox h-4 w-4 text-green-500" />
                                <span className="ml-2 text-sm">Fall</span>
                            </label>
                            {/* Add more checkboxes for other seasons */}
                        </div>
                    </div>


                    <button type="submit" className="mt-2 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Place</button>
                
                </form> :

                <div className=''>
                { places.length ?
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {places.map((place,index) => 
                            <SingleItem place={place}></SingleItem>
                        )}
                    </div>
                    :
                    <p className>Recently no places have been added!</p>
                }
                </div>
            }
        </div>
        <ToastContainer></ToastContainer>
     </>
  )
}

export default AddTouristSpot