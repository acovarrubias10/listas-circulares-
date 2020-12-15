export default class Base {
    /**
     * 
     * @param {String} nombre 
     * @param {Number} minutos 
     */
    constructor(nombre, minutos) {
        this.anterior = null;
        this.siguiente = null;
        this.nombre = nombre;
        this.minutos = minutos
    }
}