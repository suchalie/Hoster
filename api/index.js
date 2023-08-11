const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const imageDownloader = require('image-downloader');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const Place = require('./models/place.js');
const Booking = require('./models/booking.js');
const multer = require('multer');
const fs = require('fs');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+ '/uploads'));


const bcryptSalt = bcrypt.genSaltSync(12);//12 = no. of runs which results in longer millisecond, we can achange as per our need
//study more on this later
//we forgot to add sync here but do that
const jwtSecret = "sjkkwhdghjsvsahjKAVSHKDHVKjbsbhaghs";

//connecting the pages
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

port = 8000;


mongoose.connect(process.env.MONGO_URL);
//
//creating this as an individual function bcs it keeps repeating itself
function getDataFromToken(req){
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async(err, userData)=>{
            if(err) throw err;
            resolve(userData);
        });
    });
    
}
app.get('/test', (req, res) => {
    res.json("ok test");
});


//adding async here to make promise and async function
app.post('/register', async (req, res) => {
    const{ name, email, password } = req.body;
    try{
        const userCred = await User.create({
            //userCred = user credentials, not using user to avoid arguments.
            name,
            email,
            //encrypting the password before saving it. hence downloading bcrypt libaray
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userCred);
    } catch(e) {
        res.status(422).json(e)
    }  
   
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userCred = await User.findOne({email});
    if(userCred){
        const passSame = bcrypt.compareSync(password, userCred.password);
    //now creating a cookie
    //installing json webtoken

        if(passSame){
            jwt.sign({
                //for another way of fetching name, i will comment the name line below and 
                // add it in the app.get('/profile) section
                // name: userCred.name, 
                email: userCred.email, 
                id:userCred.id}, 
                jwtSecret, {}, (err, token)=> {
                if(err){
                    throw err;
                }
                res.cookie('token', token).json({userCred});
            });
            
        }else{
            res.status(422).json('pass not ok');
        }
    }
    else{
        res.json("email not found");
    }
});

app.get('/profile', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    //check if we have a token
    if(token){
        jwt.verify(token, jwtSecret, {}, async(err, userData) =>{
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
            })
    }else{
        res.json(null);
    }
    
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now()+ '.jpg';
    // console.log(__dirname)
    await imageDownloader.image({
        url: link,
        dest: `${__dirname}/uploads/${newName}`,
    });
    res.json(newName);

})

const photosMiddleware =multer({dest: 'uploads/'})
app.post('/upload',photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {  
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads/', ''));
    }

    res.json(uploadedFiles);
});

app.post('/places', async (req, res)=> {
    const {token} = req.cookies;
    const{title, address, addedPhotos,
    description, perks, extraInfo,
    checkIn, checkOut, maxGuests, Price} = req.body
    jwt.verify(token, jwtSecret, {}, async(err, userData) =>{
        if(err) throw err;
        const placeDoc = await Place.create({
        owner: userData.id,
        title, address, photos: addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, Price,

        });
        res.json(placeDoc);
   
   });
})

app.get('/user-places',(req, res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {}, async(err, userData) =>{
        const {id} = userData;
        res.json(await 
            Place.find({owner:id}));
    })

})

app.get('/places/:id',async (req, res)=>{
     const{id} = req.params
    res.json(await Place.findById(id));
});

app.put('/places',async (req, res)=>{
    
    const {token} = req.cookies;
    const{id, title, address, addedPhotos,
    description, perks, extraInfo,
    checkIn, checkOut, maxGuests,Price} = req.body
    jwt.verify(token, jwtSecret, {}, async(err, userData) =>{
        if(err) throw err;
        const placeDoc = await Place.findById(id).exec();
        
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set(
                {title, address, photos:addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, Price})
            await placeDoc.save();
            res.json('ok')
            
        }
    })
})

app.get('/places',async(req, res)=>{
    res.json(await Place.find())
})

app.post('/bookings', async(req, res)=> {
    const userData = await getDataFromToken(req);
    //grabbing token because cookies are always private
    const{place, checkIn,
        checkOut, name, price,
        mobile, TotalGuests } = req.body;
        const newBooking = await Booking.create({
        place, checkIn,
        checkOut, name, price,
        mobile, TotalGuests,user:userData.id,
        });
        res.json(newBooking);
})



app.get('/bookings', async (req, res)=>{
      const userData = await getDataFromToken(req);
      res.json(await Booking.find({user: userData.id}).populate('place'))//the name place, place.js
})



app.listen(port, function() {
    console.log('listening on port ' + port)
});