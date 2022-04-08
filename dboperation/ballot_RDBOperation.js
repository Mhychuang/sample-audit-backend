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
        

        console.log('dboperation_VotingDates',product)
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

        console.log('dboperation_VotingDates_results!',product)
        return product.recordsets;

    } catch (error) {

        console.log(error);
        
    }
}

async function getballotReconcileDetailDetail(countyName, votingDate ){
    //console.log('dboperation_ballotReconcileDetail',countyName, votingDate)

    if (countyName && votingDate){
        try {
            let pool = await sql.connect(config);
            let product = await pool.request()
                .input('input_countyName', sql.NVarChar, countyName)
                .input('input_date', sql.NVarChar, votingDate)
                .query(` SELECT 
                 [BallotReconcileId]
                ,[CountyId]
                ,[SampleId]
                ,[VotingSite]
                ,[VotingDate]
                ,[BallotStyle]
                ,[OriginalCount]
                ,[Spoiled]
                ,[Provisional]
                ,[Unused]
                ,[Challenged]
                ,[BallotsCast]
                ,[Comments]
                ,[RecordCreateDate]
                ,[RecordUpdateDate] from 
                BallotReconcile where CountyName = @input_countyName and VotingDate = @input_date
                order by [VotingSite], [BallotStyle]
                `)
            return product.recordsets;
            
        } catch (error) {
            console.log(error)
        }
 


    }else{
        console.log('check CountyName and votingDate')

    }


}


async function updateBallotReconcile(BallotReconcileId,OriginalCount,Spoiled,Provisional,Challenged,Unused,BallotsCast,Comments) {
    console.log('update Ballot Reconcile in dbOperation',BallotReconcileId, OriginalCount,Spoiled,Provisional,Challenged,Unused,BallotsCast,Comments)
    try {
        let pool = await sql.connect(config);
       
        let detail = await pool.request()
            .input('BallotReconcileId', sql.Int, BallotReconcileId)
            .input('OriginalCount', sql.Int, OriginalCount)
            .input('Spoiled', sql.Int, Spoiled)
            .input('Provisional', sql.Int, Provisional)
            .input('Challenged', sql.Int, Challenged)
            .input('Unused', sql.Int, Unused)
            .input('BallotsCast', sql.Int, BallotsCast)
            .input('Comments', sql.NVarChar, Comments)
            
            .query(`UPDATE BallotReconcile
                    SET
                    OriginalCount=@OriginalCount, 
                    Spoiled=@Spoiled,
                    Provisional =@Provisional,
                    Challenged =@Challenged,
                    Unused = @Unused,
                    BallotsCast = @BallotsCast,
                    Comments = @Comments
                    WHERE BallotReconcileId = @BallotReconcileId`);
        console.log('in dbOP detail',detail.recordsets)
        return detail.recordsets;

    }
    catch (error) {
        console.log('updateCandidate error', error);
//        console.log(error);
    }
}


module.exports = {getBallot_RByCounty_ID, getCountyNameVotingDate, getVotingMethodDate, getballotReconcileDetailDetail,updateBallotReconcile}
