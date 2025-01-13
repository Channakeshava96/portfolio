const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load .env variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// MongoDB Atlas connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas successfully'))
  .catch(err => console.log('Error connecting to MongoDB Atlas:', err));

// Define a schema for the form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

// Create a model for the contact form submissions
const Contact = mongoose.model('Contact', contactSchema);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

// Route to handle form submission and store data in MongoDB
app.post('/submit', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Save form data in MongoDB
  const newContact = new Contact({
    name,
    email,
    subject,
    message,
  });

  try {
    await newContact.save(); // Save the data to MongoDB
    res.status(200).send('Form data submitted successfully');
  } catch (err) {
    res.status(500).send('Error saving data to MongoDB: ' + err);
  }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
