const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
// const bycript = require("bcrypt");
const { render } = require("ejs");

exports.loadIndex = async (req, res) => {
    if(req.session.user_id){
        res.redirect('/profile');
    } else{

        res.render('index');
    }
}

exports.loadLogin = async (req, res) => {
    console.log("Loading index...");
    res.render('login', { message: "" });
}

exports.loadSignup = async (req, res) => {
    console.log("Loading index...");
    res.render('signUp', { message: "" });
}

exports.doSignup = async (req, res) => {
    console.log("signuup data...", req.body);
    try {       
        // Create a User
        const user = {
            username: req.body.username,
            password: req.body.password,
            name: req.body.name ? req.body.name : ''
        };
        // Save User in the database
        var userData = await User.create(user);
        if(userData){
            res.redirect('/');
            // res.render('signUp', { message: "Sucessfully signed up", success: true});
        } else {
            res.render('signUp', { message: "Sign Up failed" });    
        }
    } catch (e) {
        res.render('signUp', { message: "Sign Up failed" });
    }
}
exports.verifyLogin = async (req, res) => {
    try {
        console.log(req.session)
        var username = req.body.username;
        var password = req.body.password;
        var userData = await User.findOne({ where: { username: username, password: password } })
        if (userData) {
            req.session.user_id = userData.id;
            res.redirect('profile');
        } else {
            console.log(userData);
            res.render('login', { message: "Email and password is incorrect" });
        }
    } catch (e) {
        console.log("Error logging in", e);
    }
}

exports.loadProfile = async (req, res) => {
    const id = req.session.user_id;
    console.log(`findOne: ${id}`);
    var userData = await User.findByPk(id)
    res.render('profile', { data: userData });
}

exports.loadBuds = async (req, res) => {
    const id = req.session.user_id;
    console.log(`findOne: ${id}`);
    var userData = await User.findByPk(id)
    res.render('buds', { data: userData });
}
// before rendering the view gets this data
exports.loadGames = async (req, res) => {
    const id = req.session.user_id;
    console.log(`findOne: ${id}`);
    var userData = await User.findByPk(id)
    res.render('games', { data: userData });
}

exports.loadBud = async (req, res) => {
    const id = req.params.id;
    console.log(`findOne: ${id}`);
    var userData = await User.findByPk(id)
    res.render('bud1', { data: userData });
}

exports.logout = async (req, res) => {
    req.session.destroy();
    res.redirect('/');
}
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Username can not be empty!"
        });
        return;
    }
    // Create a User
    const user = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name ? req.body.name : ''
    };
    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(`findOne: ${id}`);
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// load buds

// exports.loadBuds = async (req, res) => {
//     const id = req.session.user_id;
//     console.log(`findOne: ${id}`);
//     var userData = await User.findByPk(id)
//     res.render('buds', { data: userData });
// }

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

};
// Update a User by the id in the request
exports.update = (req, res) => {

};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};