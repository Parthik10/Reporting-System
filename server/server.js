require("dotenv").config(); 
const express = require ('express');
const app = express();
const cors = require('cors'); 
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router");
const reportRoute = require("./router/report-router");
const connectDb = require("./utils/db" );
const errorMiddleware = require("./middlewares/error.middleware");

// let's tackle cors
  const corsOptions = {
      origin: "http://localhost:5173",
      methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
      credentials: true,
  }
  
  app.use(cors(corsOptions));


//this line of code adds express middle ware that parses incoming request bodies with json payloads. it's important to place this before any routes that need to handle json data in the request body . this middleware is responsible for parsing json data from requests, and it should be applied at the beginnning of your middleware stack to ensure it's available for all subsequental route handlers.
app.use(express.json());
  
// mount the Router : tu use the router in main Express app , we can "mount" it at a specific URL prefix
app.use("/api/form" , contactRoute);
app.use("/api/reportform" , reportRoute);
app.use("/api/data" , serviceRoute);


//error middleware
app.use(errorMiddleware);
app.use("/uploads", express.static("uploads"));

const PORT = 5000;

connectDb().then(()=>{

    app.listen(PORT , ()=>{
        console.log(`server is running at port : ${PORT}`);
    });
});
 