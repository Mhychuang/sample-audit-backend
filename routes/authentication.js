const config = require('../dbconfig');
const sql = require('mssql');

const express = require('express');
const { password, user } = require('../dbconfig');
const router = express.Router();
const userHelpers = require('../dboperation/user.js')
const userController = require('../controllers/userController')


http://localhost:4000/auth/testuser1@alamance.gov/randomHash1
router.put('/check/:email', userController.getUserLogin)


router.put('/updateWebUser', userController.updateWebUser )

router.get('/allCounty', userController.getCountyValueCon)

router.get('/getAppList', userController.getAppListCon)



module.exports = router;