const config = require('../dbconfig');
const sql = require('mssql');

const express = require('express');
const { password, user } = require('../dbconfig');
const router = express.Router();
const sampleAuditHelpers = require('../dboperation/sampleAuditDbOperation')
const sampleAuditController = require('../controllers/sampleAuditController')


router.get('/getAllSample', sampleAuditController.getAllSampleCon)

router.get('/getSample/:countyid', sampleAuditController.getSampleByCountyCon)

router.get('/allCounty', sampleAuditController.getCountyValueCon)

router.get('/getSampleIdByCounty/:countyid', sampleAuditController.getSampleIdByCountyCon)

router.get('/getDetailByCountySampleId/:countyid/:sampleid', sampleAuditController.getSampleDetailByCountySampleIdCon)

router.get('/getCandidateByCountySampleId/:countyid/:sampleid', sampleAuditController.getCandidateByCountySampleIdCon)

router.put('/updateCandidate', sampleAuditController.updateCandidateCon)

router.put('/updateSample', sampleAuditController.updateSampleCon)

router.post('/orders', sampleAuditController.addOrderCon)


module.exports = router;