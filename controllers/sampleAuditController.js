
const dboperations = require('../dboperation/sampleAuditDbOperation');


const getAllSampleCon = async (req, res) => {
    dboperations.getAllSample().then(result => {
        res.json(result[0]);
    })
}

const getSampleByCountyCon = async (req, res) => {
    dboperations.getSampleByCounty(req.params.countyid).then(result => {
        console.log(result);
        res.json(result[0]);
    })
}

const getCountyValueCon = async (req, res) => {
    dboperations.getCoutyValue().then(result => {
        res.json(result[0]);
    })
}

const getSampleIdByCountyCon = async (req, res) => {
    dboperations.getSampleIdByCounty(req.params.countyid).then(result => {
        res.json(result[0]);
    })
}

const getSampleDetailByCountySampleIdCon = async (req, res) => {
    let countyid = req.params.countyid;
    let sampleid = req.params.sampleid;

    try {
        const result = await dboperations.getSampleDetailByCountySampleId(countyid, sampleid);
        res.json(result[0][0]);
        })
    } catch (error) {
        console.error();
        console.log(error);
        console.log('check getDetailByCountySampleId route');
    }
}

const getCandidateByCountySampleIdCon = async (req, res) => {
    let countyid = req.params.countyid;
    let sampleid = req.params.sampleid;

    try {
        const result = await dboperations.getCandidateByCountySampleId(countyid, sampleid);
        res.json(result[0]);
    } catch (error) {
        console.error();
        console.log(error);
    }
}

const updateCandidateCon = async (req, res) => {
    let can = { ...req.body }
    try {
        const result = await updateCandidate(can.SampleCandidateId, can.Machine, can.HandToEye, can.DifferenceInCount)
        res.status(201);
    } catch (error) {
        console.log('can', error);
        console.error();
        console.log(error);
    }
}

const updateSampleCon = async (req, res) => {
    let sample = {...req.body}

    dboperations.updateSample(Sample).then(result => {
        for (let i = 0; i < 50000; i++) {
            // ???
        }
        res.status(201).json(result);
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}

const addOrderCon = async (req, res) => {
    let order = {...req.body}

    dboperations.addOrder(order).then(result => {
        res.status(201).json(result);
    })
}


module.exports = {getAllSampleCon, getSampleByCountyCon, getCountyValueCon, getSampleIdByCountyCon,
                  getSampleDetailByCountySampleIdCon, getCandidateByCountySampleIdCon,
                  updateCandidateCon, updateSampleCon, addOrderCon,}