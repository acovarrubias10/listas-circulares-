import Ruta from './ruta.js'
import Base from './lista.js'

const btnAgregar = document.querySelector('#agregar');
const btnBuscar = document.querySelector('#buscar');
const btnEliminar = document.querySelector('#eliminar');
const btnInsertar = document.querySelector('#insertar');
const formularioDos = document.getElementById('formulario2');
btnAgregar.addEventListener('click', validarDatosBase);
btnBuscar.addEventListener('click', buscarBase);
btnEliminar.addEventListener('click', borrarBase);
btnInsertar.addEventListener('click', insertarProducto);
formularioDos.addEventListener('submit', validarDatosTarjeta);

const ruta = new Ruta();
function insertarProducto() {
    const nombre = (document.getElementById('nombre').value).toLowerCase();
    const minutos = document.getElementById('minutos').value;
    const posicion = Number(document.querySelector('#posicion').value);

    if(nombre === '' || posicion === '' || minutos === '') {
        crearMensaje(1, "Todos los espacios deben estar llenos");
        return;
    } else if(isNaN(posicion)) {
        crearMensaje(1, "Llene los espacios correctamente");
        return;
    } else {
        let baseNueva = new Base(nombre, minutos)
        let insertar = ruta.insertar(baseNueva, posicion);
        console.log(insertar)
        return;
    }
}
function borrarBase() {
    const nombre = (document.getElementById('nombre').value).toLowerCase();
    if(nombre === '') {
        crearMensaje(1, "Todos los espacios deben estar llenos");
        return;
    } else {
        let producto = ruta.borrar(nombre);
        console.log(producto)
        return;
    }
}
function buscarBase() {
    const nombre = (document.getElementById('nombre').value).toLowerCase();

    if(nombre === '') {
        crearMensaje(1, "Todos los espacios deben estar llenos");
        return;
    } else {
        let producto = ruta.buscar(nombre);
        console.log(producto)
        return;
    }
}
function validarDatosBase(e) {
    e.preventDefault();
    const nombre = (document.getElementById('nombre').value).toLowerCase();
    const minutos = document.getElementById('minutos').value;

    if(nombre === '' || minutos === '') {
        crearMensaje(1, "Todos los espacios deben estar llenos");
        return;
    } else {
        const nuevaBase = new Base(nombre, minutos);
        ruta.agregar(nuevaBase);

        console.log(ruta);
        return;
    }
}
function validarDatosTarjeta(e) {
    e.preventDefault();
    const base = (document.getElementById('baseinicio').value).toLowerCase();
    const horaInicio = document.getElementById('horainicio').value;
    const horaFinal = document.getElementById('horafin').value;
    if(base === '' || horaInicio === '' || horaFinal === '') {
        crearMensaje(2, "Todos los espacios deben estar llenos")
    } else {
        let horarioInicio = new Date();
        let horarioFin = new Date();
        let hora1 = horaInicio.slice(0, 2);
        let minutos1 = horaInicio.slice(3, 5);
        let hora2 = horaFinal.slice(0, 2);
        let minutos2 = horaFinal.slice(3, 5);
        horarioInicio.setHours(hora1);
        horarioInicio.setMinutes(minutos1);
        horarioInicio.setSeconds('00');
        horarioFin.setHours(hora2);
        horarioFin.setMinutes(minutos2);
        horarioFin.setSeconds('00');

        if(horarioInicio < horarioFin) {
            ruta.crearRecorrido(base, horarioInicio, horarioFin);
        } else {
            console.log('Los espacios deben ser llenados correctamente')
        }
    }
}

function crearMensaje(tipo, mensaje) {
    const divMensaje = document.createElement('p');
    divMensaje.textContent = mensaje;
    if(tipo === 1) {
        const espacio = document.querySelector('#mensaje1');
        espacio.appendChild(divMensaje);
        return;
    } else {
        const espacio = document.querySelector('#mensaje2');
        espacio.appendChild(divMensaje);
        return;
    }
}