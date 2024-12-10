const express = require('express')
const mongoose = require('mongoose'); // Add this line

const router = express.Router();
const Person = require('../models/person');


router.post('/', async (req, res) => {
    
    try{
        const data = req.body;
        const newPerson = new Person(data);
   
       //save the new person  to the database 
       // await that can be used until your operation performed 
     const response = await  newPerson.save()
    console.log('data saved');
    res.status(200).json(response);

    } catch(err){
       console.log(err);
       res.status(500).json({error: 'internal server error '})
    }
});

router.get('/', async(req, res)=>{

try{
 const data = await Person.find();
 console.log('Data fetch ');
  res.status(200).json(data);

} catch(err){
console.log(err);
res.status(500).json({error: 'internal server erro'});
}
})

router.get('/:workType', async(req, res)=>{
try{
const workType= req.params.workType;
if(workType == 'chef' || workType == 'waiter' || workType == 'manager' ){
const response = await Person.find({work : workType});
 console.log('response fetched');
 res.status(200).json(response);

} else {
res.status(200).json({error: 'invalid work type'});

}
} catch(err) {
console.log(err);
res.status(500).json({error : 'internal server error'});

}
});

router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    // Check if personId is a valid ObjectId format
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: 'Invalid person ID format' });
    }

    // Try to find and update the person by ID
    const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run mongoose validators
    });

    // If no document is found with the provided ID
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log('Data updated');
    res.status(200).json(response);

  } catch (err) {
    console.log(err); // Log the error to the console
    res.status(500).json({ error: 'Internal server error' });
  }
}); 


router.delete('/:id', async(req, res)=>{
  try{
        const personId= req.params.id;
        const deleteResponse = await Person.findByIdAndDelete(personId);
            // If no document is found with the provided ID
    if (!deleteResponse) {
      return res.status(404).json({ error: "Person not found" });
    }

        console.log('delete succesfully');
        res.status(200).json({message : 'delete data succesfully'});

  } catch{
    console.log(err); // Log the error to the console
    res.status(500).json({ error: 'Internal server error' });

  }
})
module.exports = router;