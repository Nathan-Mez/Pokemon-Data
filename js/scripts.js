/*Array of Pokemnon data to display, assigned to pokemonList
wrapped in pokemonRepository to avoid accidentally accessing */
let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=60';

  //Adds item object to pokemonList array
  function add(item){
    pokemonList.push(item);
  }

  function getAll(){
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');

    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn', 'btn-pokemon');

    pokemonList.appendChild(button);
    button.addEventListener('click', function(){
      showDetails(pokemon);
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#myModal');
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
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
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imgUrl_1 = details.sprites.front_default;
      item.imgUrl_2 = details.sprites.back_default;
      item.weight = details.weight;
      item.id = details.id;
      item.height = details.height;
      item.order = details.order;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      document.querySelector('.modal-title').innerText = pokemon.name;
      document.querySelector('.modal-image-front').setAttribute('src', pokemon.imgUrl_1);
      document.querySelector('.modal-image-back').setAttribute('src', pokemon.imgUrl_2);
      document.querySelector('.modal-height').innerText = 'Height:   '+pokemon.height;
      document.querySelector('.modal-weight').innerText = 'Weight:   '+pokemon.weight;
      document.querySelector('.modal-id').innerText = 'ID:   '+pokemon.id;
      document.querySelector('.modal-order').innerText = 'Order:   '+pokemon.order;
    });
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,

  };
})();

//______________________Display Pokemon buttons_____________________


//List of pokemon button
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
