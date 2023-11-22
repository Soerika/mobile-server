require('dotenv').config();
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

User = require('../models/user');
Doctor = require('../models/doctor');

const jwt = require('jsonwebtoken');


class userAuthController {
    #refreshTokens = []

    login(req, res, next) {
        const query = {
            email: req.body.email,
            password: req.body.password
        }

        Promise.all([
            User.findOne(query),
            Doctor.findOne(query)
         ])
         .then(results=>{
            const user =  results[0] //// first call in Promise.all
            const doctor = results[1] //// second call in Promise.all
            if(user) {
                const userInfo = {
                    _id: user._id,
                    email: req.body.email,
                    password: req.body.password,
                }
                const accessToken = jwt.sign(userInfo, accessTokenSecret);
                // return res.status(200).json({ accessToken: accessToken });
                return res.status(200).json({ ...userInfo});
            }

            else if(doctor) {
                console.log('doctor login');
                const doctorInfo = {
                    _id: doctor._id,
                    email: req.body.email,
                    password: req.body.password,
                }

                const accessToken = jwt.sign(doctorInfo, accessTokenSecret);
                // return res.status(200).json({ accessToken: accessToken });
                return res.status(200).json({...userInfo});
            }

            return res.status(404).json({
                msg: 'user or doctor not found'
            })
            })
         .catch(errors=>{
            console.log( errors);
            next()
         })


    }

    signup(req, res, next) {
        const data = req.body;

        // validation
        if(!data.email || !data.password || !data.firstName || !data.lastName) {
            res.status(400).json({
                message: "missing field",
            })
            return next();
        }

        User.findOne({
            "email": req.body.email,
        }).exec().then((user) => {
            if(!user) {
                const newUser = new User(req.body);
                newUser.save();

                const userInfo = {
                    _id: req.body.id,
                    email: req.body.email,
                    password: req.body.password,
                }
                
                const accessToken = jwt.sign(userInfo, accessTokenSecret);
                // res.status(200).json({ accessToken: accessToken });
                return res.status(200).json({...userInfo});
            } else {
                res.status(400).json({ message: "user exist" });
            }
        }).catch(next);
    }

    refresh(req, res, next) {
        res.status(200).json({
            refresh: "refresh"
        })
    }

    logout(req, res, next) {
        this.#refreshTokens = this.#refreshTokens.filter(token => token !== req.body.token)
        res.sendStatus(204)
    }
}

module.exports = new userAuthController;