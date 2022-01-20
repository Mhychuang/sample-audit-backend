
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
        console.log(result);
        res.json(result[0]);
    })
}

const getSampleIdByCountyCon = async (req, res) => {
    dboperations.getSampleIdByCounty(req.params.countyid).then(result => {
        res.json(result[0]);
    })
}

const getSampleDetailByCountySampleIdCon = async (req, res) => {
    console.log(req.params)
    let countyid = req.params.countyid;
    let sampleid = req.params.sampleid;

    try {
        const result = await dboperations.getSampleDetailByCountySampleId(countyid, sampleid);
        //console.log('result from county',result)
        console.log(result[0][0])
        res.json(result[0][0]);
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


const getDefaultCandidateByCountySampleIdCon = async (req, res) => {
    //let countyid = req.params.countyid;
    //let sampleid = req.params.sampleid;
    let data = {...req.body}
    console.log('resetData',data)


    try {
        const result = await dboperations.getDefaultCandidateByCountySampleId(data.countyId, data.sampleId);
        res.json(result);
    } catch (error) {
        console.error();
        console.log(error);
    }
}

const updateCandidateCon = async (req, res) => {
    let can = { ...req.body }
    try {
        const result = await dboperations.updateCandidate(can.SampleCandidateId, can.CandidateName,can.ContestName, can.Machine, can.HandToEye, can.DifferenceInCount);
        res.status(201).json(result[0]);
    } catch (error) {
        console.log('can', error);
        console.error();
        console.log(error);
    }
}


const addCandidateCon = async (req, res) => {

    let can = { ...req.body }
    //let can = req.body
    try {
        const result = await dboperations.addCandidate(can);
        res.status(201).json(result[0]);
    } catch (error) {
        console.log('can', error);
        console.error();
        console.log(error);
    }
}


const updateSampleCon = async (req, res) => {
    let sample = {...req.body}

    console.log('in updateSampleCon', sample)

    dboperations.updateSample(sample).then(result => {
        for (let i = 0; i < 50000; i++) {
            // ???
        }
        res.status(201).json(result);
    }).then((response) => {
        console.log('what is this?',response)
    }).catch((error) => {
        console.log(error)
    })
}



const deleteCandidateCon = async (req, res) => {
    let SampleCandidateId = req.params.SampleCandidateId;
    console.log(SampleCandidateId)

    try {
        const result = await dboperations.deleteCandidate(SampleCandidateId);
        res.status(201).json(result[0]);
    } catch (error) {
        console.log('can', error);
        console.error();
        console.log(error);
    }
}


const addOrderCon = async (req, res) => {
    let order = {...req.body}

    dboperations.addOrder(order).then(result => {
        res.status(201).json(result);
    })
}


module.exports = {getAllSampleCon, getSampleByCountyCon, getCountyValueCon, getSampleIdByCountyCon,
                  getSampleDetailByCountySampleIdCon, getCandidateByCountySampleIdCon,
                  updateCandidateCon, updateSampleCon, addCandidateCon, addOrderCon,deleteCandidateCon,
                  getDefaultCandidateByCountySampleIdCon, }