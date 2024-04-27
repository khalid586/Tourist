import React from 'react'
import { useLoaderData } from 'react-router-dom'

function PlaceDetails() {
    const place = useLoaderData();

    return (
        <div>{place?.name}</div>
    )
}

export default PlaceDetails