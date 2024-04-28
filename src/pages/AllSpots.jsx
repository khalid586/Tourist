import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import SingleItem from '../components/SingleItem';
import { ToastContainer, toast } from 'react-toastify';
import { FaSortAlphaDown } from 'react-icons/fa';

function AllSpots() {

    const [sort,setSort] = useState(false);
    const [sortedPlaces,setSortedPlaces] = useState([]);

    useEffect(()=>{
        fetch('https://b9a10-server-side-khalid586-theta.vercel.app/places')
        .then(res => res.json())
        .then(data => setSortedPlaces(data))
    },[])

    function handleClick(){
        if(!sort){
            const sorted = [...sortedPlaces].sort((a, b) => a.avgCost - b.avgCost);
            setSortedPlaces(sorted);
            setSort(true);
            toast.success('Sorted successfully according to average cost')
        }else{
            toast.error('Already sorted according to average cost')
        }
    }

    return (
        <>
            <div className='w-full flex justify-center text-white font-semibold my-2'>
                 <button className='rounded-full px-4 py-2 bg-green-500 flex gap-2 items-center' onClick={handleClick}><FaSortAlphaDown className=''></FaSortAlphaDown> Sort</button>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4 my-4 gap-2'>
                {
                    sortedPlaces.map(place => <SingleItem applySort =  {true} place={place}></SingleItem>)
                }
                <ToastContainer></ToastContainer>
            </div>
        </>
    )
}

export default AllSpots