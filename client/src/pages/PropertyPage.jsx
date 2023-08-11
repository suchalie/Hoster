import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PropertyPage(){
    const {id}= useParams();
    const [place, setPlace] = useState(null);
    useEffect(() =>{
        if(!id){
            return
        }
        axios.get(`/places/${id}`).then(response =>{
            setPlace(response.data);
        })
    }, [id])

    if(!place){
        return'';
    }

    
    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
           <h1 className="text-4xl font-bold italic text-tertiary">{place.title}</h1>
           {/* when wanna open in a new tag */}
           <AddressLink>{place.address}</AddressLink>
           <PlaceGallery place= {place}/>
        
        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div>
            
            <div className="my-4">
            <h2 className="text-xl font-semibold italic">Description</h2>
            {place.description} 
            </div>
                <b>Check-IN:</b>{place.checkIn}<br/>
                <b>Check-Out:</b>{place.checkOut}<br/>
                <b>Max-Guests:</b>{place.maxGuests}<br/>
                
            </div>
            <div>
                <BookingWidget place={place}/>
            </div>  
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
            <div>
                <h2 className="text-l font-medium italic">Extra Info</h2>
            </div>
        
        <div className="text-sm text-gray-700 leading-4 mb-4 mt-1">
                        {place.extraInfo}
            </div>
        </div>
        
           
        </div>
    )
}