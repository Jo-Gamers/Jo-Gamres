//---------------------------
// IMPORTS
//---------------------------
const express      = require('express');
const mongoose     = require('mongoose');
const dotenv       = require('dotenv');
const cors         = require('cors');
const morgan       = require('morgan');
const cookieParser = require("cookie-parser");
const articleRoutes = require('./Routes/articleRoute');
const upcomingGameRoute = require("./Routes/upcomingGameRoute");  // Import the new routes

//---------------------------
// Middleware
//---------------------------
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
const corsOptions = { origin: 'http://localhost:5173', credentials: true, };
app.use(cors(corsOptions));


//---------------------------
// Connect DB
//---------------------------
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });


//---------------------------
// ROUTES
//---------------------------


app.use("/api/articles", articleRoutes);
app.use("/api/upcoming-releases", upcomingGameRoute);
app.use("/api/contact",require("./Routes/contactRoute"));
app.use("/api/user", require("./Routes/userRoute"));
//---------------------------
// ERROR HANDLERS
//---------------------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//---------------------------
// Connect SERVER
//---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
