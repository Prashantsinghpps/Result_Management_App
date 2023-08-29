const express=require('express');
const router=express.Router();
const User=require('../config/models/User')
router.get('/',(req,res)=>res.render('students'));


//show result
// router.post('/showResult',(req,res)=>{
//     const {rollnumber,dateOfBirth}=req.body;
//     User.findOne({rollnumber:rollnumber})
//     .then(user=>{
//        if(user.dateOfBirth!==dateOfBirth)res.render('/students')
//        else{
//     res.render('showResult',{user});
//     }
//     })


// Show Result page
router.post('/showResult', async (req, res) => {
    const { rollnumber, dateOfBirth } = req.body;
    try {
      const studentResult = await User.findOne({
        rollnumber: parseInt(rollnumber),
        dateOfBirth: new Date(dateOfBirth),
      });
      if(studentResult!=null)
      res.render('showResult', { studentResult });
    else{
        res.redirect('/students')
    }
    } catch (err) {
      console.error('Error fetching student result:', err);
      res.status(500).send('Error fetching student result');
    }
  });


//render result



module.exports=router;