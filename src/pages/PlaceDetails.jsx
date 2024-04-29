import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { CiShoppingTag } from 'react-icons/ci';
import { HiCurrencyDollar } from 'react-icons/hi';
import { Link, useLoaderData } from 'react-router-dom'
import { MdHiking } from "react-icons/md";
import { FaGoogle, FaRegCommentAlt, FaRegMoneyBillAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GrMapLocation } from 'react-icons/gr';
import { IoCalendar, IoPricetagsOutline, IoTimerSharp } from 'react-icons/io5';
import { TiLocationOutline } from 'react-icons/ti';
import { FaMoneyBill1Wave, FaUserCheck } from 'react-icons/fa6';
import { TbCoinTaka } from 'react-icons/tb';
import { SlPeople, SlUserFollowing } from 'react-icons/sl';
import { IoIosMail } from 'react-icons/io';
import { FcClock } from 'react-icons/fc';



function Item({place}){
    const {                name,
        location,
        country,
        photoUrl,
        avgCost,
        seasonality,
        description,
        email,
        userName,
        visitorsPerYear,
        travelTime,} = place; 

        const[ valid,setValid] = useState(true);
  
    return(
      <div className='text-center flex flex-col items-center'>
          <div className=' w-4/5 my-4'> 
            <img class="h-[100px] md:h-[300px] lg:h-[400px] min-w-[60vw] w-full" src={photoUrl} alt="image description"
                        onError={(e) => {
                          setValid(false);
                          e.target.src = 'https://i.ibb.co/MDBxfMK/pexels-photo-1450360.jpg'; 
                          e.target.alt = 'Fallback Image'; 
                      }}
            />
          </div>  
          
          <div className="lg:w-4/5 flex flex-col items-center justify-between rounded-lg md:flex-row">
              <div className='m-4'>
                <h5 className="mb-8 text-2xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
              </div>
              
              <div className="flex flex-col p-4 leading-normal">
                
                   <div className='flex flex-col items-start'>
                        <div className='flex justify-between w-full '> 
                          <div className='mb-4'> 
                              <p className="my-2 text-sm flex items-center gap-1 font-semibold text-gray-800"> <TiLocationOutline className='text-orange-400 text-2xl'></TiLocationOutline>  {location}</p>
                              <p className="mb-1 ml-1 text-2xl flex items-center gap-2 font-bold   dark:text-gray-400"> <GrMapLocation className='text-red-500'></GrMapLocation>  {country}</p>
                          </div>
                          {!valid && <p className=' mt-4 mr-8 text-red-500'>  No valid image url provided</p>}

                        </div>
                        <div className='flex min-w-[80vw] md:min-w-[50vw] gap-2 p-4 bg-green-100 rounded-3xl my-2 mb-4'>
                            <p className=" my-2 flex items-start justify-center gap-2 font-bold text-gray-500 dark:text-gray-400"><span className='text-left flex '> {description}</span></p>
                        </div>
                        <p className="mb-1 flex items-center gap-2 font-bold text-gray-600"><IoCalendar className='text-blue-500 text-2xl'></IoCalendar> Average stay: <span className='text-black'>{travelTime} days</span></p>
                        
                       <p className='font-semibold my-1 mb-3 text-gray-600 flex items-center gap-2'><FaRegMoneyBillAlt className='text-red-600 text-2xl'> </FaRegMoneyBillAlt> Average Cost : <span className='font-bold text-black flex items-center gap-0.5 '>{avgCost} <TbCoinTaka className='text-red-400'></TbCoinTaka></span></p>
                       <p className='font-semibold my-1 mb-3 text-gray-600 flex items-center gap-2'><SlPeople className='text-blue-600 text-xl'> </SlPeople> Visitors per year : <span className='font-bold text-black flex items-center gap-0.5 '>{visitorsPerYear}</span></p>
                   </div>
                   <p className='flex items-center gap-4'>
                      <p className='font-bold text-lg flex gap-4'> <IoPricetagsOutline className='text-2xl text-violet-700'></IoPricetagsOutline></p>
                      {
                        seasonality.length ?seasonality.map(season => <p className='p-2 bg-green-100 text-green-500 font-bold rounded-xl text-xs'> {season}</p>)
                        :
                        <p className='-m-3 text-sm text-gray-400 font-semibold'>No season information available</p>
        
                      }
                    </p>
                  
                
                  <p className='md:flex my-5 items-center gap-2 font-semibold text-gray-600 text-xs'>
                        <p className='flex gap-1 mt-2 items-center mb-2'><FaUserCheck className='text-emerald-500 font-extrabold text-xl'></FaUserCheck>  Posted by: <span className='text-black md:mr-5'>{userName}</span></p>
                        <span className='text-black ml-16 md:ml-0 flex items-center gap-1'><IoIosMail className='text-orange-500 text-2xl'></IoIosMail> {email}</span>
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