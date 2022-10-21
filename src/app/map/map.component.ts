import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {} from 'googlemaps';

@Component({

  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']

})

export class MapComponent implements OnInit {

  map: google.maps.Map;
  center: google.maps.LatLngLiteral;
  poly: google.maps.Polyline;

  interval;
  i=0;
  time=1200;

  markers: google.maps.Marker[] = [];
  newMarkers: google.maps.Marker[] = [];

  source: google.maps.LatLngLiteral;
  myObservable =  new Subject();

  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    zoom: 10
  }

  hide:boolean = false;

  constructor() { }

  ngOnInit(): void {

    this.myObservable.subscribe((val:any) => {
        this.addLatLng(val);
        if(this.newMarkers.length>1) {
          this.newMarkers[this.newMarkers.length-2].setMap(null);
        }
        if(this.newMarkers.length===this.markers.length) {
          if(this.interval) clearInterval(this.interval);
        }
    });

  navigator.geolocation.getCurrentPosition(position => {

    // By default center set to Pune source
      this.source = {
        lat: 18.560348,
        lng: 73.820979
      }

      this.map = new google.maps.Map(document.getElementById('map-canvas')!, {
        ...this.options,
        center: this.source
      });

      this.poly = new google.maps.Polyline({
        strokeColor: "#000000",
        strokeOpacity: 1.0,
        strokeWeight: 3
      });

      this.poly.setMap(this.map);

      this.map.addListener("click", (event: google.maps.MapMouseEvent) => {
        this.addMarker(event.latLng!);
      });


      document.getElementById('clear')
      .addEventListener("click", () => {
        this.poly.getPath().clear();
        this.markers=[];
        this.newMarkers[this.newMarkers.length-1].setMap(null);
        this.newMarkers=[];
        this.i = 0;
      });

      document.getElementById('pause')
      .addEventListener("click", () => this.pausePlay('PAUSE'));

      document.getElementById('play')
      .addEventListener("click", () => this.pausePlay('PLAY'));

      document.getElementById("simulate")!
      .addEventListener("click", () => {
        for (let i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
          const path = this.poly.getPath();
          path.push(this.markers[i].getPosition() as google.maps.LatLng);
        }
        this.pausePlay('PLAY');
      });

    });

  }

  //// Outside OnInit...
  ///////////////
  ///////////////

  //Input Handlers

  onImport(event:any) {
    var file = event.srcElement.files[0];
    var fileObserver:any = new Subject();
    fileObserver.subscribe((val:any) => { 
      this.addHandler(val);
    });
    if (file) {
        var reader = new FileReader();
        var data:any;
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt): any {
          data = JSON.parse(evt.target.result as string);
          data.forEach(function(e:any) {
            const dateA: any = new Date(e.timestamp);
            e.timestamp=dateA;
            fileObserver.next(e);
          });
        }
        reader.onerror = function (evt) {
            console.log('error reading file');
        }
    }
  }

  addHandler(event: any): void {
    this.map.setCenter(event.latlng);
    this.addMarker(event.latlng);
  }

  // Adds a marker to the map and push to the array.
  addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral | any) {
    var marker = new google.maps.Marker({
      position: position,
      map: this.map
    });

    this.markers.push(marker);
  }

  // Sets the map on all markers in the array.
  setMapOnAll() {
    console.log(this.markers.length);
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  }

  addLatLng(mrker: google.maps.Marker) {
    var newMarker = new google.maps.Marker({
      position: mrker.getPosition(),
      icon: {
            url: './assets/imgs/drone-animated.svg',
            anchor: new google.maps.Point(30, 30),
            scaledSize: new google.maps.Size(60, 60)
          },
      map: this.map
    });
    this.newMarkers.push(newMarker);
  }

  pausePlay(state: string) {
    switch(state) {

      case 'PLAY':
        this.interval = setInterval(() => {
        this.myObservable.next(this.markers[this.i]);
        if(this.i < this.markers.length) this.i++;;
      }, this.time);
      break;

      case 'PAUSE': clearInterval(this.interval); break;
    }
  }

  //Start ngOnDestroy
  ngOnDestroy(){
    if(this.interval) clearInterval(this.interval);
    this.myObservable.unsubscribe();
  }

}
