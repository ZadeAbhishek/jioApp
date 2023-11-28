const express = require('express')
const cors = require('cors') // for cross-axis-origin policy

const app = express() // init the instance of Express
const port = 8080;
const data = {
        "zadeabhi55@gmail.com": {
            "blogs": [{
                    "id": "1",
                    "title": "Title Blog-1",
                    "timestamp": "01012000",
                    "body": "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from  de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
                    "edited": "false",
                    "author": "Abhishek Zade",
                },
                {
                    "id": "2",
                    "title": "Title Blog-2",
                    "timestamp": "01012006",
                    "body": "Lorem epsumm dahi",
                    "edited": "false",
                    "author": "Abhishek Zade",
                }
            ],
        },
        "zadeabhidoc@gmail.com": {
            "blogs": [{
                "id": "1",
                "title": "Title Blog-1",
                "timestamp": "01012001",
                "body": "Lorem epsumm dahi",
                "edited": "false",
                "author": "Abhishek R Zade",
            }, ]
        }
    }
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

        console.log("Blogs Send");
        response.send(data);
    })

    app.post('/personalblog', (request, response) => {
        let email = request.body.email
        console.log(email);
        if (data[email] != undefined) response.send(data[email])
        else return response.send({})
    })

    app.post('/updateblog', (request, response) => {
        let email = request.body.email
        let id = request.body.id
        let title = request.body.title
        let timestamp = request.body.timestamp
        let author = request.body.author
        let body = request.body.body
        console.log(email, id, title, timestamp, author, body);
        if (data[email] != undefined) {
            data[email].blogs.forEach(element => {
                if (element.id === id) {
                    element.title = title,
                        element.timestamp = timestamp;
                    element.author = author;
                    element.body = body;
                }
            });
            response.send("Updated Successfully");
        } else response.send("Error");
    })

})