import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2';
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import SingleItem from '../components/SingleItem';
import dotenv from 'dotenv';




function MyList() {

    const {user} = useContext(AuthContext);
    const [places,setPlaces] = useState([]);
    const [loading,setLoading] = useState(true);

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
                fetch(`https://b9a10-server-side-khalid586-theta.vercel.app/places/${placeId}`,{
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
        fetch(`https://b9a10-server-side-khalid586-theta.vercel.app/places/${user.email}`)
        .then(res => res.json())
        .then(data =>{
            //console.log(data);
            setPlaces(data);
            setLoading(false);
        })
        .catch(error =>{
            toast.error(error);
            setLoading(false);
        })
    },[])

    return (
        <div>
            <Helmet>
                <title>Tourist | My list</title>
            </Helmet>

            {
                loading ? <div className='w-full text-center'> <Spinner></Spinner></div>:

                <div className='text-center mx-4' >
                { 
                    places.length ?
                    <div className='mx-2 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                        {places.map((place,index) => 
                            <SingleItem place={place} handleDelete={handleDelete}></SingleItem>
                        )}
                    </div>
                    :
                    <p className = 'mt-4'>You haven't added any place!</p>
                }
                </div>
            }
        </div>
  )
}

export default MyList