import React from 'react'
import { Link } from 'react-router-dom';

import { MdOutlineBedroomParent } from "react-icons/md";
import { FaLandmark } from "react-icons/fa6";


function SingleItem({place , handleDelete}) {
    let {                
        _id,
        name,
        country,
        photoUrl,
        avgCost,
        seasonality,
        description,
        email,
        userName,
        visitorsPerYear,
        travelTime,
    } = place; 

    description =description.split(' ').slice(0, 15).join(' ');
  return (
      

<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <img className='w-full rounded-t-lg' style={{ height:'250px'}} src = {photoUrl} alt="" />
    <div class="p-5">
        
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
        
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <div className='flex gap-2'>
            <Link to = {`/details/${_id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Details
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
            {
                handleDelete &&
                <div className='flex gap-2'>
                    <Link to ={ `/update/${place._id}`} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Update 
                    </Link>
                    <button onClick={() => handleDelete(place._id)} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Delete
                    </button>
                </div>
                
            }

        </div>
    </div>
</div>

  )
}

export default SingleItem