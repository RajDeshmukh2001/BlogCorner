import db from '../db.js';
import jwt from 'jsonwebtoken';

// Get all Blogs
export const getPosts = (req, res) => {
    const query = req.query.cat ? 'SELECT * FROM blogs WHERE cat = ?' : 'SELECT * FROM blogs';

    db.query(query, [req.query.cat], (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
};

// Get a Single Blog
export const getPost = (req, res) => {
    const query = 'SELECT b.id, `fullname`, `username`, `title`, `description`, `img`, `cat`, `date` FROM user u JOIN blogs b ON u.id=b.uid WHERE b.id = ?';

    db.query(query, [req.params.id], (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data[0]);
    })
};

// Add Blogs 
export const addPost = (req, res) => {
    const { title, description, img, cat, date } = req.body;
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not Authenticated');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token not valid');

        const query = 'INSERT INTO blogs(`title`, `description`, `img`, `cat`, `date`, `uid`) VALUES (?)';
        const values = [title, description, img, cat, date, userInfo.id];

        db.query(query, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json('Blog Posted');
        });
    });
};

// Update Blog
export const updatePost = (req, res) => {
    const { title, description, img, cat } = req.body;
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not Authenticated');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token not valid');

        const blogId = req.params.id;
        const query = 'UPDATE blogs SET `title`=?, `description`=?, `img`=?, `cat`=? WHERE `id`=? AND `uid`=?';
        const values = [title, description, img, cat];

        db.query(query, [...values, blogId, userInfo.id], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json('Blog Updated');
        });
    });
};

// Delete Blog
export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not Authenticated');

    jwt.verify(token, 'jwtkey', (err, userInfo) => {
        if (err) return res.status(403).json('Token not valid');

        const postId = req.params.id;
        const query = 'DELETE FROM blogs WHERE `id` = ? AND `uid` = ?';

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json('You cannot delete this Blog');

            return res.json('Blog deleted');
        });
    });
};