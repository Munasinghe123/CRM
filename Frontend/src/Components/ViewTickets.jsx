import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewTickets() {
    const [tickets, setTickets] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/tickets/viewTickets', { withCredentials: true });
                setTickets(res.data);
            } catch (err) {
                console.error('Failed to fetch tickets', err);
            }
        };

        fetchTickets();
    }, []);

    const handleViewTicket = async (ticketId) => {
        navigate(`/viewTicketDetails/${ticketId}`);
    }

    return (
        <div>
            <h2>Your Tickets</h2>
            {tickets.map((ticket) => (
                <div key={ticket.id}>
                    <p>{ticket.client_name}</p>
                    <button onClick={()=>handleViewTicket(ticket.id)}>View Details</button>
                </div>
            ))}
        </div>
    );
}

export default ViewTickets;
