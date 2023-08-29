const express=require('express');
const router=express.Router();
const User=require('../config/models/User');
router.get('/', async(req,res)=>{
    try {
        const students = await User.find();
        res.render('teachers', { students });
      } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Error fetching students');
      }
});

//add new record of student to the database. 
router.get('/addRecord',(req,res)=>{
    res.render('addRecord')
});

router.post('/addRecord', async (req, res) => {
  const { rollnumber, name, dateOfBirth, score } = req.body;
  const student = new User({
      rollnumber: parseInt(rollnumber),
    name,
    dateOfBirth: new Date(dateOfBirth),
    score: parseInt(score),
  });

  try {
    await student.save();
    console.log('Student record added:', student);
    res.redirect('/teachers');
  } catch (err) {
    console.error('Error adding student record:', err);
    res.status(500).send('Error adding student record');
  }
});



//render Edit Record page
router.get('/edit/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await User.findById(studentId);
    res.render('editRecord', { student });
  } catch (err) {
    console.error('Error fetching student for editing:', err);
    res.status(500).send('Error fetching student for editing');
  }
});



//save edited Record
router.post('/edit/:id', async (req, res) => {
  const studentId = req.params.id;
  const { rollNumber, name, dateOfBirth, score } = req.body;
  try {
    const updatedStudent = await User.findByIdAndUpdate(studentId, {
      rollNumber: parseInt(rollNumber),
      name,
      dateOfBirth: new Date(dateOfBirth),
      score: parseInt(score),
    });
    console.log('Student record updated:', updatedStudent);
    res.redirect('/teachers');
  } catch (err) {
    console.error('Error updating student record:', err);
    res.status(500).send('Error updating student record');
  }
});





// Delete Record
router.get('/delete/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const deletedStudent = await User.findByIdAndDelete(studentId);
    console.log('Student record deleted:', deletedStudent);
    res.redirect('/teachers');
  } catch (err) {
    console.error('Error deleting student record:', err);
    res.status(500).send('Error deleting student record');
  }
});



  
  
  
  
  
  
  




module.exports=router;