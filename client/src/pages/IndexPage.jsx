import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";


export default function IndexPage() {
    const [places,setPlaces] = useState([]);
    useEffect(() => {
      axios.get('/places').then(response => {
        setPlaces(response.data);
      });
    }, []);
    return (
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {places.length > 0 && places.map(place => (
          <Link to={'/place/'+place._id} key={place.id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:8000/uploads/${place.photos?.[0]}`} alt=""/>
              )}
            </div>
            <h2 className="text-tertiary font-semibold">{place.address}</h2>
            <h3 className="text-sm font-bold text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="text-primary font-bold">₹{place.Price}</span> <em className="text-secondary">per month</em>
            </div>
          </Link>
        ))}
      </div>
    );
  }