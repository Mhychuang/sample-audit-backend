const dboperations = require('../dboperation/ballot_RDBOperation');



const getBallot_RByCounty_ID_CON = async (req, res) => {

    console.log(req.params.countyid)
    try {

        dboperations.getBallot_RByCounty_ID(req.params.countyid).then(result => {
            console.log(result);
            res.json(result[0]);
        })

    } catch (error) {
        console.log('error', error);
    }

}



const getCountyNameVotingDate_CON = async (req, res) => {

    console.log(req.params.countyid)

    let data = {}
    let votingList = []


    try {

        dboperations.getCountyNameVotingDate(req.params.countyid).then(result => {
            //console.log('votingDateCon',result);

            if (result) {

                data['CountyName'] = result[0][0].CountyName

                result[0].forEach(element => {
                    //console.log('element',element.VotingDate);
                    votingList.push(element.VotingDate)
                })

                data['votingList'] = votingList
                res.json(data);

            } else {

                //throw new Error('failed to get data from database');
                console.log('failed to get data from database')

            }


        })

    } catch (error) {
        console.log('error', error);
    }


}



const getVotingMethodDate_CON  = async (req, res) =>{

    //difference in req.query and req.param
    // req.param is in the URL path, query is afeter the? in the postman edit the params

    console.log('countyName', req.query.countyName)
    console.log('votingDate', req.query.votingDate)
    

    let countyName = req.query.countyName
    let votingDate = req.query.votingDate

    


    try {

        dboperations.getVotingMethodDate(countyName, votingDate).then(result => {

        if (result){
            console.log('VotingMethodResults', result[0][0])
            res.json(result[0][0]);

        }
        else{
            console.log('failed: getVotingMethodDate_CON')
        }

        })
        
    } catch (error) {
        console.log('error', error);        
    }

}


const getballotReconcileDetail_CON = async (req, res) =>{
    console.log('countyName', req.query.countyName)
    console.log('votingDate', req.query.votingDate)
    let countyName = req.query.countyName
    let votingDate = req.query.votingDate

    try {

        dboperations.getballotReconcileDetail(countyName, votingDate).then(result => {
            console.log(result)

        if (result){
            console.log('getballotReconcileDetail', result[0])
            res.json(result[0]);

        }
        else{
            console.log('failed: getballotReconcileDetail_CON')
        }

        })
        
    } catch (error) {
        console.log('error', error);        
    }
}

//node.js no one line to export all

module.exports = { getBallot_RByCounty_ID_CON, getCountyNameVotingDate_CON, 
     getVotingMethodDate_CON,getballotReconcileDetail_CON }