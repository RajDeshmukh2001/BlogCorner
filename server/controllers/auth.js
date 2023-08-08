import db from '../db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const register = (req, res) => {
    const { fullname, username, email, password, cpassword } = req.body;
    if (!fullname || !username || !email || !password || !cpassword) {
        return res.status(422).json('Please fill the fields properly');
    }

    if (password != cpassword) {
        return res.status(422).json('Passwords not matching');
    }

    const query = 'SELECT * FROM user WHERE email = ? OR username = ?';
    db.query(query, [email, username], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (data.length) {
            return res.status(409).json('User already exists');
        }

        // Hashing Password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const cpass = bcrypt.hashSync(cpassword, salt);

        const query = 'INSERT INTO user(`fullname`,`username`, `email`, `password`, `cpassword`) VALUES (?)';
        const values = [fullname, username, email, hash, cpass]
        db.query(query, [values], (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json('Registration Successfull');
        });
    });
};

// Login
export const login = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(422).json('Please fill the fields properly');
    }

    const query = 'SELECT * FROM user WHERE username = ?';
    db.query(query, [username], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (data.length === 0) {
            return res.status(404).json('User not found');
        }

        // Verify Password
        const isMatch = bcrypt.compareSync(req.body.password, data[0].password);
        if (!isMatch) {
            return res.status(400).json('Incorrect Password');
        }
        const token = jwt.sign({ id: data[0].id }, 'jwtkey');
        const { password, cpassword, ...other } = data[0];
        
        res.cookie('access_token', token, {
            expires: new Date(Date.now() + 18000000),
            httpOnly: true,
        }).status(200).json(other);
    });
};

// Logout
export const logout = (req, res) => {
    res.clearCookie('access_token', {
        sameSite: 'none',
        secure: true
    }).status(200).json('Logged out Successfully');
}