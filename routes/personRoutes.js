const express = require('express')
const mongoose = require('mongoose'); // Add this line

const router = express.Router();
const Person = require('../models/person');
const {jwtAuthMiddleawre, generateToken} = require('../jwt');
 
 
router.post('/singup',async (req, res) => {
    
    try{
        const data = req.body; // Assuming the request body contains the person data
        const newPerson = new Person(data);
   
       //save the new person  to the database 
       // await that can be used until your operation performed 
     const response = await  newPerson.save()
    console.log('data saved');
    const token= generateToken(response.username);
    console.log('toke is', token);
    res.status(200).json({response: response, token:token});

    } catch(err){
       console.log(err);
       res.status(500).json({error: 'internal server error '})
    }
});

router.get('/', jwtAuthMiddleawre, async(req, res)=>{

try{
 const data = await Person.find();
 console.log('Data fetch ');
  res.status(200).json(data);

} catch(err){
console.log(err);
res.status(500).json({error: 'internal server erro'});
}
}),


// Profile Router


// login Route 

router.post('/login', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Find the user by username
        const user = await Person.findOne({ username });

        if (!user || (password !== user.password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate token
        const payload = { id: user.id, username: user.username };
        const token = generateToken(payload);

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;


router.get('/:workType', jwtAuthMiddleawre, async(req, res)=>{
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