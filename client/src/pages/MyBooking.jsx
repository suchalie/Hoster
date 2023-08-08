import { useParams } from "react-router-dom"

export default function MyBooking(){
    const {id} = useParams();
    return(
        <div> individual booking: {id}</div>
    )
}