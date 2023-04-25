import db from '../db.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not Authenticated');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token not valid');

        const query = 'SELECT `fullname`, `username`, `email`, COUNT(uid) AS Total FROM `user` u JOIN `blogs` b ON u.id=b.uid WHERE u.id = ? AND b.uid = ?';
    
        db.query(query, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json(data[0]);
        })
    });
};