import express from 'express';
import database from './db.js';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// upload Image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})
const uploadImg = multer({ storage });
app.post('/server/upload', uploadImg.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
})

app.use('/server/posts', postRoutes);
app.use('/server/auth', authRoutes);
app.use('/server/users', userRoutes);

app.listen(5000, () => {
    console.log(`Connected to 5000`);
});

// Database Connection
database.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Database Connected');
    }
});