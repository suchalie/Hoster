import { useState } from "react";
import axios from "axios";
// import Image from "./Image.jsx";

export default function PhotosUploader({addedPhotos, onChange}) {
    const[photoLink, setPhotoLink]= useState('');
    const [showRemoveIcon, setShowRemoveIcon] = useState(false);
    const [showCoverButton, setShowCoverButton] = useState(false);
    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename}= await axios.post('/upload-by-link', {link: photoLink});
        onChange(prev =>{
                return[...prev, filename]
            });
            
        setPhotoLink(" ");
        
    }
    function uploadPhoto(ev){  
        const files = ev.target.files;
        const data = new FormData();
        for (let i=0; i<files.length; i++){
            data.append('photos', files[i]);
        }
        axios.post('/upload', data ,{
            headers: {'Content-type':'multipart/form-data'}
        }).then((response) =>{
            const {data: filenames} = response;
            onChange(prev =>{
                return[...prev, ...filenames]
            });
        })
    }


    function handleMouseEnter() {
        setShowRemoveIcon(true);
        setShowCoverButton(true);


    }

    function handleMouseLeave() {
        setShowRemoveIcon(false);
        setShowCoverButton(true);
    }

    function removePhoto(ev,filename){
        onChange([...addedPhotos.filter((photo) =>photo !== filename)])
    }

    function SelectCoverPhoto(ev, filename){
        ev.preventDefault();
    onChange([filename,...addedPhotos.filter(photo => photo !== filename)]);
        
    }
    
    return(
        <>
        <div className="flex gap-3">
                    <input className="text-sm color-gray-500 w-96"
                    value={photoLink} 
                    onChange={ev => setPhotoLink(ev.target.value)} 
                    placeholder={"Add photos using a link(jpg, jpeg, png..)"} />
                    {/* a cool trick here to write two letters always together= Drop&nbsp;Photos */}
                    <button onClick={addPhotoByLink} className="bg-gray-300 px-4 py-1 rounded-2xl">
                        Add&nbsp;Photos
                    </button>
                </div>
                
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length> 0 && addedPhotos.map(link =>(
                 <div
                 className="h-30 flex relative"
                 key={link}
                 onMouseEnter={handleMouseEnter}
                 onMouseLeave={handleMouseLeave}
               >
                 <img
                   className="rounded-2xl w-full object-cover position-center"
                   src={"http://localhost:8000/uploads/" + link}
                   alt=" "
                 />
                 {showRemoveIcon && (
                      <button
                      className="absolute top-0 right-0 bg-black bg-opacity-50 p-1 rounded-xl w-full h-full flex items-center justify-center"
                      onClick={ev => removePhoto(ev,link)}>
                    <div className="cursor-pointer ">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                         className="w-6 h-6 text-white"
                         >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  </div>
                </button>
            )}
             {showCoverButton && (
              <button
                className="absolute top-0 left-0 bg-black bg-opacity-50 p-1 rounded-xl text-white"
                onClick={ev => SelectCoverPhoto(ev,link)}
              >
            {link !== addedPhotos[0] && (

            <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            </div> 

            )}
            {link === addedPhotos[0] && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              
            )}
              </button>
             )}
          </div>
                ))}
                <label className="h-30 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                <input type="file" multiple className="hidden" onChange ={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                      Upload
                </label>   
                </div> 
        </>
    );
}
