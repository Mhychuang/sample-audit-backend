const { getUserByEmail, updatePassword } = require("../dboperation/user");



//http://localhost:4000/auth/testuser1@alamance.gov/randomHash1
//http://localhost:4000/auth/testuser1@alamance.gov
const getUserLogin = async (req, res) => {
    let data = { ...req.body }

    console.log('In getUserLogin', req.body)

    let email = data.email;
    let password = data.password;

    try {

        const userInfo = await getUserByEmail(email)

        if (userInfo[0].length === 0) {
            console.log("User not found")
            res.status(200).json("User not found")

        } else {
            console.log(userInfo[0][0].UserPassword)
            
            if (password == userInfo[0][0].UserPassword) {
                res.status(200).json(userInfo[0][0]);
            } else {
                res.status(200).json("login fail");
            }


        }


    } catch (error) {
        res.status(500)
        console.error();
        console.log(error.message)
        console.log('Not able to connect to database server')
    }

}


const updateWebUser = async (req, res) => {
    let data = { ...req.body }
    console.log('here', req.body)

    try {
        const result = await updatePassword(data.WebUserId, data.UserPassword)

        res.status(200).send({message: 'Password Changed', userId: data.WebUserId});

    } catch (error) {
        console.log('here', error)
        res.status(500)
        console.error();
        console.log(error.message);

    }


}






module.exports = { getUserLogin, updateWebUser, }