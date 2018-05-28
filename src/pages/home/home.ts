import { Component } from '@angular/core';
import { RINGTONES } from "../../data/data.ringtones";
import { Ringtone } from "../../interfaces/ringtone.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ringtones:Ringtone[] = [];

  constructor() {

    this.ringtones = RINGTONES.slice(0);    

  }

  reproducir( ringtone: Ringtone ){

    console.log( ringtone );

    let audio = new Audio();
    audio.src = ringtone.audio;

    audio.load();
    audio.play();
    
    ringtone.resproduciendo = true;

    setTimeout( ()=> ringtone.resproduciendo = false, ringtone.duracion * 1000 );

  }

}
