const express      = require('express');
const router       = express.Router();
const Character    = require('../models/character')


router.get("/characters", (req, res, next) =>{
 Character.find()
 .then((theList) => {
   console.log(theList);
   res.json(theList) // Generates the cities as a JSON file.
  })
  .catch(err => {
    next(err);
  })
});

router.get("/characters/:id", (req, res, next) =>{
 Character.findById(req.params.id)
  .then((theCharacter) => {
   console.log(theCharacter);    
   res.json(theCharacter) // Generates the cities as a JSON file.
  })
  .catch(error => {
    console.log(error);
    next(error)
   })
}); // END .get/characers/id

router.post('/characters/create', (req, res, next) => {
 Character.create({
  name: req.body.theName,
  occupation: req.body.theOccupation,
  weapon: req.body.theWeapon,
  cartoon: req.body.theCartoon
 })
 .then((theCharacter) => {
    res.json(theCharacter);
 })
 .catch(error => {
  console.log(error);
  next(error)
 })
}) // END .post create route

router.post('/characters/update/:id', (req,res,next) => {
 Character.findByIdAndUpdate(req.params.id, req.body)
  .then((updatedCharacter) => {
    res.json(updatedCharacter);
  })
  .catch((error) => {
   console.log(error);
   next(error)
  })
});

module.exports = router;