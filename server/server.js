
const multer = require('multer');
const cors = require('cors');
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

// Serve static files -> CHANGED 'build' to 'public'
app.use(express.static('public'));


//Tutorial example
let storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
   },
   filename: (req, file, cb) => {
      //console.log(file);
      cb(null, Date.now() + '-' + file.originalname)
   }
});
   
const upload = multer({ storage })
   
app.use(cors());
    
app.post('/upload', upload.single('image'), (req, res) => {
console.log(req)
if (req.file){
   res.json({
      imageUrl: `images/uploads/${req.file.filename}`
   });
}
else {
   res.status("409").json("No Files to Upload.");
}
});



// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
