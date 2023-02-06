const express = require('express');

const app = express();
const cors = require('cors');
const path = require("path");
const logger = require("morgan");
const fileUpload = require("express-fileupload");

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const commentRoute = require('./routes/comment');
// const multer = require("multer");


dotenv.config();
app.use(express.json());
app.use(cors());
app.use(fileUpload({}));
app.use('/uploads', express.static('uploads'));

app.post('/api/upload', (req, res) => {
    // console.log(req.files.thumbnailImage);
    const sampleFile = req.files.thumbnailImage;
    // console.log(sampleFile);
    const filename = `uploads/` + Date.now() + `-` + sampleFile.name;
    sampleFile.mv(path.join(__dirname, filename));
    // console.log(filename);
    res.status(200).json({
        location: `http://localhost:5000/` + filename
    })
});

app.post('/api/contentPhoto', (req, res) => {
    const sampleFile = req.files.file;
    // console.log(sampleFile);
    const filename = `uploads/` + Date.now() + `-` + sampleFile.name;
    sampleFile.mv(path.join(__dirname, filename));
    // console.log(filename);
    res.status(200).json({
        location: `http://localhost:5000/` + filename
    })
})





mongoose.set('strictQuery', false);

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "images");
//     },
//     filename: (req, file, cb) => {
//         cb(null, "hello.jpeg")
//     }
// });


// const upload = multer({ storage: storage });

// //upload image

// app.post('/api/upload', upload.single("file"), (req, res , next) => {
//     res.status(200).json("File has been uploaded");
// })

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log('connected'))
    .catch(err => {
        console.log(err);
    });



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comment", commentRoute);

app.listen('5000', () => {
    console.log("cse blog server is running");
})