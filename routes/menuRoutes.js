const express = require('express')

const router = express.Router();
const MenuIteam = require('../models/menu');



router.post('/', async(req, res)=>{
    try{
      const data = req.body;
   
      const menu = new MenuIteam(data);
   
      const response = await  menu.save()
      console.log('Data saved ');
   
      res.status(200).json(response)
   
    } catch(err){
       console.log(err);
       res.status(500).json({error: 'internal server erro'});
   
    }
   
   });

   router.get('/', async(req,res)=>{
    try{
        const data = await MenuIteam.find();
        console.log('Menu List fetch');
        res.status(200).json(data);

    } catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server erro'});
     
    }
   });
   
   module.exports=router;