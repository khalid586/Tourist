import React from 'react'
import { Helmet } from 'react-helmet-async';
import { CiShoppingTag } from 'react-icons/ci';
import { HiCurrencyDollar } from 'react-icons/hi';
import { Link, useLoaderData } from 'react-router-dom'
import { MdHiking } from "react-icons/md";
import { FaGoogle, FaRegCommentAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GrMapLocation } from 'react-icons/gr';
import { IoPricetagsOutline, IoTimerSharp } from 'react-icons/io5';



function Item({place}){
    const {                name,
        country,
        photoUrl,
        avgCost,
        seasonality,
        description,
        email,
        userName,
        visitorsPerYear,
        travelTime,} = place; 
  
    return(
      <div className='text-center flex flex-col items-center'>
          <div className=' w-4/5 my-4'> 
            <img class="h-[100px] md:h-[300px] lg:h-[400px] w-full" src={photoUrl} alt="image description"/>
          </div>  
          
          <div className="lg:w-4/5 flex flex-col items-center justify-between rounded-lg md:flex-row">
              <div className='m-4'>
                <h5 className="mb-8 text-2xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
              </div>
              <div className="flex flex-col p-4 leading-normal">
                   <div className='flex flex-col items-start'>
                        <div className='mb-4'> 
                            <p className="mb-1 text-3xl flex items-center gap-2 font-bold   dark:text-gray-400"> <GrMapLocation className='text-red-500'></GrMapLocation>  {country}</p>
                        </div>
                        <p className="mb-1 flex items-center gap-2 font-bold  dark:text-gray-400"><IoTimerSharp className='text-emerald-400 text-3xl'></IoTimerSharp> Average travel time: {travelTime} days</p>
                        <div className='flex gap-2 '>
                            <FaRegCommentAlt className='h-full text-9xl mt-3 md:text-7xl lg:text-5xl text-red-500'></FaRegCommentAlt>                        
                            <p className=" my-2 flex items-start justify-center gap-2 font-bold text-gray-500 dark:text-gray-400"><span className='text-left flex '> {description}</span></p>
                        </div>
                   </div>
                   <p className='flex items-center gap-4'>
                    <p className='font-bold text-lg flex gap-4 '> <IoPricetagsOutline className='text-2xl text-violet-700'></IoPricetagsOutline></p>
                    {
                      seasonality.map(season => <p className='p-2 bg-green-100 text-green-500 font-bold rounded-xl text-xs'> {season}</p>)
                    }
                  </p>
                
                  <p className='md:flex my-2 items-center gap-2 font-semibold text-gray-600'>
                        <p className='flex gap-2 items-center mb-2'><FaRegUser className='text-orange-500'></FaRegUser>  Posted by: <span className='text-black md:mr-5'>{userName}</span></p>
                        <span className='text-black flex items-center gap-2'><FaGoogle className='text-green-500'></FaGoogle> {email}</span>
                  </p>
                  
              </div>
          </div>
          <button className='mt-4'><Link className='btn2 text-sm  my-4' to = "/">Back to home</Link></button>
      </div>
    )
  }

function PlaceDetails() {
    const place = useLoaderData();

    return (
        <div>
            <Helmet>
                <title>Tourist | Details</title>    
            </Helmet>    
            <div className='flex flex-col items-center  justify-center'>
        
                <Item key={place._id} place = {place}></Item>

            </div>
        </div>
    )
}

export default PlaceDetails