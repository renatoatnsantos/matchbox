

const errorHandler = (error , msg , rejectFunc) =>{
        console.error(error)
        rejectFunc({error:msg})
}

const resources = require('../resources')({errorHandler})

module.exports = {
    resources : resources
}