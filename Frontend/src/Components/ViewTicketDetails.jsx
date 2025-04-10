
import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function ViewTicketDetails() {

    const[ticket,setTicket] = useState([]);

    const {id} = useParams();
    console.log("ticket id",id);

    useEffect(()=>{
        const fetchTicketDetails = async () => {

            try{
               
                const response = await axios.get(`http://localhost:5000/api/tickets/viewTicketDetails/${id}`,{withCredentials:true});
                if(response.status===200){
                    setTicket(response.data);
            }
            }catch(err){
                console.error(err);
            }
        }
        fetchTicketDetails();
    },[id])


  return (
    <div className="ticket-details">
      <h2>Ticket Details</h2>
      <p><strong>ID:</strong> {ticket.id}</p>
      <p><strong>Serial number:</strong> {ticket.serial_number}</p>
      <p><strong>Client name:</strong> {ticket.client_name}</p>
      <p><strong>Client address:</strong> {ticket.client_address}</p>
      <p><strong>Client contact:</strong> {ticket.client_contact}</p>
      <p><strong>Amount: {ticket.amount}</strong></p>
    </div>
  );
}

export default ViewTicketDetails;