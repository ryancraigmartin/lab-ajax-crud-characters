$(document).ready(function() {

  $('#fetch-all').click(function() {
    console.log("Clicked Fetch All");
 
  axios.get('/api/characters')
    .then(responseFromAPI => {
      $('.characters-container').empty(); // Removes the original box.
      responseFromAPI.data.forEach((eachCharacter) => { // Only what's between the tags changes.
        $('.characters-container').append(`
        <div class="character-info">
        <div class="name">Name: ${eachCharacter.name}</div>
        <div class="occupation">Occupation: ${eachCharacter.occupation}</div>
        <div class="cartoon">Cartoon?: ${eachCharacter.cartoon}</div>
        <div class="weapon">Weapon: ${eachCharacter.weapon}</div>
      </div>`)
        console.log(eachCharacter);
      }); // END of forEach
    }) // END of .then
    .catch(error => {
      console.log(error);
    })
  }); // END of fetch-all.

  // $('#fetch-one').click(function() {
  //   console.log("Clicked Fetch One");

  // axios.get("http://localhost:3000/characters/")
  //   .then(responseFromAPI => {
  //     console.log(responseFromAPI.name);
  //       $('.character-info').append(`
  //       <h3>Name: ${responseFromAPI.name}</h3>
  //       <p>Occupation: ${responseFromAPI.occupation}</p>
  //       <p>Is it a Cartoon: ${responseFromAPI.cartoon}</p>
  //       <p>Weapon: ${responseFromAPI.weapon}</p>
  //       `)
  //     })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // });
 

}); // END DOCUMENT READY