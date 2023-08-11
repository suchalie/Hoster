import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function MyBooking(){
    const {id} = useParams();
    const[booking, setBooking] = useState(null);
    useEffect(()=>{
        if(id){
            axios.get('/bookings').then(response =>{
                const fooundBooking= response.data.find(({_id})=> _id === id);
                if(fooundBooking){
                    setBooking(fooundBooking);            
                }
            })
            
        }
    },[id])

    if(!booking){
        return ' ';
    }
    return(
        <div>
            <AccountNav/>
        
        <div className="my-8">
            <h1 className="text-4xl font-bold italic text-tertiary">{booking.place.title}</h1>
            <AddressLink className='flex my-2'>{booking.place.address}</AddressLink>
            <div className=" bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                <h2 className="text-2xl mb-4">
                    Your Booking Info:
                </h2>
                <BookingDates booking = {booking}/>
                </div>
                <div className="bg-secondary rounded-2xl text-white p-6">
                    <div>Total Price:</div>
                    <div  className="text-2xl">₹{booking.price}</div>
                </div>  
            </div>
            <PlaceGallery place={booking.place} />
        </div>

        </div>
    )
}