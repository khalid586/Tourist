import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { BsBuilding } from "react-icons/bs";
import { PiUserSwitchDuotone } from "react-icons/pi";
import { AuthContext } from '../providers/AuthProvider';
import { FcGlobe, FcList } from "react-icons/fc";
import { FaClipboardList } from "react-icons/fa";
import { FaRegMap } from 'react-icons/fa6';
import { IoMdAddCircleOutline } from 'react-icons/io';


function NavBar() {

    const style = 'rounded-3xl px-4 py-2 border-2 border-green-400';
    const {user,loading} = useContext(AuthContext);
    const [imgAvailable,setImgAvailable] = useState('true');
  
    function handleError(){
      setImgAvailable(false);
    }
  
    function Spinner(){
      return(
          <div role="status" className='w-full flex justify-center'>
              <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span class="sr-only">Loading...</span>
          </div>
      )
  }
  
    return (
      <>    
          <div className='flex justify-between  font-semibold text-xs md:text-sm pb-2 mb-4'>
              <NavLink className= "mt-5" to = "/">
  
                  <span className="pl-2 self-center whitespace-nowrap text-base md:text-xl font-semibold dark:text-white">Tourist</span>
              </NavLink>

              <div className='grid grid-cols-3 md:grid-cols-4  py-2 mt-2 mx-'>
                  <NavLink to="/" className={({isActive})=>isActive?'text-blue-600 duration-500 rounded-full px-4 py-2 bg-blue-50 flex justify-center':'text-black px-4 py-2  flex   justify-center'}><p className='flex gap-2 items-center'><IoHomeOutline className='text-green-500'></IoHomeOutline> Home</p></NavLink>
                  <NavLink to="/all_spots" className={({isActive})=>isActive?'text-blue-600 duration-500 rounded-full px-4 py-2 bg-blue-50 flex justify-center':'text-black px-4 py-2 flex justify-center'}><p className='flex gap-2 items-center'><FcGlobe className='text-green-500'></FcGlobe> All Spots</p></NavLink>
                  <NavLink to="/add_spot" className={({isActive})=>isActive?'text-blue-600 duration-500 rounded-full px-4 py-2 bg-blue-50 flex justify-center':'text-black px-4 py-2  flex justify-center'}><p className='flex gap-1 items-center'><IoMdAddCircleOutline className='text-green-500 text-base'></IoMdAddCircleOutline> Place </p></NavLink>{ user &&  
                  <NavLink to="/mylist" className={({isActive})=>isActive?'text-blue-600 duration-500 rounded-full px-4 py-2 bg-blue-50 flex justify-center':'text-black px-4 py-2 flex justify-center'}>     <p className='items-center flex gap-2'><FcList className='text-green-500'></FcList>My List</p></NavLink>
                }
              </div> 

              <div className='pt-4 mr-2'> 
              {   loading? <Spinner></Spinner>:
                  <div>
                  {
                      user ? <Link to = '/profile' className='flex'><img className=' border-4 border-green-400 w-[30px] h-[30px] rounded-full' src={(user?.photoURL && imgAvailable)?user.photoURL: '/All assets/icons8-user-80.png'} title={user.displayName} onError={handleError} alt='' /></Link>:
                      <NavLink to = '/login'  className={({isActive})=>isActive?`px-4 py-2 rounded-3xl bg-green-100 text-green-700 `:`${style} `}>login</NavLink>
                  }
                  </div>
              }
              </div>
  
          </div>
      </>
    )
}

export default NavBar