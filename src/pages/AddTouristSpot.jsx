import React, { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';


function AddTouristSpot() {
    const {place} = useContext(AuthContext);
    console.log(place)
  
    const loadedData = useLoaderData();

    const [places,setPlaces] = useState(loadedData);
    const [tab,setTab] = useState(true);

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
        const email = form.email.value;
        const place = {name,email};

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

        <div className='flex justify-center m-4 p-2 gap-2'>
            <button className={`${tab ? active:nonActive}  px-4 py-2 rounded-3xl`} onClick={()=>setTab(!tab)}>Add Spot</button>
            <button className={`${!tab ? active:nonActive} px-4 py-2 rounded-3xl`} onClick={()=>setTab(!tab)}>Added Spots</button>
        </div>

        <div className='m-4 p-4 rounded-lg'>
            
            <div>
                { !tab &&
                    places.map((place,index) => <li key = {index}>{place.name} --------- {place.email} <button onClick={()=>handleDelete(place._id)} className='ml-4 bg-gray-200 p-1 rounded-full px-4'>X</button></li>)
                }
            </div>
            {
                tab &&
                <form onSubmit={handleSubmit}>
                    <input required  className='m-4 rounded-lg' type="text" placeholder='name' name="name" id="name" />

                    <input  required className='m-4 rounded-lg' type="text" placeholder='email' name="email" id="email" />


                    <button className='bg-red-500 px-4 py-2 rounded-lg text-white' type="submit">Submit</button>
                </form>
            }
        </div>
        <ToastContainer></ToastContainer>
     </>
  )
}

export default AddTouristSpot