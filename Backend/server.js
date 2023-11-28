const express = require('express')
const cors = require('cors') // for cross-axis-origin policy

const app = express() // init the instance of Express
const port = 8080;

// main request/response listner
app.listen(port, (error) => {

    // check condition of the server
    if (error) console.log("Something when wrong :" + error)
    else console.log("Server is Listing at port :" + port)

    // use cors
    app.use(cors());

    // Parser (Json parsor)
    app.use(express.json());

    // API starts from here first basic API
    // read
    app.get('/allblogs', (request, response) => {
        const data = {
            "Blog1": {
                "Name": "Abhishek"
            },
            "Blog2": {
                "Name": "Pooja"
            }
        }
        response.send(data);
    })

})