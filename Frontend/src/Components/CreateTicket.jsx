import { useState,useEffect } from 'react';
import axios from 'axios';

function CreateTicket() {
    const [serialNumber, setSerialNumber] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientAddress, setClientAddress] = useState('');
    const [clientContactDetails, setClientContactDetails] = useState('');
    const [amount, setAmount] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [users, setUsers] = useState([]);
   
   

    useEffect(()=>{
        const fetchUsers =async()=>{
            try{
                const response = await axios.get('http://localhost:5000/api/users/getAllUsers',{withCredentials:true});
                if(response.status===200){
                    setUsers(response.data.users);
                }
            }catch(err){
                console.error(err);
                setError('Failed to fetch users');
            }
        }

        fetchUsers();
    },[])

    const filteredUsers = users.filter((user) => user.role !== 'admin');

    console.log("filterd users",filteredUsers);

    const createTicket = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/tickets/createTicket', {
                serial_number: serialNumber,
                client_name: clientName,
                client_address: clientAddress,
                client_contact: clientContactDetails,
                amount: amount,
                to_user: assignedTo
            },{withCredentials:true});

            setMessage(res.data.message);
        } catch (err) {
            setError('Failed to create ticket');
        }
    };

    return (
        <form onSubmit={createTicket}>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}

            <label>Serial number</label>
            <input
                type="text"
                placeholder="Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
            />

            <label>Client Name</label>
            <input
                type="text"
                placeholder="Client Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
            />

            <label>Client Address</label>
            <textarea
                placeholder="Client Address"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
            />

            <label>Client Contact Details</label>
            <input
                type="text"
                placeholder="Client Contact Details"
                value={clientContactDetails}
                onChange={(e) => setClientContactDetails(e.target.value)}
            />

            <label>Amount</label>
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <label>Assigned to</label>
            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
            >
               {filteredUsers.map((user)=>{
                    return(
                       <option key={user.id} value={user.id}>
                            {user.role}-{user.name}
                       </option>
                        
                    )
               })}
               
            </select>
            <button type="submit">Create Ticket</button>
        </form>
    );
}

export default CreateTicket;
