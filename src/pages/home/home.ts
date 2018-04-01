import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tareas: string[] = [];
  tarea: string;

  constructor(public navCtrl: NavController) {
    this.tarea = "";
  }

  agregar(){
    if(this.tarea != "" && this.tarea.trim.length == 0){
      this.tareas.push(this.tarea);
      this.tarea = "";
    }
  }

  borrar(elemento){
    var index = this.tareas.indexOf(elemento, 0);
    if (index > -1){
      this.tareas.splice(index, 1);
    }
  }

  completar(elemento: string){
    var t = elemento.strike();
    this.borrar(elemento);
    this.tareas.push(t);
  }

}
