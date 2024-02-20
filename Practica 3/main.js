// main.js

let productos;
const tbody = document.getElementById("lista-productos");

function obtenerProductosLocalStorage() {
  const productosLocalStorage = localStorage.getItem("productos");
  if (productosLocalStorage) {
    productos = JSON.parse(productosLocalStorage);
    listarProductos(); 
    return productos; 
  } else {
    console.log("No hay productos en Local Storage.");
    return [];
  }
}

productos = obtenerProductosLocalStorage() || [];


class Producto {
  constructor(codigo, nombre, precio) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
  }
  get descripcion() {
    const row = document.createElement("tr");

    const codigoCell = document.createElement("td");
    codigoCell.textContent = this.codigo;
    row.appendChild(codigoCell);

    const nombreCell = document.createElement("td");
    nombreCell.textContent = this.nombre;
    row.appendChild(nombreCell);

    const precioCell = document.createElement("td");
    precioCell.textContent = this.precio;
    row.appendChild(precioCell);

    const accionesCell = document.createElement("td");
    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.onclick = () => eliminarProducto(this.codigo);
    accionesCell.appendChild(eliminarButton);
    row.appendChild(accionesCell);

    return row;
  }
}



const formProducto = document.getElementById("form-producto");

formProducto.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputCodigo = document.getElementById("codigo").value;
  const inputNombre = document.getElementById("nombre").value;
  const inputPrecio = document.getElementById("precio").value;

  const nuevoProducto = new Producto(inputCodigo, inputNombre, inputPrecio);
  productos.push(nuevoProducto);
  console.table(productos);
  guardarProductosLocalStorage();
  formProducto.reset();
  listarProductos();
});

function listarProductos() {
  tbody.innerHTML = ""; 

  productos.forEach((p) => {
    const row = document.createElement("tr");

    const codigoCell = document.createElement("td");
    codigoCell.textContent = p.codigo;
    row.appendChild(codigoCell);

    const nombreCell = document.createElement("td");
    nombreCell.textContent = p.nombre;
    row.appendChild(nombreCell);

    const precioCell = document.createElement("td");
    precioCell.textContent = p.precio;
    row.appendChild(precioCell);

    const accionesCell = document.createElement("td");
    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.onclick = () => eliminarProducto(p.codigo);
    accionesCell.appendChild(eliminarButton);
    row.appendChild(accionesCell);

    tbody.appendChild(row); 
  });
}

function eliminarProducto(codigo) {
  productos = productos.filter((producto) => producto.codigo !== codigo);
  guardarProductosLocalStorage();
  listarProductos();
}

function guardarProductosLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function eliminarProductos() {
  productos = [];
  guardarProductosLocalStorage();
  listarProductos();
}

document.addEventListener("DOMContentLoaded", function () {
  const obtenerButton = document.querySelector("button[data-action='obtener']");

  if (obtenerButton) {
    obtenerButton.addEventListener("click", () => {
      productos = obtenerProductosLocalStorage(); 
      console.table(productos); 
      listarProductos(); 
    });
  }
});

