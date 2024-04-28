import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom'

function PlaceDetails() {
    const place = useLoaderData();

    return (
        <div>
            <Helmet>
                <title>Tourist | Details</title>    
            </Helmet>    
            {place?.name}
        </div>
    )
}

export default PlaceDetails