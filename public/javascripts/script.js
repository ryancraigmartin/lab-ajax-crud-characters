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
        <div class="weapon">ID: ${eachCharacter._id}</div>
      </div>`)
        console.log(eachCharacter);
      }); // END of forEach
    }) // END of .then
    .catch(error => {
      console.log(error);
    })
  }); // END of fetch-all.

  $('#fetch-one').click(function(){
    const theID = $('.character-id').val();
    if(!theID){
      console.log("Must enter an ID for it to work.");
      return
    }
    axios.get(`/api/characters/${theID}`)
    .then((response) => {
      $('.characters-container').empty(); // Removes the original box.      
      $('.characters-container').append(` 
        <div class="character-info">
        <div class="name">Name: ${response.data.name}</div>
        <div class="occupation">Occupation: ${response.data.occupation}</div>
        <div class="cartoon">Cartoon?: ${response.data.cartoon}</div>
        <div class="weapon">Weapon: ${response.data.weapon}</div>
        <div class="weapon">ID: ${response.data._id}</div>`)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    });
  });

  $('#new-character-form').submit(function(event){
    event.preventDefault(); // Prevents form from submitting.
    const charInfo = {};
    charInfo.theName = $('.new-name').val();
    charInfo.theOccupation = $('.new-occupation').val();
    charInfo.theWeapon = $('.new-weapon').val();
      if($('.new-cartoon').is(':checked')){
        charInfo.theCartoon = true;
      }else{
        charInfo.theCartoon = false;
      }

  axios.post('/api/characters/create', charInfo) // charInfo contains the keys.
    .then((response) => {
      console.log('Success! ', response);
      $('#fetch-all').click(); // Fetches all the characters in the database after creating a new character.
    })
    .catch(error => {
      console.log(error);
      next(error)
    })
    // Clear out the fields after we've created a character.
    $('.new-name').val('');
    $('.new-occupation').val('');
    $('.new-weapon').val('');
    $('.new-cartoon').prop('checked', false);
  });

  $('#edit-character-form').submit(function(e){
    e.preventDefault();
    const id = $('.edit-chr-id').val();
    const editCharInfo = {}
    editCharInfo.name = $(".edit-name").val();
    editCharInfo.occupation = $(".edit-occupation").val();
    editCharInfo.weapon = $(".edit-weapon").val();
      if($('.edit-cartoon').is(':checked')){
        editCharInfo.theCartoon = true;
      }else{
        editCharInfo.theCartoon = false;
      }

    axios.post(`api/characters/update/${id}`, editCharInfo)
    .then((response) => {
      console.log("Success! " ,response);
      $('.character-id').val(id) // Manualy types the id into the field.
      $('#fetch-one').click();
    })
    .catch((error) => {
      console.log(error);
    })

    // Clear out the fields after we've edited a character.
    $('.edit-name').val('');
    $('.edit-occupation').val('');
    $('.edit-weapon').val('');
    $('.edit-chr-id').val('');
    $('.edit-cartoon').prop('checked', false);

  })
}); // END DOCUMENT READY