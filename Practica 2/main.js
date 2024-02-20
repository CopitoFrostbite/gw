class producto{
    constructor(codigo,nombre,precio){
        this.codigo = codigo;
        this.nombre = nombre;
        this.precio = precio;
    }
    get description(){
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>${this.codigo}</td>
        <td>${this.nombre}</td>
        <td>${this.precio}</td>
        <td><button onclick="borrarProducto(${productos.indexOf(this)})">Borrar</button></td>
        `;
        return row;
    }
}

const formProducto = document.getElementById('form-producto');
const tbody = document.getElementById('lista-productos');
const productos = [];

formProducto.addEventListener('submit', (event)=>{
    event.preventDefault();
    const inputCodigo = document.getElementById('codigo').value;
    const inputNombre = document.getElementById('nombre').value;
    const inputPrecio = document.getElementById('precio').value;

    const nuevoProducto = new producto(inputCodigo,inputNombre,inputPrecio);
    productos.push(nuevoProducto);
    console.log(productos);
    formProducto.reset();
    listarProductos();
});

function listarProductos(){
    tbody.innerHTML = "";
    productos.forEach(p => {
        tbody.appendChild(p.description);
    });
}

function borrarProducto(index) {
    
    if (index >= 0 && index < productos.length) {       
        productos.splice(index, 1);        
        listarProductos();
    } else {
        console.error("Índice fuera de rango.");
    }
}