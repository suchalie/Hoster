import axios from "axios";
import Perks from "../perks";
import {  useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import PhotosUploader from "../PhotosUploader";
import { Navigate, useParams } from "react-router-dom";


export default function PlacesFormPage(){
    const {id} = useParams();
    const[title, setTitle]= useState('');
    const[address, setAddress]= useState('');
    const[description, setDescription]= useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const[perks, setPerks]= useState([]);
    const[extraInfo, setExtraInfo]= useState('');
    const[checkin, setCheckin]= useState('');
    const[checkout, setCheckout]= useState('');
    const[maxGuest, setMaxGuest]= useState('1');
    const[Price, setPrice]= useState(4000);
    const[redirect, setRedirect]= useState(false);
    useEffect(() =>{
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckin(data.checkIn);
            setCheckout(data.checkOut);
            setMaxGuest(data.maxGuests);
            setPrice(data.Price);
            
         });
    }, [id])
    
    function inputHeader(text){
        return(
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text){
        return (
            <p className="text-gray-400 text-sm">{text}</p>
        );
    }
    function preInput(header, Description){
        return(
         <>
         {inputHeader(header)}
         {inputDescription(Description)}
         </>
        )
     }
 
    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkin,
        checkout,
        maxGuest,
        Price
    };
        if(id){
            //update
                await axios.put('/places', { id, ...placeData });
                alert('Place updated successfully');
                setRedirect(true);
        }
        else{
            await axios.post('/places', placeData);
            setRedirect(true);
              
        }
    }
    // console.log(SavePlace)
         
    if(redirect){

        return <Navigate to ={"/account/places"} />
     }
    

    return(
        <div>
            <AccountNav />
        <form onSubmit={savePlace}>
            {preInput("Title","Short and catchy advertisement")}
            <input type='text' value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My lovely Apartment"/>
            {preInput("Address","A latest address to the place")}
            <input type='text'value={address} onChange={ev =>setAddress(ev.target.value)} placeholder="address"/>
            {preInput("Photos","Latest and good quality pictures")}
            <PhotosUploader addedPhotos={addedPhotos} onChange={(photos) => setAddedPhotos(photos)} />

            
            {preInput("Description","Description of the place")}
            <textarea className="border" value={description} onChange={ev => setDescription(ev.target.value)}/>
            {preInput("Perks","Select all suitable perks")}
            <Perks selected={perks} onChange={setPerks}/>
            {preInput("Imp Additional Info","House Rules, requirements etc..")}
            <textarea className="border" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
            {preInput("Check in & out time","Remember to inform a week prior before shifting and month prior before leaving")}
            <div className="grid gap-2 mt-2 sm:grid-cols-2 md:grid-cols-4">
                <div >
                    <h3 className="mt-2 mb-2 ">Tentative Shifting date</h3> 
                <input className="text-gray-500 border p-2 rounded-full " type="text" value={checkin} onChange={ev => setCheckin(ev.target.value)} placeholder="23 July 2023"/>
                </div>
                <div>
                    <h3 className="mt-2 mb-2 ">Tentative Leaving Date</h3 >
                <input className="text-gray-500 border p-2 rounded-full"type="text" value={checkout} onChange={ev=> setCheckout(ev.target.value)} placeholder="23 July 2023"/>
                </div>
                <div>
                    <h3 className="mt-2 mb-1 "> Max number of tenants </h3 >
                    <input type="number" value={maxGuest} onChange={ev => setMaxGuest(ev.target.value)}/>
                </div>

                <div>
                    <h3 className="mt-2 mb-1 "> Rent / month</h3 >
                    <input type="number" value={Price} onChange={ev => setPrice(ev.target.value)}/>
                </div>
            </div>
                <button className="primary my-4  max-w-sm text-xl hover:bg-gray-400 hover:text-black">Save</button> 
            
                </form> 
            </div>  
    )
}