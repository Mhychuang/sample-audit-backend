const config = require('../dbconfig');
const sql = require('mssql');

const express = require('express');
const { password, user } = require('../dbconfig');
const router = express.Router();
const sampleAuditHelpers = require('../dboperation/sampleAuditDbOperation')
const sampleAuditController = require('../controllers/sampleAuditController')


router.get('/getAllSample', sampleAuditController.getSamples)

router.get('/sampleAudit/:countyid', sampleAuditController.getSampleByCounty)

router.get('/allCounty', sampleAuditController.getSampleAllCounty)

router.get('/getSampleIdByCounty/:countyid', sampleAuditController.getSampleIdByCountyCon)

router.get('/getDetailByCountySampleId/:countyid/:sampleid', sampleAuditController.getSampleDetailByCountySampleIdCon)

router.get('/getCandidateByCountySampleId/:countyid/:sampleid', sampleAuditController.getCandidateByCountySampleIdCon)

router.put('/updateCandidate/:CandidateId', sampleAuditController.updateCandidateCon)

router.put('/updateSample/:countyid/:sampleid', sampleAuditController.updateSampleCon)

router.post('/orders', sampleAuditController.addOrderCon)


module.exports = router;