// VARIABLES

const formulario = document.querySelector('#formulario');
const projectsList = document.querySelector('#projects-list');
let projectos = [];


// EVENT LISTENERS

eventListener()

function eventListener() {
    // cuando el usuario agrega un nuevo projecto
    formulario.addEventListener('submit', agregarProjecto);


    // cuando el el dom esta listo

    document.addEventListener('DOMContentLoaded', () => {
        projectos = JSON.parse(localStorage.getItem('projectos')) || []; // si llega a dar null, devuelve un array vacio
        crearHTML();
    })

}

// FUNCTIONS

function agregarProjecto(e) {
    e.preventDefault();
    
    
    // textarea donde se escribe el projecto nuevo
    const projecto = document.querySelector('#projecto').value;
    

    // validacion
    if(projecto === '') {
        mostrarError('Mensaje no puede ir vacio')
        return
    }

    const projectoObj = {
        id: Date.now(), // le da un ID practicamente unico para que no se repitan
        projecto, // es lo mismo que decir projecto: projecto
    }


    // agrega el projecto al array

    projectos = [...projectos, projectoObj];

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

// muestra un listado de los projectos
function crearHTML() {
    // limpiar el html previo
    limpiarHTML()

    if(projectos.length > 0) {
        projectos.forEach( projecto => {


            // CREO BOTON DE ELIMINAR
            const eliminarBtn = document.createElement('a');
            eliminarBtn.classList.add('borrar-projecto');
            eliminarBtn.textContent = 'X';


            // AÑADIR LA FUNCION DE ELIMINAR

            eliminarBtn.onclick = () => {
                eliminarProjecto(projecto.id)
            }


            // CREO EL HTML DE LAS PUBLICACIONES
            const li = document.createElement('LI');
            li.textContent = projecto.projecto;
            projectsList.appendChild(li);

            // ASIGNO EL BOTON DE ELIMINAR
            li.append(eliminarBtn);

        }   );
    }; 

    sincronizarStorage();
};

// elimina una publicacion
function eliminarProjecto(id) {
    projectos = projectos.filter( projecto => projecto.id !== id );
    crearHTML() // para que se refresque 
}






// Agrega los projectos actuales al local storage

function sincronizarStorage() {
    localStorage.setItem('projectos', JSON.stringify(projectos));
}





// limpia el html
function limpiarHTML() {
    while( projectsList.firstChild ) {
        projectsList.removeChild(projectsList.firstChild);
    }
}

