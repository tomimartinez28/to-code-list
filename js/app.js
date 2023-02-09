// VARIABLES

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// EVENT LISTENERS

eventListener()

function eventListener() {
    // cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);


    // cuando el el dom esta listo

    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; // si llega a dar null, devuelve un array vacio
        crearHTML();
    })

}

// FUNCTIONS

function agregarTweet(e) {
    e.preventDefault();
    
    
    // textarea donde se escribe el tweet
    const tweet = document.querySelector('#tweet').value;
    

    // validacion
    if(tweet === '') {
        mostrarError('Mensaje no puede ir vacio')
        return
    }

    const tweetObj = {
        id: Date.now(), // le da un ID practicamente unico para que no se repitan
        tweet, // es lo mismo que decir tweet: tweet
    }


    // agrega el tw al array

    tweets = [...tweets, tweetObj];

    // Crear el html

    crearHTML();

    // REINICIAR EL FORM

    formulario.reset();


}



function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    // insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // eliminar despues de un ratito
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);

}

// muestra un listado de los tweets
function crearHTML() {
    // limpiar el html previo
    limpiarHTML()

    if(tweets.length > 0) {
        tweets.forEach( tweet => {


            // CREO BOTON DE ELIMINAR
            const eliminarBtn = document.createElement('a');
            eliminarBtn.classList.add('borrar-tweet');
            eliminarBtn.textContent = 'X';


            // AÑADIR LA FUNCION DE ELIMINAR

            eliminarBtn.onclick = () => {
                eliminarTweet(tweet.id)
            }


            // CREO EL HTML DE LAS PUBLICACIONES
            const li = document.createElement('LI');
            li.textContent = tweet.tweet;
            listaTweets.appendChild(li);

            // ASIGNO EL BOTON DE ELIMINAR
            li.append(eliminarBtn);

        }   );
    }; 

    sincronizarStorage();
};

// elimina una publicacion
function eliminarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id );
    crearHTML() // para que se refresque 
}






// Agrega los tweets actuales al local storage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}





// limpia el html
function limpiarHTML() {
    while( listaTweets.firstChild ) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

