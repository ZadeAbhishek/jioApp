const express = require('express')
const cors = require('cors') // for cross-axis-origin policy

const app = express() // init the instance of Express
const port = 8080;
const data = {
        "zadeabhi55@gmail.com": {
            "blogs": [{
                    "id": "202311281120",
                    "title": "Benefits of Blogging",
                    "timestamp": "2023-11-28",
                    "body": `
                    There are a variety of reasons why your business should blog. These all explain why it’s a beneficial time investment and addition to your business’s branding, marketing, and sales efforts.
                    
                    1. Rank on search engines and build authority online so your content and website appear first on the search engine results page, or SERP, when people look up specific terms and keywords. Human Marketing does this well with their mix of blogs and pillar pages (or topic clusters).
                    
                    2. Drive organic traffic to your website, social media profiles, and other forms of content in a way that feels natural and doesn’t interrupt your audience. Cloud Elements is an example of a company that has seen an increase in organic traffic due to their blog.
                    
                    3. Educate your leads and customers by helping them stay informed on industry trends and development, and educated about your products, services, and how you can solve their challenges.
                    
                    4. Contribute to your inbound marketing tactics so you can avoid having your content feel pushy and “salesy”. Grand Rapids Chair is an example of a company that uses their blog to improve their inbound growth.
                    
                    5. Convert leads and prospects into customers by including helpful and educational information in your blogs so they can understand why your product or service is right for them.
                    
                    6. Become known as an expert in the industry and stand out against your competition by writing about the various topics your business and product line is known for or relates to. These may include content marketing, public relations, or software for small businesses. 3PL Central is an example of a company who has become known as an industry expert and separates themselves from the competition thanks to their blog.
                    
                    7. Foster a sense of community so your audience members know there are hundreds (or thousands, depending on the size of your blog) of other people equally as interested in your information and content.
                    
                    8. Engage audience members and customers so they keep coming back to read your content every day (or as often as you publish your blog) and potentially check out your products or services.
                    
                    9. Promote your business and products or services by writing about their benefits and linking to information where your readers can learn more … and convert into customers.
                    
                    10. Boost revenue with calls-to-action (CTAs) and links to your website pages where your audience can learn about and purchase your products or sign up for your services.
                    
                    11. Support all of your marketing and greater business initiatives by staying consistent with your branding and tone throughout all of your blogs.
                    `,

                    "edited": "false",
                    "author": "Abhishek Zade",
                    "time": "11:20"
                },
                {
                    "id": "202311281121",
                    "title": "Best restaurant reviews blog: All the Food",
                    "timestamp": "2023-11-28",
                    "body": `
                    All the Food is a blog dedicated to all the best places to eat and drink in Dublin. Unlike some of the other websites on this list, All the Food is specifically a blog website rather than a website that includes a blog as part of its content. Readers will find different types of blog content here, such as restaurant reviews, travel guides, and neighborhood lists. 
                    
                    There are six different categories on this blog: neighborhoods, reviews, restaurants, Dublin guides, travel guides, and what’s new. What’s interesting is that each category page is structured differently based on the content type. The same goes for the blog post pages. This shows how well Editor Lisa Cope understands content and that, if you want to create a great user experience, there isn’t a one-size-fits-all solution for structuring your pages.
                    
                    Key takeaways
                    
                        Personalize your design. Blog templates are undoubtedly invaluable, but it's crucial to consider them as a foundation rather than the final product. Think of it like a move-in-ready house—you need to add your personal touch to make it feel like home. Customize the template to match your style and brand, and make it uniquely yours to create a welcoming and engaging blog for your audience.
                    
                        Stay on theme. The best food blogs often thrive on having a clear and distinct theme. Without a unique focus, it becomes challenging to attract readers, especially when there are thousands of generic food blogs out there. Fortunately, All the Food excels in this aspect by maintaining a strong focus on Dublin-specific eateries and tips. This specificity sets the blog apart, making it more appealing and valuable to readers seeking local culinary insights and recommendations in Dublin.
                    
                        To further enhance your blog's success, it's essential to consistently create high-quality content that resonates with your audience. Additionally, engaging with your readers through comments, social media, and newsletters helps build a loyal community around your blog. Remember, establishing and maintaining a blog takes time and effort, but the rewards in terms of audience connection and brand visibility can be significant.
                    
                        Furthermore, incorporating multimedia elements such as images, videos, or infographics can enrich your content, making it more visually appealing and engaging. This visual variety helps break up text-heavy sections and provides an immersive experience for your readers.
                    
                        Lastly, stay updated with the latest trends and developments in your niche. Adapting to changes and exploring innovative ways to present your content keeps your blog fresh and relevant. By continually evolving and offering value to your audience, your blog can establish itself as a go-to resource in your industry.
                    `,
                    "edited": "false",
                    "author": "Abhishek Zade",
                    "time": "11:21"
                }
            ],
        },
    }
    // main request/response listner

let users = {
    "zadeabhi55@gmail.com": {
        "name": "Abhishek Zade",
        "password": "hacker",
    },
}
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
        console.log(data);
        response.send(data);
    })

    app.post('/personalblog', (request, response) => {
        let email = request.body.email
        console.log(data[email]);
        if (data[email] != undefined) response.send(data[email])
        else return response.send({ "blogs": [] })
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

    app.post('/deleteblog', (request, response) => {
        let email = request.body.email
        let id = request.body.id
        console.log(email, id)
        if (data[email] != undefined) {
            const filteredPeople = data[email].blogs.filter((item) => item.id !== id);
            data[email].blogs = filteredPeople
            response.send("Deleted Blog")
        } else response.send("Error")

    })

    app.post('/creatblog', (request, response) => {
        const email = request.body.email;
        const newBlog = {
            "id": `${request.body.id}`,
            "title": `${request.body.title}`,
            "timestamp": `${request.body.timestamp}`,
            "body": `${request.body.body}`,
            "edited": `${false}`,
            "author": `${request.body.author}`,
            "time": `${request.body.time}`,
        };
        if (data[email] !== undefined) {
            data[email].blogs.push(newBlog);
            console.log(data);
            response.send("Created Blog");
        } else {
            data[email] = { "blogs": [] };
            data[email].blogs.push(newBlog)
        }
    });


    app.post('/login', (reqest, response) => {
        let email = reqest.body.email;
        let password = reqest.body.password;
        console.log(email, password)
        if (users[email] != undefined) {
            if (users[email].password == password) response.send(users[email]);
            else response.send("WRONG PASSWORD");
        } else response.send("NO USER FOUND")
    })

    app.post('/userinfo', (reqest, response) => {
        let email = reqest.body.email;
        console.log(email)
        if (users[email] != undefined) response.send(users[email]);
        else response.send("NO USER FOUND")
    })
    app.post('/updateuserinfo', (reqest, response) => {
        let email = reqest.body.email
        let password = reqest.body.password
        let name = reqest.body.name
        console.log(password, name);
        if (users[email] != undefined) {
            users[email].name = name;
            users[email].password = password;
            response.send("Updated")
        } else response.send("NO USER FOUND")
    })

    app.post('/registeruserinfo', (request, response) => {
        let email = request.body.email;
        let password = request.body.password;
        let name = request.body.name;

        if (users[email] !== undefined) {
            response.send("User already present");
        } else {
            users[email] = { name: name, password: password };
            response.send("User Registered");
        }
    });


})