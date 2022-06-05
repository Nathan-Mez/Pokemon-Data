

/*Array of Pokemnon data to display, assigned to pokemonList
wrapped in pokemonRepository to avoid accidentally accessing */
let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=54';

  //Adds item object to pokemonList array
  function add(item){
    pokemonList.push(item);
  }

  function getAll(){                   //returns pokemonList array
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      addPokemonImage(pokemon);
      console.log(pokemon);
    });
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    let button = document.createElement('button');      //create a new 'li' & 'button' for the current Pokemon

    button.innerText = pokemon.name;
    button.classList.add('pokeButton');                //add class and innter text for the button of the current pokemon

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);                //add the list (of button) to the parent 'ul' element

    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();                    //show loading message until buttons appear
    return fetch(apiUrl).then(function (response) {
       hideLoadingMessage();                 //hide the loading message after buttons appear
       return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();                  //hide loading message if there's error fetching
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();                   //show loading message until details are displayed
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingMessage();                 //hide loading message after details are displayed on console
      return response.json();
    }).then(function (details) {

      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      //item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();                  //hide loading if there's error fetching url
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
//_______________________End of pokemonRepository_____________________________________


//List of pokemon button
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

//_____________Loading Message_______________________________

function showLoadingMessage(){
  let message = document.querySelector('.loading_message');
  message.classList.remove('hidden');
}
function hideLoadingMessage(){
  let message = document.querySelector('.loading_message');
  message.classList.add('hidden');
}

//_______________Pokemon Image____________________________

function addPokemonImage(pokemon_obj){
  let image_box = document.querySelector('.pokemon_img');
  image_box.classList.remove('hidden');
  image_box.src = pokemon_obj.imgUrl;
  setTimeout(function(){
    image_box.classList.add('hidden');
  }, 4500);
}
