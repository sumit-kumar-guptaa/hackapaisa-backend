const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user'); // Assuming this model exists and is correctly defined

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Corrected 'expess.ststic' and '__diname'

app.get("/", function(req, res){
    res.render("index");
});

app.get("/read", async function(req, res){
    try {
        let users = await userModel.find();
        res.render("read", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
});

app.get("/delete/:id", async function(req, res){
    try {
        // Delete user by ID
        await userModel.findOneAndDelete({_id: req.params.id});
        res.redirect("/read"); // Redirect to the list of users after deletion
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
});

app.post("/create", async function(req, res){
    let { name, email, image } = req.body;
    
    try {
        // Corrected 'crerate' to 'create'
        let createdUser = await userModel.create({
            name,
            email,
            image
        });

        res.redirect("/read"); // Redirect to the user list after creation
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.listen(9999, () => {
    console.log(`Server is up and running on port : 9999`);
});
