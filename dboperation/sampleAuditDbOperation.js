var config = require('../dbconfig');
const sql = require('mssql');
var moment = require('moment');



async function getAllSample() {
    try {
        let pool = await sql.connect(config);
        let queryString = `  SELECT
        SampleId, ElectionDate, CountyId, CountyName, TypeOfSample, PrecinctSiteName, Machine, HandToEye, DifferenceInCount
        FROM SampleAudit`
        let products = await pool.request().query(queryString);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}


async function getSampleIdByCounty(countyId) {
    try {
        let pool = await sql.connect(config);
        let sampleOptions = await pool.request()
            .input('input_parameter', sql.Int, countyId)
            .query("SELECT SampleId FROM SampleAudit where CountyId = @input_parameter");
        return sampleOptions.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function getSampleByCounty(countyId) {
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, countyId)
            .query("SELECT * from SampleAudit where CountyId = @input_parameter");
        return product.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getCoutyValue(countyId) {
    try {
        let pool = await sql.connect(config);
        let queryString = `select distinct CountyId, CountyName FROM SampleAudit`
        let countyList = await pool.request().query(queryString);
        return countyList.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}

async function getSampleDetailByCountySampleId(countyId, sampleId) {
    try {
        let pool = await sql.connect(config);
       
        let sampleOptions = await pool.request()
            .input('CountyID', sql.Int, countyId)
            .input('SampleID', sql.Int, sampleId)
            .query(`
SELECT [CountyId]
      ,[SampleId]
      ,[ElectionDate]
      ,[CountyName]
      ,[DateOfCount]
      ,[TimeOfCount]
      ,[TypeOfSample]
      ,[PrecinctSiteName]
      ,[VotingEquipmentUsed]
      ,[ContestName]
      ,[HumanOrMachineError]
      ,[DifferenceExplanation]
      ,[PeoplePartyCounting]
      ,[TotalTime]
      ,[CostOfCount]

FROM [dbo].[SampleAudit] WHERE CountyId = @CountyID AND SampleId = @SampleID`);
        return sampleOptions.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function getCandidateByCountySampleId(countyId, sampleId) {
    try {
        let pool = await sql.connect(config);

        let candidateData = await pool.request()
            .input('CountyID', sql.Int, countyId)
            .input('SampleID', sql.Int, sampleId)
            .query(`  SELECT
       SampleCandidateId
      ,CandidateName
      ,Machine
      ,HandToEye
      ,DifferenceInCount
  FROM SampleAuditCandidate
WHERE CountyId = @CountyID AND SampleId = @SampleID`);
        return candidateData.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function updateCandidate(SampleCandidateId, Machine, HandToEye, DifferenceInCount) {
    console.log('updateFunction', SampleCandidateId, Machine, HandToEye, DifferenceInCount)
    try {
        let pool = await sql.connect(config);
       
        let detail = await pool.request()
            .input('SampleCandidateId', sql.Int, SampleCandidateId)
            .input('Machine', sql.Int, Machine)
            .input('HandToEye', sql.Int, HandToEye)
            .input('DifferenceInCount', sql.Int, DifferenceInCount)
            .query(`UPDATE [ELECTION_AUDIT].[dbo].[SampleAuditCandidate]
                    SET
                    Machine =@Machine,
                    HandToEye = @HandToEye,
                    DifferenceInCount = @DifferenceInCount
                    WHERE SampleCandidateId = @SampleCandidateId`);
        return detail.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function updateSample(Sample) {
    try {
        let pool = await sql.connect(config);

        DateObject = new Date(Sample.DateOfCount);
        TimeObject = new Date(Sample.TimeOfCount);

        const date1 = String(DateObject.getMonth()) + "/" +String(DateObject.getDate()) + "/" + String(DateObject.getFullYear());
        console.log(date1);

       /* console.log('TimeObject', TimeObject.getHours());*/
        //const date2 = "05/31/1990 15:01:54"
        const date2 = date1 + " " + String(TimeObject.getHours()) + ":" + String(TimeObject.getMinutes()) + ":" + String(TimeObject.getSeconds())

        //const date2 = String(TimeObject.getHours()) + ":" + String(TimeObject.getMinutes()) + ":" + String(TimeObject.getSeconds()) + ":" + String(TimeObject.getMilliseconds())

        console.log(date2);

        
        let detail = await pool.request()
            .input('CountyId', sql.Int, Sample.CountyId)
            .input('SampleId', sql.Int, Sample.SampleID)
            .input('DateOfCount', sql.Date, date1)
            .input('VotingEquipmentUsed', sql.NVarChar, Sample.VotingEquipmentUsed)
            .input('HumanOrMachineError', sql.NVarChar, Sample.HumanOrMachineError)
            .input('DifferenceExplanation', sql.NVarChar, Sample.DifferenceExplanation)
            .input('PeoplePartyCounting', sql.NVarChar, Sample.PeoplePartyCounting)
            .input('TotalTime', sql.NVarChar, Sample.TotalTime)
            .input('CostOfCount', sql.SmallMoney, Sample.CostOfCount)
            .input('TimeOfCount', sql.DateTimeOffset, date2)
            .query(`UPDATE [ELECTION_AUDIT].[dbo].[SampleAudit]
                    SET
                    DateOfCount =@DateOfCount,
                    TimeOfCount = @TimeOfCount,
                    VotingEquipmentUsed = @VotingEquipmentUsed,
                    HumanOrMachineError = @HumanOrMachineError,
                    DifferenceExplanation = @DifferenceExplanation,
                    PeoplePartyCounting = @PeoplePartyCounting,
                    TotalTime = @TotalTime,
                    CostOfCount = @CostOfCount
                    WHERE CountyId = @CountyId and SampleId = @SampleId`);
        console.log(detail.rowsAffected)
        return detail.recordsets;

    }
    catch (error) {
        console.log(error);
    }
}


async function addOrder(order) {

    try {
        let pool = await sql.connect(config);
        let insertProduct = await pool.request()
            .input('Id', sql.Int, order.Id)
            .input('Title', sql.NVarChar, order.Title)
            .input('Quantity', sql.Int, order.Quantity)
            .input('Message', sql.NVarChar, order.Message)
            .input('City', sql.NVarChar, order.City)
            .execute('InsertOrders');
        return insertProduct.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}




module.exports = {
    getAllSample:  getAllSample,
    getSampleIdByCounty: getSampleIdByCounty,
    getSampleByCounty:   getSampleByCounty,
    getCoutyValue: getCoutyValue,
    getSampleDetailByCountySampleId: getSampleDetailByCountySampleId,
    getCandidateByCountySampleId: getCandidateByCountySampleId,
    updateCandidate: updateCandidate,
    updateSample: updateSample,
    addOrder: addOrder
}