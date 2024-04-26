import React, { useContext, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

function AddTouristSpot() {
    const {user} = useContext(AuthContext);
    console.log(user)
  
    const loadedData = useLoaderData();

    const [users,setUsers] = useState(loadedData);

    function handleDelete(userId){
        fetch(`http://localhost:5000/users/${userId}`,{
            method:'delete',
        })
        .then(res => res.json())
        .then(data =>{
            if(data.deletedCount){
                const currUsers = users.filter(user => user._id != userId)
                setUsers(currUsers);
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = {name,email};

        form.reset();

        fetch('http://localhost:5000/users/',{
            method:'post',
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUsers([...users,user]);
        })
    
    }

    return (
        <div className='m-4 p-4 rounded-lg'>
            
            <div>
                {
                    users.map(user => <li key = {user._id}>{user.name} --------- {user.email} <button onClick={()=>handleDelete(user._id)} className='ml-4 bg-gray-200 p-1 rounded-full px-4'>X</button></li>)
                }
            </div>

            <form onSubmit={handleSubmit}>
                <input required  className='m-4 rounded-lg' type="text" placeholder='name' name="name" id="name" />

                <input  required className='m-4 rounded-lg' type="text" placeholder='email' name="email" id="email" />


                <button className='bg-red-500 px-4 py-2 rounded-lg text-white' type="submit">Submit</button>
            </form>
        </div>
  )
}

export default AddTouristSpot