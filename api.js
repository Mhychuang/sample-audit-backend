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
const BallotReconcile = require('./routes/ballot_RRoutes');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'))

//http://localhost:4000/files/User-Manual.docx
//https://sampleaudit.ncsbe.gov/files/User-Manual.docx
app.use('/files', express.static('files'));



app.use(compression());
app.use(helmet());

//app.use('/api', router);
app.use(router);
app.use('/auth', auth);
app.use('/sampleAudit', sampleAudit)
app.use('/ballotReconcile', BallotReconcile)

router.use((request, response, next) => {
    console.log('middleware');
    next();
})



var port = process.env.PORT || 4001;
app.listen(port);
console.log('Sample API is runnning at ' + port);
