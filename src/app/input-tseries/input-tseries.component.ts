import { Component, OnInit, EventEmitter, Output } from '@angular/core';

interface InputInterface {
  timestamp: string,
  latlng:{
    lat: number,
    lng: number
  }
}

@Component({
  selector: 'app-input-tseries',
  templateUrl: './input-tseries.component.html',
  styleUrls: ['./input-tseries.component.scss']
})
export class InputTSeriesComponent implements OnInit {

  @Output() inputEvent: EventEmitter<InputInterface>;

  inputObject = {
    timestamp:'',
    latlng: {
      lat:null,
      lng:null
    }
  }
  
  constructor() { 
    this.inputEvent = new EventEmitter<InputInterface>();
  }

  ngOnInit(): void {
  }

  addEvent(): void {

    //this.inputObject.latlng.lat = parseInt(this.inputObject.latlng.lat);
    //this.inputObject.latlng.lng = parseInt(this.inputObject.latlng.long);

    this.inputEvent.emit(this.inputObject);

    this.inputObject.timestamp='';
    this.inputObject.latlng.lat=null;
    this.inputObject.latlng.lng=null;
  }

}
