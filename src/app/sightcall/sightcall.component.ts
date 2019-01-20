import { Component, OnInit } from '@angular/core';
//declare var myModule: { myFunction: Function };
declare var myModule: { joinCall: Function };



@Component({
  selector: 'app-sightcall',
  templateUrl: './sightcall.component.html',
  styleUrls: ['./sightcall.component.css']
})

export class SightcallComponent implements OnInit {

  constructor() {

    

   }

  ngOnInit() {
  }
  callMyFunction(){
   // myModule.myFunction();
  }
  startCallUi(){
    myModule.joinCall();
  }
}
