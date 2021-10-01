const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', (next) => {
    // this === user
    if (this.isModified('password')) {
        // encrypt password.
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) return next(err)

            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) return next(err)
                this.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = (plainPassword, cb) => {
    // e.g., plainPassword 1234567
    // encrypted $2b$10$l492vQ0M4s9YUBfwYkkaZOgWHExahjWC
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = (cb) => {
    // create token using jsonwebtoken
    const token = jwt.sign(this._id.toHexString(), 'secretToken')

    this.token = token
    this.save((err, user) => {
        if (err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = (token, cb) => {
    // decode
    jwt.verify(token, 'secretToken', (err, decoded) => {
        // Find the matching user by the user id and
        // comparing tokens from the client(cookie) and DB
        this.findOne({ "_id": decoded, "token": token }, (err, user) => {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}



const User = mongoose.model('User', userSchema)

module.exports = { User }