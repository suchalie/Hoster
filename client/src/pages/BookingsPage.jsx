import axios from "axios";
import AccountNav from "../AccountNav";
import useEffect, { useState } from "react";

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
                    // eslint-disable-next-line react/jsx-key
                    <div>
                       booking = {booking.checkOut}
                    </div>
                ))}
            </div>
        </div>
    )
}