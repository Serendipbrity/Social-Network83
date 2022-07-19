// ------- THIS FILE CONNECTS ALL FILES TO THE SERVER ---------

//  import mongoose
const mongoose = require('mongoose');

//  express framework to create your own server API associated with HTTP methods
const express = require('express');

// instantiate (represent) the server. app variable (constant) created so we can later chain on methods
const app = express();

// constant for PORT (specific address of the server. Like an apartment number)
// process.env.PORT is the environment heroku sets when run || or use chosen PORT
const PORT = process.env.PORT || 3003;

// ---- parse in order for our server to accept incoming data the way we need it to

// app.use() method mounts function to server. 

// Parse incoming JSON data into req.body
app.use(express.json());
// parse incoming string or array data
// express.urlencoded converts POST data to key/value pairings that can be accessed in req.body object
// extended: true informs server that there may be sub array data nested
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));
// mongoose.connect tells Mongoose which database we want to connect to. Use either variable or server database. Whatever is available
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetwork83', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// log mongo queries being executed
mongoose.set('debug', true);


//  this listen method makes our server listen. 
app.listen(PORT, () => console.log(`Connected to localhost: ${PORT}`));