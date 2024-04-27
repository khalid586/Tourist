import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';


function AddTouristSpot() {
    const {user} = useContext(AuthContext);
    console.log(user)
  

    const [places,setPlaces] = useState([]);
    const [tab,setTab] = useState(true);

    useEffect(()=>{
        fetch(`http://localhost:5000/places/${user.email}`)
        .then(res => res.json())
        .then(data => setPlaces(data))
    },[])

    function handleDelete(placeId){
        fetch(`http://localhost:5000/places/${placeId}`,{
            method:'delete',
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount){
                const currplaces = places.filter(place => place._id != placeId)
                setPlaces(currplaces);
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const country = form.country.value;
        const photoUrl = form.photoUrl.value;
        const email = user.email;
        const place = {name,country,photoUrl,email};

        form.reset();

        fetch('http://localhost:5000/places/',{
            method:'post',
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify(place)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged) toast.success('Spot added successfully')
            setPlaces([...places,place]);
            setTimeout(()=>{
                setTab(!tab);
            },1500)
        })
    
    }

    const active = 'bg-green-400 text-white' , nonActive = 'bg-gray-100 text-black';

    return (
     <>
        <Helmet>
            <title>Tourist | Add spot</title>
        </Helmet>

        <div className='flex justify-center m-4 p-2 gap-2 font-semibold'>
            <button className={`${tab ? active:nonActive}  px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(!tab)}>Add Spot</button>
            <button className={`${!tab ? active:nonActive} px-4 py-2 rounded-3xl  duration-500`} onClick={()=>setTab(!tab)}>Recently Added</button>
        </div>

        <div className=' m-4 p-4 rounded-lg flex justify-center'>
            
            {
                tab ?
                <form onSubmit={handleSubmit} className="min-w-80 mx-auto">
                <div className="mb-5 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place name</label>
                    <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="kuakata" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                    <input type="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Bangladesh" required />
                </div>

                <div className="mb-5 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                    <input type="text" name = 'photoUrl' id="photoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="https://picture.png"  required />
                </div>

                <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Place</button>
            
            </form> :

                <div >
                { places.length ?
                    places.map((place,index) => <li className='m-2 flex items-center gap-2' key = {index}><img style={{width:'70px',height:'50px'}} src={place.photoUrl}></img>{place.name} <button onClick={()=>handleDelete(place._id)} className='ml-4 bg-gray-200 p-1 rounded-full px-4'>Delete</button></li>)
                    :
                    <p>Recently no places have been added!</p>
                }
                </div>
            }
        </div>
        <ToastContainer></ToastContainer>
     </>
  )
}

export default AddTouristSpot