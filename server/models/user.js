const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, lowercase: true, unique: true, required: [true, "cannot be blank"], match: [/^a-zA-Z0-9]=$/, 'is invalid'], index: true},
    password: {
        type: String,
        required: [true, " cannot be blank"],
        trim: true,
        minlength: 8,
        maxlength: 255
    },
    email: { type: String, lowercase: true, unique: true, required: [true, "cannot be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    isAdmin: Boolean,
    salt: String,
    hash: String,
    phone: Number
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.setPassword = function(password) {
    this.password = password;
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
    return jwt.sign({
        id: this._id,
        username: this.username,
    }, process.env.SECRET, {expiresIn: 60 * 60 });
};

/*UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({

    })
};*/

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
    }
};

mongoose.model('User', UserSchema);
