

/*Array of Pokemnon data to display, assigned to pokemonList
wrapped in pokemonRepository to avoid accidentally accessing */
let pokemonRepository = (function (){
  let pokemonList = [
    {
      name : 'Charmander',                            //Data on pokemon-1, Charmander
      height : 0.610,
      category : 'Lizard',
      type : ['Fire'],
      weaknesses : ['Water', 'Ground', 'Rock']
    },
    {
      name : 'Charmeleon',                            //Data on pokemon-2, Charmeloen
      height : 1.090,
      category : 'Flame',
      type : ['Fire'],
      weaknesses : ['Ground', 'Rock', 'Water']
    },
   {
      name : 'Wartortle',                            //Data on pokemon-3, Wartortle
      height : 0.991,
      category : 'Turtle',
      type : ['Water'],
      weaknesses : ['Grass','Electric']
    },
    {
      name : 'Pikachu',                             //Data on pokemon-4, Picachu
      height : 0.406,
      category: 'Mouse',
      type : ['Electric'],
      weaknesses : ['Ground']
    }
  ];

  //Adds item object to pokemonList array
  function add(item){
    if (typeof(item)=='object'){               //Check if item to be added is object, if not alert
      if (item.name && item.height){           //Check if item has both name and height keys
        pokemonList.push(item);
      }
      else{
        return alert('You have to include name and height in your object');
      }
    }
    else{
      return alert('You can only Add object to pokemonList!')
    }
  }
  function getAll(){                   //returns pokemonList array
    return pokemonList;
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector('ul');

    let listItem = document.createElement('li');
    let button = document.createElement('button');      //create a new 'li' & 'button' for the current Pokemon

    button.innerText = pokemon.name;
    button.classList.add('pokeButton');                //add class and innter text for the button of the current pokemon

    button.addEventListener('click', function(pokemon){
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);                //add the list (of button) to the parent 'ul' element
  }
  function showDetails(pokemon){
    console.log(pokemon);
  }

  return{
    add : add,
    getAll : getAll,
    addListItem : addListItem
  };

})();
//_______________________End of pokemonRepository_____________________________________


//List of pokemon names and their height displayed on document
pokemonRepository.getAll().forEach(function(pokn){
  pokemonRepository.addListItem(pokn);
});
