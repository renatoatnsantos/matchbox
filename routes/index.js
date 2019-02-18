const express = require('express')
const router = express.Router()

const resource = require('../resources')

router.get('/json' , async (req, res)=>{
   try{
       let data = res.send(await resource().all())
   } catch (e) {
       console.log(e)
   }
})


module.exports = router