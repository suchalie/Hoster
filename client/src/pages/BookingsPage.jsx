import axios from "axios";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage(){
    const[bookings, setBookings] = useState([]);
    useEffect(()=>{
        axios.get('/bookings').then(response =>{
            setBookings(response.data);
        })
    },[]);
    return(
        <div>
            <AccountNav/>
            <div>
                {bookings?.length>0&& bookings.map(booking=>(
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4">
                       <div className="w-48 h-ful">
                        <PlaceImg place = {booking.place} />
                       </div>
                       <div className="py-3 pr-3 grow">
                        <h2 className="text-xl">{booking.place.title}</h2>
                        <div className="text-xl">
                        <BookingDates booking = {booking} className="border-gray-300 mt-2 py-2"/> 
                        <div style={{ fontWeight: 'bold' , fontStyle: 'italic'}} className="flex text-l mt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                        </svg>                

                           Total Price: ₹{booking.price}
                        </div> 
                        </div> 
                       </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}