const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
let articulosCarrito = [];



//limpiar el html
const limpiarHtml = () =>{
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//sincronizar LocalStorage
const sincronizarStorage=()=>{
    localStorage.setItem("cursos",JSON.stringify(articulosCarrito));
}

//agregar al html
const agregarHtml=()=>{
    limpiarHtml();
    articulosCarrito.forEach(curso =>{
        const row = document.createElement("tr");
        row.innerHTML = `
        <td> <img src="${curso.imagen}" alt="img-producto" width= 100> </td>
        <td> <p>${curso.titulo}</p> </td>
        <td> <p>${curso.precio}</p> </td>
        <td> <p>${curso.cantidad}</p> </td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `
        contenedorCarrito.appendChild(row);
    });
    sincronizarStorage();
    
}
//borrar curso
const borrarCurso=(e)=>{
    e.preventDefault();
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        agregarHtml();
    }
} 

//leerDatosDelCurso
const leerDatos=(curso)=>{
    infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".oferta").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
   
    if(articulosCarrito.some(curso => curso.id === infoCurso.id)){
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito=[...cursos];
    }else{
        articulosCarrito = [...articulosCarrito,infoCurso];
    }    

}

//agregar producto
const agregarProducto=(e)=>{
    if(e.target.classList.contains("agregar-carrito")){
        e.preventDefault();
        const curso = e.target.parentElement.parentElement;
        leerDatos(curso);
        agregarHtml();
    }
}
const eventListeners=()=>{
    //seleccionar boton de agregar
    listaCursos.addEventListener("click",agregarProducto);

    //borrar curso
    carrito.addEventListener("click",borrarCurso);

    //limpiar carrito
    vaciarCarrito.addEventListener("click",(e)=>{
        e.preventDefault();
        articulosCarrito = [];
        limpiarHtml();
    });

    //mostrar articulos al cargar
    document.addEventListener("DOMContentLoaded",()=>{
        if(JSON.parse(localStorage.getItem("cursos").length > 0)){
            articulosCarrito = JSON.parse(localStorage.getItem("cursos"));
            agregarHtml();
        }
    });
    
    
}
//ejecutamos los eventos
eventListeners();