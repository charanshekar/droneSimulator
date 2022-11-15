import { Marker } from './marker';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DroneServiceService {

  constructor() {
    this.myObservable.subscribe((val:any) => {
      this.drone = val;

      if(this.drone == this.markers[this.markers.length-1]) {
        if(this.interval) clearInterval(this.interval);
      }
    });
  }

  myObservable =  new Subject();

  index:number = 0;
  interval:any;
  time:number = 1200;

  iconUrl = {
    url: '../../assets/imgs/drone-animated.svg',
    scaledSize: {
      width: 60,
      height: 60
    },
    anchor: {
      x: 30,
      y: 30
    }
  }

  drone:Marker = {
    lat: null,
	  lng: null,
    timestamp: null
  };

  lat:number = 18.560348;
  lng:number = 73.820979;
  
  markers:Marker[] = [];

  //Add Marker to Markers Array
  addHandler(latitude:number,longitude:number,timestamp:any,center?:boolean) {
    timestamp = timestamp.getTime();
    this.markers.push({
      timestamp: timestamp,
      lat: latitude,
      lng: longitude
    });
    if(center!=false) {
      this.lat = latitude;
      this.lng = longitude;
    }
  }

  //Import File
  onImport($event:any) {
    var file = $event.srcElement.files[0];
    var fileObserver:any = new Subject();
    fileObserver.subscribe((val:any) => { 
      this.addHandler(val.lat, val.lng, val.timestamp,true);
    });
    if (file) {
        var reader = new FileReader();
        var data:any;
        reader.readAsText(file, "UTF-8");
        reader.onloadend = function (evt): any {
          data = JSON.parse(evt.target.result as string);
          data.forEach(function(e:any) {
            const datenew: any = new Date(e.timestamp);
            e.timestamp=datenew;
            fileObserver.next(e);
          });
        }
        reader.onerror = function (evt) {
            console.log('error reading file');
          }
    }
  }


}


