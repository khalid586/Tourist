
import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { Helmet } from 'react-helmet-async';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function RegisterPage() {
    const {createUser,setLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [msg,setMsg] = useState('');
    const [show,setShow] = useState(false);


    function isValidPassword(str) {
        return /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(str);
    }
    
    function handleRegistration(e){
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoUrl = e.target.photoUrl.value;
        
        let ok = true;
        setMsg('')
        
        ok = isValidPassword(password)

        if(!ok){
            setMsg('Password should have atleast 6 characters with atleast one uppercase and one lowercase letter') 
            return;
        }

        createUser(email,password)
            .then(result => {
                toast.success('Registration successful')
                updateProfile(result.user,{
                    displayName:name,
                    photoURL:photoUrl,
                }).then(()=>{
                    setTimeout(()=>{
                        navigate(location?.state?location.state:'/')
                    },2000)
                }).catch(error => {toast.error(error.message);setLoading(false)})
                
            })
            .catch(error => {toast.error(error.message);setLoading(false)})
    }
    return (
        <>
            <Helmet>
                <title>Estate | Register</title>
            </Helmet>
            <div className='text-center text-4xl my-4 font-bold'>Register</div>
            
            <form onSubmit={handleRegistration} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                    <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john doe" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <div className=''>
                        <div className='flex gap-2'>
                            <input type={show?"text":"password"} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" required />
                            <button type='button' onClick={()=>setShow(!show)}>
                                {
                                    show? <FaEyeSlash></FaEyeSlash>:<FaEye></FaEye>
                                }
                            </button>
                        </div>
                        {
                            msg && 
                            <p className='text-red-500 text-xs font-semibold'>
                                {msg}
                            </p>
                        }
                    </div>
                </div>
                <div className="mb-5 ">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                    <input type="text" id="photoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://picture.png"  required />
                </div>
                {/* <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div> */}

                <p className='my-4 font-semibold text-gray-400'>Already have an account? <Link state={location.state} className='text-black underline' to = '/login'>Login</Link></p>
                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
            
            </form>
            <ToastContainer></ToastContainer>
        </>
    )
}

export default RegisterPage