

/*Array of Pokemnon data to display, assigned to pokemonList
wrapped in pokemonRepository to avoid accidentally accessing */
let pokemonRepository = (function (){
  let pokemonList = [
    {
      name : 'Charmander',                               //Data on pokemon-1, Charmander
      height : 0.610,
      category : 'Lizard',
      type : ['Fire'],
      weaknesses : ['Water', 'Ground', 'Rock']
    },
    {
      name : 'Charmeleon',                               //Data on pokemon-2, Charmeloen
      height : 1.090,
      category : 'Flame',
      type : ['Fire'],
      weaknesses : ['Ground', 'Rock', 'Water']
    },
   {
      name : 'Wartortle',                                //Data on pokemon-3, Wartortle
      height : 0.991,
      category : 'Turtle',
      type : ['Water'],
      weaknesses : ['Grass','Electric']
    },
    {
      name : 'Pikachu',                                 //Data on pokemon-4, Picachu
      height : 0.406,
      category: 'Mouse',
      type : ['Electric'],
      weaknesses : ['Ground']
    }
  ];

  return{
    add : function(item) {
      pokemonList.push(item);
    },
    getAll : function() {
      return pokemonList;
    }
  };
})();


//List of pokemon names and their height displayed on document
pokemonRepository.getAll().forEach(function(pokn){
  if (pokn.height > 1){
    document.write("Pokemon's name: "+pokn.name+", Height("+pokn.height+") - WOW! That's BIG<br>");
   }
  else{
    document.write("Pokemon's name: "+pokn.name+", Height("+pokn.height+")<br>");
   }
});
