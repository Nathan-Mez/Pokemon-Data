

/*Array of Pokemnon data to display, assigned to pokemonList
wrapped in pokemonRepository to avoid accidentally accessing */
let pokemonRepository = (function (){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=54';

  //Adds item object to pokemonList array
  function add(item){
    pokemonList.push(item);
  }

  function getAll(){
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      modalRepository.showModal(pokemon.name, pokemon.imgUrl, 'Height: '+pokemon.height);
      console.log(pokemon);
    });
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    let button = document.createElement('button');

    button.innerText = pokemon.name;
    button.classList.add('pokeButton');

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
       hideLoadingMessage();
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
      hideLoadingMessage();
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (details) {

      item.imgUrl = details.sprites.front_default;
      item.height = details.height;
      //item.types = details.types;
    }).catch(function (e) {
      hideLoadingMessage();
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

//______________________Display Pokemon buttons_____________________


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

//__________________Details on Modals___________________________

let modalRepository = function(){
  let modalContainer = document.querySelector('#modal-container');

  function showModal(title, img, text) {
    modalContainer.innerHTML = '';     // Clear all existing modal content

    let modal = document.createElement('div');        //add modal box
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');  // Add the close button
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');       //Modal Title
    titleElement.innerText = title;

    let imageElement = document.createElement('img');      //Image of Pokemon
    imageElement.src = img;

    let contentElement = document.createElement('p');      //Modal content
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');          //Remove Modal from display
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return{
    showModal: showModal
  };
}();
