import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs, { stat } from 'fs'

// use dotenv
dotenv.config();
const PORT = process.env.PORT || 3000;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD

const RECEIPIENT_EMAIL = process.env.RECEIPIENT_EMAIL
import { Post } from "./models/Post.js";
import { Comment } from "./models/Comment.js";
import mongoose from "mongoose";


const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
}); 


const tranporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSWORD
    }
})

const mailOptions = {
    from: SENDER_EMAIL,
    to: RECEIPIENT_EMAIL,
    subject: "Hello from Nodejs",
    text: "Hello from Nodejs",
    html: `
    <h1>Hello from Nodejs</h1>
    <p>This is a test email sent from Nodejs</p>
    `
}

app.get("/send-email", async (req, res) => {
    try {
        const info = await tranporter.sendMail(mailOptions).then((info) => {
            console.log(info);
            res.status(200).json({
                success: true,
                message: "Email sent successfully"
            })
        })    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error sending email"
        })
    }
});

app.post('/send-email', async (req, res) => {
    const {email} = req.body

    const resipient = email
    
    const sendOptions = {
        from: SENDER_EMAIL,
        to: resipient,
        subject: "Hello from Nodejs",
        text: "Hello from Nodejs",
        html: `
        <h1>Hello ${resipient} from Nodejs</h1>
        <p>This is a test email sent from Nodejs</p>
        `
    }
    try {
        const info = await tranporter.sendMail(sendOptions)
        console.log(info);
        res.status(200).send({
            message: "Email sent Successfully",
            data: info
        })
    } catch (error) {
        res.status(500).send({
            message: "Failed to send Email",
            data: error            
        })
    }
})

app.post('/posts', async (req, res) => {
    try {
        const post = new Post({
            title: req.body.title,
            description: req.body.description || ''
        })
        post.save()

        res.status(201).send({
            message: "Post Created Successfully",
            data: post
        })
    } catch (error) {
        res.status(500).send({
            message: "There was an Error in creating a post"
        })
    }
})

// const createdPost = {
//     title: 'Post example 2',
//     description: 'Example description of Post 2'
// }

// const runFunc = () =>{
//     Post.create(createdPost).then(() => {
//         console.log('Post created successfully');
//     }).catch((e) => {
//         console.log("Error in creating post");
//     })
// }

// runFunc()

const addComments = async () => {
    try {
        const comment1 = await Comment.create({
            text: "Hello First Comment"
        })
        const comment2 = await Comment.create({
            text: "Hello Second Comment"
        })
        const comment3 = await Comment.create({
            text: "Okay Third Comment"
        })
        console.log("Comments added Successfully");
    } catch (error) {
        console.log("Error inserting comments", error);
    }
}

const addPosts = async (commentIDs) => {
    try {
        const post = await Post.create({
            title: 'Post title one created with Comments',
            description: 'Description of post with comments',
            comments: commentIDs
        })
        console.log("Post Added", post);
    } catch (error) {
        console.log("There was an error inserting post", error);
    }
}
// addComments()

const createPostWithComments = async () => {
    try {
        const commentIDs = await addComments() // insert comments and get their IDs
        await addPosts(commentIDs) // create post using those comment IDs
        console.log(commentIDs);
        
        console.log("Post with comment added Successfully");
        mongoose.connection.close() // close the connection
    } catch (error) {
        console.log("There was an error adding post with comments", error);
    }
}

// createPostWithComments()

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate("comments")
        res.status(200).send({
            data: posts
        })
    } catch (error) {
        res.status(500).send({
            message: "There was an error in getting posts"
        })
    }
})

// get single post
app.get('/posts/:id', async(req, res) => {
    const {id} = req.params
    
    try {
        const post = await Post.findById(id)
        res.status(200).send({
            data: post
        })
    } catch (error) {
        res.status(500).send({
            message: "There was an Error"
        })
    }
})

app.put('/posts/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body        
        
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {title, description}, 
            {new: true}
        )

        res.status(200).send({
            message: "Post Updated Successfully",
            data: updatedPost
        })
    } catch (error) {
        res.status(500).send({
            message: "There was an error"
        })
    }
})


const MONGO_URI = process.env.MONGO_URI

try {
    mongoose.connect(MONGO_URI)
    console.log("Connected to Database");
    app.listen(PORT, () => {
        console.log(`Server is running on port localhost:${PORT}`);
    });
} catch (error) {
    console.log("Failed to connect to database");
}
