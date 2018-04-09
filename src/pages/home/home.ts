import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tareas: string[] = [];
  tarea: string;
  storage:Storage;

  constructor(public navCtrl: NavController,storage:Storage) {
    this.tarea = "";
    this.storage=storage;
    this.storage.forEach( (value, key, index) => { //Se obtiene el key y su valor (completa o incompleta)
      //que se agregará al array que nos permite mostrarla en la lista de tareas.
      this.tarea=key;//usamos la variable tarea dirreccionando al key
      this.agregar();//la agregamos al array que la agregara como incompleta
      if(value==="completada"){//si esta tarea estaba almacenada como completa 
        this.completar(key); //se manda llamar al metodo que marca a las tareas como completas
      }
    });
  }

  agregar(){
    if(this.tarea != "" && this.tarea.trim.length == 0){
      this.storage.set(this.tarea,'incompleta');//Guardar en storage, como key se guardara la tarea
                                                //Su valor sera incompleta
      this.tareas.push(this.tarea);
      this.tarea = "";

      //console.log(this.storage.ready()); //Conocer el estado del storage
      //this.storage.get('estudiar').then((val) => {console.log(val);});//Obtener valor del storage
    }
  }

  borrar(elemento){
    var index = this.tareas.indexOf(elemento, 0);
    if (index > -1){
      this.tareas.splice(index, 1);
    }
    this.storage.remove(elemento); //eliminar del storage
  }

  completar(elemento: string){
    var t = elemento.strike();
    this.borrar(elemento);
    this.tareas.push(t);
    this.storage.set(elemento,'completada'); //Cambia el status de incompleta a completa, con esto
    //se podra apreciar subrayada en la interfaz
  }

}
