import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';

function UpdatePage() {
    const data = useLoaderData();
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    const {_id,name,country,photoUrl,email,userName} = data;
    console.log(name);


    function handleSubmit(e){
        e.preventDefault();


        const form = e.target;
        const name = form.name.value;
        const country = form.country.value;
        const photoUrl = form.photoUrl.value;

        const updatedInfo = {name,country,photoUrl,email:user.email,userName:user.displayName};
        console.log(updatedInfo);

        fetch(`https://b9a10-server-side-khalid586-theta.vercel.app/update/${_id}`,{
            method:"PUT",
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(updatedInfo)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount){
                toast.success("Details updated Successfully")
                
                setTimeout(() =>  navigate('/mylist'),2000)
               
            }
        })
        .catch(error => toast(error))
    }

    return (
     <>
        <Helmet>
            <title>Tourist | Update</title>
        </Helmet>

        <div className='flex justify-center'>
                <form onSubmit={handleSubmit} className="w-full m-2 md:w-1/3">
                    <div className="mb-5 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place name</label>
                        <input defaultValue={name} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"  required />
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                        <input defaultValue={country}  type="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Bangladesh" required />
                    </div>

                    <div className="mb-5 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                        <input defaultValue={photoUrl} type="text" name = 'photoUrl' id="photoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="https://picture.png"  required />
                    </div>

                    <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>
                
                </form>
                <ToastContainer></ToastContainer>
        </div>
     </>
    )
}

export default UpdatePage