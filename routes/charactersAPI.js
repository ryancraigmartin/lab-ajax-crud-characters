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

// router.get("/characters/:id", (req, res, next) =>{
//  Character.findOne({id: req.params.id}, (err, oneCharacter) => {
//    res.json(oneCharacter) // Generates the cities as a JSON file.
//  });
// });

module.exports = router;