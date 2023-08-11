import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PoolIcon from '@mui/icons-material/Pool';
import PetsIcon from '@mui/icons-material/Pets';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
export default function Perks({selected, onChange}){
    function handleCheckboxClick(ev){
     const {checked, name}=ev.target;
     if(checked){
        onChange([...selected, name]);
     }else{
        onChange([...selected.filter(selectedName => selectedName !== name)]);
     }
    //   onChange([...selected, name])
    }
    return(
        <>
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCheckboxClick}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                        </svg>
                        <span>Free wifi</span>
                        

                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('Lift')} name="Lift" onChange={handleCheckboxClick}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                        <span>Lift available</span>
                        

                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                    <input type="checkbox" checked={selected.includes('Western')} name="Western" onChange={handleCheckboxClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>

                        <span>Western Toilets</span>
                        


                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                    <input type="checkbox" checked={selected.includes('Parking')} name="Parking" onChange={handleCheckboxClick}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>

                        <span>Parking Space Available</span>
                        

                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('supermarket')} name="supermarket" onChange={handleCheckboxClick}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <span>Supermarket nearby</span>
                        

                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('Pets')} name="Pets" onChange={handleCheckboxClick}/>
                        <PetsIcon/>
                        <span>Pets allowed</span>
                        

                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('washing machine')} name="washing machine" onChange={handleCheckboxClick}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                        </svg>

                        <span>Washing Machine</span>
                       

                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('Kitchen')} name="Kitchen" onChange={handleCheckboxClick}/>
                        <CountertopsOutlinedIcon/>
                        <span>Modern Kitchen</span>


                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('Pool')} name="Pool" onChange={handleCheckboxClick}/>
                        <PoolIcon/>

                        <span>Pool</span>
                       

                    </label>
                    <label className="border p-4 flex rounded-2xl gap-2 items-center curson-pointer">
                        <input type="checkbox" checked={selected.includes('Gym')} name="Gym" onChange={handleCheckboxClick}/>
                        <FitnessCenterIcon/>

                        <span>Gym</span>
                       

                    </label>
                </div>
        </>
    );
}

