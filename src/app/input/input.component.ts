import { Marker } from './../marker';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Output() inputEvent: EventEmitter<Marker>;

  inputObject = {
    timestamp: null,
    lat: null,
    lng: null
  };
  
  constructor() { 
    this.inputEvent = new EventEmitter<Marker>();
  }

  ngOnInit(): void {}

  addEvent(): void {
    if(this.inputObject.timestamp==null){
      this.inputObject.timestamp = new Date();
    }
    this.inputEvent.emit(this.inputObject);
    this.inputObject.timestamp=null;
    this.inputObject.lat=null;
    this.inputObject.lng=null;
  }

}
