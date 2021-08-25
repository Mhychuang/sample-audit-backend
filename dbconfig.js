
const config = {
    user:'webAppSampleAudit',
    password:'Hornets#MJordan23',
    server:'SBEDBPROD04',
    database:'ELECTION_AUDIT',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename:'SBEDBDW'
    },
    port:1432
}

module.exports = config;
