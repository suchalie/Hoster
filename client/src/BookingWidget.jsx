import axios from "axios";
import {differenceInCalendarMonths} from "date-fns";
import { useState, useContext, useEffect} from "react"
import { Navigate } from "react-router-dom";
import {UserContext} from "./userContext.jsx";


export default function BookingWidget({place}){
    const[checkIn, setCheckIn]= useState('');
    const[checkOut, setCheckOut]= useState('');
    const[TotalGuest, setTotalGuest]= useState(1);
    const[name, setName]= useState('');
    const[mobile, setMobile]= useState('');
    const[redirect, setRedirect]= useState('');
    const {user} = useContext(UserContext)

    useEffect(() => {
        if (user) {
          setName(user.name);
        }
      }, [user]);

    // let NumberOfWeeks =0;
    let NumberOfMonths =0;
    if(checkIn && checkOut){
        // NumberOfWeeks = differenceInCalendarWeeks( new Date(checkOut),new Date(checkIn));
        NumberOfMonths = differenceInCalendarMonths( new Date(checkOut),new Date(checkIn));
        
    }

    async function BookThisPlace(){
        const response = await axios.post('/bookings', {checkIn, checkOut, TotalGuest, name, mobile, 
            place: place._id,
            price: NumberOfMonths * place.Price,
        });
        const BookingId= response.data._id;
        setRedirect('/account/bookings/'+ BookingId);
    }
    if(redirect){
        return <Navigate to={redirect}/>;
    }

    
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-center font-bold mb-3">
                Price: ₹{place.Price} /per month
                </div>
                <div className="border rounded-2xl">
                <div className="flex">
                <div className=" py-4 px-4 border-r">
                    <label>Check-In:</label>
                    <input type="date" 
                    placeholder="12/3/23"
                    value={checkIn} 
                    onChange={ev=> setCheckIn(ev.target.value)}/>
                </div>
                <div className=" py-4 px-4">
                    <label>Check-Out:</label>
                    <input type="date" 
                    value={checkOut} 
                    onChange={ev=> setCheckOut(ev.target.value)}/>
                </div>
                </div>
                <div className="py-4 px-4 border-t">
                    <label>Number of Guests:</label>
                    <input type="number" 
                    value={TotalGuest} 
                    onChange={ev=> setTotalGuest(ev.target.value)}/>
                </div>
                {NumberOfMonths>0 && (
                    <div className="py-4 px-4 border-t">
                        <label >Name:</label>
                        <input type="text" placeholder="Prachi Gaur"
                        value={name} 
                        onChange={ev=> setName(ev.target.value)}/>
                        <label className="py-4">Contact Number:</label>
                        <input type='tel' placeholder="3736582922"
                        value={mobile} 
                        onChange={ev=> setMobile(ev.target.value)}/>
                    </div>
                )}
                </div>
                
                <button onClick={BookThisPlace} className="primary mt-4">
                       Book
                </button>
            </div>
    )
}