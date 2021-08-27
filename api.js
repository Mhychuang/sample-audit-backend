var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var compression = require('compression');
var helmet = require('helmet');

const dboperations = require('./dboperations');
const Db = require('./dboperations');
const auth = require('./routes/authentication');
const sampleAudit = require('./routes/sampleAuditRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'))

//http://localhost:4000/files/User-Manual.docx
app.use('/files', express.static('files'));


app.use(compression());
app.use(helmet());

//app.use('/api', router);
app.use(router);
app.use('/auth', auth);
app.use('/sampleAudit', sampleAudit)

router.use((request, response, next) => {
    console.log('middleware');
    next();
})



//http://localhost:4000/api/sampleAudit/1
//http://localhost:4000/sampleAudit/1

// router.route('/sampleAudit/:countyid').get((request, response) => {

//     dboperations.getByCounty(request.params.countyid).then(result => {
//         console.log(result)
//         response.json(result[0]);
//     })

// })

// //http://localhost:4000/allCounty
// router.route('/allCounty').get((req, res) => {

//     dboperations.getCoutyValue().then(result => {
//         res.json(result[0]);
//     })
// })

// //http://localhost:4000/getSampleIdByCounty/1
// router.route('/getSampleIdByCounty/:countyid').get((req, res) => {

//     dboperations.getSampleIdByCounty(req.params.countyid).then(result => {
//         res.json(result[0]);
//     })
// })

// //http://localhost:4000/getDetailByCountySampleId/1/2
// router.route('/getDetailByCountySampleId/:countyid/:sampleid').get((req, res) => {


//     dboperations.getDetailByCountySampleId(req.params.countyid, req.params.sampleid).then(result => {
//         console.log(req.params.countyid, req.params.sampleid)
//         res.json(result[0][0]);
//     }).catch(Error => {
//         console.log('getDetailByCountySampleId', Error)
//     }).finally(
//         console.log('check getDetailByCountySampleId route')    )
// })

// //http://localhost:4000/getCandidateByCountySampleId/1/1
// router.route('/getCandidateByCountySampleId/:countyid/:sampleid').get((req, res) => {


//     dboperations.getCandidateByCountySampleId(req.params.countyid, req.params.sampleid).then(result => {
//         res.json(result[0]);
//     }).catch(Error => {
//         console.log(Error)
//     })
// })


// //http://localhost:4000/updateCandidate/1
// router.route('/updateCandidate/:CandidateId').put((req, res) => {

//     let can = { ...req.body }
//     console.log('can', can)
//     dboperations.updateCandidate(can.SampleCandidateId, can.Machine, can.HandToEye, can.DifferenceInCount)
//         .then(result => {
//             res.status(201).json(result);

//         })

// })


// //http://localhost:4000/updateSample/1/3
// router.route('/updateSample/:countyid/:sampleid').put((req, res) => {

//     let Sample = { ...req.body }

//     dboperations.updateSample(Sample).then(result => {

//         for (let i = 0; i < 50000; i++) {

//         }

//         res.status(201).json(result);

//     }).then((response) => {
//         console.log(response)


//     }).catch((Error) => {
//         console.log(Error)
//     })

// })


// router.route('/orders').post((request, response) => {
//     let order = { ...request.body }

//     dboperations.addOrder(order).then(result => {
//         response.status(201).json(result);

//     })

// })

// router.route('/userAuthentication').post((req, res) => {
//     let userEmail = req.userEmail


// })


// app.use((error, req, res, next) => {
//    res.status(error.status || 500)
//    res.json({
//        status: error.status,
//        message: error.message,
//        stack: error.stack
//    })
// })


var port = process.env.PORT || 4000;
app.listen(port);
console.log('Sample API is runnning at ' + port);
