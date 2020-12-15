export default class Ruta {
    constructor(){
        this.inicio = null;
    }
    agregar(nodo) {
        if(this.inicio === null) {
            this.inicio = nodo;
            this.inicio.anterior = this.inicio;
            this.inicio.siguiente = this.inicio;
        } else {
            let aux = this.inicio;
            while(aux.siguiente !== this.inicio) {
                aux = aux.siguiente
            }
            aux.siguiente = nodo;
            aux.siguiente.anterior = aux;
            aux.siguiente.siguiente = this.inicio;
            this.inicio.anterior = nodo;
        }
    }
    buscar(base) {
        let aux = this.inicio;
        if(aux === null) {
            console.log('No hay bases')
        } else {
            while(base != aux.nombre) {
                aux = aux.siguiente;
            }
            return aux;
        }   
    }
    borrar(base) {
        if(this.buscar(base) == null) {
            console.log('No se encontró la base')
        } else {
            let baseBorrar = this.buscar(base);
            baseBorrar.anterior.siguiente = baseBorrar.siguiente;
            baseBorrar.siguiente.anterior = baseBorrar.anterior;
            baseBorrar.siguiente = null;
            baseBorrar.anterior = null
            return baseBorrar;
        }
    }

    Imprimir() {
        console.log(this.inicio);
        let aux = this.inicio
        while(aux.siguiente !== this.inicio) {
            console.log(`Nombre de la base: ${aux.nombre}, minutos: ${aux.minutos}`)
            aux = aux.siguiente;
        }
    }

    insertar(base, posicion) {
        let aux = this.inicio;
        if (posicion === 1) {
            base.siguiente = aux;
            base.anterior = aux.anterior;
            base.anterior.siguiente = base;
            aux.anterior = base;
            this.inicio = base;
            return base;
        } else {
            let i = 1;
            while(i !== posicion) {
                aux = aux.siguiente;
                i++
            }
            base.siguiente = aux.siguiente;
            base.anterior = aux.anterior;
            aux.anterior.siguiente = base;
            aux.siguiente.anterior = base
            return base;
        }
    }

    crearRecorrido(baseInicio, horaInicio, horaFin) {
        let inicio = this.buscar(baseInicio);
        let horaActual = horaInicio.getTime();
        let bases = [];
        while(horaFin.getTime() > horaActual) {
            horaActual += inicio.minutos*1000*60;
            bases.push(inicio);
            inicio = inicio.siguiente
        }
        console.log(bases)
    }
}