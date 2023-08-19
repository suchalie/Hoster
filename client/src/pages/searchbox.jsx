// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function Searchbox({place}){
//         const [searchQuery, setSearchQuery] = useState('');
//         const [searchBar, setSearchBar] = useState(false);
      
//         useEffect(() => {
//           axios.get(`/places?q=${searchQuery}`)
//             .then(response => {
//               setFilteredPlaces(response.data);
//             })
//             .catch(error => {
//               console.error(error);
//             });
//         }, [searchQuery]);
      
//         const handleSearchInputChange = (event) => {
//           setSearchQuery(event.target.value);
//         };

//         const handleSearchBarClick = () => {
//             setSearchBar(true);
//           };
      
//         return (
//           <div className='primary'>
//             {/* Search Box */}

//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//               </svg>
            
//             {searchBar && (
//                 <input
//                 type="text"
//                 placeholder="Search for a place..."
//                 value={searchQuery}
//                 onChange={handleSearchInputChange}
//                 />
//             )}
//             </div>
            
//         );
//       }  



