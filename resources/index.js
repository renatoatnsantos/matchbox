
const json = require('../matchboxbrasil')

const jsonPromise = () =>{
    return {
        all: () =>{
            return new Promise((resolve , reject)=>{
               resolve(json)
            })
        }
    }
}


module.exports = jsonPromise