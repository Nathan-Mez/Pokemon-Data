let pokemonRepository=function(){let b=[];function a(){return b}return{getAll:a,addListItem:function(b){let c=document.querySelector(".list-group"),a=document.createElement("button");a.innerText=b.name,a.classList.add("btn","btn-pokemon"),c.appendChild(a),a.addEventListener("click",function(){(function(a){var b;fetch((b=a).detailsUrl).then(function(a){return a.json()}).then(function(a){b.imgUrl_1=a.sprites.front_default,b.imgUrl_2=a.sprites.back_default,b.weight=a.weight,b.id=a.id,b.height=a.height,b.order=a.order}).catch(function(a){console.error(a)}).then(function(){console.log(a),document.querySelector(".modal-title").innerText=a.name,document.querySelector(".modal-image-front").setAttribute("src",a.imgUrl_1),document.querySelector(".modal-image-back").setAttribute("src",a.imgUrl_2),document.querySelector(".modal-height").innerText="Height:   "+a.height,document.querySelector(".modal-weight").innerText="Weight:   "+a.weight,document.querySelector(".modal-id").innerText="ID:   "+a.id,document.querySelector(".modal-order").innerText="Order:   "+a.order})})(b),a.setAttribute("data-toggle","modal"),a.setAttribute("data-target","#myModal")})},loadList:function(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=60").then(function(a){return a.json()}).then(function(a){a.results.forEach(function(a){var c;c={name:a.name,detailsUrl:a.url},b.push(c)})}).catch(function(a){console.error(a)})}}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(a){pokemonRepository.addListItem(a)})})
