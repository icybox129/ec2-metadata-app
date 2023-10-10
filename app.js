import express from "express";
import axios from "axios";
import http from "http";

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(express.static("public"));

app.get('/', async (req, res) => {
  try {
    // Fetch the EC2 instance ID from the instance metadata http://169.254.169.254/latest/meta-data/placement/availability-zone
    const ec2IdResponse = await axios.get('http://169.254.169.254/latest/meta-data/instance-id');
    const azResponse = await axios.get('http://169.254.169.254/latest/meta-data/placement/availability-zone')
    const regionResponse = await axios.get('http://169.254.169.254/latest/meta-data/placement/region')
    const publicHostnameResponse = await axios.get('http://169.254.169.254/latest/meta-data/public-hostname')
    const publicIpResponse = await axios.get('http://169.254.169.254/latest/meta-data/public-ipv4')


    const instanceId = ec2IdResponse.data;
    const azId = azResponse.data
    const regionId = regionResponse.data
    const publicHostnameId = publicHostnameResponse.data
    const publicIpId = publicIpResponse.data


    // Send the instance ID as a response
    // res.send(`<h1>EC2 Instance ID:</h1><p>${instanceId}</p>`);
    res.render("index.ejs", {
      instanceId: instanceId, 
      azId: azId,
      regionId: regionId,
      publicHostnameId: publicHostnameId,
      publicIpId: publicIpId,
    })
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