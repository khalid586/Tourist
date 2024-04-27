import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';

function MyList() {

    const {user} = useContext(AuthContext);
    const [places,setPlaces] = useState([]);

    function handleDelete(placeId){

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/places/${placeId}`,{
                    method:'delete',
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.deletedCount){
                        const currplaces = places.filter(place => place._id != placeId)
                        setPlaces(currplaces);

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                })
            }
          });
        
    }


    useEffect(() =>{
        fetch(`http://localhost:5000/places/${user.email}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            setPlaces(data);
        })
    },[])

    return (
        <>
            <Helmet>
                <title>Tourist | My list</title>
            </Helmet>
            <div className='flex flex-col items-center'>
                { places.length ?
                    places.map((place,index) => <li className='m-2 flex items-center gap-2' key = {index}><img style={{width:'70px',height:'50px'}} src={place.photoUrl}></img>{place.name} <button onClick={()=>handleDelete(place._id)} className='ml-4 bg-gray-200 p-1 rounded-full px-4'>Delete</button></li>)
                    :
                    <p>Recently no places have been added!</p>
                }
            </div>
        </>
  )
}

export default MyList