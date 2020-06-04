for (var i = 0; i <= 80; i++) {
  fetch('https://pokeapi.co/api/v2/pokemon-form/' + i, {
    method: 'GET'
  }).then(function (data) {
    //El método fetch se debe resolver 2 veces, 1 para la obtención de datos y la otra para procesar la respuesta en el idioma.
    return data.json();
    //los mètodos para obtener la respuesta los siguientes:
    // .arrayBuffer()
    // .blob()
    // .formData()
    // .json()
    // .text()
  }).then(function (json) {
    $('.pokemons').append('<li><img src="' + json.sprites.front_default + '"></img></li>')
  })
}
