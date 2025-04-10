const express= require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./Config/Config');

const app=express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//user routes
const userRoutes = require('./Routes/UserRoutes');
app.use('/api/users/', userRoutes);

//ticker routes
const ticketRoutes = require('./Routes/TicketRoutes');
app.use('/api/tickets/', ticketRoutes);

const port = 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})