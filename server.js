
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.post('/submit-form', async (req, res) => {
    const contactData = req.body;

    const pabblyWebHook = process.env.WEBHOOK_URL;

    try{
        const response = await axios.post(pabblyWebHook, contactData);
        res.status(200).json({message: 'Successfully sent data to pabbly', data: response.data})
    }catch(error){
        console.error(error);
        res.status(500).json({message: "There was an error sending the message to pabbly"})
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})