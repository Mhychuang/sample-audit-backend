const config = require('../dbconfig');
const sql = require('mssql');

const express = require('express');
const { password, user } = require('../dbconfig');
const router = express.Router();
const sampleAuditHelpers = require('../dboperation/sampleAuditDbOperation')
const sampleAuditController = require('../controllers/sampleAuditController')





router.get('/getAllSample', sampleAuditController.getUserLogin)


router.put('/updateWebUser', userController.updateWebUser )



module.exports = router;