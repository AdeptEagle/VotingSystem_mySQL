//require('rootpath')(); // Set root path based on the current directory
import express from 'express';
import cors from 'cors';
//import errorHandler from '_middleware/error-handler'; // Adjust as necessary

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(errorHandler); //

// Example of how to include a controller
// app.use('/path', require('./path/to/controller'));

// Set the port based on environment
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

// Start the server
app.listen(port, () => console.log('Server listening on port ' + port));
