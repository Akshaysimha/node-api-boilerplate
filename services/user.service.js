const models = require('../models');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const mongoUser = require('../mongo_model/userMongo')

const User = models.User;
const SECRET = 'userRegistrationToken'

exports.getAllUsers = async (req) => {
    try {
        const userId = await this.getUserId(req);
        if(!userId || userId.message){
            return {success: false, error: 'user not authenticated'}
        }
        const users = await User.findAll();
        return {success: true, users}
    } catch (err) {
        console.log('Get all user error', err.message);
        return {success: false, error: err.message}
    }
}

exports.createUser = async (req) => {
    try{
        const { firstName, lastName, email, password, passwordConfirmation } = req.body;
        if(password !== passwordConfirmation) {
            throw {message: 'password dose not match'}
        }
        // passwordEncripted = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
        passwordEncripted = await bcrypt.hash(password, 12);
        const user = await User.create({
            firstName,
            lastName,
            email,
            passwordEncripted
        })
        return {success: true, user}
    }catch(err) {
        console.log('create user error', err.message);
        return {success: false, error: err.message}
    }
}

exports.signInUser = async (req) => {
    try{
        const { email, password } = req.body;
        // passwordEncripted = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
        const user = await User.findOne({
            where: { email }
        })
        if(!user) {
            throw {success: false, message: 'user not found'}
        }
        const valid = await bcrypt.compare(password, user.passwordEncripted)
        if(!valid) {
            throw {success: false, message: 'password dont match'}
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET)

        return {success: true, message: 'user authenticated', token}
    } catch(err) {
        console.log('create user error', err.message);
        return {success: false, error: err.message}
    }
}

exports.getUserId = async (req) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1]: null;
    console.log(token)
    if(!token) {
        return null
    }
    try{
        const { id } = jwt.verify(token, SECRET);
        return id
    } catch(err){
        return {success: false, message: err.message}
    }
}


// Mongo functions

exports.getAllMongoUsers = async(req) => {
    try{
        const users = await mongoUser.get();
        return {success: true, users}
    } catch(err) {
        console.log('Get all user error', err.message);
        return {success: false, error: err.message}
    }
}

exports.createMongoUsers = async(req) => {
    try{
        const { firstName, lastName, email, password, passwordConfirmation } = req.body;
        if(password !== passwordConfirmation) {
            throw {message: 'password dose not match'}
        }
        passwordEncrypted = await bcrypt.hash(password, 12);
        var user = new mongoUser();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.passwordEncrypted = passwordEncrypted;
        const result = await user.save()
        return {success: true, user: result}
    } catch(err) {
        console.log('create user error', err.message);
        return {success: false, error: err.message}
    }
}
