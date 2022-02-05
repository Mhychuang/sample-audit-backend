const config = require('../dbconfig');
const sql = require('mssql');

const express = require('express');
const { password, user } = require('../dbconfig');
const router = express.Router();
const sampleAuditHelpers = require('../dboperation/sampleAuditDbOperation')
const sampleAuditController = require('../controllers/sampleAuditController')


router.get('/getAllSample', sampleAuditController.getAllSampleCon)

router.get('/getSample/:countyid', sampleAuditController.getSampleByCountyCon)





router.get('/getSampleIdByCounty/:countyid', sampleAuditController.getSampleIdByCountyCon)

router.get('/getDetailByCountySampleId/:countyid/:sampleid', sampleAuditController.getSampleDetailByCountySampleIdCon)

router.get('/getCandidateByCountySampleId/:countyid/:sampleid', sampleAuditController.getCandidateByCountySampleIdCon)

router.post('/getDefaultCandidateByCountySampleId', sampleAuditController.getDefaultCandidateByCountySampleIdCon)

router.put('/updateCandidate', sampleAuditController.updateCandidateCon)

router.post('/addCandidate' ,sampleAuditController.addCandidateCon)

router.put('/updateSample', sampleAuditController.updateSampleCon)

router.post('/orders', sampleAuditController.addOrderCon)

router.delete('/deleteCandidate/:SampleCandidateId', sampleAuditController.deleteCandidateCon)





module.exports = router;