import React from 'react'

function HomePage() {

    function handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        console.log(name);
        form.name.value = ''
    
    }

    return (
        <div className='m-4 p-4 rounded-lg'>
            <form onSubmit={handleSubmit}>
                <input className='m-4 rounded-lg' type="text" placeholder='name' name="name" id="name" />
                <br />
                <input className='m-4 rounded-lg' type="text" placeholder='url' name="url" id="url" />
                <br />
                <input className='m-4 rounded-lg' type="text" placeholder='email' name="email" id="email" />
                <br />

                <button className='bg-red-500 px-4 py-2 rounded-lg text-white' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default HomePage