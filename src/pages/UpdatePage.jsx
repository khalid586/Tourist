import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';
import { Helmet } from 'react-helmet-async';
import dotenv from 'dotenv';

dotenv.config();

function UpdatePage() {
    const data = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [charLeft,setCharLeft] = useState(0);

    const { _id, name, country, photoUrl,location, email, userName, avgCost, seasonality, description,travelTime,visitorsPerYear } = data;

    const [url,setUrl] = useState('https://i.ibb.co/r0d6F7Y/pexels-photo-3881104.jpg');
    const [error,setError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const location = form.location.value;
        const country = form.country.value;
        const photoUrl = form.photoUrl.value;
        const avgCost = form.avgCost.value;
        const visitorsPerYear = form.visitorsPerYear.value;
        const travelTime = form.travelTime.value;

        const seasonality = Array.from(form.querySelectorAll('input[name="seasonality"]:checked')).map(input => input.value);

        const description = form.description.value;

        setCharLeft(0);

        if(70 - description.length > 0){
            setCharLeft(70 - description.length);
            return;
        }

        if(error){
            toast.error('Invalid image url provided')
            return;
        }

        const updatedInfo = {
            name,
            country,
            location,
            photoUrl,
            avgCost,
            seasonality,
            description,
            email,
            userName,
            visitorsPerYear,
            travelTime,
        };

        fetch(`https://b9a10-server-side-khalid586-theta.vercel.app/update/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    if (data.modifiedCount) {
                        toast.success("Details updated Successfully");
                        setTimeout(() => navigate('/mylist'), 2000);
                    } else {
                        toast.error("You haven't changed any information");
                    }
                }
            })
            .catch(error => toast(error));
    }




    function checkUrl(e){
        const currUrl = e.target.value;
        setUrl(currUrl); 
        setError(false)

    }

    return (
        <>
            <Helmet>
                <title>Tourist | Update</title>
            </Helmet>
            <div className='flex justify-center m-4'>
                <form onSubmit={handleSubmit} className="min-w-80 mx-auto">
                    <img className='hidden' src={url} alt="alternate image" onError={() => setError(true)} />

                    <div className="mb-5 flex gap-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Place name</label>
                            <input defaultValue={name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                            <input onChange={checkUrl} defaultValue={photoUrl} type="text" name='photoUrl' id="photoUrl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="https://picture.png" required />
                            <div className='h-5'>                            
                                { error && <p className='text-xs text-red-500'>Invalid url</p>}
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className="mb-5">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                            <input defaultValue={location} name = "location" type="text" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Cox's Bazar" required />
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                            <input defaultValue={country} type="text" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Bangladesh" required />
                        </div>
                    </div>
                    <div className="mb-5 flex gap-2">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Average Cost</label>
                            <input defaultValue={avgCost} type="number" name='avgCost' id="avgCost" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="75000" required />
                        </div>
                        <div className="mb-5 ">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total visitors/year</label>
                            <input defaultValue={visitorsPerYear} type="number" name="visitorsPerYear" id="visitorsPerYear" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="7000" required />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Travel Time (Days)</label>
                            <input defaultValue={travelTime} type="number" name="travelTime" id="travelTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="7" required />
                        </div>
                        <div className="">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seasonality</label>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <label className="inline-flex items-center">
                                    <input type="checkbox" defaultChecked={seasonality.includes('winter')} name="seasonality" value="winter" className="form-checkbox h-4 w-4 text-green-500" />
                                    <span className="ml-2 text-sm">Winter</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="checkbox" defaultChecked={seasonality.includes('fall')} name="seasonality" value="fall" className="form-checkbox h-4 w-4 text-green-500" />
                                    <span className="ml-2 text-sm">Fall</span>
                                </label>

                                <label className="inline-flex items-center">
                                    <input type="checkbox" defaultChecked={seasonality.includes('summer')} name="seasonality" value="summer" className="form-checkbox h-4 w-4 text-green-500" />
                                    <span className="ml-2 text-sm">Summer</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Description</label>
                        <input defaultValue={description} type="text" name='description' id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required />
                        {charLeft > 0 && <p className='text-red-500 text-xs'> Description should be more than 70 characters. {charLeft} characters left</p>}

                    </div>
                    <button type="submit" className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</button>
                </form>
                <ToastContainer />
            </div>
        </>
    );
}

export default UpdatePage;
