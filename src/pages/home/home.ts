import { Component } from '@angular/core';
import { RINGTONES } from "../../data/data.ringtones";
import { Ringtone } from "../../interfaces/ringtone.interface";
import { Refresher, reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ringtones:Ringtone[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando:boolean = false;

  constructor() {

    this.ringtones = RINGTONES.slice(0);    

  }

  reproducir( ringtone: Ringtone ){

    this.pausar_audio( ringtone );

    if ( ringtone.resproduciendo == true ) {
     
      ringtone.resproduciendo = false;
      return;
      
    }

    console.log( ringtone );
    
    this.audio.src = ringtone.audio;

    this.audio.load();
    this.audio.play();
    
    ringtone.resproduciendo = true;

    this.audioTiempo = setTimeout( ()=> ringtone.resproduciendo = false, ringtone.duracion * 1000 );

  }

  private pausar_audio( rintonSel:Ringtone ){

    clearTimeout( this.audioTiempo );

    this.audio.pause();
    this.audio.currentTime = 0;

    for( let ringtone of this.ringtones ){

      if( ringtone.nombre != rintonSel.nombre ){

        ringtone.resproduciendo = false;

      }

    }

  }

  borrar_ringtone( idx:number ){

    this.ringtones.splice( idx, 1);

  }

  recargar_ringtones( refresher:Refresher ){

    console.log("Inicio del refresh");

    setTimeout( ()=>{

      console.log("Termino el refresh");
      this.ringtones = RINGTONES.slice(0);  

      refresher.complete();

    }, 1500)

  }

  reordenar_ringtones( indices:any ){

    console.log(indices);

    this.ringtones = reorderArray( this.ringtones, indices );

  }


}
