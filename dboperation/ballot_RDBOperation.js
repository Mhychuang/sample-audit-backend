var config = require('../dbconfig');
const sql = require('mssql');
var moment = require('moment');


async function getBallot_RByCounty_ID(countyId){
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, countyId)
            .query("SELECT * from BallotReconcile where CountyId = @input_parameter");
        
        console.log(product)
        return product.recordsets;

    } catch (error) {

        console.log(error);
        
    }

}

async function getCountyNameVotingDate(countyId){
    console.log('dboperation_countyID',countyId)
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_parameter', sql.Int, countyId)
            .query("select CountyName, VotingDate from vw_Ballot_Reconcile where CountyId = @input_parameter");
        

        //console.log('dboperation_VotingDates',product)
        return product.recordsets;

    } catch (error) {

        console.log(error);
        
    }
}


async function getVotingMethodDate(countyName, votingDate){
    console.log('dboperation_getVotingMethodDate',countyName, votingDate)
    try {
        let pool = await sql.connect(config);
        let product = await pool.request()
            .input('input_countyName', sql.NVarChar, countyName)
            .input('input_date', sql.NVarChar, votingDate)
            .query(`SELECT distinct VotingMethod, ElectionDate from 
            BallotReconcile where CountyName = @input_countyName and VotingDate = @input_date
            `)

        //console.log('dboperation_VotingDates',product)
        return product.recordsets;

    } catch (error) {

        console.log(error);
        
    }
}

async function getballotReconcileDetail(countyName, votingDate ){
    console.log('dboperation_ballotReconcileDetail',countyName, votingDate)

    if (countyName && votingDate){
        try {
            let pool = await sql.connect(config);
            let product = await pool.request()
                .input('input_countyName', sql.NVarChar, countyName)
                .input('input_date', sql.NVarChar, votingDate)
                .query(` SELECT [CountyId]
                ,[SampleId] as id
                ,[VotingSite]
				,[VotingDate]
                ,[BallotStyle]
                ,[OriginalCount]
                ,[Spoiled]
                ,[Provisional]
                ,[Unused]
                ,[Challenged]
                ,[BallotsCast]
                ,[Comments] from 
                BallotReconcile where CountyName = @input_countyName and VotingDate = @input_date
                `)
            return product.recordsets;
            
        } catch (error) {
            console.log('dboperationError', error)
        }
 


    }else{
        console.log('check CountyName and votingDate')

    }


}


module.exports = {getBallot_RByCounty_ID, getCountyNameVotingDate, getVotingMethodDate, getballotReconcileDetail}