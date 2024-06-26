import React, { useContext } from 'react'
import { Link } from 'react-router-dom';

import { MdOutlineBedroomParent, MdOutlineDelete, MdOutlineRateReview } from "react-icons/md";
import { FaInstagram, FaLandmark, FaMapPin } from "react-icons/fa6";
import { GrUpdate } from 'react-icons/gr';
import { FaMapMarkedAlt, FaMapMarkerAlt, FaRegCommentAlt, FaRegMoneyBillAlt } from 'react-icons/fa';
import { TbCoinTaka } from 'react-icons/tb';
import { GoCodeReview } from 'react-icons/go';
import { AuthContext } from '../providers/AuthProvider';


function SingleItem({place , handleDelete , applySort}) {
    const {user} = useContext(AuthContext);
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

    description =description.split('').slice(0, 60).join(''); 
  return (
        
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-4">
            <img className='w-full rounded-t-lg' style={{ height:'290px'}} src = {photoUrl} alt="" 
            onError={(e) => {
                e.target.src = 'https://i.ibb.co/MDBxfMK/pexels-photo-1450360.jpg'; 
                e.target.alt = 'Fallback Image'; 
            }}
            />
            <div class="p-4">
                
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex  gap-2 items-center"><FaMapPin className='text-xl text-lime-500'></FaMapPin> {name}</h5>
                <div className='flex justify-between items-center'>
                    <p className='flex items-center gap-2'><FaMapMarkedAlt className='text-orange-500'></FaMapMarkedAlt> {country}</p>
                    {user?.email == email && !handleDelete && <p className='text-xs  text-red-500 font-bold flex items-center gap-1 mr-2'><FaInstagram className='text-xl text-blue-600'></FaInstagram> by you</p>}
                </div>
                <p class="my-6 font-normal text-gray-700 dark:text-gray-400 flex  gap-2 items-center"><GoCodeReview  className='text-4xl -mt-3 text-violet-700 font-extrabold'></GoCodeReview> {description}</p>
                {
                    applySort && <p className='font-semibold flex items-center gap-1'><FaRegMoneyBillAlt className='text-2xl text-red-600'></FaRegMoneyBillAlt> Average Cost: {avgCost} <TbCoinTaka className='text-red-400'></TbCoinTaka></p>
                }
                <div className='flex gap-2 mt-10 mb-4'>
                    {
                        <div className='flex gap-2 '>
                            <Link to = {`/details/${_id}`} class="inline-flex items-center  px-4 py-2 text-sm font-bold text-center text-blue-700  rounded-lg hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Details
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </Link>
                            {
                                handleDelete &&
                                <div className='flex gap-2 justify-around  w-full'>

                                    <Link to ={ `/update/${place._id}`} class="inline-flex gap-2 items-center px-4 py-2 text-sm font-bold text-center text-green-500  rounded-full hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <GrUpdate className='text-base'></GrUpdate>  Update 
                                    </Link>

                                    <button onClick={() => handleDelete(place._id)} class="inline-flex items-center px-4 py-2 text-sm font-bold text-center text-red-500 rounded-full hover:bg-red-100 f  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <MdOutlineDelete className='text-2xl'></MdOutlineDelete> Delete
                                    </button>
                                </div>
                            }
                        </div>
                    }

                </div>
            </div>
        </div>

  )
}

export default SingleItem