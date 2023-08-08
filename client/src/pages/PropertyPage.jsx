import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";

export default function PropertyPage(){
    const {id}= useParams();
    const [place, setPlace] = useState(null);
    const[ShowAllphotos, setShowAllphotos]= useState(false);
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

    if(ShowAllphotos){
        return(
            <div className="absolute inset-0 bg-black opacity-90 text-white gap-2 min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                    <h1 className="text-4xl italic text-white mr-25">Photos of {place.title}</h1>
                        <button onClick={()=> setShowAllphotos(false)} className="fixed right-10 top-6 flex gap-1 rounded-2xl bg-secondary text-white px-4 py-2 shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>
                            Close
                        </button>
                    </div>
                {place?.photos?.length>0 && place.photos.map(photo=>(
                    <div className='object-cover aspect-square' key= {photo._id}>
                        <img  src={'http://localhost:8000/uploads/' + photo} alt=''/>
                    </div>
                ))}
                </div>
                
            </div>
        )
    }
    return(
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
           <h1 className="text-4xl font-bold italic text-tertiary">{place.title}</h1>
           {/* when wanna open in a new tag */}
           <a className='flex gap-1 my-4 font-semibold text-primary underline' 
           target="_blank" href={'https://maps.google.com/?q='+ place.address} 
           rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            {place.address}
           </a>
           <div>
           <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img onClick={()=>setShowAllphotos(true)} className="aspect-square cursor-pointer first-line:object-cover" src={'http://localhost:8000/uploads/'+ place.photos[0]}/>
                        </div>
                        
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img onClick={()=>setShowAllphotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:8000/uploads/'+ place.photos[1]}/>
                    )}
                
                <div className="overflow-hidden">
                    {place.photos?.[2] && (
                        <img onClick={()=>setShowAllphotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:8000/uploads/'+ place.photos[2]}/>
                    )}
                    <button onClick={()=>setShowAllphotos(true)} className="flex gap-1 absolute bottom-1 right-10 py-2 px-4 bg-secondary rounded-2xl shadow  shadow-white text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                    </svg>

                    show more
                   </button>

                </div>

                
                </div>
           
        </div>

            
           
        </div>
        
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