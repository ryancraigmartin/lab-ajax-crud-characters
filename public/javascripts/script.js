$(document).ready(function() {

  $('#fetch-all').click(function() {
    console.log("Clicked Fetch All");
  
  axios.get({
    method: "GET",
    url: "http://localhost:3000/characters/"
    // params: 
  })
    .then(responseFromAPI => {
      $('character-info').empty(); 
      responseFromAPI.data.forEach(function(oneCharacter){
        console.log(oneCharacter.name);
        $('.character-info').append(`
        <h3>Name: ${oneCharacter.name}</h3>
        <p>Occupation: ${oneCharacter.occupation}</p>
        <p>Is it a Cartoon: ${oneCharacter.cartoon}</p>
        <p>Weapon: ${oneCharacter.weapon}</p>
        `)
      })
    })
    .catch(err => {
      console.log(err);
    })
  });

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