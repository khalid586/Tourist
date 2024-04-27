import React, { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

function AddTouristSpot() {
    const {place} = useContext(AuthContext);
    console.log(place)
  
    const loadedData = useLoaderData();

    const [places,setPlaces] = useState(loadedData);

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
            console.log(data);
            setPlaces([...places,place]);
        })
    
    }

    return (
        <div className='m-4 p-4 rounded-lg'>
            
            <div>
                {
                    places.map(place => <li key = {place._id}>{place.name} --------- {place.email} <button onClick={()=>handleDelete(place._id)} className='ml-4 bg-gray-200 p-1 rounded-full px-4'>X</button></li>)
                }
            </div>

            <form onSubmit={handleSubmit}>
                <input required  className='m-4 rounded-lg' type="text" placeholder='name' name="name" id="name" />

                <input  required className='m-4 rounded-lg' type="text" placeholder='email' name="email" id="email" />


                <button className='bg-red-500 px-4 py-2 rounded-lg text-white' type="submit">Submit</button>
            </form>
        </div>
  )
}

export default AddTouristSpot