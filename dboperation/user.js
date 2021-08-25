const config = require('../dbconfig');
const sql = require('mssql');

const express = require('express');
//const { password, user } = require('../dbconfig');
const router = express.Router();


async function getUser(email, password) {
    try {
        let pool = await sql.connect(config);
        let userInfo = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query(`
                select * from WebUser
                where Email =@email and UserPassword = @password

                `)
        return userInfo.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getUserByEmail(email) {
    
    let pool = await sql.connect(config);
    let userInfo = await pool.request()
        .input('email', sql.NVarChar, email)
        .query(`
                select * from WebUser
                where Email =@email
                `)
    return userInfo.recordsets;
}

//for updating the user
async function updatePassword(WebUserId, UserPassword) {
    try {
        let pool = await sql.connect(config);

        let detail = await pool.request()
            .input('WebUserId', sql.Int, WebUserId)
            .input('UserPassword', sql.NVarChar, UserPassword)
            .query(`UPDATE WebUser
                    SET
                    UserPassword = @UserPassword,
                    IsDefault = 'False'
                    WHERE WebUserId = @WebUserId`);
        console.log(detail)
        return detail.recordsets;

    }
    catch (error) {
        return error
    }
}




module.exports = {getUser, getUserByEmail, updatePassword}