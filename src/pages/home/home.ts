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
  }

}
