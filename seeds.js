const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

mongoose.connect('mongodb://localhost/ajax-crud-characters', {
 useMongoClient: true
});

const characterSchema = Schema({
 id:   Number,
 name: String,
 occupation: String,
 weapon: String,
 cartoon: Boolean
});

const Character = mongoose.model("Character", characterSchema);

 const characters = [
   {
     "id": 1,
     "name": "Han Solo",
     "occupation": "Smuggler",
     "weapon": "Blaster Pistol",
     "cartoon": false
   },
   {
     "id": 2,
     "name": "Luke Skywalker",
     "occupation": "Jedi Knight",
     "weapon": "Lightsaber",
     "cartoon": false
   },
   {
     "id": 3,
     "name": "SpongeBob SquarePants",
     "occupation": "Frycook at the Krusty Krab",
     "weapon": "Krabby Patty",
     "cartoon": true
   }
 ]

 // Adds the characters above to the database. 
 Character.create(characters)
 .then(res =>{ // If successful, let us know.
   console.log("Characters were successfuly imported to the database!")
 })
 .catch(err =>{ // If unsuccessful, thow an error.
   console.log(err)
 })