const db = require('../Config/Config');

const createTicket = async (req,res)=>{

    try{
        const{serial_number,client_name,client_address,client_contact,amount,to_user} = req.body;

        const from_user = req.user.id; 
    
        if (!serial_number || !client_name || !client_address || !client_contact || !amount || !to_user) {
            return res.status(400).json({ message: 'Please provide all fields' });
        }
    
        const sql = 'INSERT INTO tickets (serial_number, client_name, client_address, client_contact, amount, from_user, to_user) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [serial_number, client_name, client_address, client_contact, amount, from_user, to_user], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error creating ticket' });
            }
            res.status(201).json({ message: 'Ticket created successfully' });
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }  
}

const viewTickets = async (req,res)=>{
    try{
        const userId = req.user.id; 

        const sql = 'SELECT * FROM tickets WHERE to_user = ?';
        db.query(sql, [userId], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error fetching tickets' });
            }
            res.status(200).json(result);
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

const viewTicketDetails = async (req,res)=>{
    try{
        const {id} = req.params;
        console.log("ticket id",id);

        const sql = 'SELECT * FROM tickets WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error fetching ticket details' });
            }
            res.status(200).json(result[0]);
        });

    }catch(err){
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {createTicket,viewTickets,viewTicketDetails};
