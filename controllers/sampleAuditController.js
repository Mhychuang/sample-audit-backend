
const dboperations = require('../dboperation/sampleAuditDbOperation');



router.route('/getAllSample').get((request, response) => {

    dboperations.getAllSample().then(result => {
        response.json(result[0]);
    })
})


const getSamples = async () =>{
    dboperations.getAllSample().then(result => {
        response.json(result[0]);
    })

}