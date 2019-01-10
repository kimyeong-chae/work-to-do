import express from 'express';
import Account from '../models/account';
const router = express.Router();
import mongoose from 'mongoose';
import Memo from "../models/memo";

router.post('/signup', (req, res) => {

    // CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // CHECK PASS LENGTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // CHECK USER EXISTANCE
    Account.findOne({ username: req.body.username }, (err, exists) => {
        if (err) throw err;
        if(exists){
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        console.log('req.body : ', req.body);
        // CREATE ACCOUNT
        let account = new Account({
            username: req.body.username,
            password: req.body.password,
            department: req.body.department,
        });

        account.password = account.generateHash(account.password);
        console.log('account : ', account);
        // SAVE IN THE DATABASE
        account.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });

    });
});

router.post('/signin', (req, res) => {

    if(typeof req.body.password !== "string") {
        return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
        });
    }

    // FIND THE USER BY USERNAME
    Account.findOne({ username: req.body.username}, (err, account) => {
        if(err) throw err;
        // CHECK ACCOUNT EXISTANCY
        if(!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // CHECK WHETHER THE PASSWORD IS VALID
        if(!account.validateHash(req.body.password)) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // ALTER SESSION
        let session = req.session;
        console.log('session : ',session);
        session.loginInfo = {
            _id: account._id,
            username: account.username,
            department: account.department,
        };

        // RETURN SUCCESS
        return res.json({
            success: true,
            account,
        });
    });
});

router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }

    res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => { if(err) throw err; });
    return res.json({ sucess: true });
});

router.get('/', (req, res) => {
    if(typeof req.session.loginInfo === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }
    // GET OLDER MEMO
    Account
        .find()
        .sort({_id: -1})
        .exec((err, accounts) => {
            if(err) throw err;
            console.log('account data : ',accounts);
            return res.json(accounts);
        });
});

export default router;