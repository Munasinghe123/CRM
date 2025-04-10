
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../Config/Config');

const registerUser = (req, res) => {

    const { name, email, password,role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error registering user' });
        }
        return res.status(201).json({ message: 'User registered successfully' });
    });

}

const loginUser = (req, res) => {
    const{name,password}=req.body;
    if(!name || !password){
        return res.status(400).json({message:'Please fill in all fields'});
    }
    const sql = 'SELECT * FROM users WHERE name = ?';
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ id: user.id, role: user.role,name:user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("created token",token);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: false,
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(200).json({ user: { id: user.id, name: user.name }, role: user.role });
    });
}

const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
    });

    res.status(200).json({ message: "Logged out successfully" });
};



const getCurrentUser = (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token",decoded);
        return res.status(200).json({ user: { id: decoded.id, name:decoded.name }, role: decoded.role });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};



module.exports={registerUser,loginUser,getCurrentUser,logoutUser}
