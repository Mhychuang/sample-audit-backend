const express = require('express');
const router = express.Router();
const ballot_RController = require('../controllers/ballot_RController')




router.get('/getBRDetail/:countyid', ballot_RController.getBallot_RByCounty_ID_CON)

router.get('/getVotingDate/:countyid', ballot_RController.getCountyNameVotingDate_CON)

router.get('/getVotingDate/:countyid', ballot_RController.getCountyNameVotingDate_CON)

router.get('/getVotingMethod/', ballot_RController.getVotingMethodDate_CON)

router.get('/getballotReconcileDetail/', ballot_RController.getballotReconcileDetail_CON)



module.exports = router;