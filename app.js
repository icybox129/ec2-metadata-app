import express from "express";
import axios from "axios";
import http from "http";

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(express.static("public"));

app.get('/', async (req, res) => {
  try {
    // Fetch the EC2 instance ID from the instance metadata http://169.254.169.254/latest/meta-data/instance-id
    const response = await axios.get('http://169.254.169.254/latest/meta-data/instance-id');
    const instanceId = response.data;

    // Send the instance ID as a response
    // res.send(`<h1>EC2 Instance ID:</h1><p>${instanceId}</p>`);
    res.render("index.ejs", {instanceId: instanceId})
  } catch (error) {
    console.error('Error fetching instance ID:', error);
    // res.status(500).send('Error fetching instance ID');
    res.render("index.ejs", {
        error: error,
    })
  }
});



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. CTRL + C to quit`);
});